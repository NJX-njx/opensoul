/**
 * Right-side conversation navigator.
 * Each bar = first question of each new conversation (session).
 * Hover expands to show full list; click switches session.
 */
import { html, nothing } from "lit";
import { repeat } from "lit/directives/repeat.js";
import type { GatewaySessionRow, SessionsListResult } from "../types.ts";
import type { Locale } from "./onboarding/i18n.ts";
import { parseAgentSessionKey } from "../../../../src/routing/session-key.js";
import { uiText } from "../i18n.ts";

const NAV_MAX_SESSIONS = 50;
const TITLE_TRUNCATE_LEN = 36;

function truncateTitle(text: string, maxLen: number): string {
  const trimmed = text.replace(/\s+/g, " ").trim();
  if (trimmed.length <= maxLen) {
    return trimmed;
  }
  return trimmed.slice(0, maxLen - 1) + "…";
}

function resolveFirstQuestionLabel(
  row: GatewaySessionRow,
  agentId: string,
  assistantName: string,
): string {
  const title =
    row.derivedTitle?.trim() ?? row.displayName?.trim() ?? row.label?.trim() ?? row.subject?.trim();
  if (title) {
    return title;
  }
  if (row.lastMessagePreview?.trim()) {
    return row.lastMessagePreview.trim();
  }
  return assistantName ? `${assistantName} - ${agentId}` : agentId;
}

export type ConversationNavigatorProps = {
  locale: Locale;
  sessions: SessionsListResult | null;
  sessionKey: string;
  assistantName: string;
  onSelect: (key: string) => void;
};

export function renderConversationNavigator(props: ConversationNavigatorProps) {
  const t = (english: string, chinese: string) => uiText(props.locale, english, chinese);
  const rawSessions = props.sessions?.sessions ?? [];
  const defaultId = "main";

  const sessions = rawSessions
    .filter((row) => {
      const label = resolveFirstQuestionLabel(
        row,
        parseAgentSessionKey(row.key)?.agentId ?? defaultId,
        props.assistantName,
      );
      return label.length > 0;
    })
    .slice(0, NAV_MAX_SESSIONS)
    .toReversed();

  if (sessions.length <= 1) {
    return nothing;
  }

  return html`
    <div
      class="conversation-navigator"
      role="navigation"
      aria-label=${t("Conversation navigation", "对话导航")}
    >
      <div class="conversation-navigator__strip">
        ${repeat(
          sessions,
          (row) => row.key,
          (row) => {
            const isActive = row.key === props.sessionKey;
            const parsed = parseAgentSessionKey(row.key);
            const agentId = parsed?.agentId ?? defaultId;
            const fullLabel = resolveFirstQuestionLabel(row, agentId, props.assistantName);
            const truncated = truncateTitle(fullLabel, TITLE_TRUNCATE_LEN);
            const totalTokens = row.totalTokens ?? (row.inputTokens ?? 0) + (row.outputTokens ?? 0);
            const isLongConversation = totalTokens > 2000;

            return html`
              <button
                type="button"
                class="conversation-navigator__bar ${isActive ? "conversation-navigator__bar--active" : ""} ${isLongConversation ? "conversation-navigator__bar--long" : ""}"
                title=${fullLabel}
                aria-label=${truncated}
                aria-current=${isActive ? "true" : "false"}
                @click=${() => props.onSelect(row.key)}
                @keydown=${(e: KeyboardEvent) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    props.onSelect(row.key);
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
              sessions,
              (row) => row.key,
              (row) => {
                const isActive = row.key === props.sessionKey;
                const parsed = parseAgentSessionKey(row.key);
                const agentId = parsed?.agentId ?? defaultId;
                const fullLabel = resolveFirstQuestionLabel(row, agentId, props.assistantName);
                const truncated = truncateTitle(fullLabel, TITLE_TRUNCATE_LEN);
                const hasMore = fullLabel.length > TITLE_TRUNCATE_LEN;

                return html`
                  <button
                    type="button"
                    class="conversation-navigator__expand-item ${isActive ? "conversation-navigator__expand-item--active" : ""}"
                    title=${hasMore ? fullLabel : undefined}
                    @click=${() => props.onSelect(row.key)}
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
