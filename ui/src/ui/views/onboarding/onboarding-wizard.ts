/**
 * Main onboarding wizard — renders the full-screen setup overlay.
 *
 * The wizard has 4 steps:
 *  1. Language selection
 *  2. AI provider selection (skippable)
 *  3. Channel connection (skippable)
 *  4. Confirm & Launch
 */
import { html, nothing } from "lit";
import { getMessages } from "./i18n.ts";
import { renderStepChannel } from "./step-channel.ts";
import { renderStepConfirm } from "./step-confirm.ts";
import { renderStepLanguage } from "./step-language.ts";
import { renderStepProvider } from "./step-provider.ts";
import type { OnboardingWizardState } from "./types.ts";

const TOTAL_STEPS = 4;

function renderStepContent(state: OnboardingWizardState) {
  switch (state.step) {
    case 1:
      return renderStepLanguage(state);
    case 2:
      return renderStepProvider(state);
    case 3:
      return renderStepChannel(state);
    case 4:
      return renderStepConfirm(state);
  }
}

function stepTitle(state: OnboardingWizardState): string {
  const t = getMessages(state.locale);
  switch (state.step) {
    case 1:
      return t.langTitle;
    case 2:
      return t.providerTitle;
    case 3:
      return t.channelTitle;
    case 4:
      return t.confirmTitle;
  }
}

function stepSubtitle(state: OnboardingWizardState): string {
  const t = getMessages(state.locale);
  switch (state.step) {
    case 1:
      return t.langSubtitle;
    case 2:
      return t.providerSubtitle;
    case 3:
      return t.channelSubtitle;
    case 4:
      return t.confirmSubtitle;
  }
}

export function renderOnboardingWizard(state: OnboardingWizardState) {
  const t = getMessages(state.locale);
  const isFirstStep = state.step === 1;
  const isLastStep = state.step === TOTAL_STEPS;
  const canSkip = state.step === 2 || state.step === 3;

  return html`
    <div class="onboarding-wizard">
      <div class="onboarding-card">
        <!-- Progress bar -->
        <div class="onboarding-progress">
          ${Array.from({ length: TOTAL_STEPS }, (_, i) => {
            const stepNum = i + 1;
            const isDone = stepNum < state.step;
            const isActive = stepNum === state.step;
            return html`
              <div
                class="onboarding-progress__step ${isDone ? "onboarding-progress__step--done" : ""} ${isActive ? "onboarding-progress__step--active" : ""}"
              ></div>
            `;
          })}
        </div>

        <!-- Header -->
        <div class="onboarding-header">
          <div class="onboarding-header__step-label">
            ${t.stepOf(state.step, TOTAL_STEPS)}
          </div>
          <h2 class="onboarding-header__title">${stepTitle(state)}</h2>
          <p class="onboarding-header__subtitle">${stepSubtitle(state)}</p>
        </div>

        <!-- Body -->
        <div class="onboarding-body">
          ${renderStepContent(state)}
        </div>

        <!-- Footer -->
        <div class="onboarding-footer">
          <div class="onboarding-footer__left">
            ${isFirstStep
              ? nothing
              : html`
                  <button class="onboarding-btn onboarding-btn--ghost" @click=${state.onBack}>
                    ${t.back}
                  </button>
                `}
          </div>
          <div class="onboarding-footer__right">
            ${canSkip
              ? html`
                  <button class="onboarding-btn" @click=${state.onSkip}>
                    ${t.skip}
                  </button>
                `
              : nothing}
            ${isLastStep
              ? html`
                  <button class="onboarding-btn onboarding-btn--primary" @click=${state.onFinish}>
                    ${t.confirmLaunch} →
                  </button>
                `
              : html`
                  <button class="onboarding-btn onboarding-btn--primary" @click=${state.onNext}>
                    ${t.next} →
                  </button>
                `}
          </div>
        </div>
      </div>
    </div>
  `;
}
