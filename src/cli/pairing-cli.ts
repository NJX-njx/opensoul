import type { Command } from "commander";
import { normalizeChannelId } from "../channels/plugins/index.js";
import { listPairingChannels, notifyPairingApproved } from "../channels/plugins/pairing.js";
import { loadConfig } from "../config/config.js";
import { resolvePairingIdLabel } from "../pairing/pairing-labels.js";
import {
  approveChannelPairingCode,
  listChannelPairingRequests,
  type PairingRequest,
  type PairingChannel,
} from "../pairing/pairing-store.js";
import { DEFAULT_ACCOUNT_ID, normalizeAccountId } from "../routing/session-key.js";
import { defaultRuntime } from "../runtime.js";
import { formatDocsLink } from "../terminal/links.js";
import { renderTable } from "../terminal/table.js";
import { theme } from "../terminal/theme.js";
import { listWhatsAppAccountIds } from "../web/accounts.js";
import { formatCliCommand } from "./command-format.js";

type ListedPairingRequest = PairingRequest & {
  accountId?: string;
};

/** Parse channel, allowing extension channels not in core registry. */
function parseChannel(raw: unknown, channels: PairingChannel[]): PairingChannel {
  const value = (
    typeof raw === "string"
      ? raw
      : typeof raw === "number" || typeof raw === "boolean"
        ? String(raw)
        : ""
  )
    .trim()
    .toLowerCase();
  if (!value) {
    throw new Error("Channel required");
  }

  const normalized = normalizeChannelId(value);
  if (normalized) {
    if (!channels.includes(normalized)) {
      throw new Error(`Channel ${normalized} does not support pairing`);
    }
    return normalized;
  }

  // Allow extension channels: validate format but don't require registry
  if (/^[a-z][a-z0-9_-]{0,63}$/.test(value)) {
    return value as PairingChannel;
  }
  throw new Error(`Invalid channel: ${value}`);
}

async function notifyApproved(channel: PairingChannel, id: string, accountId?: string) {
  const cfg = loadConfig();
  await notifyPairingApproved({ channelId: channel, id, accountId, cfg });
}

function resolveRequestedAccountId(value: unknown): string | undefined {
  if (typeof value !== "string" || !value.trim()) {
    return undefined;
  }
  return normalizeAccountId(value);
}

function resolvePairingAccountIds(
  channel: PairingChannel,
  accountId: string | undefined,
): string[] {
  if (channel !== "whatsapp") {
    return accountId ? [accountId] : [];
  }
  if (accountId) {
    return [accountId];
  }
  return Array.from(new Set([DEFAULT_ACCOUNT_ID, ...listWhatsAppAccountIds(loadConfig())]));
}

async function listRequestsWithAccounts(params: {
  channel: PairingChannel;
  accountId?: string;
}): Promise<Array<ListedPairingRequest>> {
  const accountIds = resolvePairingAccountIds(params.channel, params.accountId);
  if (params.channel !== "whatsapp") {
    return await listChannelPairingRequests(params.channel);
  }
  const lists = await Promise.all(
    accountIds.map(async (accountId) =>
      (await listChannelPairingRequests(params.channel, process.env, accountId)).map((request) => ({
        ...request,
        accountId,
      })),
    ),
  );
  return lists.flat().toSorted((a, b) => a.createdAt.localeCompare(b.createdAt));
}

async function resolveApprovalAccountId(params: {
  channel: PairingChannel;
  accountId?: string;
  code: string;
}): Promise<string | undefined> {
  if (params.channel !== "whatsapp") {
    return params.accountId;
  }
  if (params.accountId) {
    return params.accountId;
  }
  const code = params.code.trim().toUpperCase();
  const requests = await listRequestsWithAccounts({ channel: params.channel });
  const matches = requests.filter((request) => request.code.trim().toUpperCase() === code);
  if (matches.length === 0) {
    return undefined;
  }
  const accountIds = Array.from(
    new Set(
      matches
        .map((request) => request.accountId)
        .filter((value): value is string => Boolean(value)),
    ),
  );
  if (accountIds.length > 1) {
    throw new Error(
      `Pairing code ${code} exists in multiple WhatsApp accounts (${accountIds.join(", ")}). Re-run with --account <id>.`,
    );
  }
  return accountIds[0];
}

