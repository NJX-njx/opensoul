using System.Collections.Concurrent;
using System.Diagnostics;
using System.Net;
using System.Net.Sockets;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Logging;

namespace OpenSoul.Gateway;

/// <summary>
/// Manages the local Node.js gateway process lifecycle on Windows.
/// </summary>
public sealed class GatewayProcessManager : IAsyncDisposable
{
    private readonly ILogger<GatewayProcessManager> _logger;
    private readonly NodeLocator _nodeLocator;

    private Process? _gatewayProcess;
    private CancellationTokenSource? _monitorCts;
    private string? _gatewayToken;
    private bool _disposed;

    private static readonly Regex LockOwnerPidRegex =
        new(@"gateway already running \(pid (?<pid>\d+)\)", RegexOptions.IgnoreCase | RegexOptions.Compiled);

    public GatewayProcessManager(ILogger<GatewayProcessManager> logger, NodeLocator nodeLocator)
    {
        _logger = logger;
        _nodeLocator = nodeLocator;
    }

    public event Action<GatewayStatus>? StatusChanged;

    public GatewayStatus Status { get; private set; } = GatewayStatus.Stopped;

    /// <summary>The port the gateway is listening on.</summary>
    public int? Port { get; private set; }

    /// <summary>The WebSocket URL for connecting to the gateway.</summary>
    public string? WebSocketUrl => Port is not null ? $"ws://127.0.0.1:{Port}" : null;

    /// <summary>The HTTP URL for the gateway.</summary>
    public string? HttpUrl => Port is not null ? $"http://127.0.0.1:{Port}" : null;

    /// <summary>Token used by the managed local gateway instance.</summary>
    public string? GatewayToken => _gatewayToken;

    /// <summary>
    /// Start the gateway process.
    /// </summary>
    public async Task StartAsync(CancellationToken ct = default)
    {
        if (Status is GatewayStatus.Running or GatewayStatus.Starting)
            return;

        OpenSoulPaths.EnsureDirectories();
        SetStatus(GatewayStatus.Starting);

        var nodePath = await _nodeLocator.FindNodeAsync();
        if (nodePath is null)
        {
            _logger.LogError("Cannot start gateway: Node.js not found");
            await CleanupFailedStartAsync();
            SetStatus(GatewayStatus.Failed);
            return;
        }

        var opensoulPath = FindOpenSoulEntry();
        if (opensoulPath is null)
        {
            _logger.LogError("Cannot start gateway: opensoul.mjs not found");
            await CleanupFailedStartAsync();
            SetStatus(GatewayStatus.Failed);
            return;
        }

        // Reuse an existing managed gateway after app restart/crash.
        // Skip reuse when system proxy is enabled: the existing process may have been
        // started without proxy injection, causing API calls (e.g. Gemini) to hang.
        if (SystemProxyNeedsInjection() && TryReadIntFile(OpenSoulPaths.GatewayPidFile, out var existingPid))
        {
            _logger.LogInformation("System proxy detected; terminating existing gateway (PID {Pid}) to restart with proxy", existingPid);
            TryKillProcessTree(existingPid);
            DeleteRuntimeMetadataFiles(keepToken: true);
        }
        else if (await TryAttachExistingGatewayAsync(ct))
        {
            SetStatus(GatewayStatus.Running);
            StartMonitor();
            return;
        }

        var token = LoadOrCreateGatewayToken();
        var startupErrors = new ConcurrentQueue<string>();

        var started = await StartNewGatewayProcessAsync(nodePath, opensoulPath, token, startupErrors, ct);

        if (!started && TryExtractLockOwnerPid(startupErrors, out var lockOwnerPid))
        {
            _logger.LogWarning("Gateway lock owned by PID {Pid}; terminating stale process and retrying", lockOwnerPid);
            TryKillProcessTree(lockOwnerPid);

            startupErrors = new ConcurrentQueue<string>();
            started = await StartNewGatewayProcessAsync(nodePath, opensoulPath, token, startupErrors, ct);
        }

        if (!started)
        {
            _logger.LogError("Gateway did not become healthy in time");
            await CleanupFailedStartAsync();
            SetStatus(GatewayStatus.Failed);
            return;
        }

        SetStatus(GatewayStatus.Running);
        StartMonitor();
    }

