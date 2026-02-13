using System.Text.Json;
using System.Text.Json.Serialization;

namespace OpenSoul.Protocol;

// ═══════════════════════════════════════════════════════════════════════
// Connection handshake
// ═══════════════════════════════════════════════════════════════════════

public sealed record ConnectParams
{
    [JsonPropertyName("protocolVersion")]
    public int ProtocolVersion { get; init; } = GatewayConstants.ProtocolVersion;

    [JsonPropertyName("client")]
    public string? Client { get; init; }

    [JsonPropertyName("clientVersion")]
    public string? ClientVersion { get; init; }

    [JsonPropertyName("platform")]
    public string? Platform { get; init; }

    [JsonPropertyName("capabilities")]
    public ClientCapabilities? Capabilities { get; init; }

    [JsonPropertyName("auth")]
    public ConnectAuth? Auth { get; init; }

    [JsonPropertyName("subscribe")]
    public string[]? Subscribe { get; init; }
}

public sealed record ConnectAuth
{
    [JsonPropertyName("token")]
    public string? Token { get; init; }

    [JsonPropertyName("password")]
    public string? Password { get; init; }

    [JsonPropertyName("deviceToken")]
    public string? DeviceToken { get; init; }
}

public sealed record ClientCapabilities
{
    [JsonPropertyName("execApprovals")]
    public bool? ExecApprovals { get; init; }

    [JsonPropertyName("devicePairing")]
    public bool? DevicePairing { get; init; }

    [JsonPropertyName("nodePairing")]
    public bool? NodePairing { get; init; }

    [JsonPropertyName("canvas")]
    public bool? Canvas { get; init; }

    [JsonPropertyName("chat")]
    public bool? Chat { get; init; }
}

public sealed record HelloOk
{
    [JsonPropertyName("protocolVersion")]
    public int ProtocolVersion { get; init; }

    [JsonPropertyName("serverVersion")]
    public string? ServerVersion { get; init; }

    [JsonPropertyName("snapshot")]
    public Snapshot? Snapshot { get; init; }
}

// ═══════════════════════════════════════════════════════════════════════
// Snapshot & state
// ═══════════════════════════════════════════════════════════════════════

public sealed record Snapshot
{
    [JsonPropertyName("profile")]
    public string? Profile { get; init; }

    [JsonPropertyName("paused")]
    public bool? Paused { get; init; }

    [JsonPropertyName("sessions")]
    public SessionSummary[]? Sessions { get; init; }

    [JsonPropertyName("activeSessionKey")]
    public string? ActiveSessionKey { get; init; }

    [JsonPropertyName("state")]
    public StateVersion? State { get; init; }

    [JsonPropertyName("channels")]
    public JsonElement? Channels { get; init; }

    [JsonPropertyName("config")]
    public JsonElement? Config { get; init; }

    [JsonPropertyName("presence")]
    public PresenceEntry[]? Presence { get; init; }

    [JsonPropertyName("agents")]
    public AgentSummary[]? Agents { get; init; }

    [JsonPropertyName("auth")]
    public JsonElement? Auth { get; init; }
}

public sealed record StateVersion
{
    [JsonPropertyName("version")]
    public long? Version { get; init; }

    [JsonPropertyName("updatedAt")]
    public string? UpdatedAt { get; init; }
}

public sealed record SessionSummary
{
    [JsonPropertyName("key")]
    public string? Key { get; init; }

    [JsonPropertyName("name")]
    public string? Name { get; init; }

    [JsonPropertyName("model")]
    public string? Model { get; init; }

    [JsonPropertyName("provider")]
    public string? Provider { get; init; }

    [JsonPropertyName("createdAt")]
    public string? CreatedAt { get; init; }

    [JsonPropertyName("lastActiveAt")]
    public string? LastActiveAt { get; init; }

    [JsonPropertyName("turnCount")]
    public int? TurnCount { get; init; }
}

public sealed record PresenceEntry
{
    [JsonPropertyName("clientId")]
    public string? ClientId { get; init; }

    [JsonPropertyName("client")]
    public string? Client { get; init; }

    [JsonPropertyName("clientVersion")]
    public string? ClientVersion { get; init; }

