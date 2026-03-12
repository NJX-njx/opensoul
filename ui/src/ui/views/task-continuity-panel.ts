import { html, nothing } from "lit";
import { repeat } from "lit/directives/repeat.js";
import type {
  CommitmentStatus,
  TaskCommitment,
  TaskEvent,
  TaskRecord,
  TaskStatus,
  TaskSurfaceRef,
} from "../types.ts";
import type { Locale } from "./onboarding/i18n.ts";
import { clampText, formatMs, formatRelativeTimestamp } from "../format.ts";
import { uiText } from "../i18n.ts";
import { icons, renderIcon } from "../icons.ts";

function formatTaskStatus(status: string, locale: Locale): string {
  const normalized = status.trim().toLowerCase();
  switch (normalized) {
    case "open":
      return uiText(locale, "Open", "进行中");
    case "running":
      return uiText(locale, "Running", "执行中");
    case "waiting-user":
      return uiText(locale, "Waiting", "等待用户");
    case "completed":
      return uiText(locale, "Completed", "已完成");
    case "cancelled":
      return uiText(locale, "Cancelled", "已取消");
    case "failed":
      return uiText(locale, "Failed", "失败");
    default:
      return status;
  }
}

function formatCommitmentStatus(status: string, locale: Locale): string {
  const normalized = status.trim().toLowerCase();
  switch (normalized) {
    case "open":
      return uiText(locale, "Open", "待处理");
    case "done":
      return uiText(locale, "Done", "已完成");
    case "cancelled":
      return uiText(locale, "Cancelled", "已取消");
    default:
      return status;
  }
}

function surfaceIconName(surface?: TaskSurfaceRef): keyof typeof icons {
  switch (surface?.kind) {
    case "control-ui":
    case "canvas":
      return "monitor";
    case "cron":
      return "radio";
    case "subagent":
      return "zap";
    default:
      return "messageSquare";
  }
}

function formatSurfaceLabel(surface?: TaskSurfaceRef, locale?: Locale): string {
  if (!surface) {
    return locale ? uiText(locale, "Unknown surface", "未知表面") : "Unknown surface";
  }
  const normalizedKind = surface.kind.trim().toLowerCase();
  const label = surface.label?.trim();
  const channel = surface.channel?.trim();
  switch (normalizedKind) {
    case "direct-chat":
      return channel
        ? `${uiText(locale ?? "en", "Direct chat", "私聊")} · ${channel}`
        : uiText(locale ?? "en", "Direct chat", "私聊");
    case "group-chat":
      return channel
        ? `${uiText(locale ?? "en", "Group chat", "群聊")} · ${channel}`
        : uiText(locale ?? "en", "Group chat", "群聊");
    case "control-ui":
      return uiText(locale ?? "en", "Control UI", "控制台");
    case "canvas":
      return label
        ? `${uiText(locale ?? "en", "Canvas", "画布")} · ${label}`
        : uiText(locale ?? "en", "Canvas", "画布");
    case "cron":
      return label
        ? `${uiText(locale ?? "en", "Cron", "定时任务")} · ${label}`
        : uiText(locale ?? "en", "Cron", "定时任务");
    case "subagent":
      return label
        ? `${uiText(locale ?? "en", "Subagent", "子代理")} · ${label}`
        : uiText(locale ?? "en", "Subagent", "子代理");
    default:
      return label || channel || surface.kind;
  }
}

function surfaceKey(surface?: TaskSurfaceRef): string {
  if (!surface) {
    return "unknown";
  }
  return [surface.kind, surface.channel, surface.label, surface.nodeId].filter(Boolean).join(":");
}

function collectSurfaceTrail(task: TaskRecord, events: Array<TaskEvent>): Array<TaskSurfaceRef> {
  const seen = new Set<string>();
  const ordered: Array<TaskSurfaceRef> = [];
  const pushSurface = (surface?: TaskSurfaceRef) => {
    if (!surface) {
      return;
    }
    const key = surfaceKey(surface);
    if (seen.has(key)) {
      return;
    }
    seen.add(key);
    ordered.push(surface);
  };
  pushSurface(task.sourceSurface);
  for (const event of events.toReversed()) {
    pushSurface(event.surface);
  }
  pushSurface(task.currentSurface);
  return ordered;
}

