import type { GatewayBrowserClient, GatewayHelloOk } from "../gateway.ts";
import type {
  CommitmentStatus,
  TaskCommitment,
  TaskEvent,
  TaskRecord,
  TaskStatus,
  TasksCommitmentsResult,
  TasksCommitmentsUpdateResult,
  TasksEventsResult,
  TasksListResult,
  TasksRepairCommitmentOrphanResult,
  TasksRepairMergeResult,
  TasksRepairRelinkResult,
  TasksRepairTaskOrphanResult,
  TasksTaskPatchResult,
} from "../types.ts";
import type { Locale } from "../views/onboarding/i18n.ts";
import {
  canReadTaskContinuity,
  canUseContinuityRepairActions,
  canUseContinuityUiActions,
} from "../gateway.ts";
import { uiText } from "../i18n.ts";

export type TaskContinuityState = {
  client: GatewayBrowserClient | null;
  connected: boolean;
  hello: GatewayHelloOk | null;
  sessionKey: string;
  uiLocale: Locale;
  taskContinuityLoading: boolean;
  taskContinuityError: string | null;
  taskContinuitySessionKey: string | null;
  taskContinuityTasks: Array<TaskRecord>;
  taskContinuitySelectedTaskId: string | null;
  taskContinuityEventsByTaskId: Record<string, Array<TaskEvent>>;
  taskContinuityCommitmentsByTaskId: Record<string, Array<TaskCommitment>>;
  taskContinuityDetailsLoadingTaskId: string | null;
  taskContinuityActionError: string | null;
  taskContinuityActionMessage: string | null;
  taskContinuityActionBusyKey: string | null;
};

export type TasksWorkbenchSort = "updated-desc" | "updated-asc" | "created-desc" | "created-asc";

export type TasksWorkbenchUpdatedWindow = "all" | "24h" | "7d" | "30d";

export type TasksWorkbenchFilters = {
  agentScope: string;
  status: string;
  surfaceKind: string;
  channel: string;
  query: string;
  updatedWindow: TasksWorkbenchUpdatedWindow;
  sort: TasksWorkbenchSort;
};

export const DEFAULT_TASKS_WORKBENCH_FILTERS: TasksWorkbenchFilters = {
  agentScope: "all",
  status: "",
  surfaceKind: "",
  channel: "",
  query: "",
  updatedWindow: "all",
  sort: "updated-desc",
};

export type TasksWorkbenchState = {
  client: GatewayBrowserClient | null;
  connected: boolean;
  hello: GatewayHelloOk | null;
  uiLocale: Locale;
  tasksWorkbenchLoading: boolean;
  tasksWorkbenchError: string | null;
  tasksWorkbenchTasks: Array<TaskRecord>;
  tasksWorkbenchSelectedTaskId: string | null;
  tasksWorkbenchEventsByTaskId: Record<string, Array<TaskEvent>>;
  tasksWorkbenchCommitmentsByTaskId: Record<string, Array<TaskCommitment>>;
  tasksWorkbenchDetailsLoadingTaskId: string | null;
  tasksWorkbenchActionError: string | null;
  tasksWorkbenchActionMessage: string | null;
  tasksWorkbenchActionBusyKey: string | null;
  tasksWorkbenchNextOffset: number | null;
  tasksWorkbenchTotal: number;
  tasksWorkbenchFilters: TasksWorkbenchFilters;
};

const TASKS_WORKBENCH_PAGE_SIZE = 24;
const TASK_CONTINUITY_EVENTS_LIMIT = 40;
const TASK_CONTINUITY_COMMITMENTS_LIMIT = 40;

function formatContinuityUnavailableMessage(locale: Locale): string {
  return uiText(
    locale,
    "Task continuity is disabled by the current gateway config.",
    "当前网关配置已关闭任务连续性能力。",
  );
}

function formatContinuityActionsUnavailableMessage(locale: Locale): string {
  return uiText(
    locale,
    "Task continuity actions are disabled by the current gateway config.",
    "当前网关配置已关闭任务连续性操作。",
  );
}

function formatContinuityRepairUnavailableMessage(locale: Locale): string {
  return uiText(
    locale,
    "Task continuity repair tools are disabled by the current gateway config.",
    "当前网关配置已关闭任务连续性修复工具。",
  );
}

function normalizeSessionKey(value: string): string {
  return value.trim();
}

function shouldLoadTaskDetails(state: TaskContinuityState, taskId: string, force = false): boolean {
  if (force) {
    return true;
  }
  return (
    !state.taskContinuityEventsByTaskId[taskId] || !state.taskContinuityCommitmentsByTaskId[taskId]
  );
}

function replaceTask(tasks: Array<TaskRecord>, nextTask: TaskRecord): Array<TaskRecord> {
  const index = tasks.findIndex((task) => task.taskId === nextTask.taskId);
  if (index === -1) {
    return tasks;
  }
  const nextTasks = tasks.slice();
  nextTasks[index] = nextTask;
  return nextTasks;
}

function replaceCommitment(
  commitments: Array<TaskCommitment>,
  nextCommitment: TaskCommitment,
): Array<TaskCommitment> {
  const index = commitments.findIndex(
    (commitment) => commitment.commitmentId === nextCommitment.commitmentId,
  );
  if (index === -1) {
    return commitments;
  }
  const nextCommitments = commitments.slice();
  nextCommitments[index] = nextCommitment;
  return nextCommitments;
}

function buildCommitmentBusyKey(commitmentId: string, status: CommitmentStatus): string {
  return `commitment:${commitmentId}:${status}`;
}

function buildTaskBusyKey(taskId: string, status: TaskStatus): string {
  return `task:${taskId}:${status}`;
}

function buildRepairBusyKey(kind: string, value: string): string {
  return `repair:${kind}:${value}`;
}

