/**
 * Step 1: Language selection.
 */
import { html } from "lit";
import { AVAILABLE_LOCALES, getMessages } from "./i18n.ts";
import type { OnboardingWizardState } from "./types.ts";

export function renderStepLanguage(state: OnboardingWizardState) {
  const t = getMessages(state.locale);

  return html`
    <div class="onboarding-lang-grid">
      ${AVAILABLE_LOCALES.map(
        (loc) => html`
          <button
            class="onboarding-lang-option ${state.locale === loc.value ? "onboarding-lang-option--selected" : ""}"
            @click=${() => state.onLocaleChange(loc.value)}
          >
            <div>
              <div class="onboarding-lang-option__native">${loc.nativeLabel}</div>
              <div class="onboarding-lang-option__label">${loc.label}</div>
            </div>
          </button>
        `,
      )}
    </div>
  `;
}
