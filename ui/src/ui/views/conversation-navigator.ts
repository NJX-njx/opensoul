/**
 * Right-side conversation navigator.
 * Each bar = one transcript (sessionId) within the current sessionKey.
 * Shows first question as title; click switches to that transcript.
 */
import { html, nothing } from "lit";
import { repeat } from "lit/directives/repeat.js";
import type { TranscriptListEntry } from "../types.ts";
import type { Locale } from "./onboarding/i18n.ts";
import { formatRelativeTimestamp } from "../format.ts";
import { uiText } from "../i18n.ts";

const NAV_MAX_TRANSCRIPTS = 50;
const TITLE_TRUNCATE_LEN = 36;

function truncateTitle(text: string, maxLen: number): string {
  const trimmed = text.replace(/\s+/g, " ").trim();
  if (trimmed.length <= maxLen) {
    return trimmed;
  }
  return trimmed.slice(0, maxLen - 1) + "…";
}

function resolveTranscriptLabel(row: TranscriptListEntry, assistantName: string): string {
  if (row.firstQuestion?.trim()) {
    return row.firstQuestion.trim();
  }
  const prefix = row.sessionId.slice(0, 8);
  return assistantName ? `${assistantName} - ${prefix}` : prefix;
}

export type ConversationNavigatorProps = {
  locale: Locale;
  transcripts: TranscriptListEntry[];
  sessionKey: string;
  /** Current sessionId from store (active session for sending). */
  currentSessionId: string | null;
  /** SessionId being viewed (when viewing history, may differ from current). */
  viewingSessionId: string | null;
  assistantName: string;
  onSelect: (sessionId: string) => void;
  variant?: "strip" | "panel";
};

export function renderConversationNavigator(props: ConversationNavigatorProps) {
  const t = (english: string, chinese: string) => uiText(props.locale, english, chinese);
  const transcripts = props.transcripts.slice(0, NAV_MAX_TRANSCRIPTS).toReversed();
  const effectiveViewing = props.viewingSessionId ?? props.currentSessionId;

  if (transcripts.length <= 1) {
    return nothing;
  }

  if (props.variant === "panel") {
    return html`
      <div class="conversation-navigator conversation-navigator--panel">
        <div class="conversation-navigator__panel-header">
          <div class="conversation-navigator__panel-title">${t("Conversation branches", "对话分支")}</div>
          <div class="conversation-navigator__panel-sub">
            ${t("Jump between transcripts in this session.", "在当前会话的不同 transcript 之间切换。")}
          </div>
        </div>
        <div class="conversation-navigator__panel-list">
          ${repeat(
            transcripts,
            (row) => row.sessionId,
            (row) => {
              const isActive = row.sessionId === effectiveViewing;
              const fullLabel = resolveTranscriptLabel(row, props.assistantName);
              const truncated = truncateTitle(fullLabel, TITLE_TRUNCATE_LEN + 16);
              return html`
                <button
                  type="button"
                  class="conversation-navigator__panel-item ${isActive ? "conversation-navigator__panel-item--active" : ""}"
                  title=${fullLabel}
                  @click=${() => props.onSelect(row.sessionId)}
                >
                  <span class="conversation-navigator__panel-item-title">${truncated}</span>
                  <span class="conversation-navigator__panel-item-meta">
                    ${row.mtime ? formatRelativeTimestamp(row.mtime) : t("No timestamp", "无时间戳")}
                  </span>
                </button>
              `;
            },
          )}
        </div>
      </div>
    `;
  }

  return html`
    <div
      class="conversation-navigator"
      role="navigation"
      aria-label=${t("Conversation navigation", "对话导航")}
    >
      <div class="conversation-navigator__strip">
        ${repeat(
          transcripts,
          (row) => row.sessionId,
          (row) => {
            const isActive = row.sessionId === effectiveViewing;
            const fullLabel = resolveTranscriptLabel(row, props.assistantName);
            const truncated = truncateTitle(fullLabel, TITLE_TRUNCATE_LEN);

            return html`
              <button
                type="button"
                class="conversation-navigator__bar ${isActive ? "conversation-navigator__bar--active" : ""}"
                title=${fullLabel}
                aria-label=${truncated}
                aria-current=${isActive ? "true" : "false"}
                @click=${() => props.onSelect(row.sessionId)}
                @keydown=${(e: KeyboardEvent) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    props.onSelect(row.sessionId);
                  } else if (e.key === "ArrowDown") {
                    const next = (e.target as HTMLElement).nextElementSibling as HTMLElement | null;
                    if (next) {
                      e.preventDefault();
                      next.focus();
                    }
                  } else if (e.key === "ArrowUp") {
                    const prev = (e.target as HTMLElement)
                      .previousElementSibling as HTMLElement | null;
                    if (prev) {
                      e.preventDefault();
                      prev.focus();
                    }
                  }
                }}
              ></button>
            `;
          },
        )}
      </div>
      <div class="conversation-navigator__expand">
        <div class="conversation-navigator__expand-panel">
          <div class="conversation-navigator__expand-title">
            ${t("Conversations", "对话列表")}
          </div>
          <div class="conversation-navigator__expand-list">
            ${repeat(
              transcripts,
              (row) => row.sessionId,
              (row) => {
                const isActive = row.sessionId === effectiveViewing;
                const fullLabel = resolveTranscriptLabel(row, props.assistantName);
                const truncated = truncateTitle(fullLabel, TITLE_TRUNCATE_LEN);
                const hasMore = fullLabel.length > TITLE_TRUNCATE_LEN;

                return html`
                  <button
                    type="button"
                    class="conversation-navigator__expand-item ${isActive ? "conversation-navigator__expand-item--active" : ""}"
                    title=${hasMore ? fullLabel : undefined}
                    @click=${() => props.onSelect(row.sessionId)}
                  >
                    ${truncated}
                  </button>
                `;
              },
            )}
          </div>
        </div>
      </div>
    </div>
  `;
}