function isTaskClosedStatus(status: TaskStatus): boolean {
  return status === "completed" || status === "cancelled";
}

function applyOptimisticTaskStatus(task: TaskRecord, status: TaskStatus): TaskRecord {
  const now = Date.now();
  return {
    ...task,
    status,
    updatedAt: now,
    closedAt: isTaskClosedStatus(status) ? now : undefined,
  };
}

function applyOptimisticCommitmentStatus(
  commitment: TaskCommitment,
  status: CommitmentStatus,
): TaskCommitment {
  const now = Date.now();
  return {
    ...commitment,
    status,
    updatedAt: now,
    closedAt: status === "open" ? undefined : now,
  };
}

function formatCommitmentActionMessage(
  locale: Locale,
  status: CommitmentStatus,
  pending: boolean,
): string {
  if (pending) {
    switch (status) {
      case "done":
        return uiText(locale, "Marking commitment done...", "正在将承诺标记为完成...");
      case "cancelled":
        return uiText(locale, "Cancelling commitment...", "正在取消承诺...");
      case "open":
        return uiText(locale, "Reopening commitment...", "正在重新打开承诺...");
    }
  }
  switch (status) {
    case "done":
      return uiText(locale, "Commitment marked done.", "承诺已标记为完成。");
    case "cancelled":
      return uiText(locale, "Commitment cancelled.", "承诺已取消。");
    case "open":
      return uiText(locale, "Commitment reopened.", "承诺已重新打开。");
  }
}

function formatTaskActionMessage(locale: Locale, status: TaskStatus, pending: boolean): string {
  if (pending) {
    return status === "open"
      ? uiText(locale, "Reopening task...", "正在重新打开任务...")
      : uiText(locale, "Closing task...", "正在关闭任务...");
  }
  return status === "open"
    ? uiText(locale, "Task reopened.", "任务已重新打开。")
    : uiText(locale, "Task closed.", "任务已关闭。");
}

function mergeTasks(
  existing: Array<TaskRecord>,
  incoming: Array<TaskRecord>,
  sort: TasksWorkbenchSort,
): Array<TaskRecord> {
  const byId = new Map(existing.map((task) => [task.taskId, task]));
  for (const task of incoming) {
    byId.set(task.taskId, task);
  }
  const compare = (left: TaskRecord, right: TaskRecord) => {
    switch (sort) {
      case "updated-asc":
        return left.updatedAt - right.updatedAt || left.createdAt - right.createdAt;
      case "created-desc":
        return right.createdAt - left.createdAt || right.updatedAt - left.updatedAt;
      case "created-asc":
        return left.createdAt - right.createdAt || left.updatedAt - right.updatedAt;
      case "updated-desc":
      default:
        return right.updatedAt - left.updatedAt || right.createdAt - left.createdAt;
    }
  };
  return Array.from(byId.values()).toSorted(compare);
}

function normalizeTasksWorkbenchFilters(filters: TasksWorkbenchFilters): TasksWorkbenchFilters {
  return {
    agentScope: filters.agentScope.trim() || "all",
    status: filters.status.trim(),
    surfaceKind: filters.surfaceKind.trim(),
    channel: filters.channel.trim(),
    query: filters.query.trim(),
    updatedWindow: filters.updatedWindow,
    sort: filters.sort,
  };
}

function resolveTasksWorkbenchUpdatedAfter(
  windowKey: TasksWorkbenchUpdatedWindow,
): number | undefined {
  const now = Date.now();
  switch (windowKey) {
    case "24h":
      return now - 24 * 60 * 60 * 1000;
    case "7d":
      return now - 7 * 24 * 60 * 60 * 1000;
    case "30d":
      return now - 30 * 24 * 60 * 60 * 1000;
    case "all":
    default:
      return undefined;
  }
}

export function clearTaskContinuity(state: TaskContinuityState): void {
  state.taskContinuityLoading = false;
  state.taskContinuityError = null;
  state.taskContinuitySessionKey = null;
  state.taskContinuityTasks = [];
  state.taskContinuitySelectedTaskId = null;
  state.taskContinuityEventsByTaskId = {};
  state.taskContinuityCommitmentsByTaskId = {};
  state.taskContinuityDetailsLoadingTaskId = null;
  state.taskContinuityActionError = null;
  state.taskContinuityActionMessage = null;
  state.taskContinuityActionBusyKey = null;
}

export async function loadTaskContinuity(
  state: TaskContinuityState,
  opts?: {
    force?: boolean;
    selectTaskId?: string | null;
  },
): Promise<void> {
  const sessionKeyAtStart = normalizeSessionKey(state.sessionKey);
  if (!state.client || !state.connected || !sessionKeyAtStart) {
    clearTaskContinuity(state);
    return;
  }
  if (!canReadTaskContinuity(state.hello)) {
    clearTaskContinuity(state);
    state.taskContinuityError = formatContinuityUnavailableMessage(state.uiLocale);
    return;
  }
  if (state.taskContinuityLoading && !opts?.force) {
    return;
  }
  if (state.taskContinuitySessionKey && state.taskContinuitySessionKey !== sessionKeyAtStart) {
    clearTaskContinuity(state);
  }

  state.taskContinuityLoading = true;
  state.taskContinuityError = null;
  state.taskContinuitySessionKey = sessionKeyAtStart;

  try {
    const result = await state.client.request<TasksListResult | undefined>("tasks.list", {
      sessionKey: sessionKeyAtStart,
      limit: 8,
    });
    if (normalizeSessionKey(state.sessionKey) !== sessionKeyAtStart) {
      return;
    }

    const tasks = result?.tasks ?? [];
    state.taskContinuityTasks = tasks;
    const requestedTaskId = opts?.selectTaskId?.trim() || state.taskContinuitySelectedTaskId;
    const nextSelectedTaskId = tasks.some((task) => task.taskId === requestedTaskId)
      ? (requestedTaskId ?? null)
      : (tasks[0]?.taskId ?? null);
    state.taskContinuitySelectedTaskId = nextSelectedTaskId;

    if (nextSelectedTaskId) {
      await loadTaskContinuityDetails(state, nextSelectedTaskId, {
        sessionKey: sessionKeyAtStart,
        force: opts?.force,
      });
    } else {
      state.taskContinuityDetailsLoadingTaskId = null;
    }
  } catch (error) {
    if (normalizeSessionKey(state.sessionKey) === sessionKeyAtStart) {
      state.taskContinuityError = String(error);
    }
  } finally {
    if (normalizeSessionKey(state.sessionKey) === sessionKeyAtStart) {
      state.taskContinuityLoading = false;
    }
  }
}

