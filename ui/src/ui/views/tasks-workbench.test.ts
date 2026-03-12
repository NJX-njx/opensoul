import { render } from "lit";
import { describe, expect, it, vi } from "vitest";
import type { TaskCommitment, TaskEvent, TaskRecord } from "../types.ts";
import { DEFAULT_TASKS_WORKBENCH_FILTERS } from "../controllers/tasks.ts";
import { renderTasksWorkbench, type TasksWorkbenchProps } from "./tasks-workbench.ts";

function createTask(overrides: Partial<TaskRecord> = {}): TaskRecord {
  return {
    taskId: "task-1",
    agentId: "main",
    status: "waiting-user",
    title: "Ship the task workbench",
    summary: "Expose continuity outside a single session rail",
    latestSessionKey: "agent:main:telegram:dm:user-1",
    createdAt: 1,
    updatedAt: 2,
    ...overrides,
  };
}

function createEvent(overrides: Partial<TaskEvent> = {}): TaskEvent {
  return {
    eventId: "evt-1",
    taskId: "task-1",
    agentId: "main",
    kind: "handoff.control-ui",
    createdAt: 2,
    ...overrides,
  };
}

function createCommitment(overrides: Partial<TaskCommitment> = {}): TaskCommitment {
  return {
    commitmentId: "commit-1",
    taskId: "task-1",
    agentId: "main",
    status: "open",
    title: "Close the loop",
    createdAt: 1,
    updatedAt: 1,
    ...overrides,
  };
}

function buildProps(overrides: Partial<TasksWorkbenchProps> = {}): TasksWorkbenchProps {
  const task = createTask();
  return {
    locale: "en",
    loading: false,
    error: null,
    tasks: [task],
    total: 3,
    nextOffset: 24,
    filters: { ...DEFAULT_TASKS_WORKBENCH_FILTERS },
    selectedTaskId: task.taskId,
    events: [createEvent()],
    commitments: [createCommitment()],
    detailsLoading: false,
    actionError: null,
    actionMessage: null,
    actionBusyKey: null,
    agentOptions: [{ id: "main", label: "main" }],
    onRefresh: () => undefined,
    onLoadMore: () => undefined,
    onFiltersChange: () => undefined,
    onSelectTask: () => undefined,
    onUpdateCommitment: () => undefined,
    onUpdateTaskStatus: () => undefined,
    onOpenEventDetails: () => undefined,
    onOpenSession: () => undefined,
    ...overrides,
  };
}

describe("tasks workbench view", () => {
  it("renders session jump and pagination controls", async () => {
    const container = document.createElement("div");
    const onOpenSession = vi.fn();
    render(
      renderTasksWorkbench(
        buildProps({
          onOpenSession,
        }),
      ),
      container,
    );
    await Promise.resolve();

    const openButton = Array.from(container.querySelectorAll("button")).find((button) =>
      button.textContent?.includes("Open in chat"),
    );
    const loadMoreButton = Array.from(container.querySelectorAll("button")).find((button) =>
      button.textContent?.includes("Load more"),
    );

    expect(container.textContent).toContain("Tasks · Continuity Workbench");
    expect(container.textContent).toContain("agent:main:telegram:dm:user-1");
    expect(openButton).toBeTruthy();
    expect(loadMoreButton).toBeTruthy();
  });
});
