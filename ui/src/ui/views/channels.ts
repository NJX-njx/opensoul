import { html, nothing } from "lit";
import type {
  ChannelAccountSnapshot,
  ChannelUiMetaEntry,
  ChannelsStatusSnapshot,
  DiscordStatus,
  GoogleChatStatus,
  IMessageStatus,
  NostrProfile,
  NostrStatus,
  SignalStatus,
  SlackStatus,
  TelegramStatus,
  WhatsAppStatus,
} from "../types.ts";
import type { ChannelKey, ChannelsChannelData, ChannelsProps } from "./channels.types.ts";
import { formatRelativeTimestamp } from "../format.ts";
import { renderChannelConfigSection } from "./channels.config.ts";
import { renderDiscordCard } from "./channels.discord.ts";
import { renderGoogleChatCard } from "./channels.googlechat.ts";
import { renderIMessageCard } from "./channels.imessage.ts";
import { renderNostrCard } from "./channels.nostr.ts";
import { channelEnabled, renderChannelAccountCount } from "./channels.shared.ts";
import { renderSignalCard } from "./channels.signal.ts";
import { renderSlackCard } from "./channels.slack.ts";
import { renderTelegramCard } from "./channels.telegram.ts";
import { renderWhatsAppCard } from "./channels.whatsapp.ts";

export function renderChannels(props: ChannelsProps) {
  const channels = props.snapshot?.channels as Record<string, unknown> | null;
  const whatsapp = (channels?.whatsapp ?? undefined) as WhatsAppStatus | undefined;
  const telegram = (channels?.telegram ?? undefined) as TelegramStatus | undefined;
  const discord = (channels?.discord ?? null) as DiscordStatus | null;
  const googlechat = (channels?.googlechat ?? null) as GoogleChatStatus | null;
  const slack = (channels?.slack ?? null) as SlackStatus | null;
  const signal = (channels?.signal ?? null) as SignalStatus | null;
  const imessage = (channels?.imessage ?? null) as IMessageStatus | null;
  const nostr = (channels?.nostr ?? null) as NostrStatus | null;
  const channelOrder = resolveChannelOrder(props.snapshot);
  const orderedChannels = channelOrder
    .map((key, index) => ({
      key,
      enabled: channelEnabled(key, props),
      order: index,
    }))
    .toSorted((a, b) => {
      if (a.enabled !== b.enabled) {
        return a.enabled ? -1 : 1;
      }
      return a.order - b.order;
    });
  const channelStatusRows = Object.values(channels ?? {}).filter(
    (entry): entry is Record<string, unknown> => Boolean(entry && typeof entry === "object"),
  );
  const configuredCount = orderedChannels.filter((channel) => channel.enabled).length;
  const runningCount = channelStatusRows.filter((entry) => entry.running === true).length;
  const connectedCount = channelStatusRows.filter((entry) => entry.connected === true).length;
  const errorCount = channelStatusRows.filter((entry) => {
    return typeof entry.lastError === "string" && entry.lastError.trim().length > 0;
  }).length;

  return html`
    <section class="card">
      <div class="section-header">
        <div>
          <div class="card-title">Channel Status · 渠道状态</div>
          <div class="card-sub">Monitor connectivity and health of all messaging channels.</div>
        </div>
        <div class="section-header__meta">
          <button class="btn btn--sm" ?disabled=${props.loading} @click=${() => props.onRefresh(false)}>
            ${props.loading ? "Refreshing…" : "↻ Refresh"}
          </button>
          <span class="muted">${props.lastSuccessAt ? formatRelativeTimestamp(props.lastSuccessAt) : "—"}</span>
        </div>
      </div>
      <div class="page-summary-grid" style="margin-top: 18px;">
        <div class="page-summary-card">
          <div class="page-summary-label">Configured · 已配置</div>
          <div class="page-summary-value">${configuredCount}</div>
          <div class="page-summary-sub">Enabled in your config</div>
        </div>
        <div class="page-summary-card">
          <div class="page-summary-label">Running · 运行中</div>
          <div class="page-summary-value">${runningCount}</div>
          <div class="page-summary-sub">Active services</div>
        </div>
        <div class="page-summary-card">
          <div class="page-summary-label">Connected · 已连接</div>
          <div class="page-summary-value">${connectedCount}</div>
          <div class="page-summary-sub">Upstream links alive</div>
        </div>
        <div class="page-summary-card">
          <div class="page-summary-label">Issues · 异常</div>
          <div class="page-summary-value ${errorCount > 0 ? "warn" : "ok"}">${errorCount}</div>
          <div class="page-summary-sub">Channels with errors</div>
        </div>
      </div>
      ${
        props.lastError
          ? html`<div class="callout danger" style="margin-top: 14px;">${props.lastError}</div>`
          : nothing
      }
    </section>

    <section class="grid grid-cols-2" style="margin-top: 20px;">
      ${orderedChannels.map((channel) =>
        renderChannel(channel.key, props, {
          whatsapp,
          telegram,
          discord,
          googlechat,
          slack,
          signal,
          imessage,
          nostr,
          channelAccounts: props.snapshot?.channelAccounts ?? null,
        }),
      )}
    </section>

    <details class="collapsible" style="margin-top: 20px;">
      <summary>Raw Snapshot · 原始数据</summary>
      <div class="card-sub" style="margin-top: 10px;">
        Full channel diagnostic data from the gateway — useful for debugging.
      </div>
      <pre class="code-block" style="margin-top: 10px;">${props.snapshot ? JSON.stringify(props.snapshot, null, 2) : "No data available yet."}</pre>
    </details>
  `;
}

