import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Tab } from "./navigation.ts";
import { setTabFromRoute } from "./app-settings.ts";

type SettingsHost = Parameters<typeof setTabFromRoute>[0] & {
  logsPollInterval: number | null;
  debugPollInterval: number | null;
  openSettings: ReturnType<typeof vi.fn>;
};

const createHost = (tab: Tab): SettingsHost => {
  const host = {
    settings: {
      gatewayUrl: "",
      token: "",
      sessionKey: "main",
      lastActiveSessionKey: "main",
      theme: "system",
      chatFocusMode: false,
      chatShowThinking: true,
      splitRatio: 0.6,
      chatListWidth: 280,
      chatListHiddenAgentIds: [],
      navCollapsed: false,
      navGroupsCollapsed: {},
    },
    theme: "system",
    themeResolved: "dark",
    applySessionKey: "main",
    sessionKey: "main",
    tab,
    connected: false,
    hello: null,
    chatHasAutoScrolled: false,
    logsAtBottom: false,
    eventLog: [],
    eventLogBuffer: [],
    basePath: "",
    themeMedia: null,
    themeMediaHandler: null,
    settingsOpen: false,
    settingsSection: "general" as const,
    openSettings: vi.fn(),
    logsPollInterval: null,
    debugPollInterval: null,
  } as SettingsHost;
  host.openSettings = vi.fn((section?: "config" | "logs" | "debug" | "general") => {
    host.settingsOpen = true;
    host.settingsSection = section ?? "general";
  });
  return host;
};

describe("setTabFromRoute", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("opens the logs settings section for the logs tab", () => {
    const host = createHost("chat");

    setTabFromRoute(host, "logs");
    expect(host.openSettings).toHaveBeenCalledWith("logs");
    expect(host.settingsOpen).toBe(true);
    expect(host.settingsSection).toBe("logs");
    expect(host.logsPollInterval).toBeNull();
    expect(host.debugPollInterval).toBeNull();
  });

  it("opens the debug settings section for the debug tab", () => {
    const host = createHost("chat");

    setTabFromRoute(host, "debug");
    expect(host.openSettings).toHaveBeenCalledWith("debug");
    expect(host.settingsOpen).toBe(true);
    expect(host.settingsSection).toBe("debug");
    expect(host.debugPollInterval).toBeNull();
    expect(host.logsPollInterval).toBeNull();
  });

  it("falls back to chat when the tasks tab is not allowed", () => {
    const host = createHost("chat");

    setTabFromRoute(host, "tasks");

    expect(host.tab).toBe("chat");
  });

  it("keeps the tasks tab when operator.admin is present", () => {
    const host = createHost("chat");
    host.hello = {
      type: "hello-ok",
      protocol: 3,
      auth: {
        role: "operator",
        scopes: ["operator.admin"],
      },
    };

    setTabFromRoute(host, "tasks");

    expect(host.tab).toBe("tasks");
  });
});
