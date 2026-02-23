import type { IconName } from "./icons.js";
import { uiText } from "./i18n.ts";
import type { Locale } from "./views/onboarding/i18n.ts";

export const TAB_GROUPS = [
  { label: "Assist", tabs: ["chat"] },
  {
    label: "Operate",
    tabs: ["channels", "instances", "sessions", "usage", "cron"],
  },
  { label: "Build", tabs: ["agents", "skills", "nodes"] },
  { label: "System", tabs: ["overview"] },
] as const;

/** Tabs that live inside the Settings panel instead of the main sidebar. */
export const SETTINGS_TABS = ["config", "logs", "debug"] as const;
export type SettingsTab = (typeof SETTINGS_TABS)[number];

export type Tab =
  | "agents"
  | "overview"
  | "channels"
  | "instances"
  | "sessions"
  | "usage"
  | "cron"
  | "skills"
  | "nodes"
  | "chat"
  | "config"
  | "debug"
  | "logs";

const TAB_PATHS: Record<Tab, string> = {
  agents: "/agents",
  overview: "/overview",
  channels: "/channels",
  instances: "/instances",
  sessions: "/sessions",
  usage: "/usage",
  cron: "/cron",
  skills: "/skills",
  nodes: "/nodes",
  chat: "/chat",
  config: "/config",
  debug: "/debug",
  logs: "/logs",
};

const PATH_TO_TAB = new Map(Object.entries(TAB_PATHS).map(([tab, path]) => [path, tab as Tab]));

export function normalizeBasePath(basePath: string): string {
  if (!basePath) {
    return "";
  }
  let base = basePath.trim();
  if (!base.startsWith("/")) {
    base = `/${base}`;
  }
  if (base === "/") {
    return "";
  }
  if (base.endsWith("/")) {
    base = base.slice(0, -1);
  }
  return base;
}

export function normalizePath(path: string): string {
  if (!path) {
    return "/";
  }
  let normalized = path.trim();
  if (!normalized.startsWith("/")) {
    normalized = `/${normalized}`;
  }
  if (normalized.length > 1 && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }
  return normalized;
}

export function pathForTab(tab: Tab, basePath = ""): string {
  const base = normalizeBasePath(basePath);
  const path = TAB_PATHS[tab];
  return base ? `${base}${path}` : path;
}

export function tabFromPath(pathname: string, basePath = ""): Tab | null {
  const base = normalizeBasePath(basePath);
  let path = pathname || "/";
  if (base) {
    if (path === base) {
      path = "/";
    } else if (path.startsWith(`${base}/`)) {
      path = path.slice(base.length);
    }
  }
  let normalized = normalizePath(path).toLowerCase();
  if (normalized.endsWith("/index.html")) {
    normalized = "/";
  }
  if (normalized === "/") {
    return "chat";
  }
  return PATH_TO_TAB.get(normalized) ?? null;
}

export function inferBasePathFromPathname(pathname: string): string {
  let normalized = normalizePath(pathname);
  if (normalized.endsWith("/index.html")) {
    normalized = normalizePath(normalized.slice(0, -"/index.html".length));
  }
  if (normalized === "/") {
    return "";
  }
  const segments = normalized.split("/").filter(Boolean);
  if (segments.length === 0) {
    return "";
  }
  for (let i = 0; i < segments.length; i++) {
    const candidate = `/${segments.slice(i).join("/")}`.toLowerCase();
    if (PATH_TO_TAB.has(candidate)) {
      const prefix = segments.slice(0, i);
      return prefix.length ? `/${prefix.join("/")}` : "";
    }
  }
  return `/${segments.join("/")}`;
}

export function iconForTab(tab: Tab): IconName {
  switch (tab) {
    case "agents":
      return "folder";
    case "chat":
      return "messageSquare";
    case "overview":
      return "barChart";
    case "channels":
      return "link";
    case "instances":
      return "radio";
    case "sessions":
      return "fileText";
    case "usage":
      return "barChart";
    case "cron":
      return "loader";
    case "skills":
      return "zap";
    case "nodes":
      return "monitor";
    case "config":
      return "settings";
    case "debug":
      return "bug";
    case "logs":
      return "scrollText";
    default:
      return "folder";
  }
}