    [JsonPropertyName("platform")]
    public string? Platform { get; init; }

    [JsonPropertyName("connectedAt")]
    public string? ConnectedAt { get; init; }

    [JsonPropertyName("deviceName")]
    public string? DeviceName { get; init; }

    [JsonPropertyName("deviceId")]
    public string? DeviceId { get; init; }
}

// ═══════════════════════════════════════════════════════════════════════
// Agent events
// ═══════════════════════════════════════════════════════════════════════

public sealed record AgentEvent
{
    [JsonPropertyName("sessionKey")]
    public string? SessionKey { get; init; }

    [JsonPropertyName("type")]
    public string? Type { get; init; }

    [JsonPropertyName("content")]
    public string? Content { get; init; }

    [JsonPropertyName("role")]
    public string? Role { get; init; }

    [JsonPropertyName("timestamp")]
    public string? Timestamp { get; init; }

    [JsonPropertyName("metadata")]
    public JsonElement? Metadata { get; init; }
}

// ═══════════════════════════════════════════════════════════════════════
// Chat
// ═══════════════════════════════════════════════════════════════════════

public sealed record ChatHistoryParams
{
    [JsonPropertyName("sessionKey")]
    public string? SessionKey { get; init; }

    [JsonPropertyName("limit")]
    public int? Limit { get; init; }

    [JsonPropertyName("before")]
    public string? Before { get; init; }
}

public sealed record ChatSendParams
{
    [JsonPropertyName("sessionKey")]
    public string? SessionKey { get; init; }

    [JsonPropertyName("message")]
    public required string Message { get; init; }

    [JsonPropertyName("attachments")]
    public ChatAttachment[]? Attachments { get; init; }
}

public sealed record ChatAttachment
{
    [JsonPropertyName("type")]
    public string? Type { get; init; }

    [JsonPropertyName("name")]
    public string? Name { get; init; }

    [JsonPropertyName("data")]
    public string? Data { get; init; }

    [JsonPropertyName("mimeType")]
    public string? MimeType { get; init; }
}

public sealed record ChatAbortParams
{
    [JsonPropertyName("sessionKey")]
    public string? SessionKey { get; init; }
}

public sealed record ChatInjectParams
{
    [JsonPropertyName("sessionKey")]
    public string? SessionKey { get; init; }

    [JsonPropertyName("role")]
    public string? Role { get; init; }

    [JsonPropertyName("content")]
    public string? Content { get; init; }
}

public sealed record ChatEvent
{
    [JsonPropertyName("sessionKey")]
    public string? SessionKey { get; init; }

    [JsonPropertyName("type")]
    public string? Type { get; init; }

    [JsonPropertyName("content")]
    public string? Content { get; init; }

    [JsonPropertyName("role")]
    public string? Role { get; init; }

    [JsonPropertyName("timestamp")]
    public string? Timestamp { get; init; }

    [JsonPropertyName("metadata")]
    public JsonElement? Metadata { get; init; }
}

// ═══════════════════════════════════════════════════════════════════════
// Send / Agent
// ═══════════════════════════════════════════════════════════════════════

public sealed record SendParams
{
    [JsonPropertyName("message")]
    public string? Message { get; init; }

    [JsonPropertyName("sessionKey")]
    public string? SessionKey { get; init; }

    [JsonPropertyName("channel")]
    public string? Channel { get; init; }

    [JsonPropertyName("images")]
    public string[]? Images { get; init; }

    [JsonPropertyName("attachments")]
    public JsonElement? Attachments { get; init; }
}

public sealed record AgentParams
{
    [JsonPropertyName("message")]
    public string? Message { get; init; }

    [JsonPropertyName("sessionKey")]
    public string? SessionKey { get; init; }

    [JsonPropertyName("images")]
    public string[]? Images { get; init; }

    [JsonPropertyName("stream")]
    public bool? Stream { get; init; }

    [JsonPropertyName("model")]
    public string? Model { get; init; }

    [JsonPropertyName("provider")]
    public string? Provider { get; init; }

    [JsonPropertyName("systemPrompt")]
    public string? SystemPrompt { get; init; }

