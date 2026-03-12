import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { OpenSoulConfig } from "../config/config.js";
import { executeHandoffDecision } from "./handoff.js";
import { listTaskEvents, resolveOrCreateTaskForInbound } from "./service.js";
import { resetContinuityStoreCacheForTest } from "./store.js";

const routeReplyMock = vi.fn();
const callGatewayMock = vi.fn();

vi.mock("../auto-reply/reply/route-reply.js", () => ({
  routeReply: (...args: Array<unknown>) => routeReplyMock(...args),
}));

vi.mock("../gateway/call.js", () => ({
  callGateway: (...args: Array<unknown>) => callGatewayMock(...args),
}));

vi.mock("../gateway/session-utils.js", () => ({
  loadSessionEntry: () => ({ entry: {} }),
}));

vi.mock("../utils/delivery-context.js", () => ({
  normalizeSessionDeliveryFields: () => ({
    lastChannel: "telegram",
    lastTo: "user-1",
    lastAccountId: "acc-1",
    lastThreadId: "thread-1",
  }),
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

describe("continuity handoff", () => {
  let tempDir: string | null = null;

  afterEach(async () => {
    routeReplyMock.mockReset();
    callGatewayMock.mockReset();
    resetContinuityStoreCacheForTest();
    if (tempDir) {
      await fs.rm(tempDir, { recursive: true, force: true });
      tempDir = null;
    }
  });

  it("dedupes repeated control-ui handoffs for the same run", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-handoff-dedupe-"));
    const cfg = makeConfig(tempDir);
    const task = resolveOrCreateTaskForInbound({
      cfg,
      agentId: "main",
      sessionKey: "agent:main:telegram:dm:user-1",
      inboundText: "Move this into the browser",
      surface: { kind: "direct-chat", channel: "telegram" },
    }).task;
    routeReplyMock.mockResolvedValue({ ok: true });

    await executeHandoffDecision({
      cfg,
      agentId: "main",
      taskId: task.taskId,
      sessionKey: "agent:main:telegram:dm:user-1",
      runId: "run-dedupe-1",
      decision: {
        mode: "control-ui",
        reason: "complexity",
        controlUiUrl: "http://127.0.0.1:19001/?session=demo",
      },
    });
    await executeHandoffDecision({
      cfg,
      agentId: "main",
      taskId: task.taskId,
      sessionKey: "agent:main:telegram:dm:user-1",
      runId: "run-dedupe-1",
      decision: {
        mode: "control-ui",
        reason: "complexity",
        controlUiUrl: "http://127.0.0.1:19001/?session=demo",
      },
    });

    expect(routeReplyMock).toHaveBeenCalledTimes(1);
    expect(
      listTaskEvents({
        cfg,
        agentId: "main",
        taskId: task.taskId,
        limit: 20,
      }).filter((event) => event.kind === "handoff.control-ui"),
    ).toHaveLength(1);
  });

  it("retries canvas handoff with a stable idempotency key and degrades to control-ui", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-handoff-canvas-"));
    const cfg = makeConfig(tempDir);
    const task = resolveOrCreateTaskForInbound({
      cfg,
      agentId: "main",
      sessionKey: "agent:main:telegram:dm:user-2",
      inboundText: "Open the browser and canvas",
      surface: { kind: "direct-chat", channel: "telegram" },
    }).task;
    callGatewayMock
      .mockRejectedValueOnce(new Error("temporary network failure"))
      .mockRejectedValueOnce(new Error("temporary network failure"));
    routeReplyMock.mockResolvedValue({ ok: true });

    const decision = await executeHandoffDecision({
      cfg,
      agentId: "main",
      taskId: task.taskId,
      sessionKey: "agent:main:telegram:dm:user-2",
      runId: "run-canvas-1",
      decision: {
        mode: "control-ui+canvas",
        reason: "complexity",
        controlUiUrl: "http://127.0.0.1:19001/?session=demo",
        canvasNodeId: "node-1",
      },
    });

    expect(decision.mode).toBe("control-ui");
    expect(decision.degradedFrom).toBe("control-ui+canvas");
    expect(callGatewayMock).toHaveBeenCalledTimes(2);
    expect(
      (callGatewayMock.mock.calls[0]?.[0] as { params?: { idempotencyKey?: string } })?.params
        ?.idempotencyKey,
    ).toBe(
      (callGatewayMock.mock.calls[1]?.[0] as { params?: { idempotencyKey?: string } })?.params
        ?.idempotencyKey,
    );

    const events = listTaskEvents({
      cfg,
      agentId: "main",
      taskId: task.taskId,
      limit: 20,
    });
    const canvasFailed = events.find((event) => event.kind === "handoff.canvas-failed");
    const controlUi = events.find((event) => event.kind === "handoff.control-ui");
    expect(canvasFailed?.payload?.attempts).toBe(2);
    expect(canvasFailed?.payload?.degradedTo).toBe("control-ui");
    expect(controlUi?.payload?.attempts).toBe(1);
  });

  it("retries control-ui delivery when the first attempt fails transiently", async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-handoff-retry-"));
    const cfg = makeConfig(tempDir);
    const task = resolveOrCreateTaskForInbound({
      cfg,
      agentId: "main",
      sessionKey: "agent:main:telegram:dm:user-3",
      inboundText: "Send me the browser handoff",
      surface: { kind: "direct-chat", channel: "telegram" },
    }).task;
    routeReplyMock
      .mockResolvedValueOnce({ ok: false, error: "temporary network failure" })
      .mockResolvedValueOnce({ ok: true });

    await executeHandoffDecision({
      cfg,
      agentId: "main",
      taskId: task.taskId,
      sessionKey: "agent:main:telegram:dm:user-3",
      runId: "run-retry-1",
      decision: {
        mode: "control-ui",
        reason: "complexity",
        controlUiUrl: "http://127.0.0.1:19001/?session=demo",
      },
    });

    expect(routeReplyMock).toHaveBeenCalledTimes(2);
    expect(
      listTaskEvents({
        cfg,
        agentId: "main",
        taskId: task.taskId,
        limit: 20,
      }).find((event) => event.kind === "handoff.control-ui")?.payload?.attempts,
    ).toBe(2);
  });
});
