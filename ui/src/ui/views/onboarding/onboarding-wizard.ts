/**
 * Main onboarding wizard — renders the full-screen setup overlay.
 *
 * The wizard has 5 steps:
 *  1. Language selection
 *  2. Login / Register (NOT skippable)
 *  3. AI provider selection (skippable)
 *  4. Channel connection (skippable)
 *  5. Confirm & Launch
 */
import { html, nothing } from "lit";
import type { OnboardingWizardState } from "./types.ts";
import { getMessages } from "./i18n.ts";
import { renderStepChannel } from "./step-channel.ts";
import { renderStepConfirm } from "./step-confirm.ts";
import { renderStepLanguage } from "./step-language.ts";
import { renderStepLogin } from "./step-login.ts";
import { renderStepProvider } from "./step-provider.ts";

const TOTAL_STEPS = 5;

/* Step icon SVGs */
const stepIcons: Record<number, ReturnType<typeof html>> = {
  1: html`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  2: html`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  3: html`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
  4: html`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  5: html`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
};

function renderStepContent(state: OnboardingWizardState) {
  switch (state.step) {
    case 1:
      return renderStepLanguage(state);
    case 2:
      return renderStepLogin(state);
    case 3:
      return renderStepProvider(state);
    case 4:
      return renderStepChannel(state);
    case 5:
      return renderStepConfirm(state);
  }
}

function stepTitle(state: OnboardingWizardState): string {
  const t = getMessages(state.locale);
  switch (state.step) {
    case 1:
      return t.langTitle;
    case 2:
      return t.loginTitle;
    case 3:
      return t.providerTitle;
    case 4:
      return t.channelTitle;
    case 5:
      return t.confirmTitle;
  }
}

function stepSubtitle(state: OnboardingWizardState): string {
  const t = getMessages(state.locale);
  switch (state.step) {
    case 1:
      return t.langSubtitle;
    case 2:
      return t.loginSubtitle;
    case 3:
      return t.providerSubtitle;
    case 4:
      return t.channelSubtitle;
    case 5:
      return t.confirmSubtitle;
  }
}

/**
 * Whether "Next" is allowed on the current step.
 * - Step 2 (Login): requires successful login
 * - Step 3/4 (Provider/Channel): for new accounts, must have a selection OR use "Skip"
 */
function canProceed(state: OnboardingWizardState): boolean {
  switch (state.step) {
    case 2:
      // Login step: must be logged in to proceed
      return state.loginStatus === "success";
    case 3:
      // Provider: new accounts need a selection; existing can always proceed
      if (state.isExistingAccount) return true;
      return state.selectedProvider !== null && state.providerApiKey.trim().length > 0;
    case 4:
      // Channel: new accounts need a selection; existing can always proceed
      if (state.isExistingAccount) return true;
      return state.selectedChannel !== null;
    default:
      return true;
  }
}

export function renderOnboardingWizard(state: OnboardingWizardState) {
  const t = getMessages(state.locale);
  const isFirstStep = state.step === 1;
  const isLastStep = state.step === TOTAL_STEPS;
  // Provider (3) and Channel (4) are skippable; Login (2) is NOT
  const canSkip = state.step === 3 || state.step === 4;
  const nextAllowed = canProceed(state);

  return html`
    <div class="onboarding-wizard">
      <div class="onboarding-card">
        <!-- Step indicator with icons -->
        <div class="onboarding-progress">
          ${Array.from({ length: TOTAL_STEPS }, (_, i) => {
            const stepNum = i + 1;
            const isDone = stepNum < state.step;
            const isActive = stepNum === state.step;
            return html`
              <div
                class="onboarding-progress__step ${isDone ? "onboarding-progress__step--done" : ""} ${isActive ? "onboarding-progress__step--active" : ""}"
              >
                <span class="onboarding-progress__icon">${stepIcons[stepNum]}</span>
              </div>
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
            ${
              isFirstStep
                ? nothing
                : html`
                  <button class="onboarding-btn onboarding-btn--ghost" @click=${state.onBack}>
                    ← ${t.back}
                  </button>
                `
            }
          </div>
          <div class="onboarding-footer__right">
            ${
              canSkip
                ? html`
                  <button class="onboarding-btn onboarding-btn--outline" @click=${state.onSkip}>
                    ${t.skip}
                  </button>
                `
                : nothing
            }
            ${
              isLastStep
                ? html`
                  <button class="onboarding-btn onboarding-btn--primary" @click=${state.onFinish}>
                    ${t.confirmLaunch} 🚀
                  </button>
                `
                : html`
                  <button
                    class="onboarding-btn onboarding-btn--primary ${!nextAllowed ? "onboarding-btn--disabled" : ""}"
                    @click=${state.onNext}
                    ?disabled=${!nextAllowed}
                  >
                    ${t.next} →
                  </button>
                `
            }
          </div>
        </div>
      </div>
    </div>
  `;
}
