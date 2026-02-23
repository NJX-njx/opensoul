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
        "Configure agent workspaces, tools, and personas.",
        "配置智能体工作区、工具与人设。",
      );
    case "overview":
      return uiText(
        locale,
        "Quick health check and entry points at a glance.",
        "一览系统状态与快捷入口。",
      );
    case "channels":
      return uiText(
        locale,
        "See which messaging channels are connected and healthy.",
        "查看消息渠道的连接与健康状态。",
      );
    case "instances":
      return uiText(
        locale,
        "See which clients and nodes are currently online.",
        "查看当前在线的客户端与节点。",
      );
    case "sessions":
      return uiText(
        locale,
        "Browse active conversations and fine-tune each session.",
        "浏览活跃对话并微调每个会话。",
      );
    case "usage":
      return uiText(
        locale,
        "Track token usage, costs, and trends over time.",
        "追踪 Token 用量、费用及趋势变化。",
      );
    case "cron":
      return uiText(
        locale,
        "Set up scheduled tasks and recurring agent runs.",
        "设置定时任务与周期性智能体执行。",
      );
    case "skills":
      return uiText(
        locale,
        "Manage available skills and API keys for your agents.",
        "管理智能体可用技能与 API Key。",
      );
    case "nodes":
      return uiText(
        locale,
        "Pair devices and control which commands are exposed.",
        "配对设备并控制暴露的命令。",
      );
    case "chat":
      return uiText(
        locale,
        "Start a chat session and interact with your assistant directly.",
        "开始对话，直接与助手交互。",
      );
    case "config":
      return uiText(
        locale,
        "Edit opensoul.json configuration with built-in validation.",
        "编辑 opensoul.json 配置，内置校验保护。",
      );
    case "debug":
      return uiText(
        locale,
        "Inspect events, snapshots, and make manual RPC calls.",
        "检查事件、快照与手动 RPC 调用。",
      );
    case "logs":
      return uiText(
        locale,
        "Stream live gateway logs with filtering.",
        "实时查看网关日志并过滤。",
      );
    default:
      return "";
  }
}

export function navHintForTab(tab: Tab, locale?: Locale) {
  switch (tab) {
    case "chat":
      return uiText(locale, "Ask and act quickly", "快速提问与操作");
    case "channels":
      return uiText(locale, "Connect apps", "连接应用");
    case "instances":
      return uiText(locale, "Live clients", "在线客户端");
    case "sessions":
      return uiText(locale, "Per-session control", "会话管控");
    case "usage":
      return uiText(locale, "Cost and tokens", "费用与 Token");
    case "cron":
      return uiText(locale, "Scheduled runs", "定时执行");
    case "agents":
      return uiText(locale, "Workspaces and tools", "工作区与工具");
    case "skills":
      return uiText(locale, "Capabilities", "能力管理");
    case "nodes":
      return uiText(locale, "Devices and approvals", "设备与审批");
    case "overview":
      return uiText(locale, "Health and quick actions", "健康与快捷操作");
    case "config":
      return uiText(locale, "Gateway config", "网关配置");
    case "debug":
      return uiText(locale, "Diagnostics", "诊断工具");
    case "logs":
      return uiText(locale, "Runtime logs", "运行日志");
    default:
      return "";
  }
}
