import { html, nothing } from "lit";
import { repeat } from "lit/directives/repeat.js";
import type { AppViewState } from "./app-view-state.ts";
import type { ThemeTransitionContext } from "./theme-transition.ts";
import type { ThemeMode } from "./theme.ts";
import type { SessionsListResult } from "./types.ts";
import { refreshChat } from "./app-chat.ts";
import { syncUrlWithSessionKey } from "./app-settings.ts";
import { OpenSoulApp } from "./app.ts";
import { ChatState, loadChatHistory } from "./controllers/chat.ts";
import { uiText } from "./i18n.ts";
import { icons } from "./icons.ts";
import {
  TAB_GROUPS,
  iconForTab,
  navHintForTab,
  pathForTab,
  titleForTab,
  type Tab,
} from "./navigation.ts";

export function renderTab(state: AppViewState, tab: Tab) {
  const href = pathForTab(tab, state.basePath);
  const tabTitle = titleForTab(tab, state.uiLocale);
  const tabHint = navHintForTab(tab, state.uiLocale);
  return html`
    <a
      href=${href}
      class="nav-item ${state.tab === tab ? "active" : ""}"
      @click=${(event: MouseEvent) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }
        event.preventDefault();
        state.setTab(tab);
      }}
      title=${tabTitle}
    >
      <span class="nav-item__icon" aria-hidden="true">${icons[iconForTab(tab)]}</span>
      <span class="nav-item__body">
        <span class="nav-item__text">${tabTitle}</span>
        ${tabHint ? html`<span class="nav-item__hint">${tabHint}</span>` : nothing}
      </span>
      ${
        state.tab === tab
          ? html`
              <span class="nav-item__active-dot" aria-hidden="true"></span>
            `
          : nothing
      }
    </a>
  `;
}

export function renderOperateZoomControl(state: AppViewState) {
  const operateTabs = TAB_GROUPS.find((group) => group.label === "Operate")?.tabs ?? [];
  if (!operateTabs.includes(state.tab)) {
    return nothing;
  }
  const t = (english: string, chinese: string) => uiText(state.uiLocale, english, chinese);
  const minZoom = 0.5;
  const maxZoom = 2.5;
  const step = 0.1;
  const zoomLevel =
    typeof state.settings.operateZoomLevel === "number" ? state.settings.operateZoomLevel : 1;
  const clamp = (value: number) => Math.min(maxZoom, Math.max(minZoom, value));
  const applyZoom = (value: number) => {
    const normalized = Math.round(clamp(value) * 10) / 10;
    state.applySettings({ ...state.settings, operateZoomLevel: normalized });
  };
  return html`
    <div class="nav-zoom-control">
      <button
        class="nav-zoom-control__btn"
        title=${t("Zoom Out", "缩小")}
        @click=${() => applyZoom(zoomLevel - step)}
        aria-label=${t("Zoom Out", "缩小")}
      >
        -
      </button>
      <input
        class="nav-zoom-control__slider"
        type="range"
        min=${minZoom}
        max=${maxZoom}
        step=${step}
        .value=${String(zoomLevel)}
        @input=${(event: Event) => {
          const next = Number((event.currentTarget as HTMLInputElement).value);
          if (Number.isFinite(next)) {
            applyZoom(next);
          }
        }}
        @wheel=${(event: WheelEvent) => {
          event.preventDefault();
          const delta = event.deltaY > 0 ? -step : step;
          applyZoom(zoomLevel + delta);
        }}
      />
      <button
        class="nav-zoom-control__btn"
        title=${t("Zoom In", "放大")}
        @click=${() => applyZoom(zoomLevel + step)}
        aria-label=${t("Zoom In", "放大")}
      >
        +
      </button>
    </div>
  `;
}

