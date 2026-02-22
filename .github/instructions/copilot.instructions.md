# OpenSoul — VS Code Copilot Chat Instructions

> Full AI agent instructions: see `.github/copilot-instructions.md`
> This file supplements those instructions with VS Code-specific guidance.

## Key Reminders

- **Always reuse existing code — no redundancy!** Search before creating any utility.
- **No barrel/re-export files.** Import directly from the source module.
- Use `.js` extension in relative imports (ESM requirement).
- Use `import type { X }` for type-only imports.
- File LOC hard limit: **500 lines** (enforced by `pnpm check:loc`).

## CLI Framework

- Commander + clack/prompts
- CLI option wiring: `src/cli/`
- Commands: `src/commands/`
- Dependency injection via `createDefaultDeps` in `src/cli/deps.ts`

## Interactive Coding

If you are coding together with a human, do NOT use `scripts/committer` — use git directly and run the quality commands manually:

- `pnpm check` — lint + format
- `pnpm tsgo` — type-check
- `pnpm test` — run tests
- `pnpm build` — build
