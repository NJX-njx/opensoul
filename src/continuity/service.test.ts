import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import type { OpenSoulConfig } from "../config/config.js";
import { saveSessionStore } from "../config/sessions.js";
import {
  appendTaskEvent,
  getTask,
  listCommitments,
  listTaskEvents,
  patchCommitment,
  patchTask,
  resolveOrCreateTaskForInbound,
  setSessionActiveTask,
  updateTaskStatus,
} from "./service.js";
import { resetContinuityStoreCacheForTest } from "./store.js";

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
});