function formatTaskTitle(task: TaskRecord, locale: Locale): string {
  const title = task.title?.trim() || task.summary?.trim();
  if (title) {
    return title;
  }
  return `${uiText(locale, "Task", "任务")} ${task.taskId.slice(0, 8)}`;
}

function formatEventHeadline(event: TaskEvent, locale: Locale): string {
  if (event.kind.startsWith("handoff.")) {
    return uiText(locale, "Surface handoff", "表面切换");
  }
  if (event.kind === "user-message") {
    return uiText(locale, "User message", "用户消息");
  }
  if (event.stream === "assistant") {
    return uiText(locale, "Assistant turn", "助手输出");
  }
  if (event.kind.startsWith("subagent.")) {
    return uiText(locale, "Subagent", "子代理");
  }
  if (event.kind.startsWith("cron")) {
    return uiText(locale, "Scheduled run", "定时执行");
  }
  return event.kind;
}

function eventIcon(event: TaskEvent): keyof typeof icons {
  if (event.kind.startsWith("handoff.")) {
    return "link";
  }
  if (event.stream === "assistant") {
    return "fileText";
  }
  if (event.kind.startsWith("subagent.")) {
    return "zap";
  }
  if (event.kind.startsWith("cron")) {
    return "radio";
  }
  return "messageSquare";
}

function formatEventMeta(event: TaskEvent, locale: Locale): string {
  const parts = [
    event.stream ? `${event.stream}${event.phase ? `/${event.phase}` : ""}` : undefined,
    event.surface ? formatSurfaceLabel(event.surface, locale) : undefined,
    formatRelativeTimestamp(event.createdAt),
  ].filter((value): value is string => Boolean(value));
  return parts.join(" · ");
}

function buildEventSidebarMarkdown(event: TaskEvent, locale: Locale): string {
  const parts = [
    `# ${formatEventHeadline(event, locale)}`,
    "",
    `- ${uiText(locale, "Kind", "类型")}: \`${event.kind}\``,
    `- ${uiText(locale, "When", "时间")}: ${formatMs(event.createdAt)} (${formatRelativeTimestamp(event.createdAt)})`,
  ];
  if (event.stream) {
    parts.push(`- ${uiText(locale, "Stream", "流")}: \`${event.stream}\``);
  }
  if (event.phase) {
    parts.push(`- ${uiText(locale, "Phase", "阶段")}: \`${event.phase}\``);
  }
  if (event.surface) {
    parts.push(
      `- ${uiText(locale, "Surface", "表面")}: ${formatSurfaceLabel(event.surface, locale)}`,
    );
  }
  if (event.sessionKey) {
    parts.push(`- ${uiText(locale, "Session", "会话")}: \`${event.sessionKey}\``);
  }
  if (event.runId) {
    parts.push(`- ${uiText(locale, "Run", "运行")}: \`${event.runId}\``);
  }
  if (event.summary?.trim()) {
    parts.push("", `## ${uiText(locale, "Summary", "摘要")}`, "", event.summary.trim());
  }
  if (event.payload && Object.keys(event.payload).length > 0) {
    parts.push(
      "",
      `## ${uiText(locale, "Payload", "载荷")}`,
      "",
      "```json",
      JSON.stringify(event.payload, null, 2),
      "```",
    );
  }
  return parts.join("\n");
}

function buildCommitmentBusyKey(commitmentId: string, status: CommitmentStatus): string {
  return `commitment:${commitmentId}:${status}`;
}

function buildTaskBusyKey(taskId: string, status: TaskStatus): string {
  return `task:${taskId}:${status}`;
}

function resolveTaskAction(
  task: TaskRecord,
  locale: Locale,
): {
  nextStatus: TaskStatus;
  label: string;
  pendingLabel: string;
} | null {
  switch (task.status) {
    case "open":
    case "running":
    case "waiting-user":
      return {
        nextStatus: "completed",
        label: uiText(locale, "Close", "关闭"),
        pendingLabel: uiText(locale, "Closing...", "正在关闭..."),
      };
    case "failed":
    case "completed":
    case "cancelled":
      return {
        nextStatus: "open",
        label: uiText(locale, "Reopen", "重新打开"),
        pendingLabel: uiText(locale, "Reopening...", "正在重新打开..."),
      };
    default:
      return null;
  }
}

