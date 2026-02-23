import { html, nothing } from "lit";
import type { PresenceEntry } from "../types.ts";
import { formatPresenceAge, formatPresenceSummary } from "../presenter.ts";

export type InstancesProps = {
  loading: boolean;
  entries: PresenceEntry[];
  lastError: string | null;
  statusMessage: string | null;
  onRefresh: () => void;
};

export function renderInstances(props: InstancesProps) {
  const activeInputCount = props.entries.filter((entry) => {
    return typeof entry.lastInputSeconds === "number" && entry.lastInputSeconds <= 120;
  }).length;
  const uniqueHosts = new Set(props.entries.map((entry) => entry.host || "unknown"));
  const platformCount = new Set(props.entries.map((entry) => entry.platform).filter(Boolean)).size;

  return html`
    <section class="card">
      <div class="section-header">
        <div>
          <div class="card-title">Connected Clients · 在线实例</div>
          <div class="card-sub">Live presence signals from connected clients and gateway nodes.</div>
        </div>
        <div class="section-header__meta">
          <button class="btn btn--sm" ?disabled=${props.loading} @click=${props.onRefresh}>
            ${props.loading ? "Refreshing…" : "↻ Refresh"}
          </button>
        </div>
      </div>

      <div class="page-summary-grid" style="margin-top: 18px;">
        <div class="page-summary-card">
          <div class="page-summary-label">Instances · 实例</div>
          <div class="page-summary-value">${props.entries.length}</div>
          <div class="page-summary-sub">Total connected clients</div>
        </div>
        <div class="page-summary-card">
          <div class="page-summary-label">Active · 活跃</div>
          <div class="page-summary-value">${activeInputCount}</div>
          <div class="page-summary-sub">Input within 2 minutes</div>
        </div>
        <div class="page-summary-card">
          <div class="page-summary-label">Hosts · 主机</div>
          <div class="page-summary-value">${uniqueHosts.size}</div>
          <div class="page-summary-sub">Unique hosts</div>
        </div>
        <div class="page-summary-card">
          <div class="page-summary-label">Platforms · 平台</div>
          <div class="page-summary-value">${platformCount}</div>
          <div class="page-summary-sub">OS / platform types</div>
        </div>
      </div>

      ${
        props.lastError
          ? html`<div class="callout danger" style="margin-top: 14px;">${props.lastError}</div>`
          : nothing
      }
      ${
        props.statusMessage
          ? html`<div class="callout info" style="margin-top: 14px;">${props.statusMessage}</div>`
          : nothing
      }

      <div class="list" style="margin-top: 20px;">
        ${
          props.entries.length === 0
            ? html`
                <div class="empty-state">
                  <div class="empty-state-icon">📡</div>
                  <div class="empty-state-title">No clients connected yet</div>
                  <div class="empty-state-desc">Start a client session to see live presence data here.</div>
                </div>
              `
            : props.entries.map((entry) => renderEntry(entry))
        }
      </div>
    </section>
  `;
}

function renderEntry(entry: PresenceEntry) {
  const lastInput = entry.lastInputSeconds != null ? `${entry.lastInputSeconds}s ago` : "—";
  const mode = entry.mode ?? "unknown";
  const roles = Array.isArray(entry.roles) ? entry.roles.filter(Boolean) : [];
  const scopes = Array.isArray(entry.scopes) ? entry.scopes.filter(Boolean) : [];
  const scopesLabel =
    scopes.length > 0 ? (scopes.length > 3 ? `${scopes.length} scopes` : scopes.join(", ")) : null;

  return html`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${entry.host ?? "Unknown host"}</div>
        <div class="list-sub">${formatPresenceSummary(entry)}</div>
        <div class="chip-row">
          <span class="chip">${mode}</span>
          ${roles.map((role) => html`<span class="chip">${role}</span>`)}
          ${scopesLabel ? html`<span class="chip" title="Scopes: ${scopes.join(", ")}">${scopesLabel}</span>` : nothing}
          ${entry.platform ? html`<span class="chip">${entry.platform}</span>` : nothing}
          ${entry.deviceFamily ? html`<span class="chip">${entry.deviceFamily}</span>` : nothing}
          ${entry.modelIdentifier ? html`<span class="chip">${entry.modelIdentifier}</span>` : nothing}
          ${entry.version ? html`<span class="chip">v${entry.version}</span>` : nothing}
        </div>
      </div>
      <div class="list-meta">
        <div>${formatPresenceAge(entry)}</div>
        <div class="muted">Last input: ${lastInput}</div>
        ${entry.reason ? html`<div class="muted">Reason: ${entry.reason}</div>` : nothing}
      </div>
    </div>
  `;
}