    /// <summary>
    /// Stop the gateway process.
    /// </summary>
    public async Task StopAsync()
    {
        _monitorCts?.Cancel();

        var process = _gatewayProcess;
        if (process is not null)
        {
            process.Exited -= OnGatewayExited;

            if (!process.HasExited)
            {
                _logger.LogInformation("Stopping gateway (PID {Pid})", process.Id);
                try
                {
                    process.Kill(entireProcessTree: true);
                    await process.WaitForExitAsync();
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Error stopping gateway process");
                }
            }

            process.Dispose();
        }

        _gatewayProcess = null;

        DeleteRuntimeMetadataFiles(keepToken: true);

        Port = null;
        _gatewayToken = null;
        SetStatus(GatewayStatus.Stopped);
    }

    /// <summary>
    /// Check whether the gateway listener is reachable.
    /// </summary>
    public async Task<bool> IsHealthyAsync(CancellationToken ct = default)
    {
        if (Port is null) return false;
        if (_gatewayProcess is { HasExited: true }) return false;
        return await IsPortAcceptingConnectionsAsync(Port.Value, ct);
    }

    public async ValueTask DisposeAsync()
    {
        if (_disposed) return;
        _disposed = true;

        await StopAsync();
        _monitorCts?.Dispose();
    }

    private static int FindAvailablePort()
    {
        using var listener = new TcpListener(IPAddress.Loopback, 0);
        listener.Start();
        return ((IPEndPoint)listener.LocalEndpoint).Port;
    }

    private static bool TryReadIntFile(string path, out int value)
    {
        value = default;

        try
        {
            if (!File.Exists(path))
                return false;

            var content = File.ReadAllText(path).Trim();
            return int.TryParse(content, out value);
        }
        catch
        {
            return false;
        }
    }

    private static string? ReadTokenFile()
    {
        try
        {
            if (!File.Exists(OpenSoulPaths.GatewayTokenFile))
                return null;

            var token = File.ReadAllText(OpenSoulPaths.GatewayTokenFile).Trim();
            return string.IsNullOrWhiteSpace(token) ? null : token;
        }
        catch
        {
            return null;
        }
    }

    private static string LoadOrCreateGatewayToken()
    {
        var existing = ReadTokenFile();
        if (!string.IsNullOrWhiteSpace(existing))
            return existing;

        var token = Guid.NewGuid().ToString("N");

        try
        {
            File.WriteAllText(OpenSoulPaths.GatewayTokenFile, token);
        }
        catch
        {
            // Best effort: continue with in-memory token.
        }

        return token;
    }

    private static async Task PersistRuntimeMetadataAsync(int pid, int port, string token, CancellationToken ct)
    {
        await File.WriteAllTextAsync(OpenSoulPaths.GatewayPidFile, pid.ToString(), ct);
        await File.WriteAllTextAsync(OpenSoulPaths.GatewayPortFile, port.ToString(), ct);
        await File.WriteAllTextAsync(OpenSoulPaths.GatewayTokenFile, token, ct);
    }

    private static void DeleteRuntimeMetadataFiles(bool keepToken)
    {
        try { File.Delete(OpenSoulPaths.GatewayPidFile); } catch { }
        try { File.Delete(OpenSoulPaths.GatewayPortFile); } catch { }

        if (!keepToken)
        {
            try { File.Delete(OpenSoulPaths.GatewayTokenFile); } catch { }
        }
    }

    private static bool SystemProxyNeedsInjection()
    {
        try
        {
            var systemProxy = System.Net.WebRequest.GetSystemWebProxy();
            var testUri = new Uri("https://generativelanguage.googleapis.com");
            var proxyUri = systemProxy.GetProxy(testUri);
            return proxyUri != null && proxyUri != testUri;
        }
        catch
        {
            return false;
        }
    }

