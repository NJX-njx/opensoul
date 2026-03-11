import path from "node:path";
import type { AnyAgentTool } from "../agents/tools/common.js";
import type { ChannelDock } from "../channels/dock.js";
import type { ChannelPlugin } from "../channels/plugins/types.js";
import type {
  GatewayRequestHandler,
  GatewayRequestHandlers,
} from "../gateway/server-methods/types.js";
import type { HookEntry } from "../hooks/types.js";
import type { PluginRuntime } from "./runtime/types.js";
import type {
  OpenSoulPluginApi,
  OpenSoulPluginChannelRegistration,
  OpenSoulPluginCliRegistrar,
  OpenSoulPluginCommandDefinition,
  OpenSoulPluginHttpHandler,
  OpenSoulPluginHttpRouteHandler,
  OpenSoulPluginHookOptions,
  ProviderPlugin,
  OpenSoulPluginService,
  OpenSoulPluginToolContext,
  OpenSoulPluginToolFactory,
  PluginConfigUiHint,
  PluginDiagnostic,
  PluginLogger,
  PluginOrigin,
  PluginKind,
  PluginHookName,
  PluginHookHandlerMap,
  PluginHookRegistration as TypedPluginHookRegistration,
} from "./types.js";
import { registerInternalHook } from "../hooks/internal-hooks.js";
import { resolveUserPath } from "../utils.js";
import { registerPluginCommand } from "./commands.js";
import { normalizePluginHttpPath } from "./http-path.js";

export type PluginToolRegistration = {
  pluginId: string;
  factory: OpenSoulPluginToolFactory;
  names: string[];
  optional: boolean;
  source: string;
};

export type PluginCliRegistration = {
  pluginId: string;
  register: OpenSoulPluginCliRegistrar;
  commands: string[];
  source: string;
};

export type PluginHttpRegistration = {
  pluginId: string;
  handler: OpenSoulPluginHttpHandler;
  source: string;
};

export type PluginHttpRouteRegistration = {
  pluginId?: string;
  path: string;
  handler: OpenSoulPluginHttpRouteHandler;
  source?: string;
};

export type PluginChannelRegistration = {
  pluginId: string;
  plugin: ChannelPlugin;
  dock?: ChannelDock;
  source: string;
};

export type PluginProviderRegistration = {
  pluginId: string;
  provider: ProviderPlugin;
  source: string;
};

export type PluginHookRegistration = {
  pluginId: string;
  entry: HookEntry;
  events: string[];
  source: string;
};

export type PluginServiceRegistration = {
  pluginId: string;
  service: OpenSoulPluginService;
  source: string;
};

export type PluginCommandRegistration = {
  pluginId: string;
  command: OpenSoulPluginCommandDefinition;
  source: string;
};

export type PluginRecord = {
  id: string;
  name: string;
  version?: string;
  description?: string;
  kind?: PluginKind;
  source: string;
  origin: PluginOrigin;
  workspaceDir?: string;
  enabled: boolean;
  status: "loaded" | "disabled" | "error";
  error?: string;
  toolNames: string[];
  hookNames: string[];
  channelIds: string[];
  providerIds: string[];
  gatewayMethods: string[];
  cliCommands: string[];
  services: string[];
  commands: string[];
  httpHandlers: number;
  hookCount: number;
  configSchema: boolean;
  configUiHints?: Record<string, PluginConfigUiHint>;
  configJsonSchema?: Record<string, unknown>;
};

export type PluginRegistry = {
  plugins: PluginRecord[];
  tools: PluginToolRegistration[];
  hooks: PluginHookRegistration[];
  typedHooks: TypedPluginHookRegistration[];
  channels: PluginChannelRegistration[];
  providers: PluginProviderRegistration[];
  gatewayHandlers: GatewayRequestHandlers;
  httpHandlers: PluginHttpRegistration[];
  httpRoutes: PluginHttpRouteRegistration[];
  cliRegistrars: PluginCliRegistration[];
  services: PluginServiceRegistration[];
  commands: PluginCommandRegistration[];
  diagnostics: PluginDiagnostic[];
};

export type PluginRegistryParams = {
  logger: PluginLogger;
  coreGatewayHandlers?: GatewayRequestHandlers;
  runtime: PluginRuntime;
};

