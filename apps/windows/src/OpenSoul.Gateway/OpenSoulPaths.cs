namespace OpenSoul.Gateway;

/// <summary>
/// Resolves OpenSoul file system paths on Windows.
/// Mirrors OpenSoulPaths.swift — uses %USERPROFILE%\.opensoul\ as the state directory.
/// </summary>
public static class OpenSoulPaths
{
    /// <summary>
    /// State directory: %OPENSOUL_STATE_DIR% or %USERPROFILE%\.opensoul\
    /// </summary>
    public static string StateDir =>
        Environment.GetEnvironmentVariable("OPENSOUL_STATE_DIR")
        ?? Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.UserProfile), ".opensoul");

    /// <summary>
    /// Config file: %OPENSOUL_CONFIG_PATH% or {StateDir}\opensoul.json
    /// </summary>
    public static string ConfigPath =>
        Environment.GetEnvironmentVariable("OPENSOUL_CONFIG_PATH")
        ?? Path.Combine(StateDir, "opensoul.json");

    /// <summary>Workspace directory: {StateDir}\workspace\</summary>
    public static string WorkspaceDir => Path.Combine(StateDir, "workspace");

    /// <summary>Logs directory: {StateDir}\logs\</summary>
    public static string LogsDir => Path.Combine(StateDir, "logs");

    /// <summary>Gateway PID file: {StateDir}\gateway.pid</summary>
    public static string GatewayPidFile => Path.Combine(StateDir, "gateway.pid");

    /// <summary>Gateway port file: {StateDir}\gateway.port</summary>
    public static string GatewayPortFile => Path.Combine(StateDir, "gateway.port");

    /// <summary>Settings file (Windows-specific, stored in AppData)</summary>
    public static string SettingsPath =>
        Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
            "OpenSoul", "settings.json");

    /// <summary>
    /// Ensure all required directories exist.
    /// </summary>
    public static void EnsureDirectories()
    {
        Directory.CreateDirectory(StateDir);
        Directory.CreateDirectory(WorkspaceDir);
        Directory.CreateDirectory(LogsDir);
        Directory.CreateDirectory(Path.GetDirectoryName(SettingsPath)!);
    }
}
