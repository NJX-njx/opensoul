import type { RunContinuityStats } from "./types.js";
import { resolveSessionAgentId } from "../agents/agent-scope.js";
import { loadConfig } from "../config/config.js";
import {
  getAgentRunContext,
  onAgentEvent,
  type AgentEventPayload,
  type AgentRunContext,
} from "../infra/agent-events.js";
import { executeHandoffDecision } from "./handoff.js";
import { appendTaskEvent, getTask } from "./service.js";
import { evaluateSurfacePolicy } from "./surface-policy.js";

const runStatsById = new Map<string, RunContinuityStats>();
let listenerStop: (() => void) | null = null;

function extractAssistantText(data: Record<string, unknown>): string | undefined {
  const text =
    typeof data.text === "string"
      ? data.text
      : typeof data.delta === "string"
        ? data.delta
        : typeof data.message === "string"
          ? data.message
          : undefined;
  const normalized = text?.trim();
  return normalized ? normalized : undefined;
}

function summarizeEvent(event: AgentEventPayload): string | undefined {
  if (event.stream === "assistant") {
    return typeof event.data.text === "string" ? event.data.text : undefined;
  }
  if (event.stream === "tool") {
    const phase = typeof event.data.phase === "string" ? event.data.phase : "event";
    const name = typeof event.data.name === "string" ? event.data.name : "tool";
    return `${name} ${phase}`;
  }
  if (event.stream === "error") {
    return typeof event.data.error === "string" ? event.data.error : "agent error";
  }
  if (event.stream === "lifecycle" && typeof event.data.phase === "string") {
    return `lifecycle ${event.data.phase}`;
  }
  return undefined;
}

function resolveEventKind(event: AgentEventPayload): string {
  const phase = typeof event.data.phase === "string" ? event.data.phase : undefined;
  if (phase) {
    return `${event.stream}.${phase}`;
  }
  return event.stream;
}

function updateRunStats(event: AgentEventPayload, context: AgentRunContext): RunContinuityStats {
  const existing = runStatsById.get(event.runId);
  const stats: RunContinuityStats = existing ?? {
    taskId: context.taskId as string,
    runId: event.runId,
    toolEventCount: 0,
    usedSubagent: false,
    assistantChars: 0,
  };

  if (event.stream === "tool") {
    stats.toolEventCount += 1;
    const toolName = typeof event.data.name === "string" ? event.data.name : "";
    if (toolName === "sessions_spawn") {
      stats.usedSubagent = true;
    }
  }

  if (event.stream === "assistant") {
    const text = extractAssistantText(event.data);
    if (text) {
      stats.assistantChars += text.length;
      stats.assistantText = `${stats.assistantText ?? ""}${text}`.slice(-6000);
    }
  }

  runStatsById.set(event.runId, stats);
  return stats;
}

function handleAgentEvent(event: AgentEventPayload): void {
  const context = getAgentRunContext(event.runId);
  const taskId = context?.taskId?.trim();
  const sessionKey = context?.sessionKey?.trim();
  if (!context || !taskId || !sessionKey) {
    return;
  }

  const cfg = loadConfig();
  const agentId = resolveSessionAgentId({
    sessionKey,
    config: cfg,
  });
  if (!agentId) {
    return;
  }

  const stats = updateRunStats(event, context);
  const phase = typeof event.data.phase === "string" ? event.data.phase : undefined;
  const shouldAttachAssistantSummary =
    event.stream === "lifecycle" && (phase === "end" || phase === "error");
  appendTaskEvent({
    cfg,
    agentId,
    taskId,
    kind: resolveEventKind(event),
    stream: event.stream,
    phase,
    sessionKey,
    runId: event.runId,
    summary: shouldAttachAssistantSummary
      ? (stats.assistantText ?? summarizeEvent(event))
      : summarizeEvent(event),
    surface: context?.sourceSurface ? { kind: context.sourceSurface as "direct-chat" } : undefined,
    payload: event.data,
  });

  if (event.stream !== "lifecycle" || (phase !== "end" && phase !== "error")) {
    return;
  }

  const task = getTask({ cfg, agentId, taskId });
  if (!task) {
    runStatsById.delete(event.runId);
    return;
  }

  void evaluateSurfacePolicy({
    cfg,
    agentId,
    task,
    sessionKey,
    runContext: context,
    stats,
  })
    .then(async (decision) => {
      if (decision.mode !== "none") {
        await executeHandoffDecision({
          cfg,
          agentId,
          taskId,
          sessionKey,
          decision,
          runId: event.runId,
        });
      }
    })
    .finally(() => {
      runStatsById.delete(event.runId);
    });
}

export function ensureContinuityEventSinkStarted(): void {
  if (listenerStop) {
    return;
  }
  listenerStop = onAgentEvent((event) => {
    try {
      handleAgentEvent(event);
    } catch {
      // continuity must never break the main run loop
    }
  });
}

export function resetContinuityEventSinkForTest(): void {
  if (listenerStop) {
    listenerStop();
    listenerStop = null;
  }
  runStatsById.clear();
}
