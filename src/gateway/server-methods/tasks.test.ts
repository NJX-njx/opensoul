import { beforeEach, describe, expect, it, vi } from "vitest";
import { tasksHandlers } from "./tasks.js";

const mocks = vi.hoisted(() => ({
  loadConfig: vi.fn(() => ({})),
  resolveDefaultAgentId: vi.fn(() => "main"),
  resolveSessionAgentId: vi.fn(() => "main-from-session"),
  queryTasks: vi.fn(() => ({
    tasks: [{ taskId: "task-1", agentId: "main", status: "open", createdAt: 1, updatedAt: 1 }],
    total: 1,
  })),
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
  patchCommitment: vi.fn(() => ({
    commitmentId: "commit-1",
    taskId: "task-1",
    agentId: "main",
    status: "done",
    title: "Follow up",
    detail: "Closed from Control UI",
    createdAt: 1,
    updatedAt: 2,
    closedAt: 2,
  })),
  patchTask: vi.fn(() => ({
    taskId: "task-1",
    agentId: "main",
    status: "completed",
    title: "Patched title",
    summary: "Patched summary",
    latestSessionKey: "agent:main:telegram:dm:user-2",
    createdAt: 1,
    updatedAt: 2,
    closedAt: 2,
  })),
  repairRelinkTaskToSession: vi.fn(() => ({
    taskId: "task-1",
    agentId: "main",
    status: "open",
    latestSessionKey: "agent:main:telegram:dm:user-2",
    createdAt: 1,
    updatedAt: 2,
  })),
  repairMergeTasks: vi.fn(() => ({
    task: {
      taskId: "task-1",
      agentId: "main",
      status: "running",
      createdAt: 1,
      updatedAt: 2,
    },
    mergedTaskId: "task-1",
    deletedTaskId: "task-2",
    moved: {
      sessionLinks: 1,
      events: 2,
      commitments: 1,
      dedupedCommitments: 1,
    },
  })),
  repairMarkTaskOrphan: vi.fn(() => ({
    taskId: "task-1",
    agentId: "main",
    status: "open",
    createdAt: 1,
    updatedAt: 2,
    metadata: {
      continuityRepairState: "orphan",
    },
  })),
  repairMarkCommitmentOrphan: vi.fn(() => ({
    commitmentId: "commit-1",
    taskId: "task-1",
    agentId: "main",
    status: "open",
    title: "Follow up",
    createdAt: 1,
    updatedAt: 2,
    metadata: {
      continuityRepairState: "orphan",
    },
  })),
}));

vi.mock("../../config/config.js", () => ({
  loadConfig: mocks.loadConfig,
}));

vi.mock("../../agents/agent-scope.js", () => ({
  resolveDefaultAgentId: mocks.resolveDefaultAgentId,
  resolveSessionAgentId: mocks.resolveSessionAgentId,
}));

vi.mock("../../continuity/service.js", () => ({
  queryTasks: mocks.queryTasks,
  getTask: mocks.getTask,
  listTaskEvents: mocks.listTaskEvents,
  listCommitments: mocks.listCommitments,
  patchCommitment: mocks.patchCommitment,
  patchTask: mocks.patchTask,
  repairRelinkTaskToSession: mocks.repairRelinkTaskToSession,
  repairMergeTasks: mocks.repairMergeTasks,
  repairMarkTaskOrphan: mocks.repairMarkTaskOrphan,
  repairMarkCommitmentOrphan: mocks.repairMarkCommitmentOrphan,
}));

function operatorClient(scopes: Array<string>) {
  return {
    connect: {
      role: "operator",
      scopes,
    },
  };
}

