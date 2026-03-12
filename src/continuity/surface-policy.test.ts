import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { OpenSoulConfig } from "../config/config.js";
import type { SessionEntry } from "../config/sessions/types.js";
import { appendTaskEvent, resolveOrCreateTaskForInbound } from "./service.js";
import { resetContinuityStoreCacheForTest } from "./store.js";
import { evaluateSurfacePolicy } from "./surface-policy.js";

let activeSessionEntry: SessionEntry | undefined;

const resolveCanvasCapableNodeIdMock = vi.fn();

vi.mock("../gateway/session-utils.js", () => ({
  loadSessionEntry: () => ({
    entry: activeSessionEntry,
  }),
}));

vi.mock("./handoff.js", () => ({
  buildControlUiDeepLink: () => "https://control-ui.example.test/app",
  resolveCanvasCapableNodeId: (...args: Array<unknown>) => resolveCanvasCapableNodeIdMock(...args),
}));

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

function makeRunContext(taskId: string, sessionKey: string) {
  return {
    taskId,
    sessionKey,
    sourceSurface: "direct-chat",
    handoffEligible: true,
  };
}

describe("continuity surface policy", () => {
  let tempDir: string | null = null;

  afterEach(async () => {
    vi.restoreAllMocks();
    resolveCanvasCapableNodeIdMock.mockReset();
    activeSessionEntry = undefined;
    resetContinuityStoreCacheForTest();
    if (tempDir) {
      await fs.rm(tempDir, { recursive: true, force: true });
      tempDir = null;
    }
  });

  it("preserves alpha defaults when continuity policy config is missing", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-surface-policy-defaults-"));
    const cfg = makeConfig(tempDir);
    const sessionKey = "agent:main:telegram:dm:user-1";
    activeSessionEntry = {
      sessionId: "session-1",
      updatedAt: Date.now(),
      chatType: "direct",
      lastChannel: "telegram",
    };
    resolveCanvasCapableNodeIdMock.mockResolvedValue("node-1");

    const task = resolveOrCreateTaskForInbound({
      cfg,
      agentId: "main",
      sessionKey,
      inboundText: "Continue this browser-heavy task",
      surface: { kind: "direct-chat", channel: "telegram" },
    }).task;

    const decision = await evaluateSurfacePolicy({
      cfg,
      agentId: "main",
      task,
      sessionKey,
      runContext: makeRunContext(task.taskId, sessionKey),
      stats: {
        taskId: task.taskId,
        runId: "run-default-1",
        toolEventCount: 1,
        usedSubagent: false,
        assistantChars: 900,
      },
    });

    expect(decision).toMatchObject({
      mode: "control-ui+canvas",
      controlUiUrl: "https://control-ui.example.test/app",
      canvasNodeId: "node-1",
      complexitySignals: ["assistant-long"],
      policyMatch: {
        source: "default",
      },
    });
  });

  it("uses the first matching rule to override surfaces and thresholds", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-surface-policy-rules-"));
    const cfg = {
      ...makeConfig(tempDir),
      gateway: {
        controlUi: {
          continuity: {
            policy: {
              defaultMode: "control-ui+canvas",
              rules: [
                {
                  id: "telegram-work-dm",
                  agents: ["main"],
                  channels: ["telegram"],
                  chatTypes: ["direct"],
                  accountIds: ["work"],
                  disabledSurfaces: ["canvas"],
                  thresholds: {
                    assistantChars: 1200,
                  },
                },
                {
                  id: "fallback-canvas",
                  agents: ["main"],
                  thresholds: {
                    assistantChars: 100,
                  },
                },
              ],
            },
          },
        },
      },
    } as OpenSoulConfig;
    const sessionKey = "agent:main:telegram:dm:user-2";
    activeSessionEntry = {
      sessionId: "session-2",
      updatedAt: Date.now(),
      chatType: "direct",
      lastChannel: "telegram",
      lastAccountId: "work",
    };
    resolveCanvasCapableNodeIdMock.mockResolvedValue("node-2");

    const task = resolveOrCreateTaskForInbound({
      cfg,
      agentId: "main",
      sessionKey,
      inboundText: "Compare two implementation options",
      surface: { kind: "direct-chat", channel: "telegram" },
    }).task;

    const decision = await evaluateSurfacePolicy({
      cfg,
      agentId: "main",
      task,
      sessionKey,
      runContext: makeRunContext(task.taskId, sessionKey),
      stats: {
        taskId: task.taskId,
        runId: "run-rule-1",
        toolEventCount: 0,
        usedSubagent: false,
        assistantChars: 1300,
      },
    });

    expect(decision).toMatchObject({
      mode: "control-ui",
      controlUiUrl: "https://control-ui.example.test/app",
      complexitySignals: ["assistant-long"],
      policyMatch: {
        source: "rule",
        ruleId: "telegram-work-dm",
      },
    });
    expect(resolveCanvasCapableNodeIdMock).not.toHaveBeenCalled();
  });

  it("falls back to safe defaults when runtime policy values are malformed", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-surface-policy-fallback-"));
    let currentTime = 1_731_000_000_000;
    vi.spyOn(Date, "now").mockImplementation(() => currentTime);
    const cfg = {
      ...makeConfig(tempDir),
      gateway: {
        controlUi: {
          continuity: {
            policy: {
              cooldownMs: -10,
              defaultMode: "bad-mode",
              disabledSurfaces: ["mystery-surface"],
              thresholds: {
                assistantChars: -1,
                toolEvents: -1,
              },
              signals: {
                subagent: "yes",
                comparison: "no",
              },
            },
          },
        },
      },
    } as unknown as OpenSoulConfig;
    const sessionKey = "agent:main:telegram:dm:user-3";
    activeSessionEntry = {
      sessionId: "session-3",
      updatedAt: currentTime,
      chatType: "direct",
      lastChannel: "telegram",
    };

    const task = resolveOrCreateTaskForInbound({
      cfg,
      agentId: "main",
      sessionKey,
      inboundText: "Open the control UI if this gets complex",
      surface: { kind: "direct-chat", channel: "telegram" },
    }).task;

    appendTaskEvent({
      cfg,
      agentId: "main",
      taskId: task.taskId,
      kind: "handoff.control-ui",
      sessionKey,
      summary: "recent handoff",
    });
    currentTime += 60_000;

    const decision = await evaluateSurfacePolicy({
      cfg,
      agentId: "main",
      task,
      sessionKey,
      runContext: makeRunContext(task.taskId, sessionKey),
      stats: {
        taskId: task.taskId,
        runId: "run-fallback-1",
        toolEventCount: 0,
        usedSubagent: false,
        assistantChars: 900,
      },
    });

    expect(decision).toMatchObject({
      mode: "none",
      reason: "handoff cooldown active",
      policyMatch: {
        source: "default",
      },
    });
  });
});
