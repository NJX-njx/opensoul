import crypto from "node:crypto";
import type { OpenSoulConfig } from "../config/config.js";
import type { SessionEntry } from "../config/sessions.js";
import type {
  CommitmentRecord,
  CommitmentStatus,
  ResolvedTaskLink,
  SurfaceRef,
  TaskEvent,
  TaskRecord,
  TaskSessionRelation,
  TaskStatus,
} from "./types.js";
import { updateSessionStore } from "../config/sessions.js";
import { getContinuityStore } from "./store.js";

const REUSABLE_TASK_STATUSES = new Set<TaskStatus>(["open", "running", "waiting-user"]);
const ACTIVE_TASK_STATUSES = new Set<TaskStatus>(["open", "running", "waiting-user", "failed"]);
const CLOSED_TASK_STATUSES = new Set<TaskStatus>(["completed", "cancelled"]);
const TITLE_MAX_CHARS = 96;
const SUMMARY_MAX_CHARS = 280;

type ResolveTaskParams = {
  cfg: OpenSoulConfig;
  agentId: string;
  sessionKey: string;
  sessionEntry?: SessionEntry;
  explicitTaskId?: string;
  surface?: SurfaceRef;
  inboundText?: string;
  relation?: TaskSessionRelation;
};

type AppendTaskEventParams = {
  cfg: OpenSoulConfig;
  agentId: string;
  taskId: string;
  kind: string;
  stream?: string;
  phase?: string;
  sessionKey?: string;
  runId?: string;
  summary?: string;
  surface?: SurfaceRef;
  payload?: Record<string, unknown>;
};

type UpdateTaskStatusParams = {
  cfg: OpenSoulConfig;
  agentId: string;
  taskId: string;
  status: TaskStatus;
  closedAt?: number;
};

function clipText(value: string | undefined, limit: number): string | undefined {
  const normalized = value?.replace(/\s+/g, " ").trim();
  if (!normalized) {
    return undefined;
  }
  if (normalized.length <= limit) {
    return normalized;
  }
  return `${normalized.slice(0, limit - 1)}…`;
}

function isReusableTask(task: TaskRecord | null | undefined): task is TaskRecord {
  if (!task) {
    return false;
  }
  return REUSABLE_TASK_STATUSES.has(task.status) || ACTIVE_TASK_STATUSES.has(task.status);
}

function shouldTreatTaskAsClosed(task: TaskRecord | null | undefined): boolean {
  if (!task) {
    return true;
  }
  return CLOSED_TASK_STATUSES.has(task.status);
}

function deriveTaskTitle(inboundText: string | undefined): string | undefined {
  return clipText(inboundText, TITLE_MAX_CHARS);
}

function deriveTaskSummary(inboundText: string | undefined): string | undefined {
  return clipText(inboundText, SUMMARY_MAX_CHARS);
}

function resolveTaskStatusAfterEvent(task: TaskRecord, params: AppendTaskEventParams): TaskStatus {
  if (params.kind === "user-message") {
    return "open";
  }
  if (params.stream === "lifecycle") {
    if (params.phase === "start") {
      return "running";
    }
    if (params.phase === "end") {
      return "waiting-user";
    }
    if (params.phase === "error") {
      return "open";
    }
  }
  if (params.kind === "subagent.started" || params.kind === "cron-fired") {
    return "running";
  }
  return task.status;
}

function resolveTaskSummaryAfterEvent(
  task: TaskRecord,
  params: AppendTaskEventParams,
): string | undefined {
  const clipped = clipText(params.summary, SUMMARY_MAX_CHARS);
  if (!clipped) {
    return task.summary;
  }
  if (params.stream === "assistant" || params.kind === "user-message") {
    return clipped;
  }
  return task.summary ?? clipped;
}

function resolveTaskTitleAfterEvent(
  task: TaskRecord,
  params: AppendTaskEventParams,
): string | undefined {
  if (task.title) {
    return task.title;
  }
  if (params.kind !== "user-message") {
    return task.title;
  }
  return clipText(params.summary, TITLE_MAX_CHARS);
}

function linkTaskToSession(params: {
  cfg: OpenSoulConfig;
  agentId: string;
  task: TaskRecord;
  sessionKey: string;
  relation: TaskSessionRelation;
  surface?: SurfaceRef;
  now: number;
}): TaskRecord {
  const store = getContinuityStore({ cfg: params.cfg, agentId: params.agentId });
  const nextTask: TaskRecord = {
    ...params.task,
    latestSessionKey: params.sessionKey,
    currentSurface: params.surface ?? params.task.currentSurface,
    updatedAt: params.now,
  };
  store.transaction(() => {
    store.upsertTask(nextTask);
    store.upsertTaskSessionLink({
      taskId: nextTask.taskId,
      agentId: params.agentId,
      sessionKey: params.sessionKey,
      relation: params.relation,
      createdAt: params.now,
      updatedAt: params.now,
    });
  });
  return nextTask;
}

