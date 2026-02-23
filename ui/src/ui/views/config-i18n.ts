import { uiText } from "../i18n.ts";
import type { Locale } from "./onboarding/i18n.ts";

const SECTION_LABELS_ZH: Record<string, string> = {
  env: "环境",
  update: "更新",
  agents: "代理",
  auth: "认证",
  channels: "渠道",
  messages: "消息",
  commands: "命令",
  hooks: "钩子",
  skills: "技能",
  tools: "工具",
  gateway: "网关",
  wizard: "引导",
  meta: "元数据",
  logging: "日志",
  browser: "浏览器",
  ui: "界面",
  models: "模型",
  bindings: "绑定",
  broadcast: "广播",
  audio: "音频",
  session: "会话",
  cron: "定时任务",
  web: "Web",
  discovery: "发现",
  canvasHost: "画布宿主",
  talk: "语音",
  plugins: "插件",
};

const SECTION_DESCRIPTIONS_ZH: Record<string, string> = {
  env: "传递给网关进程的环境变量",
  update: "自动更新配置与发布通道",
  agents: "代理配置、模型与身份",
  auth: "API 密钥与认证配置",
  channels: "消息渠道（Telegram、Discord、Slack 等）",
  messages: "消息处理与路由设置",
  commands: "自定义斜杠命令",
  hooks: "Webhook 与事件钩子",
  skills: "技能包与能力",
  tools: "工具配置（浏览器、搜索等）",
  gateway: "网关服务设置（端口、认证、绑定）",
  wizard: "引导状态与历史",
  meta: "网关元数据与版本信息",
  logging: "日志级别与输出配置",
  browser: "浏览器自动化设置",
  ui: "界面偏好设置",
  models: "AI 模型配置与提供商",
  bindings: "按键绑定与快捷键",
  broadcast: "广播与通知设置",
  audio: "音频输入/输出设置",
  session: "会话管理与持久化",
  cron: "计划任务与自动化",
  web: "Web 服务与 API 设置",
  discovery: "服务发现与网络设置",
  canvasHost: "画布渲染与显示设置",
  talk: "语音与对话设置",
  plugins: "插件管理与扩展",
};

export function configText(locale: Locale, english: string, chinese: string): string {
  return uiText(locale, english, chinese);
}

export function localizeConfigSectionLabel(
  locale: Locale,
  key: string,
  fallback: string,
): string {
  const chinese = SECTION_LABELS_ZH[key];
  return chinese ? configText(locale, fallback, chinese) : fallback;
}

export function localizeConfigSectionDescription(
  locale: Locale,
  key: string,
  fallback: string,
): string {
  const chinese = SECTION_DESCRIPTIONS_ZH[key];
  return chinese ? configText(locale, fallback, chinese) : fallback;
}
