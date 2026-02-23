import { html, nothing } from "lit";
import type { AppViewState } from "../app-view-state.ts";
import { uiText } from "../i18n.ts";

export function renderGatewayUrlConfirmation(state: AppViewState) {
  const { pendingGatewayUrl } = state;
  if (!pendingGatewayUrl) {
    return nothing;
  }
  const t = (english: string, chinese: string) => uiText(state.uiLocale, english, chinese);

  return html`
    <div class="exec-approval-overlay" role="dialog" aria-modal="true" aria-live="polite">
      <div class="exec-approval-card">
        <div class="exec-approval-header">
          <div>
            <div class="exec-approval-title">${t("Change Gateway URL", "修改网关地址")}</div>
            <div class="exec-approval-sub">
              ${t("This will reconnect to a different gateway server", "这将重新连接到另一个网关服务")}
            </div>
          </div>
        </div>
        <div class="exec-approval-command mono">${pendingGatewayUrl}</div>
        <div class="callout danger" style="margin-top: 12px;">
          ${t(
            "Only confirm if you trust this URL. Malicious URLs can compromise your system.",
            "仅在你信任该 URL 时确认。恶意 URL 可能危及你的系统。",
          )}
        </div>
        <div class="exec-approval-actions">
          <button
            class="btn primary"
            @click=${() => state.handleGatewayUrlConfirm()}
          >
            ${t("Confirm", "确认")}
          </button>
          <button
            class="btn"
            @click=${() => state.handleGatewayUrlCancel()}
          >
            ${t("Cancel", "取消")}
          </button>
        </div>
      </div>
    </div>
  `;
}