export function renderChatControls(state: AppViewState) {
  const t = (english: string, chinese: string) => uiText(state.uiLocale, english, chinese);
  const mainSessionKey = resolveMainSessionKey(state.hello, state.sessionsResult);
  const sessionOptions = resolveSessionOptions(
    state.sessionKey,
    state.sessionsResult,
    mainSessionKey,
  );
  const disableThinkingToggle = state.onboarding;
  const disableFocusToggle = state.onboarding;
  const showThinking = state.onboarding ? false : state.settings.chatShowThinking;
  const focusActive = state.onboarding ? true : state.settings.chatFocusMode;
  // Refresh icon
  const refreshIcon = html`
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path>
      <path d="M21 3v5h-5"></path>
    </svg>
  `;
  const focusIcon = html`
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M4 7V4h3"></path>
      <path d="M20 7V4h-3"></path>
      <path d="M4 17v3h3"></path>
      <path d="M20 17v3h-3"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  `;
  return html`
    <div class="chat-controls">
      <label class="field chat-controls__session">
        <select
          .value=${state.sessionKey}
          ?disabled=${!state.connected}
          @change=${(e: Event) => {
            const next = (e.target as HTMLSelectElement).value;
            state.sessionKey = next;
            state.chatMessage = "";
            state.chatStream = null;
            (state as unknown as OpenSoulApp).chatStreamStartedAt = null;
            state.chatRunId = null;
            (state as unknown as OpenSoulApp).resetToolStream();
            (state as unknown as OpenSoulApp).resetChatScroll();
            state.applySettings({
              ...state.settings,
              sessionKey: next,
              lastActiveSessionKey: next,
            });
            void state.loadAssistantIdentity();
            syncUrlWithSessionKey(
              state as unknown as Parameters<typeof syncUrlWithSessionKey>[0],
              next,
              true,
            );
            void loadChatHistory(state as unknown as ChatState);
          }}
        >
          ${repeat(
            sessionOptions,
            (entry) => entry.key,
            (entry) =>
              html`<option value=${entry.key}>
                ${entry.displayName ?? entry.key}
              </option>`,
          )}
        </select>
      </label>
      <button
        class="btn btn--sm btn--icon"
        ?disabled=${state.chatLoading || !state.connected}
        @click=${async () => {
          const app = state as unknown as OpenSoulApp;
          app.chatManualRefreshInFlight = true;
          app.chatNewMessagesBelow = false;
          await app.updateComplete;
          app.resetToolStream();
          try {
            await refreshChat(state as unknown as Parameters<typeof refreshChat>[0], {
              scheduleScroll: false,
            });
            app.scrollToBottom({ smooth: true });
          } finally {
            requestAnimationFrame(() => {
              app.chatManualRefreshInFlight = false;
              app.chatNewMessagesBelow = false;
            });
          }
        }}
        title=${t("Refresh chat data", "刷新聊天数据")}
      >
        ${refreshIcon}
      </button>
      <span class="chat-controls__separator">|</span>
      <button
        class="btn btn--sm btn--icon ${showThinking ? "active" : ""}"
        ?disabled=${disableThinkingToggle}
        @click=${() => {
          if (disableThinkingToggle) {
            return;
          }
          state.applySettings({
            ...state.settings,
            chatShowThinking: !state.settings.chatShowThinking,
          });
        }}
        aria-pressed=${showThinking}
        title=${
          disableThinkingToggle
            ? t("Disabled during onboarding", "引导期间不可用")
            : t("Toggle assistant thinking/working output", "切换助手思考/执行输出")
        }
      >
        ${icons.brain}
      </button>
      <button
        class="btn btn--sm btn--icon ${focusActive ? "active" : ""}"
        ?disabled=${disableFocusToggle}
        @click=${() => {
          if (disableFocusToggle) {
            return;
          }
          state.applySettings({
            ...state.settings,
            chatFocusMode: !state.settings.chatFocusMode,
          });
        }}
        aria-pressed=${focusActive}
        title=${
          disableFocusToggle
            ? t("Disabled during onboarding", "引导期间不可用")
            : t("Toggle focus mode (hide sidebar + page header)", "切换专注模式（隐藏侧栏和页头）")
        }
      >
        ${focusIcon}
      </button>
    </div>
  `;
}

type SessionDefaultsSnapshot = {
  mainSessionKey?: string;
  mainKey?: string;
};

function resolveMainSessionKey(
  hello: AppViewState["hello"],
  sessions: SessionsListResult | null,
): string | null {
  const snapshot = hello?.snapshot as { sessionDefaults?: SessionDefaultsSnapshot } | undefined;
  const mainSessionKey = snapshot?.sessionDefaults?.mainSessionKey?.trim();
  if (mainSessionKey) {
    return mainSessionKey;
  }
  const mainKey = snapshot?.sessionDefaults?.mainKey?.trim();
  if (mainKey) {
    return mainKey;
  }
  if (sessions?.sessions?.some((row) => row.key === "main")) {
    return "main";
  }
  return null;
}