function resolveCandidateTask(
  params: ResolveTaskParams,
): { task: TaskRecord; reason: ResolvedTaskLink["reason"] } | null {
  const store = getContinuityStore({ cfg: params.cfg, agentId: params.agentId });
  const explicitTaskId = params.explicitTaskId?.trim();
  if (explicitTaskId) {
    const explicitTask = store.getTask(explicitTaskId);
    if (isReusableTask(explicitTask)) {
      return { task: explicitTask, reason: "explicit" };
    }
  }

  const activeTaskId = params.sessionEntry?.activeTaskId?.trim();
  if (activeTaskId) {
    const activeTask = store.getTask(activeTaskId);
    if (isReusableTask(activeTask)) {
      return { task: activeTask, reason: "session-active" };
    }
  }

  const lastTaskId = params.sessionEntry?.lastTaskId?.trim();
  if (lastTaskId) {
    const lastTask = store.getTask(lastTaskId);
    if (isReusableTask(lastTask)) {
      return { task: lastTask, reason: "session-linked" };
    }
  }

  const linkedTask = store.getLatestLinkedTask(
    params.sessionKey,
    Array.from(REUSABLE_TASK_STATUSES),
  );
  if (isReusableTask(linkedTask)) {
    return { task: linkedTask, reason: "session-linked" };
  }

  return null;
}

export function isTaskOpenForPolicy(status: TaskStatus): boolean {
  return REUSABLE_TASK_STATUSES.has(status);
}

export function resolveOrCreateTaskForInbound(params: ResolveTaskParams): ResolvedTaskLink {
  const now = Date.now();
  const relation = params.relation ?? "active";
  const candidate = resolveCandidateTask(params);
  if (candidate) {
    const linkedTask = linkTaskToSession({
      cfg: params.cfg,
      agentId: params.agentId,
      task: candidate.task,
      sessionKey: params.sessionKey,
      relation,
      surface: params.surface,
      now,
    });
    return {
      task: linkedTask,
      reason: candidate.reason,
      reused: true,
    };
  }

  const createdTask: TaskRecord = {
    taskId: crypto.randomUUID(),
    agentId: params.agentId,
    status: "open",
    title: deriveTaskTitle(params.inboundText),
    summary: deriveTaskSummary(params.inboundText),
    sourceSurface: params.surface,
    currentSurface: params.surface,
    latestSessionKey: params.sessionKey,
    createdAt: now,
    updatedAt: now,
  };
  const linkedTask = linkTaskToSession({
    cfg: params.cfg,
    agentId: params.agentId,
    task: createdTask,
    sessionKey: params.sessionKey,
    relation,
    surface: params.surface,
    now,
  });
  return {
    task: linkedTask,
    reason: "new-task",
    reused: false,
  };
}

export function getTask(params: {
  cfg: OpenSoulConfig;
  agentId: string;
  taskId: string;
}): TaskRecord | null {
  const store = getContinuityStore({ cfg: params.cfg, agentId: params.agentId });
  return store.getTask(params.taskId);
}

export function listTasks(params: {
  cfg: OpenSoulConfig;
  agentId: string;
  limit?: number;
  sessionKey?: string;
}): Array<TaskRecord> {
  const store = getContinuityStore({ cfg: params.cfg, agentId: params.agentId });
  return store.listTasks({
    limit: params.limit,
    sessionKey: params.sessionKey,
  });
}

export function listTaskEvents(params: {
  cfg: OpenSoulConfig;
  agentId: string;
  taskId: string;
  limit?: number;
}): Array<TaskEvent> {
  const store = getContinuityStore({ cfg: params.cfg, agentId: params.agentId });
  return store.listTaskEvents({
    taskId: params.taskId,
    limit: params.limit,
  });
}

export function linkSessionToTask(params: {
  cfg: OpenSoulConfig;
  agentId: string;
  taskId: string;
  sessionKey: string;
  relation?: TaskSessionRelation;
  surface?: SurfaceRef;
}): TaskRecord | null {
  const store = getContinuityStore({ cfg: params.cfg, agentId: params.agentId });
  const task = store.getTask(params.taskId);
  if (!task || shouldTreatTaskAsClosed(task)) {
    return null;
  }
  return linkTaskToSession({
    cfg: params.cfg,
    agentId: params.agentId,
    task,
    sessionKey: params.sessionKey,
    relation: params.relation ?? "linked",
    surface: params.surface,
    now: Date.now(),
  });
}