export async function loadTaskContinuityDetails(
  state: TaskContinuityState,
  taskId: string,
  opts?: {
    sessionKey?: string;
    force?: boolean;
  },
): Promise<void> {
  const sessionKeyAtStart = normalizeSessionKey(opts?.sessionKey ?? state.sessionKey);
  const normalizedTaskId = taskId.trim();
  if (
    !state.client ||
    !state.connected ||
    !sessionKeyAtStart ||
    !normalizedTaskId ||
    !canReadTaskContinuity(state.hello)
  ) {
    return;
  }
  if (!shouldLoadTaskDetails(state, normalizedTaskId, opts?.force)) {
    return;
  }

  state.taskContinuityDetailsLoadingTaskId = normalizedTaskId;
  try {
    const [eventsResult, commitmentsResult] = await Promise.all([
      state.client.request<TasksEventsResult | undefined>("tasks.events", {
        taskId: normalizedTaskId,
        sessionKey: sessionKeyAtStart,
        limit: TASK_CONTINUITY_EVENTS_LIMIT,
      }),
      state.client.request<TasksCommitmentsResult | undefined>("tasks.commitments", {
        taskId: normalizedTaskId,
        sessionKey: sessionKeyAtStart,
        limit: TASK_CONTINUITY_COMMITMENTS_LIMIT,
      }),
    ]);
    if (normalizeSessionKey(state.sessionKey) !== sessionKeyAtStart) {
      return;
    }
    state.taskContinuityEventsByTaskId = {
      ...state.taskContinuityEventsByTaskId,
      [normalizedTaskId]: eventsResult?.events ?? [],
    };
    state.taskContinuityCommitmentsByTaskId = {
      ...state.taskContinuityCommitmentsByTaskId,
      [normalizedTaskId]: commitmentsResult?.commitments ?? [],
    };
  } catch (error) {
    if (normalizeSessionKey(state.sessionKey) === sessionKeyAtStart) {
      state.taskContinuityError = String(error);
    }
  } finally {
    if (
      normalizeSessionKey(state.sessionKey) === sessionKeyAtStart &&
      state.taskContinuityDetailsLoadingTaskId === normalizedTaskId
    ) {
      state.taskContinuityDetailsLoadingTaskId = null;
    }
  }
}

export async function selectTaskContinuityTask(
  state: TaskContinuityState,
  taskId: string,
): Promise<void> {
  const normalizedTaskId = taskId.trim();
  if (!normalizedTaskId) {
    return;
  }
  state.taskContinuitySelectedTaskId = normalizedTaskId;
  state.taskContinuityActionError = null;
  state.taskContinuityActionMessage = null;
  await loadTaskContinuityDetails(state, normalizedTaskId);
}

export async function updateTaskContinuityCommitment(
  state: TaskContinuityState,
  taskId: string,
  commitmentId: string,
  status: CommitmentStatus,
): Promise<void> {
  const sessionKeyAtStart = normalizeSessionKey(state.sessionKey);
  const normalizedTaskId = taskId.trim();
  const normalizedCommitmentId = commitmentId.trim();
  if (
    !state.client ||
    !state.connected ||
    !sessionKeyAtStart ||
    !normalizedTaskId ||
    !normalizedCommitmentId
  ) {
    return;
  }
  if (!canUseContinuityUiActions(state.hello)) {
    state.taskContinuityActionError = formatContinuityActionsUnavailableMessage(state.uiLocale);
    state.taskContinuityActionMessage = null;
    return;
  }
  if (state.taskContinuityActionBusyKey) {
    return;
  }

  const commitments = state.taskContinuityCommitmentsByTaskId[normalizedTaskId] ?? [];
  const currentCommitment = commitments.find(
    (commitment) => commitment.commitmentId === normalizedCommitmentId,
  );
  if (!currentCommitment) {
    state.taskContinuityActionError = uiText(
      state.uiLocale,
      "Commitment not found.",
      "未找到承诺。",
    );
    return;
  }

  const busyKey = buildCommitmentBusyKey(normalizedCommitmentId, status);
  const previousCommitments = commitments;
  state.taskContinuityActionBusyKey = busyKey;
  state.taskContinuityActionError = null;
  state.taskContinuityActionMessage = formatCommitmentActionMessage(state.uiLocale, status, true);
  state.taskContinuityCommitmentsByTaskId = {
    ...state.taskContinuityCommitmentsByTaskId,
    [normalizedTaskId]: replaceCommitment(
      previousCommitments,
      applyOptimisticCommitmentStatus(currentCommitment, status),
    ),
  };

  try {
    const result = await state.client.request<TasksCommitmentsUpdateResult | undefined>(
      "tasks.commitments.update",
      {
        taskId: normalizedTaskId,
        sessionKey: sessionKeyAtStart,
        commitmentId: normalizedCommitmentId,
        status,
      },
    );
    if (normalizeSessionKey(state.sessionKey) !== sessionKeyAtStart) {
      return;
    }
    const nextCommitment = result?.commitment;
    if (!nextCommitment) {
      throw new Error(
        uiText(
          state.uiLocale,
          "Gateway did not return the updated commitment.",
          "网关没有返回更新后的承诺。",
        ),
      );
    }
    state.taskContinuityCommitmentsByTaskId = {
      ...state.taskContinuityCommitmentsByTaskId,
      [normalizedTaskId]: replaceCommitment(
        state.taskContinuityCommitmentsByTaskId[normalizedTaskId] ?? previousCommitments,
        nextCommitment,
      ),
    };
    state.taskContinuityActionMessage = formatCommitmentActionMessage(
      state.uiLocale,
      status,
      false,
    );
    await loadTaskContinuity(state, {
      force: true,
      selectTaskId: normalizedTaskId,
    });
  } catch (error) {
    if (normalizeSessionKey(state.sessionKey) !== sessionKeyAtStart) {
      return;
    }
    state.taskContinuityCommitmentsByTaskId = {
      ...state.taskContinuityCommitmentsByTaskId,
      [normalizedTaskId]: previousCommitments,
    };
    state.taskContinuityActionMessage = null;
    state.taskContinuityActionError =
      error instanceof Error
        ? error.message
        : uiText(state.uiLocale, "Request failed.", "请求失败。");
  } finally {
    if (
      normalizeSessionKey(state.sessionKey) === sessionKeyAtStart &&
      state.taskContinuityActionBusyKey === busyKey
    ) {
      state.taskContinuityActionBusyKey = null;
    }
  }
}

