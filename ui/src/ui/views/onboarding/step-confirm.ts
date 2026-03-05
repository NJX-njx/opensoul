/**
 * Step 5: Confirm and launch.
 */
import { html } from "lit";
import { AVAILABLE_LOCALES, getMessages } from "./i18n.ts";
import {
  COMMON_MODEL_FAILURES,
  ONBOARDING_CHANNELS,
  ONBOARDING_PROVIDERS,
  PROVIDER_VERIFY_CMDS,
  type OnboardingWizardState,
} from "./types.ts";

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
const WARN_SVG = html`
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
      d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
    />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
`;

/** Find a failure entry whose label matches an error string (case-insensitive). */
function findFailureFix(errorMsg: string) {
  const lower = errorMsg.toLowerCase();
  return COMMON_MODEL_FAILURES.find((f) => lower.includes(f.label.toLowerCase())) ?? null;
}

export function renderStepConfirm(state: OnboardingWizardState) {
  const t = getMessages(state.locale);
  const localeName =
    AVAILABLE_LOCALES.find((l) => l.value === state.locale)?.nativeLabel ?? state.locale;
  const providerName =
    ONBOARDING_PROVIDERS.find((p) => p.id === state.selectedProvider)?.label ?? null;
  const channelName =
    ONBOARDING_CHANNELS.find((ch) => ch.id === state.selectedChannel)?.label ?? null;
  const loginName = state.loginStatus === "success" ? state.loginDisplayName : null;
  const configError = state.configApplyError;

  // Verification commands for the selected provider
  const verifyCmds = state.selectedProvider
    ? (PROVIDER_VERIFY_CMDS[state.selectedProvider] ?? [])
    : [];

  // Try to map the error to a known fix
  const failureFix = configError ? findFailureFix(configError) : null;

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

    ${
      configError
        ? html`
          <div class="callout danger" style="margin-top: 16px;">
            <strong>${WARN_SVG} Setup error:</strong> ${configError}
            ${
              failureFix
                ? html`
                  <div style="margin-top: 8px; font-size: 0.85em;">
                    <strong>Suggested fix:</strong> ${failureFix.fix}
                    ${
                      failureFix.cmd
                        ? html`<div style="margin-top:4px;"><code>${failureFix.cmd}</code></div>`
                        : ""
                    }
                  </div>
                `
                : html`
                    <div style="margin-top: 8px; font-size: 0.85em">
                      Run <code>opensoul models status --check</code> to diagnose issues.
                    </div>
                  `
            }
          </div>
        `
        : ""
    }

    ${
      verifyCmds.length > 0
        ? html`
          <div class="onboarding-verify-block" style="margin-top: 16px;">
            <div class="onboarding-verify-block__title">
              ${TERMINAL_SVG}
              After launch — verify your setup
            </div>
            <div class="onboarding-verify-block__hint">
              Run these commands to confirm your model provider is working:
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
        : ""
    }
  `;
}