export function registerPairingCli(program: Command) {
  const channels = listPairingChannels();
  const pairing = program
    .command("pairing")
    .description("Secure DM pairing (approve inbound requests)")
    .addHelpText(
      "after",
      () =>
        `\n${theme.muted("Docs:")} ${formatDocsLink("/cli/pairing", "docs.opensoul.ai/cli/pairing")}\n`,
    );

  pairing
    .command("list")
    .description("List pending pairing requests")
    .option("--channel <channel>", `Channel (${channels.join(", ")})`)
    .option("--account <id>", "Account id (accountId)")
    .argument("[channel]", `Channel (${channels.join(", ")})`)
    .option("--json", "Print JSON", false)
    .action(async (channelArg, opts) => {
      const channelRaw = opts.channel ?? channelArg;
      if (!channelRaw) {
        throw new Error(
          `Channel required. Use --channel <channel> or pass it as the first argument (expected one of: ${channels.join(", ")})`,
        );
      }
      const channel = parseChannel(channelRaw, channels);
      const accountId = resolveRequestedAccountId(opts.account);
      const requests = await listRequestsWithAccounts({ channel, accountId });
      if (opts.json) {
        defaultRuntime.log(JSON.stringify({ channel, accountId, requests }, null, 2));
        return;
      }
      if (requests.length === 0) {
        defaultRuntime.log(
          theme.muted(
            `No pending ${channel}${accountId ? ` (${accountId})` : ""} pairing requests.`,
          ),
        );
        return;
      }
      const idLabel = resolvePairingIdLabel(channel);
      const tableWidth = Math.max(60, (process.stdout.columns ?? 120) - 1);
      const distinctAccountIds = Array.from(
        new Set(
          requests
            .map((request) => request.accountId)
            .filter((value): value is string => Boolean(value)),
        ),
      );
      const showAccountColumn = distinctAccountIds.length > 1 || Boolean(accountId);
      defaultRuntime.log(
        `${theme.heading("Pairing requests")} ${theme.muted(`(${requests.length})`)}`,
      );
      defaultRuntime.log(
        renderTable({
          width: tableWidth,
          columns: [
            ...(showAccountColumn
              ? [{ key: "Account", header: "Account", minWidth: 12 } as const]
              : []),
            { key: "Code", header: "Code", minWidth: 10 },
            { key: "ID", header: idLabel, minWidth: 12, flex: true },
            { key: "Meta", header: "Meta", minWidth: 8, flex: true },
            { key: "Requested", header: "Requested", minWidth: 12 },
          ],
          rows: requests.map((r) => ({
            ...(showAccountColumn ? { Account: r.accountId ?? "" } : {}),
            Code: r.code,
            ID: r.id,
            Meta: r.meta ? JSON.stringify(r.meta) : "",
            Requested: r.createdAt,
          })),
        }).trimEnd(),
      );
    });

  pairing
    .command("approve")
    .description("Approve a pairing code and allow that sender")
    .option("--channel <channel>", `Channel (${channels.join(", ")})`)
    .option("--account <id>", "Account id (accountId)")
    .argument("<codeOrChannel>", "Pairing code (or channel when using 2 args)")
    .argument("[code]", "Pairing code (when channel is passed as the 1st arg)")
    .option("--notify", "Notify the requester on the same channel", false)
    .action(async (codeOrChannel, code, opts) => {
      const channelRaw = opts.channel ?? codeOrChannel;
      const resolvedCode = opts.channel ? codeOrChannel : code;
      if (!opts.channel && !code) {
        throw new Error(
          `Usage: ${formatCliCommand("opensoul pairing approve <channel> <code>")} (or: ${formatCliCommand("opensoul pairing approve --channel <channel> <code>")})`,
        );
      }
      if (opts.channel && code != null) {
        throw new Error(
          `Too many arguments. Use: ${formatCliCommand("opensoul pairing approve --channel <channel> <code>")}`,
        );
      }
      const channel = parseChannel(channelRaw, channels);
      const requestedAccountId = resolveRequestedAccountId(opts.account);
      const approvalAccountId = await resolveApprovalAccountId({
        channel,
        accountId: requestedAccountId,
        code: String(resolvedCode),
      });
      const approved = await approveChannelPairingCode({
        channel,
        code: String(resolvedCode),
        accountId: approvalAccountId,
      });
      if (!approved) {
        throw new Error(`No pending pairing request found for code: ${String(resolvedCode)}`);
      }

      defaultRuntime.log(
        `${theme.success("Approved")} ${theme.muted(channel)} sender ${theme.command(approved.id)}${approvalAccountId ? theme.muted(` (account ${approvalAccountId})`) : ""}.`,
      );

      if (!opts.notify) {
        return;
      }
      await notifyApproved(channel, approved.id, approvalAccountId).catch((err) => {
        defaultRuntime.log(theme.warn(`Failed to notify requester: ${String(err)}`));
      });
    });
}