export async function updateTaskContinuityTaskStatus(
  state: TaskContinuityState,
  taskId: string,
  status: TaskStatus,
): Promise<void> {
  const sessionKeyAtStart = normalizeSessionKey(state.sessionKey);
  const normalizedTaskId = taskId.trim();
  if (!state.client || !state.connected || !sessionKeyAtStart || !normalizedTaskId) {
    return;
  }
  if (!canUseContinuityUiActions(state.hello)) {
    state.taskContinuityActionError = formatContinuityActionsUnavailableMessage(state.uiLocale);
    state.taskContinuityActionMessage = null;
    return;
  }
  if (state.taskContinuityActionBusyKey) {
    return;
  }

  const currentTask = state.taskContinuityTasks.find((task) => task.taskId === normalizedTaskId);
  if (!currentTask) {
    state.taskContinuityActionError = uiText(state.uiLocale, "Task not found.", "未找到任务。");
    return;
  }

  const busyKey = buildTaskBusyKey(normalizedTaskId, status);
  const previousTasks = state.taskContinuityTasks;
  state.taskContinuityActionBusyKey = busyKey;
  state.taskContinuityActionError = null;
  state.taskContinuityActionMessage = formatTaskActionMessage(state.uiLocale, status, true);
  state.taskContinuityTasks = replaceTask(
    previousTasks,
    applyOptimisticTaskStatus(currentTask, status),
  );

  try {
    const result = await state.client.request<TasksTaskPatchResult | undefined>(
      "tasks.task.patch",
      {
        taskId: normalizedTaskId,
        sessionKey: sessionKeyAtStart,
        status,
      },
    );
    if (normalizeSessionKey(state.sessionKey) !== sessionKeyAtStart) {
      return;
    }
    const nextTask = result?.task;
    if (!nextTask) {
      throw new Error(
        uiText(
          state.uiLocale,
          "Gateway did not return the updated task.",
          "网关没有返回更新后的任务。",
        ),
      );
    }
    state.taskContinuityTasks = replaceTask(state.taskContinuityTasks, nextTask);
    state.taskContinuityActionMessage = formatTaskActionMessage(state.uiLocale, status, false);
    await loadTaskContinuity(state, {
      force: true,
      selectTaskId: normalizedTaskId,
    });
  } catch (error) {
    if (normalizeSessionKey(state.sessionKey) !== sessionKeyAtStart) {
      return;
    }
    state.taskContinuityTasks = previousTasks;
    state.taskContinuityActionMessage = null;
    state.taskContinuityActionError =
      error instanceof Error
        ? error.message
        : uiText(state.uiLocale, "Request failed.", "请求失败。");
  } finally {
    if (
      normalizeSessionKey(state.sessionKey) === sessionKeyAtStart &&
      state.taskContinuityActionBusyKey === busyKey
    ) {
      state.taskContinuityActionBusyKey = null;
    }
  }
}

export function clearTasksWorkbench(state: TasksWorkbenchState): void {
  state.tasksWorkbenchLoading = false;
  state.tasksWorkbenchError = null;
  state.tasksWorkbenchTasks = [];
  state.tasksWorkbenchSelectedTaskId = null;
  state.tasksWorkbenchEventsByTaskId = {};
  state.tasksWorkbenchCommitmentsByTaskId = {};
  state.tasksWorkbenchDetailsLoadingTaskId = null;
  state.tasksWorkbenchActionError = null;
  state.tasksWorkbenchActionMessage = null;
  state.tasksWorkbenchActionBusyKey = null;
  state.tasksWorkbenchNextOffset = null;
  state.tasksWorkbenchTotal = 0;
}

