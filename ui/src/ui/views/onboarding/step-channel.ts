/**
 * Step 3: Chat channel selection.
 */
import { html, nothing } from "lit";
import { getMessages } from "./i18n.ts";
import { ONBOARDING_CHANNELS, type OnboardingWizardState } from "./types.ts";

const DIFFICULTY_LABELS: Record<string, Record<string, string>> = {
  en: { easy: "Easy", medium: "Medium", advanced: "Advanced" },
  "zh-CN": { easy: "简单", medium: "中等", advanced: "高级" },
  "zh-TW": { easy: "簡單", medium: "中等", advanced: "進階" },
  ja: { easy: "簡単", medium: "普通", advanced: "上級" },
  ko: { easy: "쉬움", medium: "보통", advanced: "고급" },
  es: { easy: "Fácil", medium: "Medio", advanced: "Avanzado" },
  fr: { easy: "Facile", medium: "Moyen", advanced: "Avancé" },
  de: { easy: "Einfach", medium: "Mittel", advanced: "Fortgeschritten" },
  "pt-BR": { easy: "Fácil", medium: "Médio", advanced: "Avançado" },
  ru: { easy: "Легко", medium: "Средне", advanced: "Сложно" },
};

function getDifficultyLabel(locale: string, difficulty: string): string {
  return DIFFICULTY_LABELS[locale]?.[difficulty] ?? DIFFICULTY_LABELS.en[difficulty] ?? difficulty;
}

export function renderStepChannel(state: OnboardingWizardState) {
  const t = getMessages(state.locale);
  const selectedChannel = ONBOARDING_CHANNELS.find((ch) => ch.id === state.selectedChannel);

  return html`
    <div class="onboarding-channel-grid">
      ${ONBOARDING_CHANNELS.map((channel) => {
        const selected = state.selectedChannel === channel.id;
        return html`
          <button
            class="onboarding-channel-item ${selected ? "onboarding-channel-item--selected" : ""}"
            @click=${() => state.onChannelSelect(selected ? null : channel.id)}
          >
            <span class="onboarding-channel-item__icon">${channel.icon}</span>
            <span class="onboarding-channel-item__name">${channel.label}</span>
            <span class="onboarding-channel-item__difficulty">
              ${getDifficultyLabel(state.locale, channel.difficulty)}
            </span>
          </button>
        `;
      })}
    </div>

    ${selectedChannel && selectedChannel.tokenLabel
      ? html`
          <div class="onboarding-channel-token">
            <div class="onboarding-channel-token__label">${selectedChannel.tokenLabel}</div>
            <div class="onboarding-channel-token__hint">${selectedChannel.tokenHint}</div>
            <input
              class="onboarding-provider-input"
              type="password"
              placeholder=${t.channelTokenPlaceholder}
              .value=${state.channelToken}
              @input=${(e: InputEvent) =>
                state.onChannelTokenChange((e.target as HTMLInputElement).value)}
            />
          </div>
        `
      : selectedChannel
        ? html`
            <div class="onboarding-channel-token">
              <div class="onboarding-channel-token__hint">${selectedChannel.tokenHint}</div>
            </div>
          `
        : nothing}
  `;
}