export function createPluginRegistry(registryParams: PluginRegistryParams) {
  const MAX_RUNTIME_FAILURES = 3;
  const registry: PluginRegistry = {
    plugins: [],
    tools: [],
    hooks: [],
    typedHooks: [],
    channels: [],
    providers: [],
    gatewayHandlers: {},
    httpHandlers: [],
    httpRoutes: [],
    cliRegistrars: [],
    services: [],
    commands: [],
    diagnostics: [],
  };
  const coreGatewayMethods = new Set(Object.keys(registryParams.coreGatewayHandlers ?? {}));

  const pushDiagnostic = (diag: PluginDiagnostic) => {
    registry.diagnostics.push(diag);
  };

  const runtimeFailureCounts = new Map<string, number>();

  const markRuntimeFailure = (record: PluginRecord, scope: string, err: unknown) => {
    const nextCount = (runtimeFailureCounts.get(record.id) ?? 0) + 1;
    runtimeFailureCounts.set(record.id, nextCount);
    const message = err instanceof Error ? err.message : String(err);
    registryParams.logger.warn(
      `[plugins] ${record.id} runtime ${scope} failure (${nextCount}/${MAX_RUNTIME_FAILURES}): ${message}`,
    );
    pushDiagnostic({
      level: "warn",
      pluginId: record.id,
      source: record.source,
      message: `runtime ${scope} failure (${nextCount}/${MAX_RUNTIME_FAILURES}): ${message}`,
    });
    if (nextCount >= MAX_RUNTIME_FAILURES) {
      record.enabled = false;
      record.status = "error";
      record.error = `plugin auto-disabled after ${nextCount} runtime failures`;
      registryParams.logger.error(
        `[plugins] ${record.id} auto-disabled after repeated runtime failures`,
      );
      pushDiagnostic({
        level: "error",
        pluginId: record.id,
        source: record.source,
        message: record.error,
      });
    }
  };

  const registerTool = (
    record: PluginRecord,
    tool: AnyAgentTool | OpenSoulPluginToolFactory,
    opts?: { name?: string; names?: string[]; optional?: boolean },
  ) => {
    const names = opts?.names ?? (opts?.name ? [opts.name] : []);
    const optional = opts?.optional === true;
    const factoryRaw: OpenSoulPluginToolFactory =
      typeof tool === "function" ? tool : (_ctx: OpenSoulPluginToolContext) => tool;
    const factory: OpenSoulPluginToolFactory = (ctx) => {
      if (!record.enabled) {
        return null;
      }
      try {
        return factoryRaw(ctx);
      } catch (err) {
        markRuntimeFailure(record, "tool", err);
        return null;
      }
    };

    if (typeof tool !== "function") {
      names.push(tool.name);
    }

    const normalized = names.map((name) => name.trim()).filter(Boolean);
    if (normalized.length > 0) {
      record.toolNames.push(...normalized);
    }
    registry.tools.push({
      pluginId: record.id,
      factory,
      names: normalized,
      optional,
      source: record.source,
    });
  };

  const registerHook = (
    record: PluginRecord,
    events: string | string[],
    handler: Parameters<typeof registerInternalHook>[1],
    opts: OpenSoulPluginHookOptions | undefined,
    config: OpenSoulPluginApi["config"],
  ) => {
    const eventList = Array.isArray(events) ? events : [events];
    const normalizedEvents = eventList.map((event) => event.trim()).filter(Boolean);
    const entry = opts?.entry ?? null;
    const name = entry?.hook.name ?? opts?.name?.trim();
    if (!name) {
      pushDiagnostic({
        level: "warn",
        pluginId: record.id,
        source: record.source,
        message: "hook registration missing name",
      });
      return;
    }

    const description = entry?.hook.description ?? opts?.description ?? "";
    const safeHandler: typeof handler = async (event) => {
      if (!record.enabled) {
        return;
      }
      try {
        await handler(event);
      } catch (err) {
        markRuntimeFailure(record, "hook", err);
      }
    };

    const hookEntry: HookEntry = entry
      ? {
          ...entry,
          hook: {
            ...entry.hook,
            name,
            description,
            source: "opensoul-plugin",
            pluginId: record.id,
          },
          metadata: {
            ...entry.metadata,
            events: normalizedEvents,
          },
        }
      : {
          hook: {
            name,
            description,
            source: "opensoul-plugin",
            pluginId: record.id,
            filePath: record.source,
            baseDir: path.dirname(record.source),
            handlerPath: record.source,
          },
          frontmatter: {},
          metadata: { events: normalizedEvents },
          invocation: { enabled: true },
        };

    record.hookNames.push(name);
    registry.hooks.push({
      pluginId: record.id,
      entry: hookEntry,
      events: normalizedEvents,
      source: record.source,
    });

    const hookSystemEnabled = config?.hooks?.internal?.enabled === true;
    if (!hookSystemEnabled || opts?.register === false) {
      return;
    }

    for (const event of normalizedEvents) {
      registerInternalHook(event, safeHandler);
    }
  };

  const registerGatewayMethod = (
    record: PluginRecord,
    method: string,
    handler: GatewayRequestHandler,
  ) => {
    const trimmed = method.trim();
    if (!trimmed) {
      return;
    }
    if (coreGatewayMethods.has(trimmed) || registry.gatewayHandlers[trimmed]) {
      pushDiagnostic({
        level: "error",
        pluginId: record.id,
        source: record.source,
        message: `gateway method already registered: ${trimmed}`,
      });
      return;
    }
    registry.gatewayHandlers[trimmed] = async (opts) => {
      if (!record.enabled) {
        throw new Error(`plugin disabled: ${record.id}`);
      }
      try {
        await handler(opts);
      } catch (err) {
        markRuntimeFailure(record, `gateway:${trimmed}`, err);
        throw err;
      }
    };
    record.gatewayMethods.push(trimmed);
  };

  const registerHttpHandler = (record: PluginRecord, handler: OpenSoulPluginHttpHandler) => {
    record.httpHandlers += 1;
    registry.httpHandlers.push({
      pluginId: record.id,
      handler: async (req, res) => {
        if (!record.enabled) {
          return false;
        }
        try {
          return await handler(req, res);
        } catch (err) {
          markRuntimeFailure(record, "http-handler", err);
          return false;
        }
      },
      source: record.source,
    });
  };

  const registerHttpRoute = (
    record: PluginRecord,
    params: { path: string; handler: OpenSoulPluginHttpRouteHandler },
  ) => {
    const normalizedPath = normalizePluginHttpPath(params.path);
    if (!normalizedPath) {
      pushDiagnostic({
        level: "warn",
        pluginId: record.id,
        source: record.source,
        message: "http route registration missing path",
      });
      return;
    }
    if (registry.httpRoutes.some((entry) => entry.path === normalizedPath)) {
      pushDiagnostic({
        level: "error",
        pluginId: record.id,
        source: record.source,
        message: `http route already registered: ${normalizedPath}`,
      });
      return;
    }
    record.httpHandlers += 1;
    registry.httpRoutes.push({
      pluginId: record.id,
      path: normalizedPath,
      handler: async (req, res) => {
        if (!record.enabled) {
          if (!res.headersSent) {
            res.statusCode = 503;
            res.end("plugin disabled");
          }
          return;
        }
        try {
          await params.handler(req, res);
        } catch (err) {
          markRuntimeFailure(record, "http-route", err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.end("plugin route error");
          }
        }
      },
      source: record.source,
    });
  };

  const registerChannel = (
    record: PluginRecord,
    registration: OpenSoulPluginChannelRegistration | ChannelPlugin,
  ) => {
    const normalized =
      typeof (registration as OpenSoulPluginChannelRegistration).plugin === "object"
        ? (registration as OpenSoulPluginChannelRegistration)
        : { plugin: registration as ChannelPlugin };
    const plugin = normalized.plugin;
    const id = typeof plugin?.id === "string" ? plugin.id.trim() : String(plugin?.id ?? "").trim();
    if (!id) {
      pushDiagnostic({
        level: "error",
        pluginId: record.id,
        source: record.source,
        message: "channel registration missing id",
      });
      return;
    }
    record.channelIds.push(id);
    registry.channels.push({
      pluginId: record.id,
      plugin,
      dock: normalized.dock,
      source: record.source,
    });
  };

  const registerProvider = (record: PluginRecord, provider: ProviderPlugin) => {
    const id = typeof provider?.id === "string" ? provider.id.trim() : "";
    if (!id) {
      pushDiagnostic({
        level: "error",
        pluginId: record.id,
        source: record.source,
        message: "provider registration missing id",
      });
      return;
    }
    const existing = registry.providers.find((entry) => entry.provider.id === id);
    if (existing) {
      pushDiagnostic({
        level: "error",
        pluginId: record.id,
        source: record.source,
        message: `provider already registered: ${id} (${existing.pluginId})`,
      });
      return;
    }
    record.providerIds.push(id);
    registry.providers.push({
      pluginId: record.id,
      provider,
      source: record.source,
    });
  };

  const registerCli = (
    record: PluginRecord,
    registrar: OpenSoulPluginCliRegistrar,
    opts?: { commands?: string[] },
  ) => {
    const commands = (opts?.commands ?? []).map((cmd) => cmd.trim()).filter(Boolean);
    record.cliCommands.push(...commands);
    registry.cliRegistrars.push({
      pluginId: record.id,
      register: registrar,
      commands,
      source: record.source,
    });
  };

  const registerService = (record: PluginRecord, service: OpenSoulPluginService) => {
    const id = service.id.trim();
    if (!id) {
      return;
    }
    record.services.push(id);
    registry.services.push({
      pluginId: record.id,
      service,
      source: record.source,
    });
  };

  const registerCommand = (record: PluginRecord, command: OpenSoulPluginCommandDefinition) => {
    const name = command.name.trim();
    if (!name) {
      pushDiagnostic({
        level: "error",
        pluginId: record.id,
        source: record.source,
        message: "command registration missing name",
      });
      return;
    }

    // Register with the plugin command system (validates name and checks for duplicates)
    const result = registerPluginCommand(record.id, command);
    if (!result.ok) {
      pushDiagnostic({
        level: "error",
        pluginId: record.id,
        source: record.source,
        message: `command registration failed: ${result.error}`,
      });
      return;
    }

    record.commands.push(name);
    registry.commands.push({
      pluginId: record.id,
      command,
      source: record.source,
    });
  };

  const registerTypedHook = <K extends PluginHookName>(
    record: PluginRecord,
    hookName: K,
    handler: PluginHookHandlerMap[K],
    opts?: { priority?: number },
  ) => {
    record.hookCount += 1;
    registry.typedHooks.push({
      pluginId: record.id,
      hookName,
      handler: (async (...args: Parameters<PluginHookHandlerMap[K]>) => {
        if (!record.enabled) {
          return;
        }
        try {
          await (handler as (...hookArgs: Parameters<PluginHookHandlerMap[K]>) => unknown).apply(
            undefined,
            args,
          );
        } catch (err) {
          markRuntimeFailure(record, `typed-hook:${String(hookName)}`, err);
        }
      }) as PluginHookHandlerMap[K],
      priority: opts?.priority,
      source: record.source,
    } as TypedPluginHookRegistration);
  };

  const normalizeLogger = (logger: PluginLogger): PluginLogger => ({
    info: logger.info,
    warn: logger.warn,
    error: logger.error,
    debug: logger.debug,
  });

  const createApi = (
    record: PluginRecord,
    params: {
      config: OpenSoulPluginApi["config"];
      pluginConfig?: Record<string, unknown>;
    },
  ): OpenSoulPluginApi => {
    return {
      id: record.id,
      name: record.name,
      version: record.version,
      description: record.description,
      source: record.source,
      config: params.config,
      pluginConfig: params.pluginConfig,
      runtime: registryParams.runtime,
      logger: normalizeLogger(registryParams.logger),
      registerTool: (tool, opts) => registerTool(record, tool, opts),
      registerHook: (events, handler, opts) =>
        registerHook(record, events, handler, opts, params.config),
      registerHttpHandler: (handler) => registerHttpHandler(record, handler),
      registerHttpRoute: (params) => registerHttpRoute(record, params),
      registerChannel: (registration) => registerChannel(record, registration),
      registerProvider: (provider) => registerProvider(record, provider),
      registerGatewayMethod: (method, handler) => registerGatewayMethod(record, method, handler),
      registerCli: (registrar, opts) => registerCli(record, registrar, opts),
      registerService: (service) => registerService(record, service),
      registerCommand: (command) => registerCommand(record, command),
      resolvePath: (input: string) => resolveUserPath(input),
      on: (hookName, handler, opts) => registerTypedHook(record, hookName, handler, opts),
    };
  };

  return {
    registry,
    createApi,
    pushDiagnostic,
    registerTool,
    registerChannel,
    registerProvider,
    registerGatewayMethod,
    registerCli,
    registerService,
    registerCommand,
    registerHook,
    registerTypedHook,
  };
}
