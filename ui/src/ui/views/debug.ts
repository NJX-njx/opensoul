import { html, nothing } from "lit";
import { uiText } from "../i18n.ts";
import type { EventLogEntry } from "../app-events.ts";
import { formatEventPayload } from "../presenter.ts";
import type { Locale } from "./onboarding/i18n.ts";

export type DebugProps = {
  locale: Locale;
  loading: boolean;
  status: Record<string, unknown> | null;
  health: Record<string, unknown> | null;
  models: unknown[];
  heartbeat: unknown;
  eventLog: EventLogEntry[];
  callMethod: string;
  callParams: string;
  callResult: string | null;
  callError: string | null;
  onCallMethodChange: (next: string) => void;
  onCallParamsChange: (next: string) => void;
  onRefresh: () => void;
  onCall: () => void;
};

function previewJson(payload: unknown): string {
  try {
    const text = JSON.stringify(payload ?? {}, null, 2);
    if (text.length <= 420) {
      return text;
    }
    return `${text.slice(0, 420)}\n...`;
  } catch {
    return String(payload ?? "");
  }
}

function healthBadgeLabel(
  health: Record<string, unknown> | null,
): { tone: string; label: string } {
  const raw = health ? (health as { ok?: unknown }).ok : undefined;
  if (typeof raw === "boolean") {
    return raw
      ? { tone: "ok", label: "Healthy" }
      : { tone: "danger", label: "Issue detected" };
  }
  return { tone: "muted", label: "Unknown" };
}

