import type {
  GatewayControlUiContinuityHandoffMode,
  GatewayControlUiContinuityHandoffSurface,
  GatewayControlUiContinuityPolicyConfig,
  GatewayControlUiContinuityPolicyRuleConfig,
  OpenSoulConfig,
} from "../config/config.js";
import type { SessionChatType, SessionEntry } from "../config/sessions/types.js";
import type { AgentRunContext } from "../infra/agent-events.js";
import type { HandoffDecision, RunContinuityStats, TaskRecord } from "./types.js";
import { normalizeChatType } from "../channels/chat-type.js";
import { loadSessionEntry } from "../gateway/session-utils.js";
import { normalizeAccountId } from "../utils/account-id.js";
import { normalizeMessageChannel } from "../utils/message-channel.js";
import { buildControlUiDeepLink, resolveCanvasCapableNodeId } from "./handoff.js";
import { isTaskOpenForPolicy, listTaskEvents } from "./service.js";

const DEFAULT_HANDOFF_COOLDOWN_MS = 10 * 60_000;
const DEFAULT_ASSISTANT_CHARS_THRESHOLD = 800;
const DEFAULT_TOOL_EVENTS_THRESHOLD = 4;

function isContinuityHandoffEnabled(cfg: OpenSoulConfig): boolean {
  return cfg.gateway?.controlUi?.continuity?.features?.handoff !== false;
}

type SurfacePolicyContext = {
  agentId: string;
  channel?: string;
  chatType?: SessionChatType;
  accountId?: string;
};

type ResolvedSurfacePolicy = {
  enabled: boolean;
  cooldownMs: number;
  defaultMode: GatewayControlUiContinuityHandoffMode;
  disabledSurfaces: Array<GatewayControlUiContinuityHandoffSurface>;
  thresholds: {
    assistantChars: number;
    toolEvents: number;
  };
  signals: {
    subagent: boolean;
    comparison: boolean;
  };
  policyMatch: NonNullable<HandoffDecision["policyMatch"]>;
};

const DEFAULT_SURFACE_POLICY: ResolvedSurfacePolicy = {
  enabled: true,
  cooldownMs: DEFAULT_HANDOFF_COOLDOWN_MS,
  defaultMode: "control-ui+canvas",
  disabledSurfaces: [],
  thresholds: {
    assistantChars: DEFAULT_ASSISTANT_CHARS_THRESHOLD,
    toolEvents: DEFAULT_TOOL_EVENTS_THRESHOLD,
  },
  signals: {
    subagent: true,
    comparison: true,
  },
  policyMatch: {
    source: "default",
  },
};

function hasComparisonSignal(text: string | undefined): boolean {
  if (!text) {
    return false;
  }
  const normalized = text.toLowerCase();
  if (
    normalized.includes("option 1") ||
    normalized.includes("option a") ||
    normalized.includes("compare") ||
    normalized.includes("trade-off")
  ) {
    return true;
  }
  const bulletCount = (text.match(/^\s*[-*]\s+/gm) ?? []).length;
  const numberedCount = (text.match(/^\s*\d+\.\s+/gm) ?? []).length;
  return bulletCount >= 2 || numberedCount >= 2;
}

function normalizeString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

function normalizeChannel(value: unknown): string | undefined {
  const trimmed = normalizeString(value);
  if (!trimmed) {
    return undefined;
  }
  return normalizeMessageChannel(trimmed) ?? trimmed.toLowerCase();
}

function normalizeChatTypeValue(value: unknown): SessionChatType | undefined {
  if (typeof value !== "string") {
    return undefined;
  }
  return normalizeChatType(value);
}

function normalizeMode(value: unknown): GatewayControlUiContinuityHandoffMode | undefined {
  return value === "control-ui" || value === "control-ui+canvas" ? value : undefined;
}

function normalizeSurface(value: unknown): GatewayControlUiContinuityHandoffSurface | undefined {
  return value === "control-ui" || value === "canvas" ? value : undefined;
}

function normalizeStringList<T extends string>(
  value: unknown,
  normalizeItem: (item: unknown) => T | undefined,
): Array<T> | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }
  const items = value
    .map((entry) => normalizeItem(entry))
    .filter((entry): entry is T => entry != null);
  return items.length > 0 ? [...new Set(items)] : undefined;
}

function normalizeDisabledSurfaces(
  value: unknown,
  fallback: Array<GatewayControlUiContinuityHandoffSurface>,
): Array<GatewayControlUiContinuityHandoffSurface> {
  return normalizeStringList(value, normalizeSurface) ?? fallback;
}

function normalizeNonNegativeInteger(value: unknown, fallback: number): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    return fallback;
  }
  return Math.floor(value);
}

