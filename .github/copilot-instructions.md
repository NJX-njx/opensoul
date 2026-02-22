# OpenSoul — AI Agent Instructions

## Architecture Overview

OpenSoul is a self-hosted AI agent that connects to 30+ messaging channels. It's a **pnpm monorepo** (root + `ui/` + `packages/*` + `extensions/*`) built on a plugin-centric architecture.

**Bootstrap chain**: `opensoul.mjs` → `src/entry.ts` (process setup, respawn for Node flags) → `src/cli/program.ts` (Commander CLI) → `src/gateway/server.impl.ts` (main server).

**Core subsystems** and their locations:
- **Plugin system** (`src/plugins/`): Discovery, loading (via jiti), registration, runtime. Central to everything — channels, tools, hooks, providers are all plugins.
- **Channels** (`src/channels/`, `extensions/*/`): Messaging platform adapters (Telegram, WhatsApp, Discord, etc.). Each implements `ChannelPlugin` interface with optional adapters (config, pairing, outbound, groups, etc.).
- **Gateway** (`src/gateway/`): HTTP/WebSocket server exposing JSON-RPC methods. Starts sidecars (channels, hooks, cron, browser control).
- **Routing** (`src/routing/`): Maps inbound messages → agent + session. Priority: peer binding → guild/team → account → channel → default. Session keys follow `agent:<id>:<scope>` format.
- **Config** (`src/config/`): JSON5 config with Zod validation, env var substitution (`${VAR}`), file includes, legacy migration. Types split across `types.*.ts`, schemas in `zod-schema.*.ts`.
- **Hooks** (`src/hooks/`): Pub/sub event system. Internal hooks from `hooks/` workspace dirs (with `HOOK.md` frontmatter), plus typed plugin hooks (`before_agent_start`, `message_received`, etc.).
- **Infra** (`src/infra/`): 130+ utility files — networking, retry policies, filesystem safety, diagnostics, SSRF protection, port management.
- **UI** (`ui/`): Lit Web Components + Vite control dashboard. Not React — uses `lit`, reactive controllers, and Web Component patterns.

**Data flow**: Channel inbound → `resolveAgentRoute()` → agent session (pi-embedded runner) → tool calls → outbound adapter → channel reply. Hooks fire throughout.

## Tech Stack & Commands

| What | Tool |
|------|------|
| Runtime | Node 22+ |
| Language | TypeScript (ESM, strict) |
| Package manager | pnpm (`pnpm install`) |
| Build | `pnpm build` (tsdown → `dist/`) |
| Dev mode | `pnpm dev` |
| Lint + format | `pnpm check` (runs `pnpm tsgo && pnpm lint && pnpm format`) |
| Type-check only | `pnpm tsgo` |
| Lint only | `oxlint --type-aware` |
| Format only | `oxfmt --check` (fix: `oxfmt --write`) |
| Tests | `pnpm test` (parallel via `scripts/test-parallel.mjs`) |
| Gateway dev | `pnpm gateway:dev` |
| UI dev | `pnpm ui:dev` |

Always run `pnpm check` before commits. The pre-commit hook auto-runs Oxlint + Oxfmt on staged files.

## Critical Coding Conventions

### Anti-Redundancy (Most Important Rule)
- **Never duplicate** existing utilities. Search before creating any helper, formatter, or utility.
- **No barrel/re-export files.** Import directly from the source module.
- Time formatting: `src/infra/format-time`. Terminal output: `src/terminal/table.ts`, `src/terminal/theme.ts`. Progress: `src/cli/progress.ts`.

### Imports
- Always use **`.js` extension** in relative imports (ESM requirement): `import { foo } from "./bar.js"`
- Use **`import type { X }`** for type-only imports
- Node built-ins use `node:` prefix: `import path from "node:path"`
- Extensions import from `"opensoul/plugin-sdk"`, never from `src/` internals

