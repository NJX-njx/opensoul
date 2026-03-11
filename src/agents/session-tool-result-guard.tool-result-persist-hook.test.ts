import type { AgentMessage } from "@mariozechner/pi-agent-core";
import { SessionManager } from "@mariozechner/pi-coding-agent";
import { describe, expect, it, afterEach } from "vitest";
import {
  initializeGlobalHookRunner,
  resetGlobalHookRunner,
} from "../plugins/hook-runner-global.js";
import { guardSessionManager } from "./session-tool-result-guard-wrapper.js";

afterEach(() => {
  resetGlobalHookRunner();
});

describe("tool_result_persist hook", () => {
  it("does not modify persisted toolResult messages when no hook is registered", () => {
    const sm = guardSessionManager(SessionManager.inMemory(), {
      agentId: "main",
      sessionKey: "main",
    });

    sm.appendMessage({
      role: "assistant",
      content: [{ type: "toolCall", id: "call_1", name: "read", arguments: {} }],
    } as AgentMessage);

    sm.appendMessage({
      role: "toolResult",
      toolCallId: "call_1",
      isError: false,
      content: [{ type: "text", text: "ok" }],
      details: { big: "x".repeat(10_000) },
      // oxlint-disable-next-line typescript/no-explicit-any
    } as any);

    const messages = sm
      .getEntries()
      .filter((e) => e.type === "message")
      .map((e) => (e as { message: AgentMessage }).message);

    // oxlint-disable-next-line typescript/no-explicit-any
    const toolResult = messages.find((m) => (m as any).role === "toolResult") as any;
    expect(toolResult).toBeTruthy();
    expect(toolResult.details).toBeTruthy();
  });

  it("composes transforms in priority order and allows stripping toolResult.details", () => {
    initializeGlobalHookRunner({
      plugins: [],
      tools: [],
      hooks: [],
      typedHooks: [
        {
          pluginId: "persist-a",
          hookName: "tool_result_persist",
          source: "test://persist-a",
          priority: 10,
          handler: (event, ctx) => {
            const msg = event.message;
            const { details: _details, ...rest } = msg;
            return { message: { ...rest, persistOrder: ["a"], agentSeen: ctx.agentId ?? null } };
          },
        },
        {
          pluginId: "persist-b",
          hookName: "tool_result_persist",
          source: "test://persist-b",
          priority: 5,
          handler: (event) => {
            const prior =
              event.message && "persistOrder" in event.message ? event.message.persistOrder : [];
            return { message: { ...event.message, persistOrder: [...prior, "b"] } };
          },
        },
      ],
      channels: [],
      providers: [],
      gatewayHandlers: {},
      httpHandlers: [],
      httpRoutes: [],
      cliRegistrars: [],
      services: [],
      commands: [],
      diagnostics: [],
    } as never);

    const sm = guardSessionManager(SessionManager.inMemory(), {
      agentId: "main",
      sessionKey: "main",
    });

    // Tool call (so the guard can infer tool name -> id mapping).
    sm.appendMessage({
      role: "assistant",
      content: [{ type: "toolCall", id: "call_1", name: "read", arguments: {} }],
    } as AgentMessage);

    // Tool result containing a large-ish details payload.
    sm.appendMessage({
      role: "toolResult",
      toolCallId: "call_1",
      isError: false,
      content: [{ type: "text", text: "ok" }],
      details: { big: "x".repeat(10_000) },
      // oxlint-disable-next-line typescript/no-explicit-any
    } as any);

    const messages = sm
      .getEntries()
      .filter((e) => e.type === "message")
      .map((e) => (e as { message: AgentMessage }).message);

    // oxlint-disable-next-line typescript/no-explicit-any
    const toolResult = messages.find((m) => (m as any).role === "toolResult") as any;
    expect(toolResult).toBeTruthy();

    // Default behavior: strip details.
    expect(toolResult.details).toBeUndefined();

    // Hook composition: priority 10 runs before priority 5.
    expect(toolResult.persistOrder).toEqual(["a", "b"]);
    expect(toolResult.agentSeen).toBe("main");
  });
});