    [JsonPropertyName("tools")]
    public bool? Tools { get; init; }
}

public sealed record AgentIdentityParams
{
    [JsonPropertyName("sessionKey")]
    public string? SessionKey { get; init; }
}

public sealed record AgentIdentityResult
{
    [JsonPropertyName("model")]
    public string? Model { get; init; }

    [JsonPropertyName("provider")]
    public string? Provider { get; init; }

    [JsonPropertyName("displayName")]
    public string? DisplayName { get; init; }
}

public sealed record AgentWaitParams
{
    [JsonPropertyName("sessionKey")]
    public string? SessionKey { get; init; }
}

public sealed record WakeParams
{
    [JsonPropertyName("reason")]
    public string? Reason { get; init; }
}

// ═══════════════════════════════════════════════════════════════════════
// Sessions
// ═══════════════════════════════════════════════════════════════════════

public sealed record SessionsListParams
{
    [JsonPropertyName("limit")]
    public int? Limit { get; init; }

    [JsonPropertyName("offset")]
    public int? Offset { get; init; }

    [JsonPropertyName("sortBy")]
    public string? SortBy { get; init; }

    [JsonPropertyName("sortOrder")]
    public string? SortOrder { get; init; }
}

public sealed record SessionsPreviewParams
{
    [JsonPropertyName("sessionKey")]
    public string? SessionKey { get; init; }

    [JsonPropertyName("limit")]
    public int? Limit { get; init; }
}

public sealed record SessionsResolveParams
{
    [JsonPropertyName("sessionKey")]
    public string? SessionKey { get; init; }

    [JsonPropertyName("name")]
    public string? Name { get; init; }

    [JsonPropertyName("create")]
    public bool? Create { get; init; }
}

public sealed record SessionsPatchParams
{
    [JsonPropertyName("sessionKey")]
    public required string SessionKey { get; init; }

    [JsonPropertyName("name")]
    public string? Name { get; init; }

    [JsonPropertyName("model")]
    public string? Model { get; init; }

    [JsonPropertyName("provider")]
    public string? Provider { get; init; }

    [JsonPropertyName("systemPrompt")]
    public string? SystemPrompt { get; init; }
}

public sealed record SessionsResetParams
{
    [JsonPropertyName("sessionKey")]
    public required string SessionKey { get; init; }
}

public sealed record SessionsDeleteParams
{
    [JsonPropertyName("sessionKey")]
    public required string SessionKey { get; init; }
}

public sealed record SessionsCompactParams
{
    [JsonPropertyName("sessionKey")]
    public required string SessionKey { get; init; }
}

public sealed record SessionsUsageParams
{
    [JsonPropertyName("sessionKey")]
    public string? SessionKey { get; init; }

    [JsonPropertyName("period")]
    public string? Period { get; init; }
}

// ═══════════════════════════════════════════════════════════════════════
// Config
// ═══════════════════════════════════════════════════════════════════════

public sealed record ConfigGetParams
{
    [JsonPropertyName("key")]
    public string? Key { get; init; }
}

public sealed record ConfigSetParams
{
    [JsonPropertyName("key")]
    public required string Key { get; init; }

    [JsonPropertyName("value")]
    public required JsonElement Value { get; init; }
}

public sealed record ConfigApplyParams
{
    [JsonPropertyName("config")]
    public required JsonElement Config { get; init; }

    [JsonPropertyName("merge")]
    public bool? Merge { get; init; }
}

public sealed record ConfigPatchParams
{
    [JsonPropertyName("operations")]
    public required ConfigPatchOperation[] Operations { get; init; }
}

public sealed record ConfigPatchOperation
{
    [JsonPropertyName("op")]
    public required string Op { get; init; }

    [JsonPropertyName("path")]
    public required string Path { get; init; }

    [JsonPropertyName("value")]
    public JsonElement? Value { get; init; }
}

public sealed record ConfigSchemaParams;

public sealed record ConfigSchemaResponse
{
    [JsonPropertyName("schema")]
    public JsonElement? Schema { get; init; }
}

// ═══════════════════════════════════════════════════════════════════════
// Wizard
// ═══════════════════════════════════════════════════════════════════════

