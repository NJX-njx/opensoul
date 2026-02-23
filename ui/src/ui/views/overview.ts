import { html, nothing } from "lit";
import type { GatewayHelloOk } from "../gateway.ts";
import type { UiSettings } from "../storage.ts";
import type { Locale } from "./onboarding/i18n.ts";
import { formatDurationHuman, formatRelativeTimestamp } from "../format.ts";
import { uiText } from "../i18n.ts";
import { icons } from "../icons.ts";
import { formatNextRun } from "../presenter.ts";

export type OverviewProps = {
  locale: Locale;
  connected: boolean;
  hello: GatewayHelloOk | null;
  settings: UiSettings;
  password: string;
  lastError: string | null;
  presenceCount: number;
  sessionsCount: number | null;
  cronEnabled: boolean | null;
  cronNext: number | null;
  lastChannelsRefresh: number | null;
  onSettingsChange: (next: UiSettings) => void;
  onPasswordChange: (next: string) => void;
  onSessionKeyChange: (next: string) => void;
  onConnect: () => void;
  onRefresh: () => void;
  onNavigate?: (tab: string) => void;
};

export function renderOverview(props: OverviewProps) {
  const t = (english: string, chinese: string) => uiText(props.locale, english, chinese);
  const snapshot = props.hello?.snapshot as
    | { uptimeMs?: number; policy?: { tickIntervalMs?: number } }
    | undefined;
  const uptime = snapshot?.uptimeMs ? formatDurationHuman(snapshot.uptimeMs) : t("n/a", "n/a");
  const tick = snapshot?.policy?.tickIntervalMs
    ? `${snapshot.policy.tickIntervalMs}ms`
    : t("n/a", "n/a");
  const methods = props.hello?.features?.methods ?? [];
  const methodsCount = methods.length;
  const channelsRefreshLabel = props.lastChannelsRefresh
    ? formatRelativeTimestamp(props.lastChannelsRefresh)
    : t("n/a", "n/a");

  const authHint = (() => {
    if (props.connected || !props.lastError) {
      return null;
    }
    const lower = props.lastError.toLowerCase();
    const authFailed = lower.includes("unauthorized") || lower.includes("connect failed");
    if (!authFailed) {
      return null;
    }
    const hasToken = Boolean(props.settings.token.trim());
    const hasPassword = Boolean(props.password.trim());
    if (!hasToken && !hasPassword) {
      return html`
        <div class="muted" style="margin-top: 8px">
          ${t(
            "This gateway requires authentication. Add a token or password, then click Connect.",
            "This gateway requires authentication. Add a token or password, then click Connect.",
          )}
          <div style="margin-top: 6px">
            <span class="mono">opensoul dashboard --no-open</span>
            ${t("opens Control UI.", "opens Control UI.")}
            <br />
            <span class="mono">opensoul doctor --generate-gateway-token</span>
            ${t("creates a token.", "creates a token.")}
          </div>
          <div style="margin-top: 6px">
            <a
              class="session-link"
              href="https://docs.opensoul.ai/web/dashboard"
              target="_blank"
              rel="noreferrer"
            >
              ${t("Docs: Control UI auth", "Docs: Control UI auth")}
            </a>
          </div>
        </div>
      `;
    }
    return html`
      <div class="muted" style="margin-top: 8px">
        ${t(
          "Authentication failed. Update token or password and reconnect.",
          "Authentication failed. Update token or password and reconnect.",
        )}
        <div style="margin-top: 6px">
          <a
            class="session-link"
            href="https://docs.opensoul.ai/web/dashboard"
            target="_blank"
            rel="noreferrer"
          >
            ${t("Docs: Control UI auth", "Docs: Control UI auth")}
          </a>
        </div>
      </div>
    `;
  })();

  const insecureContextHint = (() => {
    if (props.connected || !props.lastError) {
      return null;
    }
    const isSecureContext = typeof window !== "undefined" ? window.isSecureContext : true;
    if (isSecureContext) {
      return null;
    }
    const lower = props.lastError.toLowerCase();
    if (!lower.includes("secure context") && !lower.includes("device identity required")) {
      return null;
    }
    return html`
      <div class="muted" style="margin-top: 8px">
        ${t(
          "This page is running on HTTP. Use HTTPS (for example Tailscale Serve) or open",
          "This page is running on HTTP. Use HTTPS (for example Tailscale Serve) or open",
        )}
        <span class="mono">http://127.0.0.1:18789</span>
        ${t("on the gateway host.", "on the gateway host.")}
        <div style="margin-top: 6px">
          ${t("If required, set", "If required, set")}
          <span class="mono">gateway.controlUi.allowInsecureAuth: true</span>
          ${t("for token-only auth.", "for token-only auth.")}
        </div>
      </div>
    `;
  })();

  const renderQuickAction = (tab: string, label: string, icon: unknown) => {
    return html`
      <button
        class="btn"
        style="justify-content: flex-start; width: 100%;"
        @click=${() => props.onNavigate?.(tab)}
      >
        ${icon}
        <span>${label}</span>
      </button>
    `;
  };

  return html`
    <section class="card">
      <div class="section-header">
        <div>
          <div class="card-title">${t("System Status", "系统状态")}</div>
          <div class="card-sub">
            ${t(
              "A quick glance at how your system is doing right now.",
              "快速查看系统当前运行状况。",
            )}
          </div>
        </div>
        <div class="section-header__meta">
          <button class="btn btn--sm" @click=${props.onRefresh}>${t("Refresh", "刷新")}</button>
          <button class="btn btn--sm primary" @click=${props.onConnect}>
            ${props.connected ? t("Reconnect", "重连") : t("Connect", "连接")}
          </button>
        </div>
      </div>

      <div class="page-summary-grid" style="margin-top: 18px;">
        <div class="page-summary-card">
          <div class="page-summary-label">${t("Gateway", "网关")}</div>
          <div class="page-summary-value ${props.connected ? "ok" : "warn"}">
            ${props.connected ? t("Online", "在线") : t("Offline", "离线")}
          </div>
          <div class="page-summary-sub">${t("Connection status", "连接状态")}</div>
        </div>
        <div class="page-summary-card">
          <div class="page-summary-label">${t("Clients", "客户端")}</div>
          <div class="page-summary-value">${props.presenceCount}</div>
          <div class="page-summary-sub">${t("Active connections", "活跃连接数")}</div>
        </div>
        <div class="page-summary-card">
          <div class="page-summary-label">${t("Sessions", "会话")}</div>
          <div class="page-summary-value">${props.sessionsCount ?? t("—", "—")}</div>
          <div class="page-summary-sub">${t("Active conversations", "进行中的对话")}</div>
        </div>
        <div class="page-summary-card">
          <div class="page-summary-label">${t("Scheduler", "定时任务")}</div>
          <div class="page-summary-value">
            ${
              props.cronEnabled == null
                ? t("—", "—")
                : props.cronEnabled
                  ? t("On", "开启")
                  : t("Off", "关闭")
            }
          </div>
          <div class="page-summary-sub">${props.cronNext ? `${t("Next run", "下次执行")} ${formatNextRun(props.cronNext)}` : t("No upcoming tasks", "暂无待执行任务")}</div>
        </div>
        <div class="page-summary-card">
          <div class="page-summary-label">${t("Channels", "渠道")}</div>
          <div class="page-summary-value">${channelsRefreshLabel}</div>
          <div class="page-summary-sub">${t("Last synced", "上次同步")}</div>
        </div>
      </div>
    </section>

    <section class="grid grid-cols-2" style="margin-top: 20px;">
      <div class="card">
        <div class="card-title">${t("Connection Settings", "连接设置")}</div>
        <div class="card-sub">
          ${t(
            "Configure how this dashboard connects to your gateway.",
            "配置面板如何连接到你的网关服务。",
          )}
        </div>
        <div class="form-grid" style="margin-top: 18px;">
          <label class="field">
            <span>${t("Server URL", "服务器地址")}</span>
            <input
              .value=${props.settings.gatewayUrl}
              @input=${(event: Event) => {
                const value = (event.target as HTMLInputElement).value;
                props.onSettingsChange({ ...props.settings, gatewayUrl: value });
              }}
              placeholder="ws://100.x.y.z:18789"
            />
          </label>
          <label class="field">
            <span>${t("Access Token", "访问令牌")}</span>
            <input
              .value=${props.settings.token}
              @input=${(event: Event) => {
                const value = (event.target as HTMLInputElement).value;
                props.onSettingsChange({ ...props.settings, token: value });
              }}
              placeholder=${t("Paste your token here", "在此粘贴令牌")}
            />
          </label>
          <label class="field">
            <span>${t("Password", "密码")}</span>
            <input
              type="password"
              .value=${props.password}
              @input=${(event: Event) => {
                const value = (event.target as HTMLInputElement).value;
                props.onPasswordChange(value);
              }}
              placeholder=${t("Optional · not saved locally", "可选 · 不会本地保存")}
            />
          </label>
          <label class="field">
            <span>${t("Default Session", "默认会话")}</span>
            <input
              .value=${props.settings.sessionKey}
              @input=${(event: Event) => {
                const value = (event.target as HTMLInputElement).value;
                props.onSessionKeyChange(value);
              }}
              placeholder=${t("auto", "自动")}
            />
          </label>
        </div>
        ${
          props.lastError
            ? html`
                <div class="callout danger" style="margin-top: 16px;">
                  <div>${props.lastError}</div>
                  ${authHint ?? nothing}
                  ${insecureContextHint ?? nothing}
                </div>
              `
            : html`
                <div class="callout info" style="margin-top: 16px;">
                  ${t(
                    "Update values above and click Connect to apply.",
                    "修改上方配置后点击「连接」即可生效。",
                  )}
                </div>
              `
        }
      </div>

      <div class="card">
        <div class="card-title">${t("Quick Actions", "快捷操作")}</div>
        <div class="card-sub">
          ${t("Jump to commonly used features.", "快速跳转到常用功能。")}
        </div>
        <div style="margin-top: 18px; display: grid; gap: 8px;">
          ${renderQuickAction("chat", t("Open Chat", "打开聊天"), icons.messageSquare)}
          ${renderQuickAction("channels", t("Manage Channels", "管理渠道"), icons.link)}
          ${renderQuickAction("sessions", t("View Sessions", "查看会话"), icons.fileText)}
          ${renderQuickAction("usage", t("Track Usage", "用量追踪"), icons.barChart)}
          ${renderQuickAction("nodes", t("Devices & Nodes", "设备与节点"), icons.monitor)}
        </div>

        <details class="collapsible" style="margin-top: 18px;">
          <summary>${t("System Details", "系统详情")}</summary>
          <div class="collapsible__body">
            <div style="display: grid; gap: 2px; margin-top: 8px;">
              <div class="detail-row">
                <span class="detail-row__label">${t("Protocol", "协议")}</span>
                <span class="detail-row__value mono">${props.hello?.protocol ?? t("—", "—")}</span>
              </div>
              <div class="detail-row">
                <span class="detail-row__label">${t("Uptime", "运行时长")}</span>
                <span class="detail-row__value">${uptime}</span>
              </div>
              <div class="detail-row">
                <span class="detail-row__label">${t("Tick Interval", "心跳间隔")}</span>
                <span class="detail-row__value mono">${tick}</span>
              </div>
              <div class="detail-row">
                <span class="detail-row__label">${t("API Methods", "API 方法数")}</span>
                <span class="detail-row__value">${methodsCount}</span>
              </div>
            </div>
          </div>
        </details>
      </div>
    </section>

    <details class="collapsible" style="margin-top: 20px;">
      <summary>${t("Raw Handshake Data", "原始握手数据")}</summary>
      <div class="collapsible__body">
        <div class="card-sub" style="margin-top: 4px; margin-bottom: 10px;">
          ${t(
            "For debugging — the full gateway handshake response.",
            "调试用 — 完整的网关握手响应数据。",
          )}
        </div>
        <pre class="code-block">${props.hello ? JSON.stringify(props.hello, null, 2) : t("Not connected yet.", "尚未连接。")}</pre>
      </div>
    </details>
  `;
}