export async function loadTasksWorkbench(
  state: TasksWorkbenchState,
  opts?: {
    force?: boolean;
    append?: boolean;
    selectTaskId?: string | null;
  },
): Promise<void> {
  if (!state.client || !state.connected) {
    clearTasksWorkbench(state);
    return;
  }
  if (!canReadTaskContinuity(state.hello)) {
    clearTasksWorkbench(state);
    state.tasksWorkbenchError = formatContinuityUnavailableMessage(state.uiLocale);
    return;
  }
  if (state.tasksWorkbenchLoading && !opts?.force) {
    return;
  }

  const filtersAtStart = normalizeTasksWorkbenchFilters(state.tasksWorkbenchFilters);
  const requestSignature = JSON.stringify(filtersAtStart);
  const offset = opts?.append
    ? (state.tasksWorkbenchNextOffset ?? state.tasksWorkbenchTasks.length)
    : 0;

  state.tasksWorkbenchLoading = true;
  state.tasksWorkbenchError = null;

  try {
    const result = await state.client.request<TasksListResult | undefined>("tasks.list", {
      allAgents: filtersAtStart.agentScope === "all",
      agentId: filtersAtStart.agentScope !== "all" ? filtersAtStart.agentScope : undefined,
      status: filtersAtStart.status || undefined,
      surfaceKind: filtersAtStart.surfaceKind || undefined,
      channel: filtersAtStart.channel || undefined,
      query: filtersAtStart.query || undefined,
      updatedAfter: resolveTasksWorkbenchUpdatedAfter(filtersAtStart.updatedWindow),
      sort: filtersAtStart.sort,
      offset,
      limit: TASKS_WORKBENCH_PAGE_SIZE,
    });
    if (
      JSON.stringify(normalizeTasksWorkbenchFilters(state.tasksWorkbenchFilters)) !==
      requestSignature
    ) {
      return;
    }

    const incomingTasks = result?.tasks ?? [];
    const nextTasks = opts?.append
      ? mergeTasks(state.tasksWorkbenchTasks, incomingTasks, filtersAtStart.sort)
      : incomingTasks;
    state.tasksWorkbenchTasks = nextTasks;
    state.tasksWorkbenchTotal = result?.total ?? nextTasks.length;
    state.tasksWorkbenchNextOffset =
      typeof result?.nextOffset === "number" ? result.nextOffset : null;
    const requestedTaskId = opts?.selectTaskId?.trim() || state.tasksWorkbenchSelectedTaskId;
    const nextSelectedTaskId = nextTasks.some((task) => task.taskId === requestedTaskId)
      ? (requestedTaskId ?? null)
      : (nextTasks[0]?.taskId ?? null);
    state.tasksWorkbenchSelectedTaskId = nextSelectedTaskId;

    if (nextSelectedTaskId) {
      await loadTasksWorkbenchDetails(state, nextSelectedTaskId, {
        force: opts?.force,
      });
    } else {
      state.tasksWorkbenchDetailsLoadingTaskId = null;
    }
  } catch (error) {
    if (
      JSON.stringify(normalizeTasksWorkbenchFilters(state.tasksWorkbenchFilters)) ===
      requestSignature
    ) {
      state.tasksWorkbenchError = String(error);
    }
  } finally {
    if (
      JSON.stringify(normalizeTasksWorkbenchFilters(state.tasksWorkbenchFilters)) ===
      requestSignature
    ) {
      state.tasksWorkbenchLoading = false;
    }
  }
}

export async function loadTasksWorkbenchDetails(
  state: TasksWorkbenchState,
  taskId: string,
  opts?: {
    force?: boolean;
  },
): Promise<void> {
  const normalizedTaskId = taskId.trim();
  if (
    !state.client ||
    !state.connected ||
    !normalizedTaskId ||
    !canReadTaskContinuity(state.hello)
  ) {
    return;
  }
  if (
    !opts?.force &&
    state.tasksWorkbenchEventsByTaskId[normalizedTaskId] &&
    state.tasksWorkbenchCommitmentsByTaskId[normalizedTaskId]
  ) {
    return;
  }

  const task = state.tasksWorkbenchTasks.find((entry) => entry.taskId === normalizedTaskId);
  if (!task) {
    return;
  }

  state.tasksWorkbenchDetailsLoadingTaskId = normalizedTaskId;
  try {
    const [eventsResult, commitmentsResult] = await Promise.all([
      state.client.request<TasksEventsResult | undefined>("tasks.events", {
        taskId: normalizedTaskId,
        agentId: task.agentId,
        limit: TASK_CONTINUITY_EVENTS_LIMIT,
      }),
      state.client.request<TasksCommitmentsResult | undefined>("tasks.commitments", {
        taskId: normalizedTaskId,
        agentId: task.agentId,
        limit: TASK_CONTINUITY_COMMITMENTS_LIMIT,
      }),
    ]);
    state.tasksWorkbenchEventsByTaskId = {
      ...state.tasksWorkbenchEventsByTaskId,
      [normalizedTaskId]: eventsResult?.events ?? [],
    };
    state.tasksWorkbenchCommitmentsByTaskId = {
      ...state.tasksWorkbenchCommitmentsByTaskId,
      [normalizedTaskId]: commitmentsResult?.commitments ?? [],
    };
  } catch (error) {
    state.tasksWorkbenchError = String(error);
  } finally {
    if (state.tasksWorkbenchDetailsLoadingTaskId === normalizedTaskId) {
      state.tasksWorkbenchDetailsLoadingTaskId = null;
    }
  }
}

export async function selectTasksWorkbenchTask(
  state: TasksWorkbenchState,
  taskId: string,
): Promise<void> {
  const normalizedTaskId = taskId.trim();
  if (!normalizedTaskId) {
    return;
  }
  state.tasksWorkbenchSelectedTaskId = normalizedTaskId;
  state.tasksWorkbenchActionError = null;
  state.tasksWorkbenchActionMessage = null;
  await loadTasksWorkbenchDetails(state, normalizedTaskId);
}

export async function updateTasksWorkbenchFilters(
  state: TasksWorkbenchState,
  patch: Partial<TasksWorkbenchFilters>,
): Promise<void> {
  state.tasksWorkbenchFilters = normalizeTasksWorkbenchFilters({
    ...state.tasksWorkbenchFilters,
    ...patch,
  });
  await loadTasksWorkbench(state, {
    force: true,
  });
}

