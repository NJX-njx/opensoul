/**
 * Step 2: Login — Google or GitHub OAuth.
 *
 * This step offers two social login buttons and an optional "skip" affordance.
 * The actual OAuth redirect is handled by the callbacks supplied in state.
 */
import { html, nothing } from "lit";
import { getMessages } from "./i18n.ts";
import type { OnboardingWizardState } from "./types.ts";

/* ---------- inline SVG icons ---------- */

const googleIcon = html`
  <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
`;

const githubIcon = html`
  <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
`;

/* ---------- spinner for loading state ---------- */

const spinnerIcon = html`
  <svg class="onboarding-login-spinner" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>
`;

/* ---------- render ---------- */

export function renderStepLogin(state: OnboardingWizardState) {
  const t = getMessages(state.locale);
  const isLoggingIn = state.loginStatus === "loading";
  const hasError = state.loginStatus === "error";
  const isLoggedIn = state.loginStatus === "success";

  return html`
    <div class="onboarding-login">
      <!-- Logged-in state -->
      ${isLoggedIn && state.loginDisplayName
        ? html`
            <div class="onboarding-login-success">
              <div class="onboarding-login-success__avatar">
                ${state.loginAvatarUrl
                  ? html`<img src="${state.loginAvatarUrl}" alt="" class="onboarding-login-success__avatar-img" />`
                  : html`<span class="onboarding-login-success__avatar-fallback">
                      ${state.loginDisplayName.charAt(0).toUpperCase()}
                    </span>`}
              </div>
              <div class="onboarding-login-success__info">
                <div class="onboarding-login-success__name">${state.loginDisplayName}</div>
                ${state.loginEmail
                  ? html`<div class="onboarding-login-success__email">${state.loginEmail}</div>`
                  : nothing}
              </div>
              <button
                class="onboarding-btn onboarding-btn--ghost onboarding-login-success__logout"
                @click=${state.onLogout}
              >
                ${t.loginLogout}
              </button>
            </div>
          `
        : html`
            <!-- Login buttons -->
            <div class="onboarding-login-buttons">
              <button
                class="onboarding-login-btn onboarding-login-btn--google"
                @click=${state.onGoogleLogin}
                ?disabled=${isLoggingIn}
              >
                <span class="onboarding-login-btn__icon">${googleIcon}</span>
                <span class="onboarding-login-btn__label">
                  ${isLoggingIn ? spinnerIcon : nothing}
                  ${t.loginWithGoogle}
                </span>
              </button>

              <button
                class="onboarding-login-btn onboarding-login-btn--github"
                @click=${state.onGithubLogin}
                ?disabled=${isLoggingIn}
              >
                <span class="onboarding-login-btn__icon">${githubIcon}</span>
                <span class="onboarding-login-btn__label">
                  ${isLoggingIn ? spinnerIcon : nothing}
                  ${t.loginWithGithub}
                </span>
              </button>
            </div>

            <!-- Divider -->
            <div class="onboarding-login-divider">
              <span class="onboarding-login-divider__line"></span>
              <span class="onboarding-login-divider__text">${t.loginOrDivider}</span>
              <span class="onboarding-login-divider__line"></span>
            </div>

            <!-- Skip hint -->
            <div class="onboarding-login-skip-hint">
              ${t.loginSkipHint}
            </div>
          `}

      <!-- Error message -->
      ${hasError && state.loginError
        ? html`
            <div class="onboarding-login-error">
              <span class="onboarding-login-error__icon">⚠️</span>
              <span class="onboarding-login-error__text">${state.loginError}</span>
            </div>
          `
        : nothing}
    </div>
  `;
}
