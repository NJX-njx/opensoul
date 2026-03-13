import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { OpenSoulConfig } from "../config/config.js";
import { saveSessionStore } from "../config/sessions.js";
import { registerLogTransport } from "../logging/logger.js";
import {
  appendTaskEvent,
  buildContinuitySummary,
  getTask,
  listCommitments,
  listTaskEvents,
  logStaleContinuityTasks,
  patchCommitment,
  patchTask,
  queryTasks,
  repairMarkCommitmentOrphan,
  repairMarkTaskOrphan,
  repairMergeTasks,
  repairRelinkTaskToSession,
  resetContinuityObservabilityForTest,
  resolveOrCreateTaskForInbound,
  setSessionActiveTask,
  updateTaskStatus,
} from "./service.js";
import { getContinuityStore, resetContinuityStoreCacheForTest } from "./store.js";

function makeConfig(root: string): OpenSoulConfig {
  return {
    session: {
      store: path.join(root, "sessions.json"),
    },
    agents: {
      list: [
        {
          id: "main",
          agentDir: path.join(root, "agents", "main", "agent"),
        },
      ],
    },
  } as OpenSoulConfig;
}

describe("continuity service", () => {
  let tempDir: string | null = null;

  afterEach(async () => {
    resetContinuityStoreCacheForTest();
    resetContinuityObservabilityForTest();
    if (tempDir) {
      await fs.rm(tempDir, { recursive: true, force: true });
      tempDir = null;
    }
  });

  it("reuses the active session task for new inbound messages", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-continuity-service-"));
    const cfg = makeConfig(tempDir);

    const first = resolveOrCreateTaskForInbound({
      cfg,
      agentId: "main",
      sessionKey: "agent:main:main",
      inboundText: "Build the feature",
      surface: { kind: "direct-chat", channel: "telegram" },
    });

    const second = resolveOrCreateTaskForInbound({
      cfg,
      agentId: "main",
      sessionKey: "agent:main:main",
      sessionEntry: {
        sessionId: "session-1",
        updatedAt: Date.now(),
        activeTaskId: first.task.taskId,
      },
      inboundText: "Keep going",
      surface: { kind: "direct-chat", channel: "telegram" },
    });

    expect(first.reused).toBe(false);
    expect(second.reused).toBe(true);
    expect(second.task.taskId).toBe(first.task.taskId);
  });

  it("updates session store and task status as events arrive", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-continuity-events-"));
    const cfg = makeConfig(tempDir);
    const storePath = cfg.session?.store as string;
    await saveSessionStore(storePath, {
      "agent:main:main": {
        sessionId: "session-1",
        updatedAt: 1,
      },
    });

    const resolved = resolveOrCreateTaskForInbound({
      cfg,
      agentId: "main",
      sessionKey: "agent:main:main",
      inboundText: "Need a follow-up",
      surface: { kind: "direct-chat", channel: "telegram" },
    });

    await setSessionActiveTask({
      storePath,
      sessionKey: "agent:main:main",
      taskId: resolved.task.taskId,
    });
    appendTaskEvent({
      cfg,
      agentId: "main",
      taskId: resolved.task.taskId,
      kind: "lifecycle.start",
      stream: "lifecycle",
      phase: "start",
      sessionKey: "agent:main:main",
      summary: "run started",
      surface: { kind: "direct-chat", channel: "telegram" },
    });

    const task = getTask({
      cfg,
      agentId: "main",
      taskId: resolved.task.taskId,
    });
    expect(task?.status).toBe("running");
    expect(task?.latestSessionKey).toBe("agent:main:main");
  });

  it("extracts, deduplicates, and reopens commitments from lifecycle summaries", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-continuity-commitments-"));
    const cfg = makeConfig(tempDir);
    const resolved = resolveOrCreateTaskForInbound({
      cfg,
      agentId: "main",
      sessionKey: "agent:main:main",
      inboundText: "Keep the task moving",
      surface: { kind: "direct-chat", channel: "telegram" },
    });

    appendTaskEvent({
      cfg,
      agentId: "main",
      taskId: resolved.task.taskId,
      kind: "lifecycle.end",
      stream: "lifecycle",
      phase: "end",
      sessionKey: "agent:main:main",
      runId: "run-1",
      summary: "Next steps:\n- Follow up on the browser flow",
      surface: { kind: "direct-chat", channel: "telegram" },
    });

    let commitments = listCommitments({
      cfg,
      agentId: "main",
      taskId: resolved.task.taskId,
    });
    expect(commitments).toHaveLength(1);
    expect(commitments[0]?.status).toBe("open");
    expect(commitments[0]?.title).toBe("Follow up on the browser flow");

    appendTaskEvent({
      cfg,
      agentId: "main",
      taskId: resolved.task.taskId,
      kind: "lifecycle.end",
      stream: "lifecycle",
      phase: "end",
      sessionKey: "agent:main:main",
      runId: "run-2",
      summary: "Next steps:\n- Follow up on the browser flow",
      surface: { kind: "direct-chat", channel: "telegram" },
    });

    commitments = listCommitments({
      cfg,
      agentId: "main",
      taskId: resolved.task.taskId,
    });
    expect(commitments).toHaveLength(1);
    expect(commitments[0]?.status).toBe("open");

    appendTaskEvent({
      cfg,
      agentId: "main",
      taskId: resolved.task.taskId,
      kind: "user-message",
      sessionKey: "agent:main:main",
      summary: "The follow up on the browser flow is done.",
      surface: { kind: "direct-chat", channel: "telegram" },
    });

    commitments = listCommitments({
      cfg,
      agentId: "main",
      taskId: resolved.task.taskId,
    });
    expect(commitments).toHaveLength(1);
    expect(commitments[0]?.status).toBe("done");

    appendTaskEvent({
      cfg,
      agentId: "main",
      taskId: resolved.task.taskId,
      kind: "lifecycle.end",
      stream: "lifecycle",
      phase: "end",
      sessionKey: "agent:main:main",
      runId: "run-3",
      summary: "Next steps:\n- Follow up on the browser flow",
      surface: { kind: "direct-chat", channel: "telegram" },
    });

    commitments = listCommitments({
      cfg,
      agentId: "main",
      taskId: resolved.task.taskId,
    });
    expect(commitments).toHaveLength(1);
    expect(commitments[0]?.status).toBe("open");

    expect(
      listTaskEvents({
        cfg,
        agentId: "main",
        taskId: resolved.task.taskId,
        limit: 20,
      })
        .filter((event) => event.kind.startsWith("commitment."))
        .map((event) => event.kind),
    ).toEqual(["commitment.reopened", "commitment.done", "commitment.opened"]);
  });

  it("cancels a single open commitment from an explicit user message", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-continuity-cancel-"));
    const cfg = makeConfig(tempDir);
    const resolved = resolveOrCreateTaskForInbound({
      cfg,
      agentId: "main",
      sessionKey: "agent:main:main",
      inboundText: "Handle the retry",
      surface: { kind: "direct-chat", channel: "telegram" },
    });

    appendTaskEvent({
      cfg,
      agentId: "main",
      taskId: resolved.task.taskId,
      kind: "lifecycle.end",
      stream: "lifecycle",
      phase: "end",
      sessionKey: "agent:main:main",
      runId: "run-cancel-open",
      summary: "TODO: Retry the canvas handoff",
      surface: { kind: "direct-chat", channel: "telegram" },
    });

    appendTaskEvent({
      cfg,
      agentId: "main",
      taskId: resolved.task.taskId,
      kind: "user-message",
      sessionKey: "agent:main:main",
      summary: "不用了，Retry the canvas handoff",
      surface: { kind: "direct-chat", channel: "telegram" },
    });

    const commitments = listCommitments({
      cfg,
      agentId: "main",
      taskId: resolved.task.taskId,
    });
    expect(commitments).toHaveLength(1);
    expect(commitments[0]?.status).toBe("cancelled");
    expect(
      listTaskEvents({
        cfg,
        agentId: "main",
        taskId: resolved.task.taskId,
        limit: 20,
      }).some((event) => event.kind === "commitment.cancelled"),
    ).toBe(true);
  });

  it("marks tasks as failed on lifecycle error and reopens them on the next inbound message", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-continuity-failed-"));
    const cfg = makeConfig(tempDir);
    const first = resolveOrCreateTaskForInbound({
      cfg,
      agentId: "main",
      sessionKey: "agent:main:main",
      inboundText: "Retry the deployment",
      surface: { kind: "direct-chat", channel: "telegram" },
    });

    appendTaskEvent({
      cfg,
      agentId: "main",
      taskId: first.task.taskId,
      kind: "lifecycle.error",
      stream: "lifecycle",
      phase: "error",
      sessionKey: "agent:main:main",
      summary: "deployment failed",
      surface: { kind: "direct-chat", channel: "telegram" },
    });

    expect(
      getTask({
        cfg,
        agentId: "main",
        taskId: first.task.taskId,
      })?.status,
    ).toBe("failed");

    const reopened = resolveOrCreateTaskForInbound({
      cfg,
      agentId: "main",
      sessionKey: "agent:main:main",
      sessionEntry: {
        sessionId: "session-retry",
        updatedAt: Date.now(),
        activeTaskId: first.task.taskId,
      },
      inboundText: "Try again and continue the same task",
      surface: { kind: "direct-chat", channel: "telegram" },
    });

    expect(reopened.task.taskId).toBe(first.task.taskId);
    expect(reopened.task.status).toBe("open");
    expect(reopened.reused).toBe(true);
  });

  it("does not reuse closed tasks for new inbound messages", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-continuity-closed-"));
    const cfg = makeConfig(tempDir);
    const first = resolveOrCreateTaskForInbound({
      cfg,
      agentId: "main",
      sessionKey: "agent:main:main",
      inboundText: "Close this task",
      surface: { kind: "direct-chat", channel: "telegram" },
    });

    const closed = updateTaskStatus({
      cfg,
      agentId: "main",
      taskId: first.task.taskId,
      status: "completed",
    });
    expect(closed?.status).toBe("completed");
    expect(closed?.closedAt).toBeTruthy();

    const next = resolveOrCreateTaskForInbound({
      cfg,
      agentId: "main",
      sessionKey: "agent:main:main",
      sessionEntry: {
        sessionId: "session-next",
        updatedAt: Date.now(),
        activeTaskId: first.task.taskId,
        lastTaskId: first.task.taskId,
      },
      inboundText: "Start a new task instead",
      surface: { kind: "direct-chat", channel: "telegram" },
    });

    expect(next.reused).toBe(false);
    expect(next.task.taskId).not.toBe(first.task.taskId);
  });

  it("patches task fields and records a task.updated event", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-continuity-task-patch-"));
    const cfg = makeConfig(tempDir);
    const task = resolveOrCreateTaskForInbound({
      cfg,
      agentId: "main",
      sessionKey: "agent:main:main",
      inboundText: "Original title",
      surface: { kind: "direct-chat", channel: "telegram" },
    }).task;

    const patched = patchTask({
      cfg,
      agentId: "main",
      taskId: task.taskId,
      status: "completed",
      title: "Patched title",
      summary: "Patched summary",
      latestSessionKey: "agent:main:telegram:dm:user-2",
    });

    expect(patched?.status).toBe("completed");
    expect(patched?.title).toBe("Patched title");
    expect(patched?.summary).toBe("Patched summary");
    expect(patched?.latestSessionKey).toBe("agent:main:telegram:dm:user-2");
    expect(
      listTaskEvents({
        cfg,
        agentId: "main",
        taskId: task.taskId,
        limit: 10,
      }).some((event) => event.kind === "task.updated"),
    ).toBe(true);
  });

  it("rejects illegal status transitions through task patches", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-continuity-task-patch-invalid-"));
    const cfg = makeConfig(tempDir);
    const task = resolveOrCreateTaskForInbound({
      cfg,
      agentId: "main",
      sessionKey: "agent:main:main",
      inboundText: "Patch the task",
      surface: { kind: "direct-chat", channel: "telegram" },
    }).task;

    updateTaskStatus({
      cfg,
      agentId: "main",
      taskId: task.taskId,
      status: "completed",
    });

    expect(
      patchTask({
        cfg,
        agentId: "main",
        taskId: task.taskId,
        status: "running",
      }),
    ).toBeNull();
  });

  it("patches commitments idempotently and emits lifecycle events", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-continuity-commitment-patch-"));
    const cfg = makeConfig(tempDir);
    const task = resolveOrCreateTaskForInbound({
      cfg,
      agentId: "main",
      sessionKey: "agent:main:main",
      inboundText: "Keep tracking the follow-up",
      surface: { kind: "direct-chat", channel: "telegram" },
    }).task;

    appendTaskEvent({
      cfg,
      agentId: "main",
      taskId: task.taskId,
      kind: "lifecycle.end",
      stream: "lifecycle",
      phase: "end",
      sessionKey: "agent:main:main",
      runId: "run-patch-1",
      summary: "Next steps:\n- Follow up with the user",
      surface: { kind: "direct-chat", channel: "telegram" },
    });

    const initialCommitment = listCommitments({
      cfg,
      agentId: "main",
      taskId: task.taskId,
    })[0];
    expect(initialCommitment).toBeTruthy();

    const cancelled = patchCommitment({
      cfg,
      agentId: "main",
      taskId: task.taskId,
      commitmentId: initialCommitment!.commitmentId,
      status: "cancelled",
      detail: "User asked to stop",
      sessionKey: "agent:main:main",
    });
    expect(cancelled?.status).toBe("cancelled");
    expect(cancelled?.detail).toBe("User asked to stop");

    const eventCountAfterFirstPatch = listTaskEvents({
      cfg,
      agentId: "main",
      taskId: task.taskId,
      limit: 20,
    }).filter((event) => event.kind === "commitment.cancelled").length;
    expect(eventCountAfterFirstPatch).toBe(1);

    const idempotent = patchCommitment({
      cfg,
      agentId: "main",
      taskId: task.taskId,
      commitmentId: initialCommitment!.commitmentId,
      status: "cancelled",
      detail: "User asked to stop",
    });
    expect(idempotent?.status).toBe("cancelled");

    const eventCountAfterSecondPatch = listTaskEvents({
      cfg,
      agentId: "main",
      taskId: task.taskId,
      limit: 20,
    }).filter((event) => event.kind === "commitment.cancelled").length;
    expect(eventCountAfterSecondPatch).toBe(1);

    const reopened = patchCommitment({
      cfg,
      agentId: "main",
      taskId: task.taskId,
      commitmentId: initialCommitment!.commitmentId,
      status: "open",
      detail: null,
    });
    expect(reopened?.status).toBe("open");
    expect(reopened?.detail).toBeUndefined();
    expect(
      listTaskEvents({
        cfg,
        agentId: "main",
        taskId: task.taskId,
        limit: 20,
      }).some((event) => event.kind === "commitment.reopened"),
    ).toBe(true);
  });

  it("records repair actions for orphan marking and relinking", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-continuity-repair-"));
    const cfg = makeConfig(tempDir);
    const logs: Array<Record<string, unknown>> = [];
    const unregister = registerLogTransport((record) => logs.push(record));

    try {
      const task = resolveOrCreateTaskForInbound({
        cfg,
        agentId: "main",
        sessionKey: "agent:main:telegram:dm:old-user",
        inboundText: "Repair this task",
        surface: { kind: "direct-chat", channel: "telegram" },
      }).task;

      const orphaned = repairMarkTaskOrphan({
        cfg,
        agentId: "main",
        taskId: task.taskId,
        detail: "lost its canonical session",
        surface: { kind: "control-ui", label: "workbench" },
      });
      expect(orphaned?.metadata?.continuityRepairState).toBe("orphan");

      const relinked = repairRelinkTaskToSession({
        cfg,
        agentId: "main",
        taskId: task.taskId,
        sessionKey: "agent:main:telegram:dm:new-user",
        detail: "restore the correct user thread",
        surface: { kind: "control-ui", label: "workbench" },
      });
      expect(relinked?.latestSessionKey).toBe("agent:main:telegram:dm:new-user");
      expect(relinked?.metadata?.continuityRepairState).toBeUndefined();

      appendTaskEvent({
        cfg,
        agentId: "main",
        taskId: task.taskId,
        kind: "lifecycle.end",
        stream: "lifecycle",
        phase: "end",
        sessionKey: "agent:main:telegram:dm:new-user",
        summary: "TODO: Follow up with the customer",
        surface: { kind: "direct-chat", channel: "telegram" },
      });
      const commitment = listCommitments({
        cfg,
        agentId: "main",
        taskId: task.taskId,
      })[0];
      expect(commitment).toBeTruthy();

      const orphanCommitment = repairMarkCommitmentOrphan({
        cfg,
        agentId: "main",
        taskId: task.taskId,
        commitmentId: commitment!.commitmentId,
        detail: "task split across duplicate records",
        surface: { kind: "control-ui", label: "workbench" },
      });
      expect(orphanCommitment?.metadata?.continuityRepairState).toBe("orphan");

      const repairs = getContinuityStore({ cfg, agentId: "main" }).listRepairs();
      expect(repairs.map((entry) => entry.kind)).toEqual(
        expect.arrayContaining(["task-marked-orphan", "task-relinked", "commitment-marked-orphan"]),
      );
      expect(
        listTaskEvents({
          cfg,
          agentId: "main",
          taskId: task.taskId,
          limit: 20,
        }).map((event) => event.kind),
      ).toEqual(
        expect.arrayContaining([
          "repair.task-marked-orphan",
          "repair.task-relinked",
          "repair.commitment-marked-orphan",
        ]),
      );
      expect(
        logs.filter(
          (record) =>
            (record["1"] as { event?: unknown } | undefined)?.event === "continuity.repair",
        ),
      ).toHaveLength(3);
    } finally {
      unregister();
    }
  });

  it("merges duplicate tasks and deduplicates commitments", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-continuity-repair-merge-"));
    const cfg = makeConfig(tempDir);

    const targetTask = resolveOrCreateTaskForInbound({
      cfg,
      agentId: "main",
      sessionKey: "agent:main:telegram:dm:alpha",
      inboundText: "Canonical task",
      surface: { kind: "direct-chat", channel: "telegram" },
    }).task;
    appendTaskEvent({
      cfg,
      agentId: "main",
      taskId: targetTask.taskId,
      kind: "lifecycle.end",
      stream: "lifecycle",
      phase: "end",
      sessionKey: "agent:main:telegram:dm:alpha",
      summary: "TODO: Follow up with the browser flow",
      surface: { kind: "direct-chat", channel: "telegram" },
    });

    const sourceTask = resolveOrCreateTaskForInbound({
      cfg,
      agentId: "main",
      sessionKey: "agent:main:telegram:dm:beta",
      inboundText: "Duplicate task",
      surface: { kind: "direct-chat", channel: "telegram" },
    }).task;
    appendTaskEvent({
      cfg,
      agentId: "main",
      taskId: sourceTask.taskId,
      kind: "lifecycle.end",
      stream: "lifecycle",
      phase: "end",
      sessionKey: "agent:main:telegram:dm:beta",
      summary: "TODO: Follow up with the browser flow",
      surface: { kind: "direct-chat", channel: "telegram" },
    });
    appendTaskEvent({
      cfg,
      agentId: "main",
      taskId: sourceTask.taskId,
      kind: "handoff.control-ui",
      sessionKey: "agent:main:telegram:dm:beta",
      summary: "Opened Control UI for duplicate task",
      surface: { kind: "control-ui" },
    });

    const result = repairMergeTasks({
      cfg,
      agentId: "main",
      sourceTaskId: sourceTask.taskId,
      targetTaskId: targetTask.taskId,
      detail: "dedupe duplicate tasks",
      surface: { kind: "control-ui", label: "workbench" },
    });

    expect(result?.deletedTaskId).toBe(sourceTask.taskId);
    expect(result?.mergedTaskId).toBe(targetTask.taskId);
    expect(result?.moved.dedupedCommitments).toBe(1);
    expect(
      getTask({
        cfg,
        agentId: "main",
        taskId: sourceTask.taskId,
      }),
    ).toBeNull();
    expect(
      listCommitments({
        cfg,
        agentId: "main",
        taskId: targetTask.taskId,
      }),
    ).toHaveLength(1);
    expect(
      listTaskEvents({
        cfg,
        agentId: "main",
        taskId: targetTask.taskId,
        limit: 30,
      }).some((event) => event.kind === "repair.tasks-merged"),
    ).toBe(true);
    expect(
      getContinuityStore({ cfg, agentId: "main" })
        .getTaskSessionLinks(targetTask.taskId)
        .map((link) => link.sessionKey),
    ).toEqual(
      expect.arrayContaining(["agent:main:telegram:dm:alpha", "agent:main:telegram:dm:beta"]),
    );
  });

  it("moves tasks into running when subagents or cron work starts", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-continuity-running-"));
    const cfg = makeConfig(tempDir);
    const task = resolveOrCreateTaskForInbound({
      cfg,
      agentId: "main",
      sessionKey: "agent:main:main",
      inboundText: "Watch background work",
      surface: { kind: "direct-chat", channel: "telegram" },
    }).task;

    appendTaskEvent({
      cfg,
      agentId: "main",
      taskId: task.taskId,
      kind: "subagent.started",
      sessionKey: "agent:main:main",
      summary: "subagent started",
      surface: { kind: "subagent", label: "worker" },
    });
    expect(
      getTask({
        cfg,
        agentId: "main",
        taskId: task.taskId,
      })?.status,
    ).toBe("running");

    appendTaskEvent({
      cfg,
      agentId: "main",
      taskId: task.taskId,
      kind: "cron-fired",
      sessionKey: "agent:main:main",
      summary: "cron fired",
      surface: { kind: "cron", label: "nightly" },
    });
    expect(
      getTask({
        cfg,
        agentId: "main",
        taskId: task.taskId,
      })?.status,
    ).toBe("running");
  });

  it("queries tasks with workbench filters and pagination", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-continuity-workbench-"));
    const cfg = makeConfig(tempDir);

    const workbenchTask = resolveOrCreateTaskForInbound({
      cfg,
      agentId: "main",
      sessionKey: "agent:main:telegram:dm:alpha",
      inboundText: "Ship the continuity workbench",
      surface: { kind: "direct-chat", channel: "telegram" },
    }).task;
    appendTaskEvent({
      cfg,
      agentId: "main",
      taskId: workbenchTask.taskId,
      kind: "lifecycle.end",
      stream: "lifecycle",
      phase: "end",
      sessionKey: "agent:main:telegram:dm:alpha",
      summary: "Wait for UI review",
      surface: { kind: "direct-chat", channel: "telegram" },
    });
    appendTaskEvent({
      cfg,
      agentId: "main",
      taskId: workbenchTask.taskId,
      kind: "handoff.control-ui",
      sessionKey: "agent:main:telegram:dm:alpha",
      summary: "Opened the task in Control UI",
      surface: { kind: "control-ui" },
      payload: { url: "https://control-ui.example.test/tasks" },
    });

    const discordTask = resolveOrCreateTaskForInbound({
      cfg,
      agentId: "main",
      sessionKey: "agent:main:discord:dm:beta",
      inboundText: "Investigate the discord route",
      surface: { kind: "direct-chat", channel: "discord" },
    }).task;
    appendTaskEvent({
      cfg,
      agentId: "main",
      taskId: discordTask.taskId,
      kind: "lifecycle.start",
      stream: "lifecycle",
      phase: "start",
      sessionKey: "agent:main:discord:dm:beta",
      summary: "Worker started",
      surface: { kind: "subagent", label: "relay-worker" },
    });

    const filtered = queryTasks({
      cfg,
      agentId: "main",
      status: "waiting-user",
      surfaceKind: "control-ui",
      channel: "telegram",
      query: "workbench",
    });
    expect(filtered.total).toBe(1);
    expect(filtered.tasks.map((task) => task.taskId)).toEqual([workbenchTask.taskId]);

    const paged = queryTasks({
      cfg,
      agentId: "main",
      sort: "created-asc",
      offset: 1,
      limit: 1,
    });
    expect(paged.total).toBe(2);
    expect(paged.tasks).toHaveLength(1);
    expect(paged.tasks[0]?.taskId).toBe(discordTask.taskId);
  });

  it("handles large continuity datasets with bounded query payloads", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-continuity-scale-"));
    const cfg = makeConfig(tempDir);
    const store = getContinuityStore({ cfg, agentId: "main" });
    const taskCount = 180;
    const eventsPerTask = 80;
    const commitmentsPerTask = 40;

    for (let taskIndex = 0; taskIndex < taskCount; taskIndex += 1) {
      const taskId = `task-scale-${taskIndex}`;
      const sessionKey = `agent:main:telegram:dm:user-${taskIndex}`;
      const timestampBase = taskIndex * 10_000;
      store.upsertTask({
        taskId,
        agentId: "main",
        status: taskIndex % 3 === 0 ? "waiting-user" : "running",
        title: `Load test task ${taskIndex}`,
        summary: "Stress continuity queries",
        currentSurface: { kind: "control-ui" },
        sourceSurface: { kind: "direct-chat", channel: "telegram" },
        latestSessionKey: sessionKey,
        createdAt: timestampBase,
        updatedAt: timestampBase + 1,
      });
      store.upsertTaskSessionLink({
        taskId,
        agentId: "main",
        sessionKey,
        relation: "linked",
        createdAt: timestampBase,
        updatedAt: timestampBase + 1,
      });

      for (let eventIndex = 0; eventIndex < eventsPerTask; eventIndex += 1) {
        store.appendTaskEvent({
          eventId: `${taskId}-event-${eventIndex}`,
          taskId,
          agentId: "main",
          kind: eventIndex % 5 === 0 ? "handoff.control-ui" : "lifecycle.end",
          sessionKey,
          summary: `Event ${eventIndex}`,
          surface: { kind: "control-ui" },
          createdAt: timestampBase + 100 + eventIndex,
        });
      }

      for (let commitmentIndex = 0; commitmentIndex < commitmentsPerTask; commitmentIndex += 1) {
        store.upsertCommitment({
          commitmentId: `${taskId}-commitment-${commitmentIndex}`,
          taskId,
          agentId: "main",
          status: commitmentIndex % 2 === 0 ? "open" : "done",
          title: `Commitment ${commitmentIndex}`,
          createdAt: timestampBase + 200 + commitmentIndex,
          updatedAt: timestampBase + 200 + commitmentIndex,
          closedAt: commitmentIndex % 2 === 0 ? undefined : timestampBase + 200 + commitmentIndex,
        });
      }
    }

    const hotTaskId = `task-scale-${taskCount - 1}`;
    const startedAt = performance.now();
    const tasksResult = queryTasks({
      cfg,
      agentId: "main",
      limit: 50,
      offset: 0,
      surfaceKind: "control-ui",
      channel: "telegram",
      query: "load test task",
      sort: "updated-desc",
    });
    const events = listTaskEvents({
      cfg,
      agentId: "main",
      taskId: hotTaskId,
      limit: 40,
    });
    const commitments = listCommitments({
      cfg,
      agentId: "main",
      taskId: hotTaskId,
      limit: 40,
    });
    const elapsedMs = performance.now() - startedAt;

    expect(tasksResult.total).toBe(taskCount);
    expect(tasksResult.tasks).toHaveLength(50);
    expect(events).toHaveLength(40);
    expect(commitments).toHaveLength(40);
    expect(elapsedMs).toBeLessThan(1500);
  });

  it("builds continuity summaries and emits structured lifecycle logs", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-continuity-observability-"));
    const cfg = makeConfig(tempDir);
    const logs: Array<Record<string, unknown>> = [];
    const unregister = registerLogTransport((record) => logs.push(record));
    const hasEvent = (event: string) =>
      logs.some((record) => (record["1"] as { event?: unknown } | undefined)?.event === event);

    try {
      const created = resolveOrCreateTaskForInbound({
        cfg,
        agentId: "main",
        sessionKey: "agent:main:main",
        inboundText: "Ship the continuity rail",
        surface: { kind: "direct-chat", channel: "telegram" },
      });
      resolveOrCreateTaskForInbound({
        cfg,
        agentId: "main",
        sessionKey: "agent:main:main",
        sessionEntry: {
          sessionId: "session-1",
          updatedAt: Date.now(),
          activeTaskId: created.task.taskId,
        },
        inboundText: "Keep the same task alive",
        surface: { kind: "direct-chat", channel: "telegram" },
      });

      appendTaskEvent({
        cfg,
        agentId: "main",
        taskId: created.task.taskId,
        kind: "lifecycle.end",
        stream: "lifecycle",
        phase: "end",
        sessionKey: "agent:main:main",
        runId: "run-observe-1",
        summary: "Next steps:\n- Follow up on the browser flow",
        surface: { kind: "direct-chat", channel: "telegram" },
      });
      appendTaskEvent({
        cfg,
        agentId: "main",
        taskId: created.task.taskId,
        kind: "handoff.control-ui",
        sessionKey: "agent:main:main",
        runId: "run-observe-1",
        summary: "Delivered Control UI handoff",
        surface: { kind: "control-ui" },
        payload: { url: "https://control-ui.example.test/app" },
      });

      const commitment = listCommitments({
        cfg,
        agentId: "main",
        taskId: created.task.taskId,
      })[0];
      if (!commitment) {
        throw new Error("Expected commitment to exist");
      }
      patchCommitment({
        cfg,
        agentId: "main",
        taskId: created.task.taskId,
        commitmentId: commitment.commitmentId,
        status: "done",
        sessionKey: "agent:main:main",
        surface: { kind: "control-ui" },
      });
      patchTask({
        cfg,
        agentId: "main",
        taskId: created.task.taskId,
        status: "completed",
        surface: { kind: "control-ui" },
      });

      const summary = buildContinuitySummary({
        cfg,
        agentIds: ["main"],
      });
      expect(summary.totals.taskLifecycle.createdSinceStart).toBe(1);
      expect(summary.totals.taskLifecycle.reusedSinceStart).toBe(1);
      expect(summary.totals.taskLifecycle.closedSinceStart).toBe(1);
      expect(summary.totals.commitments.byStatus.done).toBe(1);
      expect(summary.totals.commitments.events.opened).toBe(1);
      expect(summary.totals.commitments.events.done).toBe(1);
      expect(summary.totals.handoffs.succeeded).toBe(1);

      expect(hasEvent("task.created")).toBe(true);
      expect(hasEvent("task.reused")).toBe(true);
      expect(hasEvent("commitment.done")).toBe(true);
      expect(hasEvent("task.closed")).toBe(true);
    } finally {
      unregister();
    }
  });

  it("detects stale running and waiting-user tasks", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-continuity-stale-"));
    const cfg = makeConfig(tempDir);
    const nowSpy = vi.spyOn(Date, "now");
    const logs: Array<Record<string, unknown>> = [];
    const unregister = registerLogTransport((record) => logs.push(record));
    const staleEvents = () =>
      logs.filter(
        (record) =>
          (record["1"] as { event?: unknown } | undefined)?.event === "continuity.stale-detected",
      );

    try {
      nowSpy.mockReturnValue(1_000);
      const runningTask = resolveOrCreateTaskForInbound({
        cfg,
        agentId: "main",
        sessionKey: "agent:main:main",
        inboundText: "Watch the worker",
        surface: { kind: "direct-chat", channel: "telegram" },
      }).task;
      appendTaskEvent({
        cfg,
        agentId: "main",
        taskId: runningTask.taskId,
        kind: "lifecycle.start",
        stream: "lifecycle",
        phase: "start",
        sessionKey: "agent:main:main",
        summary: "worker started",
        surface: { kind: "subagent", label: "worker" },
      });

      nowSpy.mockReturnValue(2_000);
      const waitingTask = resolveOrCreateTaskForInbound({
        cfg,
        agentId: "main",
        sessionKey: "agent:main:telegram:dm:user-2",
        inboundText: "Wait for the next reply",
        surface: { kind: "direct-chat", channel: "telegram" },
      }).task;
      appendTaskEvent({
        cfg,
        agentId: "main",
        taskId: waitingTask.taskId,
        kind: "lifecycle.end",
        stream: "lifecycle",
        phase: "end",
        sessionKey: "agent:main:telegram:dm:user-2",
        summary: "Waiting for user input",
        surface: { kind: "direct-chat", channel: "telegram" },
      });

      const summary = buildContinuitySummary({
        cfg,
        agentIds: ["main"],
        nowMs: 10_000,
        staleRunningMs: 5_000,
        staleWaitingUserMs: 5_000,
      });
      expect(summary.totals.tasks.staleRunning).toBe(1);
      expect(summary.totals.tasks.staleWaitingUser).toBe(1);
      expect(summary.byAgent[0]?.staleTasks.running[0]?.taskId).toBe(runningTask.taskId);
      expect(summary.byAgent[0]?.staleTasks.waitingUser[0]?.taskId).toBe(waitingTask.taskId);

      logStaleContinuityTasks(summary);
      logStaleContinuityTasks(summary);
      expect(staleEvents()).toHaveLength(1);
    } finally {
      nowSpy.mockRestore();
      unregister();
    }
  });
});
