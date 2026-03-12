import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, test, vi } from "vitest";
import { initSessionState } from "../auto-reply/reply/session.js";
import { loadConfig } from "../config/config.js";
import { emitAgentEvent, registerAgentRunContext } from "../infra/agent-events.js";
import { __setMaxChatHistoryMessagesBytesForTest } from "./server-constants.js";
import {
  connectOk,
  getReplyFromConfig,
  installGatewayTestHooks,
  onceMessage,
  rpcReq,
  sessionStoreSaveDelayMs,
  startServerWithClient,
  testState,
  writeSessionStore,
} from "./test-helpers.js";
installGatewayTestHooks();
async function waitFor(condition: () => boolean, timeoutMs = 1500) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (condition()) {
      return;
    }
    await new Promise((r) => setTimeout(r, 5));
  }
  throw new Error("timeout waiting for condition");
}

async function waitForAsync<T>(
  read: () => Promise<T>,
  matches: (value: T) => boolean,
  timeoutMs = 4000,
): Promise<T> {
  const deadline = Date.now() + timeoutMs;
  let lastValue: T | undefined;
  while (Date.now() < deadline) {
    lastValue = await read();
    if (matches(lastValue)) {
      return lastValue;
    }
    await new Promise((r) => setTimeout(r, 10));
  }
  throw new Error(`timeout waiting for async condition: ${JSON.stringify(lastValue)}`);
}
const sendReq = (
  ws: { send: (payload: string) => void },
  id: string,
  method: string,
  params: unknown,
) => {
  ws.send(
    JSON.stringify({
      type: "req",
      id,
      method,
      params,
    }),
  );
};
describe("gateway server chat", () => {
  const timeoutMs = 120_000;
  test(
    "handles history, abort, idempotency, and ordering flows",
    { timeout: timeoutMs },
    async () => {
      const tempDirs: string[] = [];
      const { server, ws } = await startServerWithClient();
      const spy = vi.mocked(getReplyFromConfig);
      const resetSpy = () => {
        spy.mockReset();
        spy.mockResolvedValue(undefined);
      };
      try {
        const historyMaxBytes = 192 * 1024;
        __setMaxChatHistoryMessagesBytesForTest(historyMaxBytes);
        await connectOk(ws);
        const sessionDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-gw-"));
        tempDirs.push(sessionDir);
        testState.sessionStorePath = path.join(sessionDir, "sessions.json");
        const writeStore = async (
          entries: Record<
            string,
            { sessionId: string; updatedAt: number; lastChannel?: string; lastTo?: string }
          >,
        ) => {
          await writeSessionStore({ entries });
        };

        await writeStore({ main: { sessionId: "sess-main", updatedAt: Date.now() } });
        const bigText = "x".repeat(4_000);
        const largeLines: string[] = [];
        for (let i = 0; i < 60; i += 1) {
          largeLines.push(
            JSON.stringify({
              message: {
                role: "user",
                content: [{ type: "text", text: `${i}:${bigText}` }],
                timestamp: Date.now() + i,
              },
            }),
          );
        }
        await fs.writeFile(
          path.join(sessionDir, "sess-main.jsonl"),
          largeLines.join("\n"),
          "utf-8",
        );
        const cappedRes = await rpcReq<{ messages?: unknown[] }>(ws, "chat.history", {
          sessionKey: "main",
          limit: 1000,
        });
        expect(cappedRes.ok).toBe(true);
        const cappedMsgs = cappedRes.payload?.messages ?? [];
        const bytes = Buffer.byteLength(JSON.stringify(cappedMsgs), "utf8");
        expect(bytes).toBeLessThanOrEqual(historyMaxBytes);
        expect(cappedMsgs.length).toBeLessThan(60);

        await writeStore({
          main: {
            sessionId: "sess-main",
            updatedAt: Date.now(),
            lastChannel: "whatsapp",
            lastTo: "+1555",
          },
        });
        const routeRes = await rpcReq(ws, "chat.send", {
          sessionKey: "main",
          message: "hello",
          idempotencyKey: "idem-route",
        });
        expect(routeRes.ok).toBe(true);
        const stored = JSON.parse(await fs.readFile(testState.sessionStorePath, "utf-8")) as Record<
          string,
          { lastChannel?: string; lastTo?: string } | undefined
        >;
        expect(stored["agent:main:main"]?.lastChannel).toBe("whatsapp");
        expect(stored["agent:main:main"]?.lastTo).toBe("+1555");

        await writeStore({ main: { sessionId: "sess-main", updatedAt: Date.now() } });
        resetSpy();
        let abortInFlight: Promise<unknown> | undefined;
        try {
          const callsBefore = spy.mock.calls.length;
          spy.mockImplementationOnce(async (_ctx, opts) => {
            opts?.onAgentRunStart?.(opts.runId ?? "idem-abort-1");
            const signal = opts?.abortSignal;
            await new Promise<void>((resolve) => {
              if (!signal) {
                return resolve();
              }
              if (signal.aborted) {
                return resolve();
              }
              signal.addEventListener("abort", () => resolve(), { once: true });
            });
          });
          const sendResP = onceMessage(
            ws,
            (o) => o.type === "res" && o.id === "send-abort-1",
            8000,
          );
          const abortResP = onceMessage(ws, (o) => o.type === "res" && o.id === "abort-1", 8000);
          const abortedEventP = onceMessage(
            ws,
            (o) => o.type === "event" && o.event === "chat" && o.payload?.state === "aborted",
            8000,
          );
          abortInFlight = Promise.allSettled([sendResP, abortResP, abortedEventP]);
          sendReq(ws, "send-abort-1", "chat.send", {
            sessionKey: "main",
            message: "hello",
            idempotencyKey: "idem-abort-1",
            timeoutMs: 30_000,
          });
          const sendRes = await sendResP;
          expect(sendRes.ok).toBe(true);
          await new Promise<void>((resolve, reject) => {
            const deadline = Date.now() + 1000;
            const tick = () => {
              if (spy.mock.calls.length > callsBefore) {
                return resolve();
              }
              if (Date.now() > deadline) {
                return reject(new Error("timeout waiting for getReplyFromConfig"));
              }
              setTimeout(tick, 5);
            };
            tick();
          });
          sendReq(ws, "abort-1", "chat.abort", {
            sessionKey: "main",
            runId: "idem-abort-1",
          });
          const abortRes = await abortResP;
          expect(abortRes.ok).toBe(true);
          const evt = await abortedEventP;
          expect(evt.payload?.runId).toBe("idem-abort-1");
          expect(evt.payload?.sessionKey).toBe("main");
        } finally {
          await abortInFlight;
        }

        await writeStore({ main: { sessionId: "sess-main", updatedAt: Date.now() } });
        sessionStoreSaveDelayMs.value = 120;
        resetSpy();
        try {
          spy.mockImplementationOnce(async (_ctx, opts) => {
            opts?.onAgentRunStart?.(opts.runId ?? "idem-abort-save-1");
            const signal = opts?.abortSignal;
            await new Promise<void>((resolve) => {
              if (!signal) {
                return resolve();
              }
              if (signal.aborted) {
                return resolve();
              }
              signal.addEventListener("abort", () => resolve(), { once: true });
            });
          });
          const abortedEventP = onceMessage(
            ws,
            (o) => o.type === "event" && o.event === "chat" && o.payload?.state === "aborted",
          );
          const sendResP = onceMessage(ws, (o) => o.type === "res" && o.id === "send-abort-save-1");
          sendReq(ws, "send-abort-save-1", "chat.send", {
            sessionKey: "main",
            message: "hello",
            idempotencyKey: "idem-abort-save-1",
            timeoutMs: 30_000,
          });
          const abortResP = onceMessage(ws, (o) => o.type === "res" && o.id === "abort-save-1");
          sendReq(ws, "abort-save-1", "chat.abort", {
            sessionKey: "main",
            runId: "idem-abort-save-1",
          });
          const abortRes = await abortResP;
          expect(abortRes.ok).toBe(true);
          const sendRes = await sendResP;
          expect(sendRes.ok).toBe(true);
          const evt = await abortedEventP;
          expect(evt.payload?.runId).toBe("idem-abort-save-1");
          expect(evt.payload?.sessionKey).toBe("main");
        } finally {
          sessionStoreSaveDelayMs.value = 0;
        }

        await writeStore({ main: { sessionId: "sess-main", updatedAt: Date.now() } });
        resetSpy();
        const callsBeforeStop = spy.mock.calls.length;
        spy.mockImplementationOnce(async (_ctx, opts) => {
          opts?.onAgentRunStart?.(opts.runId ?? "idem-stop-1");
          const signal = opts?.abortSignal;
          await new Promise<void>((resolve) => {
            if (!signal) {
              return resolve();
            }
            if (signal.aborted) {
              return resolve();
            }
            signal.addEventListener("abort", () => resolve(), { once: true });
          });
        });
        const stopSendResP = onceMessage(
          ws,
          (o) => o.type === "res" && o.id === "send-stop-1",
          8000,
        );
        sendReq(ws, "send-stop-1", "chat.send", {
          sessionKey: "main",
          message: "hello",
          idempotencyKey: "idem-stop-run",
        });
        const stopSendRes = await stopSendResP;
        expect(stopSendRes.ok).toBe(true);
        await waitFor(() => spy.mock.calls.length > callsBeforeStop);
        const abortedStopEventP = onceMessage(
          ws,
          (o) =>
            o.type === "event" &&
            o.event === "chat" &&
            o.payload?.state === "aborted" &&
            o.payload?.runId === "idem-stop-run",
          8000,
        );
        const stopResP = onceMessage(ws, (o) => o.type === "res" && o.id === "send-stop-2", 8000);
        sendReq(ws, "send-stop-2", "chat.send", {
          sessionKey: "main",
          message: "/stop",
          idempotencyKey: "idem-stop-req",
        });
        const stopRes = await stopResP;
        expect(stopRes.ok).toBe(true);
        const stopEvt = await abortedStopEventP;
        expect(stopEvt.payload?.sessionKey).toBe("main");
        expect(spy.mock.calls.length).toBe(callsBeforeStop + 1);
        resetSpy();
        let resolveRun: (() => void) | undefined;
        const runDone = new Promise<void>((resolve) => {
          resolveRun = resolve;
        });
        spy.mockImplementationOnce(async (_ctx, opts) => {
          opts?.onAgentRunStart?.(opts.runId ?? "idem-status-1");
          await runDone;
        });
        const started = await rpcReq<{ runId?: string; status?: string }>(ws, "chat.send", {
          sessionKey: "main",
          message: "hello",
          idempotencyKey: "idem-status-1",
        });
        expect(started.ok).toBe(true);
        expect(started.payload?.status).toBe("started");
        const inFlightRes = await rpcReq<{ runId?: string; status?: string }>(ws, "chat.send", {
          sessionKey: "main",
          message: "hello",
          idempotencyKey: "idem-status-1",
        });
        expect(inFlightRes.ok).toBe(true);
        expect(inFlightRes.payload?.status).toBe("in_flight");
        resolveRun?.();
        let completed = false;
        for (let i = 0; i < 20; i++) {
          const again = await rpcReq<{ runId?: string; status?: string }>(ws, "chat.send", {
            sessionKey: "main",
            message: "hello",
            idempotencyKey: "idem-status-1",
          });
          if (again.ok && again.payload?.status === "ok") {
            completed = true;
            break;
          }
          await new Promise((r) => setTimeout(r, 10));
        }
        expect(completed).toBe(true);
        resetSpy();
        spy.mockImplementationOnce(async (_ctx, opts) => {
          opts?.onAgentRunStart?.(opts.runId ?? "idem-abort-all-1");
          const signal = opts?.abortSignal;
          await new Promise<void>((resolve) => {
            if (!signal) {
              return resolve();
            }
            if (signal.aborted) {
              return resolve();
            }
            signal.addEventListener("abort", () => resolve(), { once: true });
          });
        });
        const abortedEventP = onceMessage(
          ws,
          (o) =>
            o.type === "event" &&
            o.event === "chat" &&
            o.payload?.state === "aborted" &&
            o.payload?.runId === "idem-abort-all-1",
        );
        const startedAbortAll = await rpcReq(ws, "chat.send", {
          sessionKey: "main",
          message: "hello",
          idempotencyKey: "idem-abort-all-1",
        });
        expect(startedAbortAll.ok).toBe(true);
        const abortRes = await rpcReq<{
          ok?: boolean;
          aborted?: boolean;
          runIds?: string[];
        }>(ws, "chat.abort", { sessionKey: "main" });
        expect(abortRes.ok).toBe(true);
        expect(abortRes.payload?.aborted).toBe(true);
        expect(abortRes.payload?.runIds ?? []).toContain("idem-abort-all-1");
        await abortedEventP;
        const noDeltaP = onceMessage(
          ws,
          (o) =>
            o.type === "event" &&
            o.event === "chat" &&
            (o.payload?.state === "delta" || o.payload?.state === "final") &&
            o.payload?.runId === "idem-abort-all-1",
          250,
        );
        emitAgentEvent({
          runId: "idem-abort-all-1",
          stream: "assistant",
          data: { text: "should be suppressed" },
        });
        emitAgentEvent({
          runId: "idem-abort-all-1",
          stream: "lifecycle",
          data: { phase: "end" },
        });
        await expect(noDeltaP).rejects.toThrow(/timeout/i);
        await writeStore({});
        const abortUnknown = await rpcReq<{
          ok?: boolean;
          aborted?: boolean;
        }>(ws, "chat.abort", { sessionKey: "main", runId: "missing-run" });
        expect(abortUnknown.ok).toBe(true);
        expect(abortUnknown.payload?.aborted).toBe(false);

        await writeStore({ main: { sessionId: "sess-main", updatedAt: Date.now() } });
        resetSpy();
        let agentStartedResolve: (() => void) | undefined;
        const agentStartedP = new Promise<void>((resolve) => {
          agentStartedResolve = resolve;
        });
        spy.mockImplementationOnce(async (_ctx, opts) => {
          agentStartedResolve?.();
          const signal = opts?.abortSignal;
          await new Promise<void>((resolve) => {
            if (!signal) {
              return resolve();
            }
            if (signal.aborted) {
              return resolve();
            }
            signal.addEventListener("abort", () => resolve(), { once: true });
          });
        });
        const sendResP = onceMessage(
          ws,
          (o) => o.type === "res" && o.id === "send-mismatch-1",
          10_000,
        );
        sendReq(ws, "send-mismatch-1", "chat.send", {
          sessionKey: "main",
          message: "hello",
          idempotencyKey: "idem-mismatch-1",
          timeoutMs: 30_000,
        });
        await agentStartedP;
        const abortMismatch = await rpcReq(ws, "chat.abort", {
          sessionKey: "other",
          runId: "idem-mismatch-1",
        });
        expect(abortMismatch.ok).toBe(false);
        expect(abortMismatch.error?.code).toBe("INVALID_REQUEST");
        const abortMismatch2 = await rpcReq(ws, "chat.abort", {
          sessionKey: "main",
          runId: "idem-mismatch-1",
        });
        expect(abortMismatch2.ok).toBe(true);
        const sendRes = await sendResP;
        expect(sendRes.ok).toBe(true);

        await writeStore({ main: { sessionId: "sess-main", updatedAt: Date.now() } });
        resetSpy();
        spy.mockResolvedValueOnce(undefined);
        sendReq(ws, "send-complete-1", "chat.send", {
          sessionKey: "main",
          message: "hello",
          idempotencyKey: "idem-complete-1",
          timeoutMs: 30_000,
        });
        const sendCompleteRes = await onceMessage(
          ws,
          (o) => o.type === "res" && o.id === "send-complete-1",
        );
        expect(sendCompleteRes.ok).toBe(true);
        let completedRun = false;
        for (let i = 0; i < 20; i++) {
          const again = await rpcReq<{ runId?: string; status?: string }>(ws, "chat.send", {
            sessionKey: "main",
            message: "hello",
            idempotencyKey: "idem-complete-1",
            timeoutMs: 30_000,
          });
          if (again.ok && again.payload?.status === "ok") {
            completedRun = true;
            break;
          }
          await new Promise((r) => setTimeout(r, 10));
        }
        expect(completedRun).toBe(true);
        const abortCompleteRes = await rpcReq(ws, "chat.abort", {
          sessionKey: "main",
          runId: "idem-complete-1",
        });
        expect(abortCompleteRes.ok).toBe(true);
        expect(abortCompleteRes.payload?.aborted).toBe(false);

        await writeStore({ main: { sessionId: "sess-main", updatedAt: Date.now() } });
        const res1 = await rpcReq(ws, "chat.send", {
          sessionKey: "main",
          message: "first",
          idempotencyKey: "idem-1",
        });
        expect(res1.ok).toBe(true);
        const res2 = await rpcReq(ws, "chat.send", {
          sessionKey: "main",
          message: "second",
          idempotencyKey: "idem-2",
        });
        expect(res2.ok).toBe(true);
        const final1P = onceMessage(
          ws,
          (o) => o.type === "event" && o.event === "chat" && o.payload?.state === "final",
          8000,
        );
        emitAgentEvent({
          runId: "idem-1",
          stream: "lifecycle",
          data: { phase: "end" },
        });
        const final1 = await final1P;
        const run1 =
          final1.payload && typeof final1.payload === "object"
            ? (final1.payload as { runId?: string }).runId
            : undefined;
        expect(run1).toBe("idem-1");
        const final2P = onceMessage(
          ws,
          (o) => o.type === "event" && o.event === "chat" && o.payload?.state === "final",
          8000,
        );
        emitAgentEvent({
          runId: "idem-2",
          stream: "lifecycle",
          data: { phase: "end" },
        });
        const final2 = await final2P;
        const run2 =
          final2.payload && typeof final2.payload === "object"
            ? (final2.payload as { runId?: string }).runId
            : undefined;
        expect(run2).toBe("idem-2");
      } finally {
        __setMaxChatHistoryMessagesBytesForTest();
        testState.sessionStorePath = undefined;
        sessionStoreSaveDelayMs.value = 0;
        ws.close();
        await server.close();
        await Promise.all(tempDirs.map((dir) => fs.rm(dir, { recursive: true, force: true })));
      }
    },
  );

  test(
    "keeps continuity readable and operable across restart for a direct-chat task",
    { timeout: timeoutMs },
    async () => {
      const sessionDir = await fs.mkdtemp(path.join(os.tmpdir(), "opensoul-gw-continuity-"));
      const sessionKey = "agent:main:telegram:dm:continuity-user";
      const handoffUrl = "https://control-ui.example.test/app";
      let server: Awaited<ReturnType<typeof startServerWithClient>>["server"] | null = null;
      let ws: Awaited<ReturnType<typeof startServerWithClient>>["ws"] | null = null;

      const closeServer = async () => {
        if (ws) {
          const currentWs = ws;
          ws = null;
          await new Promise<void>((resolve) => {
            if (currentWs.readyState === WebSocket.CLOSED) {
              resolve();
              return;
            }
            const timer = setTimeout(() => {
              try {
                currentWs.terminate();
              } catch {
                // best effort cleanup for flaky Windows socket shutdowns
              }
              resolve();
            }, 1_000);
            currentWs.once("close", () => {
              clearTimeout(timer);
              resolve();
            });
            currentWs.close();
          });
        }
        if (server) {
          const currentServer = server;
          server = null;
          await currentServer.close();
          await new Promise((resolve) => setTimeout(resolve, 25));
        }
      };

      try {
        testState.sessionStorePath = path.join(sessionDir, "sessions.json");
        testState.gatewayControlUi = { publicUrl: handoffUrl };
        testState.channelsConfig = {
          telegram: {
            accounts: {
              default: {},
            },
          },
        };
        const cfg = loadConfig();
        const initState = await initSessionState({
          ctx: {
            Body: "Keep working on the same task",
            SessionKey: sessionKey,
            OriginatingChannel: "telegram",
          },
          cfg,
          commandAuthorized: true,
        });
        const initialTaskId = initState.sessionEntry.activeTaskId;
        expect(typeof initialTaskId).toBe("string");
        if (!initialTaskId) {
          throw new Error("missing initialTaskId");
        }
        await writeSessionStore({
          entries: {
            [sessionKey]: {
              ...initState.sessionEntry,
              updatedAt: Date.now(),
              channel: "telegram",
              chatType: "direct",
              lastChannel: "telegram",
              lastTo: "@continuity-user",
              activeTaskId: initialTaskId,
              lastTaskId: initialTaskId,
            },
          },
        });

        {
          const started = await startServerWithClient();
          server = started.server;
          ws = started.ws;
          await connectOk(ws);

          const task = await waitForAsync(
            async () => {
              const tasksRes = await rpcReq<{
                tasks?: Array<{ taskId?: string; status?: string }>;
              }>(ws, "tasks.list", {
                sessionKey,
                limit: 8,
              });
              return (tasksRes.payload?.tasks ?? [])[0];
            },
            (candidate) => typeof candidate?.taskId === "string",
          );
          const taskId = task?.taskId;
          expect(typeof taskId).toBe("string");
          if (!taskId) {
            throw new Error("missing taskId");
          }
          const runId = "run-continuity-main";
          registerAgentRunContext(runId, {
            sessionKey,
            taskId,
            sourceSurface: "direct-chat",
            handoffEligible: true,
          });

          emitAgentEvent({
            runId,
            stream: "assistant",
            data: {
              text: [
                "Option 1: keep this thread in chat.",
                "Option 2: continue in Control UI for the visible task trail.",
                "Next steps:",
                "- Follow up on the browser flow",
              ].join("\n"),
            },
          });
          emitAgentEvent({
            runId,
            stream: "lifecycle",
            data: { phase: "end" },
          });

          const commitment = await waitForAsync(
            async () => {
              const commitmentsRes = await rpcReq<{
                commitments?: Array<{
                  commitmentId?: string;
                  title?: string;
                  status?: string;
                }>;
              }>(ws, "tasks.commitments", {
                sessionKey,
                taskId,
              });
              return commitmentsRes.payload?.commitments?.find(
                (candidate) => candidate.title === "Follow up on the browser flow",
              );
            },
            (candidate) =>
              typeof candidate?.commitmentId === "string" && candidate.status === "open",
          );
          const commitmentId = commitment?.commitmentId;
          expect(typeof commitmentId).toBe("string");
          if (!commitmentId) {
            throw new Error("missing commitmentId");
          }

          const eventsAfterRun = await waitForAsync(
            async () => {
              const eventsRes = await rpcReq<{
                events?: Array<{
                  kind?: string;
                }>;
              }>(ws, "tasks.events", {
                sessionKey,
                taskId,
                limit: 40,
              });
              return eventsRes.payload?.events ?? [];
            },
            (events) => events.some((event) => event.kind === "commitment.opened"),
            8000,
          );
          expect(eventsAfterRun.map((event) => event.kind)).toContain("lifecycle.end");
          expect(eventsAfterRun.map((event) => event.kind)).toContain("commitment.opened");

          await closeServer();
        }

        {
          const restarted = await startServerWithClient();
          server = restarted.server;
          ws = restarted.ws;
          await connectOk(ws);

          const restartedTask = await waitForAsync(
            async () => {
              const tasksRes = await rpcReq<{
                tasks?: Array<{ taskId?: string; status?: string }>;
              }>(ws, "tasks.list", {
                sessionKey,
                limit: 8,
              });
              return (tasksRes.payload?.tasks ?? [])[0];
            },
            (candidate) =>
              typeof candidate?.taskId === "string" && candidate.status === "waiting-user",
          );
          const taskId = restartedTask?.taskId;
          expect(typeof taskId).toBe("string");
          if (!taskId) {
            throw new Error("missing restarted taskId");
          }

          const commitmentsRes = await rpcReq<{
            commitments?: Array<{ commitmentId?: string; status?: string; title?: string }>;
          }>(ws, "tasks.commitments", {
            sessionKey,
            taskId,
          });
          const restartedCommitment = commitmentsRes.payload?.commitments?.find(
            (candidate) => candidate.title === "Follow up on the browser flow",
          );
          expect(restartedCommitment?.status).toBe("open");
          const commitmentId = restartedCommitment?.commitmentId;
          expect(typeof commitmentId).toBe("string");
          if (!commitmentId) {
            throw new Error("missing restarted commitmentId");
          }

          const doneRes = await rpcReq<{
            commitment?: { status?: string };
          }>(ws, "tasks.commitments.update", {
            sessionKey,
            taskId,
            commitmentId,
            status: "done",
          });
          expect(doneRes.ok).toBe(true);
          expect(doneRes.payload?.commitment?.status).toBe("done");

          const completeRes = await rpcReq<{
            task?: { status?: string };
          }>(ws, "tasks.task.patch", {
            sessionKey,
            taskId,
            status: "completed",
          });
          expect(completeRes.ok).toBe(true);
          expect(completeRes.payload?.task?.status).toBe("completed");

          const eventsAfterWrite = await rpcReq<{
            events?: Array<{ kind?: string }>;
          }>(ws, "tasks.events", {
            sessionKey,
            taskId,
            limit: 40,
          });
          const kinds = (eventsAfterWrite.payload?.events ?? []).map((event) => event.kind);
          expect(kinds).toContain("commitment.done");
          expect(kinds).toContain("task.updated");

          const taskAfterWrite = await rpcReq<{
            task?: { taskId?: string; status?: string };
          }>(ws, "tasks.get", {
            sessionKey,
            taskId,
          });
          expect(taskAfterWrite.ok).toBe(true);
          expect(taskAfterWrite.payload?.task?.taskId).toBe(taskId);
          expect(taskAfterWrite.payload?.task?.status).toBe("completed");
        }
      } finally {
        await closeServer();
        testState.sessionStorePath = undefined;
        testState.gatewayControlUi = undefined;
        testState.channelsConfig = undefined;
        await fs.rm(sessionDir, { recursive: true, force: true });
      }
    },
  );
});
