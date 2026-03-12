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
});
