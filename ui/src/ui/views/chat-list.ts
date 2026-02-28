import { html, nothing } from "lit";
import { repeat } from "lit/directives/repeat.js";
import type {
  AgentsListResult,
  AgentIdentityResult,
  GatewaySessionRow,
  SessionsListResult,
} from "../types.ts";
import type { Locale } from "./onboarding/i18n.ts";
import { parseAgentSessionKey } from "../../../../src/routing/session-key.js";
import { uiText } from "../i18n.ts";
import { icons } from "../icons.ts";
import { normalizeBasePath } from "../navigation.ts";

export type ChatListProps = {
  locale: Locale;
  sessions: SessionsListResult | null;
  loading: boolean;
  selectedKey: string;
  basePath: string;
  mainSessionKey: string | null;
  /** Agent identity by agentId, for resolving agent name in list */
  agentIdentityById: Record<string, AgentIdentityResult>;
  /** Agents list for resolving agent name from config */
  agentsList: AgentsListResult | null;
  /** Fallback assistant name (e.g. for main agent when identity not loaded) */
  assistantName: string;
  /** Width in px for resizable sidebar (default 280) */
  width?: number;
  onSelect: (key: string) => void;
};

const PREVIEW_MAX_LEN = 40;

function formatTime(ts: number | null | undefined): string {
  if (!ts || !Number.isFinite(ts)) {
    return "";
  }
  const d = new Date(ts);
  const now = new Date();
  const sameDay =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();
  if (sameDay) {
    return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  }
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday =
    d.getDate() === yesterday.getDate() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getFullYear() === yesterday.getFullYear();
  if (isYesterday) {
    return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  }
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function truncatePreview(text: string | undefined | null): string {
  if (!text || typeof text !== "string") {
    return "";
  }
  const trimmed = text.replace(/\s+/g, " ").trim();
  if (trimmed.length <= PREVIEW_MAX_LEN) {
    return trimmed;
  }
  return trimmed.slice(0, PREVIEW_MAX_LEN - 1) + "…";
}

function buildAvatarUrl(basePath: string, sessionKey: string): string {
  const parsed = parseAgentSessionKey(sessionKey);
  const agentId = parsed?.agentId ?? "main";
  const base = normalizeBasePath(basePath);
  const encoded = encodeURIComponent(agentId);
  return base ? `${base}/avatar/${encoded}` : `/avatar/${encoded}`;
}

function resolveSessionTitle(
  row: GatewaySessionRow,
  agentId: string,
  agentIdentityById: Record<string, AgentIdentityResult>,
  agentsList: AgentsListResult | null,
  assistantName: string,
): string {
  if (row.kind === "direct") {
    const identity = agentIdentityById[agentId];
    if (identity?.name?.trim()) {
      return identity.name.trim();
    }
    const agent = agentsList?.agents?.find((a) => a.id === agentId);
    const agentName = agent?.identity?.name?.trim() ?? agent?.name?.trim();
    if (agentName) {
      return agentName;
    }
    if (agentId === "main" && assistantName?.trim()) {
      return assistantName.trim();
    }
  }
  return (
    row.derivedTitle?.trim() ??
    row.displayName?.trim() ??
    row.label?.trim() ??
    row.subject?.trim() ??
    row.key
  );
}

export function renderChatList(props: ChatListProps) {
  const t = (english: string, chinese: string) => uiText(props.locale, english, chinese);
  const sessions = props.sessions?.sessions ?? [];
  const isLoading = props.loading;

  const mainKey = props.mainSessionKey ?? "main";
  const width = props.width ?? 280;

  return html`
    <aside class="chat-list" style="width: ${width}px; min-width: ${width}px;">
      <div class="chat-list__header">
        <h2 class="chat-list__title">${t("Chats", "聊天")}</h2>
        <button
          type="button"
          class="chat-list__new-btn"
          @click=${() => props.onSelect(mainKey)}
          title=${t("New chat", "新建聊天")}
        >
          ${icons.plus}
          <span>${t("New", "新建")}</span>
        </button>
      </div>
      <div class="chat-list__body">
        ${
          isLoading
            ? html`
              <div class="chat-list__loading">
                ${icons.loader}
                <span>${t("Loading...", "加载中...")}</span>
              </div>
            `
            : sessions.length === 0
              ? html`
                <div class="chat-list__empty">
                  ${t("No conversations yet", "暂无会话")}
                </div>
              `
              : repeat(
                  sessions,
                  (row) => row.key,
                  (row) => {
                    const isSelected = row.key === props.selectedKey;
                    const parsed = parseAgentSessionKey(row.key);
                    const agentId = parsed?.agentId ?? "main";
                    const title = resolveSessionTitle(
                      row,
                      agentId,
                      props.agentIdentityById,
                      props.agentsList,
                      props.assistantName,
                    );
                    const preview = truncatePreview(row.lastMessagePreview);
                    const timeStr = formatTime(row.updatedAt);
                    const avatarUrl = buildAvatarUrl(props.basePath, row.key);
                    const isGroup = row.kind === "group";

                    return html`
                    <button
                      type="button"
                      class="chat-list-item ${isSelected ? "chat-list-item--selected" : ""}"
                      @click=${() => props.onSelect(row.key)}
                    >
                      <div class="chat-list-item__avatar">
                        ${
                          isGroup
                            ? html`
                                <div class="chat-list-item__avatar-group" aria-hidden="true">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                  </svg>
                                </div>
                              `
                            : html`
                              <img
                                src=${avatarUrl}
                                alt=""
                                class="chat-list-item__avatar-img"
                                @error=${(e: Event) => {
                                  const el = e.target as HTMLImageElement;
                                  el.style.display = "none";
                                  const fallback = el.nextElementSibling;
                                  if (fallback) {
                                    (fallback as HTMLElement).style.display = "flex";
                                  }
                                }}
                              />
                              <span class="chat-list-item__avatar-fallback" style="display: none;">
                                ${title.slice(0, 1).toUpperCase()}
                              </span>
                            `
                        }
                      </div>
                      <div class="chat-list-item__content">
                        <div class="chat-list-item__row">
                          <span class="chat-list-item__name">${title}</span>
                          ${
                            timeStr
                              ? html`<span class="chat-list-item__time">${timeStr}</span>`
                              : nothing
                          }
                        </div>
                        ${
                          preview
                            ? html`
                              <div class="chat-list-item__preview">${preview}</div>
                            `
                            : nothing
                        }
                      </div>
                    </button>
                  `;
                  },
                )
        }
      </div>
    </aside>
  `;
}
