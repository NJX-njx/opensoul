import { uiText } from "../i18n.ts";
import type { Locale } from "./onboarding/i18n.ts";

const SECTION_LABELS_ZH: Record<string, string> = {
  env: "\u73af\u5883",
  update: "\u66f4\u65b0",
  agents: "\u4ee3\u7406",
  auth: "\u8ba4\u8bc1",
  channels: "\u6e20\u9053",
  messages: "\u6d88\u606f",
  commands: "\u547d\u4ee4",
  hooks: "\u94a9\u5b50",
  skills: "\u6280\u80fd",
  tools: "\u5de5\u5177",
  gateway: "\u7f51\u5173",
  wizard: "\u5f15\u5bfc",
  meta: "\u5143\u6570\u636e",
  logging: "\u65e5\u5fd7",
  browser: "\u6d4f\u89c8\u5668",
  ui: "\u754c\u9762",
  models: "\u6a21\u578b",
  bindings: "\u7ed1\u5b9a",
  broadcast: "\u5e7f\u64ad",
  audio: "\u97f3\u9891",
  session: "\u4f1a\u8bdd",
  cron: "\u5b9a\u65f6\u4efb\u52a1",
  web: "Web",
  discovery: "\u53d1\u73b0",
  canvasHost: "\u753b\u5e03\u4e3b\u673a",
  talk: "\u8bed\u97f3",
  plugins: "\u63d2\u4ef6",
};

const SECTION_DESCRIPTIONS_ZH: Record<string, string> = {
  env: "\u4f20\u9012\u7ed9\u7f51\u5173\u8fdb\u7a0b\u7684\u73af\u5883\u53d8\u91cf",
  update: "\u81ea\u52a8\u66f4\u65b0\u914d\u7f6e\u4e0e\u53d1\u5e03\u901a\u9053",
  agents: "\u4ee3\u7406\u914d\u7f6e\u3001\u6a21\u578b\u4e0e\u8eab\u4efd",
  auth: "API \u5bc6\u94a5\u4e0e\u8ba4\u8bc1\u914d\u7f6e",
  channels:
    "\u6d88\u606f\u6e20\u9053\u914d\u7f6e\uff08Telegram\u3001Discord\u3001Slack \u7b49\uff09",
  messages: "\u6d88\u606f\u5904\u7406\u4e0e\u8def\u7531\u8bbe\u7f6e",
  commands: "\u81ea\u5b9a\u4e49\u659c\u6760\u547d\u4ee4",
  hooks: "Webhook \u4e0e\u4e8b\u4ef6\u94a9\u5b50",
  skills: "\u6280\u80fd\u5305\u4e0e\u80fd\u529b",
  tools: "\u5de5\u5177\u914d\u7f6e\uff08\u6d4f\u89c8\u5668\u3001\u641c\u7d22\u7b49\uff09",
  gateway:
    "\u7f51\u5173\u670d\u52a1\u8bbe\u7f6e\uff08\u7aef\u53e3\u3001\u8ba4\u8bc1\u3001\u7ed1\u5b9a\uff09",
  wizard: "\u5f15\u5bfc\u72b6\u6001\u4e0e\u5386\u53f2",
  meta: "\u7f51\u5173\u5143\u6570\u636e\u4e0e\u7248\u672c\u4fe1\u606f",
  logging: "\u65e5\u5fd7\u7ea7\u522b\u4e0e\u8f93\u51fa\u914d\u7f6e",
  browser: "\u6d4f\u89c8\u5668\u81ea\u52a8\u5316\u8bbe\u7f6e",
  ui: "\u754c\u9762\u504f\u597d\u8bbe\u7f6e",
  models: "AI \u6a21\u578b\u914d\u7f6e\u4e0e\u63d0\u4f9b\u5546",
  bindings: "\u6309\u952e\u7ed1\u5b9a\u4e0e\u5feb\u6377\u952e",
  broadcast: "\u5e7f\u64ad\u4e0e\u901a\u77e5\u8bbe\u7f6e",
  audio: "\u97f3\u9891\u8f93\u5165/\u8f93\u51fa\u8bbe\u7f6e",
  session: "\u4f1a\u8bdd\u7ba1\u7406\u4e0e\u6301\u4e45\u5316",
  cron: "\u8ba1\u5212\u4efb\u52a1\u4e0e\u81ea\u52a8\u5316",
  web: "Web \u670d\u52a1\u4e0e API \u8bbe\u7f6e",
  discovery: "\u670d\u52a1\u53d1\u73b0\u4e0e\u7f51\u7edc\u914d\u7f6e",
  canvasHost: "\u753b\u5e03\u6e32\u67d3\u4e0e\u663e\u793a\u8bbe\u7f6e",
  talk: "\u8bed\u97f3\u4e0e\u5bf9\u8bdd\u8bbe\u7f6e",
  plugins: "\u63d2\u4ef6\u7ba1\u7406\u4e0e\u6269\u5c55",
};

const CONFIG_TEXT_ZH: Record<string, string> = {
  Authentication: "\u8ba4\u8bc1",
  "API keys and authentication profiles": "API \u5bc6\u94a5\u4e0e\u8ba4\u8bc1\u914d\u7f6e",
  Cooldowns: "\u51b7\u5374\u7b56\u7565",
  "Auth Profile Order": "\u8ba4\u8bc1\u914d\u7f6e\u987a\u5e8f",
  "Auth Profiles": "\u8ba4\u8bc1\u914d\u7f6e",
  "Billing Backoff (hours)": "\u8d26\u5355\u9000\u907f\uff08\u5c0f\u65f6\uff09",
  "Billing Backoff Overrides": "\u8d26\u5355\u9000\u907f\u8986\u76d6",
  "Base backoff (hours) when a profile fails due to billing/insufficient credits (default: 5).":
    "\u5f53\u8ba4\u8bc1\u914d\u7f6e\u56e0\u8d26\u5355\u6216\u4f59\u989d\u4e0d\u8db3\u5931\u8d25\u65f6\u7684\u57fa\u7840\u9000\u907f\u65f6\u95f4\uff08\u5c0f\u65f6\uff0c\u9ed8\u8ba4\uff1a5\uff09\u3002",
  "Optional per-provider overrides for billing backoff (hours).":
    "\u53ef\u9009\uff1a\u6309\u4f9b\u5e94\u5546\u5355\u72ec\u8986\u76d6\u8d26\u5355\u9000\u907f\u65f6\u95f4\uff08\u5c0f\u65f6\uff09\u3002",
};

export function configText(locale: Locale, english: string, chinese: string): string {
  return uiText(locale, english, chinese);
}

export function localizeConfigText(locale: Locale, fallback: string): string {
  const normalized = fallback.trim();
  const chinese = CONFIG_TEXT_ZH[normalized];
  return chinese ? configText(locale, fallback, chinese) : fallback;
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
