/**
 * Step 1: Language selection.
 */
import { html } from "lit";
import { AVAILABLE_LOCALES, getMessages } from "./i18n.ts";
import type { OnboardingWizardState } from "./types.ts";

/* Checkmark icon for selected state */
const checkIcon = html`
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
`;

export function renderStepLanguage(state: OnboardingWizardState) {
  return html`
    <div class="onboarding-lang-grid">
      ${AVAILABLE_LOCALES.map(
        (loc) => {
          const isSelected = state.locale === loc.value;
          return html`
            <button
              class="onboarding-lang-option ${isSelected ? "onboarding-lang-option--selected" : ""}"
              @click=${() => state.onLocaleChange(loc.value)}
            >
              <span class="onboarding-lang-option__check">
                ${isSelected ? checkIcon : html`<span class="onboarding-lang-option__check-empty"></span>`}
              </span>
              <span class="onboarding-lang-option__text">
                <span class="onboarding-lang-option__native">${loc.nativeLabel}</span>
                <span class="onboarding-lang-option__label">${loc.label}</span>
              </span>
            </button>
          `;
        },
      )}
    </div>
  `;
}