export async function loadMoreTasksWorkbench(state: TasksWorkbenchState): Promise<void> {
  if (state.tasksWorkbenchNextOffset == null) {
    return;
  }
  await loadTasksWorkbench(state, {
    append: true,
    force: true,
  });
}

export async function updateTasksWorkbenchCommitment(
  state: TasksWorkbenchState,
  taskId: string,
  commitmentId: string,
  status: CommitmentStatus,
): Promise<void> {
  const normalizedTaskId = taskId.trim();
  const normalizedCommitmentId = commitmentId.trim();
  if (!state.client || !state.connected || !normalizedTaskId || !normalizedCommitmentId) {
    return;
  }
  if (!canUseContinuityUiActions(state.hello)) {
    state.tasksWorkbenchActionError = formatContinuityActionsUnavailableMessage(state.uiLocale);
    state.tasksWorkbenchActionMessage = null;
    return;
  }
  if (state.tasksWorkbenchActionBusyKey) {
    return;
  }

  const task = state.tasksWorkbenchTasks.find((entry) => entry.taskId === normalizedTaskId);
  const commitments = state.tasksWorkbenchCommitmentsByTaskId[normalizedTaskId] ?? [];
  const currentCommitment = commitments.find(
    (commitment) => commitment.commitmentId === normalizedCommitmentId,
  );
  if (!task || !currentCommitment) {
    state.tasksWorkbenchActionError = uiText(
      state.uiLocale,
      "Commitment not found.",
      "未找到承诺。",
    );
    return;
  }

  const busyKey = buildCommitmentBusyKey(normalizedCommitmentId, status);
  const previousCommitments = commitments;
  state.tasksWorkbenchActionBusyKey = busyKey;
  state.tasksWorkbenchActionError = null;
  state.tasksWorkbenchActionMessage = formatCommitmentActionMessage(state.uiLocale, status, true);
  state.tasksWorkbenchCommitmentsByTaskId = {
    ...state.tasksWorkbenchCommitmentsByTaskId,
    [normalizedTaskId]: replaceCommitment(
      previousCommitments,
      applyOptimisticCommitmentStatus(currentCommitment, status),
    ),
  };

  try {
    const result = await state.client.request<TasksCommitmentsUpdateResult | undefined>(
      "tasks.commitments.update",
      {
        taskId: normalizedTaskId,
        agentId: task.agentId,
        commitmentId: normalizedCommitmentId,
        status,
      },
    );
    const nextCommitment = result?.commitment;
    if (!nextCommitment) {
      throw new Error(
        uiText(
          state.uiLocale,
          "Gateway did not return the updated commitment.",
          "网关没有返回更新后的承诺。",
        ),
      );
    }
    state.tasksWorkbenchCommitmentsByTaskId = {
      ...state.tasksWorkbenchCommitmentsByTaskId,
      [normalizedTaskId]: replaceCommitment(
        state.tasksWorkbenchCommitmentsByTaskId[normalizedTaskId] ?? previousCommitments,
        nextCommitment,
      ),
    };
    state.tasksWorkbenchActionMessage = formatCommitmentActionMessage(
      state.uiLocale,
      status,
      false,
    );
    await loadTasksWorkbench(state, {
      force: true,
      selectTaskId: normalizedTaskId,
    });
  } catch (error) {
    state.tasksWorkbenchCommitmentsByTaskId = {
      ...state.tasksWorkbenchCommitmentsByTaskId,
      [normalizedTaskId]: previousCommitments,
    };
    state.tasksWorkbenchActionMessage = null;
    state.tasksWorkbenchActionError =
      error instanceof Error
        ? error.message
        : uiText(state.uiLocale, "Request failed.", "请求失败。");
  } finally {
    if (state.tasksWorkbenchActionBusyKey === busyKey) {
      state.tasksWorkbenchActionBusyKey = null;
    }
  }
}

export async function updateTasksWorkbenchTaskStatus(
  state: TasksWorkbenchState,
  taskId: string,
  status: TaskStatus,
): Promise<void> {
  const normalizedTaskId = taskId.trim();
  if (!state.client || !state.connected || !normalizedTaskId) {
    return;
  }
  if (!canUseContinuityUiActions(state.hello)) {
    state.tasksWorkbenchActionError = formatContinuityActionsUnavailableMessage(state.uiLocale);
    state.tasksWorkbenchActionMessage = null;
    return;
  }
  if (state.tasksWorkbenchActionBusyKey) {
    return;
  }

  const currentTask = state.tasksWorkbenchTasks.find((task) => task.taskId === normalizedTaskId);
  if (!currentTask) {
    state.tasksWorkbenchActionError = uiText(state.uiLocale, "Task not found.", "未找到任务。");
    return;
  }

  const busyKey = buildTaskBusyKey(normalizedTaskId, status);
  const previousTasks = state.tasksWorkbenchTasks;
  state.tasksWorkbenchActionBusyKey = busyKey;
  state.tasksWorkbenchActionError = null;
  state.tasksWorkbenchActionMessage = formatTaskActionMessage(state.uiLocale, status, true);
  state.tasksWorkbenchTasks = replaceTask(
    previousTasks,
    applyOptimisticTaskStatus(currentTask, status),
  );

  try {
    const result = await state.client.request<TasksTaskPatchResult | undefined>(
      "tasks.task.patch",
      {
        taskId: normalizedTaskId,
        agentId: currentTask.agentId,
        status,
      },
    );
    const nextTask = result?.task;
    if (!nextTask) {
      throw new Error(
        uiText(
          state.uiLocale,
          "Gateway did not return the updated task.",
          "网关没有返回更新后的任务。",
        ),
      );
    }
    state.tasksWorkbenchTasks = replaceTask(state.tasksWorkbenchTasks, nextTask);
    state.tasksWorkbenchActionMessage = formatTaskActionMessage(state.uiLocale, status, false);
    await loadTasksWorkbench(state, {
      force: true,
      selectTaskId: normalizedTaskId,
    });
  } catch (error) {
    state.tasksWorkbenchTasks = previousTasks;
    state.tasksWorkbenchActionMessage = null;
    state.tasksWorkbenchActionError =
      error instanceof Error
        ? error.message
        : uiText(state.uiLocale, "Request failed.", "请求失败。");
  } finally {
    if (state.tasksWorkbenchActionBusyKey === busyKey) {
      state.tasksWorkbenchActionBusyKey = null;
    }
  }
}

