/**
 * Types for the onboarding wizard state and events.
 */

import type { Locale } from "./i18n.ts";

/** Auth type classification for providers. */
export type ProviderAuthType = "api-key" | "oauth" | "local";

/** AI provider group as displayed in the wizard. */
export type OnboardingProviderGroup = {
  id: string;
  label: string;
  hint?: string;
  /** How authentication works for this provider. Defaults to "api-key". */
  authType?: ProviderAuthType;
  /** Short description of what the user needs to do for this auth type. */
  authHint?: string;
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

  /** Error from last config apply attempt (e.g. gateway not connected). */
  configApplyError: string | null;

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
  {
    id: "anthropic",
    label: "Anthropic",
    hint: "Claude Opus / Sonnet",
    authType: "api-key",
    authHint: "Paste your Anthropic API key from console.anthropic.com",
  },
  {
    id: "openai",
    label: "OpenAI",
    hint: "GPT-5 / GPT-5 Mini",
    authType: "api-key",
    authHint: "Paste your OpenAI API key from platform.openai.com",
  },
  {
    id: "google",
    label: "Google",
    hint: "Gemini 3 Pro / Flash",
    authType: "api-key",
    authHint: "Paste your Gemini API key from aistudio.google.com",
  },
  {
    id: "openrouter",
    label: "OpenRouter",
    hint: "Multi-model gateway",
    authType: "api-key",
    authHint: "Paste your OpenRouter API key from openrouter.ai/keys",
  },
  {
    id: "xai",
    label: "xAI",
    hint: "Grok",
    authType: "api-key",
    authHint: "Paste your xAI API key from console.x.ai",
  },
  {
    id: "minimax",
    label: "MiniMax",
    hint: "M2.1",
    authType: "api-key",
    authHint: "Paste your MiniMax API key from platform.minimaxi.com",
  },
  {
    id: "moonshot",
    label: "Moonshot AI",
    hint: "Kimi K2.5",
    authType: "api-key",
    authHint: "Paste your Moonshot API key from platform.moonshot.ai",
  },
  {
    id: "qwen",
    label: "Qwen",
    hint: "Alibaba Cloud",
    authType: "api-key",
    authHint: "Paste your Qwen API key from bailian.aliyun.com",
  },
  {
    id: "zai",
    label: "Z.AI",
    hint: "GLM 4.7",
    authType: "api-key",
    authHint: "Paste your Z.AI API key from open.bigmodel.cn",
  },
  {
    id: "copilot",
    label: "GitHub Copilot",
    hint: "GitHub device login",
    authType: "oauth",
    authHint:
      "Authenticate via GitHub device-code flow. After setup, run: opensoul models auth login --provider github-copilot",
  },
  {
    id: "ai-gateway",
    label: "Vercel AI Gateway",
    hint: "API key",
    authType: "api-key",
    authHint: "Paste your Vercel AI Gateway API key",
  },
  {
    id: "opencode-zen",
    label: "OpenCode Zen",
    hint: "Multi-model proxy",
    authType: "api-key",
    authHint: "Paste your OpenCode Zen API key from opencode.ai",
  },
  {
    id: "xiaomi",
    label: "Xiaomi",
    hint: "API key",
    authType: "api-key",
    authHint: "Paste your Xiaomi API key",
  },
  {
    id: "qianfan",
    label: "Qianfan",
    hint: "API key",
    authType: "api-key",
    authHint: "Paste your Qianfan API key from qianfan.baidubce.com",
  },
  {
    id: "synthetic",
    label: "Synthetic",
    hint: "Anthropic-compatible",
    authType: "api-key",
    authHint: "Paste your Synthetic API key",
  },
  {
    id: "venice",
    label: "Venice AI",
    hint: "Privacy-focused",
    authType: "api-key",
    authHint: "Paste your Venice AI API key from venice.ai",
  },
  {
    id: "cloudflare-ai-gateway",
    label: "Cloudflare AI Gateway",
    hint: "Cloudflare",
    authType: "api-key",
    authHint: "Paste your Cloudflare AI Gateway API key",
  },
  {
    id: "ollama",
    label: "Ollama",
    hint: "Local models (no API key)",
    authType: "local",
    authHint:
      "Install Ollama at ollama.ai, pull a model with: ollama pull llama3.3, then start: ollama serve",
  },
];

/**
 * Maps provider IDs to the env var name for built-in providers,
 * or to a `{ baseUrl, envVar, api }` object for custom providers
 * that require a `models.providers` entry.
 * Local providers (e.g. Ollama) use `kind: "local"` and require no API key.
 */