export function appendTaskEvent(params: AppendTaskEventParams): TaskEvent | null {
  const store = getContinuityStore({ cfg: params.cfg, agentId: params.agentId });
  const task = store.getTask(params.taskId);
  if (!task) {
    return null;
  }
  const createdAt = Date.now();
  const event: TaskEvent = {
    eventId: crypto.randomUUID(),
    taskId: params.taskId,
    agentId: params.agentId,
    kind: params.kind,
    stream: params.stream,
    phase: params.phase,
    sessionKey: params.sessionKey,
    runId: params.runId,
    summary: clipText(params.summary, SUMMARY_MAX_CHARS),
    surface: params.surface,
    createdAt,
    payload: params.payload,
  };
  const nextTask: TaskRecord = {
    ...task,
    title: resolveTaskTitleAfterEvent(task, params),
    summary: resolveTaskSummaryAfterEvent(task, params),
    status: resolveTaskStatusAfterEvent(task, params),
    latestSessionKey: params.sessionKey ?? task.latestSessionKey,
    latestRunId: params.runId ?? task.latestRunId,
    currentSurface: params.surface ?? task.currentSurface,
    updatedAt: createdAt,
  };
  store.transaction(() => {
    store.appendTaskEvent(event);
    store.upsertTask(nextTask);
    if (params.sessionKey) {
      store.upsertTaskSessionLink({
        taskId: params.taskId,
        agentId: params.agentId,
        sessionKey: params.sessionKey,
        relation: "linked",
        createdAt,
        updatedAt: createdAt,
      });
    }
  });
  return event;
}

export async function setSessionActiveTask(params: {
  storePath: string;
  sessionKey: string;
  taskId: string;
}): Promise<void> {
  await updateSessionStore(params.storePath, (store) => {
    const entry = store[params.sessionKey];
    if (!entry) {
      return;
    }
    entry.activeTaskId = params.taskId;
    entry.lastTaskId = params.taskId;
    entry.updatedAt = Date.now();
  });
}

export function updateTaskStatus(params: UpdateTaskStatusParams): TaskRecord | null {
  const store = getContinuityStore({ cfg: params.cfg, agentId: params.agentId });
  const task = store.getTask(params.taskId);
  if (!task) {
    return null;
  }
  const now = Date.now();
  const nextTask: TaskRecord = {
    ...task,
    status: params.status,
    updatedAt: now,
    closedAt: params.closedAt ?? (CLOSED_TASK_STATUSES.has(params.status) ? now : undefined),
  };
  store.upsertTask(nextTask);
  return nextTask;
}

export function upsertCommitment(params: {
  cfg: OpenSoulConfig;
  agentId: string;
  commitment: CommitmentRecord;
}): CommitmentRecord {
  const store = getContinuityStore({ cfg: params.cfg, agentId: params.agentId });
  return store.upsertCommitment(params.commitment);
}

export function listOpenCommitments(params: {
  cfg: OpenSoulConfig;
  agentId: string;
  taskId: string;
}): Array<CommitmentRecord> {
  return listCommitments({
    cfg: params.cfg,
    agentId: params.agentId,
    taskId: params.taskId,
    status: "open",
  });
}

export function listCommitments(params: {
  cfg: OpenSoulConfig;
  agentId: string;
  taskId: string;
  status?: CommitmentStatus;
}): Array<CommitmentRecord> {
  const store = getContinuityStore({ cfg: params.cfg, agentId: params.agentId });
  return store.listCommitments({
    taskId: params.taskId,
    status: params.status,
  });
}

export function updateCommitmentStatus(params: {
  cfg: OpenSoulConfig;
  agentId: string;
  commitmentId: string;
  taskId: string;
  status: CommitmentStatus;
}): CommitmentRecord | null {
  const store = getContinuityStore({ cfg: params.cfg, agentId: params.agentId });
  const commitment = store
    .listCommitments({ taskId: params.taskId })
    .find((item) => item.commitmentId === params.commitmentId);
  if (!commitment) {
    return null;
  }
  const now = Date.now();
  const nextCommitment: CommitmentRecord = {
    ...commitment,
    status: params.status,
    updatedAt: now,
    closedAt: params.status === "open" ? undefined : now,
  };
  return store.upsertCommitment(nextCommitment);
}
