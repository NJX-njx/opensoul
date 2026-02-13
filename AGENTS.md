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