export function labelForTabGroup(label: string, locale?: Locale) {
  switch (label) {
    case "Assist":
      return uiText(locale, "Assist", "助手");
    case "Operate":
      return uiText(locale, "Operate", "运维");
    case "Build":
      return uiText(locale, "Build", "构建");
    case "System":
      return uiText(locale, "System", "系统");
    default:
      return label;
  }
}

export function titleForTab(tab: Tab, locale?: Locale) {
  switch (tab) {
    case "agents":
      return uiText(locale, "Agents", "代理");
    case "overview":
      return uiText(locale, "Overview", "总览");
    case "channels":
      return uiText(locale, "Channels", "渠道");
    case "instances":
      return uiText(locale, "Instances", "实例");
    case "sessions":
      return uiText(locale, "Sessions", "会话");
    case "usage":
      return uiText(locale, "Usage", "用量");
    case "cron":
      return uiText(locale, "Cron Jobs", "定时任务");
    case "skills":
      return uiText(locale, "Skills", "技能");
    case "nodes":
      return uiText(locale, "Nodes", "节点");
    case "chat":
      return uiText(locale, "Chat", "聊天");
    case "config":
      return uiText(locale, "Config", "配置");
    case "debug":
      return uiText(locale, "Debug", "调试");
    case "logs":
      return uiText(locale, "Logs", "日志");
    default:
      return uiText(locale, "Control", "控制台");
  }
}

export function subtitleForTab(tab: Tab, locale?: Locale) {
  switch (tab) {
    case "agents":
      return uiText(
        locale,
        "Build and manage agent workspaces, tools, and identities.",
        "构建和管理代理工作区、工具与身份信息。",
      );
    case "overview":
      return uiText(
        locale,
        "System health, entry points, and fast operational diagnostics.",
        "系统健康状态、入口与快速运维诊断。",
      );
    case "channels":
      return uiText(
        locale,
        "Operate and monitor channel connectivity and settings.",
        "运营并监控渠道连接与配置。",
      );
    case "instances":
      return uiText(
        locale,
        "Live presence beacons from connected clients and nodes.",
        "来自已连接客户端与节点的在线状态信标。",
      );
    case "sessions":
      return uiText(
        locale,
        "Inspect active sessions and adjust per-session behavior.",
        "查看活跃会话并调整每个会话的行为。",
      );
    case "usage":
      return "";
    case "cron":
      return uiText(
        locale,
        "Schedule wakeups and recurring automated agent runs.",
        "安排唤醒与周期性自动代理执行。",
      );
    case "skills":
      return uiText(
        locale,
        "Manage skill availability and API key injection across agents.",
        "管理技能可用性与跨代理 API Key 注入。",
      );
    case "nodes":
      return uiText(
        locale,
        "Manage paired devices, capabilities, and command exposure.",
        "管理配对设备、能力与命令暴露。",
      );
    case "chat":
      return uiText(
        locale,
        "Direct assistant workspace for fast interventions and control.",
        "直接与助手交互的工作区，用于快速控制与干预。",
      );
    case "config":
      return uiText(
        locale,
        "Edit ~/.opensoul/opensoul.json with schema-aware safeguards.",
        "以 schema 感知保护编辑 ~/.opensoul/opensoul.json。",
      );
    case "debug":
      return uiText(
        locale,
        "Advanced snapshots, event inspection, and manual RPC calls.",
        "高级快照、事件检查与手动 RPC 调用。",
      );
    case "logs":
      return uiText(
        locale,
        "Live tail of gateway file logs with operational filtering.",
        "网关文件日志实时追踪与运维过滤。",
      );
    default:
      return "";
  }
}
