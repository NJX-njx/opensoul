import crypto from "node:crypto";
import type { OpenSoulConfig } from "../config/config.js";
import type { HandoffDecision } from "./types.js";
import { routeReply } from "../auto-reply/reply/route-reply.js";
import { callGateway } from "../gateway/call.js";
import { buildControlUiSessionUrl } from "../gateway/control-ui-shared.js";
import { loadSessionEntry } from "../gateway/session-utils.js";
import { createSubsystemLogger } from "../logging/subsystem.js";
import { normalizeSessionDeliveryFields } from "../utils/delivery-context.js";
import { appendTaskEvent, listTaskEvents } from "./service.js";

const HANDOFF_MAX_ATTEMPTS = 2;
const continuityLogger = createSubsystemLogger("continuity");

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

function buildHandoffIdempotencyKey(params: {
  taskId: string;
  sessionKey: string;
  url: string;
  target: "canvas" | "control-ui";
  runId?: string;
  nodeId?: string;
}): string {
  const hash = crypto
    .createHash("sha1")
    .update(
      [
        params.target,
        params.taskId,
        params.sessionKey,
        params.runId ?? "",
        params.nodeId ?? "",
        params.url,
      ].join("|"),
    )
    .digest("hex");
  return `handoff-${hash.slice(0, 24)}`;
}

function shouldRetryHandoffError(error: string | undefined): boolean {
  const normalized = error?.trim().toLowerCase();
  if (!normalized) {
    return false;
  }
  if (
    normalized.includes("no reply route available") ||
    normalized.includes("missing gateway.controlui.publicurl") ||
    normalized.includes("not a direct chat")
  ) {
    return false;
  }
  return true;
}

async function retryHandoffOperation(
  operation: (attempt: number) => Promise<{ ok: boolean; error?: string }>,
): Promise<{ ok: boolean; error?: string; attempts: number }> {
  let lastResult: { ok: boolean; error?: string } = { ok: false, error: "handoff not attempted" };
  for (let attempt = 1; attempt <= HANDOFF_MAX_ATTEMPTS; attempt += 1) {
    lastResult = await operation(attempt);
    if (lastResult.ok || !shouldRetryHandoffError(lastResult.error)) {
      return {
        ...lastResult,
        attempts: attempt,
      };
    }
  }
  return {
    ...lastResult,
    attempts: HANDOFF_MAX_ATTEMPTS,
  };
}

function hasExistingHandoffForRun(params: {
  cfg: OpenSoulConfig;
  agentId: string;
  taskId: string;
  runId?: string;
}): boolean {
  const runId = params.runId?.trim();
  if (!runId) {
    return false;
  }
  return listTaskEvents({
    cfg: params.cfg,
    agentId: params.agentId,
    taskId: params.taskId,
    limit: 20,
  }).some(
    (event) =>
      event.runId === runId &&
      (event.kind === "handoff.control-ui" || event.kind === "handoff.control-ui-failed"),
  );
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
  taskId: string;
  sessionKey: string;
  url: string;
  canvasOpened: boolean;
  runId?: string;
}): Promise<{ ok: boolean; error?: string; attempts: number }> {
  const session = loadSessionEntry(params.sessionKey).entry;
  const delivery = normalizeSessionDeliveryFields(session);
  const channel = delivery.lastChannel;
  const to = delivery.lastTo;
  if (!channel || !to) {
    return { ok: false, error: "no reply route available for handoff", attempts: 1 };
  }
  const note = params.canvasOpened
    ? `Continue this task in Control UI: ${params.url}\n\nI also opened the same session on your canvas.`
    : `Continue this task in Control UI: ${params.url}`;
  return retryHandoffOperation(async () => {
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
  });
}

