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
  step: 1 | 2 | 3 | 4 | 5;
  locale: Locale;

  /** Login state */
  loginStatus: "idle" | "loading" | "success" | "error";
  loginDisplayName: string | null;
  loginAvatarUrl: string | null;
  loginEmail: string | null;
  loginError: string | null;
  isExistingAccount: boolean;
  /** Login/Register form mode */
  loginMode: "login" | "register";
  /** Form fields for email+password auth */
  loginFormEmail: string;
  loginFormPassword: string;
  loginFormConfirmPassword: string;
  loginFormDisplayName: string;
  /** Field validation errors */
  loginFieldErrors: {
    email?: string;
    password?: string;
    confirmPassword?: string;
    displayName?: string;
  };

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
  onGoogleLogin: () => void;
  onGithubLogin: () => void;
  onEmailLogin: () => void;
  onEmailRegister: () => void;
  onLogout: () => void;
  onLoginModeChange: (mode: "login" | "register") => void;
  onLoginFormEmailChange: (email: string) => void;
  onLoginFormPasswordChange: (password: string) => void;
  onLoginFormConfirmPasswordChange: (password: string) => void;
  onLoginFormDisplayNameChange: (name: string) => void;
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

/**
 * Maps provider IDs to the env var name for built-in providers,
 * or to a `{ baseUrl, envVar, api }` object for custom providers
 * that require a `models.providers` entry.
 */
export type ProviderConfigMeta =
  | { kind: "builtin"; envVar: string }
  | { kind: "custom"; envVar: string; baseUrl: string; api: string };

export const PROVIDER_CONFIG_MAP: Record<string, ProviderConfigMeta> = {
  anthropic: { kind: "builtin", envVar: "ANTHROPIC_API_KEY" },
  openai: { kind: "builtin", envVar: "OPENAI_API_KEY" },
  google: { kind: "builtin", envVar: "GEMINI_API_KEY" },
  openrouter: { kind: "builtin", envVar: "OPENROUTER_API_KEY" },
  xai: { kind: "builtin", envVar: "XAI_API_KEY" },
  zai: { kind: "builtin", envVar: "ZAI_API_KEY" },
  copilot: { kind: "builtin", envVar: "COPILOT_GITHUB_TOKEN" },
  "ai-gateway": { kind: "builtin", envVar: "AI_GATEWAY_API_KEY" },
  "opencode-zen": { kind: "builtin", envVar: "OPENCODE_API_KEY" },
  minimax: {
    kind: "custom",
    envVar: "MINIMAX_API_KEY",
    baseUrl: "https://api.minimax.chat/v1",
    api: "openai-completions",
  },
  moonshot: {
    kind: "custom",
    envVar: "MOONSHOT_API_KEY",
    baseUrl: "https://api.moonshot.ai/v1",
    api: "openai-completions",
  },
  qwen: {
    kind: "custom",
    envVar: "QWEN_API_KEY",
    baseUrl: "https://portal.qwen.ai/v1",
    api: "openai-completions",
  },
  xiaomi: {
    kind: "custom",
    envVar: "XIAOMI_API_KEY",
    baseUrl: "https://api.xiaomimimo.com/anthropic",
    api: "anthropic-messages",
  },
  qianfan: {
    kind: "custom",
    envVar: "QIANFAN_API_KEY",
    baseUrl: "https://qianfan.baidubce.com/v2",
    api: "openai-completions",
  },
  synthetic: {
    kind: "custom",
    envVar: "SYNTHETIC_API_KEY",
    baseUrl: "https://api.synthetic.new/anthropic",
    api: "anthropic-messages",
  },
  venice: {
    kind: "custom",
    envVar: "VENICE_API_KEY",
    baseUrl: "https://api.venice.ai/api/v1",
    api: "openai-completions",
  },
  "cloudflare-ai-gateway": {
    kind: "custom",
    envVar: "CLOUDFLARE_AI_GATEWAY_API_KEY",
    baseUrl: "",
    api: "anthropic-messages",
  },
};

/**
 * Full model definitions for builtin providers.
 * Used to generate models.json for fresh onboarding (when models.json doesn't exist).
 */
export type BuiltinModelDefinition = {
  id: string;
  name: string;
  api: string;
  reasoning: boolean;
  input: string[];
  cost: { input: number; output: number; cacheRead: number; cacheWrite: number };
  contextWindow: number;
  maxTokens: number;
};

export type BuiltinProviderConfig = {
  baseUrl: string;
  api: string;
  models: BuiltinModelDefinition[];
};