### TypeScript
- Strict typing — avoid `any`
- File LOC hard limit: **500 lines** (enforced by `pnpm check:loc`). Extract helpers when approaching this.
- Zod schemas: `PascalCaseSchema` naming, always end objects with `.strict()`
- Config types split by domain: `src/config/types.*.ts`

### Error Handling
- Custom `Error` subclasses named `<Domain>Error` (e.g., `GatewayLockError`, `MediaFetchError`)
- Error utilities in `src/infra/errors.ts`: `formatErrorMessage()`, `extractErrorCode()`
- No Result/Either types — use try/catch with typed errors

### Logging
- Create module-level logger: `const log = createSubsystemLogger("domain/sub")` from `src/logging/subsystem.ts`
- Hierarchical names with `/`: `"gateway/channels/telegram"`, `"agent/embedded"`, `"plugins"`
- Use `.child("name")` for sub-loggers

### DI Pattern
- `createDefaultDeps()` in `src/cli/deps.ts` assembles `CliDeps` (factory-pattern DI)
- `PluginRuntime` (`src/plugins/runtime/`) acts as service locator for extensions
- Global plugin registry via `setActivePluginRegistry()` / `requireActivePluginRegistry()`

## Extension Development

Extensions live in `extensions/<name>/` with this structure:
```
extensions/<name>/
├── package.json            # "opensoul": { "extensions": ["./index.ts"] }
├── opensoul.plugin.json    # { "id", "channels"?, "kind"?, "configSchema"? }
├── index.ts                # export default { id, name, register(api) }
└── src/                    # implementation
```

Entry file pattern:
```typescript
import type { OpenSoulPluginApi } from "opensoul/plugin-sdk";
export default {
  id: "my-plugin",
  name: "My Plugin",
  description: "...",
  configSchema: { type: "object", properties: {} },
  register(api: OpenSoulPluginApi) {
    api.registerChannel({ plugin: myChannelPlugin });
    // api.registerTool(), api.registerHook(), api.on(), etc.
  },
};
```

Plugin API surface: `registerTool()`, `registerHook()`, `registerChannel()`, `registerGatewayMethod()`, `registerHttpHandler()`, `registerCli()`, `registerService()`, `registerProvider()`, `registerCommand()`, `on()`.

## Testing Patterns

- **Framework**: Vitest with V8 coverage (≥70% lines/functions/statements, ≥55% branches)
- **Colocated**: `*.test.ts` next to source files. E2E: `*.e2e.test.ts`. Live: `*.live.test.ts`
- **Test configs**: `vitest.config.ts` (default), plus `vitest.e2e.config.ts`, `vitest.gateway.config.ts`, `vitest.extensions.config.ts`, `vitest.live.config.ts`
- **Helpers**: `src/test-helpers/workspace.ts` (`makeTempWorkspace()`), `src/test-utils/ports.ts` (`allocateTestPortBlock()`), `src/test-utils/channel-plugins.ts` (`createTestRegistry()`)
- **Patterns**: Prefer constructing real config objects over mocking. Use temp dirs for filesystem tests. Gateway tests use `test-helpers.server.ts` with isolated HOME dirs and WebSocket connections.
- **Global setup** (`test/setup.ts`): Isolated temp home, stub channel outbound adapters, stub plugin registry

## Key Files to Know

| Purpose | Path |
|---------|------|
| CLI entry/program | `src/entry.ts`, `src/cli/program.ts` |
| Gateway server | `src/gateway/server.impl.ts` |
| Plugin loader | `src/plugins/loader.ts` |
| Plugin API types | `src/plugins/types.ts` |
| Plugin SDK (public) | `src/plugin-sdk/index.ts` |
| Channel interface | `src/channels/plugins/types.plugin.ts` |
| Agent routing | `src/routing/resolve-route.ts` |
| Config schema | `src/config/zod-schema.ts` |
| Config I/O | `src/config/io.ts` |
| Hook system | `src/hooks/internal-hooks.ts` |
| DI factory | `src/cli/deps.ts` |
| Test global setup | `test/setup.ts` |
