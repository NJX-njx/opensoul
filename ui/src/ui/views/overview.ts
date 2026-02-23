import { html, nothing } from "lit";
import type { GatewayHelloOk } from "../gateway.ts";
import type { UiSettings } from "../storage.ts";
import { formatRelativeTimestamp, formatDurationHuman } from "../format.ts";
import { icons } from "../icons.ts";
import { uiText } from "../i18n.ts";
import { formatNextRun } from "../presenter.ts";
import type { Locale } from "./onboarding/i18n.ts";

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
  const uptime = snapshot?.uptimeMs ? formatDurationHuman(snapshot.uptimeMs) : t("n/a", "无");
  const tick = snapshot?.policy?.tickIntervalMs ? `${snapshot.policy.tickIntervalMs}ms` : t("n/a", "无");
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
          ${t("This gateway requires auth. Add a token or password, then click Connect.", "该网关需要认证。请填写 token 或密码后点击“连接”。")}
          <div style="margin-top: 6px">
            <span class="mono">opensoul dashboard --no-open</span> → ${t("open the Control UI", "打开控制台")}<br />
            <span class="mono">opensoul doctor --generate-gateway-token</span> → ${t("set token", "生成并设置 token")}
          </div>
          <div style="margin-top: 6px">
            <a
              class="session-link"
              href="https://docs.opensoul.ai/web/dashboard"
              target="_blank"
              rel="noreferrer"
              title=${t("Control UI auth docs (opens in new tab)", "控制台认证文档（新标签页打开）")}
              >${t("Docs: Control UI auth", "文档：控制台认证")}</a
            >
          </div>
        </div>
      `;
    }
    return html`
      <div class="muted" style="margin-top: 8px">
        ${t("Auth failed. Update the token or password in Control UI settings, then click Connect.", "认证失败。请在控制台设置中更新 token 或密码后再点击“连接”。")}
        <div style="margin-top: 6px">
          <a
            class="session-link"
            href="https://docs.opensoul.ai/web/dashboard"
            target="_blank"
            rel="noreferrer"
            title=${t("Control UI auth docs (opens in new tab)", "控制台认证文档（新标签页打开）")}
            >${t("Docs: Control UI auth", "文档：控制台认证")}</a
          >
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
          "This page is HTTP, so the browser blocks device identity. Use HTTPS (Tailscale Serve) or open",
          "当前页面是 HTTP，浏览器会阻止设备身份能力。请使用 HTTPS（Tailscale Serve）或在网关主机打开",
        )}
        <span class="mono">http://127.0.0.1:18789</span>
        ${t("on the gateway host.", "。")}
        <div style="margin-top: 6px">
          ${t("If you must stay on HTTP, set", "若必须使用 HTTP，请设置")}
          <span class="mono">gateway.controlUi.allowInsecureAuth: true</span> (token-only).
        </div>
        <div style="margin-top: 6px">
          <a
            class="session-link"
            href="https://docs.opensoul.ai/gateway/tailscale"
            target="_blank"
            rel="noreferrer"
            title=${t("Tailscale Serve docs (opens in new tab)", "Tailscale Serve 文档（新标签页打开）")}
            >${t("Docs: Tailscale Serve", "文档：Tailscale Serve")}</a
          >
          <span class="muted"> · </span>
          <a
            class="session-link"
            href="https://docs.opensoul.ai/web/control-ui#insecure-http"
            target="_blank"
            rel="noreferrer"
            title=${t("Insecure HTTP docs (opens in new tab)", "不安全 HTTP 文档（新标签页打开）")}
            >${t("Docs: Insecure HTTP", "文档：不安全 HTTP")}</a
          >
        </div>
      </div>
    `;
  })();

  return html`
    <section class="grid grid-cols-2">
      <div class="card">
        <div class="card-title">${t("Gateway Access", "网关访问")}</div>
        <div class="card-sub">${t("Where the dashboard connects and how it authenticates.", "控制台连接位置与认证方式。")}</div>
        <div class="form-grid" style="margin-top: 16px;">
          <label class="field">
            <span>${t("WebSocket URL", "WebSocket 地址")}</span>
            <input
              .value=${props.settings.gatewayUrl}
              @input=${(e: Event) => {
                const v = (e.target as HTMLInputElement).value;
                props.onSettingsChange({ ...props.settings, gatewayUrl: v });
              }}
              placeholder="ws://100.x.y.z:18789"
            />
          </label>
          <label class="field">
            <span>${t("Gateway Token", "网关 Token")}</span>
            <input
              .value=${props.settings.token}
              @input=${(e: Event) => {
                const v = (e.target as HTMLInputElement).value;
                props.onSettingsChange({ ...props.settings, token: v });
              }}
              placeholder="OPENSOUL_GATEWAY_TOKEN"
            />
          </label>
          <label class="field">
            <span>${t("Password (not stored)", "密码（不存储）")}</span>
            <input
              type="password"
              .value=${props.password}
              @input=${(e: Event) => {
                const v = (e.target as HTMLInputElement).value;
                props.onPasswordChange(v);
              }}
              placeholder=${t("system or shared password", "系统密码或共享密码")}
            />
          </label>
          <label class="field">
            <span>${t("Default Session Key", "默认会话 Key")}</span>
            <input
              .value=${props.settings.sessionKey}
              @input=${(e: Event) => {
                const v = (e.target as HTMLInputElement).value;
                props.onSessionKeyChange(v);
              }}
            />
          </label>
        </div>
        <div class="row" style="margin-top: 14px;">
          <button class="btn" @click=${() => props.onConnect()}>${t("Connect", "连接")}</button>
          <button class="btn" @click=${() => props.onRefresh()}>${t("Refresh", "刷新")}</button>
          <span class="muted">${t("Click Connect to apply connection changes.", "点击“连接”以应用连接变更。")}</span>
        </div>
      </div>

      <div class="card">
        <div class="card-title">${t("Snapshot", "快照")}</div>
        <div class="card-sub">${t("Latest gateway handshake information.", "最新网关握手信息。")}</div>
        <div class="stat-grid" style="margin-top: 16px;">
          <div class="stat">
            <div class="stat-label">${t("Status", "状态")}</div>
            <div class="stat-value ${props.connected ? "ok" : "warn"}">
              ${props.connected ? t("Connected", "已连接") : t("Disconnected", "未连接")}
            </div>
          </div>
          <div class="stat">
            <div class="stat-label">${t("Uptime", "运行时长")}</div>
            <div class="stat-value">${uptime}</div>
          </div>
          <div class="stat">
            <div class="stat-label">${t("Tick Interval", "心跳间隔")}</div>
            <div class="stat-value">${tick}</div>
          </div>
          <div class="stat">
            <div class="stat-label">${t("Last Channels Refresh", "最近渠道刷新")}</div>
            <div class="stat-value">
              ${props.lastChannelsRefresh ? formatRelativeTimestamp(props.lastChannelsRefresh) : t("n/a", "无")}
            </div>
          </div>
        </div>
        ${
          props.lastError
            ? html`<div class="callout danger" style="margin-top: 14px;">
              <div>${props.lastError}</div>
              ${authHint ?? ""}
              ${insecureContextHint ?? ""}
            </div>`
            : html`
                <div class="callout" style="margin-top: 14px">
                  ${t("Use Channels to link WhatsApp, Telegram, Discord, Signal, or iMessage.", "可在“渠道”中连接 WhatsApp、Telegram、Discord、Signal 或 iMessage。")}
                </div>
              `
        }
      </div>
    </section>

    <section class="grid grid-cols-4" style="margin-top: 18px;">
      <div class="card stat-card">
        <div class="stat-label">${t("Status", "状态")}</div>
        <div class="stat-value ${props.connected ? "ok" : "warn"}">
          ${props.connected ? t("Online", "在线") : t("Offline", "离线")}
        </div>
        <div class="muted">${t("Gateway connection state.", "网关连接状态。")}</div>
      </div>
      <div class="card stat-card">
        <div class="stat-label">${t("Instances", "实例")}</div>
        <div class="stat-value">${props.presenceCount}</div>
        <div class="muted">${t("Active beacons in the last 5 min.", "最近 5 分钟内的活跃信标。")}</div>
      </div>
      <div class="card stat-card">
        <div class="stat-label">${t("Sessions", "会话")}</div>
        <div class="stat-value">${props.sessionsCount ?? t("n/a", "无")}</div>
        <div class="muted">${t("Tracked session keys.", "已追踪会话 Key 数。")}</div>
      </div>
      <div class="card stat-card">
        <div class="stat-label">${t("Cron", "定时任务")}</div>
        <div class="stat-value">
          ${props.cronEnabled == null
            ? t("n/a", "无")
            : props.cronEnabled
              ? t("Enabled", "已启用")
              : t("Disabled", "已禁用")}
        </div>
        <div class="muted">${t("Next wake", "下次唤醒")} ${formatNextRun(props.cronNext)}</div>
      </div>
    </section>

    <section class="grid grid-cols-2" style="margin-top: 18px;">
      <!-- System Information -->
      <div class="card">
        <div class="card-title">${t("System Information", "系统信息")}</div>
        <div class="card-sub">${t("Runtime details from the gateway handshake.", "来自网关握手的运行时详情。")}</div>
        <div class="stat-grid" style="margin-top: 16px;">
          <div class="stat">
            <div class="stat-label">${t("Protocol Version", "协议版本")}</div>
            <div class="stat-value" style="font-size:18px;">${props.hello?.protocol ?? t("n/a", "无")}</div>
          </div>
          <div class="stat">
            <div class="stat-label">${t("Uptime", "运行时长")}</div>
            <div class="stat-value" style="font-size:18px;">${uptime}</div>
          </div>
          <div class="stat">
            <div class="stat-label">${t("Tick Interval", "心跳间隔")}</div>
            <div class="stat-value" style="font-size:18px;">${tick}</div>
          </div>
          <div class="stat">
            <div class="stat-label">${t("Last Channels Refresh", "最近渠道刷新")}</div>
            <div class="stat-value" style="font-size:18px;">
              ${props.lastChannelsRefresh ? formatRelativeTimestamp(props.lastChannelsRefresh) : t("n/a", "无")}
            </div>
          </div>
          ${
            props.hello?.features?.methods
              ? html`<div class="stat" style="grid-column: 1 / -1;">
                <div class="stat-label">${t("Available Methods", "可用方法")}</div>
                <div class="muted" style="margin-top:4px;font-size:12px;word-break:break-word;">
                  ${props.hello.features.methods.join(", ")}
                </div>
              </div>`
              : nothing
          }
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="card">
        <div class="card-title">${t("Quick Actions", "快捷操作")}</div>
        <div class="card-sub">${t("Navigate to common tasks quickly.", "快速跳转到常用任务。")}</div>
        <div class="overview-actions" style="margin-top: 16px; display: grid; gap: 10px;">
          <button class="btn" style="justify-content: flex-start; width: 100%;"
            @click=${() => props.onNavigate?.("chat")}>
            ${icons.messageSquare}
            <span>${t("Open Chat", "打开聊天")}</span>
          </button>
          <button class="btn" style="justify-content: flex-start; width: 100%;"
            @click=${() => props.onNavigate?.("channels")}>
            ${icons.link}
            <span>${t("View Channels", "查看渠道")}</span>
          </button>
          <button class="btn" style="justify-content: flex-start; width: 100%;"
            @click=${() => props.onNavigate?.("sessions")}>
            ${icons.fileText}
            <span>${t("Manage Sessions", "管理会话")}</span>
          </button>
          <button class="btn" style="justify-content: flex-start; width: 100%;"
            @click=${() => props.onNavigate?.("logs")}>
            ${icons.scrollText}
            <span>${t("View Logs", "查看日志")}</span>
          </button>
          <button class="btn" style="justify-content: flex-start; width: 100%;"
            @click=${() => props.onNavigate?.("config")}>
            ${icons.settings}
            <span>${t("Edit Config", "编辑配置")}</span>
          </button>
        </div>
      </div>
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="card-title">${t("Getting Started", "快速开始")}</div>
      <div class="card-sub">${t("Quick guides to help you get the most out of OpenSoul.", "帮助你快速上手 OpenSoul 的简要指引。")}</div>
      <div class="note-grid" style="margin-top: 14px;">
        <div>
          <div class="note-title">${t("1. Connect your gateway", "1. 连接网关")}</div>
          <div class="muted">
            ${t(
              "Enter the WebSocket URL and token above, then click Connect. For remote access, use Tailscale serve.",
              "在上方填写 WebSocket 地址和 token 后点击“连接”。远程访问建议使用 Tailscale Serve。",
            )}
          </div>
        </div>
        <div>
          <div class="note-title">${t("2. Link messaging channels", "2. 连接消息渠道")}</div>
          <div class="muted">
            ${t(
              "Go to Channels to connect WhatsApp, Telegram, Discord, Signal, or iMessage.",
              "进入“渠道”连接 WhatsApp、Telegram、Discord、Signal 或 iMessage。",
            )}
          </div>
        </div>
        <div>
          <div class="note-title">${t("3. Chat and automate", "3. 聊天与自动化")}</div>
          <div class="muted">
            ${t(
              "Use the Chat view for real-time interaction, or set up Cron for scheduled automated runs.",
              "使用“聊天”进行实时交互，或在“定时任务”中配置周期自动执行。",
            )}
          </div>
        </div>
      </div>
    </section>
  `;
}