async function presentOnCanvas(params: {
  cfg: OpenSoulConfig;
  taskId: string;
  nodeId: string;
  sessionKey: string;
  url: string;
  runId?: string;
}): Promise<{ ok: boolean; error?: string; attempts: number; idempotencyKey: string }> {
  const idempotencyKey = buildHandoffIdempotencyKey({
    taskId: params.taskId,
    sessionKey: params.sessionKey,
    url: params.url,
    target: "canvas",
    runId: params.runId,
    nodeId: params.nodeId,
  });
  const result = await retryHandoffOperation(async () => {
    try {
      await callGateway({
        config: params.cfg,
        method: "node.invoke",
        params: {
          nodeId: params.nodeId,
          command: "canvas.present",
          params: { url: params.url },
          idempotencyKey,
        },
        timeoutMs: 10_000,
      });
      return { ok: true };
    } catch (error) {
      return { ok: false, error: error instanceof Error ? error.message : String(error) };
    }
  });
  return {
    ...result,
    idempotencyKey,
  };
}

export async function executeHandoffDecision(params: {
  cfg: OpenSoulConfig;
  agentId: string;
  taskId: string;
  sessionKey: string;
  decision: HandoffDecision;
  runId?: string;
}): Promise<HandoffDecision> {
  if (params.decision.mode === "none" || !params.decision.controlUiUrl) {
    return params.decision;
  }
  if (
    hasExistingHandoffForRun({
      cfg: params.cfg,
      agentId: params.agentId,
      taskId: params.taskId,
      runId: params.runId,
    })
  ) {
    return params.decision;
  }

  let finalDecision = params.decision;
  let canvasOpened = false;
  if (params.decision.mode === "control-ui+canvas" && params.decision.canvasNodeId) {
    const canvasResult = await presentOnCanvas({
      cfg: params.cfg,
      taskId: params.taskId,
      nodeId: params.decision.canvasNodeId,
      sessionKey: params.sessionKey,
      url: params.decision.controlUiUrl,
      runId: params.runId,
    });
    if (canvasResult.ok) {
      canvasOpened = true;
      appendTaskEvent({
        cfg: params.cfg,
        agentId: params.agentId,
        taskId: params.taskId,
        kind: "handoff.canvas",
        sessionKey: params.sessionKey,
        runId: params.runId,
        summary: `Opened canvas on ${params.decision.canvasNodeId}`,
        payload: {
          nodeId: params.decision.canvasNodeId,
          url: params.decision.controlUiUrl,
          attempts: canvasResult.attempts,
          idempotencyKey: canvasResult.idempotencyKey,
        },
      });
    } else {
      finalDecision = {
        ...params.decision,
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
        runId: params.runId,
        summary: canvasResult.error ?? "canvas handoff failed",
        payload: {
          nodeId: params.decision.canvasNodeId,
          error: canvasResult.error,
          attempts: canvasResult.attempts,
          idempotencyKey: canvasResult.idempotencyKey,
          degradedTo: "control-ui",
        },
      });
    }
  }

  const delivered = await deliverControlUiLink({
    cfg: params.cfg,
    taskId: params.taskId,
    sessionKey: params.sessionKey,
    url: params.decision.controlUiUrl,
    canvasOpened,
    runId: params.runId,
  });
  appendTaskEvent({
    cfg: params.cfg,
    agentId: params.agentId,
    taskId: params.taskId,
    kind: delivered.ok ? "handoff.control-ui" : "handoff.control-ui-failed",
    sessionKey: params.sessionKey,
    runId: params.runId,
    summary: delivered.ok
      ? `Delivered Control UI handoff${canvasOpened ? " and canvas open" : ""}`
      : (delivered.error ?? "control UI handoff failed"),
    payload: {
      mode: finalDecision.mode,
      url: params.decision.controlUiUrl,
      canvasOpened,
      error: delivered.error,
      attempts: delivered.attempts,
      policyMatch: finalDecision.policyMatch,
      complexitySignals: finalDecision.complexitySignals,
    },
  });
  continuityLogger[delivered.ok ? "info" : "warn"]("handoff result", {
    event: delivered.ok ? "handoff.control-ui" : "handoff.control-ui-failed",
    agentId: params.agentId,
    taskId: params.taskId,
    sessionKey: params.sessionKey,
    runId: params.runId,
    mode: finalDecision.mode,
    degradedFrom: finalDecision.degradedFrom,
    url: params.decision.controlUiUrl,
    canvasOpened,
    attempts: delivered.attempts,
    error: delivered.error,
    policyMatch: finalDecision.policyMatch,
    complexitySignals: finalDecision.complexitySignals,
  });

  return finalDecision;
}
