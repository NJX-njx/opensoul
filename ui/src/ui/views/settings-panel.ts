/**
 * Settings panel - a modal overlay containing:
 *   - General
 *   - Config
 *   - Logs
 *   - Debug
 */
import { html, nothing } from "lit";
import type { AppViewState } from "../app-view-state.ts";
import type { SettingsTab } from "../navigation.ts";
import { renderThemeToggle } from "../app-render.helpers.ts";
import { resolveUiLocale, uiText } from "../i18n.ts";
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

function sectionSummary(
  state: AppViewState,
  section: SettingsSection,
): { label: string; description: string } {
  const t = (english: string, chinese: string) => uiText(state.uiLocale, english, chinese);
  switch (section) {
    case "general":
      return {
        label: t("General", "\u901a\u7528"),
        description: t(
          "Personal preferences and language.",
          "\u4e2a\u6027\u5316\u4f60\u7684\u754c\u9762\u504f\u597d\u548c\u8bed\u8a00\u3002",
        ),
      };
    case "config":
      return {
        label: t("Config", "\u914d\u7f6e"),
        description: t(
          "Organized configuration with section-based editing.",
          "\u5206\u533a\u7ec4\u7ec7\u7684\u914d\u7f6e\uff0c\u4e0d\u518d\u4e00\u5c4f\u4fe1\u606f\u538b\u5012\u4f60\u3002",
        ),
      };
    case "logs":
      return {
        label: t("Logs", "\u65e5\u5fd7"),
        description: t(
          "Readable runtime logs for troubleshooting.",
          "\u6613\u4e8e\u9605\u8bfb\u7684\u8fd0\u884c\u65e5\u5fd7\uff0c\u65b9\u4fbf\u5feb\u901f\u6392\u67e5\u95ee\u9898\u3002",
        ),
      };
    case "debug":
      return {
        label: t("Debug", "\u8c03\u8bd5"),
        description: t(
          "System diagnostics and advanced gateway tools.",
          "\u7cfb\u7edf\u8bca\u65ad\u53ca\u9ad8\u7ea7\u7f51\u5173\u8c03\u8bd5\u5de5\u5177\u3002",
        ),
      };
    default:
      return { label: section, description: "" };
  }
}

function renderGeneralSection(state: AppViewState) {
  const t = (english: string, chinese: string) => uiText(state.uiLocale, english, chinese);
  const selectedLocale = resolveUiLocale(state.uiLocale);

  const handleLocaleChange = (event: Event) => {
    const select = event.currentTarget as HTMLSelectElement | null;
    if (!select) {
      return;
    }
    const next = resolveUiLocale(select.value);
    state.setUiLocale(next);
  };

  return html`
    <section class="settings-page settings-page--general">
      <header class="settings-page__header settings-page__header--compact">
        <div>
          <h3 class="settings-page__title">${t("Personalization", "\u4e2a\u6027\u5316")}</h3>
          <p class="settings-page__desc">
            ${t(
              "Tune appearance and language to match your daily workflow.",
              "\u8c03\u6574\u4f60\u7684\u5916\u89c2\u548c\u8bed\u8a00\uff0c\u8ba9\u5de5\u4f5c\u6d41\u66f4\u52a0\u81ea\u7136\u3002",
            )}
          </p>
        </div>
      </header>

      <div class="settings-surface">
        <h4 class="settings-section__title">${t("Appearance", "\u5916\u89c2")}</h4>
        <div class="settings-section__row">
          <div class="settings-section__row-info">
            <span class="settings-section__row-label">${t("Theme", "\u4e3b\u9898")}</span>
            <span class="settings-section__row-desc">
              ${t(
                "Choose light, dark, or follow your system preference.",
                "\u53ef\u9009\u62e9\u6d45\u8272\u3001\u6df1\u8272\u6216\u8ddf\u968f\u7cfb\u7edf\u5916\u89c2\u3002",
              )}
            </span>
          </div>
          <div class="settings-section__row-control">
            ${renderThemeToggle(state)}
          </div>
        </div>

        <h4 class="settings-section__title settings-section__title--spaced">
          ${t("Language", "\u8bed\u8a00")}
        </h4>
        <div class="settings-section__row">
          <div class="settings-section__row-info">
            <span class="settings-section__row-label">${t("System language", "\u7cfb\u7edf\u8bed\u8a00")}</span>
            <span class="settings-section__row-desc">
              ${t(
                "Uses the same options as onboarding and applies immediately.",
                "\u4e0e\u5f15\u5bfc\u9875\u4fdd\u6301\u4e00\u81f4\uff0c\u5207\u6362\u540e\u7acb\u5373\u751f\u6548\u3002",
              )}
            </span>
          </div>
          <div class="settings-section__row-control">
            <label class="settings-sr-only" for="settings-system-language">
              ${t("System language", "\u7cfb\u7edf\u8bed\u8a00")}
            </label>
            <select
              id="settings-system-language"
              class="settings-select"
              .value=${selectedLocale}
              @input=${handleLocaleChange}
              @change=${handleLocaleChange}
            >
              ${AVAILABLE_LOCALES.map(
                (locale) =>
                  html`<option
                    value=${locale.value}
                    ?selected=${locale.value === selectedLocale}
                  >
                    ${locale.nativeLabel} - ${locale.label}
                  </option>`,
              )}
            </select>
          </div>
        </div>
      </div>

      <div class="settings-surface settings-surface--subtle">
        <h4 class="settings-section__title">${t("Resources", "\u8d44\u6e90")}</h4>
        <a
          class="settings-link"
          href="https://github.com/NJX-njx/opensoul"
          target="_blank"
          rel="noreferrer"
        >
          <span class="settings-link__icon">${icons.link}</span>
          <span class="settings-link__text">${t("GitHub Repository", "GitHub \u4ed3\u5e93")}</span>
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
    </section>
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
        return t("General", "\u901a\u7528");
      case "config":
        return t("Config", "\u914d\u7f6e");
      case "logs":
        return t("Logs", "\u65e5\u5fd7");
      case "debug":
        return t("Debug", "\u8c03\u8bd5");
      default:
        return section;
    }
  };

  const section = state.settingsSection;
  const sectionMeta = sectionSummary(state, section);

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
        <div class="settings-panel__header-main">
          <h2 class="settings-panel__title">${t("Settings", "\u8bbe\u7f6e")}</h2>
          <p class="settings-panel__subtitle">${sectionMeta.description}</p>
        </div>
        <div class="settings-panel__header-actions">
          <span class="settings-kbd" aria-hidden="true">Esc</span>
          <button
            class="settings-panel__close"
            @click=${() => state.closeSettings()}
            title=${t("Close settings", "\u5173\u95ed\u8bbe\u7f6e")}
            aria-label=${t("Close settings", "\u5173\u95ed\u8bbe\u7f6e")}
          >
            ${icons.x}
          </button>
        </div>
      </div>

      <div class="settings-panel__body">
        <nav class="settings-panel__nav">
          ${SETTINGS_NAV.map((item) => {
            const meta = sectionSummary(state, item.id);
            return html`
              <button
                class="settings-nav-item ${section === item.id ? "active" : ""}"
                @click=${() => state.setSettingsSection(item.id)}
                title=${meta.description}
              >
                <span class="settings-nav-item__icon">${icons[item.icon]}</span>
                <span class="settings-nav-item__text">${navLabel(item.id)}</span>
              </button>
            `;
          })}
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
