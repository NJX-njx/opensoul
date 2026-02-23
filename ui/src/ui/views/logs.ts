import { html, nothing } from "lit";
import type { LogEntry, LogLevel } from "../types.ts";
import type { Locale } from "./onboarding/i18n.ts";
import { uiText } from "../i18n.ts";

const LEVELS: LogLevel[] = ["trace", "debug", "info", "warn", "error", "fatal"];

export type LogsProps = {
  locale: Locale;
  loading: boolean;
  error: string | null;
  file: string | null;
  entries: LogEntry[];
  filterText: string;
  levelFilters: Record<LogLevel, boolean>;
  autoFollow: boolean;
  truncated: boolean;
  onFilterTextChange: (next: string) => void;
  onLevelToggle: (level: LogLevel, enabled: boolean) => void;
  onToggleAutoFollow: (next: boolean) => void;
  onRefresh: () => void;
  onExport: (lines: string[], label: string) => void;
  onScroll: (event: Event) => void;
};

function formatTime(value?: string | null) {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleTimeString();
}

function matchesFilter(entry: LogEntry, needle: string) {
  if (!needle) {
    return true;
  }
  const haystack = [entry.message, entry.subsystem, entry.raw]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(needle);
}

function countByLevel(entries: LogEntry[]) {
  const counts: Record<LogLevel, number> = {
    trace: 0,
    debug: 0,
    info: 0,
    warn: 0,
    error: 0,
    fatal: 0,
  };
  for (const entry of entries) {
    if (entry.level && entry.level in counts) {
      counts[entry.level] += 1;
    }
  }
  return counts;
}