export async function repairTasksWorkbenchRelinkTask(
  state: TasksWorkbenchState,
  taskId: string,
  sessionKey: string,
  detail?: string,
): Promise<void> {
  const normalizedTaskId = taskId.trim();
  const normalizedSessionKey = normalizeSessionKey(sessionKey);
  if (!state.client || !state.connected || !normalizedTaskId || !normalizedSessionKey) {
    return;
  }
  if (!canUseContinuityRepairActions(state.hello)) {
    state.tasksWorkbenchActionError = formatContinuityRepairUnavailableMessage(state.uiLocale);
    state.tasksWorkbenchActionMessage = null;
    return;
  }
  if (state.tasksWorkbenchActionBusyKey) {
    return;
  }

  const currentTask = state.tasksWorkbenchTasks.find((task) => task.taskId === normalizedTaskId);
  if (!currentTask) {
    state.tasksWorkbenchActionError = uiText(state.uiLocale, "Task not found.", "未找到任务。");
    return;
  }

  const busyKey = buildRepairBusyKey("relink", normalizedTaskId);
  state.tasksWorkbenchActionBusyKey = busyKey;
  state.tasksWorkbenchActionError = null;
  state.tasksWorkbenchActionMessage = uiText(
    state.uiLocale,
    "Relinking task to session...",
    "正在将任务重新关联到会话...",
  );

  try {
    const result = await state.client.request<TasksRepairRelinkResult | undefined>(
      "tasks.repair.relink",
      {
        taskId: normalizedTaskId,
        agentId: currentTask.agentId,
        sessionKey: normalizedSessionKey,
        detail: detail?.trim() || undefined,
      },
    );
    if (!result?.task) {
      throw new Error(
        uiText(
          state.uiLocale,
          "Gateway did not return the relinked task.",
          "网关没有返回重新关联后的任务。",
        ),
      );
    }
    state.tasksWorkbenchActionMessage = uiText(
      state.uiLocale,
      "Task relinked to the new session.",
      "任务已重新关联到新会话。",
    );
    await loadTasksWorkbench(state, {
      force: true,
      selectTaskId: normalizedTaskId,
    });
  } catch (error) {
    state.tasksWorkbenchActionMessage = null;
    state.tasksWorkbenchActionError =
      error instanceof Error
        ? error.message
        : uiText(state.uiLocale, "Request failed.", "请求失败。");
  } finally {
    if (state.tasksWorkbenchActionBusyKey === busyKey) {
      state.tasksWorkbenchActionBusyKey = null;
    }
  }
}

export async function repairTasksWorkbenchMergeTask(
  state: TasksWorkbenchState,
  sourceTaskId: string,
  targetTaskId: string,
  detail?: string,
): Promise<void> {
  const normalizedSourceTaskId = sourceTaskId.trim();
  const normalizedTargetTaskId = targetTaskId.trim();
  if (!state.client || !state.connected || !normalizedSourceTaskId || !normalizedTargetTaskId) {
    return;
  }
  if (!canUseContinuityRepairActions(state.hello)) {
    state.tasksWorkbenchActionError = formatContinuityRepairUnavailableMessage(state.uiLocale);
    state.tasksWorkbenchActionMessage = null;
    return;
  }
  if (state.tasksWorkbenchActionBusyKey) {
    return;
  }
  if (normalizedSourceTaskId === normalizedTargetTaskId) {
    state.tasksWorkbenchActionError = uiText(
      state.uiLocale,
      "Source and target tasks must be different.",
      "源任务和目标任务必须不同。",
    );
    state.tasksWorkbenchActionMessage = null;
    return;
  }

  const targetTask = state.tasksWorkbenchTasks.find(
    (task) => task.taskId === normalizedTargetTaskId,
  );
  if (!targetTask) {
    state.tasksWorkbenchActionError = uiText(
      state.uiLocale,
      "Target task not found.",
      "未找到目标任务。",
    );
    return;
  }

  const busyKey = buildRepairBusyKey(
    "merge",
    `${normalizedSourceTaskId}->${normalizedTargetTaskId}`,
  );
  state.tasksWorkbenchActionBusyKey = busyKey;
  state.tasksWorkbenchActionError = null;
  state.tasksWorkbenchActionMessage = uiText(
    state.uiLocale,
    "Merging duplicate task...",
    "正在合并重复任务...",
  );

  try {
    const result = await state.client.request<TasksRepairMergeResult | undefined>(
      "tasks.repair.merge",
      {
        sourceTaskId: normalizedSourceTaskId,
        targetTaskId: normalizedTargetTaskId,
        agentId: targetTask.agentId,
        detail: detail?.trim() || undefined,
      },
    );
    if (!result?.task) {
      throw new Error(
        uiText(
          state.uiLocale,
          "Gateway did not return the merged task.",
          "网关没有返回合并后的任务。",
        ),
      );
    }
    state.tasksWorkbenchActionMessage = uiText(
      state.uiLocale,
      "Duplicate task merged into the selected task.",
      "重复任务已合并到当前任务。",
    );
    await loadTasksWorkbench(state, {
      force: true,
      selectTaskId: normalizedTargetTaskId,
    });
  } catch (error) {
    state.tasksWorkbenchActionMessage = null;
    state.tasksWorkbenchActionError =
      error instanceof Error
        ? error.message
        : uiText(state.uiLocale, "Request failed.", "请求失败。");
  } finally {
    if (state.tasksWorkbenchActionBusyKey === busyKey) {
      state.tasksWorkbenchActionBusyKey = null;
    }
  }
}