public sealed record WizardStartParams
{
    [JsonPropertyName("wizardId")]
    public required string WizardId { get; init; }

    [JsonPropertyName("params")]
    public JsonElement? Params { get; init; }
}

public sealed record WizardNextParams
{
    [JsonPropertyName("wizardId")]
    public required string WizardId { get; init; }

    [JsonPropertyName("input")]
    public JsonElement? Input { get; init; }
}

public sealed record WizardCancelParams
{
    [JsonPropertyName("wizardId")]
    public required string WizardId { get; init; }
}

public sealed record WizardStatusParams
{
    [JsonPropertyName("wizardId")]
    public required string WizardId { get; init; }
}

public sealed record WizardStep
{
    [JsonPropertyName("stepId")]
    public string? StepId { get; init; }

    [JsonPropertyName("title")]
    public string? Title { get; init; }

    [JsonPropertyName("description")]
    public string? Description { get; init; }

    [JsonPropertyName("fields")]
    public JsonElement? Fields { get; init; }

    [JsonPropertyName("actions")]
    public JsonElement? Actions { get; init; }
}

public sealed record WizardNextResult
{
    [JsonPropertyName("done")]
    public bool? Done { get; init; }

    [JsonPropertyName("step")]
    public WizardStep? Step { get; init; }

    [JsonPropertyName("result")]
    public JsonElement? Result { get; init; }
}

public sealed record WizardStartResult
{
    [JsonPropertyName("wizardId")]
    public string? WizardId { get; init; }

    [JsonPropertyName("step")]
    public WizardStep? Step { get; init; }
}

public sealed record WizardStatusResult
{
    [JsonPropertyName("active")]
    public bool? Active { get; init; }

    [JsonPropertyName("step")]
    public WizardStep? Step { get; init; }
}

// ═══════════════════════════════════════════════════════════════════════
// Models
// ═══════════════════════════════════════════════════════════════════════

public sealed record ModelChoice
{
    [JsonPropertyName("id")]
    public string? Id { get; init; }

    [JsonPropertyName("name")]
    public string? Name { get; init; }

    [JsonPropertyName("provider")]
    public string? Provider { get; init; }

    [JsonPropertyName("description")]
    public string? Description { get; init; }

    [JsonPropertyName("contextWindow")]
    public int? ContextWindow { get; init; }
}

public sealed record ModelsListParams;

public sealed record ModelsListResult
{
    [JsonPropertyName("models")]
    public ModelChoice[]? Models { get; init; }
}

// ═══════════════════════════════════════════════════════════════════════
// Agents (multi-agent)
// ═══════════════════════════════════════════════════════════════════════

public sealed record AgentSummary
{
    [JsonPropertyName("id")]
    public string? Id { get; init; }

    [JsonPropertyName("name")]
    public string? Name { get; init; }

    [JsonPropertyName("description")]
    public string? Description { get; init; }

    [JsonPropertyName("model")]
    public string? Model { get; init; }

    [JsonPropertyName("provider")]
    public string? Provider { get; init; }
}

public sealed record AgentsCreateParams
{
    [JsonPropertyName("name")]
    public required string Name { get; init; }

    [JsonPropertyName("description")]
    public string? Description { get; init; }

    [JsonPropertyName("model")]
    public string? Model { get; init; }

    [JsonPropertyName("provider")]
    public string? Provider { get; init; }
}

public sealed record AgentsCreateResult
{
    [JsonPropertyName("id")]
    public string? Id { get; init; }

    [JsonPropertyName("name")]
    public string? Name { get; init; }
}

public sealed record AgentsUpdateParams
{
    [JsonPropertyName("id")]
    public required string Id { get; init; }

    [JsonPropertyName("name")]
    public string? Name { get; init; }

    [JsonPropertyName("description")]
    public string? Description { get; init; }

    [JsonPropertyName("model")]
    public string? Model { get; init; }

    [JsonPropertyName("provider")]
    public string? Provider { get; init; }
}

public sealed record AgentsUpdateResult
{
    [JsonPropertyName("id")]
    public string? Id { get; init; }
}

public sealed record AgentsDeleteParams
{
    [JsonPropertyName("id")]
    public required string Id { get; init; }
}

