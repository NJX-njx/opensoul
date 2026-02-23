/**
 * Settings panel - a modal overlay containing:
 *   - General
 *   - Config
 *   - Logs
 *   - Debug
 */
import { html, nothing } from "lit";
import type { AppViewState } from "../app-view-state.ts";
import { uiText } from "../i18n.ts";
import type { SettingsTab } from "../navigation.ts";
import { renderThemeToggle } from "../app-render.helpers.ts";
import { icons } from "../icons.ts";
import { AVAILABLE_LOCALES, type Locale } from "./onboarding/i18n.ts";

type SettingsSection = SettingsTab | "general";

const SETTINGS_NAV: Array<{
  id: SettingsSection;
  icon: keyof typeof icons;
}> = [
  { id: "general", icon: "settings" },
  { id: "config", icon: "settings" },
  { id: "logs", icon: "scrollText" },
  { id: "debug", icon: "bug" },
];

function renderGeneralSection(state: AppViewState) {
  const t = (english: string, chinese: string) => uiText(state.uiLocale, english, chinese);

  const handleLocaleChange = (event: Event) => {
    const select = event.currentTarget as HTMLSelectElement | null;
    if (!select) {
      return;
    }
    state.setUiLocale(select.value as Locale);
  };

  return html`
    <div class="settings-section">
      <h3 class="settings-section__title">${t("Appearance", "外观")}</h3>
      <div class="settings-section__row">
        <div class="settings-section__row-info">
          <span class="settings-section__row-label">${t("Theme", "主题")}</span>
          <span class="settings-section__row-desc">
            ${t(
              "Choose light, dark, or follow your system preference.",
              "选择浅色、深色，或跟随系统偏好。",
            )}
          </span>
        </div>
        <div class="settings-section__row-control">
          ${renderThemeToggle(state)}
        </div>
      </div>

      <h3 class="settings-section__title" style="margin-top:28px;">
        ${t("Language", "语言")}
      </h3>
      <div class="settings-section__row">
        <div class="settings-section__row-info">
          <span class="settings-section__row-label">${t("System Language", "系统语言")}</span>
          <span class="settings-section__row-desc">
            ${t(
              "Use the same language options as onboarding and apply immediately.",
              "与引导页使用同一套语言选项，修改后立即生效。",
            )}
          </span>
        </div>
        <div class="settings-section__row-control">
          <label class="settings-sr-only" for="settings-system-language">
            ${t("System language", "系统语言")}
          </label>
          <select
            id="settings-system-language"
            class="settings-select"
            .value=${state.uiLocale}
            @change=${handleLocaleChange}
          >
            ${AVAILABLE_LOCALES.map(
              (locale) =>
                html`<option value=${locale.value}>${locale.nativeLabel} - ${locale.label}</option>`,
            )}
          </select>
        </div>
      </div>

      <h3 class="settings-section__title" style="margin-top:28px;">${t("Links", "链接")}</h3>
      <a
        class="settings-link"
        href="https://github.com/NJX-njx/opensoul"
        target="_blank"
        rel="noreferrer"
      >
        <span class="settings-link__icon">${icons.link}</span>
        <span class="settings-link__text">${t("GitHub Repository", "GitHub 仓库")}</span>
        <span class="settings-link__external">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" x2="21" y1="14" y2="3"></line>
          </svg>
        </span>
      </a>
    </div>
  `;
}

export function renderSettingsPanel(
  state: AppViewState,
  contentSlots: {
    config: unknown;
    logs: unknown;
    debug: unknown;
  },
) {
  if (!state.settingsOpen) {
    return nothing;
  }

  const t = (english: string, chinese: string) => uiText(state.uiLocale, english, chinese);
  const navLabel = (section: SettingsSection) => {
    switch (section) {
      case "general":
        return t("General", "通用");
      case "config":
        return t("Config", "配置");
      case "logs":
        return t("Logs", "日志");
      case "debug":
        return t("Debug", "调试");
      default:
        return section;
    }
  };

  const section = state.settingsSection;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      state.closeSettings();
    }
  };

  return html`
    <div class="settings-backdrop" @click=${() => state.closeSettings()}></div>

    <div class="settings-panel" @keydown=${handleKeyDown} tabindex="-1">
      <div class="settings-panel__header">
        <h2 class="settings-panel__title">${t("Settings", "设置")}</h2>
        <button
          class="settings-panel__close"
          @click=${() => state.closeSettings()}
          title=${t("Close settings", "关闭设置")}
          aria-label=${t("Close settings", "关闭设置")}
        >
          ${icons.x}
        </button>
      </div>

      <div class="settings-panel__body">
        <nav class="settings-panel__nav">
          ${SETTINGS_NAV.map(
            (item) => html`
              <button
                class="settings-nav-item ${section === item.id ? "active" : ""}"
                @click=${() => state.setSettingsSection(item.id)}
              >
                <span class="settings-nav-item__icon">${icons[item.icon]}</span>
                <span class="settings-nav-item__text">${navLabel(item.id)}</span>
              </button>
            `,
          )}
        </nav>

        <div class="settings-panel__content">
          ${section === "general" ? renderGeneralSection(state) : nothing}
          ${section === "config" ? contentSlots.config : nothing}
          ${section === "logs" ? contentSlots.logs : nothing}
          ${section === "debug" ? contentSlots.debug : nothing}
        </div>
      </div>
    </div>
  `;
}
