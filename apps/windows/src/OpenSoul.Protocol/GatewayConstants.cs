namespace OpenSoul.Protocol;

/// <summary>
/// Gateway protocol constants matching the TypeScript/Swift definitions.
/// </summary>
public static class GatewayConstants
{
    /// <summary>Protocol version — must match PROTOCOL_VERSION in protocol-schemas.ts.</summary>
    public const int ProtocolVersion = 3;

    /// <summary>Maximum WebSocket message size in bytes (16 MB).</summary>
    public const int MaxMessageSize = 16 * 1024 * 1024;

    /// <summary>Canvas WebSocket path.</summary>
    public const string CanvasWsPath = "/__opensoul__/ws";

    /// <summary>Canvas host path.</summary>
    public const string CanvasHostPath = "/__opensoul__/canvas";

    /// <summary>A2UI path.</summary>
    public const string A2UIPath = "/__opensoul__/a2ui";

    /// <summary>Default state directory (~/.opensoul/).</summary>
    public const string DefaultStateDirName = ".opensoul";

    /// <summary>Default config file name.</summary>
    public const string ConfigFileName = "opensoul.json";

    /// <summary>Environment variable to override state directory.</summary>
    public const string EnvStateDir = "OPENSOUL_STATE_DIR";

    /// <summary>Environment variable to override config path.</summary>
    public const string EnvConfigPath = "OPENSOUL_CONFIG_PATH";

    /// <summary>Environment variable for gateway token.</summary>
    public const string EnvGatewayToken = "OPENSOUL_GATEWAY_TOKEN";

    /// <summary>Environment variable for gateway password.</summary>
    public const string EnvGatewayPassword = "OPENSOUL_GATEWAY_PASSWORD";

    /// <summary>Environment variable for explicit gateway WebSocket URL.</summary>
    public const string EnvGatewayUrl = "OPENSOUL_GATEWAY_URL";

    /// <summary>Environment variable for remote gateway WebSocket URL.</summary>
    public const string EnvRemoteGatewayUrl = "OPENSOUL_REMOTE_GATEWAY_URL";

    /// <summary>Environment variable for remote gateway token.</summary>
    public const string EnvRemoteGatewayToken = "OPENSOUL_REMOTE_GATEWAY_TOKEN";

    /// <summary>Environment variable for remote gateway password.</summary>
    public const string EnvRemoteGatewayPassword = "OPENSOUL_REMOTE_GATEWAY_PASSWORD";

    /// <summary>Environment variable for remote device token auth.</summary>
    public const string EnvRemoteGatewayDeviceToken = "OPENSOUL_REMOTE_GATEWAY_DEVICE_TOKEN";
}