public sealed record AgentsDeleteResult
{
    [JsonPropertyName("ok")]
    public bool? Ok { get; init; }
}

public sealed record AgentsFileEntry
{
    [JsonPropertyName("name")]
    public string? Name { get; init; }

    [JsonPropertyName("path")]
    public string? Path { get; init; }

    [JsonPropertyName("size")]
    public long? Size { get; init; }

    [JsonPropertyName("mimeType")]
    public string? MimeType { get; init; }
}

public sealed record AgentsFilesListParams
{
    [JsonPropertyName("agentId")]
    public required string AgentId { get; init; }
}

public sealed record AgentsFilesListResult
{
    [JsonPropertyName("files")]
    public AgentsFileEntry[]? Files { get; init; }
}

public sealed record AgentsFilesGetParams
{
    [JsonPropertyName("agentId")]
    public required string AgentId { get; init; }

    [JsonPropertyName("path")]
    public required string Path { get; init; }
}

public sealed record AgentsFilesGetResult
{
    [JsonPropertyName("content")]
    public string? Content { get; init; }

    [JsonPropertyName("mimeType")]
    public string? MimeType { get; init; }
}

public sealed record AgentsFilesSetParams
{
    [JsonPropertyName("agentId")]
    public required string AgentId { get; init; }

    [JsonPropertyName("path")]
    public required string Path { get; init; }

    [JsonPropertyName("content")]
    public required string Content { get; init; }
}

public sealed record AgentsFilesSetResult
{
    [JsonPropertyName("ok")]
    public bool? Ok { get; init; }
}

public sealed record AgentsListParams;

public sealed record AgentsListResult
{
    [JsonPropertyName("agents")]
    public AgentSummary[]? Agents { get; init; }
}

// ═══════════════════════════════════════════════════════════════════════
// Skills
// ═══════════════════════════════════════════════════════════════════════

public sealed record SkillsStatusParams;

public sealed record SkillsBinsParams;

public sealed record SkillsBinsResult
{
    [JsonPropertyName("bins")]
    public JsonElement? Bins { get; init; }
}

public sealed record SkillsInstallParams
{
    [JsonPropertyName("skill")]
    public required string Skill { get; init; }

    [JsonPropertyName("version")]
    public string? Version { get; init; }
}

public sealed record SkillsUpdateParams
{
    [JsonPropertyName("skill")]
    public required string Skill { get; init; }
}

// ═══════════════════════════════════════════════════════════════════════
// Channels
// ═══════════════════════════════════════════════════════════════════════

public sealed record ChannelsStatusParams;

public sealed record ChannelsStatusResult
{
    [JsonPropertyName("channels")]
    public JsonElement? Channels { get; init; }
}

public sealed record ChannelsLogoutParams
{
    [JsonPropertyName("channel")]
    public required string Channel { get; init; }
}

public sealed record WebLoginStartParams
{
    [JsonPropertyName("channel")]
    public required string Channel { get; init; }

    [JsonPropertyName("provider")]
    public string? Provider { get; init; }
}

public sealed record WebLoginWaitParams
{
    [JsonPropertyName("channel")]
    public required string Channel { get; init; }
}

// ═══════════════════════════════════════════════════════════════════════
// Cron
// ═══════════════════════════════════════════════════════════════════════

public sealed record CronJob
{
    [JsonPropertyName("id")]
    public string? Id { get; init; }

    [JsonPropertyName("name")]
    public string? Name { get; init; }

    [JsonPropertyName("schedule")]
    public string? Schedule { get; init; }

    [JsonPropertyName("message")]
    public string? Message { get; init; }

    [JsonPropertyName("sessionKey")]
    public string? SessionKey { get; init; }

    [JsonPropertyName("enabled")]
    public bool? Enabled { get; init; }

    [JsonPropertyName("lastRun")]
    public string? LastRun { get; init; }

    [JsonPropertyName("nextRun")]
    public string? NextRun { get; init; }

    [JsonPropertyName("timezone")]
    public string? Timezone { get; init; }

    [JsonPropertyName("channel")]
    public string? Channel { get; init; }
}

public sealed record CronListParams;

