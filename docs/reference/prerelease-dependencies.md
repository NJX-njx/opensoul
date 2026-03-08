# Pre-release Dependency Tracking

OpenSoul currently uses a small set of pre-release dependency versions intentionally.

## Policy

- Pre-release versions must be explicitly tracked.
- Any new pre-release package must be added to `scripts/check-prerelease-deps.mjs` with rationale.
- CI/local checks should run `pnpm check:deps:prerelease` to prevent untracked additions.

## Current tracked packages

| Package | Current version channel | Rationale |
| --- | --- | --- |
| `@buape/carbon` | beta | Upstream currently ships required fixes/features in beta channel. |
| `@lydell/node-pty` | beta | Current Windows PTY behavior depends on beta line in this codebase. |
| `@whiskeysockets/baileys` | rc | WhatsApp ecosystem package is currently consumed on RC line. |
| `sqlite-vec` | alpha | Existing vector features in use are provided in alpha release. |
| `@typescript/native-preview` | dev | Used by tsgo workflow in current toolchain. |
| `rolldown` | rc | Bundler in current build pipeline is still on RC channel. |

## Review cadence

- Review all entries at least monthly and during dependency update PRs.
- When stable versions become available and compatible, migrate and remove from this table.
