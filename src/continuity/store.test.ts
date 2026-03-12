import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import type { OpenSoulConfig } from "../config/config.js";
import { resolveContinuityDbPath } from "./paths.js";
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
});