public sealed record CronStatusParams;

public sealed record CronAddParams
{
    [JsonPropertyName("name")]
    public string? Name { get; init; }

    [JsonPropertyName("schedule")]
    public required string Schedule { get; init; }

    [JsonPropertyName("message")]
    public required string Message { get; init; }

    [JsonPropertyName("sessionKey")]
    public string? SessionKey { get; init; }

    [JsonPropertyName("enabled")]
    public bool? Enabled { get; init; }

    [JsonPropertyName("timezone")]
    public string? Timezone { get; init; }

    [JsonPropertyName("channel")]
    public string? Channel { get; init; }
}

public sealed record CronRunLogEntry
{
    [JsonPropertyName("id")]
    public string? Id { get; init; }

    [JsonPropertyName("cronId")]
    public string? CronId { get; init; }

    [JsonPropertyName("startedAt")]
    public string? StartedAt { get; init; }

    [JsonPropertyName("finishedAt")]
    public string? FinishedAt { get; init; }

    [JsonPropertyName("status")]
    public string? Status { get; init; }

    [JsonPropertyName("error")]
    public string? Error { get; init; }
}

// ═══════════════════════════════════════════════════════════════════════
// Talk mode
// ═══════════════════════════════════════════════════════════════════════

public sealed record TalkModeParams
{
    [JsonPropertyName("action")]
    public required string Action { get; init; }

    [JsonPropertyName("sessionKey")]
    public string? SessionKey { get; init; }
}

// ═══════════════════════════════════════════════════════════════════════
// Logs
// ═══════════════════════════════════════════════════════════════════════

public sealed record LogsTailParams
{
    [JsonPropertyName("lines")]
    public int? Lines { get; init; }

    [JsonPropertyName("follow")]
    public bool? Follow { get; init; }

    [JsonPropertyName("filter")]
    public string? Filter { get; init; }
}

public sealed record LogsTailResult
{
    [JsonPropertyName("lines")]
    public string[]? Lines { get; init; }
}

// ═══════════════════════════════════════════════════════════════════════
// Exec approvals
// ═══════════════════════════════════════════════════════════════════════

public sealed record ExecApprovalsGetParams;

public sealed record ExecApprovalsSetParams
{
    [JsonPropertyName("policy")]
    public required string Policy { get; init; }
}

public sealed record ExecApprovalsNodeGetParams
{
    [JsonPropertyName("nodeId")]
    public required string NodeId { get; init; }
}

public sealed record ExecApprovalsNodeSetParams
{
    [JsonPropertyName("nodeId")]
    public required string NodeId { get; init; }

    [JsonPropertyName("policy")]
    public required string Policy { get; init; }
}

public sealed record ExecApprovalsSnapshot
{
    [JsonPropertyName("policy")]
    public string? Policy { get; init; }

    [JsonPropertyName("nodes")]
    public JsonElement? Nodes { get; init; }
}

public sealed record ExecApprovalRequestParams
{
    [JsonPropertyName("requestId")]
    public string? RequestId { get; init; }

    [JsonPropertyName("sessionKey")]
    public string? SessionKey { get; init; }

    [JsonPropertyName("command")]
    public string? Command { get; init; }

    [JsonPropertyName("cwd")]
    public string? Cwd { get; init; }

    [JsonPropertyName("reason")]
    public string? Reason { get; init; }

    [JsonPropertyName("riskLevel")]
    public string? RiskLevel { get; init; }
}

public sealed record ExecApprovalResolveParams
{
    [JsonPropertyName("requestId")]
    public required string RequestId { get; init; }

    [JsonPropertyName("approved")]
    public required bool Approved { get; init; }

    [JsonPropertyName("remember")]
    public bool? Remember { get; init; }
}

// ═══════════════════════════════════════════════════════════════════════
// Node pairing
// ═══════════════════════════════════════════════════════════════════════

public sealed record NodePairRequestParams
{
    [JsonPropertyName("nodeName")]
    public string? NodeName { get; init; }

    [JsonPropertyName("nodeId")]
    public string? NodeId { get; init; }

    [JsonPropertyName("capabilities")]
    public JsonElement? Capabilities { get; init; }
}

