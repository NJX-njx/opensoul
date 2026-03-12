import type { Snapshot } from "../protocol/index.js";
import { resolveDefaultAgentId } from "../../agents/agent-scope.js";
import { getHealthSnapshot, type HealthSummary } from "../../commands/health.js";
import { CONFIG_PATH, STATE_DIR, loadConfig } from "../../config/config.js";
import { resolveMainSessionKey } from "../../config/sessions.js";
import { buildContinuitySummary, logStaleContinuityTasks } from "../../continuity/service.js";
import { listSystemPresence } from "../../infra/system-presence.js";
import { normalizeMainKey } from "../../routing/session-key.js";

let presenceVersion = 1;
let healthVersion = 1;
let healthCache: HealthSummary | null = null;
let healthRefresh: Promise<HealthSummary> | null = null;
let broadcastHealthUpdate: ((snap: HealthSummary) => void) | null = null;

function resolveContinuityAgentIds(cfg: ReturnType<typeof loadConfig>): Array<string> {
  const seen = new Set<string>();
  const ids: Array<string> = [];
  const push = (value: string | undefined) => {
    const normalized = value?.trim().toLowerCase();
    if (!normalized || seen.has(normalized)) {
      return;
    }
    seen.add(normalized);
    ids.push(normalized);
  };
  push(resolveDefaultAgentId(cfg));
  for (const entry of cfg.agents?.list ?? []) {
    if (!entry || typeof entry !== "object" || typeof entry.id !== "string") {
      continue;
    }
    push(entry.id);
  }
  return ids;
}

export function buildGatewaySnapshot(): Snapshot {
  const cfg = loadConfig();
  const defaultAgentId = resolveDefaultAgentId(cfg);
  const mainKey = normalizeMainKey(cfg.session?.mainKey);
  const mainSessionKey = resolveMainSessionKey(cfg);
  const scope = cfg.session?.scope ?? "per-sender";
  const presence = listSystemPresence();
  const uptimeMs = Math.round(process.uptime() * 1000);
  // Health is async; caller should await getHealthSnapshot and replace later if needed.
  const emptyHealth: unknown = {};
  return {
    presence,
    health: emptyHealth,
    stateVersion: { presence: presenceVersion, health: healthVersion },
    uptimeMs,
    // Surface resolved paths so UIs can display the true config location.
    configPath: CONFIG_PATH,
    stateDir: STATE_DIR,
    sessionDefaults: {
      defaultAgentId,
      mainKey,
      mainSessionKey,
      scope,
    },
  };
}

export function getHealthCache(): HealthSummary | null {
  return healthCache;
}

export function getHealthVersion(): number {
  return healthVersion;
}

export function incrementPresenceVersion(): number {
  presenceVersion += 1;
  return presenceVersion;
}

export function getPresenceVersion(): number {
  return presenceVersion;
}

export function setBroadcastHealthUpdate(fn: ((snap: HealthSummary) => void) | null) {
  broadcastHealthUpdate = fn;
}

export async function refreshGatewayHealthSnapshot(opts?: { probe?: boolean }) {
  if (!healthRefresh) {
    healthRefresh = (async () => {
      const cfg = loadConfig();
      const snap = await getHealthSnapshot({ probe: opts?.probe });
      const continuity = buildContinuitySummary({
        cfg,
        agentIds: resolveContinuityAgentIds(cfg),
      });
      logStaleContinuityTasks(continuity);
      const enriched = {
        ...snap,
        continuity,
      } satisfies HealthSummary;
      healthCache = enriched;
      healthVersion += 1;
      if (broadcastHealthUpdate) {
        broadcastHealthUpdate(enriched);
      }
      return enriched;
    })().finally(() => {
      healthRefresh = null;
    });
  }
  return healthRefresh;
}
