import type { GatewayBrowserClient } from "../gateway.ts";
import type {
  TaskCommitment,
  TaskEvent,
  TaskRecord,
  TasksCommitmentsResult,
  TasksEventsResult,
  TasksListResult,
} from "../types.ts";

export type TaskContinuityState = {
  client: GatewayBrowserClient | null;
  connected: boolean;
  sessionKey: string;
  taskContinuityLoading: boolean;
  taskContinuityError: string | null;
  taskContinuitySessionKey: string | null;
  taskContinuityTasks: Array<TaskRecord>;
  taskContinuitySelectedTaskId: string | null;
  taskContinuityEventsByTaskId: Record<string, Array<TaskEvent>>;
  taskContinuityCommitmentsByTaskId: Record<string, Array<TaskCommitment>>;
  taskContinuityDetailsLoadingTaskId: string | null;
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

export function clearTaskContinuity(state: TaskContinuityState): void {
  state.taskContinuityLoading = false;
  state.taskContinuityError = null;
  state.taskContinuitySessionKey = null;
  state.taskContinuityTasks = [];
  state.taskContinuitySelectedTaskId = null;
  state.taskContinuityEventsByTaskId = {};
  state.taskContinuityCommitmentsByTaskId = {};
  state.taskContinuityDetailsLoadingTaskId = null;
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
  await loadTaskContinuityDetails(state, normalizedTaskId);
}
