namespace OpenSoul.Protocol;

/// <summary>
/// All known gateway request method names.
/// Mirrors BASE_METHODS from server-methods-list.ts.
/// </summary>
public static class GatewayMethod
{
    // Health / System
    public const string Health = "health";
    public const string Status = "status";
    public const string LastHeartbeat = "last-heartbeat";
    public const string SetHeartbeats = "set-heartbeats";
    public const string SystemPresence = "system-presence";
    public const string SystemEvent = "system-event";

    // Logs
    public const string LogsTail = "logs.tail";

    // Channels
    public const string ChannelsStatus = "channels.status";
    public const string ChannelsLogout = "channels.logout";

    // Usage
    public const string UsageStatus = "usage.status";
    public const string UsageCost = "usage.cost";

    // TTS
    public const string TtsStatus = "tts.status";
    public const string TtsProviders = "tts.providers";
    public const string TtsEnable = "tts.enable";
    public const string TtsDisable = "tts.disable";
    public const string TtsConvert = "tts.convert";
    public const string TtsSetProvider = "tts.setProvider";

    // Config
    public const string ConfigGet = "config.get";
    public const string ConfigSet = "config.set";
    public const string ConfigApply = "config.apply";
    public const string ConfigPatch = "config.patch";
    public const string ConfigSchema = "config.schema";

    // Exec Approvals
    public const string ExecApprovalsGet = "exec.approvals.get";
    public const string ExecApprovalsSet = "exec.approvals.set";
    public const string ExecApprovalsNodeGet = "exec.approvals.node.get";
    public const string ExecApprovalsNodeSet = "exec.approvals.node.set";
    public const string ExecApprovalRequest = "exec.approval.request";
    public const string ExecApprovalResolve = "exec.approval.resolve";

    // Wizard
    public const string WizardStart = "wizard.start";
    public const string WizardNext = "wizard.next";
    public const string WizardCancel = "wizard.cancel";
    public const string WizardStatus = "wizard.status";

    // Talk
    public const string TalkMode = "talk.mode";

    // Models
    public const string ModelsList = "models.list";

    // Agents
    public const string AgentsList = "agents.list";
    public const string AgentsCreate = "agents.create";
    public const string AgentsUpdate = "agents.update";
    public const string AgentsDelete = "agents.delete";
    public const string AgentsFilesList = "agents.files.list";
    public const string AgentsFilesGet = "agents.files.get";
    public const string AgentsFilesSet = "agents.files.set";

    // Skills
    public const string SkillsStatus = "skills.status";
    public const string SkillsBins = "skills.bins";
    public const string SkillsInstall = "skills.install";
    public const string SkillsUpdate = "skills.update";

    // Update
    public const string UpdateRun = "update.run";

    // VoiceWake
    public const string VoiceWakeGet = "voicewake.get";
    public const string VoiceWakeSet = "voicewake.set";

    // Sessions
    public const string SessionsList = "sessions.list";
    public const string SessionsPreview = "sessions.preview";
    public const string SessionsPatch = "sessions.patch";
    public const string SessionsReset = "sessions.reset";
    public const string SessionsDelete = "sessions.delete";
    public const string SessionsCompact = "sessions.compact";
    public const string SessionsResolve = "sessions.resolve";
    public const string SessionsUsage = "sessions.usage";

    // Wake
    public const string Wake = "wake";

    // Node pairing
    public const string NodePairRequest = "node.pair.request";
    public const string NodePairList = "node.pair.list";
    public const string NodePairApprove = "node.pair.approve";
    public const string NodePairReject = "node.pair.reject";
    public const string NodePairVerify = "node.pair.verify";

    // Device pairing
    public const string DevicePairList = "device.pair.list";
    public const string DevicePairApprove = "device.pair.approve";
    public const string DevicePairReject = "device.pair.reject";
    public const string DeviceTokenRotate = "device.token.rotate";
    public const string DeviceTokenRevoke = "device.token.revoke";

    // Node operations
    public const string NodeRename = "node.rename";
    public const string NodeList = "node.list";
    public const string NodeDescribe = "node.describe";
    public const string NodeInvoke = "node.invoke";
    public const string NodeInvokeResult = "node.invoke.result";
    public const string NodeEvent = "node.event";

    // Cron
    public const string CronList = "cron.list";
    public const string CronStatus = "cron.status";
    public const string CronAdd = "cron.add";
    public const string CronUpdate = "cron.update";
    public const string CronRemove = "cron.remove";
    public const string CronRun = "cron.run";
    public const string CronRuns = "cron.runs";

    // Send / Agent
    public const string Send = "send";
    public const string Agent = "agent";
    public const string AgentIdentityGet = "agent.identity.get";
    public const string AgentWait = "agent.wait";

    // Browser
    public const string BrowserRequest = "browser.request";

    // Chat (WebChat)
    public const string ChatHistory = "chat.history";
    public const string ChatAbort = "chat.abort";
    public const string ChatSend = "chat.send";
    public const string ChatInject = "chat.inject";
}

/// <summary>
/// All known gateway event names.
/// Mirrors GATEWAY_EVENTS from server-methods-list.ts.
/// </summary>
public static class GatewayEvent
{
    public const string ConnectChallenge = "connect.challenge";
    public const string Agent = "agent";
    public const string Chat = "chat";
    public const string Presence = "presence";
    public const string Tick = "tick";
    public const string TalkMode = "talk.mode";
    public const string Shutdown = "shutdown";
    public const string Health = "health";
    public const string Heartbeat = "heartbeat";
    public const string Cron = "cron";
    public const string NodePairRequested = "node.pair.requested";
    public const string NodePairResolved = "node.pair.resolved";
    public const string NodeInvokeRequest = "node.invoke.request";
    public const string DevicePairRequested = "device.pair.requested";
    public const string DevicePairResolved = "device.pair.resolved";
    public const string VoiceWakeChanged = "voicewake.changed";
    public const string ExecApprovalRequested = "exec.approval.requested";
    public const string ExecApprovalResolved = "exec.approval.resolved";
}
