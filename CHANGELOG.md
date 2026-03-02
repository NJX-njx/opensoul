# Changelog

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
