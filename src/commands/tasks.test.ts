import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { OpenSoulConfig } from "../config/config.js";
import { getContinuityStore, resetContinuityStoreCacheForTest } from "../continuity/store.js";

const mocks = vi.hoisted(() => ({
  config: {} as OpenSoulConfig,
}));

vi.mock("../config/config.js", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../config/config.js")>();
  return {
    ...actual,
    loadConfig: () => mocks.config,
  };
});

import { tasksExportCommand, tasksImportCommand, tasksPruneCommand } from "./tasks.js";

function createRuntime() {
  const logs: Array<string> = [];
  return {
    runtime: {
      log: (message: unknown) => logs.push(String(message)),
      error: (message: unknown) => {
        throw new Error(String(message));
      },
      exit: (code: number) => {
        throw new Error(`exit ${code}`);
      },
    },
    logs,
  } as const;
}

function createConfig(rootDir: string): OpenSoulConfig {
  return {
    agents: {
      list: [
        {
          id: "main",
          default: true,
          agentDir: path.join(rootDir, "agents", "main", "agent"),
        },
      ],
    },
  } as OpenSoulConfig;
}

describe("tasks commands", () => {
  let tempDir: string | null = null;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-12T00:00:00Z"));
  });

  afterEach(async () => {
    vi.useRealTimers();
    resetContinuityStoreCacheForTest();
    if (tempDir) {
      await fs.rm(tempDir, { recursive: true, force: true });
      tempDir = null;
    }
  });

  it("exports and imports continuity snapshots through the CLI commands", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-tasks-command-"));
    const sourceDir = path.join(tempDir, "source");
    const restoredDir = path.join(tempDir, "restored");
    const exportPath = path.join(tempDir, "snapshot.json");

    mocks.config = createConfig(sourceDir);
    const sourceStore = getContinuityStore({ cfg: mocks.config, agentId: "main" });
    sourceStore.upsertTask({
      taskId: "task-cli",
      agentId: "main",
      status: "completed",
      title: "CLI export",
      createdAt: 1,
      updatedAt: 2,
      closedAt: 2,
    });
    sourceStore.upsertTaskSessionLink({
      taskId: "task-cli",
      agentId: "main",
      sessionKey: "agent:main:cli",
      relation: "linked",
      createdAt: 1,
      updatedAt: 2,
    });
    sourceStore.appendTaskEvent({
      eventId: "evt-cli",
      taskId: "task-cli",
      agentId: "main",
      kind: "handoff.control-ui",
      createdAt: 3,
    });

    const exportRuntime = createRuntime();
    await tasksExportCommand(
      {
        agentId: "main",
        out: exportPath,
        json: true,
      },
      exportRuntime.runtime,
    );
    const exportSummary = JSON.parse(exportRuntime.logs[0] ?? "{}") as {
      counts?: { tasks?: number; events?: number };
    };
    expect(exportSummary.counts).toMatchObject({
      tasks: 1,
      events: 1,
    });

    mocks.config = createConfig(restoredDir);
    const importRuntime = createRuntime();
    await tasksImportCommand(
      {
        agentId: "main",
        input: exportPath,
        json: true,
      },
      importRuntime.runtime,
    );
    const restoredStore = getContinuityStore({ cfg: mocks.config, agentId: "main" });
    expect(restoredStore.getTask("task-cli")?.title).toBe("CLI export");
    expect(restoredStore.listTaskEvents({ taskId: "task-cli" })).toHaveLength(1);
  });

  it("backs up and prunes archived continuity data through the CLI command", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-tasks-prune-"));
    const backupPath = path.join(tempDir, "backup.json");

    mocks.config = createConfig(tempDir);
    const store = getContinuityStore({ cfg: mocks.config, agentId: "main" });
    const twoDaysAgo = Date.now() - 2 * 24 * 60 * 60 * 1000;
    const now = Date.now();

    store.upsertTask({
      taskId: "task-old",
      agentId: "main",
      status: "completed",
      title: "Old task",
      createdAt: twoDaysAgo,
      updatedAt: twoDaysAgo,
      closedAt: twoDaysAgo,
    });
    store.upsertTaskSessionLink({
      taskId: "task-old",
      agentId: "main",
      sessionKey: "agent:main:old",
      relation: "linked",
      createdAt: twoDaysAgo,
      updatedAt: twoDaysAgo,
    });
    store.appendTaskEvent({
      eventId: "evt-old",
      taskId: "task-old",
      agentId: "main",
      kind: "lifecycle.end",
      createdAt: twoDaysAgo,
    });
    store.upsertTask({
      taskId: "task-live",
      agentId: "main",
      status: "running",
      title: "Live task",
      createdAt: now,
      updatedAt: now,
    });

    const runtime = createRuntime();
    await tasksPruneCommand(
      {
        agentId: "main",
        closedTasksDays: 1,
        out: backupPath,
        json: true,
      },
      runtime.runtime,
    );

    const pruneSummary = JSON.parse(runtime.logs[0] ?? "{}") as {
      backupPath?: string;
      result?: { deleted?: { tasks?: number } };
    };
    expect(pruneSummary.backupPath).toBe(path.resolve(backupPath));
    expect(pruneSummary.result?.deleted?.tasks).toBe(1);
    expect(await fs.readFile(backupPath, "utf8")).toContain('"task-old"');
    expect(store.getTask("task-old")).toBeNull();
    expect(store.getTask("task-live")?.status).toBe("running");
  });
});
