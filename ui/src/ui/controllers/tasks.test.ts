import { describe, expect, it, vi } from "vitest";
import type { GatewayBrowserClient } from "../gateway.ts";
import type { TaskCommitment, TaskEvent, TaskRecord } from "../types.ts";
import {
  DEFAULT_TASKS_WORKBENCH_FILTERS,
  loadTasksWorkbench,
  repairTasksWorkbenchMarkCommitmentOrphan,
  repairTasksWorkbenchRelinkTask,
  type TasksWorkbenchState,
  updateTaskContinuityCommitment,
  updateTasksWorkbenchTaskStatus,
  updateTaskContinuityTaskStatus,
  type TaskContinuityState,
} from "./tasks.ts";

const CONTINUITY_METHODS = [
  "tasks.list",
  "tasks.events",
  "tasks.commitments",
  "tasks.task.patch",
  "tasks.commitments.update",
  "tasks.repair.relink",
  "tasks.repair.merge",
  "tasks.repair.markTaskOrphan",
  "tasks.repair.markCommitmentOrphan",
];

function createHello(methods: Array<string> = CONTINUITY_METHODS) {
  return {
    type: "hello-ok" as const,
    protocol: 3,
    features: {
      methods,
      events: [],
    },
    auth: {
      scopes: ["operator.admin"],
    },
  };
}

function createTask(overrides: Partial<TaskRecord> = {}): TaskRecord {
  return {
    taskId: "task-1",
    agentId: "main",
    status: "running",
    title: "Ship task continuity",
    summary: "Visualize the same task across multiple surfaces",
    createdAt: 1,
    updatedAt: 1,
    ...overrides,
  };
}

function createCommitment(overrides: Partial<TaskCommitment> = {}): TaskCommitment {
  return {
    commitmentId: "commit-1",
    taskId: "task-1",
    agentId: "main",
    status: "open",
    title: "Follow up on the browser flow",
    createdAt: 1,
    updatedAt: 1,
    ...overrides,
  };
}

function createEvent(overrides: Partial<TaskEvent> = {}): TaskEvent {
  return {
    eventId: "evt-1",
    taskId: "task-1",
    agentId: "main",
    kind: "commitment.done",
    createdAt: 2,
    ...overrides,
  };
}

function createState(
  request: GatewayBrowserClient["request"],
  overrides: Partial<TaskContinuityState & TasksWorkbenchState> = {},
): TaskContinuityState & TasksWorkbenchState {
  const task = createTask();
  const commitment = createCommitment();
  return {
    client: { request } as unknown as GatewayBrowserClient,
    connected: true,
    hello: createHello(),
    sessionKey: "agent:main:main",
    uiLocale: "en",
    taskContinuityLoading: false,
    taskContinuityError: null,
    taskContinuitySessionKey: "agent:main:main",
    taskContinuityTasks: [task],
    taskContinuitySelectedTaskId: task.taskId,
    taskContinuityEventsByTaskId: {
      [task.taskId]: [],
    },
    taskContinuityCommitmentsByTaskId: {
      [task.taskId]: [commitment],
    },
    taskContinuityDetailsLoadingTaskId: null,
    taskContinuityActionError: null,
    taskContinuityActionMessage: null,
    taskContinuityActionBusyKey: null,
    tasksWorkbenchLoading: false,
    tasksWorkbenchError: null,
    tasksWorkbenchTasks: [task],
    tasksWorkbenchSelectedTaskId: task.taskId,
    tasksWorkbenchEventsByTaskId: {
      [task.taskId]: [createEvent()],
    },
    tasksWorkbenchCommitmentsByTaskId: {
      [task.taskId]: [commitment],
    },
    tasksWorkbenchDetailsLoadingTaskId: null,
    tasksWorkbenchActionError: null,
    tasksWorkbenchActionMessage: null,
    tasksWorkbenchActionBusyKey: null,
    tasksWorkbenchNextOffset: null,
    tasksWorkbenchTotal: 1,
    tasksWorkbenchFilters: { ...DEFAULT_TASKS_WORKBENCH_FILTERS },
    ...overrides,
  };
}

