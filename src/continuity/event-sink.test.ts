import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { OpenSoulConfig } from "../config/config.js";
import {
  emitAgentEvent,
  registerAgentRunContext,
  resetAgentRunContextForTest,
} from "../infra/agent-events.js";
import { ensureContinuityEventSinkStarted, resetContinuityEventSinkForTest } from "./event-sink.js";
import { listCommitments, listTaskEvents, resolveOrCreateTaskForInbound } from "./service.js";
import { resetContinuityStoreCacheForTest } from "./store.js";

let activeConfig: OpenSoulConfig | undefined;

vi.mock("../config/config.js", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../config/config.js")>();
  return {
    ...actual,
    loadConfig: () => activeConfig ?? actual.loadConfig(),
  };
});

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

describe("continuity event sink commitments", () => {
  let tempDir: string | null = null;

  afterEach(async () => {
    activeConfig = undefined;
    resetContinuityEventSinkForTest();
    resetAgentRunContextForTest();
    resetContinuityStoreCacheForTest();
    if (tempDir) {
      await fs.rm(tempDir, { recursive: true, force: true });
      tempDir = null;
    }
  });

  it("creates commitments from assistant output when a run ends", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-continuity-event-sink-"));
    const cfg = makeConfig(tempDir);
    activeConfig = cfg;
    const sessionKey = "agent:main:telegram:dm:user-1";
    const resolvedTask = resolveOrCreateTaskForInbound({
      cfg,
      agentId: "main",
      sessionKey,
      inboundText: "Track the browser flow",
      surface: { kind: "direct-chat", channel: "telegram" },
    });

    ensureContinuityEventSinkStarted();
    registerAgentRunContext("run-commitment-1", {
      sessionKey,
      taskId: resolvedTask.task.taskId,
      sourceSurface: "direct-chat",
      handoffEligible: false,
    });

    emitAgentEvent({
      runId: "run-commitment-1",
      stream: "assistant",
      data: {
        text: "Next steps:\n- Follow up on the browser flow",
      },
    });
    emitAgentEvent({
      runId: "run-commitment-1",
      stream: "lifecycle",
      data: {
        phase: "end",
      },
    });

    const commitments = listCommitments({
      cfg,
      agentId: "main",
      taskId: resolvedTask.task.taskId,
    });
    expect(commitments).toHaveLength(1);
    expect(commitments[0]?.status).toBe("open");
    expect(commitments[0]?.title).toBe("Follow up on the browser flow");
    expect(
      listTaskEvents({
        cfg,
        agentId: "main",
        taskId: resolvedTask.task.taskId,
        limit: 20,
      }).some((event) => event.kind === "commitment.opened"),
    ).toBe(true);
  });
});
