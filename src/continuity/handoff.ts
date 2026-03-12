import crypto from "node:crypto";
import type { OpenSoulConfig } from "../config/config.js";
import type { HandoffDecision } from "./types.js";
import { routeReply } from "../auto-reply/reply/route-reply.js";
import { callGateway } from "../gateway/call.js";
import { buildControlUiSessionUrl } from "../gateway/control-ui-shared.js";
import { loadSessionEntry } from "../gateway/session-utils.js";
import { normalizeSessionDeliveryFields } from "../utils/delivery-context.js";
import { appendTaskEvent } from "./service.js";

type NodeListResponse = {
  nodes?: Array<{
    nodeId?: string;
    displayName?: string;
    connected?: boolean;
    caps?: Array<string>;
    commands?: Array<string>;
  }>;
};

function hasCanvasCapability(node: { caps?: Array<string>; commands?: Array<string> }): boolean {
  const caps = Array.isArray(node.caps) ? node.caps : [];
  const commands = Array.isArray(node.commands) ? node.commands : [];
  return (
    caps.includes("canvas") ||
    commands.includes("canvas.present") ||
    commands.includes("canvas.navigate")
  );
}

export function buildControlUiDeepLink(params: {
  cfg: OpenSoulConfig;
  sessionKey: string;
}): string | undefined {
  return buildControlUiSessionUrl({
    publicUrl: params.cfg.gateway?.controlUi?.publicUrl,
    basePath: params.cfg.gateway?.controlUi?.basePath,
    sessionKey: params.sessionKey,
  });
}

export async function resolveCanvasCapableNodeId(cfg: OpenSoulConfig): Promise<string | undefined> {
  const result = await callGateway<NodeListResponse>({
    config: cfg,
    method: "node.list",
    params: {},
    timeoutMs: 5_000,
  }).catch(() => undefined);
  const nodes = Array.isArray(result?.nodes) ? result.nodes : [];
  const candidates = nodes.filter(
    (node): node is Required<Pick<(typeof nodes)[number], "nodeId">> & typeof node =>
      typeof node?.nodeId === "string" &&
      node.nodeId.trim().length > 0 &&
      hasCanvasCapability(node),
  );
  if (candidates.length === 0) {
    return undefined;
  }
  const connected = candidates.find((node) => node.connected);
  return (connected ?? candidates[0]).nodeId;
}

async function deliverControlUiLink(params: {
  cfg: OpenSoulConfig;
  sessionKey: string;
  url: string;
  canvasOpened: boolean;
}): Promise<{ ok: boolean; error?: string }> {
  const session = loadSessionEntry(params.sessionKey).entry;
  const delivery = normalizeSessionDeliveryFields(session);
  const channel = delivery.lastChannel;
  const to = delivery.lastTo;
  if (!channel || !to) {
    return { ok: false, error: "no reply route available for handoff" };
  }
  const note = params.canvasOpened
    ? `Continue this task in Control UI: ${params.url}\n\nI also opened the same session on your canvas.`
    : `Continue this task in Control UI: ${params.url}`;
  const result = await routeReply({
    payload: { text: note },
    channel,
    to,
    sessionKey: params.sessionKey,
    accountId: delivery.lastAccountId,
    threadId: delivery.lastThreadId,
    cfg: params.cfg,
    mirror: false,
  });
  return result.ok ? { ok: true } : { ok: false, error: result.error };
}

async function presentOnCanvas(params: {
  cfg: OpenSoulConfig;
  nodeId: string;
  url: string;
}): Promise<{ ok: boolean; error?: string }> {
  try {
    await callGateway({
      config: params.cfg,
      method: "node.invoke",
      params: {
        nodeId: params.nodeId,
        command: "canvas.present",
        params: { url: params.url },
        idempotencyKey: crypto.randomUUID(),
      },
      timeoutMs: 10_000,
    });
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}

export async function executeHandoffDecision(params: {
  cfg: OpenSoulConfig;
  agentId: string;
  taskId: string;
  sessionKey: string;
  decision: HandoffDecision;
}): Promise<HandoffDecision> {
  if (params.decision.mode === "none" || !params.decision.controlUiUrl) {
    return params.decision;
  }

  let finalDecision = params.decision;
  let canvasOpened = false;
  if (params.decision.mode === "control-ui+canvas" && params.decision.canvasNodeId) {
    const canvasResult = await presentOnCanvas({
      cfg: params.cfg,
      nodeId: params.decision.canvasNodeId,
      url: params.decision.controlUiUrl,
    });
    if (canvasResult.ok) {
      canvasOpened = true;
      appendTaskEvent({
        cfg: params.cfg,
        agentId: params.agentId,
        taskId: params.taskId,
        kind: "handoff.canvas",
        sessionKey: params.sessionKey,
        summary: `Opened canvas on ${params.decision.canvasNodeId}`,
        payload: {
          nodeId: params.decision.canvasNodeId,
          url: params.decision.controlUiUrl,
        },
      });
    } else {
      finalDecision = {
        mode: "control-ui",
        reason: `${params.decision.reason}; canvas unavailable`,
        controlUiUrl: params.decision.controlUiUrl,
        degradedFrom: "control-ui+canvas",
      };
      appendTaskEvent({
        cfg: params.cfg,
        agentId: params.agentId,
        taskId: params.taskId,
        kind: "handoff.canvas-failed",
        sessionKey: params.sessionKey,
        summary: canvasResult.error ?? "canvas handoff failed",
        payload: {
          nodeId: params.decision.canvasNodeId,
          error: canvasResult.error,
        },
      });
    }
  }

  const delivered = await deliverControlUiLink({
    cfg: params.cfg,
    sessionKey: params.sessionKey,
    url: params.decision.controlUiUrl,
    canvasOpened,
  });
  appendTaskEvent({
    cfg: params.cfg,
    agentId: params.agentId,
    taskId: params.taskId,
    kind: delivered.ok ? "handoff.control-ui" : "handoff.control-ui-failed",
    sessionKey: params.sessionKey,
    summary: delivered.ok
      ? `Delivered Control UI handoff${canvasOpened ? " and canvas open" : ""}`
      : (delivered.error ?? "control UI handoff failed"),
    payload: {
      mode: finalDecision.mode,
      url: params.decision.controlUiUrl,
      canvasOpened,
      error: delivered.error,
    },
  });

  return finalDecision;
}
