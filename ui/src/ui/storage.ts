const KEY = "opensoul.control.settings.v1";

import type { ThemeMode } from "./theme.ts";

export type UiSettings = {
  gatewayUrl: string;
  token: string;
  sessionKey: string;
  lastActiveSessionKey: string;
  theme: ThemeMode;
  chatFocusMode: boolean;
  chatShowThinking: boolean;
  operateZoomLevel: number;
  splitRatio: number; // Sidebar split ratio (0.4 to 0.7, default 0.6)
  chatListWidth: number; // Chat list sidebar width in px (200-480, default 280)
  navCollapsed: boolean; // Collapsible sidebar state
  navGroupsCollapsed: Record<string, boolean>; // Which nav groups are collapsed
};

/** Default token for local dev when gateway is started with OPENSOUL_GATEWAY_TOKEN=dev-token */
const DEV_TOKEN = "dev-token";

function isLocalhost(): boolean {
  const h = location.hostname.toLowerCase();
  return h === "localhost" || h === "127.0.0.1" || h === "[::1]";
}

export function loadSettings(): UiSettings {
  const defaultUrl = (() => {
    const proto = location.protocol === "https:" ? "wss" : "ws";
    return `${proto}://${location.host}`;
  })();

  const defaultToken = isLocalhost() ? DEV_TOKEN : "";

  const defaults: UiSettings = {
    gatewayUrl: defaultUrl,
    token: defaultToken,
    sessionKey: "main",
    lastActiveSessionKey: "main",
    theme: "system",
    chatFocusMode: false,
    chatShowThinking: true,
    operateZoomLevel: 1,
    splitRatio: 0.6,
    chatListWidth: 280,
    navCollapsed: false,
    navGroupsCollapsed: {},
  };

  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      return defaults;
    }
    const parsed = JSON.parse(raw) as Partial<UiSettings>;
    return {
      gatewayUrl:
        typeof parsed.gatewayUrl === "string" && parsed.gatewayUrl.trim()
          ? parsed.gatewayUrl.trim()
          : defaults.gatewayUrl,
      token: (() => {
        const saved = typeof parsed.token === "string" ? parsed.token : defaults.token;
        if (saved && saved.trim()) {
          return saved;
        }
        return isLocalhost() ? DEV_TOKEN : "";
      })(),
      sessionKey:
        typeof parsed.sessionKey === "string" && parsed.sessionKey.trim()
          ? parsed.sessionKey.trim()
          : defaults.sessionKey,
      lastActiveSessionKey:
        typeof parsed.lastActiveSessionKey === "string" && parsed.lastActiveSessionKey.trim()
          ? parsed.lastActiveSessionKey.trim()
          : (typeof parsed.sessionKey === "string" && parsed.sessionKey.trim()) ||
            defaults.lastActiveSessionKey,
      theme:
        parsed.theme === "light" || parsed.theme === "dark" || parsed.theme === "system"
          ? parsed.theme
          : defaults.theme,
      chatFocusMode:
        typeof parsed.chatFocusMode === "boolean" ? parsed.chatFocusMode : defaults.chatFocusMode,
      chatShowThinking:
        typeof parsed.chatShowThinking === "boolean"
          ? parsed.chatShowThinking
          : defaults.chatShowThinking,
      operateZoomLevel:
        typeof parsed.operateZoomLevel === "number" &&
        parsed.operateZoomLevel >= 0.5 &&
        parsed.operateZoomLevel <= 2.5
          ? parsed.operateZoomLevel
          : defaults.operateZoomLevel,
      splitRatio:
        typeof parsed.splitRatio === "number" &&
        parsed.splitRatio >= 0.4 &&
        parsed.splitRatio <= 0.7
          ? parsed.splitRatio
          : defaults.splitRatio,
      chatListWidth:
        typeof parsed.chatListWidth === "number" &&
        parsed.chatListWidth >= 200 &&
        parsed.chatListWidth <= 480
          ? parsed.chatListWidth
          : defaults.chatListWidth,
      navCollapsed:
        typeof parsed.navCollapsed === "boolean" ? parsed.navCollapsed : defaults.navCollapsed,
      navGroupsCollapsed:
        typeof parsed.navGroupsCollapsed === "object" && parsed.navGroupsCollapsed !== null
          ? parsed.navGroupsCollapsed
          : defaults.navGroupsCollapsed,
    };
  } catch {
    return defaults;
  }
}

export function saveSettings(next: UiSettings) {
  localStorage.setItem(KEY, JSON.stringify(next));
}