export async function repairTasksWorkbenchMarkTaskOrphan(
  state: TasksWorkbenchState,
  taskId: string,
  detail?: string,
): Promise<void> {
  const normalizedTaskId = taskId.trim();
  if (!state.client || !state.connected || !normalizedTaskId) {
    return;
  }
  if (!canUseContinuityRepairActions(state.hello)) {
    state.tasksWorkbenchActionError = formatContinuityRepairUnavailableMessage(state.uiLocale);
    state.tasksWorkbenchActionMessage = null;
    return;
  }
  if (state.tasksWorkbenchActionBusyKey) {
    return;
  }

  const task = state.tasksWorkbenchTasks.find((entry) => entry.taskId === normalizedTaskId);
  if (!task) {
    state.tasksWorkbenchActionError = uiText(state.uiLocale, "Task not found.", "未找到任务。");
    return;
  }

  const busyKey = buildRepairBusyKey("task-orphan", normalizedTaskId);
  state.tasksWorkbenchActionBusyKey = busyKey;
  state.tasksWorkbenchActionError = null;
  state.tasksWorkbenchActionMessage = uiText(
    state.uiLocale,
    "Marking task as orphan...",
    "正在将任务标记为 orphan...",
  );

  try {
    const result = await state.client.request<TasksRepairTaskOrphanResult | undefined>(
      "tasks.repair.markTaskOrphan",
      {
        taskId: normalizedTaskId,
        agentId: task.agentId,
        detail: detail?.trim() || undefined,
      },
    );
    if (!result?.task) {
      throw new Error(
        uiText(
          state.uiLocale,
          "Gateway did not return the repaired task.",
          "网关没有返回修复后的任务。",
        ),
      );
    }
    state.tasksWorkbenchActionMessage = uiText(
      state.uiLocale,
      "Task marked as orphan.",
      "任务已标记为 orphan。",
    );
    await loadTasksWorkbench(state, {
      force: true,
      selectTaskId: normalizedTaskId,
    });
  } catch (error) {
    state.tasksWorkbenchActionMessage = null;
    state.tasksWorkbenchActionError =
      error instanceof Error
        ? error.message
        : uiText(state.uiLocale, "Request failed.", "请求失败。");
  } finally {
    if (state.tasksWorkbenchActionBusyKey === busyKey) {
      state.tasksWorkbenchActionBusyKey = null;
    }
  }
}

export async function repairTasksWorkbenchMarkCommitmentOrphan(
  state: TasksWorkbenchState,
  taskId: string,
  commitmentId: string,
  detail?: string,
): Promise<void> {
  const normalizedTaskId = taskId.trim();
  const normalizedCommitmentId = commitmentId.trim();
  if (!state.client || !state.connected || !normalizedTaskId || !normalizedCommitmentId) {
    return;
  }
  if (!canUseContinuityRepairActions(state.hello)) {
    state.tasksWorkbenchActionError = formatContinuityRepairUnavailableMessage(state.uiLocale);
    state.tasksWorkbenchActionMessage = null;
    return;
  }
  if (state.tasksWorkbenchActionBusyKey) {
    return;
  }

  const task = state.tasksWorkbenchTasks.find((entry) => entry.taskId === normalizedTaskId);
  const commitment = (state.tasksWorkbenchCommitmentsByTaskId[normalizedTaskId] ?? []).find(
    (entry) => entry.commitmentId === normalizedCommitmentId,
  );
  if (!task || !commitment) {
    state.tasksWorkbenchActionError = uiText(
      state.uiLocale,
      "Commitment not found.",
      "未找到承诺。",
    );
    return;
  }

  const busyKey = buildRepairBusyKey("commitment-orphan", normalizedCommitmentId);
  state.tasksWorkbenchActionBusyKey = busyKey;
  state.tasksWorkbenchActionError = null;
  state.tasksWorkbenchActionMessage = uiText(
    state.uiLocale,
    "Marking commitment as orphan...",
    "正在将承诺标记为 orphan...",
  );

  try {
    const result = await state.client.request<TasksRepairCommitmentOrphanResult | undefined>(
      "tasks.repair.markCommitmentOrphan",
      {
        taskId: normalizedTaskId,
        commitmentId: normalizedCommitmentId,
        agentId: task.agentId,
        detail: detail?.trim() || undefined,
      },
    );
    if (!result?.commitment) {
      throw new Error(
        uiText(
          state.uiLocale,
          "Gateway did not return the repaired commitment.",
          "网关没有返回修复后的承诺。",
        ),
      );
    }
    state.tasksWorkbenchActionMessage = uiText(
      state.uiLocale,
      "Commitment marked as orphan.",
      "承诺已标记为 orphan。",
    );
    await loadTasksWorkbench(state, {
      force: true,
      selectTaskId: normalizedTaskId,
    });
  } catch (error) {
    state.tasksWorkbenchActionMessage = null;
    state.tasksWorkbenchActionError =
      error instanceof Error
        ? error.message
        : uiText(state.uiLocale, "Request failed.", "请求失败。");
  } finally {
    if (state.tasksWorkbenchActionBusyKey === busyKey) {
      state.tasksWorkbenchActionBusyKey = null;
    }
  }
}