function readHandoffUrl(event: TaskEvent): string | null {
  const payload = event.payload;
  if (!payload || typeof payload !== "object") {
    return null;
  }
  const urlValue = (payload as Record<string, unknown>).url;
  return typeof urlValue === "string" && urlValue.trim() ? urlValue.trim() : null;
}

export type TaskContinuityPanelProps = {
  locale: Locale;
  sessionKey: string;
  loading: boolean;
  error: string | null;
  tasks: Array<TaskRecord>;
  selectedTaskId: string | null;
  events: Array<TaskEvent>;
  commitments: Array<TaskCommitment>;
  detailsLoading: boolean;
  actionError: string | null;
  actionMessage: string | null;
  actionBusyKey: string | null;
  onRefresh: () => void;
  onSelectTask: (taskId: string) => void;
  onUpdateCommitment: (taskId: string, commitmentId: string, status: CommitmentStatus) => void;
  onUpdateTaskStatus: (taskId: string, status: TaskStatus) => void;
  onOpenEventDetails: (content: string, options?: { title?: string }) => void;
};

export function renderTaskContinuityPanel(props: TaskContinuityPanelProps) {
  const t = (english: string, chinese: string) => uiText(props.locale, english, chinese);
  const selectedTask =
    props.tasks.find((task) => task.taskId === props.selectedTaskId) ?? props.tasks[0] ?? null;
  const selectedEvents = props.events.slice(0, 12);
  const selectedCommitments = props.commitments.slice(0, 8);
  const surfaceTrail = selectedTask ? collectSurfaceTrail(selectedTask, props.events) : [];
  const taskAction = selectedTask ? resolveTaskAction(selectedTask, props.locale) : null;
  const handoffEvents = props.events
    .filter((event) => event.kind.startsWith("handoff."))
    .slice(0, 4);

  return html`
    <section class="task-continuity-panel">
      <div class="task-continuity-panel__header">
        <div>
          <div class="task-continuity-panel__eyebrow">${t("Task continuity", "任务连续性")}</div>
          <div class="task-continuity-panel__title">
            ${icons.link}
            <span>${t("One task, many surfaces", "一个任务，多种表面")}</span>
          </div>
          <div class="task-continuity-panel__sub">
            ${t(
              "Trace the same task across chat, Control UI, canvas, subagents, and follow-ups.",
              "在聊天、控制台、画布、子代理与后续执行之间追踪同一个任务。",
            )}
          </div>
        </div>
        <button class="btn btn--sm" type="button" @click=${props.onRefresh}>
          ${icons.loader}
          <span>${t("Refresh", "刷新")}</span>
        </button>
      </div>

      ${
        props.loading && props.tasks.length === 0
          ? html`<div class="callout muted">${t("Loading task continuity...", "正在加载任务连续性...")}</div>`
          : nothing
      }

      ${props.error ? html`<div class="callout danger">${props.error}</div>` : nothing}
      ${props.actionError ? html`<div class="callout danger">${props.actionError}</div>` : nothing}
      ${
        !props.actionError && props.actionMessage
          ? html`<div class="callout success">${props.actionMessage}</div>`
          : nothing
      }

      ${
        !props.loading && props.tasks.length === 0
          ? html`
              <div class="task-continuity-panel__empty">
                <div class="task-continuity-panel__empty-icon">${icons.messageSquare}</div>
                <div class="task-continuity-panel__empty-title">
                  ${t("No continuity data yet", "还没有连续性数据")}
                </div>
                <div class="task-continuity-panel__empty-sub">
                  ${t(
                    "Start or continue a task in this session to see the cross-surface timeline appear here.",
                    "在当前会话里开始或继续一个任务后，这里会出现跨表面的连续轨迹。",
                  )}
                </div>
              </div>
            `
          : nothing
      }

      ${
        props.tasks.length > 0
          ? html`
              <div class="task-continuity-panel__task-list" role="tablist" aria-label=${t("Tasks", "任务")}>
                ${repeat(
                  props.tasks,
                  (task) => task.taskId,
                  (task) => {
                    const isActive = selectedTask?.taskId === task.taskId;
                    return html`
                      <button
                        type="button"
                        class="task-continuity-card ${isActive ? "task-continuity-card--active" : ""}"
                        aria-pressed=${isActive ? "true" : "false"}
                        @click=${() => props.onSelectTask(task.taskId)}
                      >
                        <div class="task-continuity-card__title-row">
                          <span class="task-continuity-card__title">${clampText(formatTaskTitle(task, props.locale), 58)}</span>
                          <span class="task-continuity-status task-continuity-status--${task.status.trim().toLowerCase()}">
                            ${formatTaskStatus(task.status, props.locale)}
                          </span>
                        </div>
                        <div class="task-continuity-card__summary">
                          ${task.summary?.trim() || t("No summary yet", "还没有摘要")}
                        </div>
                        <div class="task-continuity-card__meta">
                          <span>${formatSurfaceLabel(task.currentSurface, props.locale)}</span>
                          <span>${formatRelativeTimestamp(task.updatedAt)}</span>
                        </div>
                      </button>
                    `;
                  },
                )}
              </div>
            `
          : nothing
      }

      ${
        selectedTask
          ? html`
              <div class="task-continuity-panel__summary-card">
                <div class="task-continuity-panel__summary-top">
                  <div>
                    <div class="task-continuity-panel__task-title">${formatTaskTitle(selectedTask, props.locale)}</div>
                    <div class="task-continuity-panel__task-meta">
                      <span class="pill">${formatSurfaceLabel(selectedTask.currentSurface, props.locale)}</span>
                      <span class="pill">${t("Updated", "更新于")} ${formatRelativeTimestamp(selectedTask.updatedAt)}</span>
                    </div>
                  </div>
                  <span class="task-continuity-status task-continuity-status--${selectedTask.status.trim().toLowerCase()}">
                    ${formatTaskStatus(selectedTask.status, props.locale)}
                  </span>
                </div>
                ${
                  selectedTask.summary?.trim()
                    ? html`<div class="task-continuity-panel__task-summary">${selectedTask.summary.trim()}</div>`
                    : nothing
                }
                <div class="task-continuity-panel__stats">
                  <div class="task-continuity-panel__stat">
                    <span>${t("Events", "事件")}</span>
                    <strong>${props.events.length}</strong>
                  </div>
                  <div class="task-continuity-panel__stat">
                    <span>${t("Commitments", "承诺")}</span>
                    <strong>${props.commitments.length}</strong>
                  </div>
                  <div class="task-continuity-panel__stat">
                    <span>${t("Touched surfaces", "经过表面")}</span>
                    <strong>${surfaceTrail.length}</strong>
                  </div>
                </div>
                ${
                  taskAction
                    ? html`
                        <div class="task-continuity-panel__summary-actions">
                          <button
                            class="btn btn--sm"
                            type="button"
                            ?disabled=${Boolean(props.actionBusyKey)}
                            @click=${() =>
                              props.onUpdateTaskStatus(selectedTask.taskId, taskAction.nextStatus)}
                          >
                            ${
                              props.actionBusyKey ===
                              buildTaskBusyKey(selectedTask.taskId, taskAction.nextStatus)
                                ? icons.loader
                                : nothing
                            }
                            <span>
                              ${
                                props.actionBusyKey ===
                                buildTaskBusyKey(selectedTask.taskId, taskAction.nextStatus)
                                  ? taskAction.pendingLabel
                                  : taskAction.label
                              }
                            </span>
                          </button>
                        </div>
                      `
                    : nothing
                }
              </div>

              <div class="task-continuity-panel__section">
                <div class="task-continuity-panel__section-title">${t("Surface track", "表面轨迹")}</div>
                <div class="task-continuity-panel__surface-track">
                  ${
                    surfaceTrail.length > 0
                      ? repeat(
                          surfaceTrail,
                          (surface) => surfaceKey(surface),
                          (surface, index) => html`
                            <span class="task-continuity-surface">
                              ${renderIcon(surfaceIconName(surface), "task-continuity-surface__icon")}
                              <span>${formatSurfaceLabel(surface, props.locale)}</span>
                            </span>
                            ${
                              index < surfaceTrail.length - 1
                                ? html`
                                    <span class="task-continuity-surface__arrow">→</span>
                                  `
                                : nothing
                            }
                          `,
                        )
                      : html`<div class="callout muted">${t("No surface hops recorded yet.", "还没有记录到表面切换。")}</div>`
                  }
                </div>
                ${
                  handoffEvents.length > 0
                    ? html`
                        <div class="task-continuity-panel__handoffs">
                          ${repeat(
                            handoffEvents,
                            (event) => event.eventId,
                            (event) => {
                              const handoffUrl = readHandoffUrl(event);
                              return html`
                                <div class="task-continuity-handoff-row">
                                  <button
                                    type="button"
                                    class="task-continuity-handoff"
                                    @click=${() =>
                                      props.onOpenEventDetails(
                                        buildEventSidebarMarkdown(event, props.locale),
                                        {
                                          title: t("Surface handoff", "表面切换"),
                                        },
                                      )}
                                  >
                                    ${icons.link}
                                    <span>
                                      ${event.summary?.trim() || formatEventHeadline(event, props.locale)}
                                    </span>
                                    <span class="task-continuity-handoff__time">
                                      ${formatRelativeTimestamp(event.createdAt)}
                                    </span>
                                  </button>
                                  ${
                                    handoffUrl
                                      ? html`
                                          <button
                                            type="button"
                                            class="btn btn--sm task-continuity-handoff-row__action"
                                            @click=${() => window.open(handoffUrl, "_blank", "noopener,noreferrer")}
                                          >
                                            <span>${t("Open in Control UI", "在控制台中打开")}</span>
                                          </button>
                                        `
                                      : nothing
                                  }
                                </div>
                              `;
                            },
                          )}
                        </div>
                      `
                    : nothing
                }
              </div>

              <div class="task-continuity-panel__section">
                <div class="task-continuity-panel__section-title">${t("Commitments", "承诺")}</div>
                ${
                  props.detailsLoading && selectedCommitments.length === 0
                    ? html`<div class="callout muted">${t("Loading commitments...", "正在加载承诺...")}</div>`
                    : selectedCommitments.length > 0
                      ? html`
                          <div class="task-continuity-panel__commitments">
                            ${repeat(
                              selectedCommitments,
                              (commitment) => commitment.commitmentId,
                              (commitment) => html`
                                <div class="task-continuity-commitment">
                                  <div class="task-continuity-commitment__title-row">
                                    <span class="task-continuity-commitment__title">${commitment.title}</span>
                                    <span
                                      class="task-continuity-commitment__status task-continuity-commitment__status--${commitment.status.trim().toLowerCase()}"
                                    >
                                      ${formatCommitmentStatus(commitment.status, props.locale)}
                                    </span>
                                  </div>
                                  ${
                                    commitment.detail?.trim()
                                      ? html`
                                          <div class="task-continuity-commitment__detail">
                                            ${commitment.detail.trim()}
                                          </div>
                                        `
                                      : nothing
                                  }
                                  <div class="task-continuity-commitment__meta">
                                    ${commitment.kind?.trim() ? html`<span>${commitment.kind}</span>` : nothing}
                                    ${
                                      commitment.dueAt
                                        ? html`<span>${t("Due", "截止")} ${formatRelativeTimestamp(commitment.dueAt)}</span>`
                                        : nothing
                                    }
                                  </div>
                                  <div class="task-continuity-commitment__actions">
                                    ${
                                      commitment.status === "open"
                                        ? html`
                                            <button
                                              class="btn btn--sm"
                                              type="button"
                                              ?disabled=${Boolean(props.actionBusyKey)}
                                              @click=${() =>
                                                props.onUpdateCommitment(
                                                  commitment.taskId,
                                                  commitment.commitmentId,
                                                  "done",
                                                )}
                                            >
                                              ${
                                                props.actionBusyKey ===
                                                buildCommitmentBusyKey(
                                                  commitment.commitmentId,
                                                  "done",
                                                )
                                                  ? icons.loader
                                                  : nothing
                                              }
                                              <span>
                                                ${
                                                  props.actionBusyKey ===
                                                  buildCommitmentBusyKey(
                                                    commitment.commitmentId,
                                                    "done",
                                                  )
                                                    ? t("Saving...", "保存中...")
                                                    : t("Done", "完成")
                                                }
                                              </span>
                                            </button>
                                            <button
                                              class="btn btn--sm"
                                              type="button"
                                              ?disabled=${Boolean(props.actionBusyKey)}
                                              @click=${() =>
                                                props.onUpdateCommitment(
                                                  commitment.taskId,
                                                  commitment.commitmentId,
                                                  "cancelled",
                                                )}
                                            >
                                              ${
                                                props.actionBusyKey ===
                                                buildCommitmentBusyKey(
                                                  commitment.commitmentId,
                                                  "cancelled",
                                                )
                                                  ? icons.loader
                                                  : nothing
                                              }
                                              <span>
                                                ${
                                                  props.actionBusyKey ===
                                                  buildCommitmentBusyKey(
                                                    commitment.commitmentId,
                                                    "cancelled",
                                                  )
                                                    ? t("Saving...", "保存中...")
                                                    : t("Cancel", "取消")
                                                }
                                              </span>
                                            </button>
                                          `
                                        : html`
                                            <button
                                              class="btn btn--sm"
                                              type="button"
                                              ?disabled=${Boolean(props.actionBusyKey)}
                                              @click=${() =>
                                                props.onUpdateCommitment(
                                                  commitment.taskId,
                                                  commitment.commitmentId,
                                                  "open",
                                                )}
                                            >
                                              ${
                                                props.actionBusyKey ===
                                                buildCommitmentBusyKey(
                                                  commitment.commitmentId,
                                                  "open",
                                                )
                                                  ? icons.loader
                                                  : nothing
                                              }
                                              <span>
                                                ${
                                                  props.actionBusyKey ===
                                                  buildCommitmentBusyKey(
                                                    commitment.commitmentId,
                                                    "open",
                                                  )
                                                    ? t("Saving...", "保存中...")
                                                    : t("Reopen", "重新打开")
                                                }
                                              </span>
                                            </button>
                                          `
                                    }
                                  </div>
                                </div>
                              `,
                            )}
                          </div>
                        `
                      : html`
                          <div class="callout muted">
                            ${t(
                              "No commitments recorded for this task yet.",
                              "这个任务还没有记录承诺项。",
                            )}
                          </div>
                        `
                }
              </div>

              <div class="task-continuity-panel__section">
                <div class="task-continuity-panel__section-title">${t("Event timeline", "事件时间线")}</div>
                ${
                  props.detailsLoading && selectedEvents.length === 0
                    ? html`<div class="callout muted">${t("Loading events...", "正在加载事件...")}</div>`
                    : selectedEvents.length > 0
                      ? html`
                          <div class="task-continuity-panel__timeline">
                            ${repeat(
                              selectedEvents,
                              (event) => event.eventId,
                              (event) => html`
                                <button
                                  type="button"
                                  class="task-continuity-event"
                                  @click=${() =>
                                    props.onOpenEventDetails(
                                      buildEventSidebarMarkdown(event, props.locale),
                                      {
                                        title: t("Task event", "任务事件"),
                                      },
                                    )}
                                >
                                  <span class="task-continuity-event__icon">
                                    ${renderIcon(eventIcon(event), "task-continuity-event__icon-svg")}
                                  </span>
                                  <span class="task-continuity-event__body">
                                    <span class="task-continuity-event__headline">
                                      ${formatEventHeadline(event, props.locale)}
                                    </span>
                                    <span class="task-continuity-event__summary">
                                      ${event.summary?.trim() || t("Open event details", "查看事件详情")}
                                    </span>
                                    <span class="task-continuity-event__meta">
                                      ${formatEventMeta(event, props.locale)}
                                    </span>
                                  </span>
                                </button>
                              `,
                            )}
                          </div>
                        `
                      : html`
                          <div class="callout muted">
                            ${t(
                              "No continuity events have been captured for this task yet.",
                              "这个任务还没有捕获到连续性事件。",
                            )}
                          </div>
                        `
                }
              </div>
            `
          : nothing
      }
    </section>
  `;
}
