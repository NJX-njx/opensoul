using System.Diagnostics;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Logging;

namespace OpenSoul.Gateway;

/// <summary>
/// Locates the Node.js runtime on Windows.
/// Mirrors RuntimeLocator.swift — searches PATH for node.exe and validates version >= 22.
/// </summary>
public sealed partial class NodeLocator
{
    private readonly ILogger<NodeLocator> _logger;
    private string? _cachedNodePath;

    public NodeLocator(ILogger<NodeLocator> logger)
    {
        _logger = logger;
    }

    /// <summary>Minimum required Node.js major version.</summary>
    public const int MinNodeMajor = 22;

    /// <summary>
    /// Find the node.exe path. Returns null if not found or version is too old.
    /// </summary>
    public async Task<string?> FindNodeAsync()
    {
        if (_cachedNodePath is not null && File.Exists(_cachedNodePath))
            return _cachedNodePath;

        // Try well-known locations first
        var candidates = GetCandidatePaths();

        foreach (var candidate in candidates)
        {
            if (!File.Exists(candidate)) continue;

            var version = await GetNodeVersionAsync(candidate);
            if (version is not null && version.Major >= MinNodeMajor)
            {
                _logger.LogInformation("Found Node.js {Version} at {Path}", version, candidate);
                _cachedNodePath = candidate;
                return candidate;
            }
            else if (version is not null)
            {
                _logger.LogWarning("Node.js at {Path} is v{Version}, need >= {Min}", candidate, version, MinNodeMajor);
            }
        }

        // Try `where node` as fallback
        var wherePath = await FindViaWhereAsync();
        if (wherePath is not null)
        {
            var version = await GetNodeVersionAsync(wherePath);
            if (version is not null && version.Major >= MinNodeMajor)
            {
                _logger.LogInformation("Found Node.js {Version} at {Path} (via where)", version, wherePath);
                _cachedNodePath = wherePath;
                return wherePath;
            }
        }

        _logger.LogError("Node.js >= {Min} not found", MinNodeMajor);
        return null;
    }

    private static List<string> GetCandidatePaths()
    {
        var paths = new List<string>();

        // Common install locations
        var programFiles = Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles);
        var programFilesX86 = Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86);
        var appData = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData);

        // NVM for Windows
        var nvmHome = Environment.GetEnvironmentVariable("NVM_HOME");
        var nvmSymlink = Environment.GetEnvironmentVariable("NVM_SYMLINK");
        if (nvmSymlink is not null) paths.Add(Path.Combine(nvmSymlink, "node.exe"));

        // fnm
        var fnmDir = Path.Combine(appData, "fnm", "aliases", "default");
        if (Directory.Exists(fnmDir)) paths.Add(Path.Combine(fnmDir, "node.exe"));

        // Volta
        var voltaHome = Environment.GetEnvironmentVariable("VOLTA_HOME");
        if (voltaHome is not null) paths.Add(Path.Combine(voltaHome, "bin", "node.exe"));

        // Standard installs
        paths.Add(Path.Combine(programFiles, "nodejs", "node.exe"));
        paths.Add(Path.Combine(programFilesX86, "nodejs", "node.exe"));

        // Scoop
        var scoopPath = Environment.GetEnvironmentVariable("SCOOP")
            ?? Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.UserProfile), "scoop");
        paths.Add(Path.Combine(scoopPath, "apps", "nodejs", "current", "node.exe"));

        // Chocolatey
        var chocoInstall = Environment.GetEnvironmentVariable("ChocolateyInstall");
        if (chocoInstall is not null) paths.Add(Path.Combine(chocoInstall, "lib", "nodejs", "tools", "node.exe"));

        // PATH entries
        var pathEnv = Environment.GetEnvironmentVariable("PATH") ?? "";
        foreach (var dir in pathEnv.Split(';', StringSplitOptions.RemoveEmptyEntries))
        {
            var nodePath = Path.Combine(dir.Trim(), "node.exe");
            if (!paths.Contains(nodePath))
                paths.Add(nodePath);
        }

        return paths;
    }

    private static async Task<Version?> GetNodeVersionAsync(string nodePath)
    {
        try
        {
            var psi = new ProcessStartInfo(nodePath, "--version")
            {
                RedirectStandardOutput = true,
                UseShellExecute = false,
                CreateNoWindow = true,
            };

            using var proc = Process.Start(psi);
            if (proc is null) return null;

            var output = await proc.StandardOutput.ReadToEndAsync();
            await proc.WaitForExitAsync();

            var match = VersionRegex().Match(output.Trim());
            if (match.Success)
            {
                return new Version(
                    int.Parse(match.Groups[1].Value),
                    int.Parse(match.Groups[2].Value),
                    int.Parse(match.Groups[3].Value));
            }
        }
        catch { /* ignore */ }

        return null;
    }

    private static async Task<string?> FindViaWhereAsync()
    {
        try
        {
            var psi = new ProcessStartInfo("where", "node")
            {
                RedirectStandardOutput = true,
                UseShellExecute = false,
                CreateNoWindow = true,
            };

            using var proc = Process.Start(psi);
            if (proc is null) return null;

            var output = await proc.StandardOutput.ReadToEndAsync();
            await proc.WaitForExitAsync();

            if (proc.ExitCode == 0)
            {
                var firstLine = output.Split('\n', StringSplitOptions.RemoveEmptyEntries).FirstOrDefault()?.Trim();
                if (firstLine is not null && File.Exists(firstLine))
                    return firstLine;
            }
        }
        catch { /* ignore */ }

        return null;
    }

    [GeneratedRegex(@"v(\d+)\.(\d+)\.(\d+)")]
    private static partial Regex VersionRegex();
}
