# Changelog

## Unreleased (2026-03-09)

### CLI & Packaging

- Switched npm publish target from GitHub Packages to public npmjs.com registry (`publishConfig`).
- Added friendly Node version preinstall check (`scripts/check-node-version.mjs`) — gives a clear upgrade message when Node < 22.12.0.
- Added `OPENSOUL_*` environment variables reference to `opensoul --help` output (12 vars with descriptions).
- Added `--deliver` deprecation warnings in `cron add` and `cron edit` — use `--announce` instead.
- Added lazy-loaded subcommand registration cache to avoid redundant dynamic imports.
- Added `isNonInteractiveEnv()` helper for consistent CI/automation environment detection.
- Replaced hard-coded gateway timeout values with `DEFAULT_GATEWAY_TIMEOUT_MS` constant.
- Unified gateway connection error formatting via shared `emitGatewayConnectionError()` helper.
- Replaced raw `process.exit()` calls with typed error throws for cleaner CLI shutdown.
- Added plugin shortname resolution (e.g. `telegram` → `@opensoul/telegram`).
- Added global `--flag-validation` guard for unknown flags in non-interactive environments.
- Repositioned global error handler to catch async command failures.

### Install & Distribution

- Re-enabled `install-smoke` CI workflow (push/PR triggers) now that the package targets public npm.
- Added platform-specific native dependency build prerequisites to install docs (macOS / Ubuntu / Fedora / Alpine / Windows).
- Updated install docs: removed GitHub Packages warning and `.npmrc` configuration steps.
- Trimmed `files` field in `package.json` to exclude `docs/` from the published tarball.
- Added `scripts/check-node-version.mjs` to the published `files` list.
- Added documentation links for device management and shell completion commands.

### Security & Reliability

- Hardened WebSocket runtime safety with connection caps, ping/pong keepalive, and unicast backpressure handling.
- Hardened transcript persistence with fsync-backed durable appends, race-safe header creation, and session write locks.
- Mitigated embedded runner CWD race conditions with process-level locking for `process.chdir()` critical sections.
- Added plugin runtime fault isolation and automatic disable after repeated plugin runtime failures.

### Repository Hygiene & Guardrails

- Removed committed secret-bearing Gemini test scripts.
- Stopped tracking committed Windows release bundle artifacts.
- Added pre-commit guards for obvious secret patterns and release bundle directories.
- Added pre-release dependency tracking policy doc and automated checker.

### UX & Docs

- Added README product screenshot preview.
- Added beginner deployment guide with OS-specific commands, verification checklist, and rollback path.
- Added Create Soulmate guide with create flow, constraints, post-create checklist, and failure recovery guidance.
- Improved Create Soulmate error messaging in Control UI with concrete remediation hints.
- Added English translation counterpart for docs translation workspace guidance (`docs/AGENTS.md`).

### Tests

- Added `src/gateway/sessions-resolve.test.ts` for gateway session-key resolution paths.
- Added Create Soulmate UI test coverage in `ui/src/ui/views/create-soulmate-modal.test.ts` and `ui/src/ui/views/create-soulmate-errors.test.ts`.
- Added plugin loader regression coverage for auto-disable-on-runtime-failure behavior.

## 0.2.4

### Highlights

- **Session workflow improvements**: added session transcript loading and enhanced session management, making conversation history more accessible and robust.
- **Create Soulmate modal**: new UI modal for creating soulmates and improved agent workspace management interactions in the Control UI.
- **Gateway reliability**: improved WebSocket reconnect behavior after connection interruptions; refined agent deletion logic with better test coverage.
- **Onboarding & configuration**: better MiniMax support, improved empty-response error visibility, type declaration fixes, and localized configuration form behavior.
- **CLI & developer experience**: enhanced dev agent configuration defaults; added GitHub workflow validation scripts; repository cleanup of obsolete config/log artifacts.

### Detailed Changes

#### Sessions & UI

- Implemented session transcript loading for reviewing past conversations.
- Enhanced session management flows with stronger lifecycle handling.
- Added "Create Soulmate" modal for streamlined agent creation.
- Refined agent workspace management in the Control UI.
- Removed obsolete zoom control UI and related settings for cleaner UX.

#### Gateway & Runtime

- Fixed WebSocket auto-reconnect after connection drops.
- Updated agent deletion logic with improved error handling and test coverage.
- General runtime stability improvements from maintenance commits.

#### Onboarding & Configuration

- Improved onboarding configuration handling and error feedback for empty replies.
- Enhanced MiniMax provider support in onboarding and config paths.
- Fixed type declaration/conversion issues in configuration forms.
- Localized configuration form behavior for better i18n coverage.

#### CLI, CI & Developer Experience

- Enhanced dev agent configuration defaults in CLI workflows.
- Added GitHub workflow validation script and updated PR workflow documentation.
- Updated dependencies via merged Dependabot updates (npm_and_yarn group).
- Cleaned up obsolete configuration and log files from repository.

### Merged Pull Requests

- #17: Bump the npm_and_yarn group across 2 directories with 2 updates
- #16: Development environment setup
- #15: Development environment setup

---

## 0.2.3

### Highlights

- Released Windows desktop client (v0.2.3) with native installer.
- Improved system proxy detection for Windows gateway (fixes Gemini API access behind corporate proxies).
- Performance optimizations for queue and concurrency configurations.
- Security hardening across gateway and channel interactions.

---

## 0.2.2

### Highlights

- Fixed Windows proxy injection for Node.js Gateway to access Gemini API.
- Bumped version for Windows proxy fix release.

---

## 0.2.1

### Highlights

- Added broader UI internationalization across onboarding and control pages.
- Improved Windows desktop behavior (resize handling, layout polish, and settings UX updates).
- Refined reconnect and connection health logic for more stable desktop-gateway interactions.
- Synced extension package versions with the core OpenSoul release.

---

## 0.1.0

### Initial Release

- Initial release based on the OpenSoul fork.
- Project renamed to OpenSoul.
- Core gateway, agent runtime, plugin system, and 30+ channel integrations.