function resolveChannelOrder(snapshot: ChannelsStatusSnapshot | null): ChannelKey[] {
  if (snapshot?.channelMeta?.length) {
    return snapshot.channelMeta.map((entry) => entry.id);
  }
  if (snapshot?.channelOrder?.length) {
    return snapshot.channelOrder;
  }
  return ["whatsapp", "telegram", "discord", "googlechat", "slack", "signal", "imessage", "nostr"];
}

function renderChannel(key: ChannelKey, props: ChannelsProps, data: ChannelsChannelData) {
  const accountCountLabel = renderChannelAccountCount(key, data.channelAccounts);
  switch (key) {
    case "whatsapp":
      return renderWhatsAppCard({
        props,
        whatsapp: data.whatsapp,
        accountCountLabel,
      });
    case "telegram":
      return renderTelegramCard({
        props,
        telegram: data.telegram,
        telegramAccounts: data.channelAccounts?.telegram ?? [],
        accountCountLabel,
      });
    case "discord":
      return renderDiscordCard({
        props,
        discord: data.discord,
        accountCountLabel,
      });
    case "googlechat":
      return renderGoogleChatCard({
        props,
        googleChat: data.googlechat,
        accountCountLabel,
      });
    case "slack":
      return renderSlackCard({
        props,
        slack: data.slack,
        accountCountLabel,
      });
    case "signal":
      return renderSignalCard({
        props,
        signal: data.signal,
        accountCountLabel,
      });
    case "imessage":
      return renderIMessageCard({
        props,
        imessage: data.imessage,
        accountCountLabel,
      });
    case "nostr": {
      const nostrAccounts = data.channelAccounts?.nostr ?? [];
      const primaryAccount = nostrAccounts[0];
      const accountId = primaryAccount?.accountId ?? "default";
      const profile =
        (primaryAccount as { profile?: NostrProfile | null } | undefined)?.profile ?? null;
      const showForm =
        props.nostrProfileAccountId === accountId ? props.nostrProfileFormState : null;
      const profileFormCallbacks = showForm
        ? {
            onFieldChange: props.onNostrProfileFieldChange,
            onSave: props.onNostrProfileSave,
            onImport: props.onNostrProfileImport,
            onCancel: props.onNostrProfileCancel,
            onToggleAdvanced: props.onNostrProfileToggleAdvanced,
          }
        : null;
      return renderNostrCard({
        props,
        nostr: data.nostr,
        nostrAccounts,
        accountCountLabel,
        profileFormState: showForm,
        profileFormCallbacks,
        onEditProfile: () => props.onNostrProfileEdit(accountId, profile),
      });
    }
    default:
      return renderGenericChannelCard(key, props, data.channelAccounts ?? {});
  }
}

