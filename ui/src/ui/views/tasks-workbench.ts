import { html, nothing } from "lit";
import type { TasksWorkbenchFilters, TasksWorkbenchUpdatedWindow } from "../controllers/tasks.ts";
import type {
  CommitmentStatus,
  TaskCommitment,
  TaskEvent,
  TaskRecord,
  TaskStatus,
} from "../types.ts";
import type { Locale } from "./onboarding/i18n.ts";
import { formatRelativeTimestamp } from "../format.ts";
import { uiText } from "../i18n.ts";
import { icons } from "../icons.ts";
import { renderTaskContinuityPanel } from "./task-continuity-panel.ts";

export type TasksWorkbenchProps = {
  locale: Locale;
  loading: boolean;
  error: string | null;
  tasks: Array<TaskRecord>;
  total: number;
  nextOffset: number | null;
  filters: TasksWorkbenchFilters;
  selectedTaskId: string | null;
  events: Array<TaskEvent>;
  commitments: Array<TaskCommitment>;
  detailsLoading: boolean;
  actionError: string | null;
  actionMessage: string | null;
  actionBusyKey: string | null;
  agentOptions: Array<{ id: string; label: string }>;
  onRefresh: () => void;
  onLoadMore: () => void;
  onFiltersChange: (patch: Partial<TasksWorkbenchFilters>) => void | Promise<void>;
  onSelectTask: (taskId: string) => void;
  onUpdateCommitment: (taskId: string, commitmentId: string, status: CommitmentStatus) => void;
  onUpdateTaskStatus: (taskId: string, status: TaskStatus) => void;
  onOpenEventDetails: (content: string, options?: { title?: string }) => void;
  onOpenSession: (sessionKey: string) => void;
};

function labelForUpdatedWindow(windowKey: TasksWorkbenchUpdatedWindow, locale: Locale): string {
  switch (windowKey) {
    case "24h":
      return uiText(locale, "Last 24h", "最近 24 小时");
    case "7d":
      return uiText(locale, "Last 7d", "最近 7 天");
    case "30d":
      return uiText(locale, "Last 30d", "最近 30 天");
    case "all":
    default:
      return uiText(locale, "Any time", "全部时间");
  }
}