describe("tasks handlers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("lists tasks using the session-derived agent id", () => {
    const respond = vi.fn();
    void tasksHandlers["tasks.list"]({
      params: {
        sessionKey: "agent:main:telegram:dm:user-1",
        limit: 10,
      },
      client: operatorClient(["operator.read"]),
      respond,
    } as never);

    expect(mocks.resolveSessionAgentId).toHaveBeenCalled();
    expect(mocks.queryTasks).toHaveBeenCalledWith(
      expect.objectContaining({
        agentId: "main-from-session",
        sessionKey: "agent:main:telegram:dm:user-1",
      }),
    );
    expect(respond).toHaveBeenCalledWith(
      true,
      expect.objectContaining({
        tasks: expect.any(Array),
        total: 1,
        nextOffset: null,
      }),
      undefined,
    );
  });

  it("degrades continuity reads to empty results when read flags are disabled", () => {
    mocks.loadConfig.mockReturnValueOnce({
      gateway: {
        controlUi: {
          continuity: {
            features: {
              reads: false,
            },
          },
        },
      },
    });
    const respond = vi.fn();
    void tasksHandlers["tasks.list"]({
      params: {
        sessionKey: "agent:main:telegram:dm:user-1",
      },
      client: operatorClient(["operator.read"]),
      respond,
    } as never);

    expect(mocks.queryTasks).not.toHaveBeenCalled();
    expect(respond).toHaveBeenCalledWith(
      true,
      {
        tasks: [],
        total: 0,
        nextOffset: null,
      },
      undefined,
    );
  });

  it("aggregates tasks across agents when allAgents is enabled", () => {
    mocks.loadConfig.mockReturnValueOnce({
      agents: { list: [{ id: "main" }, { id: "ops" }] },
    });
    mocks.queryTasks
      .mockReturnValueOnce({
        tasks: [{ taskId: "task-1", agentId: "main", status: "open", createdAt: 1, updatedAt: 1 }],
        total: 1,
      })
      .mockReturnValueOnce({
        tasks: [
          { taskId: "task-2", agentId: "ops", status: "running", createdAt: 2, updatedAt: 2 },
        ],
        total: 1,
      });
    const respond = vi.fn();
    void tasksHandlers["tasks.list"]({
      params: {
        allAgents: true,
        limit: 1,
      },
      client: operatorClient(["operator.admin"]),
      respond,
    } as never);

    expect(mocks.queryTasks).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        agentId: "main",
      }),
    );
    expect(mocks.queryTasks).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        agentId: "ops",
      }),
    );
    expect(respond).toHaveBeenCalledWith(
      true,
      expect.objectContaining({
        tasks: [expect.objectContaining({ taskId: "task-2", agentId: "ops" })],
        total: 2,
        nextOffset: 1,
      }),
      undefined,
    );
  });

  it("returns a single task with an explicit agent id", () => {
    const respond = vi.fn();
    void tasksHandlers["tasks.get"]({
      params: {
        agentId: "ops",
        taskId: "task-1",
      },
      client: operatorClient(["operator.admin"]),
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
    void tasksHandlers["tasks.events"]({
      params: {
        taskId: "task-1",
        sessionKey: "agent:main:telegram:dm:user-1",
        limit: 5,
      },
      client: operatorClient(["operator.read"]),
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
    void tasksHandlers["tasks.commitments"]({
      params: {
        taskId: "task-1",
        sessionKey: "agent:main:telegram:dm:user-1",
        status: "open",
        limit: 40,
      },
      client: operatorClient(["operator.read"]),
      respond,
    } as never);

    expect(mocks.listCommitments).toHaveBeenCalledWith(
      expect.objectContaining({
        agentId: "main-from-session",
        taskId: "task-1",
        status: "open",
        limit: 40,
      }),
    );
    expect(respond).toHaveBeenCalledWith(true, { commitments: expect.any(Array) }, undefined);
  });

  it("updates a task commitment", () => {
    const respond = vi.fn();
    void tasksHandlers["tasks.commitments.update"]({
      params: {
        taskId: "task-1",
        commitmentId: "commit-1",
        sessionKey: "agent:main:telegram:dm:user-1",
        status: "done",
        detail: "Closed from Control UI",
      },
      client: operatorClient(["operator.write"]),
      respond,
    } as never);

    expect(mocks.patchCommitment).toHaveBeenCalledWith(
      expect.objectContaining({
        agentId: "main-from-session",
        taskId: "task-1",
        commitmentId: "commit-1",
        status: "done",
        detail: "Closed from Control UI",
      }),
    );
    expect(respond).toHaveBeenCalledWith(
      true,
      { commitment: expect.objectContaining({ commitmentId: "commit-1", status: "done" }) },
      undefined,
    );
  });

  it("returns an error when a task commitment cannot be found", () => {
    mocks.patchCommitment.mockReturnValueOnce(null);
    const respond = vi.fn();
    void tasksHandlers["tasks.commitments.update"]({
      params: {
        agentId: "ops",
        taskId: "task-1",
        commitmentId: "missing",
        status: "cancelled",
      },
      client: operatorClient(["operator.admin"]),
      respond,
    } as never);

    expect(respond).toHaveBeenCalledWith(
      false,
      undefined,
      expect.objectContaining({
        code: "INVALID_REQUEST",
        message: "unknown task or commitment: task-1/missing",
      }),
    );
  });

  it("patches a task through the write API", () => {
    const respond = vi.fn();
    void tasksHandlers["tasks.task.patch"]({
      params: {
        agentId: "ops",
        taskId: "task-1",
        status: "completed",
        title: "Patched title",
        summary: "Patched summary",
      },
      client: operatorClient(["operator.admin"]),
      respond,
    } as never);

    expect(mocks.getTask).toHaveBeenCalledWith(
      expect.objectContaining({
        agentId: "ops",
        taskId: "task-1",
      }),
    );
    expect(mocks.patchTask).toHaveBeenCalledWith(
      expect.objectContaining({
        agentId: "ops",
        taskId: "task-1",
        status: "completed",
        title: "Patched title",
        summary: "Patched summary",
      }),
    );
    expect(respond).toHaveBeenCalledWith(
      true,
      { task: expect.objectContaining({ taskId: "task-1", status: "completed" }) },
      undefined,
    );
  });

  it("rejects continuity writes when write flags are disabled", () => {
    mocks.loadConfig.mockReturnValueOnce({
      gateway: {
        controlUi: {
          continuity: {
            features: {
              writes: false,
            },
          },
        },
      },
    });
    const respond = vi.fn();
    void tasksHandlers["tasks.task.patch"]({
      params: {
        agentId: "ops",
        taskId: "task-1",
        status: "completed",
      },
      client: operatorClient(["operator.admin"]),
      respond,
    } as never);

    expect(mocks.patchTask).not.toHaveBeenCalled();
    expect(respond).toHaveBeenCalledWith(
      false,
      undefined,
      expect.objectContaining({
        code: "INVALID_REQUEST",
        message: "continuity writes are disabled by config",
      }),
    );
  });

  it("repairs task relinks through the write API", () => {
    const respond = vi.fn();
    void tasksHandlers["tasks.repair.relink"]({
      params: {
        agentId: "ops",
        taskId: "task-1",
        sessionKey: "agent:main:telegram:dm:user-2",
        detail: "move back to the user thread",
      },
      client: operatorClient(["operator.admin"]),
      respond,
    } as never);

    expect(mocks.repairRelinkTaskToSession).toHaveBeenCalledWith(
      expect.objectContaining({
        agentId: "ops",
        taskId: "task-1",
        sessionKey: "agent:main:telegram:dm:user-2",
      }),
    );
    expect(respond).toHaveBeenCalledWith(
      true,
      { task: expect.objectContaining({ latestSessionKey: "agent:main:telegram:dm:user-2" }) },
      undefined,
    );
  });

  it("requires operator.admin for repair APIs", () => {
    const respond = vi.fn();
    void tasksHandlers["tasks.repair.merge"]({
      params: {
        agentId: "ops",
        sourceTaskId: "task-2",
        targetTaskId: "task-1",
      },
      client: operatorClient(["operator.write"]),
      respond,
    } as never);

    expect(mocks.repairMergeTasks).not.toHaveBeenCalled();
    expect(respond).toHaveBeenCalledWith(
      false,
      undefined,
      expect.objectContaining({
        code: "INVALID_REQUEST",
        message: "tasks.repair.merge requires operator.admin",
      }),
    );
  });

  it("marks orphan commitments through the repair API", () => {
    const respond = vi.fn();
    void tasksHandlers["tasks.repair.markCommitmentOrphan"]({
      params: {
        agentId: "ops",
        taskId: "task-1",
        commitmentId: "commit-1",
        detail: "task deleted elsewhere",
      },
      client: operatorClient(["operator.admin"]),
      respond,
    } as never);

    expect(mocks.repairMarkCommitmentOrphan).toHaveBeenCalledWith(
      expect.objectContaining({
        agentId: "ops",
        taskId: "task-1",
        commitmentId: "commit-1",
      }),
    );
    expect(respond).toHaveBeenCalledWith(
      true,
      {
        commitment: expect.objectContaining({
          commitmentId: "commit-1",
          metadata: expect.objectContaining({
            continuityRepairState: "orphan",
          }),
        }),
      },
      undefined,
    );
  });

  it("rejects task patches without writable fields", () => {
    const respond = vi.fn();
    void tasksHandlers["tasks.task.patch"]({
      params: {
        agentId: "ops",
        taskId: "task-1",
      },
      client: operatorClient(["operator.admin"]),
      respond,
    } as never);

    expect(mocks.patchTask).not.toHaveBeenCalled();
    expect(respond).toHaveBeenCalledWith(
      false,
      undefined,
      expect.objectContaining({
        code: "INVALID_REQUEST",
        message: "invalid tasks.task.patch params: no patch fields",
      }),
    );
  });

  it("returns an error for unknown tasks on task patches", () => {
    mocks.getTask.mockReturnValueOnce(null);
    const respond = vi.fn();
    void tasksHandlers["tasks.task.patch"]({
      params: {
        agentId: "ops",
        taskId: "missing-task",
        status: "open",
      },
      client: operatorClient(["operator.admin"]),
      respond,
    } as never);

    expect(mocks.patchTask).not.toHaveBeenCalled();
    expect(respond).toHaveBeenCalledWith(
      false,
      undefined,
      expect.objectContaining({
        code: "INVALID_REQUEST",
        message: "unknown task: missing-task",
      }),
    );
  });

  it("returns an error for illegal task status transitions", () => {
    mocks.patchTask.mockReturnValueOnce(null);
    const respond = vi.fn();
    void tasksHandlers["tasks.task.patch"]({
      params: {
        agentId: "ops",
        taskId: "task-1",
        status: "failed",
      },
      client: operatorClient(["operator.admin"]),
      respond,
    } as never);

    expect(respond).toHaveBeenCalledWith(
      false,
      undefined,
      expect.objectContaining({
        code: "INVALID_REQUEST",
        message: "illegal task status transition: open -> failed",
      }),
    );
  });

  it("rejects allAgents task listing without operator.admin", () => {
    const respond = vi.fn();
    void tasksHandlers["tasks.list"]({
      params: {
        allAgents: true,
        sessionKey: "agent:main:telegram:dm:user-1",
      },
      client: operatorClient(["operator.read"]),
      respond,
    } as never);

    expect(mocks.queryTasks).not.toHaveBeenCalled();
    expect(respond).toHaveBeenCalledWith(
      false,
      undefined,
      expect.objectContaining({
        code: "INVALID_REQUEST",
        message: "tasks.list allAgents requires operator.admin",
      }),
    );
  });

  it("rejects task reads outside the caller session scope", () => {
    mocks.getTask.mockReturnValueOnce({
      taskId: "task-1",
      agentId: "main-from-session",
      status: "open",
      latestSessionKey: "agent:main:telegram:dm:other-user",
      createdAt: 1,
      updatedAt: 1,
    });
    mocks.queryTasks.mockReturnValueOnce({ tasks: [], total: 0 });
    const respond = vi.fn();
    void tasksHandlers["tasks.get"]({
      params: {
        taskId: "task-1",
        sessionKey: "agent:main:telegram:dm:user-1",
      },
      client: operatorClient(["operator.read"]),
      respond,
    } as never);

    expect(respond).toHaveBeenCalledWith(
      false,
      undefined,
      expect.objectContaining({
        code: "INVALID_REQUEST",
        message: "task access denied for this session",
      }),
    );
  });
});