export function renderDebug(props: DebugProps) {
  const t = (english: string, chinese: string) => uiText(props.locale, english, chinese);
  const securityAudit =
    props.status && typeof props.status === "object"
      ? (props.status as { securityAudit?: { summary?: Record<string, number> } }).securityAudit
      : null;
  const securitySummary = securityAudit?.summary ?? null;
  const critical = securitySummary?.critical ?? 0;
  const warn = securitySummary?.warn ?? 0;
  const info = securitySummary?.info ?? 0;
  const securityTone = critical > 0 ? "danger" : warn > 0 ? "warn" : "success";
  const securityLabel =
    critical > 0
      ? t(`${critical} critical`, `${critical} \u4e2a\u4e25\u91cd`)
      : warn > 0
        ? t(`${warn} warnings`, `${warn} \u4e2a\u8b66\u544a`)
        : t("No critical issues", "\u65e0\u4e25\u91cd\u95ee\u9898");

  const health = healthBadgeLabel(props.health);

  return html`
    <section class="settings-page settings-page--debug">
      <header class="settings-page__header">
        <div>
          <h3 class="settings-page__title">${t("Diagnostics", "\u8bca\u65ad")}</h3>
          <p class="settings-page__desc">
            ${t(
              "Check system health at a glance. Expand sections for technical details.",
              "\u4e00\u89c8\u7cfb\u7edf\u5065\u5eb7\u72b6\u6001\uff0c\u5c55\u5f00\u67e5\u770b\u6280\u672f\u8be6\u60c5\u3002",
            )}
          </p>
        </div>
        <button class="btn btn--sm btn--ghost" ?disabled=${props.loading} @click=${props.onRefresh}>
          ${props.loading ? t("Refreshing...", "\u5237\u65b0\u4e2d...") : t("Refresh", "\u5237\u65b0")}
        </button>
      </header>

      <!-- Status overview cards -->
      <div class="debug-status-grid">
        <div class="debug-status-card debug-status-card--${health.tone}">
          <div class="debug-status-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              ${health.tone === "ok"
                ? html`<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>`
                : health.tone === "danger"
                  ? html`<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>`
                  : html`<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>`
              }
            </svg>
          </div>
          <div class="debug-status-card__info">
            <div class="debug-status-card__label">${t("System Health", "\u7cfb\u7edf\u5065\u5eb7")}</div>
            <div class="debug-status-card__value">
              ${t(
                health.label,
                health.label === "Healthy"
                  ? "\u5065\u5eb7"
                  : health.label === "Issue detected"
                    ? "\u53d1\u73b0\u5f02\u5e38"
                    : "\u672a\u77e5",
              )}
            </div>
          </div>
        </div>

        <div class="debug-status-card debug-status-card--${securityTone}">
          <div class="debug-status-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <div class="debug-status-card__info">
            <div class="debug-status-card__label">${t("Security", "\u5b89\u5168\u72b6\u6001")}</div>
            <div class="debug-status-card__value">${securityLabel}</div>
          </div>
        </div>

        <div class="debug-status-card">
          <div class="debug-status-card__icon debug-status-card__icon--neutral">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            </svg>
          </div>
          <div class="debug-status-card__info">
            <div class="debug-status-card__label">${t("Models", "\u6a21\u578b")}</div>
            <div class="debug-status-card__value">${props.models.length} ${t("available", "\u53ef\u7528")}</div>
          </div>
        </div>

        <div class="debug-status-card">
          <div class="debug-status-card__icon debug-status-card__icon--neutral">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </div>
          <div class="debug-status-card__info">
            <div class="debug-status-card__label">${t("Events", "\u4e8b\u4ef6")}</div>
            <div class="debug-status-card__value">${props.eventLog.length} ${t("captured", "\u5df2\u6355\u83b7")}</div>
          </div>
        </div>
      </div>

      ${
        securitySummary
          ? html`<div class="debug-security-hint ${securityTone}">
              <span>${t("Security audit", "\u5b89\u5168\u5ba1\u8ba1")}: ${securityLabel}${info > 0 ? ` \u00b7 ${info} ${t("info", "\u4fe1\u606f")}` : ""}</span>
              <span class="debug-security-hint__cmd">opensoul security audit --deep</span>
            </div>`
          : nothing
      }

      <!-- Expandable technical sections -->
      <div class="debug-sections">
        <details class="debug-section-card">
          <summary class="debug-section-card__header">
            <div class="debug-section-card__title-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="debug-section-card__icon">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <div>
                <div class="debug-section-card__title">${t("Live Snapshots", "\u5b9e\u65f6\u5feb\u7167")}</div>
                <div class="debug-section-card__desc">${t("Status, health, and heartbeat from the gateway.", "\u7f51\u5173\u72b6\u6001\u3001\u5065\u5eb7\u3001\u5fc3\u8df3\u6570\u636e\u3002")}</div>
              </div>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="debug-section-card__chevron"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </summary>
          <div class="debug-section-card__body">
            <div class="debug-snapshot-grid-v2">
              ${renderSnapshotCardV2({
                title: t("Status", "\u72b6\u6001"),
                data: props.status,
                emptyLabel: t("No data", "\u65e0\u6570\u636e"),
              })}
              ${renderSnapshotCardV2({
                title: t("Health", "\u5065\u5eb7"),
                data: props.health,
                emptyLabel: t("No data", "\u65e0\u6570\u636e"),
              })}
              ${renderSnapshotCardV2({
                title: t("Heartbeat", "\u5fc3\u8df3"),
                data: props.heartbeat,
                emptyLabel: t("No data", "\u65e0\u6570\u636e"),
              })}
            </div>
          </div>
        </details>

        <details class="debug-section-card">
          <summary class="debug-section-card__header">
            <div class="debug-section-card__title-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="debug-section-card__icon">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
              <div>
                <div class="debug-section-card__title">${t("Event Timeline", "\u4e8b\u4ef6\u65f6\u95f4\u7ebf")}</div>
                <div class="debug-section-card__desc">${t("Recent gateway events.", "\u6700\u8fd1\u7684\u7f51\u5173\u4e8b\u4ef6\u3002")}</div>
              </div>
            </div>
            <span class="debug-section-card__badge">${props.eventLog.length}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="debug-section-card__chevron"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </summary>
          <div class="debug-section-card__body">
            ${
              props.eventLog.length === 0
                ? html`<div class="debug-empty-hint">${t("No events yet.", "\u6682\u65e0\u4e8b\u4ef6\u3002")}</div>`
                : html`
                    <div class="debug-timeline">
                      ${props.eventLog.map(
                        (evt) => html`
                          <details class="debug-timeline__item">
                            <summary class="debug-timeline__summary">
                              <span class="debug-timeline__event">${evt.event}</span>
                              <span class="debug-timeline__time">${new Date(evt.ts).toLocaleTimeString()}</span>
                            </summary>
                            <pre class="code-block debug-timeline__payload">${formatEventPayload(evt.payload)}</pre>
                          </details>
                        `,
                      )}
                    </div>
                  `
            }
          </div>
        </details>

        <details class="debug-section-card">
          <summary class="debug-section-card__header">
            <div class="debug-section-card__title-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="debug-section-card__icon">
                <polyline points="4 17 10 11 4 5"></polyline>
                <line x1="12" y1="19" x2="20" y2="19"></line>
              </svg>
              <div>
                <div class="debug-section-card__title">${t("RPC Console", "RPC \u63a7\u5236\u53f0")}</div>
                <div class="debug-section-card__desc">${t("Call gateway methods directly.", "\u76f4\u63a5\u8c03\u7528\u7f51\u5173\u65b9\u6cd5\u3002")}</div>
              </div>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="debug-section-card__chevron"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </summary>
          <div class="debug-section-card__body">
            <div class="debug-rpc-form">
              <label class="debug-rpc-field">
                <span class="debug-rpc-field__label">${t("Method", "\u65b9\u6cd5")}</span>
                <input
                  class="debug-rpc-field__input"
                  .value=${props.callMethod}
                  @input=${(e: Event) => props.onCallMethodChange((e.target as HTMLInputElement).value)}
                  placeholder="system-presence"
                />
              </label>
              <label class="debug-rpc-field">
                <span class="debug-rpc-field__label">${t("Params (JSON)", "\u53c2\u6570 (JSON)")}</span>
                <textarea
                  class="debug-rpc-field__textarea"
                  .value=${props.callParams}
                  @input=${(e: Event) => props.onCallParamsChange((e.target as HTMLTextAreaElement).value)}
                  rows="4"
                  placeholder="{}"
                ></textarea>
              </label>
              <button class="btn btn--sm primary" @click=${props.onCall}>${t("Execute", "\u6267\u884c")}</button>
            </div>
            ${
              props.callError
                ? html`<div class="debug-rpc-result debug-rpc-result--error">${props.callError}</div>`
                : nothing
            }
            ${
              props.callResult
                ? html`<pre class="code-block debug-rpc-result">${props.callResult}</pre>`
                : nothing
            }
          </div>
        </details>

        <details class="debug-section-card">
          <summary class="debug-section-card__header">
            <div class="debug-section-card__title-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="debug-section-card__icon">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              </svg>
              <div>
                <div class="debug-section-card__title">${t("Model Catalog", "\u6a21\u578b\u76ee\u5f55")}</div>
                <div class="debug-section-card__desc">${t("Raw model payload.", "\u539f\u59cb\u6a21\u578b\u6570\u636e\u3002")}</div>
              </div>
            </div>
            <span class="debug-section-card__badge">${props.models.length}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="debug-section-card__chevron"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </summary>
          <div class="debug-section-card__body">
            <pre class="code-block">${JSON.stringify(props.models ?? [], null, 2)}</pre>
          </div>
        </details>
      </div>
    </section>
  `;
}

function renderSnapshotCardV2(params: {
  title: string;
  data: unknown;
  emptyLabel: string;
}): unknown {
  const hasData = params.data != null;
  return html`
    <div class="debug-snapshot-v2">
      <div class="debug-snapshot-v2__title">${params.title}</div>
      ${
        hasData
          ? html`<pre class="code-block debug-snapshot-v2__code">${previewJson(params.data)}</pre>`
          : html`<div class="debug-snapshot-v2__empty">${params.emptyLabel}</div>`
      }
    </div>
  `;
}
