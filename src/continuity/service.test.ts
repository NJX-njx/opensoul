import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import type { OpenSoulConfig } from "../config/config.js";
import { saveSessionStore } from "../config/sessions.js";
import {
  appendTaskEvent,
  getTask,
  resolveOrCreateTaskForInbound,
  setSessionActiveTask,
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
});
