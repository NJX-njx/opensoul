import path from "node:path";
import type { OpenSoulConfig } from "../config/config.js";
import { resolveAgentDir } from "../agents/agent-scope.js";

export function resolveContinuityDir(cfg: OpenSoulConfig, agentId: string): string {
  return path.dirname(resolveAgentDir(cfg, agentId));
}

export function resolveContinuityDbPath(cfg: OpenSoulConfig, agentId: string): string {
  return path.join(resolveContinuityDir(cfg, agentId), "continuity.sqlite");
}
