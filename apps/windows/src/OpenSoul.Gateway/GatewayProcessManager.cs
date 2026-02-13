using System.Diagnostics;
using System.Net.Http;
using Microsoft.Extensions.Logging;

namespace OpenSoul.Gateway;

/// <summary>
/// Manages the local Node.js gateway process lifecycle on Windows.
/// Mirrors GatewayProcessManager.swift — start/stop/health-check the gateway.
/// Uses a child process (not launchd/Task Scheduler) for simplicity.
/// </summary>
public sealed class GatewayProcessManager : IAsyncDisposable
{
    private readonly ILogger<GatewayProcessManager> _logger;
    private readonly NodeLocator _nodeLocator;
    private readonly HttpClient _http = new() { Timeout = TimeSpan.FromSeconds(5) };

    private Process? _gatewayProcess;
    private CancellationTokenSource? _monitorCts;
    private bool _disposed;

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

    /// <summary>
    /// Start the gateway process. First tries to attach to an existing instance,
    /// then starts a new one if needed.
    /// </summary>
    public async Task StartAsync(CancellationToken ct = default)
    {
        if (Status is GatewayStatus.Running or GatewayStatus.Starting)
            return;

        OpenSoulPaths.EnsureDirectories();
        SetStatus(GatewayStatus.Starting);

        // First, try to attach to an existing gateway
        if (await TryAttachExistingAsync(ct))
        {
            SetStatus(GatewayStatus.Running);
            return;
        }

        // Find Node.js
        var nodePath = await _nodeLocator.FindNodeAsync();
        if (nodePath is null)
        {
            _logger.LogError("Cannot start gateway: Node.js not found");
            SetStatus(GatewayStatus.Failed);
            return;
        }

        // Find opensoul entry point
        var opensoulPath = FindOpenSoulEntry();
        if (opensoulPath is null)
        {
            _logger.LogError("Cannot start gateway: opensoul.mjs not found");
            SetStatus(GatewayStatus.Failed);
            return;
        }

        try
        {
            _logger.LogInformation("Starting gateway: {Node} {Script}", nodePath, opensoulPath);

            var psi = new ProcessStartInfo(nodePath)
            {
                Arguments = $"\"{opensoulPath}\" gateway",
                UseShellExecute = false,
                CreateNoWindow = true,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                WorkingDirectory = OpenSoulPaths.StateDir,
            };

            // Inherit relevant environment
            psi.Environment["OPENSOUL_STATE_DIR"] = OpenSoulPaths.StateDir;

            _gatewayProcess = Process.Start(psi);
            if (_gatewayProcess is null)
            {
                SetStatus(GatewayStatus.Failed);
                return;
            }

            _gatewayProcess.EnableRaisingEvents = true;
            _gatewayProcess.Exited += OnGatewayExited;

            // Capture output for logging
            _gatewayProcess.OutputDataReceived += (_, e) =>
            {
                if (e.Data is not null) _logger.LogDebug("[gateway] {Line}", e.Data);
            };
            _gatewayProcess.ErrorDataReceived += (_, e) =>
            {
                if (e.Data is not null) _logger.LogWarning("[gateway:err] {Line}", e.Data);
            };
            _gatewayProcess.BeginOutputReadLine();
            _gatewayProcess.BeginErrorReadLine();

            // Write PID file
            await File.WriteAllTextAsync(OpenSoulPaths.GatewayPidFile, _gatewayProcess.Id.ToString(), ct);

            // Wait for the gateway to be ready (poll health endpoint)
            var ready = await WaitForHealthyAsync(ct);
            if (ready)
            {
                SetStatus(GatewayStatus.Running);
                StartMonitor();
            }
            else
            {
                _logger.LogError("Gateway did not become healthy in time");
                SetStatus(GatewayStatus.Failed);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to start gateway");
            SetStatus(GatewayStatus.Failed);
        }
    }

    /// <summary>
    /// Stop the gateway process.
    /// </summary>
    public async Task StopAsync()
    {
        _monitorCts?.Cancel();

        if (_gatewayProcess is { HasExited: false })
        {
            _logger.LogInformation("Stopping gateway (PID {Pid})", _gatewayProcess.Id);
            try
            {
                // Try graceful shutdown via /health endpoint (or just kill)
                _gatewayProcess.Kill(entireProcessTree: true);
                await _gatewayProcess.WaitForExitAsync();
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Error stopping gateway process");
            }
        }

        _gatewayProcess?.Dispose();
        _gatewayProcess = null;

        // Clean up PID file
        try { File.Delete(OpenSoulPaths.GatewayPidFile); } catch { }

        Port = null;
        SetStatus(GatewayStatus.Stopped);
    }

    /// <summary>
    /// Check if the gateway is healthy.
    /// </summary>
    public async Task<bool> IsHealthyAsync(CancellationToken ct = default)
    {
        if (HttpUrl is null) return false;

        try
        {
            var response = await _http.GetAsync($"{HttpUrl}/health", ct);
            return response.IsSuccessStatusCode;
        }
        catch
        {
            return false;
        }
    }

    public async ValueTask DisposeAsync()
    {
        if (_disposed) return;
        _disposed = true;

        await StopAsync();
        _http.Dispose();
        _monitorCts?.Dispose();
    }

    // ── Private ──────────────────────────────────────────────────────

    private async Task<bool> TryAttachExistingAsync(CancellationToken ct)
    {
        // Check port file
        var port = ReadPortFile();
        if (port is null) return false;

        Port = port;

        if (await IsHealthyAsync(ct))
        {
            _logger.LogInformation("Attached to existing gateway on port {Port}", port);
            return true;
        }

        Port = null;
        return false;
    }

    private static int? ReadPortFile()
    {
        try
        {
            var portFile = OpenSoulPaths.GatewayPortFile;
            if (!File.Exists(portFile)) return null;
            var content = File.ReadAllText(portFile).Trim();
            return int.TryParse(content, out var port) ? port : null;
        }
        catch
        {
            return null;
        }
    }

    private async Task<bool> WaitForHealthyAsync(CancellationToken ct)
    {
        // Poll for up to 10 seconds (gateway startup can be slow on first run)
        const int maxWaitMs = 10_000;
        const int pollIntervalMs = 250;
        var elapsed = 0;

        while (elapsed < maxWaitMs)
        {
            ct.ThrowIfCancellationRequested();

            // Check if process exited
            if (_gatewayProcess?.HasExited == true) return false;

            // Read port from file
            var port = ReadPortFile();
            if (port is not null)
            {
                Port = port;
                if (await IsHealthyAsync(ct))
                    return true;
            }

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
                    // Don't immediately fail — could be temporary
                }
            }
            catch (OperationCanceledException) { return; }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Monitor loop error");
            }
        }
    }

    private static string? FindOpenSoulEntry()
    {
        // Look for opensoul.mjs relative to the app's installation
        var candidates = new string?[]
        {
            // Installed: next to the executable
            Path.Combine(AppContext.BaseDirectory, "opensoul.mjs"),
            // Development: solution/project output folder -> repository root
            Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "..", "..", "..", "..", "opensoul.mjs")),
            // Development fallback when output path depth differs
            Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "..", "..", "..", "opensoul.mjs")),
            // Global npm install
            FindGlobalNpmPackage(),
        };

        foreach (var candidate in candidates.Where(static candidate => !string.IsNullOrWhiteSpace(candidate)).Distinct())
        {
            if (File.Exists(candidate!))
                return candidate;
        }

        return null;
    }

    private static string? FindGlobalNpmPackage()
    {
        try
        {
            var psi = new ProcessStartInfo("npm", "root -g")
            {
                RedirectStandardOutput = true,
                UseShellExecute = false,
                CreateNoWindow = true,
            };

            using var proc = Process.Start(psi);
            if (proc is null) return null;

            var output = proc.StandardOutput.ReadToEnd().Trim();
            proc.WaitForExit();

            if (proc.ExitCode == 0 && !string.IsNullOrEmpty(output))
            {
                var opensoulPath = Path.Combine(output, "opensoul", "opensoul.mjs");
                return File.Exists(opensoulPath) ? opensoulPath : null;
            }
        }
        catch { }

        return null;
    }

    private void OnGatewayExited(object? sender, EventArgs e)
    {
        if (_gatewayProcess?.ExitCode != 0)
        {
            _logger.LogWarning("Gateway process exited with code {Code}", _gatewayProcess?.ExitCode);
        }
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