    private static async Task<bool> IsPortAcceptingConnectionsAsync(int port, CancellationToken ct)
    {
        using var tcp = new TcpClient();
        using var timeoutCts = CancellationTokenSource.CreateLinkedTokenSource(ct);
        // 500ms is generous for a loopback connection; under normal conditions
        // it completes in <5ms. Keep this tight so health probes and startup
        // detection feel instant even when VPN/proxy software adds latency.
        timeoutCts.CancelAfter(TimeSpan.FromMilliseconds(500));

        try
        {
            await tcp.ConnectAsync(IPAddress.Loopback, port, timeoutCts.Token);
            return tcp.Connected;
        }
        catch
        {
            return false;
        }
    }

    private async Task<bool> TryAttachExistingGatewayAsync(CancellationToken ct)
    {
        if (!TryReadIntFile(OpenSoulPaths.GatewayPidFile, out var pid))
            return false;

        if (!TryReadIntFile(OpenSoulPaths.GatewayPortFile, out var port))
            return false;

        var token = ReadTokenFile();
        if (string.IsNullOrWhiteSpace(token))
            return false;

        Process? process;
        try
        {
            process = Process.GetProcessById(pid);
        }
        catch
        {
            return false;
        }

        if (process.HasExited)
            return false;

        if (!await IsPortAcceptingConnectionsAsync(port, ct))
            return false;

        _gatewayProcess?.Dispose();
        _gatewayProcess = process;
        _gatewayProcess.EnableRaisingEvents = true;
        _gatewayProcess.Exited += OnGatewayExited;

        Port = port;
        _gatewayToken = token;

        _logger.LogInformation("Reusing existing managed gateway (PID {Pid}, port {Port})", pid, port);
        return true;
    }