function resolvePolicyContext(params: {
  agentId: string;
  task: TaskRecord;
  sessionEntry?: SessionEntry;
}): SurfacePolicyContext {
  return {
    agentId: normalizeString(params.agentId) ?? params.agentId,
    channel: normalizeChannel(
      params.task.sourceSurface?.channel ??
        params.task.currentSurface?.channel ??
        params.sessionEntry?.lastChannel ??
        params.sessionEntry?.channel,
    ),
    chatType: normalizeChatTypeValue(
      params.sessionEntry?.chatType ??
        params.task.sourceSurface?.chatType ??
        params.task.currentSurface?.chatType,
    ),
    accountId: normalizeAccountId(
      params.sessionEntry?.lastAccountId ??
        params.sessionEntry?.deliveryContext?.accountId ??
        params.sessionEntry?.origin?.accountId,
    ),
  };
}

function mergePolicyConfig(
  fallback: ResolvedSurfacePolicy,
  config:
    | GatewayControlUiContinuityPolicyConfig
    | GatewayControlUiContinuityPolicyRuleConfig
    | undefined,
  policyMatch: ResolvedSurfacePolicy["policyMatch"],
): ResolvedSurfacePolicy {
  const thresholds = config?.thresholds;
  const signals = config?.signals;
  return {
    enabled: typeof config?.enabled === "boolean" ? config.enabled : fallback.enabled,
    cooldownMs: normalizeNonNegativeInteger(config?.cooldownMs, fallback.cooldownMs),
    defaultMode: normalizeMode(config?.defaultMode) ?? fallback.defaultMode,
    disabledSurfaces: normalizeDisabledSurfaces(
      config?.disabledSurfaces,
      fallback.disabledSurfaces,
    ),
    thresholds: {
      assistantChars: normalizeNonNegativeInteger(
        thresholds?.assistantChars,
        fallback.thresholds.assistantChars,
      ),
      toolEvents: normalizeNonNegativeInteger(
        thresholds?.toolEvents,
        fallback.thresholds.toolEvents,
      ),
    },
    signals: {
      subagent:
        typeof signals?.subagent === "boolean" ? signals.subagent : fallback.signals.subagent,
      comparison:
        typeof signals?.comparison === "boolean" ? signals.comparison : fallback.signals.comparison,
    },
    policyMatch,
  };
}

function matchesRuleDimension(
  candidate: string | undefined,
  expected: Array<string> | undefined,
): boolean {
  if (!expected || expected.length === 0) {
    return true;
  }
  if (!candidate) {
    return false;
  }
  return expected.includes(candidate);
}

function matchesPolicyRule(
  rule: GatewayControlUiContinuityPolicyRuleConfig,
  context: SurfacePolicyContext,
): boolean {
  return (
    matchesRuleDimension(context.agentId, normalizeStringList(rule.agents, normalizeString)) &&
    matchesRuleDimension(context.channel, normalizeStringList(rule.channels, normalizeChannel)) &&
    matchesRuleDimension(
      context.chatType,
      normalizeStringList(rule.chatTypes, normalizeChatTypeValue),
    ) &&
    matchesRuleDimension(
      context.accountId,
      normalizeStringList(rule.accountIds, (value) => normalizeAccountId(normalizeString(value))),
    )
  );
}

function resolvePolicyRuleId(
  rule: GatewayControlUiContinuityPolicyRuleConfig,
  index: number,
): string {
  return normalizeString(rule.id) ?? `rule[${index + 1}]`;
}

function resolveSurfacePolicy(params: {
  cfg: OpenSoulConfig;
  agentId: string;
  task: TaskRecord;
  sessionEntry?: SessionEntry;
}): ResolvedSurfacePolicy {
  const configured = params.cfg.gateway?.controlUi?.continuity?.policy;
  const basePolicy = mergePolicyConfig(DEFAULT_SURFACE_POLICY, configured, { source: "default" });
  const context = resolvePolicyContext(params);
  const rules = Array.isArray(configured?.rules) ? configured.rules : [];
  for (let index = 0; index < rules.length; index += 1) {
    const rule = rules[index];
    if (!rule || typeof rule !== "object") {
      continue;
    }
    if (!matchesPolicyRule(rule, context)) {
      continue;
    }
    return mergePolicyConfig(basePolicy, rule, {
      source: "rule",
      ruleId: resolvePolicyRuleId(rule, index),
    });
  }
  return basePolicy;
}

function resolveEligibleHandoffMode(policy: ResolvedSurfacePolicy): HandoffDecision["mode"] {
  if (policy.disabledSurfaces.includes("control-ui")) {
    return "none";
  }
  if (policy.defaultMode === "control-ui+canvas" && !policy.disabledSurfaces.includes("canvas")) {
    return "control-ui+canvas";
  }
  return "control-ui";
}

