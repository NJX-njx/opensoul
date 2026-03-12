import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import type { OpenSoulConfig } from "../config/config.js";
import {
  clearSessionStoreCacheForTest,
  loadSessionStore,
  saveSessionStore,
} from "../config/sessions.js";
import { requireNodeSqlite } from "../memory/sqlite.js";
import { resolveContinuityDbPath } from "./paths.js";
import { recoverContinuityForAgent } from "./recovery.js";
import {
  appendTaskEvent,
  listCommitments,
  listTaskEvents,
  resolveOrCreateTaskForInbound,
  updateTaskStatus,
} from "./service.js";
import { openContinuityStore, resetContinuityStoreCacheForTest } from "./store.js";

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

describe("continuity recovery", () => {
  let tempDir: string | null = null;

  afterEach(async () => {
    clearSessionStoreCacheForTest();
    resetContinuityStoreCacheForTest();
    if (tempDir) {
      await fs.rm(tempDir, { recursive: true, force: true });
      tempDir = null;
    }
  });

  it("marks interrupted running tasks as failed and repairs latest session links", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-continuity-recovery-running-"));
    const cfg = makeConfig(tempDir);
    const sessionKey = "agent:main:telegram:dm:user-1";
    const storePath = cfg.session?.store as string;
    await saveSessionStore(storePath, {
      [sessionKey]: {
        sessionId: "session-1",
        updatedAt: 1,
        activeTaskId: "task-1",
        lastTaskId: "task-1",
      },
    });

    const store = openContinuityStore(resolveContinuityDbPath(cfg, "main"));
    store.upsertTask({
      taskId: "task-1",
      agentId: "main",
      status: "running",
      title: "Interrupted task",
      latestSessionKey: "agent:main:old-session",
      createdAt: 1,
      updatedAt: 1,
    });

    const report = await recoverContinuityForAgent({
      cfg,
      agentId: "main",
    });

    const recoveredTask = openContinuityStore(resolveContinuityDbPath(cfg, "main")).getTask(
      "task-1",
    );
    expect(recoveredTask?.status).toBe("failed");
    expect(recoveredTask?.latestSessionKey).toBe(sessionKey);
    expect(report.interruptedRuns).toBe(1);
    expect(report.linksUpdated).toBeGreaterThanOrEqual(1);
    expect(
      openContinuityStore(resolveContinuityDbPath(cfg, "main"))
        .getTaskSessionLinks("task-1")
        .some((link) => link.sessionKey === sessionKey && link.relation === "active"),
    ).toBe(true);
    expect(
      listTaskEvents({
        cfg,
        agentId: "main",
        taskId: "task-1",
        limit: 20,
      }).some((event) => event.kind === "recovery.restart-interrupted"),
    ).toBe(true);
    expect(loadSessionStore(storePath, { skipCache: true })[sessionKey]?.activeTaskId).toBe(
      "task-1",
    );
  });

  it("clears dangling session task references when the continuity db is missing", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-continuity-recovery-missing-"));
    const cfg = makeConfig(tempDir);
    const sessionKey = "agent:main:telegram:dm:user-2";
    const storePath = cfg.session?.store as string;
    await saveSessionStore(storePath, {
      [sessionKey]: {
        sessionId: "session-2",
        updatedAt: 1,
        activeTaskId: "missing-task",
        lastTaskId: "missing-task",
      },
    });

    const report = await recoverContinuityForAgent({
      cfg,
      agentId: "main",
    });

    const recoveredStore = loadSessionStore(storePath, { skipCache: true });
    expect(recoveredStore[sessionKey]?.activeTaskId).toBeUndefined();
    expect(recoveredStore[sessionKey]?.lastTaskId).toBeUndefined();
    expect(report.sessionsUpdated).toBe(1);
    expect(report.issues.some((issue) => issue.includes("session-active-task-cleared"))).toBe(true);
  });

  it("cancels open commitments left behind on a closed task", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-continuity-recovery-closed-"));
    const cfg = makeConfig(tempDir);
    const sessionKey = "agent:main:telegram:dm:user-3";
    const task = resolveOrCreateTaskForInbound({
      cfg,
      agentId: "main",
      sessionKey,
      inboundText: "Close this task cleanly",
      surface: { kind: "direct-chat", channel: "telegram" },
    }).task;
    await saveSessionStore(cfg.session?.store as string, {
      [sessionKey]: {
        sessionId: "session-3",
        updatedAt: 1,
        lastTaskId: task.taskId,
      },
    });
    appendTaskEvent({
      cfg,
      agentId: "main",
      taskId: task.taskId,
      kind: "lifecycle.end",
      stream: "lifecycle",
      phase: "end",
      sessionKey,
      runId: "run-closed-1",
      summary: "TODO: Follow up on the browser flow",
      surface: { kind: "direct-chat", channel: "telegram" },
    });
    updateTaskStatus({
      cfg,
      agentId: "main",
      taskId: task.taskId,
      status: "completed",
    });

    const report = await recoverContinuityForAgent({
      cfg,
      agentId: "main",
    });

    expect(report.commitmentsCancelled).toBe(1);
    expect(
      listCommitments({
        cfg,
        agentId: "main",
        taskId: task.taskId,
      })[0]?.status,
    ).toBe("cancelled");
    expect(
      listTaskEvents({
        cfg,
        agentId: "main",
        taskId: task.taskId,
        limit: 20,
      }).some((event) => event.kind === "commitment.cancelled"),
    ).toBe(true);
  });

  it("skips repair when the continuity schema is ahead of the runtime", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-continuity-recovery-ahead-"));
    const cfg = makeConfig(tempDir);
    const dbPath = resolveContinuityDbPath(cfg, "main");
    await fs.mkdir(path.dirname(dbPath), { recursive: true });
    const sqlite = requireNodeSqlite();
    const db = new sqlite.DatabaseSync(dbPath);
    db.exec(`
      CREATE TABLE continuity_meta (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );
      CREATE TABLE tasks (
        task_id TEXT PRIMARY KEY,
        agent_id TEXT NOT NULL,
        status TEXT NOT NULL,
        title TEXT,
        summary TEXT,
        source_surface_json TEXT,
        current_surface_json TEXT,
        latest_session_key TEXT,
        latest_run_id TEXT,
        metadata_json TEXT,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        closed_at INTEGER
      );
    `);
    db.prepare(`INSERT INTO continuity_meta (key, value) VALUES (?, ?)`).run(
      "schema_version",
      "999",
    );
    db.prepare(
      `INSERT INTO tasks (
         task_id, agent_id, status, title, created_at, updated_at
       ) VALUES (?, ?, ?, ?, ?, ?)`,
    ).run("task-ahead", "main", "running", "Ahead task", 1, 1);
    db.close();

    const report = await recoverContinuityForAgent({
      cfg,
      agentId: "main",
    });

    expect(report.aheadOfRuntimeSchema).toBe(true);
    expect(
      report.issues.some((issue) => issue.includes("continuity-schema-ahead-of-runtime")),
    ).toBe(true);
    expect(openContinuityStore(dbPath).getTask("task-ahead")?.status).toBe("running");
  });
});
