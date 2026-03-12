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
const CLOSED_TASK_STATUSES = new Set<TaskStatus>(["completed", "cancelled"]);
const REOPENABLE_TASK_STATUSES = new Set<TaskStatus>(["failed"]);
const TITLE_MAX_CHARS = 96;
const SUMMARY_MAX_CHARS = 280;
const COMMITMENT_EVENT_PREFIX = "commitment.";
const COMMITMENT_KEY_METADATA_FIELD = "continuityKey";
const COMMITMENT_SOURCE_METADATA_FIELD = "continuitySource";
const TASK_STATUS_REASON_METADATA_FIELD = "continuityStatusReason";
const TASK_STATUS_SOURCE_EVENT_METADATA_FIELD = "continuityStatusEvent";
const TASK_STATUS_CHANGED_AT_METADATA_FIELD = "continuityStatusChangedAt";

const OPEN_COMMITMENT_LINE_PATTERNS: Array<{ regex: RegExp; kind: string }> = [
  {
    regex: /^\s*(?:todo|next step|follow(?:-| )up|remaining|outstanding)\s*:\s*(.+)$/i,
    kind: "follow-up",
  },
  { regex: /^\s*(?:待办|下一步|后续|待处理|后续跟进)\s*[：:]\s*(.+)$/u, kind: "follow-up" },
];

const DONE_COMMITMENT_LINE_PATTERNS: Array<RegExp> = [
  /^\s*(?:done|completed|resolved|finished)\s*:\s*(.+)$/i,
  /^\s*(?:已完成|完成|已解决|解决)\s*[：:]\s*(.+)$/u,
];

const CANCELLED_COMMITMENT_LINE_PATTERNS: Array<RegExp> = [
  /^\s*(?:cancelled|canceled|dropped|abandoned|skipped)\s*:\s*(.+)$/i,
  /^\s*(?:已取消|取消|已放弃|放弃)\s*[：:]\s*(.+)$/u,
];

const OPEN_COMMITMENT_SECTION_PATTERNS: Array<RegExp> = [
  /^\s*(?:next steps?|todo|remaining|follow(?:-| )ups?)\s*:?\s*$/i,
  /^\s*(?:下一步|待办|后续|待处理|后续跟进)\s*[：:]?\s*$/u,
];

const DONE_COMMITMENT_SECTION_PATTERNS: Array<RegExp> = [
  /^\s*(?:done|completed|resolved|finished)\s*:?\s*$/i,
  /^\s*(?:已完成|完成|已解决|解决)\s*[：:]?\s*$/u,
];

const CANCELLED_COMMITMENT_SECTION_PATTERNS: Array<RegExp> = [
  /^\s*(?:cancelled|canceled|dropped|abandoned|skipped)\s*:?\s*$/i,
  /^\s*(?:已取消|取消|已放弃|放弃)\s*[：:]?\s*$/u,
];

const CHECKBOX_LINE_PATTERN = /^\s*(?:[-*•]\s*)?\[\s*[ xX]?\s*\]\s*(.+)$/u;
const BULLET_LINE_PATTERN = /^\s*(?:[-*•]|\d+[.)])\s+(.+)$/u;