function shouldSkipBecauseOfRecentHandoff(params: {
  cfg: OpenSoulConfig;
  agentId: string;
  taskId: string;
  cooldownMs: number;
}): boolean {
  if (params.cooldownMs <= 0) {
    return false;
  }
  const recentEvents = listTaskEvents({
    cfg: params.cfg,
    agentId: params.agentId,
    taskId: params.taskId,
    limit: 12,
  });
  const cutoff = Date.now() - params.cooldownMs;
  return recentEvents.some(
    (event) => event.createdAt >= cutoff && event.kind.startsWith("handoff.control-ui"),
  );
}

export async function evaluateSurfacePolicy(params: {
  cfg: OpenSoulConfig;
  agentId: string;
  task: TaskRecord;
  sessionKey?: string;
  runContext?: AgentRunContext;
  stats: RunContinuityStats;
}): Promise<HandoffDecision> {
  function noneDecision(
    reason: string,
    extras?: Pick<HandoffDecision, "complexitySignals" | "policyMatch">,
  ): HandoffDecision {
    return {
      mode: "none",
      reason,
      ...extras,
    };
  }

  if (!isContinuityHandoffEnabled(params.cfg)) {
    return noneDecision("continuity handoff disabled by config", {
      policyMatch: { source: "default" },
    });
  }
  if (!params.runContext?.handoffEligible) {
    return noneDecision("handoff disabled");
  }
  const sessionKey = params.sessionKey?.trim();
  if (!sessionKey) {
    return noneDecision("missing session");
  }
  if (!isTaskOpenForPolicy(params.task.status)) {
    return noneDecision("task not handoff-eligible");
  }
  if (
    params.task.currentSurface?.kind === "control-ui" ||
    params.task.currentSurface?.kind === "canvas"
  ) {
    return noneDecision("already on richer surface");
  }

  const sessionEntry = loadSessionEntry(sessionKey).entry;
  const policy = resolveSurfacePolicy({
    cfg: params.cfg,
    agentId: params.agentId,
    task: params.task,
    sessionEntry,
  });
  if (!policy.enabled) {
    return noneDecision("policy disabled", { policyMatch: policy.policyMatch });
  }
  if (!sessionEntry || sessionEntry.chatType === "group" || sessionEntry.chatType === "channel") {
    return noneDecision("not a direct chat", { policyMatch: policy.policyMatch });
  }
  const sourceSurface = params.runContext.sourceSurface?.trim();
  if (sourceSurface && sourceSurface !== "direct-chat") {
    return noneDecision("source surface not eligible", { policyMatch: policy.policyMatch });
  }
  if (
    shouldSkipBecauseOfRecentHandoff({
      cfg: params.cfg,
      agentId: params.agentId,
      taskId: params.task.taskId,
      cooldownMs: policy.cooldownMs,
    })
  ) {
    return noneDecision("handoff cooldown active", { policyMatch: policy.policyMatch });
  }

  const complexitySignals: Array<string> = [];
  if (params.stats.assistantChars >= policy.thresholds.assistantChars) {
    complexitySignals.push("assistant-long");
  }
  if (params.stats.toolEventCount >= policy.thresholds.toolEvents) {
    complexitySignals.push("tool-heavy");
  }
  if (policy.signals.subagent && params.stats.usedSubagent) {
    complexitySignals.push("used-subagent");
  }
  if (policy.signals.comparison && hasComparisonSignal(params.stats.assistantText)) {
    complexitySignals.push("multi-option");
  }
  if (complexitySignals.length === 0) {
    return noneDecision("complexity threshold not met", {
      complexitySignals,
      policyMatch: policy.policyMatch,
    });
  }

  const eligibleMode = resolveEligibleHandoffMode(policy);
  if (eligibleMode === "none") {
    return noneDecision("control-ui surface disabled by policy", {
      complexitySignals,
      policyMatch: policy.policyMatch,
    });
  }

  const controlUiUrl = buildControlUiDeepLink({
    cfg: params.cfg,
    sessionKey,
  });
  if (!controlUiUrl) {
    return noneDecision("missing gateway.controlUi.publicUrl", {
      complexitySignals,
      policyMatch: policy.policyMatch,
    });
  }

  if (eligibleMode === "control-ui") {
    return {
      mode: "control-ui",
      reason: complexitySignals.join(", "),
      controlUiUrl,
      complexitySignals,
      policyMatch: policy.policyMatch,
    };
  }

  const canvasNodeId = await resolveCanvasCapableNodeId(params.cfg).catch(() => undefined);
  if (canvasNodeId) {
    return {
      mode: "control-ui+canvas",
      reason: complexitySignals.join(", "),
      controlUiUrl,
      canvasNodeId,
      complexitySignals,
      policyMatch: policy.policyMatch,
    };
  }

  return {
    mode: "control-ui",
    reason: complexitySignals.join(", "),
    controlUiUrl,
    complexitySignals,
    policyMatch: policy.policyMatch,
  };
}
