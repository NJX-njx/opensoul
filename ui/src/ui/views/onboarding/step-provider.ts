/**
 * Step 3: AI model provider selection — guided setup with auth-type differentiation.
 *
 * Supports three paths:
 *   - api-key: paste an API key (most providers)
 *   - oauth: run a CLI command to authenticate (e.g. GitHub Copilot)
 *   - local: install and run locally (e.g. Ollama) — no key required
 */
import { html, nothing } from "lit";
import { getMessages } from "./i18n.ts";
import { ONBOARDING_PROVIDERS, PROVIDER_VERIFY_CMDS, type OnboardingWizardState } from "./types.ts";

const CHECK_SVG = html`
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="3"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
`;
const SEARCH_SVG = html`
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" x2="16.65" y1="21" y2="16.65" />
  </svg>
`;
const KEY_SVG = html`
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    width="14"
    height="14"
  >
    <path
      d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"
    />
  </svg>
`;
const OAUTH_SVG = html`
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    width="14"
    height="14"
  >
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" y1="12" x2="3" y2="12" />
  </svg>
`;
const LOCAL_SVG = html`
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    width="14"
    height="14"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
`;
const TERMINAL_SVG = html`
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    width="14"
    height="14"
  >
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
`;

function authTypeBadge(authType: "api-key" | "oauth" | "local") {
  switch (authType) {
    case "oauth":
      return html`<span class="onboarding-provider-badge onboarding-provider-badge--oauth">${OAUTH_SVG} OAuth</span>`;
    case "local":
      return html`<span class="onboarding-provider-badge onboarding-provider-badge--local">${LOCAL_SVG} Local</span>`;
    default:
      return html`<span class="onboarding-provider-badge onboarding-provider-badge--apikey">${KEY_SVG} API key</span>`;
  }
}

export function renderStepProvider(state: OnboardingWizardState) {
  const t = getMessages(state.locale);
  const query = state.providerSearchQuery.toLowerCase().trim();
  const filtered = query
    ? ONBOARDING_PROVIDERS.filter(
        (p) =>
          p.label.toLowerCase().includes(query) ||
          (p.hint?.toLowerCase().includes(query) ?? false) ||
          (p.authHint?.toLowerCase().includes(query) ?? false),
      )
    : ONBOARDING_PROVIDERS;

  const selectedProviderDef = state.selectedProvider
    ? (ONBOARDING_PROVIDERS.find((p) => p.id === state.selectedProvider) ?? null)
    : null;
  const verifyCmds = state.selectedProvider
    ? (PROVIDER_VERIFY_CMDS[state.selectedProvider] ?? [])
    : [];

  return html`
    <!-- Search -->
    <div class="onboarding-search">
      <span class="onboarding-search__icon">${SEARCH_SVG}</span>
      <input
        class="onboarding-search__input"
        type="text"
        placeholder=${t.providerSearch}
        .value=${state.providerSearchQuery}
        @input=${(e: InputEvent) =>
          state.onProviderSearchChange((e.target as HTMLInputElement).value)}
      />
    </div>

    <!-- Provider list -->
    <div class="onboarding-provider-list">
      ${filtered.map((provider) => {
        const selected = state.selectedProvider === provider.id;
        const authType = provider.authType ?? "api-key";
        return html`
          <div
            class="onboarding-provider-item ${selected ? "onboarding-provider-item--selected" : ""}"
            @click=${() => state.onProviderSelect(selected ? null : provider.id)}
          >
            <div class="onboarding-provider-item__check">
              <span class="onboarding-provider-item__check-icon">${CHECK_SVG}</span>
            </div>
            <div class="onboarding-provider-item__info">
              <div class="onboarding-provider-item__name">
                ${provider.label}
                ${authTypeBadge(authType)}
              </div>
              ${
                provider.hint
                  ? html`<div class="onboarding-provider-item__hint">${provider.hint}</div>`
                  : nothing
              }
              ${
                selected
                  ? html`
                    ${
                      authType === "api-key"
                        ? html`
                          ${
                            provider.authHint
                              ? html`<div class="onboarding-provider-item__auth-hint">${provider.authHint}</div>`
                              : nothing
                          }
                          <input
                            class="onboarding-provider-input"
                            type="password"
                            placeholder=${t.providerApiKeyPlaceholder}
                            .value=${state.providerApiKey}
                            @input=${(e: InputEvent) =>
                              state.onProviderApiKeyChange((e.target as HTMLInputElement).value)}
                            @click=${(e: Event) => e.stopPropagation()}
                          />
                        `
                        : html`
                          <div class="onboarding-provider-item__auth-hint">
                            ${provider.authHint ?? ""}
                          </div>
                        `
                    }
                  `
                  : nothing
              }
            </div>
          </div>
        `;
      })}
      ${
        filtered.length === 0
          ? html`<div style="text-align:center; padding:24px; color:var(--muted);">
            ${t.providerNoneSelected}
          </div>`
          : nothing
      }
    </div>

    <!-- Verification commands (shown after selecting a provider) -->
    ${
      selectedProviderDef && verifyCmds.length > 0
        ? html`
          <div class="onboarding-verify-block">
            <div class="onboarding-verify-block__title">
              ${TERMINAL_SVG}
              Verify your setup
            </div>
            <div class="onboarding-verify-block__hint">
              After completing onboarding, run these commands to confirm your provider is working:
            </div>
            ${verifyCmds.map(
              (cmd) => html`
                <div class="onboarding-verify-block__cmd">
                  <code>${cmd}</code>
                </div>
              `,
            )}
          </div>
        `
        : nothing
    }
  `;
}
