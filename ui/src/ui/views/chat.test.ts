import { render } from "lit";
import { describe, expect, it, vi } from "vitest";
import type { SessionsListResult } from "../types.ts";
import { renderChat, type ChatProps } from "./chat.ts";

function createSessions(): SessionsListResult {
  return {
    ts: 0,
    path: "",
    count: 0,
    defaults: { model: null, contextTokens: null },
    sessions: [],
  };
}

function createProps(overrides: Partial<ChatProps> = {}): ChatProps {
  return {
    locale: "en",
    sessionKey: "main",
    onSessionKeyChange: () => undefined,
    thinkingLevel: null,
    showThinking: false,
    loading: false,
    sending: false,
    canAbort: false,
    compactionStatus: null,
    messages: [],
    toolMessages: [],
    stream: null,
    streamStartedAt: null,
    assistantAvatarUrl: null,
    draft: "",
    queue: [],
    connected: true,
    canSend: true,
    disabledReason: null,
    error: null,
    sessions: createSessions(),
    focusMode: false,
    assistantName: "OpenSoul",
    assistantAvatar: null,
    onRefresh: () => undefined,
    onToggleFocusMode: () => undefined,
    onDraftChange: () => undefined,
    onSend: () => undefined,
    onQueueRemove: () => undefined,
    onNewSession: () => undefined,
    ...overrides,
  };
}

describe("chat view", () => {
  it("renders compacting indicator as a badge", () => {
    const container = document.createElement("div");
    render(
      renderChat(
        createProps({
          compactionStatus: {
            active: true,
            startedAt: Date.now(),
            completedAt: null,
          },
        }),
      ),
      container,
    );

    const indicator = container.querySelector(".compaction-indicator--active");
    expect(indicator).not.toBeNull();
    expect(indicator?.textContent).toContain("Compacting context...");
  });

  it("renders completion indicator shortly after compaction", () => {
    const container = document.createElement("div");
    const nowSpy = vi.spyOn(Date, "now").mockReturnValue(1_000);
    render(
      renderChat(
        createProps({
          compactionStatus: {
            active: false,
            startedAt: 900,
            completedAt: 900,
          },
        }),
      ),
      container,
    );

    const indicator = container.querySelector(".compaction-indicator--complete");
    expect(indicator).not.toBeNull();
    expect(indicator?.textContent).toContain("Context compacted");
    nowSpy.mockRestore();
  });

  it("hides stale compaction completion indicator", () => {
    const container = document.createElement("div");
    const nowSpy = vi.spyOn(Date, "now").mockReturnValue(10_000);
    render(
      renderChat(
        createProps({
          compactionStatus: {
            active: false,
            startedAt: 0,
            completedAt: 0,
          },
        }),
      ),
      container,
    );

    expect(container.querySelector(".compaction-indicator")).toBeNull();
    nowSpy.mockRestore();
  });

  it("shows a stop button when aborting is available", () => {
    const container = document.createElement("div");
    const onAbort = vi.fn();
    render(
      renderChat(
        createProps({
          canAbort: true,
          onAbort,
        }),
      ),
      container,
    );

    const stopButton = Array.from(container.querySelectorAll("button")).find(
      (btn) => btn.textContent?.trim() === "Stop",
    );
    expect(stopButton).not.toBeUndefined();
    stopButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(onAbort).toHaveBeenCalledTimes(1);
    expect(container.textContent).not.toContain("New session");
  });

  it("shows a new session button when aborting is unavailable", () => {
    const container = document.createElement("div");
    const onNewSession = vi.fn();
    render(
      renderChat(
        createProps({
          canAbort: false,
          onNewSession,
        }),
      ),
      container,
    );

    const newSessionButton = Array.from(container.querySelectorAll("button")).find(
      (btn) => btn.textContent?.trim() === "New",
    );
    expect(newSessionButton).not.toBeUndefined();
    newSessionButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(onNewSession).toHaveBeenCalledTimes(1);
    expect(container.textContent).not.toContain("Stop");
  });

  it("renders the task continuity rail with commitments and events", () => {
    const container = document.createElement("div");
    const onSelectTaskContinuityTask = vi.fn();
    render(
      renderChat(
        createProps({
          taskContinuityTasks: [
            {
              taskId: "task-1",
              agentId: "main",
              status: "running",
              title: "Ship task continuity",
              summary: "Visualize the same task across multiple surfaces",
              currentSurface: { kind: "control-ui" },
              sourceSurface: { kind: "direct-chat", channel: "telegram" },
              createdAt: Date.now() - 3_000,
              updatedAt: Date.now(),
            },
          ],
          taskContinuitySelectedTaskId: "task-1",
          taskContinuityEvents: [
            {
              eventId: "evt-1",
              taskId: "task-1",
              agentId: "main",
              kind: "handoff.control-ui",
              summary: "Delivered Control UI handoff",
              createdAt: Date.now(),
              surface: { kind: "control-ui" },
            },
          ],
          taskContinuityCommitments: [
            {
              commitmentId: "commit-1",
              taskId: "task-1",
              agentId: "main",
              status: "open",
              title: "Follow up on the browser flow",
              detail: "Verify the Control UI deep-link from DM",
              createdAt: Date.now() - 5_000,
              updatedAt: Date.now(),
            },
          ],
          onSelectTaskContinuityTask,
        }),
      ),
      container,
    );

    expect(container.textContent).toContain("One task, many surfaces");
    expect(container.textContent).toContain("Ship task continuity");
    expect(container.textContent).toContain("Follow up on the browser flow");
    expect(container.textContent).toContain("Delivered Control UI handoff");

    const taskCard = container.querySelector(".task-continuity-card");
    expect(taskCard).not.toBeNull();
    taskCard?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(onSelectTaskContinuityTask).toHaveBeenCalledWith("task-1");
  });
});
