/**
 * Step 5: Confirm and launch.
 */
import { html } from "lit";
import { AVAILABLE_LOCALES, getMessages } from "./i18n.ts";
import { ONBOARDING_CHANNELS, ONBOARDING_PROVIDERS, type OnboardingWizardState } from "./types.ts";

export function renderStepConfirm(state: OnboardingWizardState) {
  const t = getMessages(state.locale);
  const localeName =
    AVAILABLE_LOCALES.find((l) => l.value === state.locale)?.nativeLabel ?? state.locale;
  const providerName =
    ONBOARDING_PROVIDERS.find((p) => p.id === state.selectedProvider)?.label ?? null;
  const channelName =
    ONBOARDING_CHANNELS.find((ch) => ch.id === state.selectedChannel)?.label ?? null;
  const loginName = state.loginStatus === "success" ? state.loginDisplayName : null;

  return html`
    <div class="onboarding-confirm-hero">
      <div class="onboarding-confirm-hero__icon">🚀</div>
    </div>

    <div class="onboarding-confirm-list">
      <div class="onboarding-confirm-row">
        <span class="onboarding-confirm-row__label">${t.confirmLogin}</span>
        <span class="onboarding-confirm-row__value ${loginName ? "" : "onboarding-confirm-row__value--muted"}">
          ${loginName ?? t.confirmLoginNone}
        </span>
      </div>
      <div class="onboarding-confirm-row">
        <span class="onboarding-confirm-row__label">${t.confirmLanguage}</span>
        <span class="onboarding-confirm-row__value">${localeName}</span>
      </div>
      <div class="onboarding-confirm-row">
        <span class="onboarding-confirm-row__label">${t.confirmProvider}</span>
        <span class="onboarding-confirm-row__value ${providerName ? "" : "onboarding-confirm-row__value--muted"}">
          ${providerName ?? t.confirmProviderNone}
        </span>
      </div>
      <div class="onboarding-confirm-row">
        <span class="onboarding-confirm-row__label">${t.confirmChannel}</span>
        <span class="onboarding-confirm-row__value ${channelName ? "" : "onboarding-confirm-row__value--muted"}">
          ${channelName ?? t.confirmChannelNone}
        </span>
      </div>
    </div>
  `;
}
