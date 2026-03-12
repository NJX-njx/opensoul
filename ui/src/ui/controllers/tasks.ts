import type { GatewayBrowserClient } from "../gateway.ts";
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
  TasksTaskPatchResult,
} from "../types.ts";
import type { Locale } from "../views/onboarding/i18n.ts";
import { uiText } from "../i18n.ts";

export type TaskContinuityState = {
  client: GatewayBrowserClient | null;
  connected: boolean;
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
  if (!state.client || !state.connected || !sessionKeyAtStart || !normalizedTaskId) {
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
        limit: 40,
      }),
      state.client.request<TasksCommitmentsResult | undefined>("tasks.commitments", {
        taskId: normalizedTaskId,
        sessionKey: sessionKeyAtStart,
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
