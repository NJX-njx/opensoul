import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import type { OpenSoulConfig } from "../config/config.js";
import { requireNodeSqlite } from "../memory/sqlite.js";
import { resolveContinuityDbPath } from "./paths.js";
import { CONTINUITY_SCHEMA_VERSION } from "./schema.js";
import { openContinuityStore, resetContinuityStoreCacheForTest } from "./store.js";

describe("continuity store", () => {
  let tempDir: string | null = null;

  afterEach(async () => {
    resetContinuityStoreCacheForTest();
    if (tempDir) {
      await fs.rm(tempDir, { recursive: true, force: true });
      tempDir = null;
    }
  });

  it("initializes schema and supports task CRUD", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-continuity-store-"));
    const dbPath = path.join(tempDir, "continuity.sqlite");
    const store = openContinuityStore(dbPath);

    store.upsertTask({
      taskId: "task-1",
      agentId: "main",
      status: "open",
      title: "Ship continuity",
      summary: "Initial task",
      createdAt: 1,
      updatedAt: 1,
    });
    store.upsertTaskSessionLink({
      taskId: "task-1",
      agentId: "main",
      sessionKey: "agent:main:main",
      relation: "active",
      createdAt: 1,
      updatedAt: 1,
    });
    store.appendTaskEvent({
      eventId: "evt-1",
      taskId: "task-1",
      agentId: "main",
      kind: "user-message",
      summary: "please continue",
      createdAt: 2,
    });

    const task = store.getTask("task-1");
    expect(task?.title).toBe("Ship continuity");
    expect(store.listTasks({ sessionKey: "agent:main:main" })).toHaveLength(1);
    expect(store.getLatestLinkedTask("agent:main:main")?.taskId).toBe("task-1");
    expect(store.listTaskEvents({ taskId: "task-1" })).toHaveLength(1);
  });

  it("keeps per-agent paths isolated", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-continuity-paths-"));
    const cfg = {
      agents: {
        list: [
          {
            id: "main",
            agentDir: path.join(tempDir, "agents", "main", "agent"),
          },
        ],
      },
    } as OpenSoulConfig;

    expect(resolveContinuityDbPath(cfg, "main")).toBe(
      path.join(tempDir, "agents", "main", "continuity.sqlite"),
    );
  });

  it("records schema version and repair entries", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-continuity-schema-"));
    const dbPath = path.join(tempDir, "continuity.sqlite");
    const store = openContinuityStore(dbPath);

    expect(store.readMeta("schema_version")).toBe(String(CONTINUITY_SCHEMA_VERSION));
    store.appendRepair({
      repairId: "repair-1",
      agentId: "main",
      kind: "test-repair",
      detail: "repair detail",
      createdAt: 1,
    });

    expect(store.listRepairs()).toHaveLength(1);
    expect(store.listRepairs()[0]?.kind).toBe("test-repair");
  });

  it("exports and imports a continuity snapshot round-trip", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-continuity-export-"));
    const sourcePath = path.join(tempDir, "source.sqlite");
    const restoredPath = path.join(tempDir, "restored.sqlite");
    const source = openContinuityStore(sourcePath);

    source.upsertTask({
      taskId: "task-export",
      agentId: "main",
      status: "completed",
      title: "Export me",
      summary: "Round-trip test",
      latestSessionKey: "agent:main:export",
      createdAt: 10,
      updatedAt: 20,
      closedAt: 20,
    });
    source.upsertTaskSessionLink({
      taskId: "task-export",
      agentId: "main",
      sessionKey: "agent:main:export",
      relation: "linked",
      createdAt: 10,
      updatedAt: 20,
    });
    source.appendTaskEvent({
      eventId: "evt-export",
      taskId: "task-export",
      agentId: "main",
      kind: "handoff.control-ui",
      summary: "opened workbench",
      createdAt: 21,
    });
    source.upsertCommitment({
      commitmentId: "commit-export",
      taskId: "task-export",
      agentId: "main",
      status: "done",
      title: "Follow up",
      createdAt: 12,
      updatedAt: 22,
      closedAt: 22,
    });
    source.appendRepair({
      repairId: "repair-export",
      agentId: "main",
      taskId: "task-export",
      kind: "manual-check",
      detail: "round-trip",
      createdAt: 23,
    });

    const snapshot = source.exportSnapshot(100);
    const restored = openContinuityStore(restoredPath);
    const result = restored.importSnapshot(snapshot);

    expect(result.imported).toEqual({
      tasks: 1,
      taskSessionLinks: 1,
      events: 1,
      commitments: 1,
      repairs: 1,
      metaEntries: 0,
    });
    expect(restored.getTask("task-export")).toMatchObject({
      title: "Export me",
      status: "completed",
      latestSessionKey: "agent:main:export",
    });
    expect(restored.getTaskSessionLinks("task-export")).toHaveLength(1);
    expect(restored.listTaskEvents({ taskId: "task-export" })).toHaveLength(1);
    expect(restored.listCommitments({ taskId: "task-export" })).toHaveLength(1);
    expect(restored.listRepairs()).toHaveLength(1);
  });

  it("migrates an older schema version in place", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-continuity-migrate-"));
    const dbPath = path.join(tempDir, "continuity.sqlite");
    const sqlite = requireNodeSqlite();
    const db = new sqlite.DatabaseSync(dbPath);
    db.exec(`
      CREATE TABLE continuity_meta (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );
    `);
    db.prepare(
      `INSERT INTO continuity_meta (key, value)
       VALUES (?, ?)`,
    ).run("schema_version", "1");
    db.close();

    const store = openContinuityStore(dbPath);
    expect(store.schemaState.migratedFrom).toBe(1);
    expect(store.readMeta("schema_version")).toBe(String(CONTINUITY_SCHEMA_VERSION));
    expect(store.listRepairs()).toEqual([]);
  });

  it("does not downgrade stronger session link relations back to linked", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-continuity-links-"));
    const dbPath = path.join(tempDir, "continuity.sqlite");
    const store = openContinuityStore(dbPath);

    store.upsertTask({
      taskId: "task-2",
      agentId: "main",
      status: "open",
      createdAt: 1,
      updatedAt: 1,
    });
    store.upsertTaskSessionLink({
      taskId: "task-2",
      agentId: "main",
      sessionKey: "agent:main:main",
      relation: "active",
      createdAt: 1,
      updatedAt: 1,
    });
    store.upsertTaskSessionLink({
      taskId: "task-2",
      agentId: "main",
      sessionKey: "agent:main:main",
      relation: "linked",
      createdAt: 1,
      updatedAt: 2,
    });

    expect(store.getTaskSessionLinks("task-2")[0]?.relation).toBe("active");
  });

  it("prunes archived continuity data while keeping active tasks queryable", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-continuity-prune-"));
    const dbPath = path.join(tempDir, "continuity.sqlite");
    const store = openContinuityStore(dbPath);

    store.upsertTask({
      taskId: "task-archived",
      agentId: "main",
      status: "completed",
      title: "Archived task",
      createdAt: 1,
      updatedAt: 10,
      closedAt: 10,
    });
    store.upsertTaskSessionLink({
      taskId: "task-archived",
      agentId: "main",
      sessionKey: "agent:main:archived",
      relation: "linked",
      createdAt: 1,
      updatedAt: 10,
    });
    store.appendTaskEvent({
      eventId: "evt-archived",
      taskId: "task-archived",
      agentId: "main",
      kind: "lifecycle.end",
      createdAt: 10,
    });
    store.upsertCommitment({
      commitmentId: "commit-archived",
      taskId: "task-archived",
      agentId: "main",
      status: "done",
      title: "Archived commitment",
      createdAt: 5,
      updatedAt: 10,
      closedAt: 10,
    });

    store.upsertTask({
      taskId: "task-active",
      agentId: "main",
      status: "running",
      title: "Active task",
      createdAt: 1,
      updatedAt: 100,
    });
    store.upsertTaskSessionLink({
      taskId: "task-active",
      agentId: "main",
      sessionKey: "agent:main:active",
      relation: "active",
      createdAt: 1,
      updatedAt: 100,
    });
    store.appendTaskEvent({
      eventId: "evt-open-old",
      taskId: "task-active",
      agentId: "main",
      kind: "assistant-message",
      createdAt: 20,
    });
    store.appendTaskEvent({
      eventId: "evt-open-new",
      taskId: "task-active",
      agentId: "main",
      kind: "assistant-message",
      createdAt: 100,
    });
    store.upsertCommitment({
      commitmentId: "commit-open-old",
      taskId: "task-active",
      agentId: "main",
      status: "done",
      title: "Closed on active task",
      createdAt: 20,
      updatedAt: 20,
      closedAt: 20,
    });
    store.upsertCommitment({
      commitmentId: "commit-open-live",
      taskId: "task-active",
      agentId: "main",
      status: "open",
      title: "Still live",
      createdAt: 80,
      updatedAt: 100,
    });
    store.appendRepair({
      repairId: "repair-old",
      agentId: "main",
      kind: "cleanup",
      createdAt: 20,
    });

    const result = store.prune({
      taskClosedBefore: 50,
      eventBefore: 50,
      closedCommitmentBefore: 50,
      repairBefore: 50,
    });

    expect(result.deleted).toEqual({
      tasks: 1,
      taskSessionLinks: 1,
      events: 2,
      commitments: 2,
      repairs: 1,
    });
    expect(store.getTask("task-archived")).toBeNull();
    expect(store.listTasks({ sessionKey: "agent:main:archived" })).toEqual([]);
    expect(store.getTask("task-active")?.status).toBe("running");
    expect(store.listTaskEvents({ taskId: "task-active" }).map((event) => event.eventId)).toEqual([
      "evt-open-new",
    ]);
    expect(
      store.listCommitments({ taskId: "task-active" }).map((commitment) => commitment.commitmentId),
    ).toEqual(["commit-open-live"]);
    expect(store.listRepairs()).toEqual([]);
  });
});