public sealed record NodePairListParams;

public sealed record NodePairApproveParams
{
    [JsonPropertyName("requestId")]
    public required string RequestId { get; init; }
}

public sealed record NodePairRejectParams
{
    [JsonPropertyName("requestId")]
    public required string RequestId { get; init; }
}

public sealed record NodePairVerifyParams
{
    [JsonPropertyName("nodeId")]
    public required string NodeId { get; init; }

    [JsonPropertyName("token")]
    public required string Token { get; init; }
}

public sealed record NodeRenameParams
{
    [JsonPropertyName("nodeId")]
    public required string NodeId { get; init; }

    [JsonPropertyName("name")]
    public required string Name { get; init; }
}

public sealed record NodeListParams;

public sealed record NodeDescribeParams
{
    [JsonPropertyName("nodeId")]
    public required string NodeId { get; init; }
}

public sealed record NodeInvokeParams
{
    [JsonPropertyName("nodeId")]
    public required string NodeId { get; init; }

    [JsonPropertyName("method")]
    public required string Method { get; init; }

    [JsonPropertyName("params")]
    public JsonElement? Params { get; init; }
}

public sealed record NodeInvokeResultParams
{
    [JsonPropertyName("requestId")]
    public required string RequestId { get; init; }

    [JsonPropertyName("ok")]
    public required bool Ok { get; init; }

    [JsonPropertyName("payload")]
    public JsonElement? Payload { get; init; }

    [JsonPropertyName("error")]
    public ErrorShape? Error { get; init; }
}

public sealed record NodeEventParams
{
    [JsonPropertyName("event")]
    public required string Event { get; init; }

    [JsonPropertyName("payload")]
    public JsonElement? Payload { get; init; }
}

public sealed record NodeInvokeRequestEvent
{
    [JsonPropertyName("requestId")]
    public string? RequestId { get; init; }

    [JsonPropertyName("nodeId")]
    public string? NodeId { get; init; }

    [JsonPropertyName("method")]
    public string? Method { get; init; }

    [JsonPropertyName("params")]
    public JsonElement? Params { get; init; }
}

// ═══════════════════════════════════════════════════════════════════════
// Device pairing
// ═══════════════════════════════════════════════════════════════════════

public sealed record DevicePairListParams;

public sealed record DevicePairApproveParams
{
    [JsonPropertyName("requestId")]
    public required string RequestId { get; init; }
}

public sealed record DevicePairRejectParams
{
    [JsonPropertyName("requestId")]
    public required string RequestId { get; init; }
}

public sealed record DeviceTokenRotateParams
{
    [JsonPropertyName("deviceId")]
    public required string DeviceId { get; init; }
}

public sealed record DeviceTokenRevokeParams
{
    [JsonPropertyName("deviceId")]
    public required string DeviceId { get; init; }
}

public sealed record DevicePairRequestedEvent
{
    [JsonPropertyName("requestId")]
    public string? RequestId { get; init; }

    [JsonPropertyName("deviceName")]
    public string? DeviceName { get; init; }

    [JsonPropertyName("deviceId")]
    public string? DeviceId { get; init; }

    [JsonPropertyName("platform")]
    public string? Platform { get; init; }

    [JsonPropertyName("ip")]
    public string? Ip { get; init; }
}

public sealed record DevicePairResolvedEvent
{
    [JsonPropertyName("requestId")]
    public string? RequestId { get; init; }

    [JsonPropertyName("approved")]
    public bool? Approved { get; init; }

    [JsonPropertyName("deviceId")]
    public string? DeviceId { get; init; }
}

// ═══════════════════════════════════════════════════════════════════════
// Update & system events
// ═══════════════════════════════════════════════════════════════════════

public sealed record UpdateRunParams;

public sealed record TickEvent
{
    [JsonPropertyName("timestamp")]
    public string? Timestamp { get; init; }
}

public sealed record ShutdownEvent
{
    [JsonPropertyName("reason")]
    public string? Reason { get; init; }
}

public sealed record PollParams
{
    [JsonPropertyName("sessionKey")]
    public string? SessionKey { get; init; }

    [JsonPropertyName("since")]
    public long? Since { get; init; }
}