export const BUILTIN_PROVIDER_MODELS: Record<string, BuiltinProviderConfig> = {
  anthropic: {
    baseUrl: "https://api.anthropic.com",
    api: "anthropic-messages",
    models: [
      {
        id: "claude-opus-4-6",
        name: "Claude Opus 4.6",
        api: "anthropic-messages",
        reasoning: true,
        input: ["text", "image"],
        cost: { input: 5, output: 25, cacheRead: 0.5, cacheWrite: 6.25 },
        contextWindow: 200000,
        maxTokens: 64000,
      },
    ],
  },
  openai: {
    baseUrl: "https://api.openai.com/v1",
    api: "openai-responses",
    models: [
      {
        id: "gpt-5.1-codex",
        name: "GPT-5.1 Codex",
        api: "openai-responses",
        reasoning: true,
        input: ["text", "image"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 200000,
        maxTokens: 100000,
      },
    ],
  },
  google: {
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
    api: "google-generative-ai",
    models: [
      {
        id: "gemini-2.5-flash",
        name: "Gemini 2.5 Flash",
        api: "google-generative-ai",
        reasoning: true,
        input: ["text", "image"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 1000000,
        maxTokens: 65536,
      },
      {
        id: "gemini-3-pro-preview",
        name: "Gemini 3 Pro",
        api: "google-generative-ai",
        reasoning: true,
        input: ["text", "image"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 2000000,
        maxTokens: 65536,
      },
    ],
  },
  openrouter: {
    baseUrl: "https://openrouter.ai/api/v1",
    api: "openai-completions",
    models: [
      {
        id: "anthropic/claude-sonnet-4-5",
        name: "Claude Sonnet 4.5",
        api: "openai-completions",
        reasoning: true,
        input: ["text", "image"],
        cost: { input: 3, output: 15, cacheRead: 0.3, cacheWrite: 3.75 },
        contextWindow: 200000,
        maxTokens: 64000,
      },
    ],
  },
  xai: {
    baseUrl: "https://api.x.ai/v1",
    api: "openai-completions",
    models: [
      {
        id: "grok-3",
        name: "Grok 3",
        api: "openai-completions",
        reasoning: true,
        input: ["text", "image"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 131072,
        maxTokens: 32768,
      },
    ],
  },
  zai: {
    baseUrl: "https://open.bigmodel.cn/api/paas/v4",
    api: "openai-completions",
    models: [
      {
        id: "glm-4.7",
        name: "GLM 4.7",
        api: "openai-completions",
        reasoning: true,
        input: ["text", "image"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 128000,
        maxTokens: 16384,
      },
    ],
  },
};

/**
 * Maps provider IDs to their latest/recommended default model ref.
 * Used to set `agents.defaults.model.primary` during onboarding.
 */
export const PROVIDER_DEFAULT_MODEL: Record<string, string> = {
  anthropic: "anthropic/claude-opus-4-6",
  openai: "openai/gpt-5.1-codex",
  google: "google/gemini-2.5-flash",
  openrouter: "openrouter/anthropic/claude-sonnet-4-5",
  xai: "xai/grok-3",
  minimax: "minimax/MiniMax-M2.1",
  moonshot: "moonshot/kimi-k2.5",
  qwen: "qwen-portal/coder-model",
  zai: "zai/glm-4.7",
  copilot: "github-copilot/claude-opus-4-6",
  "ai-gateway": "vercel-ai-gateway/anthropic/claude-opus-4.6",
  "opencode-zen": "opencode/claude-opus-4-6",
  xiaomi: "xiaomi/mimo-v2-flash",
  qianfan: "qianfan/deepseek-v3.2",
  synthetic: "synthetic/hf:MiniMaxAI/MiniMax-M2.1",
  venice: "venice/deepseek-r1-671b",
  "cloudflare-ai-gateway": "cloudflare-ai-gateway/claude-opus-4-6",
};

/**
 * Maps channel IDs to the config field names used for their token/credentials.
 * `null` means the channel uses QR pairing or external setup (no simple token).
 */
export type ChannelConfigMeta = {
  /** Config field path(s) to set. `null` = no token-based setup. */
  tokenFields: Record<string, string> | null;
};

export const CHANNEL_CONFIG_MAP: Record<string, ChannelConfigMeta> = {
  telegram: { tokenFields: { botToken: "" } },
  discord: { tokenFields: { token: "" } },
  whatsapp: { tokenFields: null },
  slack: { tokenFields: { botToken: "", appToken: "" } },
  signal: { tokenFields: null },
  feishu: { tokenFields: { appId: "", appSecret: "" } },
  msteams: { tokenFields: null },
  matrix: { tokenFields: { accessToken: "" } },
};

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
