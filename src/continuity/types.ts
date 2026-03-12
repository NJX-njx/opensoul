import type { SessionChatType } from "../config/sessions/types.js";

export type SurfaceRef = {
  kind: "direct-chat" | "group-chat" | "control-ui" | "canvas" | "cron" | "subagent" | "unknown";
  channel?: string;
  chatType?: SessionChatType;
  label?: string;
  nodeId?: string;
};

export type TaskStatus = "open" | "running" | "waiting-user" | "completed" | "cancelled" | "failed";

export type TaskRecord = {
  taskId: string;
  agentId: string;
  status: TaskStatus;
  title?: string;
  summary?: string;
  sourceSurface?: SurfaceRef;
  currentSurface?: SurfaceRef;
  latestSessionKey?: string;
  latestRunId?: string;
  createdAt: number;
  updatedAt: number;
  closedAt?: number;
  metadata?: Record<string, unknown>;
};

export type TaskSessionRelation = "active" | "linked" | "spawned" | "cron";

export type TaskSessionLink = {
  taskId: string;
  agentId: string;
  sessionKey: string;
  relation: TaskSessionRelation;
  createdAt: number;
  updatedAt: number;
};

export type TaskEvent = {
  eventId: string;
  taskId: string;
  agentId: string;
  kind: string;
  stream?: string;
  phase?: string;
  sessionKey?: string;
  runId?: string;
  summary?: string;
  surface?: SurfaceRef;
  createdAt: number;
  payload?: Record<string, unknown>;
};

export type CommitmentStatus = "open" | "done" | "cancelled";

export type CommitmentRecord = {
  commitmentId: string;
  taskId: string;
  agentId: string;
  status: CommitmentStatus;
  kind?: string;
  title: string;
  detail?: string;
  dueAt?: number;
  cronJobId?: string;
  createdAt: number;
  updatedAt: number;
  closedAt?: number;
  metadata?: Record<string, unknown>;
};

export type HandoffMode = "none" | "control-ui" | "control-ui+canvas";

export type HandoffDecision = {
  mode: HandoffMode;
  reason: string;
  controlUiUrl?: string;
  canvasNodeId?: string;
  degradedFrom?: Exclude<HandoffMode, "none">;
};

export type TaskContextEnvelope = {
  task: Pick<
    TaskRecord,
    "taskId" | "status" | "title" | "summary" | "currentSurface" | "latestSessionKey" | "updatedAt"
  >;
  openCommitments: Array<
    Pick<CommitmentRecord, "commitmentId" | "title" | "detail" | "dueAt" | "kind">
  >;
  recentEvents: Array<
    Pick<TaskEvent, "eventId" | "kind" | "summary" | "createdAt" | "surface" | "stream" | "phase">
  >;
  prompt: string;
};

export type ResolveTaskReason = "explicit" | "session-active" | "session-linked" | "new-task";

export type ResolvedTaskLink = {
  task: TaskRecord;
  reason: ResolveTaskReason;
  reused: boolean;
};

export type RunContinuityStats = {
  taskId: string;
  runId: string;
  toolEventCount: number;
  usedSubagent: boolean;
  assistantChars: number;
  assistantText?: string;
};