function resolveSessionDisplayName(key: string, row?: SessionsListResult["sessions"][number]) {
  const label = row?.label?.trim() || "";
  const displayName = row?.displayName?.trim() || "";
  if (label && label !== key) {
    return `${label} (${key})`;
  }
  if (displayName && displayName !== key) {
    return `${key} (${displayName})`;
  }
  return key;
}

function resolveSessionOptions(
  sessionKey: string,
  sessions: SessionsListResult | null,
  mainSessionKey?: string | null,
) {
  const seen = new Set<string>();
  const options: Array<{ key: string; displayName?: string }> = [];

  const resolvedMain = mainSessionKey && sessions?.sessions?.find((s) => s.key === mainSessionKey);
  const resolvedCurrent = sessions?.sessions?.find((s) => s.key === sessionKey);

  // Add main session key first
  if (mainSessionKey) {
    seen.add(mainSessionKey);
    options.push({
      key: mainSessionKey,
      displayName: resolveSessionDisplayName(mainSessionKey, resolvedMain || undefined),
    });
  }

  // Add current session key next
  if (!seen.has(sessionKey)) {
    seen.add(sessionKey);
    options.push({
      key: sessionKey,
      displayName: resolveSessionDisplayName(sessionKey, resolvedCurrent),
    });
  }

  // Add sessions from the result
  if (sessions?.sessions) {
    for (const s of sessions.sessions) {
      if (!seen.has(s.key)) {
        seen.add(s.key);
        options.push({
          key: s.key,
          displayName: resolveSessionDisplayName(s.key, s),
        });
      }
    }
  }

  return options;
}

const THEME_ORDER: ThemeMode[] = ["system", "light", "dark"];

export function renderThemeToggle(state: AppViewState) {
  const t = (english: string, chinese: string) => uiText(state.uiLocale, english, chinese);
  const index = Math.max(0, THEME_ORDER.indexOf(state.theme));
  const applyTheme = (next: ThemeMode) => (event: MouseEvent) => {
    const element = event.currentTarget as HTMLElement;
    const context: ThemeTransitionContext = { element };
    if (event.clientX || event.clientY) {
      context.pointerClientX = event.clientX;
      context.pointerClientY = event.clientY;
    }
    state.setTheme(next, context);
  };

  return html`
    <div class="theme-toggle" style="--theme-index: ${index};">
      <div class="theme-toggle__track" role="group" aria-label=${t("Theme", "主题")}>
        <span class="theme-toggle__indicator"></span>
        <button
          class="theme-toggle__button ${state.theme === "system" ? "active" : ""}"
          @click=${applyTheme("system")}
          aria-pressed=${state.theme === "system"}
          aria-label=${t("System theme", "系统主题")}
          title=${t("System", "系统")}
        >
          ${renderMonitorIcon()}
        </button>
        <button
          class="theme-toggle__button ${state.theme === "light" ? "active" : ""}"
          @click=${applyTheme("light")}
          aria-pressed=${state.theme === "light"}
          aria-label=${t("Light theme", "浅色主题")}
          title=${t("Light", "浅色")}
        >
          ${renderSunIcon()}
        </button>
        <button
          class="theme-toggle__button ${state.theme === "dark" ? "active" : ""}"
          @click=${applyTheme("dark")}
          aria-pressed=${state.theme === "dark"}
          aria-label=${t("Dark theme", "深色主题")}
          title=${t("Dark", "深色")}
        >
          ${renderMoonIcon()}
        </button>
      </div>
    </div>
  `;
}

function renderSunIcon() {
  return html`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2"></path>
      <path d="M12 20v2"></path>
      <path d="m4.93 4.93 1.41 1.41"></path>
      <path d="m17.66 17.66 1.41 1.41"></path>
      <path d="M2 12h2"></path>
      <path d="M20 12h2"></path>
      <path d="m6.34 17.66-1.41 1.41"></path>
      <path d="m19.07 4.93-1.41 1.41"></path>
    </svg>
  `;
}

function renderMoonIcon() {
  return html`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
      ></path>
    </svg>
  `;
}

function renderMonitorIcon() {
  return html`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="20" height="14" x="2" y="3" rx="2"></rect>
      <line x1="8" x2="16" y1="21" y2="21"></line>
      <line x1="12" x2="12" y1="17" y2="21"></line>
    </svg>
  `;
}
