import type { OpenSoulConfig } from "../config/config.js";
import type { TaskContextEnvelope } from "./types.js";
import { getTask, listOpenCommitments, listTaskEvents } from "./service.js";

function formatSurfaceLabel(surface?: {
  kind?: string;
  channel?: string;
  label?: string;
}): string | undefined {
  if (!surface) {
    return undefined;
  }
  const parts = [surface.kind, surface.channel, surface.label].filter(
    (value): value is string => typeof value === "string" && value.trim().length > 0,
  );
  if (parts.length === 0) {
    return undefined;
  }
  return parts.join("/");
}

export function buildTaskContextEnvelope(params: {
  cfg: OpenSoulConfig;
  agentId: string;
  taskId?: string;
}): TaskContextEnvelope | null {
  const taskId = params.taskId?.trim();
  if (!taskId) {
    return null;
  }
  const task = getTask({
    cfg: params.cfg,
    agentId: params.agentId,
    taskId,
  });
  if (!task) {
    return null;
  }

  const openCommitments = listOpenCommitments({
    cfg: params.cfg,
    agentId: params.agentId,
    taskId,
  }).slice(0, 5);
  const recentEvents = listTaskEvents({
    cfg: params.cfg,
    agentId: params.agentId,
    taskId,
    limit: 8,
  }).toReversed();

  const lines: Array<string> = [
    "[Task continuity context]",
    `task_id: ${task.taskId}`,
    `status: ${task.status}`,
  ];
  if (task.title) {
    lines.push(`title: ${task.title}`);
  }
  if (task.summary) {
    lines.push(`summary: ${task.summary}`);
  }
  const currentSurface = formatSurfaceLabel(task.currentSurface);
  if (currentSurface) {
    lines.push(`current_surface: ${currentSurface}`);
  }
  if (task.latestSessionKey) {
    lines.push(`session_key: ${task.latestSessionKey}`);
  }
  if (openCommitments.length > 0) {
    lines.push("open_commitments:");
    for (const commitment of openCommitments) {
      const dueAt =
        typeof commitment.dueAt === "number" && Number.isFinite(commitment.dueAt)
          ? new Date(commitment.dueAt).toISOString()
          : undefined;
      const detail = [commitment.title, commitment.detail, dueAt].filter(Boolean).join(" | ");
      lines.push(`- ${detail}`);
    }
  }
  if (recentEvents.length > 0) {
    lines.push("recent_events:");
    for (const event of recentEvents) {
      const surface = formatSurfaceLabel(event.surface);
      const parts = [event.kind, event.summary, surface ? `surface=${surface}` : undefined].filter(
        Boolean,
      );
      if (parts.length > 0) {
        lines.push(`- ${parts.join(" | ")}`);
      }
    }
  }
  lines.push(
    "Use this only to preserve task continuity. Continue the same task unless the user clearly starts a new one.",
  );

  return {
    task: {
      taskId: task.taskId,
      status: task.status,
      title: task.title,
      summary: task.summary,
      currentSurface: task.currentSurface,
      latestSessionKey: task.latestSessionKey,
      updatedAt: task.updatedAt,
    },
    openCommitments: openCommitments.map((commitment) => ({
      commitmentId: commitment.commitmentId,
      title: commitment.title,
      detail: commitment.detail,
      dueAt: commitment.dueAt,
      kind: commitment.kind,
    })),
    recentEvents: recentEvents.map((event) => ({
      eventId: event.eventId,
      kind: event.kind,
      summary: event.summary,
      createdAt: event.createdAt,
      surface: event.surface,
      stream: event.stream,
      phase: event.phase,
    })),
    prompt: lines.join("\n"),
  };
}
