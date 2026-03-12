import type { OpenSoulConfig } from "../config/config.js";
import type { AgentRunContext } from "../infra/agent-events.js";
import type { HandoffDecision, RunContinuityStats, TaskRecord } from "./types.js";
import { loadSessionEntry } from "../gateway/session-utils.js";
import { buildControlUiDeepLink, resolveCanvasCapableNodeId } from "./handoff.js";
import { isTaskOpenForPolicy, listTaskEvents } from "./service.js";

const HANDOFF_COOLDOWN_MS = 10 * 60_000;

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

function shouldSkipBecauseOfRecentHandoff(params: {
  cfg: OpenSoulConfig;
  agentId: string;
  taskId: string;
}): boolean {
  const recentEvents = listTaskEvents({
    cfg: params.cfg,
    agentId: params.agentId,
    taskId: params.taskId,
    limit: 12,
  });
  const cutoff = Date.now() - HANDOFF_COOLDOWN_MS;
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
  if (!params.runContext?.handoffEligible) {
    return { mode: "none", reason: "handoff disabled" };
  }
  const sessionKey = params.sessionKey?.trim();
  if (!sessionKey) {
    return { mode: "none", reason: "missing session" };
  }
  if (!isTaskOpenForPolicy(params.task.status)) {
    return { mode: "none", reason: "task not handoff-eligible" };
  }
  if (
    params.task.currentSurface?.kind === "control-ui" ||
    params.task.currentSurface?.kind === "canvas"
  ) {
    return { mode: "none", reason: "already on richer surface" };
  }

  const sessionEntry = loadSessionEntry(sessionKey).entry;
  if (!sessionEntry || sessionEntry.chatType === "group" || sessionEntry.chatType === "channel") {
    return { mode: "none", reason: "not a direct chat" };
  }
  const sourceSurface = params.runContext.sourceSurface?.trim();
  if (sourceSurface && sourceSurface !== "direct-chat") {
    return { mode: "none", reason: "source surface not eligible" };
  }
  if (
    shouldSkipBecauseOfRecentHandoff({
      cfg: params.cfg,
      agentId: params.agentId,
      taskId: params.task.taskId,
    })
  ) {
    return { mode: "none", reason: "handoff cooldown active" };
  }

  const complexitySignals: Array<string> = [];
  if (params.stats.assistantChars >= 800) {
    complexitySignals.push("assistant-long");
  }
  if (params.stats.toolEventCount >= 4) {
    complexitySignals.push("tool-heavy");
  }
  if (params.stats.usedSubagent) {
    complexitySignals.push("used-subagent");
  }
  if (hasComparisonSignal(params.stats.assistantText)) {
    complexitySignals.push("multi-option");
  }
  if (complexitySignals.length === 0) {
    return { mode: "none", reason: "complexity threshold not met" };
  }

  const controlUiUrl = buildControlUiDeepLink({
    cfg: params.cfg,
    sessionKey,
  });
  if (!controlUiUrl) {
    return { mode: "none", reason: "missing gateway.controlUi.publicUrl" };
  }

  const canvasNodeId = await resolveCanvasCapableNodeId(params.cfg).catch(() => undefined);
  if (canvasNodeId) {
    return {
      mode: "control-ui+canvas",
      reason: complexitySignals.join(", "),
      controlUiUrl,
      canvasNodeId,
    };
  }

  return {
    mode: "control-ui",
    reason: complexitySignals.join(", "),
    controlUiUrl,
  };
}
