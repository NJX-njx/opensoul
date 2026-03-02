# OpenSoul — AI Coding Agent Instructions

## Big Picture (read this first)

- OpenSoul is a plugin-centric, self-hosted AI gateway in a pnpm monorepo (`src/`, `ui/`, `extensions/*`, `packages/*`).
- Startup chain: `opensoul.mjs` → `src/entry.ts` → CLI program builder (`src/cli/program/build-program.ts`) → gateway runtime (`src/gateway/server.impl.ts`).
- Core data flow: channel inbound → route resolution (`src/routing/resolve-route.ts`) → agent/session run → tools/hooks/plugins → outbound adapter.
- Gateway orchestrates sidecars (channels, cron, hooks, discovery, browser control) from `src/gateway/server.impl.ts`.

## Architecture Boundaries

- Plugin loading/discovery/runtime lives in `src/plugins/` (see `loader.ts`, `runtime/`, `registry.ts`).
- Channels are adapters via `ChannelPlugin` contract (`src/channels/plugins/types.plugin.ts`) and extension packages under `extensions/*`.
- External extensions must use public SDK imports from `opensoul/plugin-sdk` (`src/plugin-sdk/index.ts`), not internal `src/*` imports.
- Config system is JSON5 + includes + `${ENV}` substitution + Zod/plugin validation (`src/config/io.ts`, `src/config/validation.ts`).

## Developer Workflows

- Install: `pnpm install`
- Build: `pnpm build`
- Dev: `pnpm dev`
- Gateway dev: `pnpm gateway:dev` (requires auth token at runtime)
- Quality gate: `pnpm check` (`tsgo` + `oxlint` + `oxfmt --check`)
- Tests: `pnpm test` (parallel runner via `scripts/test-parallel.mjs`)
- UI changes: run `pnpm ui:build`, then restart gateway to refresh served control UI assets.
- Windows gateway run (PowerShell): `$env:OPENSOUL_SKIP_CHANNELS="1"; $env:OPENSOUL_GATEWAY_TOKEN="dev-token"; node scripts/run-node.mjs --dev gateway`

## Project-Specific Conventions

- Avoid redundancy: search for existing helpers before adding new utilities.
- No barrel/re-export files for new code; import directly from source modules.
- TypeScript ESM: use `.js` in relative imports; Node built-ins use `node:` prefix.
- Use `import type` for type-only imports.
- Prefer typed errors (`<Domain>Error`) and shared error helpers in `src/infra/errors.ts`.
- Logging pattern: `createSubsystemLogger("domain/sub")` with `.child("...")` for subcomponents.

## Testing & Validation Patterns

- Tests are colocated (`*.test.ts`), with separate e2e/live flavors (`*.e2e.test.ts`, `*.live.test.ts`).
- Important Vitest configs: `vitest.config.ts`, `vitest.e2e.config.ts`, `vitest.gateway.config.ts`, `vitest.extensions.config.ts`, `vitest.live.config.ts`.
- Prefer real config objects + temp workspace helpers over heavy mocks (`src/test-helpers/`, `src/test-utils/`).

## High-Value Gotchas

- Gateway exits without token: use `OPENSOUL_GATEWAY_TOKEN` or `gateway.auth.token` (not deprecated `gateway.token`).
- Local gateway dev usually needs `OPENSOUL_SKIP_CHANNELS=1` to avoid external channel credential failures.
- `check:loc` currently runs with repo script limits (`--max 2000 --max-function 150` in `package.json`), not generic defaults.