export function renderTasksWorkbench(props: TasksWorkbenchProps) {
  const t = (english: string, chinese: string) => uiText(props.locale, english, chinese);
  const selectedTask =
    props.tasks.find((task) => task.taskId === props.selectedTaskId) ?? props.tasks[0] ?? null;
  const activeCount = props.tasks.filter((task) =>
    ["open", "running", "waiting-user"].includes(task.status),
  ).length;
  const waitingCount = props.tasks.filter((task) => task.status === "waiting-user").length;
  const hasMore = props.nextOffset != null;

  return html`
    <section class="card tasks-workbench">
      <div class="section-header">
        <div>
          <div class="card-title">${t("Tasks · Continuity Workbench", "任务 · 连续性工作台")}</div>
          <div class="card-sub">
            ${t(
              "Search, filter, and manage tasks across sessions, surfaces, and agents.",
              "跨会话、表面与智能体搜索、筛选并管理连续任务。",
            )}
          </div>
        </div>
        <div class="section-header__meta tasks-workbench__header-actions">
          <button class="btn btn--sm" type="button" ?disabled=${props.loading} @click=${props.onRefresh}>
            ${icons.loader}
            <span>${t("Refresh", "刷新")}</span>
          </button>
        </div>
      </div>

      <div class="page-summary-grid" style="margin-top: 18px;">
        <div class="page-summary-card">
          <div class="page-summary-label">${t("Matched", "匹配任务")}</div>
          <div class="page-summary-value">${props.total}</div>
          <div class="page-summary-sub">${t("Across current filters", "当前筛选下的总数")}</div>
        </div>
        <div class="page-summary-card">
          <div class="page-summary-label">${t("Loaded", "已加载")}</div>
          <div class="page-summary-value">${props.tasks.length}</div>
          <div class="page-summary-sub">${hasMore ? t("More pages available", "还有更多分页") : t("All visible rows loaded", "可见结果已全部加载")}</div>
        </div>
        <div class="page-summary-card">
          <div class="page-summary-label">${t("Active", "活跃任务")}</div>
          <div class="page-summary-value">${activeCount}</div>
          <div class="page-summary-sub">${t("Open, running, or waiting", "进行中、执行中或等待用户")}</div>
        </div>
        <div class="page-summary-card">
          <div class="page-summary-label">${t("Waiting user", "等待用户")}</div>
          <div class="page-summary-value">${waitingCount}</div>
          <div class="page-summary-sub">${labelForUpdatedWindow(props.filters.updatedWindow, props.locale)}</div>
        </div>
      </div>

      <div class="filters tasks-workbench__filters" style="margin-top: 18px;">
        <label class="field">
          <span>${t("Search", "搜索")}</span>
          <input
            .value=${props.filters.query}
            placeholder=${t("title, summary, session, task id", "标题、摘要、会话、任务 ID")}
            @input=${(event: Event) =>
              void props.onFiltersChange({
                query: (event.target as HTMLInputElement).value,
              })}
          />
        </label>
        <label class="field">
          <span>${t("Agent", "智能体")}</span>
          <select
            .value=${props.filters.agentScope}
            @change=${(event: Event) =>
              void props.onFiltersChange({
                agentScope: (event.target as HTMLSelectElement).value,
              })}
          >
            <option value="all">${t("All agents", "所有智能体")}</option>
            ${props.agentOptions.map(
              (agent) => html`<option value=${agent.id}>${agent.label}</option>`,
            )}
          </select>
        </label>
        <label class="field">
          <span>${t("Status", "状态")}</span>
          <select
            .value=${props.filters.status}
            @change=${(event: Event) =>
              void props.onFiltersChange({
                status: (event.target as HTMLSelectElement).value,
              })}
          >
            <option value="">${t("All statuses", "全部状态")}</option>
            <option value="open">${t("Open", "进行中")}</option>
            <option value="running">${t("Running", "执行中")}</option>
            <option value="waiting-user">${t("Waiting user", "等待用户")}</option>
            <option value="completed">${t("Completed", "已完成")}</option>
            <option value="cancelled">${t("Cancelled", "已取消")}</option>
            <option value="failed">${t("Failed", "失败")}</option>
          </select>
        </label>
        <label class="field">
          <span>${t("Surface", "表面")}</span>
          <select
            .value=${props.filters.surfaceKind}
            @change=${(event: Event) =>
              void props.onFiltersChange({
                surfaceKind: (event.target as HTMLSelectElement).value,
              })}
          >
            <option value="">${t("All surfaces", "全部表面")}</option>
            <option value="direct-chat">${t("Direct chat", "私聊")}</option>
            <option value="group-chat">${t("Group chat", "群聊")}</option>
            <option value="control-ui">${t("Control UI", "控制台")}</option>
            <option value="canvas">${t("Canvas", "画布")}</option>
            <option value="subagent">${t("Subagent", "子代理")}</option>
            <option value="cron">${t("Cron", "定时任务")}</option>
          </select>
        </label>
        <label class="field">
          <span>${t("Channel", "渠道")}</span>
          <input
            .value=${props.filters.channel}
            placeholder=${t("telegram, discord, ...", "telegram、discord 等")}
            @input=${(event: Event) =>
              void props.onFiltersChange({
                channel: (event.target as HTMLInputElement).value,
              })}
          />
        </label>
        <label class="field">
          <span>${t("Updated", "更新时间")}</span>
          <select
            .value=${props.filters.updatedWindow}
            @change=${(event: Event) =>
              void props.onFiltersChange({
                updatedWindow: (event.target as HTMLSelectElement)
                  .value as TasksWorkbenchUpdatedWindow,
              })}
          >
            <option value="all">${t("Any time", "全部时间")}</option>
            <option value="24h">${t("Last 24h", "最近 24 小时")}</option>
            <option value="7d">${t("Last 7d", "最近 7 天")}</option>
            <option value="30d">${t("Last 30d", "最近 30 天")}</option>
          </select>
        </label>
        <label class="field">
          <span>${t("Sort", "排序")}</span>
          <select
            .value=${props.filters.sort}
            @change=${(event: Event) =>
              void props.onFiltersChange({
                sort: (event.target as HTMLSelectElement).value as TasksWorkbenchFilters["sort"],
              })}
          >
            <option value="updated-desc">${t("Updated ↓", "更新时间 ↓")}</option>
            <option value="updated-asc">${t("Updated ↑", "更新时间 ↑")}</option>
            <option value="created-desc">${t("Created ↓", "创建时间 ↓")}</option>
            <option value="created-asc">${t("Created ↑", "创建时间 ↑")}</option>
          </select>
        </label>
      </div>

      ${props.error ? html`<div class="callout danger" style="margin-top: 14px;">${props.error}</div>` : nothing}

      ${
        selectedTask?.latestSessionKey
          ? html`
              <div class="tasks-workbench__jump-row">
                <div class="tasks-workbench__jump-meta">
                  <div class="tasks-workbench__jump-title">${t("Linked session", "关联会话")}</div>
                  <div class="tasks-workbench__jump-sub">
                    <code>${selectedTask.latestSessionKey}</code>
                    <span>·</span>
                    <span>${formatRelativeTimestamp(selectedTask.updatedAt)}</span>
                  </div>
                </div>
                <button
                  class="btn btn--sm"
                  type="button"
                  @click=${() => props.onOpenSession(selectedTask.latestSessionKey ?? "")}
                >
                  ${icons.messageSquare}
                  <span>${t("Open in chat", "打开关联会话")}</span>
                </button>
              </div>
            `
          : nothing
      }

      ${
        !props.loading && props.tasks.length === 0
          ? html`
              <div class="tasks-workbench__empty">
                <div class="tasks-workbench__empty-icon">${icons.link}</div>
                <div class="tasks-workbench__empty-title">
                  ${t("No tasks match the current filters", "当前筛选下没有匹配的任务")}
                </div>
                <div class="tasks-workbench__empty-sub">
                  ${t(
                    "Try broadening the filters or return to chat to create a new continuity task.",
                    "可以放宽筛选条件，或回到聊天页创建新的连续任务。",
                  )}
                </div>
              </div>
            `
          : nothing
      }

      ${
        props.tasks.length > 0
          ? html`
              <div class="tasks-workbench__panel">
                ${renderTaskContinuityPanel({
                  locale: props.locale,
                  sessionKey: selectedTask?.latestSessionKey ?? "workbench",
                  loading: props.loading,
                  error: props.error,
                  tasks: props.tasks,
                  selectedTaskId: props.selectedTaskId,
                  events: props.events,
                  commitments: props.commitments,
                  detailsLoading: props.detailsLoading,
                  actionError: props.actionError,
                  actionMessage: props.actionMessage,
                  actionBusyKey: props.actionBusyKey,
                  onRefresh: props.onRefresh,
                  onSelectTask: props.onSelectTask,
                  onUpdateCommitment: props.onUpdateCommitment,
                  onUpdateTaskStatus: props.onUpdateTaskStatus,
                  onOpenEventDetails: props.onOpenEventDetails,
                })}
              </div>
            `
          : nothing
      }

      ${
        hasMore
          ? html`
              <div class="tasks-workbench__footer">
                <button class="btn" type="button" ?disabled=${props.loading} @click=${props.onLoadMore}>
                  ${icons.loader}
                  <span>${t("Load more", "加载更多")}</span>
                </button>
              </div>
            `
          : nothing
      }

      ${props.loading && props.tasks.length > 0 ? html`<div class="callout muted">${t("Refreshing tasks...", "正在刷新任务...")}</div>` : nothing}
    </section>
  `;
}