function renderGenericChannelCard(
  key: ChannelKey,
  props: ChannelsProps,
  channelAccounts: Record<string, ChannelAccountSnapshot[]>,
) {
  const label = resolveChannelLabel(props.snapshot, key);
  const status = props.snapshot?.channels?.[key] as Record<string, unknown> | undefined;
  const configured = typeof status?.configured === "boolean" ? status.configured : undefined;
  const running = typeof status?.running === "boolean" ? status.running : undefined;
  const connected = typeof status?.connected === "boolean" ? status.connected : undefined;
  const lastError = typeof status?.lastError === "string" ? status.lastError : undefined;
  const accounts = channelAccounts[key] ?? [];
  const accountCountLabel = renderChannelAccountCount(key, channelAccounts);

  return html`
    <div class="card">
      <div class="card-title">${label}</div>
      <div class="card-sub">Status and connectivity overview.</div>
      ${accountCountLabel}

      ${
        accounts.length > 0
          ? html`
            <div class="account-card-list">
              ${accounts.map((account) => renderGenericAccount(account))}
            </div>
          `
          : html`
            <div class="info-grid" style="margin-top: 16px;">
              <span class="info-grid-label">Configured</span>
              <span>${
                configured == null
                  ? "—"
                  : html`<span class="status-badge ${configured ? "ok" : "neutral"}">
                ${configured ? "Yes" : "No"}</span>`
              }</span>
              <span class="info-grid-label">Running</span>
              <span>${
                running == null
                  ? "—"
                  : html`<span class="status-badge ${running ? "ok" : "warn"}">
                ${running ? "Yes" : "No"}</span>`
              }</span>
              <span class="info-grid-label">Connected</span>
              <span>${
                connected == null
                  ? "—"
                  : html`<span class="status-badge ${connected ? "ok" : "danger"}">
                ${connected ? "Yes" : "No"}</span>`
              }</span>
            </div>
          `
      }

      ${
        lastError
          ? html`<div class="callout danger" style="margin-top: 14px;">
            ${lastError}
          </div>`
          : nothing
      }

      ${renderChannelConfigSection({ channelId: key, props })}
    </div>
  `;
}

function resolveChannelMetaMap(
  snapshot: ChannelsStatusSnapshot | null,
): Record<string, ChannelUiMetaEntry> {
  if (!snapshot?.channelMeta?.length) {
    return {};
  }
  return Object.fromEntries(snapshot.channelMeta.map((entry) => [entry.id, entry]));
}

function resolveChannelLabel(snapshot: ChannelsStatusSnapshot | null, key: string): string {
  const meta = resolveChannelMetaMap(snapshot)[key];
  return meta?.label ?? snapshot?.channelLabels?.[key] ?? key;
}

const RECENT_ACTIVITY_THRESHOLD_MS = 10 * 60 * 1000; // 10 minutes

function hasRecentActivity(account: ChannelAccountSnapshot): boolean {
  if (!account.lastInboundAt) {
    return false;
  }
  return Date.now() - account.lastInboundAt < RECENT_ACTIVITY_THRESHOLD_MS;
}

function deriveRunningStatus(account: ChannelAccountSnapshot): "Yes" | "No" | "Active" {
  if (account.running) {
    return "Yes";
  }
  // If we have recent inbound activity, the channel is effectively running
  if (hasRecentActivity(account)) {
    return "Active";
  }
  return "No";
}

function deriveConnectedStatus(account: ChannelAccountSnapshot): "Yes" | "No" | "Active" | "n/a" {
  if (account.connected === true) {
    return "Yes";
  }
  if (account.connected === false) {
    return "No";
  }
  // If connected is null/undefined but we have recent activity, show as active
  if (hasRecentActivity(account)) {
    return "Active";
  }
  return "n/a";
}

function renderGenericAccount(account: ChannelAccountSnapshot) {
  const runningStatus = deriveRunningStatus(account);
  const connectedStatus = deriveConnectedStatus(account);

  const runBadgeClass = runningStatus === "Yes" || runningStatus === "Active" ? "ok" : "warn";
  const connBadgeClass =
    connectedStatus === "Yes" || connectedStatus === "Active"
      ? "ok"
      : connectedStatus === "No"
        ? "danger"
        : "neutral";

  return html`
    <div class="account-card">
      <div class="account-card-header">
        <div class="account-card-title">${account.name || account.accountId}</div>
        <div class="account-card-id">${account.accountId}</div>
      </div>
      <div class="info-grid account-card-status">
        <span class="info-grid-label">Running</span>
        <span class="status-badge ${runBadgeClass}">${runningStatus}</span>
        <span class="info-grid-label">Configured</span>
        <span class="status-badge ${account.configured ? "ok" : "neutral"}">${account.configured ? "Yes" : "No"}</span>
        <span class="info-grid-label">Connected</span>
        <span class="status-badge ${connBadgeClass}">${connectedStatus === "n/a" ? "—" : connectedStatus}</span>
        <span class="info-grid-label">Last message</span>
        <span>${account.lastInboundAt ? formatRelativeTimestamp(account.lastInboundAt) : "—"}</span>
        ${
          account.lastError
            ? html`
              <div class="account-card-error" style="grid-column: 1 / -1;">
                ${account.lastError}
              </div>
            `
            : nothing
        }
      </div>
    </div>
  `;
}
