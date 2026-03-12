import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import type { OpenSoulConfig } from "../../config/config.js";
import { getTask, listTaskEvents } from "../../continuity/service.js";
import { resetContinuityStoreCacheForTest } from "../../continuity/store.js";
import { initSessionState } from "./session.js";

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

describe("initSessionState continuity", () => {
  let tempDir: string | null = null;

  afterEach(async () => {
    resetContinuityStoreCacheForTest();
    if (tempDir) {
      await fs.rm(tempDir, { recursive: true, force: true });
      tempDir = null;
    }
  });

  it("creates and reuses a task for the same direct session", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-session-continuity-"));
    const cfg = makeConfig(tempDir);
    const sessionKey = "agent:main:telegram:dm:user-1";

    const first = await initSessionState({
      ctx: {
        Body: "Help me plan a release",
        SessionKey: sessionKey,
        OriginatingChannel: "telegram",
      },
      cfg,
      commandAuthorized: true,
    });

    const second = await initSessionState({
      ctx: {
        Body: "Continue the same task",
        SessionKey: sessionKey,
        OriginatingChannel: "telegram",
      },
      cfg,
      commandAuthorized: true,
    });

    expect(first.sessionEntry.activeTaskId).toBeTruthy();
    expect(second.sessionEntry.activeTaskId).toBe(first.sessionEntry.activeTaskId);

    const taskId = second.sessionEntry.activeTaskId;
    if (!taskId) {
      throw new Error("Missing continuity task");
    }
    expect(
      getTask({
        cfg,
        agentId: "main",
        taskId,
      })?.currentSurface?.kind,
    ).toBe("direct-chat");
    expect(
      listTaskEvents({
        cfg,
        agentId: "main",
        taskId,
        limit: 10,
      }).filter((event) => event.kind === "user-message"),
    ).toHaveLength(2);
  });
});
