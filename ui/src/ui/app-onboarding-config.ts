/**
 * Imports onboarding wizard selections (provider API key, channel token)
 * into the gateway config via `config.patch`.
 */

import type { GatewayBrowserClient } from "./gateway.ts";
import type { ConfigSnapshot } from "./types.ts";
import {
  PROVIDER_CONFIG_MAP,
  PROVIDER_DEFAULT_MODEL,
  CHANNEL_CONFIG_MAP,
  BUILTIN_PROVIDER_MODELS,
} from "./views/onboarding/types.ts";

type OnboardingSelections = {
  selectedProvider: string | null;
  providerApiKey: string;
  selectedChannel: string | null;
  channelToken: string;
};

/**
 * Build a config patch object from onboarding selections.
 * Returns `null` if nothing needs to be patched.
 */
export function buildOnboardingConfigPatch(
  selections: OnboardingSelections,
): Record<string, unknown> | null {
  const patch: Record<string, unknown> = {};
  const { selectedProvider, providerApiKey, selectedChannel, channelToken } = selections;

  // Provider config
  if (selectedProvider && providerApiKey.trim()) {
    const meta = PROVIDER_CONFIG_MAP[selectedProvider];
    if (meta) {
      const apiKey = providerApiKey.trim();
      // Set API key via env section for all providers
      patch.env = { [meta.envVar]: apiKey };

      if (meta.kind === "builtin") {
        // Built-in providers: also add models.providers entry so models.json can be generated
        const builtinConfig = BUILTIN_PROVIDER_MODELS[selectedProvider];
        if (builtinConfig) {
          patch.models = {
            mode: "merge",
            providers: {
              [selectedProvider]: {
                baseUrl: builtinConfig.baseUrl,
                apiKey: `\${${meta.envVar}}`,
                api: builtinConfig.api,
                models: builtinConfig.models,
              },
            },
          };
        }
      } else {
        // Custom providers: create models.providers entry
        if (meta.baseUrl) {
          patch.models = {
            mode: "merge",
            providers: {
              [selectedProvider]: {
                baseUrl: meta.baseUrl,
                apiKey: `\${${meta.envVar}}`,
                api: meta.api,
                models: [],
              },
            },
          };
        }
      }

      // Set the default model for the agent so it can start working immediately
      const defaultModel = PROVIDER_DEFAULT_MODEL[selectedProvider];
      if (defaultModel) {
        patch.agents = {
          defaults: {
            model: { primary: defaultModel },
          },
        };
      }
    }
  }

  // Channel config
  if (selectedChannel && channelToken.trim()) {
    const channelMeta = CHANNEL_CONFIG_MAP[selectedChannel];
    if (channelMeta?.tokenFields) {
      const tokenValue = channelToken.trim();
      const fieldNames = Object.keys(channelMeta.tokenFields);
      if (fieldNames.length === 1) {
        // Single token field — set directly
        const fieldName = fieldNames[0]!;
        patch.channels = {
          [selectedChannel]: { [fieldName]: tokenValue },
        };
      } else if (fieldNames.length > 1) {
        // Multi-field tokens (e.g., Slack: "botToken,appToken" or "botToken\nappToken")
        // Try splitting by comma, semicolon, or newline
        const parts = tokenValue
          .split(/[,;\n]+/)
          .map((s) => s.trim())
          .filter(Boolean);
        const channelPatch: Record<string, string> = {};
        for (let i = 0; i < fieldNames.length; i++) {
          const field = fieldNames[i]!;
          channelPatch[field] = parts[i] ?? "";
        }
        // Only include fields that have values
        const filtered = Object.fromEntries(
          Object.entries(channelPatch).filter(([, v]) => v.length > 0),
        );
        if (Object.keys(filtered).length > 0) {
          patch.channels = { [selectedChannel]: filtered };
        }
      }
    }
  }

  return Object.keys(patch).length > 0 ? patch : null;
}

/**
 * Apply onboarding config selections to the gateway via `config.patch`.
 * Returns true on success, false on failure.
 */
export async function applyOnboardingConfig(
  client: GatewayBrowserClient,
  selections: OnboardingSelections,
): Promise<{ ok: boolean; error?: string }> {
  const patch = buildOnboardingConfigPatch(selections);
  console.log("[onboarding-config] buildOnboardingConfigPatch result:", patch);
  if (!patch) {
    console.log("[onboarding-config] No patch to apply, skipping");
    return { ok: true };
  }

  try {
    // Get current config to obtain the baseHash
    const snapshot = await client.request<ConfigSnapshot>("config.get", {});
    console.log("[onboarding-config] config.get snapshot:", {
      exists: snapshot.exists,
      valid: snapshot.valid,
      hash: snapshot.hash,
      config: snapshot.config,
    });
    if (!snapshot.hash) {
      console.error("[onboarding-config] Config hash missing");
      return { ok: false, error: "Config hash missing" };
    }

    // Apply the patch
    console.log("[onboarding-config] Applying config.patch:", {
      raw: JSON.stringify(patch),
      baseHash: snapshot.hash,
    });
    const patchResult = await client.request("config.patch", {
      raw: JSON.stringify(patch),
      baseHash: snapshot.hash,
    });
    console.log("[onboarding-config] config.patch result:", patchResult);

    return { ok: true };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

/**
 * Save provider/channel selections to the user's localStorage account record
 * so they can be restored when an existing user logs in again.
 */
export function saveOnboardingSelectionsToAccount(
  email: string | null,
  selections: OnboardingSelections,
): void {
  if (!email) {
    return;
  }
  const key = `opensoul.user.${email}`;
  const raw = localStorage.getItem(key);
  if (!raw) {
    return;
  }
  try {
    const user = JSON.parse(raw) as Record<string, unknown>;
    user.onboardingSelections = {
      selectedProvider: selections.selectedProvider,
      selectedChannel: selections.selectedChannel,
      // Do NOT persist API keys or tokens in localStorage for security
    };
    localStorage.setItem(key, JSON.stringify(user));
  } catch {
    // Ignore parse errors
  }
}

/**
 * Load previously stored onboarding selections from an account record.
 * Returns partial selections (provider/channel IDs only, no secrets).
 */
export function loadOnboardingSelectionsFromAccount(
  email: string | null,
): { selectedProvider: string | null; selectedChannel: string | null } | null {
  if (!email) {
    return null;
  }
  const key = `opensoul.user.${email}`;
  const raw = localStorage.getItem(key);
  if (!raw) {
    return null;
  }
  try {
    const user = JSON.parse(raw) as Record<string, unknown>;
    const selections = user.onboardingSelections as Record<string, unknown> | undefined;
    if (!selections) {
      return null;
    }
    return {
      selectedProvider:
        typeof selections.selectedProvider === "string" ? selections.selectedProvider : null,
      selectedChannel:
        typeof selections.selectedChannel === "string" ? selections.selectedChannel : null,
    };
  } catch {
    return null;
  }
}