    private async Task<bool> StartNewGatewayProcessAsync(
        string nodePath,
        string opensoulPath,
        string token,
        ConcurrentQueue<string> startupErrors,
        CancellationToken ct)
    {
        await CleanupFailedStartAsync();

        var localPort = FindAvailablePort();
        _logger.LogInformation("Starting gateway: {Node} {Script} (port {Port})", nodePath, opensoulPath, localPort);

        // WorkingDirectory must be the directory containing opensoul.mjs so that
        // ./dist/entry.js resolves correctly. StateDir is for runtime state (config, etc.)
        // and is passed via OPENSOUL_STATE_DIR.
        var workingDir = Path.GetDirectoryName(opensoulPath);
        if (string.IsNullOrWhiteSpace(workingDir))
            workingDir = OpenSoulPaths.StateDir;

        var psi = new ProcessStartInfo(nodePath)
        {
            Arguments = $"\"{opensoulPath}\" gateway --allow-unconfigured --token \"{token}\" --port {localPort}",
            UseShellExecute = false,
            CreateNoWindow = true,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            WorkingDirectory = workingDir,
        };

        psi.Environment["OPENSOUL_STATE_DIR"] = OpenSoulPaths.StateDir;
        psi.Environment["OPENSOUL_GATEWAY_TOKEN"] = token;

        // Ensure the gateway process bypasses system proxies for local connections.
        // Without this, proxy env vars (HTTP_PROXY, HTTPS_PROXY) inherited from the
        // system can cause the Node.js process to route local traffic through the proxy.
        const string noProxyList = "localhost,127.0.0.1,::1,opensoul.localapp";
        var existingNoProxy = Environment.GetEnvironmentVariable("NO_PROXY");
        var existingNoProxyLower = Environment.GetEnvironmentVariable("no_proxy");
        var mergedNoProxy = noProxyList;
        if (!string.IsNullOrWhiteSpace(existingNoProxy))
        {
            mergedNoProxy = $"{existingNoProxy},{mergedNoProxy}";
        }
        if (!string.IsNullOrWhiteSpace(existingNoProxyLower) &&
            !string.Equals(existingNoProxyLower, existingNoProxy, StringComparison.Ordinal))
        {
            mergedNoProxy = $"{existingNoProxyLower},{mergedNoProxy}";
        }
        psi.Environment["NO_PROXY"] = mergedNoProxy;
        psi.Environment["no_proxy"] = mergedNoProxy;

        // Automatically inject Windows system proxy into the Node.js environment
        // so that Gemini and other APIs can be reached if the user relies on a proxy.
        try
        {
            var systemProxy = System.Net.WebRequest.GetSystemWebProxy();
            var testUri = new Uri("https://generativelanguage.googleapis.com");
            var proxyUri = systemProxy.GetProxy(testUri);
            
            if (proxyUri != null && proxyUri != testUri)
            {
                var proxyString = proxyUri.ToString();
                if (proxyString.EndsWith("/"))
                {
                    proxyString = proxyString.Substring(0, proxyString.Length - 1);
                }
                    
                _logger.LogInformation("Detected system proxy, injecting into Node environment: {Proxy}", proxyString);
                
                psi.Environment["HTTP_PROXY"] = proxyString;
                psi.Environment["HTTPS_PROXY"] = proxyString;
                psi.Environment["ALL_PROXY"] = proxyString;
                psi.Environment["http_proxy"] = proxyString;
                psi.Environment["https_proxy"] = proxyString;
                psi.Environment["all_proxy"] = proxyString;
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to resolve system proxy for Node.js environment");
        }

        _gatewayProcess = Process.Start(psi);
        if (_gatewayProcess is null)
            return false;

        _gatewayProcess.EnableRaisingEvents = true;
        _gatewayProcess.Exited += OnGatewayExited;

        _gatewayProcess.OutputDataReceived += (_, e) =>
        {
            if (e.Data is not null)
            {
                _logger.LogDebug("[gateway] {Line}", e.Data);
            }
        };

        _gatewayProcess.ErrorDataReceived += (_, e) =>
        {
            if (e.Data is not null)
            {
                startupErrors.Enqueue(e.Data);
                _logger.LogWarning("[gateway:err] {Line}", e.Data);
            }
        };

        _gatewayProcess.BeginOutputReadLine();
        _gatewayProcess.BeginErrorReadLine();

        var ready = await WaitForHealthyAsync(localPort, ct);
        if (!ready)
            return false;

        Port = localPort;
        _gatewayToken = token;

        await PersistRuntimeMetadataAsync(_gatewayProcess.Id, localPort, token, ct);
        return true;
    }

    private static bool TryExtractLockOwnerPid(IEnumerable<string> lines, out int pid)
    {
        foreach (var line in lines)
        {
            var match = LockOwnerPidRegex.Match(line);
            if (!match.Success)
                continue;

            if (int.TryParse(match.Groups["pid"].Value, out pid))
                return true;
        }

        pid = default;
        return false;
    }

    private void TryKillProcessTree(int pid)
    {
        try
        {
            using var process = Process.GetProcessById(pid);
            if (process.HasExited)
                return;

            process.Kill(entireProcessTree: true);
            process.WaitForExit(5000);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to terminate stale gateway lock owner process {Pid}", pid);
        }
    }

    private async Task CleanupFailedStartAsync()
    {
        if (_gatewayProcess is { HasExited: false })
        {
            try
            {
                _gatewayProcess.Kill(entireProcessTree: true);
                await _gatewayProcess.WaitForExitAsync();
            }
            catch
            {
                // Best effort cleanup.
            }
        }

        _gatewayProcess?.Dispose();
        _gatewayProcess = null;

        DeleteRuntimeMetadataFiles(keepToken: true);

        Port = null;
        _gatewayToken = null;
    }

    private async Task<bool> WaitForHealthyAsync(int port, CancellationToken ct)
    {
        const int maxWaitMs = 12_000;
        // Start polling aggressively (100ms) then relax to 250ms after 2s.
        // The gateway typically starts in 1-3s so fast initial polling matters.
        var elapsed = 0;

        while (elapsed < maxWaitMs)
        {
            ct.ThrowIfCancellationRequested();

            if (_gatewayProcess?.HasExited == true)
                return false;

            if (await IsPortAcceptingConnectionsAsync(port, ct))
                return true;

            var pollIntervalMs = elapsed < 2000 ? 100 : 250;
            await Task.Delay(pollIntervalMs, ct);
            elapsed += pollIntervalMs;
        }

        return false;
    }

    private void StartMonitor()
    {
        _monitorCts?.Cancel();
        _monitorCts = new CancellationTokenSource();
        _ = MonitorLoopAsync(_monitorCts.Token);
    }

    private async Task MonitorLoopAsync(CancellationToken ct)
    {
        while (!ct.IsCancellationRequested)
        {
            try
            {
                await Task.Delay(TimeSpan.FromSeconds(15), ct);

                if (_gatewayProcess?.HasExited == true)
                {
                    _logger.LogWarning("Gateway process exited unexpectedly (code {Code})", _gatewayProcess.ExitCode);
                    SetStatus(GatewayStatus.Failed);
                    return;
                }

                if (!await IsHealthyAsync(ct))
                {
                    _logger.LogWarning("Gateway health check failed");
                }
            }
            catch (OperationCanceledException)
            {
                return;
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Monitor loop error");
            }
        }
    }

    private static string? FindOpenSoulEntry()
    {
        var envOverride = Environment.GetEnvironmentVariable("OPENSOUL_ENTRY");
        if (!string.IsNullOrWhiteSpace(envOverride))
        {
            var overridePath = envOverride.Trim();
            if (Directory.Exists(overridePath))
            {
                overridePath = Path.Combine(overridePath, "opensoul.mjs");
            }

            if (File.Exists(overridePath))
            {
                return overridePath;
            }
        }

        // Prefer project root (has dist/) over npm global (may lack dist/).
        var baseDir = AppContext.BaseDirectory;
        var candidates = new string?[]
        {
            Path.Combine(baseDir, "opensoul.mjs"),
            FindOpenSoulEntryByWalkingParents(),
            Path.GetFullPath(Path.Combine(baseDir, "..", "..", "..", "..", "..", "..", "opensoul.mjs")),
            Path.GetFullPath(Path.Combine(baseDir, "..", "..", "..", "..", "..", "..", "..", "opensoul.mjs")),
            Path.GetFullPath(Path.Combine(baseDir, "..", "..", "..", "..", "..", "..", "..", "..", "opensoul.mjs")),
            Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
                "npm", "node_modules", "opensoul", "opensoul.mjs"),
            FindGlobalNpmPackage(),
        };

        foreach (var candidate in candidates.Where(static candidate => !string.IsNullOrWhiteSpace(candidate)).Distinct())
        {
            if (File.Exists(candidate!))
                return candidate;
        }

        return null;
    }