const OPTIONAL_COMMITMENT_PATTERNS: Array<RegExp> = [
  /^\s*(?:if you(?:'d)? like|if you want|let me know if|i can also)\b/i,
  /^\s*(?:如果你愿意|如果需要|如需|我也可以)\b/u,
];

const USER_DONE_PATTERNS: Array<RegExp> = [
  /\b(done|completed|finished|resolved|fixed)\b/i,
  /(?:已经|已)?(?:完成|搞定|处理好|修复|解决)(?:了)?/u,
];

const USER_CANCELLED_PATTERNS: Array<RegExp> = [
  /\b(cancel|cancelled|canceled|stop|drop|never mind|no need|don't do)\b/i,
  /(?:取消|不用了|先别|停止|算了|不需要|别做了)/u,
];

type ExtractedCommitment = {
  key: string;
  title: string;
  detail?: string;
  kind?: string;
};

type ExtractedCommitmentSet = {
  open: Array<ExtractedCommitment>;
  done: Array<ExtractedCommitment>;
  cancelled: Array<ExtractedCommitment>;
};

type TaskStatusResolution = {
  status: TaskStatus;
  reason?: string;
};

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
  reason?: string;
  sourceEvent?: string;
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

function normalizeOptionalPatchText(
  value: string | null | undefined,
  limit: number,
): string | undefined {
  if (value === null) {
    return undefined;
  }
  return clipText(value, limit);
}

function normalizeOptionalPatchValue(value: string | null | undefined): string | undefined {
  if (value === null) {
    return undefined;
  }
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

function isReusableTask(task: TaskRecord | null | undefined): task is TaskRecord {
  if (!task) {
    return false;
  }
  return REUSABLE_TASK_STATUSES.has(task.status);
}

function isReopenableTask(task: TaskRecord | null | undefined): task is TaskRecord {
  if (!task) {
    return false;
  }
  return REOPENABLE_TASK_STATUSES.has(task.status);
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

function applyTaskStatusUpdate(params: {
  task: TaskRecord;
  nextStatus: TaskStatus;
  now: number;
  reason?: string;
  sourceEvent?: string;
}): TaskRecord {
  const nextMetadata =
    params.task.status === params.nextStatus && !params.reason && !params.sourceEvent
      ? params.task.metadata
      : {
          ...params.task.metadata,
          ...(params.reason ? { [TASK_STATUS_REASON_METADATA_FIELD]: params.reason } : undefined),
          ...(params.sourceEvent
            ? { [TASK_STATUS_SOURCE_EVENT_METADATA_FIELD]: params.sourceEvent }
            : undefined),
          ...(params.task.status !== params.nextStatus
            ? { [TASK_STATUS_CHANGED_AT_METADATA_FIELD]: params.now }
            : undefined),
        };
  return {
    ...params.task,
    status: params.nextStatus,
    updatedAt: params.now,
    closedAt: CLOSED_TASK_STATUSES.has(params.nextStatus)
      ? (params.task.closedAt ?? params.now)
      : undefined,
    metadata: nextMetadata && Object.keys(nextMetadata).length > 0 ? nextMetadata : undefined,
  };
}

function canTransitionTaskStatus(current: TaskStatus, next: TaskStatus): boolean {
  switch (current) {
    case "open":
      return new Set<TaskStatus>([
        "open",
        "running",
        "waiting-user",
        "completed",
        "cancelled",
        "failed",
      ]).has(next);
    case "running":
      return new Set<TaskStatus>([
        "open",
        "running",
        "waiting-user",
        "completed",
        "cancelled",
        "failed",
      ]).has(next);
    case "waiting-user":
      return new Set<TaskStatus>([
        "open",
        "running",
        "waiting-user",
        "completed",
        "cancelled",
        "failed",
      ]).has(next);
    case "failed":
      return new Set<TaskStatus>(["open", "failed", "cancelled"]).has(next);
    case "completed":
      return new Set<TaskStatus>(["completed", "open"]).has(next);
    case "cancelled":
      return new Set<TaskStatus>(["cancelled", "open"]).has(next);
    default:
      return false;
  }
}

function stripCommitmentDecorators(value: string): string {
  return value
    .trim()
    .replace(/^\s*(?:[-*•]|\d+[.)])\s+/u, "")
    .replace(/^\s*\[\s*[ xX]?\s*\]\s*/u, "")
    .replace(
      /^\s*(?:todo|next step|follow(?:-| )up|remaining|outstanding|done|completed|resolved|finished|cancelled|canceled|dropped|abandoned|skipped)\s*:\s*/i,
      "",
    )
    .replace(
      /^\s*(?:待办|下一步|后续|待处理|后续跟进|已完成|完成|已解决|解决|已取消|取消|已放弃|放弃)\s*[：:]\s*/u,
      "",
    )
    .trim();
}

function normalizeCommitmentText(value: string | undefined): string {
  return stripCommitmentDecorators(value ?? "")
    .toLowerCase()
    .replace(/[`"'“”‘’]/g, "")
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildCommitmentKey(value: string | undefined): string {
  return normalizeCommitmentText(value).slice(0, 160);
}

function readCommitmentKey(commitment: CommitmentRecord): string {
  const metadataKey = commitment.metadata?.[COMMITMENT_KEY_METADATA_FIELD];
  if (typeof metadataKey === "string" && metadataKey.trim()) {
    return metadataKey.trim();
  }
  return buildCommitmentKey(commitment.title || commitment.detail);
}

function isMeaningfulCommitmentLine(value: string): boolean {
  const normalized = normalizeCommitmentText(value);
  if (normalized.length < 4) {
    return false;
  }
  if (OPTIONAL_COMMITMENT_PATTERNS.some((pattern) => pattern.test(value))) {
    return false;
  }
  return !new Set(["todo", "next step", "follow up", "remaining", "outstanding"]).has(normalized);
}

function createExtractedCommitment(rawValue: string, kind?: string): ExtractedCommitment | null {
  const cleaned = stripCommitmentDecorators(rawValue);
  if (!cleaned || !isMeaningfulCommitmentLine(cleaned)) {
    return null;
  }
  const title = clipText(cleaned, TITLE_MAX_CHARS);
  if (!title) {
    return null;
  }
  const key = buildCommitmentKey(title);
  if (!key) {
    return null;
  }
  const detail = clipText(cleaned, SUMMARY_MAX_CHARS);
  return {
    key,
    title,
    detail: detail && detail !== title ? detail : undefined,
    kind,
  };
}

function dedupeExtractedCommitments(items: Array<ExtractedCommitment>): Array<ExtractedCommitment> {
  const byKey = new Map<string, ExtractedCommitment>();
  for (const item of items) {
    if (!byKey.has(item.key)) {
      byKey.set(item.key, item);
      continue;
    }
    const existing = byKey.get(item.key);
    if (!existing) {
      byKey.set(item.key, item);
      continue;
    }
    byKey.set(item.key, {
      ...existing,
      title: existing.title.length >= item.title.length ? existing.title : item.title,
      detail: existing.detail ?? item.detail,
      kind: existing.kind ?? item.kind,
    });
  }
  return Array.from(byKey.values());
}

function resolveCommitmentSectionStatus(line: string): CommitmentStatus | "open" | null {
  if (OPEN_COMMITMENT_SECTION_PATTERNS.some((pattern) => pattern.test(line))) {
    return "open";
  }
  if (DONE_COMMITMENT_SECTION_PATTERNS.some((pattern) => pattern.test(line))) {
    return "done";
  }
  if (CANCELLED_COMMITMENT_SECTION_PATTERNS.some((pattern) => pattern.test(line))) {
    return "cancelled";
  }
  return null;
}

function extractStructuredCommitments(text: string | undefined): ExtractedCommitmentSet {
  const result: ExtractedCommitmentSet = {
    open: [],
    done: [],
    cancelled: [],
  };
  const normalizedText = text?.trim();
  if (!normalizedText) {
    return result;
  }
  const lines = normalizedText.split(/\r?\n/);
  let activeSection: CommitmentStatus | "open" | null = null;

  const pushToSection = (status: CommitmentStatus | "open", rawValue: string, kind?: string) => {
    const candidate = createExtractedCommitment(rawValue, kind);
    if (!candidate) {
      return;
    }
    if (status === "open") {
      result.open.push(candidate);
      return;
    }
    if (status === "done") {
      result.done.push(candidate);
      return;
    }
    result.cancelled.push(candidate);
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      activeSection = null;
      continue;
    }

    const sectionStatus = resolveCommitmentSectionStatus(trimmed);
    if (sectionStatus) {
      activeSection = sectionStatus;
      continue;
    }

    let matched = false;
    for (const pattern of OPEN_COMMITMENT_LINE_PATTERNS) {
      const match = trimmed.match(pattern.regex);
      if (match?.[1]) {
        pushToSection("open", match[1], pattern.kind);
        matched = true;
        break;
      }
    }
    if (matched) {
      activeSection = null;
      continue;
    }

    for (const pattern of DONE_COMMITMENT_LINE_PATTERNS) {
      const match = trimmed.match(pattern);
      if (match?.[1]) {
        pushToSection("done", match[1]);
        matched = true;
        break;
      }
    }
    if (matched) {
      activeSection = null;
      continue;
    }

    for (const pattern of CANCELLED_COMMITMENT_LINE_PATTERNS) {
      const match = trimmed.match(pattern);
      if (match?.[1]) {
        pushToSection("cancelled", match[1]);
        matched = true;
        break;
      }
    }
    if (matched) {
      activeSection = null;
      continue;
    }

    if (!activeSection) {
      continue;
    }

    const checkboxMatch = trimmed.match(CHECKBOX_LINE_PATTERN);
    const bulletMatch = checkboxMatch ?? trimmed.match(BULLET_LINE_PATTERN);
    if (bulletMatch?.[1]) {
      pushToSection(
        activeSection,
        bulletMatch[1],
        activeSection === "open" ? "follow-up" : undefined,
      );
      continue;
    }

    activeSection = null;
  }

  return {
    open: dedupeExtractedCommitments(result.open),
    done: dedupeExtractedCommitments(result.done),
    cancelled: dedupeExtractedCommitments(result.cancelled),
  };
}

function resolveUserCommitmentIntent(summary: string | undefined): CommitmentStatus | null {
  const normalized = summary?.trim();
  if (!normalized) {
    return null;
  }
  if (USER_CANCELLED_PATTERNS.some((pattern) => pattern.test(normalized))) {
    return "cancelled";
  }
  if (USER_DONE_PATTERNS.some((pattern) => pattern.test(normalized))) {
    return "done";
  }
  return null;
}

function commitmentMentionedInText(commitment: CommitmentRecord, text: string): boolean {
  const normalizedMessage = normalizeCommitmentText(text);
  if (!normalizedMessage) {
    return false;
  }
  const titleKey = buildCommitmentKey(commitment.title);
  if (titleKey && titleKey.length >= 4 && normalizedMessage.includes(titleKey)) {
    return true;
  }
  const detailKey = buildCommitmentKey(commitment.detail);
  return Boolean(detailKey && detailKey.length >= 8 && normalizedMessage.includes(detailKey));
}

function buildCommitmentSummary(verb: string, commitment: CommitmentRecord): string {
  return `${verb}: ${commitment.title}`;
}

function replaceCommitmentInList(
  commitments: Array<CommitmentRecord>,
  nextCommitment: CommitmentRecord,
): Array<CommitmentRecord> {
  const index = commitments.findIndex((item) => item.commitmentId === nextCommitment.commitmentId);
  if (index === -1) {
    return [nextCommitment, ...commitments];
  }
  const next = commitments.slice();
  next[index] = nextCommitment;
  return next;
}

function appendCommitmentEvent(params: {
  cfg: OpenSoulConfig;
  agentId: string;
  taskId: string;
  sessionKey?: string;
  runId?: string;
  surface?: SurfaceRef;
  kind: string;
  summary: string;
  commitment: CommitmentRecord;
  reason?: string;
}): void {
  appendTaskEvent({
    cfg: params.cfg,
    agentId: params.agentId,
    taskId: params.taskId,
    kind: params.kind,
    sessionKey: params.sessionKey,
    runId: params.runId,
    summary: params.summary,
    surface: params.surface,
    payload: {
      commitmentId: params.commitment.commitmentId,
      status: params.commitment.status,
      title: params.commitment.title,
      kind: params.commitment.kind,
      reason: params.reason,
    },
  });
}

function findMatchingCommitment(
  commitments: Array<CommitmentRecord>,
  candidate: ExtractedCommitment,
): CommitmentRecord | undefined {
  const byKey = commitments.find((item) => readCommitmentKey(item) === candidate.key);
  if (byKey) {
    return byKey;
  }
  const normalizedTitle = buildCommitmentKey(candidate.title);
  return commitments.find((item) => buildCommitmentKey(item.title) === normalizedTitle);
}

function upsertDerivedCommitment(params: {
  cfg: OpenSoulConfig;
  agentId: string;
  taskId: string;
  sessionKey?: string;
  runId?: string;
  surface?: SurfaceRef;
  source: string;
  candidate: ExtractedCommitment;
  commitments: Array<CommitmentRecord>;
}): Array<CommitmentRecord> {
  const now = Date.now();
  const existing = findMatchingCommitment(params.commitments, params.candidate);
  if (!existing) {
    const createdCommitment: CommitmentRecord = {
      commitmentId: crypto.randomUUID(),
      taskId: params.taskId,
      agentId: params.agentId,
      status: "open",
      kind: params.candidate.kind,
      title: params.candidate.title,
      detail: params.candidate.detail,
      createdAt: now,
      updatedAt: now,
      metadata: {
        [COMMITMENT_KEY_METADATA_FIELD]: params.candidate.key,
        [COMMITMENT_SOURCE_METADATA_FIELD]: params.source,
      },
    };
    const saved = upsertCommitment({
      cfg: params.cfg,
      agentId: params.agentId,
      commitment: createdCommitment,
    });
    appendCommitmentEvent({
      cfg: params.cfg,
      agentId: params.agentId,
      taskId: params.taskId,
      sessionKey: params.sessionKey,
      runId: params.runId,
      surface: params.surface,
      kind: `${COMMITMENT_EVENT_PREFIX}opened`,
      summary: buildCommitmentSummary("Opened commitment", saved),
      commitment: saved,
      reason: params.source,
    });
    return replaceCommitmentInList(params.commitments, saved);
  }

  const nextMetadata = {
    ...existing.metadata,
    [COMMITMENT_KEY_METADATA_FIELD]: params.candidate.key,
    [COMMITMENT_SOURCE_METADATA_FIELD]: params.source,
  };
  const nextCommitment: CommitmentRecord = {
    ...existing,
    status: "open",
    kind: params.candidate.kind ?? existing.kind,
    title: params.candidate.title,
    detail: params.candidate.detail ?? existing.detail,
    updatedAt: now,
    closedAt: undefined,
    metadata: nextMetadata,
  };
  const changed =
    existing.status !== nextCommitment.status ||
    existing.title !== nextCommitment.title ||
    existing.detail !== nextCommitment.detail ||
    existing.kind !== nextCommitment.kind ||
    existing.closedAt !== nextCommitment.closedAt;
  if (!changed) {
    return params.commitments;
  }
  const saved = upsertCommitment({
    cfg: params.cfg,
    agentId: params.agentId,
    commitment: nextCommitment,
  });
  appendCommitmentEvent({
    cfg: params.cfg,
    agentId: params.agentId,
    taskId: params.taskId,
    sessionKey: params.sessionKey,
    runId: params.runId,
    surface: params.surface,
    kind:
      existing.status === "open"
        ? `${COMMITMENT_EVENT_PREFIX}updated`
        : `${COMMITMENT_EVENT_PREFIX}reopened`,
    summary: buildCommitmentSummary(
      existing.status === "open" ? "Updated commitment" : "Reopened commitment",
      saved,
    ),
    commitment: saved,
    reason: params.source,
  });
  return replaceCommitmentInList(params.commitments, saved);
}

function updateCommitmentStatusWithEvent(params: {
  cfg: OpenSoulConfig;
  agentId: string;
  taskId: string;
  sessionKey?: string;
  runId?: string;
  surface?: SurfaceRef;
  commitment: CommitmentRecord;
  status: CommitmentStatus;
  source: string;
}): CommitmentRecord | null {
  if (params.commitment.status === params.status) {
    return params.commitment;
  }
  const updated = updateCommitmentStatus({
    cfg: params.cfg,
    agentId: params.agentId,
    taskId: params.taskId,
    commitmentId: params.commitment.commitmentId,
    status: params.status,
  });
  if (!updated) {
    return null;
  }
  appendCommitmentEvent({
    cfg: params.cfg,
    agentId: params.agentId,
    taskId: params.taskId,
    sessionKey: params.sessionKey,
    runId: params.runId,
    surface: params.surface,
    kind: `${COMMITMENT_EVENT_PREFIX}${params.status}`,
    summary: buildCommitmentSummary(
      params.status === "done" ? "Completed commitment" : "Cancelled commitment",
      updated,
    ),
    commitment: updated,
    reason: params.source,
  });
  return updated;
}

function reconcileCommitmentsFromLifecycleEvent(params: {
  cfg: OpenSoulConfig;
  agentId: string;
  taskId: string;
  sessionKey?: string;
  runId?: string;
  surface?: SurfaceRef;
  summary?: string;
}): void {
  const extracted = extractStructuredCommitments(params.summary);
  if (
    extracted.open.length === 0 &&
    extracted.done.length === 0 &&
    extracted.cancelled.length === 0
  ) {
    return;
  }
  let commitments = listCommitments({
    cfg: params.cfg,
    agentId: params.agentId,
    taskId: params.taskId,
  });
  for (const candidate of extracted.done) {
    const matched = findMatchingCommitment(commitments, candidate);
    if (!matched) {
      continue;
    }
    const updated = updateCommitmentStatusWithEvent({
      cfg: params.cfg,
      agentId: params.agentId,
      taskId: params.taskId,
      sessionKey: params.sessionKey,
      runId: params.runId,
      surface: params.surface,
      commitment: matched,
      status: "done",
      source: "assistant-summary",
    });
    if (updated) {
      commitments = replaceCommitmentInList(commitments, updated);
    }
  }
  for (const candidate of extracted.cancelled) {
    const matched = findMatchingCommitment(commitments, candidate);
    if (!matched) {
      continue;
    }
    const updated = updateCommitmentStatusWithEvent({
      cfg: params.cfg,
      agentId: params.agentId,
      taskId: params.taskId,
      sessionKey: params.sessionKey,
      runId: params.runId,
      surface: params.surface,
      commitment: matched,
      status: "cancelled",
      source: "assistant-summary",
    });
    if (updated) {
      commitments = replaceCommitmentInList(commitments, updated);
    }
  }
  for (const candidate of extracted.open) {
    commitments = upsertDerivedCommitment({
      cfg: params.cfg,
      agentId: params.agentId,
      taskId: params.taskId,
      sessionKey: params.sessionKey,
      runId: params.runId,
      surface: params.surface,
      source: "assistant-summary",
      candidate,
      commitments,
    });
  }
}

function reconcileCommitmentsFromUserMessage(params: {
  cfg: OpenSoulConfig;
  agentId: string;
  taskId: string;
  sessionKey?: string;
  runId?: string;
  surface?: SurfaceRef;
  summary?: string;
}): void {
  const intent = resolveUserCommitmentIntent(params.summary);
  if (!intent) {
    return;
  }
  const openCommitments = listOpenCommitments({
    cfg: params.cfg,
    agentId: params.agentId,
    taskId: params.taskId,
  });
  if (openCommitments.length === 0) {
    return;
  }
  const mentioned = openCommitments.filter((commitment) =>
    commitmentMentionedInText(commitment, params.summary ?? ""),
  );
  const targets =
    mentioned.length > 0 ? mentioned : openCommitments.length === 1 ? openCommitments : [];
  for (const target of targets) {
    updateCommitmentStatusWithEvent({
      cfg: params.cfg,
      agentId: params.agentId,
      taskId: params.taskId,
      sessionKey: params.sessionKey,
      runId: params.runId,
      surface: params.surface,
      commitment: target,
      status: intent,
      source: "user-message",
    });
  }
}

function reconcileCommitmentsForEvent(params: AppendTaskEventParams): void {
  if (params.kind.startsWith(COMMITMENT_EVENT_PREFIX)) {
    return;
  }
  if (params.kind === "user-message") {
    reconcileCommitmentsFromUserMessage({
      cfg: params.cfg,
      agentId: params.agentId,
      taskId: params.taskId,
      sessionKey: params.sessionKey,
      runId: params.runId,
      surface: params.surface,
      summary: params.summary,
    });
    return;
  }
  if (params.stream === "lifecycle" && (params.phase === "end" || params.phase === "error")) {
    reconcileCommitmentsFromLifecycleEvent({
      cfg: params.cfg,
      agentId: params.agentId,
      taskId: params.taskId,
      sessionKey: params.sessionKey,
      runId: params.runId,
      surface: params.surface,
      summary: params.summary,
    });
  }
}

function resolveTaskStatusAfterEvent(
  task: TaskRecord,
  params: AppendTaskEventParams,
): TaskStatusResolution {
  if (params.kind === "user-message") {
    return { status: "open", reason: "user-message" };
  }
  if (shouldTreatTaskAsClosed(task)) {
    return { status: task.status };
  }
  if (params.stream === "lifecycle") {
    if (params.phase === "start") {
      return { status: "running", reason: "run-start" };
    }
    if (params.phase === "end") {
      return { status: "waiting-user", reason: "run-waiting-user" };
    }
    if (params.phase === "error") {
      return { status: "failed", reason: "run-error" };
    }
  }
  if (params.kind === "subagent.started" || params.kind === "cron-fired") {
    return { status: "running", reason: params.kind };
  }
  return { status: task.status };
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

function buildTaskPatchSummary(params: {
  previousTask: TaskRecord;
  nextTask: TaskRecord;
  updatedFields: Array<string>;
}): string {
  const statusChanged = params.previousTask.status !== params.nextTask.status;
  if (statusChanged && params.updatedFields.length === 0) {
    return `Updated task status to ${params.nextTask.status}`;
  }
  if (statusChanged) {
    return `Updated task status to ${params.nextTask.status} and fields: ${params.updatedFields.join(", ")}`;
  }
  if (params.updatedFields.length === 1) {
    return `Updated task ${params.updatedFields[0]}`;
  }
  return `Updated task fields: ${params.updatedFields.join(", ")}`;
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
    if (isReopenableTask(explicitTask)) {
      return { task: explicitTask, reason: "explicit" };
    }
  }

  const activeTaskId = params.sessionEntry?.activeTaskId?.trim();
  if (activeTaskId) {
    const activeTask = store.getTask(activeTaskId);
    if (isReusableTask(activeTask)) {
      return { task: activeTask, reason: "session-active" };
    }
    if (isReopenableTask(activeTask)) {
      return { task: activeTask, reason: "session-active" };
    }
  }

  const lastTaskId = params.sessionEntry?.lastTaskId?.trim();
  if (lastTaskId) {
    const lastTask = store.getTask(lastTaskId);
    if (isReusableTask(lastTask)) {
      return { task: lastTask, reason: "session-linked" };
    }
    if (isReopenableTask(lastTask)) {
      return { task: lastTask, reason: "session-linked" };
    }
  }

  const linkedTask = store.getLatestLinkedTask(params.sessionKey, [
    ...Array.from(REUSABLE_TASK_STATUSES),
    ...Array.from(REOPENABLE_TASK_STATUSES),
  ]);
  if (isReusableTask(linkedTask)) {
    return { task: linkedTask, reason: "session-linked" };
  }
  if (isReopenableTask(linkedTask)) {
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
    const candidateTask =
      candidate.task.status === "failed"
        ? applyTaskStatusUpdate({
            task: candidate.task,
            nextStatus: "open",
            now,
            reason: "reopen-on-inbound",
            sourceEvent: "user-message",
          })
        : candidate.task;
    const linkedTask = linkTaskToSession({
      cfg: params.cfg,
      agentId: params.agentId,
      task: candidateTask,
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
  const statusResolution = resolveTaskStatusAfterEvent(task, params);
  const nextTask: TaskRecord = {
    ...applyTaskStatusUpdate({
      task,
      nextStatus: statusResolution.status,
      now: createdAt,
      reason: statusResolution.reason,
      sourceEvent: statusResolution.status !== task.status ? params.kind : undefined,
    }),
    title: resolveTaskTitleAfterEvent(task, params),
    summary: resolveTaskSummaryAfterEvent(task, params),
    latestSessionKey: params.sessionKey ?? task.latestSessionKey,
    latestRunId: params.runId ?? task.latestRunId,
    currentSurface: params.surface ?? task.currentSurface,
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
  reconcileCommitmentsForEvent(params);
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
  if (!canTransitionTaskStatus(task.status, params.status)) {
    return null;
  }
  const now = Date.now();
  const nextTask = applyTaskStatusUpdate({
    task,
    nextStatus: params.status,
    now,
    reason: params.reason ?? "manual-status-update",
    sourceEvent: params.sourceEvent,
  });
  if (params.closedAt !== undefined) {
    nextTask.closedAt = params.closedAt;
  }
  store.upsertTask(nextTask);
  return nextTask;
}

export function patchTask(params: {
  cfg: OpenSoulConfig;
  agentId: string;
  taskId: string;
  status?: TaskStatus;
  title?: string | null;
  summary?: string | null;
  latestSessionKey?: string | null;
  surface?: SurfaceRef;
}): TaskRecord | null {
  const store = getContinuityStore({ cfg: params.cfg, agentId: params.agentId });
  const originalTask = store.getTask(params.taskId);
  if (!originalTask) {
    return null;
  }

  let nextTask = originalTask;
  let statusChanged = false;
  if (params.status && params.status !== originalTask.status) {
    const updatedTask = updateTaskStatus({
      cfg: params.cfg,
      agentId: params.agentId,
      taskId: params.taskId,
      status: params.status,
      reason: "task-patch",
      sourceEvent: "tasks.task.patch",
    });
    if (!updatedTask) {
      return null;
    }
    nextTask = updatedTask;
    statusChanged = true;
  }

  const updatedFields: Array<string> = [];
  const titleProvided = Object.prototype.hasOwnProperty.call(params, "title");
  const summaryProvided = Object.prototype.hasOwnProperty.call(params, "summary");
  const latestSessionKeyProvided = Object.prototype.hasOwnProperty.call(params, "latestSessionKey");
  const nextTitle = titleProvided
    ? normalizeOptionalPatchText(params.title, TITLE_MAX_CHARS)
    : nextTask.title;
  const nextSummary = summaryProvided
    ? normalizeOptionalPatchText(params.summary, SUMMARY_MAX_CHARS)
    : nextTask.summary;
  const nextLatestSessionKey = latestSessionKeyProvided
    ? normalizeOptionalPatchValue(params.latestSessionKey)
    : nextTask.latestSessionKey;

  if (nextTitle !== nextTask.title) {
    updatedFields.push("title");
  }
  if (nextSummary !== nextTask.summary) {
    updatedFields.push("summary");
  }
  if (nextLatestSessionKey !== nextTask.latestSessionKey) {
    updatedFields.push("latestSessionKey");
  }

  if (updatedFields.length > 0) {
    const now = Date.now();
    const patchedTask: TaskRecord = {
      ...nextTask,
      title: nextTitle,
      summary: nextSummary,
      latestSessionKey: nextLatestSessionKey,
      updatedAt: now,
    };
    store.transaction(() => {
      store.upsertTask(patchedTask);
      if (nextLatestSessionKey) {
        store.upsertTaskSessionLink({
          taskId: patchedTask.taskId,
          agentId: params.agentId,
          sessionKey: nextLatestSessionKey,
          relation: "linked",
          createdAt: now,
          updatedAt: now,
        });
      }
    });
    nextTask = patchedTask;
  }

  if (statusChanged || updatedFields.length > 0) {
    appendTaskEvent({
      cfg: params.cfg,
      agentId: params.agentId,
      taskId: params.taskId,
      kind: "task.updated",
      summary: buildTaskPatchSummary({
        previousTask: originalTask,
        nextTask,
        updatedFields,
      }),
      surface: params.surface,
      payload: {
        previousStatus: statusChanged ? originalTask.status : undefined,
        status: nextTask.status,
        updatedFields,
      },
    });
  }

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

export function patchCommitment(params: {
  cfg: OpenSoulConfig;
  agentId: string;
  taskId: string;
  commitmentId: string;
  status: CommitmentStatus;
  detail?: string | null;
  sessionKey?: string;
  surface?: SurfaceRef;
}): CommitmentRecord | null {
  const store = getContinuityStore({ cfg: params.cfg, agentId: params.agentId });
  const commitment = store
    .listCommitments({ taskId: params.taskId })
    .find((item) => item.commitmentId === params.commitmentId);
  if (!commitment) {
    return null;
  }

  const detailProvided = Object.prototype.hasOwnProperty.call(params, "detail");
  const nextDetail = detailProvided
    ? normalizeOptionalPatchText(params.detail, SUMMARY_MAX_CHARS)
    : commitment.detail;
  const statusChanged = commitment.status !== params.status;
  const detailChanged = nextDetail !== commitment.detail;
  if (!statusChanged && !detailChanged) {
    return commitment;
  }

  const now = Date.now();
  const nextCommitment: CommitmentRecord = {
    ...commitment,
    status: params.status,
    detail: nextDetail,
    updatedAt: now,
    closedAt:
      params.status === "open" ? undefined : statusChanged ? now : (commitment.closedAt ?? now),
  };
  const saved = store.upsertCommitment(nextCommitment);
  const eventKind = !statusChanged
    ? `${COMMITMENT_EVENT_PREFIX}updated`
    : params.status === "open"
      ? `${COMMITMENT_EVENT_PREFIX}reopened`
      : `${COMMITMENT_EVENT_PREFIX}${params.status}`;
  const eventLabel = !statusChanged
    ? "Updated commitment"
    : params.status === "open"
      ? "Reopened commitment"
      : params.status === "done"
        ? "Completed commitment"
        : "Cancelled commitment";
  appendCommitmentEvent({
    cfg: params.cfg,
    agentId: params.agentId,
    taskId: params.taskId,
    sessionKey: params.sessionKey,
    surface: params.surface,
    kind: eventKind,
    summary: buildCommitmentSummary(eventLabel, saved),
    commitment: saved,
    reason: "tasks.commitments.update",
  });
  return saved;
}
