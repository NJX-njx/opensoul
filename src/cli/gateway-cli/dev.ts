import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { OpenSoulConfig } from "../../config/types.js";
import { resolveWorkspaceTemplateDir } from "../../agents/workspace-templates.js";
import { resolveDefaultAgentWorkspaceDir } from "../../agents/workspace.js";
import { handleReset } from "../../commands/onboard-helpers.js";
import { createConfigIO, loadConfig, writeConfigFile } from "../../config/config.js";
import { defaultRuntime } from "../../runtime.js";
import { resolveUserPath, shortenHomePath } from "../../utils.js";

/** Canonical dev agent defaults (immutable). */
export const DEV_IDENTITY_NAME = "sophie";
const DEV_IDENTITY_THEME = "protocol droid";
const DEV_IDENTITY_EMOJI = "🤖";
const DEV_AGENT_WORKSPACE_SUFFIX = "dev";

async function loadDevTemplate(name: string, fallback: string): Promise<string> {
  try {
    const templateDir = await resolveWorkspaceTemplateDir();
    const raw = await fs.promises.readFile(path.join(templateDir, name), "utf-8");
    if (!raw.startsWith("---")) {
      return raw;
    }
    const endIndex = raw.indexOf("\n---", 3);
    if (endIndex === -1) {
      return raw;
    }
    return raw.slice(endIndex + "\n---".length).replace(/^\s+/, "");
  } catch {
    return fallback;
  }
}

const resolveDevWorkspaceDir = (env: NodeJS.ProcessEnv = process.env): string => {
  const baseDir = resolveDefaultAgentWorkspaceDir(env, os.homedir);
  const profile = env.OPENSOUL_PROFILE?.trim().toLowerCase();
  if (profile === "dev") {
    return baseDir;
  }
  return `${baseDir}-${DEV_AGENT_WORKSPACE_SUFFIX}`;
};

async function writeFileIfMissing(filePath: string, content: string) {
  try {
    await fs.promises.writeFile(filePath, content, {
      encoding: "utf-8",
      flag: "wx",
    });
  } catch (err) {
    const anyErr = err as { code?: string };
    if (anyErr.code !== "EEXIST") {
      throw err;
    }
  }
}

async function ensureDevWorkspace(dir: string) {
  const resolvedDir = resolveUserPath(dir);
  await fs.promises.mkdir(resolvedDir, { recursive: true });

  const [agents, soul, tools, identity, user] = await Promise.all([
    loadDevTemplate(
      "AGENTS.dev.md",
      `# AGENTS.md - OpenSoul Dev Workspace\n\nDefault dev workspace for opensoul gateway --dev.\n`,
    ),
    loadDevTemplate(
      "SOUL.dev.md",
      `# SOUL.md - Dev Persona\n\nProtocol droid for debugging and operations.\n`,
    ),
    loadDevTemplate(
      "TOOLS.dev.md",
      `# TOOLS.md - User Tool Notes (editable)\n\nAdd your local tool notes here.\n`,
    ),
    loadDevTemplate(
      "IDENTITY.dev.md",
      `# IDENTITY.md - Agent Identity\n\n- Name: ${DEV_IDENTITY_NAME}\n- Creature: protocol droid\n- Vibe: ${DEV_IDENTITY_THEME}\n- Emoji: ${DEV_IDENTITY_EMOJI}\n`,
    ),
    loadDevTemplate(
      "USER.dev.md",
      `# USER.md - User Profile\n\n- Name:\n- Preferred address:\n- Notes:\n`,
    ),
  ]);

  await writeFileIfMissing(path.join(resolvedDir, "AGENTS.md"), agents);
  await writeFileIfMissing(path.join(resolvedDir, "SOUL.md"), soul);
  await writeFileIfMissing(path.join(resolvedDir, "TOOLS.md"), tools);
  await writeFileIfMissing(path.join(resolvedDir, "IDENTITY.md"), identity);
  await writeFileIfMissing(path.join(resolvedDir, "USER.md"), user);
}

const DEV_AGENT_ID = "dev";

/** Canonical dev agent entry (immutable defaults). */
function buildCanonicalDevAgent(workspace: string) {
  return {
    id: DEV_AGENT_ID,
    default: true as const,
    workspace,
    identity: {
      name: DEV_IDENTITY_NAME,
      theme: DEV_IDENTITY_THEME,
      emoji: DEV_IDENTITY_EMOJI,
    },
  };
}

/** Enforce canonical dev agent in config; overwrites user edits to dev agent fields. */
function enforceDevAgentInConfig(cfg: OpenSoulConfig, workspace: string): OpenSoulConfig {
  const canonical = buildCanonicalDevAgent(workspace);
  const list = Array.isArray(cfg.agents?.list) ? cfg.agents.list.filter((e) => e?.id) : [];
  const others = list.filter((e) => e?.id !== DEV_AGENT_ID).map((e) => ({ ...e, default: false }));
  const nextList = [canonical, ...others];
  return {
    ...cfg,
    agents: {
      ...cfg.agents,
      defaults: { ...cfg.agents?.defaults, workspace, skipBootstrap: true },
      list: nextList,
    },
  };
}

export async function ensureDevGatewayConfig(opts: { reset?: boolean }) {
  const workspace = resolveDevWorkspaceDir();
  if (opts.reset) {
    await handleReset("full", workspace, defaultRuntime);
  }

  const io = createConfigIO();
  const configPath = io.configPath;
  const configExists = fs.existsSync(configPath);

  if (configExists && !opts.reset) {
    const cfg = loadConfig();
    const enforced = enforceDevAgentInConfig(cfg, workspace);
    await writeConfigFile(enforced);
  } else {
    await writeConfigFile({
      gateway: {
        mode: "local",
        bind: "loopback",
      },
      agents: {
        defaults: {
          workspace,
          skipBootstrap: true,
        },
        list: [buildCanonicalDevAgent(workspace)],
      },
    });
  }

  await ensureDevWorkspace(workspace);
  defaultRuntime.log(`Dev config ready: ${shortenHomePath(configPath)}`);
  defaultRuntime.log(`Dev workspace ready: ${shortenHomePath(resolveUserPath(workspace))}`);
}
