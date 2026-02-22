/**
 * Step 2: AI model provider selection.
 */
import { html, nothing } from "lit";
import { getMessages } from "./i18n.ts";
import { ONBOARDING_PROVIDERS, type OnboardingWizardState } from "./types.ts";

const CHECK_SVG = html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
const SEARCH_SVG = html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>`;

export function renderStepProvider(state: OnboardingWizardState) {
  const t = getMessages(state.locale);
  const query = state.providerSearchQuery.toLowerCase().trim();
  const filtered = query
    ? ONBOARDING_PROVIDERS.filter(
        (p) =>
          p.label.toLowerCase().includes(query) ||
          (p.hint?.toLowerCase().includes(query) ?? false),
      )
    : ONBOARDING_PROVIDERS;

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
        return html`
          <div
            class="onboarding-provider-item ${selected ? "onboarding-provider-item--selected" : ""}"
            @click=${() => state.onProviderSelect(selected ? null : provider.id)}
          >
            <div class="onboarding-provider-item__check">
              <span class="onboarding-provider-item__check-icon">${CHECK_SVG}</span>
            </div>
            <div class="onboarding-provider-item__info">
              <div class="onboarding-provider-item__name">${provider.label}</div>
              ${provider.hint
                ? html`<div class="onboarding-provider-item__hint">${provider.hint}</div>`
                : nothing}
              ${selected
                ? html`
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
                : nothing}
            </div>
          </div>
        `;
      })}
      ${filtered.length === 0
        ? html`<div style="text-align:center; padding:24px; color:var(--muted);">
            ${t.providerNoneSelected}
          </div>`
        : nothing}
    </div>
  `;
}