export type ProviderConfigMeta =
  | { kind: "builtin"; envVar: string }
  | { kind: "custom"; envVar: string; baseUrl: string; api: string }
  | { kind: "local"; baseUrl: string; api: string };

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
  minimax: { kind: "builtin", envVar: "MINIMAX_API_KEY" },
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
  ollama: {
    kind: "local",
    baseUrl: "http://127.0.0.1:11434/v1",
    api: "openai-completions",
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
  minimax: {
    baseUrl: "https://api.minimaxi.com/anthropic",
    api: "anthropic-messages",
    models: [
      {
        id: "MiniMax-M2.1",
        name: "MiniMax M2.1",
        api: "anthropic-messages",
        reasoning: false,
        input: ["text"],
        cost: { input: 15, output: 60, cacheRead: 2, cacheWrite: 10 },
        contextWindow: 200000,
        maxTokens: 8192,
      },
      {
        id: "MiniMax-M2.1-lightning",
        name: "MiniMax M2.1 Lightning",
        api: "anthropic-messages",
        reasoning: false,
        input: ["text"],
        cost: { input: 15, output: 60, cacheRead: 2, cacheWrite: 10 },
        contextWindow: 200000,
        maxTokens: 8192,
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
  ollama: "ollama/llama3.3",
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

/**
 * CLI verification commands per provider.
 * Shown to users after selecting a provider so they can confirm setup works.
 */
export const PROVIDER_VERIFY_CMDS: Record<string, string[]> = {
  anthropic: [
    "opensoul models status --probe-provider anthropic",
    "opensoul models list --provider anthropic",
  ],
  openai: [
    "opensoul models status --probe-provider openai",
    "opensoul models list --provider openai",
  ],
  google: [
    "opensoul models status --probe-provider google",
    "opensoul models list --provider google",
  ],
  openrouter: [
    "opensoul models status --probe-provider openrouter",
    "opensoul models list --provider openrouter",
  ],
  xai: ["opensoul models status --probe-provider xai", "opensoul models list --provider xai"],
  minimax: [
    "opensoul models status --probe-provider minimax",
    "opensoul models list --provider minimax",
  ],
  moonshot: [
    "opensoul models status --probe-provider moonshot",
    "opensoul models list --provider moonshot",
  ],
  qwen: ["opensoul models status --probe-provider qwen", "opensoul models list --provider qwen"],
  zai: ["opensoul models status --probe-provider zai", "opensoul models list --provider zai"],
  copilot: [
    "opensoul models auth login --provider github-copilot",
    "opensoul models status --probe-provider github-copilot",
  ],
  "ai-gateway": ["opensoul models status --probe-provider vercel-ai-gateway"],
  "opencode-zen": ["opensoul models status --probe-provider opencode"],
  ollama: [
    "ollama list",
    "opensoul models list --provider ollama",
    "opensoul models status --probe-provider ollama",
  ],
  synthetic: ["opensoul models status --probe-provider synthetic"],
  venice: ["opensoul models status --probe-provider venice"],
  "cloudflare-ai-gateway": ["opensoul models status --probe-provider cloudflare-ai-gateway"],
};

/** A mapped failure entry: error pattern → actionable fix message. */
export type FailureFix = {
  /** Short description of the error condition. */
  label: string;
  /** Concrete steps the user should take. */
  fix: string;
  /** Optional CLI command to run to fix. */
  cmd?: string;
};

/**
 * Common model setup failure patterns mapped to actionable fixes.
 * Keys are substrings that may appear in error messages.
 */
export const COMMON_MODEL_FAILURES: FailureFix[] = [
  {
    label: "Invalid or expired API key",
    fix: "Re-generate a new API key from the provider's developer console and re-enter it.",
    cmd: "opensoul models auth paste-token --provider <name>",
  },
  {
    label: "API key not found / missing env var",
    fix: "Set the env var in ~/.opensoul/.env or opensoul.json → env section, then restart the gateway.",
    cmd: "opensoul models status --check",
  },
  {
    label: "Ollama not reachable (connection refused)",
    fix: "Start Ollama with `ollama serve`. Make sure port 11434 is open.",
    cmd: "ollama serve",
  },
  {
    label: "Model not found for provider",
    fix: "Run `opensoul models list --provider <name>` to see available models, then update your config.",
    cmd: "opensoul models list",
  },
  {
    label: "Rate limit / quota exceeded",
    fix: "Check your provider dashboard for usage limits. Consider switching to a lower-cost model or adding credits.",
  },
  {
    label: "OAuth token expired",
    fix: "Re-authenticate with `opensoul models auth login --provider <name>`.",
    cmd: "opensoul models auth login --provider <name>",
  },
  {
    label: "Config hash mismatch / conflict",
    fix: "Reload the config page and re-apply your changes. The config may have been updated from another session.",
    cmd: "opensoul models status",
  },
  {
    label: "Gateway not connected",
    fix: "Start the gateway first: `opensoul gateway run` or set OPENSOUL_GATEWAY_TOKEN and run `pnpm gateway:dev`.",
    cmd: "opensoul gateway run",
  },
];