    private static string? FindOpenSoulEntryByWalkingParents()
    {
        try
        {
            var dir = new DirectoryInfo(AppContext.BaseDirectory);
            for (var depth = 0; dir is not null && depth < 12; depth++)
            {
                var candidate = Path.Combine(dir.FullName, "opensoul.mjs");
                if (File.Exists(candidate))
                {
                    return candidate;
                }

                dir = dir.Parent;
            }
        }
        catch
        {
            // Ignore discovery errors and continue with other strategies.
        }

        return null;
    }

    private static string? FindGlobalNpmPackage()
    {
        foreach (var npmCommand in new[] { "npm.cmd", "npm" })
        {
            try
            {
                var psi = new ProcessStartInfo(npmCommand, "root -g")
                {
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true,
                };

                using var proc = Process.Start(psi);
                if (proc is null)
                {
                    continue;
                }

                var output = proc.StandardOutput.ReadToEnd().Trim();
                proc.WaitForExit();

                if (proc.ExitCode == 0 && !string.IsNullOrEmpty(output))
                {
                    var opensoulPath = Path.Combine(output, "opensoul", "opensoul.mjs");
                    if (File.Exists(opensoulPath))
                    {
                        return opensoulPath;
                    }
                }
            }
            catch
            {
                // Try next command variant.
            }
        }

        return null;
    }

    private void OnGatewayExited(object? sender, EventArgs e)
    {
        var process = _gatewayProcess;
        if (process is not null && process.ExitCode != 0)
        {
            _logger.LogWarning("Gateway process exited with code {Code}", process.ExitCode);
        }

        process?.Dispose();
        _gatewayProcess = null;

        DeleteRuntimeMetadataFiles(keepToken: true);

        Port = null;
        _gatewayToken = null;
        SetStatus(GatewayStatus.Stopped);
    }

    private void SetStatus(GatewayStatus status)
    {
        if (Status == status) return;
        Status = status;
        _logger.LogInformation("Gateway status: {Status}", status);
        StatusChanged?.Invoke(status);
    }
}

public enum GatewayStatus
{
    Stopped,
    Starting,
    Running,
    Failed,
}
