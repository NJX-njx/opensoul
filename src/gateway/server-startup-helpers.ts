import path from "node:path";
import type { OpenSoulConfig } from "../config/config.js";
import type { SubsystemLogger } from "../logging/subsystem.js";
import type { RuntimeEnv } from "../runtime.js";
import type { ControlUiRootState } from "./control-ui.js";
import { resolveAgentWorkspaceDir, resolveDefaultAgentId } from "../agents/agent-scope.js";
import { type ChannelId, listChannelPlugins } from "../channels/plugins/index.js";
import { formatCliCommand } from "../cli/command-format.js";
import {
  isNixMode,
  loadConfig,
  migrateLegacyConfig,
  readConfigFileSnapshot,
  writeConfigFile,
} from "../config/config.js";
import { applyPluginAutoEnable } from "../config/plugin-auto-enable.js";
import {
  ensureControlUiAssetsBuilt,
  resolveControlUiRootOverrideSync,
  resolveControlUiRootSync,
} from "../infra/control-ui-assets.js";
import { isDiagnosticsEnabled } from "../infra/diagnostic-events.js";
import { logAcceptedEnvOption } from "../infra/env.js";
import { runtimeForLogger } from "../logging/subsystem.js";
import { listGatewayMethods } from "./server-methods-list.js";
import { coreGatewayHandlers } from "./server-methods.js";
import { loadGatewayPlugins } from "./server-plugins.js";

export async function loadGatewayConfigSnapshot(log: SubsystemLogger) {
  let configSnapshot = await readConfigFileSnapshot();
  if (configSnapshot.legacyIssues.length > 0) {
    if (isNixMode) {
      throw new Error(
        "Legacy config entries detected while running in Nix mode. Update your Nix config to the latest schema and restart.",
      );
    }
    const { config: migrated, changes } = migrateLegacyConfig(configSnapshot.parsed);
    if (!migrated) {
      throw new Error(
        `Legacy config entries detected but auto-migration failed. Run "${formatCliCommand("opensoul doctor")}" to migrate.`,
      );
    }
    await writeConfigFile(migrated);
    if (changes.length > 0) {
      log.info(
        `gateway: migrated legacy config entries:\n${changes.map((entry) => `- ${entry}`).join("\n")}`,
      );
    }
  }

  configSnapshot = await readConfigFileSnapshot();
  if (configSnapshot.exists && !configSnapshot.valid) {
    const issues =
      configSnapshot.issues.length > 0
        ? configSnapshot.issues
            .map((issue) => `${issue.path || "<root>"}: ${issue.message}`)
            .join("\n")
        : "Unknown validation issue.";
    throw new Error(
      `Invalid config at ${configSnapshot.path}.\n${issues}\nRun "${formatCliCommand("opensoul doctor")}" to repair, then retry.`,
    );
  }

  const autoEnable = applyPluginAutoEnable({ config: configSnapshot.config, env: process.env });
  if (autoEnable.changes.length > 0) {
    try {
      await writeConfigFile(autoEnable.config);
      log.info(
        `gateway: auto-enabled plugins:\n${autoEnable.changes.map((entry) => `- ${entry}`).join("\n")}`,
      );
    } catch (err) {
      log.warn(`gateway: failed to persist plugin auto-enable changes: ${String(err)}`);
    }
  }

  const cfgAtStart = loadConfig();
  return { configSnapshot, cfgAtStart };
}

export async function resolveControlUiRootState(params: {
  controlUiRootOverride?: string;
  controlUiEnabled: boolean;
  runtime: RuntimeEnv;
  log: SubsystemLogger;
}): Promise<ControlUiRootState | undefined> {
  const { controlUiRootOverride, controlUiEnabled, runtime, log } = params;
  if (controlUiRootOverride) {
    const resolvedOverride = resolveControlUiRootOverrideSync(controlUiRootOverride);
    const resolvedOverridePath = path.resolve(controlUiRootOverride);
    const state: ControlUiRootState = resolvedOverride
      ? { kind: "resolved", path: resolvedOverride }
      : { kind: "invalid", path: resolvedOverridePath };
    if (!resolvedOverride) {
      log.warn(`gateway: controlUi.root not found at ${resolvedOverridePath}`);
    }
    return state;
  }
  if (!controlUiEnabled) {
    return undefined;
  }
  let resolvedRoot = resolveControlUiRootSync({
    moduleUrl: import.meta.url,
    argv1: process.argv[1],
    cwd: process.cwd(),
  });
  if (!resolvedRoot) {
    const ensureResult = await ensureControlUiAssetsBuilt(runtime);
    if (!ensureResult.ok && ensureResult.message) {
      log.warn(`gateway: ${ensureResult.message}`);
    }
    resolvedRoot = resolveControlUiRootSync({
      moduleUrl: import.meta.url,
      argv1: process.argv[1],
      cwd: process.cwd(),
    });
  }
  return resolvedRoot ? { kind: "resolved", path: resolvedRoot } : { kind: "missing" };
}

export function loadGatewayPluginState(params: {
  cfg: OpenSoulConfig;
  workspaceDir: string;
  log: SubsystemLogger;
  logChannels: SubsystemLogger;
}) {
  const baseMethods = listGatewayMethods();
  const { pluginRegistry, gatewayMethods: baseGatewayMethods } = loadGatewayPlugins({
    cfg: params.cfg,
    workspaceDir: params.workspaceDir,
    log: params.log,
    coreGatewayHandlers,
    baseMethods,
  });
  const channelLogs = Object.fromEntries(
    listChannelPlugins().map((plugin) => [plugin.id, params.logChannels.child(plugin.id)]),
  ) as Record<ChannelId, SubsystemLogger>;
  const channelRuntimeEnvs = Object.fromEntries(
    Object.entries(channelLogs).map(([id, logger]) => [id, runtimeForLogger(logger)]),
  ) as Record<ChannelId, RuntimeEnv>;
  const channelMethods = listChannelPlugins().flatMap((plugin) => plugin.gatewayMethods ?? []);
  const gatewayMethods = Array.from(new Set([...baseGatewayMethods, ...channelMethods]));
  return { pluginRegistry, gatewayMethods, channelLogs, channelRuntimeEnvs };
}

export async function loadGatewayStartupState(params: {
  log: SubsystemLogger;
  logChannels: SubsystemLogger;
}) {
  const { cfgAtStart } = await loadGatewayConfigSnapshot(params.log);
  const diagnosticsEnabled = isDiagnosticsEnabled(cfgAtStart);
  const defaultAgentId = resolveDefaultAgentId(cfgAtStart);
  const defaultWorkspaceDir = resolveAgentWorkspaceDir(cfgAtStart, defaultAgentId);
  const { pluginRegistry, gatewayMethods, channelLogs, channelRuntimeEnvs } =
    loadGatewayPluginState({
      cfg: cfgAtStart,
      workspaceDir: defaultWorkspaceDir,
      log: params.log,
      logChannels: params.logChannels,
    });
  return {
    cfgAtStart,
    diagnosticsEnabled,
    defaultAgentId,
    defaultWorkspaceDir,
    pluginRegistry,
    gatewayMethods,
    channelLogs,
    channelRuntimeEnvs,
  };
}

export function logGatewayEnvOptions() {
  logAcceptedEnvOption({
    key: "OPENSOUL_RAW_STREAM",
    description: "raw stream logging enabled",
  });
  logAcceptedEnvOption({
    key: "OPENSOUL_RAW_STREAM_PATH",
    description: "raw stream log path override",
  });
}
