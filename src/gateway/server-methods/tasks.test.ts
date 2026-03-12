import { describe, expect, it, vi } from "vitest";
import { tasksHandlers } from "./tasks.js";

const mocks = vi.hoisted(() => ({
  loadConfig: vi.fn(() => ({})),
  resolveDefaultAgentId: vi.fn(() => "main"),
  resolveSessionAgentId: vi.fn(() => "main-from-session"),
  listTasks: vi.fn(() => [
    { taskId: "task-1", agentId: "main", status: "open", createdAt: 1, updatedAt: 1 },
  ]),
  getTask: vi.fn(() => ({
    taskId: "task-1",
    agentId: "main",
    status: "open",
    createdAt: 1,
    updatedAt: 1,
  })),
  listTaskEvents: vi.fn(() => [
    { eventId: "evt-1", taskId: "task-1", agentId: "main", kind: "user-message", createdAt: 1 },
  ]),
  listCommitments: vi.fn(() => [
    {
      commitmentId: "commit-1",
      taskId: "task-1",
      agentId: "main",
      status: "open",
      title: "Follow up",
      createdAt: 1,
      updatedAt: 1,
    },
  ]),
}));

vi.mock("../../config/config.js", () => ({
  loadConfig: mocks.loadConfig,
}));

vi.mock("../../agents/agent-scope.js", () => ({
  resolveDefaultAgentId: mocks.resolveDefaultAgentId,
  resolveSessionAgentId: mocks.resolveSessionAgentId,
}));

vi.mock("../../continuity/service.js", () => ({
  listTasks: mocks.listTasks,
  getTask: mocks.getTask,
  listTaskEvents: mocks.listTaskEvents,
  listCommitments: mocks.listCommitments,
}));

describe("tasks handlers", () => {
  it("lists tasks using the session-derived agent id", () => {
    const respond = vi.fn();
    tasksHandlers["tasks.list"]({
      params: {
        sessionKey: "agent:main:telegram:dm:user-1",
        limit: 10,
      },
      respond,
    } as never);

    expect(mocks.resolveSessionAgentId).toHaveBeenCalled();
    expect(mocks.listTasks).toHaveBeenCalledWith(
      expect.objectContaining({
        agentId: "main-from-session",
        sessionKey: "agent:main:telegram:dm:user-1",
        limit: 10,
      }),
    );
    expect(respond).toHaveBeenCalledWith(true, { tasks: expect.any(Array) }, undefined);
  });

  it("returns a single task with an explicit agent id", () => {
    const respond = vi.fn();
    tasksHandlers["tasks.get"]({
      params: {
        agentId: "ops",
        taskId: "task-1",
      },
      respond,
    } as never);

    expect(mocks.getTask).toHaveBeenCalledWith(
      expect.objectContaining({
        agentId: "ops",
        taskId: "task-1",
      }),
    );
    expect(respond).toHaveBeenCalledWith(
      true,
      { task: expect.objectContaining({ taskId: "task-1" }) },
      undefined,
    );
  });

  it("lists task events", () => {
    const respond = vi.fn();
    tasksHandlers["tasks.events"]({
      params: {
        taskId: "task-1",
        sessionKey: "agent:main:telegram:dm:user-1",
        limit: 5,
      },
      respond,
    } as never);

    expect(mocks.listTaskEvents).toHaveBeenCalledWith(
      expect.objectContaining({
        agentId: "main-from-session",
        taskId: "task-1",
        limit: 5,
      }),
    );
    expect(respond).toHaveBeenCalledWith(true, { events: expect.any(Array) }, undefined);
  });

  it("lists task commitments", () => {
    const respond = vi.fn();
    tasksHandlers["tasks.commitments"]({
      params: {
        taskId: "task-1",
        sessionKey: "agent:main:telegram:dm:user-1",
        status: "open",
      },
      respond,
    } as never);

    expect(mocks.listCommitments).toHaveBeenCalledWith(
      expect.objectContaining({
        agentId: "main-from-session",
        taskId: "task-1",
        status: "open",
      }),
    );
    expect(respond).toHaveBeenCalledWith(true, { commitments: expect.any(Array) }, undefined);
  });
});
