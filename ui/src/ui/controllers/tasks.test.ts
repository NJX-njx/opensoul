import { describe, expect, it, vi } from "vitest";
import type { GatewayBrowserClient } from "../gateway.ts";
import type { TaskCommitment, TaskEvent, TaskRecord } from "../types.ts";
import {
  updateTaskContinuityCommitment,
  updateTaskContinuityTaskStatus,
  type TaskContinuityState,
} from "./tasks.ts";

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
  overrides: Partial<TaskContinuityState> = {},
): TaskContinuityState {
  const task = createTask();
  const commitment = createCommitment();
  return {
    client: { request } as unknown as GatewayBrowserClient,
    connected: true,
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
});
