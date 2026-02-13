namespace OpenSoul;

public sealed class AppSettings
{
    public string ConnectionMode { get; set; } = "Local";
    public string RemoteUrl { get; set; } = "ws://127.0.0.1:3000";
    public string SessionKey { get; set; } = "main";
}