describe("task continuity controller actions", () => {
  it("updates commitments optimistically and refreshes the selected task", async () => {
    let resolvePatch: (value: { commitment: TaskCommitment }) => void = () => undefined;
    const updatedCommitment = createCommitment({
      status: "done",
      updatedAt: 2,
      closedAt: 2,
    });
    const updatedTask = createTask({
      status: "waiting-user",
      updatedAt: 2,
    });
    const requestMock = vi.fn((method: string): Promise<unknown> => {
      if (method === "tasks.commitments.update") {
        return new Promise((resolve) => {
          resolvePatch = resolve as (value: { commitment: TaskCommitment }) => void;
        });
      }
      if (method === "tasks.list") {
        return Promise.resolve({ tasks: [updatedTask] });
      }
      if (method === "tasks.events") {
        return Promise.resolve({ events: [createEvent()] });
      }
      if (method === "tasks.commitments") {
        return Promise.resolve({ commitments: [updatedCommitment] });
      }
      return Promise.reject(new Error(`unexpected method: ${method}`));
    });
    const request = requestMock as unknown as GatewayBrowserClient["request"];
    const state = createState(request);

    const updatePromise = updateTaskContinuityCommitment(state, "task-1", "commit-1", "done");
    expect(state.taskContinuityCommitmentsByTaskId["task-1"]?.[0]?.status).toBe("done");
    expect(state.taskContinuityActionBusyKey).toBe("commitment:commit-1:done");

    resolvePatch({ commitment: updatedCommitment });
    await updatePromise;

    expect(requestMock.mock.calls.map(([method]) => method)).toEqual([
      "tasks.commitments.update",
      "tasks.list",
      "tasks.events",
      "tasks.commitments",
    ]);
    expect(state.taskContinuityCommitmentsByTaskId["task-1"]?.[0]?.status).toBe("done");
    expect(state.taskContinuityActionMessage).toBe("Commitment marked done.");
    expect(state.taskContinuityActionBusyKey).toBeNull();
  });

  it("rolls back optimistic task updates when the patch request fails", async () => {
    let rejectPatch: (error: Error) => void = () => undefined;
    const requestMock = vi.fn((method: string): Promise<unknown> => {
      if (method === "tasks.task.patch") {
        return new Promise((_, reject) => {
          rejectPatch = reject as (error: Error) => void;
        });
      }
      return Promise.reject(new Error(`unexpected method: ${method}`));
    });
    const request = requestMock as unknown as GatewayBrowserClient["request"];
    const state = createState(request);

    const updatePromise = updateTaskContinuityTaskStatus(state, "task-1", "completed");
    expect(state.taskContinuityTasks[0]?.status).toBe("completed");
    expect(state.taskContinuityActionBusyKey).toBe("task:task-1:completed");

    rejectPatch(new Error("request failed"));
    await updatePromise;

    expect(requestMock).toHaveBeenCalledWith(
      "tasks.task.patch",
      expect.objectContaining({
        taskId: "task-1",
        status: "completed",
      }),
    );
    expect(state.taskContinuityTasks[0]?.status).toBe("running");
    expect(state.taskContinuityActionError).toBe("request failed");
    expect(state.taskContinuityActionBusyKey).toBeNull();
  });

  it("loads workbench tasks with filters and fetches selected task details", async () => {
    const workbenchTask = createTask({
      taskId: "task-2",
      agentId: "ops",
      title: "Review the global task workbench",
      updatedAt: 5,
    });
    const requestMock = vi.fn((method: string): Promise<unknown> => {
      if (method === "tasks.list") {
        return Promise.resolve({
          tasks: [workbenchTask],
          total: 2,
          nextOffset: 24,
        });
      }
      if (method === "tasks.events") {
        return Promise.resolve({
          events: [createEvent({ taskId: "task-2", agentId: "ops" })],
        });
      }
      if (method === "tasks.commitments") {
        return Promise.resolve({
          commitments: [createCommitment({ taskId: "task-2", agentId: "ops" })],
        });
      }
      return Promise.reject(new Error(`unexpected method: ${method}`));
    });
    const request = requestMock as unknown as GatewayBrowserClient["request"];
    const state = createState(request, {
      tasksWorkbenchTasks: [],
      tasksWorkbenchSelectedTaskId: null,
      tasksWorkbenchEventsByTaskId: {},
      tasksWorkbenchCommitmentsByTaskId: {},
    });

    await loadTasksWorkbench(state);

    expect(requestMock).toHaveBeenNthCalledWith(
      1,
      "tasks.list",
      expect.objectContaining({
        allAgents: true,
        limit: 24,
        sort: "updated-desc",
      }),
    );
    expect(requestMock).toHaveBeenNthCalledWith(
      2,
      "tasks.events",
      expect.objectContaining({
        taskId: "task-2",
        agentId: "ops",
      }),
    );
    expect(state.tasksWorkbenchSelectedTaskId).toBe("task-2");
    expect(state.tasksWorkbenchTotal).toBe(2);
    expect(state.tasksWorkbenchNextOffset).toBe(24);
    expect(state.tasksWorkbenchEventsByTaskId["task-2"]?.[0]?.agentId).toBe("ops");
  });

  it("updates workbench tasks through agent-scoped patch requests", async () => {
    let resolvePatch: (value: { task: TaskRecord }) => void = () => undefined;
    const updatedTask = createTask({
      status: "completed",
      updatedAt: 2,
      closedAt: 2,
    });
    const requestMock = vi.fn((method: string): Promise<unknown> => {
      if (method === "tasks.task.patch") {
        return new Promise((resolve) => {
          resolvePatch = resolve as (value: { task: TaskRecord }) => void;
        });
      }
      if (method === "tasks.list") {
        return Promise.resolve({ tasks: [updatedTask], total: 1, nextOffset: null });
      }
      if (method === "tasks.events") {
        return Promise.resolve({ events: [createEvent()] });
      }
      if (method === "tasks.commitments") {
        return Promise.resolve({ commitments: [createCommitment()] });
      }
      return Promise.reject(new Error(`unexpected method: ${method}`));
    });
    const request = requestMock as unknown as GatewayBrowserClient["request"];
    const state = createState(request);

    const updatePromise = updateTasksWorkbenchTaskStatus(state, "task-1", "completed");
    expect(state.tasksWorkbenchTasks[0]?.status).toBe("completed");
    expect(state.tasksWorkbenchActionBusyKey).toBe("task:task-1:completed");

    resolvePatch({ task: updatedTask });
    await updatePromise;

    expect(requestMock).toHaveBeenNthCalledWith(
      1,
      "tasks.task.patch",
      expect.objectContaining({
        taskId: "task-1",
        agentId: "main",
        status: "completed",
      }),
    );
    expect(state.tasksWorkbenchTasks[0]?.status).toBe("completed");
    expect(state.tasksWorkbenchActionMessage).toBe("Task closed.");
    expect(state.tasksWorkbenchActionBusyKey).toBeNull();
  });

  it("degrades task workbench reads when continuity methods are not advertised", async () => {
    const requestMock = vi.fn(() => Promise.reject(new Error("unexpected request")));
    const request = requestMock as unknown as GatewayBrowserClient["request"];
    const state = createState(request, {
      hello: createHello([]),
    });

    await loadTasksWorkbench(state);

    expect(requestMock).not.toHaveBeenCalled();
    expect(state.tasksWorkbenchTasks).toEqual([]);
    expect(state.tasksWorkbenchError).toBe(
      "Task continuity is disabled by the current gateway config.",
    );
  });

  it("relinks workbench tasks and refreshes the selected row", async () => {
    const updatedTask = createTask({
      latestSessionKey: "agent:main:telegram:dm:user-2",
      updatedAt: 3,
    });
    const requestMock = vi.fn((method: string): Promise<unknown> => {
      if (method === "tasks.repair.relink") {
        return Promise.resolve({ task: updatedTask });
      }
      if (method === "tasks.list") {
        return Promise.resolve({ tasks: [updatedTask], total: 1, nextOffset: null });
      }
      if (method === "tasks.events") {
        return Promise.resolve({ events: [createEvent()] });
      }
      if (method === "tasks.commitments") {
        return Promise.resolve({ commitments: [createCommitment()] });
      }
      return Promise.reject(new Error(`unexpected method: ${method}`));
    });
    const request = requestMock as unknown as GatewayBrowserClient["request"];
    const state = createState(request);

    await repairTasksWorkbenchRelinkTask(
      state,
      "task-1",
      "agent:main:telegram:dm:user-2",
      "restore the main chat",
    );

    expect(requestMock).toHaveBeenNthCalledWith(
      1,
      "tasks.repair.relink",
      expect.objectContaining({
        taskId: "task-1",
        agentId: "main",
        sessionKey: "agent:main:telegram:dm:user-2",
      }),
    );
    expect(state.tasksWorkbenchActionMessage).toBe("Task relinked to the new session.");
    expect(state.tasksWorkbenchTasks[0]?.latestSessionKey).toBe("agent:main:telegram:dm:user-2");
  });

  it("marks orphan commitments from the workbench and refreshes details", async () => {
    const repairedCommitment = createCommitment({
      metadata: {
        continuityRepairState: "orphan",
      },
      updatedAt: 4,
    });
    const requestMock = vi.fn((method: string): Promise<unknown> => {
      if (method === "tasks.repair.markCommitmentOrphan") {
        return Promise.resolve({ commitment: repairedCommitment });
      }
      if (method === "tasks.list") {
        return Promise.resolve({ tasks: [createTask()], total: 1, nextOffset: null });
      }
      if (method === "tasks.events") {
        return Promise.resolve({ events: [createEvent()] });
      }
      if (method === "tasks.commitments") {
        return Promise.resolve({ commitments: [repairedCommitment] });
      }
      return Promise.reject(new Error(`unexpected method: ${method}`));
    });
    const request = requestMock as unknown as GatewayBrowserClient["request"];
    const state = createState(request);

    await repairTasksWorkbenchMarkCommitmentOrphan(
      state,
      "task-1",
      "commit-1",
      "task was merged elsewhere",
    );

    expect(requestMock).toHaveBeenNthCalledWith(
      1,
      "tasks.repair.markCommitmentOrphan",
      expect.objectContaining({
        taskId: "task-1",
        commitmentId: "commit-1",
        agentId: "main",
      }),
    );
    expect(state.tasksWorkbenchCommitmentsByTaskId["task-1"]?.[0]?.metadata).toEqual(
      expect.objectContaining({
        continuityRepairState: "orphan",
      }),
    );
    expect(state.tasksWorkbenchActionMessage).toBe("Commitment marked as orphan.");
  });

  it("blocks task continuity actions when UI methods are disabled", async () => {
    const requestMock = vi.fn(() => Promise.reject(new Error("unexpected request")));
    const request = requestMock as unknown as GatewayBrowserClient["request"];
    const state = createState(request, {
      hello: createHello(["tasks.list", "tasks.events", "tasks.commitments"]),
    });

    await updateTaskContinuityTaskStatus(state, "task-1", "completed");

    expect(requestMock).not.toHaveBeenCalled();
    expect(state.taskContinuityActionError).toBe(
      "Task continuity actions are disabled by the current gateway config.",
    );
  });

  it("blocks workbench repair actions when repair methods are disabled", async () => {
    const requestMock = vi.fn(() => Promise.reject(new Error("unexpected request")));
    const request = requestMock as unknown as GatewayBrowserClient["request"];
    const state = createState(request, {
      hello: createHello([
        "tasks.list",
        "tasks.events",
        "tasks.commitments",
        "tasks.task.patch",
        "tasks.commitments.update",
      ]),
    });

    await repairTasksWorkbenchRelinkTask(state, "task-1", "agent:main:telegram:dm:user-2");

    expect(requestMock).not.toHaveBeenCalled();
    expect(state.tasksWorkbenchActionError).toBe(
      "Task continuity repair tools are disabled by the current gateway config.",
    );
  });
});
