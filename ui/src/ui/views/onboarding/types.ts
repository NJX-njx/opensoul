/**
 * Types for the onboarding wizard state and events.
 */

import type { Locale } from "./i18n.ts";

/** AI provider group as displayed in the wizard. */
export type OnboardingProviderGroup = {
  id: string;
  label: string;
  hint?: string;
};

/** A channel option in the wizard. */
export type OnboardingChannel = {
  id: string;
  label: string;
  icon: string;
  difficulty: "easy" | "medium" | "advanced";
  tokenLabel: string;
  tokenHint: string;
};

/** Full wizard state. */
export type OnboardingWizardState = {
  step: 1 | 2 | 3 | 4;
  locale: Locale;

  /** Selected provider group id, or null if skipped. */
  selectedProvider: string | null;
  /** API key or token entered for the selected provider. */
  providerApiKey: string;
  /** Search filter for provider list. */
  providerSearchQuery: string;

  /** Selected channel id, or null if skipped. */
  selectedChannel: string | null;
  /** Token entered for the selected channel. */
  channelToken: string;

  /** Callbacks */
  onLocaleChange: (locale: Locale) => void;
  onProviderSelect: (providerId: string | null) => void;
  onProviderApiKeyChange: (key: string) => void;
  onProviderSearchChange: (query: string) => void;
  onChannelSelect: (channelId: string | null) => void;
  onChannelTokenChange: (token: string) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  onFinish: () => void;
};

/** List of AI providers available in the onboarding wizard. */
export const ONBOARDING_PROVIDERS: OnboardingProviderGroup[] = [
  { id: "anthropic", label: "Anthropic", hint: "Claude Opus / Sonnet" },
  { id: "openai", label: "OpenAI", hint: "GPT-5 / GPT-5 Mini" },
  { id: "google", label: "Google", hint: "Gemini 3 Pro / Flash" },
  { id: "openrouter", label: "OpenRouter", hint: "Multi-model gateway" },
  { id: "xai", label: "xAI", hint: "Grok" },
  { id: "minimax", label: "MiniMax", hint: "M2.1" },
  { id: "moonshot", label: "Moonshot AI", hint: "Kimi K2.5" },
  { id: "qwen", label: "Qwen", hint: "Alibaba Cloud" },
  { id: "zai", label: "Z.AI", hint: "GLM 4.7" },
  { id: "copilot", label: "GitHub Copilot", hint: "GitHub device login" },
  { id: "ai-gateway", label: "Vercel AI Gateway", hint: "API key" },
  { id: "opencode-zen", label: "OpenCode Zen", hint: "Multi-model proxy" },
  { id: "xiaomi", label: "Xiaomi", hint: "API key" },
  { id: "qianfan", label: "Qianfan", hint: "API key" },
  { id: "synthetic", label: "Synthetic", hint: "Anthropic-compatible" },
  { id: "venice", label: "Venice AI", hint: "Privacy-focused" },
  { id: "cloudflare-ai-gateway", label: "Cloudflare AI Gateway", hint: "Cloudflare" },
];

/** List of channels shown in the wizard. */
export const ONBOARDING_CHANNELS: OnboardingChannel[] = [
  {
    id: "telegram",
    label: "Telegram",
    icon: "✈️",
    difficulty: "easy",
    tokenLabel: "Bot Token",
    tokenHint: "Create a bot via @BotFather on Telegram and paste the token here.",
  },
  {
    id: "discord",
    label: "Discord",
    icon: "🎮",
    difficulty: "easy",
    tokenLabel: "Bot Token",
    tokenHint: "Create an app at discord.com/developers, add a bot, and paste the token.",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: "📱",
    difficulty: "medium",
    tokenLabel: "",
    tokenHint: "WhatsApp uses QR code pairing. You can configure this after setup.",
  },
  {
    id: "slack",
    label: "Slack",
    icon: "💬",
    difficulty: "medium",
    tokenLabel: "Bot Token + App Token",
    tokenHint: "Create a Slack app with Socket Mode and paste both tokens.",
  },
  {
    id: "signal",
    label: "Signal",
    icon: "🔒",
    difficulty: "advanced",
    tokenLabel: "",
    tokenHint: "Signal requires signal-cli linking. Configure after setup.",
  },
  {
    id: "feishu",
    label: "Feishu",
    icon: "🐦",
    difficulty: "medium",
    tokenLabel: "App ID + App Secret",
    tokenHint: "Create a Feishu app and paste the credentials.",
  },
  {
    id: "msteams",
    label: "MS Teams",
    icon: "🏢",
    difficulty: "advanced",
    tokenLabel: "",
    tokenHint: "Teams integration requires Azure Bot registration.",
  },
  {
    id: "matrix",
    label: "Matrix",
    icon: "🌐",
    difficulty: "medium",
    tokenLabel: "Access Token",
    tokenHint: "Provide your Matrix homeserver URL and access token.",
  },
];