export function renderLogs(props: LogsProps) {
  const t = (english: string, chinese: string) => uiText(props.locale, english, chinese);
  const needle = props.filterText.trim().toLowerCase();
  const levelFiltered = LEVELS.some((level) => !props.levelFilters[level]);
  const filtered = props.entries.filter((entry) => {
    if (entry.level && !props.levelFilters[entry.level]) {
      return false;
    }
    return matchesFilter(entry, needle);
  });

  const counts = countByLevel(props.entries);
  const issueCount = filtered.filter(
    (entry) => entry.level === "warn" || entry.level === "error" || entry.level === "fatal",
  ).length;
  const exportLabel = needle || levelFiltered ? "filtered" : "visible";

  return html`
    <section class="settings-page settings-page--logs">
      <header class="settings-page__header">
        <div>
          <h3 class="settings-page__title">${t("Runtime Logs", "\u8fd0\u884c\u65e5\u5fd7")}</h3>
          <p class="settings-page__desc">
            ${t(
              "Monitor your system activity and troubleshoot issues.",
              "\u76d1\u63a7\u7cfb\u7edf\u8fd0\u884c\u72b6\u6001\uff0c\u5feb\u901f\u5b9a\u4f4d\u95ee\u9898\u3002",
            )}
          </p>
        </div>
      </header>

      <!-- Compact toolbar: search + filters + actions in one row -->
      <div class="logs-toolbar-v2">
        <div class="logs-toolbar-v2__search">
          <svg class="logs-toolbar-v2__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
          <input
            class="logs-toolbar-v2__input"
            .value=${props.filterText}
            @input=${(e: Event) => props.onFilterTextChange((e.target as HTMLInputElement).value)}
            placeholder=${t("Filter logs...", "\u7b5b\u9009\u65e5\u5fd7...")}
          />
          ${
            props.filterText
              ? html`
            <button class="logs-toolbar-v2__clear" @click=${() => props.onFilterTextChange("")}>\u00d7</button>
          `
              : nothing
          }
        </div>

        <div class="logs-toolbar-v2__filters">
          ${LEVELS.map(
            (level) => html`
              <button
                class="logs-level-pill ${level} ${props.levelFilters[level] ? "active" : ""}"
                @click=${() => props.onLevelToggle(level, !props.levelFilters[level])}
                title="${level} (${counts[level]})"
              >
                <span class="logs-level-pill__dot"></span>
                <span class="logs-level-pill__label">${level}</span>
                ${counts[level] > 0 ? html`<span class="logs-level-pill__count">${counts[level]}</span>` : nothing}
              </button>
            `,
          )}
        </div>

        <div class="logs-toolbar-v2__actions">
          <label class="logs-auto-follow">
            <input
              type="checkbox"
              .checked=${props.autoFollow}
              @change=${(e: Event) =>
                props.onToggleAutoFollow((e.target as HTMLInputElement).checked)}
            />
            <span>${t("Auto-follow", "\u81ea\u52a8\u8ddf\u8e2a")}</span>
          </label>
          <button class="btn btn--sm btn--ghost" ?disabled=${props.loading} @click=${props.onRefresh}>
            ${props.loading ? t("Loading...", "\u52a0\u8f7d\u4e2d...") : t("Refresh", "\u5237\u65b0")}
          </button>
          <button
            class="btn btn--sm btn--ghost"
            ?disabled=${filtered.length === 0}
            @click=${() =>
              props.onExport(
                filtered.map((entry) => entry.raw),
                exportLabel,
              )}
          >
            ${t("Export", "\u5bfc\u51fa")}
          </button>
        </div>
      </div>

      <!-- Inline summary bar -->
      <div class="logs-summary-bar">
        <span class="logs-summary-tag">
          ${t("Showing", "\u663e\u793a")} <strong>${filtered.length}</strong> / <strong>${props.entries.length}</strong> ${t("entries", "\u6761")}
        </span>
        ${
          issueCount > 0
            ? html`
          <span class="logs-summary-tag logs-summary-tag--warn">
            <span class="logs-summary-tag__dot"></span>
            ${issueCount} ${t("issues", "\u6761\u5f02\u5e38")}
          </span>
        `
            : html`
          <span class="logs-summary-tag logs-summary-tag--ok">
            <span class="logs-summary-tag__dot"></span>
            ${t("No issues", "\u65e0\u5f02\u5e38")}
          </span>
        `
        }
        ${
          props.file
            ? html`
          <span class="logs-summary-tag logs-summary-tag--muted">
            ${props.file}
          </span>
        `
            : nothing
        }
      </div>

      ${
        props.truncated
          ? html`
              <div class="logs-notice logs-notice--warn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="logs-notice__icon">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                ${t(
                  "Output is truncated. Showing the most recent entries.",
                  "\u65e5\u5fd7\u5df2\u88ab\u622a\u65ad\uff0c\u4ec5\u5c55\u793a\u6700\u8fd1\u7684\u6761\u76ee\u3002",
                )}
              </div>
            `
          : nothing
      }
      ${
        props.error
          ? html`<div class="logs-notice logs-notice--error">${props.error}</div>`
          : nothing
      }

      <!-- Log stream -->
      <div class="logs-stream-v2" @scroll=${props.onScroll}>
        ${
          filtered.length === 0
            ? html`
                <div class="logs-empty-v2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="logs-empty-v2__icon">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="M21 21l-4.35-4.35"></path>
                  </svg>
                  <div class="logs-empty-v2__title">${t("No matching logs", "\u6ca1\u6709\u5339\u914d\u7684\u65e5\u5fd7")}</div>
                  <div class="logs-empty-v2__desc">
                    ${t(
                      "Try adjusting filters or search keywords.",
                      "\u8bd5\u8bd5\u8c03\u6574\u7b5b\u9009\u6761\u4ef6\u6216\u641c\u7d22\u5173\u952e\u8bcd\u3002",
                    )}
                  </div>
                </div>
              `
            : filtered.map(
                (entry) => html`
                  <div class="log-entry-v2 ${entry.level ? `log-entry-v2--${entry.level}` : ""}">
                    <div class="log-entry-v2__gutter">
                      <span class="log-entry-v2__time">${formatTime(entry.time)}</span>
                      ${
                        entry.level
                          ? html`<span class="log-entry-v2__badge ${entry.level}">${entry.level}</span>`
                          : nothing
                      }
                    </div>
                    <div class="log-entry-v2__body">
                      <div class="log-entry-v2__message">${entry.message ?? entry.raw}</div>
                      ${entry.subsystem ? html`<span class="log-entry-v2__subsystem">${entry.subsystem}</span>` : nothing}
                    </div>
                    ${
                      entry.raw && entry.message && entry.raw !== entry.message
                        ? html`
                            <details class="log-entry-v2__raw">
                              <summary>${t("Raw", "\u539f\u59cb")}</summary>
                              <pre class="code-block">${entry.raw}</pre>
                            </details>
                          `
                        : nothing
                    }
                  </div>
                `,
              )
        }
      </div>
    </section>
  `;
}
