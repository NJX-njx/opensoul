namespace OpenSoul.Protocol;

/// <summary>
/// Gateway error codes matching the TypeScript ErrorCodes definition.
/// </summary>
public static class ErrorCode
{
    public const string NotLinked = "NOT_LINKED";
    public const string NotPaired = "NOT_PAIRED";
    public const string AgentTimeout = "AGENT_TIMEOUT";
    public const string InvalidRequest = "INVALID_REQUEST";
    public const string Unavailable = "UNAVAILABLE";
}
