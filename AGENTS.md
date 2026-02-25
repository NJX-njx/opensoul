# Repository Guidelines

- Repo: https://github.com/NJX-njx/opensoul

## Project Structure

- Source code: `src/`
- Tests: colocated `*.test.ts`
- Docs: `docs/`
- Plugins/extensions: `extensions/*`
- Apps: `apps/` (Android, iOS, macOS)

## Build & Development

- Runtime: Node **22+**
- Install deps: `pnpm install`
- Build: `pnpm build`
- Lint/format: `pnpm check`
- Tests: `pnpm test`
- Dev mode: `pnpm dev`

## Coding Style

- Language: TypeScript (ESM)
- Formatting/linting: Oxlint + Oxfmt
- Run `pnpm check` before commits

## Cursor Cloud specific instructions

### Services

| Service | Command | Port | Notes |
|---|---|---|---|
| Gateway (core) | `OPENSOUL_SKIP_CHANNELS=1 OPENSOUL_GATEWAY_TOKEN=dev-token pnpm gateway:dev` | 19001 | Serves HTTP + WS + Web Control UI |

### Gotchas

- **Gateway requires a token**: set `OPENSOUL_GATEWAY_TOKEN` env var or pass `--token`. Without it the process exits immediately with an auth error.
- **`OPENSOUL_SKIP_CHANNELS=1`**: use this when running the gateway locally to avoid loading channel extensions that require external API credentials.
- **Build before gateway:dev on first run**: `pnpm gateway:dev` (via `scripts/run-node.mjs`) auto-rebuilds if `dist/` is stale, but the first UI build is triggered automatically.  Set `OPENSOUL_A2UI_SKIP_MISSING=1` when building if A2UI canvas sources are absent (they usually are).
- **`.npmrc` GITHUB_TOKEN warning**: harmless; the token is only needed for publishing to GitHub Packages. Can be ignored during local dev.
- **Tests (`pnpm test`)**: runs 3 vitest configs in parallel/serial via `scripts/test-parallel.mjs` (unit, extensions, gateway). Total ~850 test files, ~5 400 tests. Takes ~8 min in a Cloud VM. The `canvas:a2ui:bundle` step is a prerequisite for tests (CI runs it inline).
- **Pre-existing lint/format issues**: `pnpm lint` (oxlint) reports ~13 errors in `ui/` and `pnpm format` (oxfmt) reports ~50 format issues — all pre-existing in the repo.
- **No external DB**: uses embedded SQLite (`sqlite-vec`); no Postgres/Redis setup needed.
