# OpenSoul Roadmap

This document outlines the direction and priorities for OpenSoul development.
It is updated after each tagged release — see [CHANGELOG.md](CHANGELOG.md) for the full history.

## Current Focus (v0.2.5)

- **Group chat enhancements** — Richer multi-party conversation support and routing
- **Skill improvements** — Enhance existing skills and add new integrations
- **Memory optimization** — Better vector search performance and context management
- **Mobile app refinement** — iOS and Android UX improvements and Canvas support

## Shipped in v0.2.4

- [x] **Session transcript loading** — Review and manage past conversation history from the Control UI
- [x] **Create Soulmate modal** — Streamlined agent creation workflow in the Control UI
- [x] **Gateway reconnect** — Auto-reconnect after WebSocket interruptions
- [x] **Onboarding improvements** — Better MiniMax support, improved empty-response error visibility, and localized config forms
- [x] **Developer experience** — Enhanced CLI dev defaults, GitHub workflow validation scripts, and repo cleanup

## Shipped in v0.2.3

- [x] **Windows desktop client** — Native installer with proxy detection
- [x] **System proxy detection** — Fixes Gemini API access behind corporate proxies
- [x] **Performance optimizations** — Queue and concurrency configuration improvements
- [x] **Security hardening** — Across gateway and channel interactions

## Previously Shipped (v0.2.x)

- [x] **30+ channels** — WhatsApp, Telegram, Discord, Slack, iMessage, Signal, Matrix, Teams, Feishu, LINE, Zalo, and more
- [x] **Web Control UI polish** — Agent workspace management, zoom cleanup
- [x] **Onboarding i18n** — Broader localization across onboarding and control pages
- [x] **50+ built-in skills** — GitHub, Notion, Obsidian, Canvas, browser automation, and more
- [x] **Plugin SDK** — Public SDK for custom channels, tools, hooks, and providers

## Planned Features

### Medium-term (v0.3.x)

- [ ] **Plugin marketplace** — Discover and install community extensions from a central registry
- [ ] **Advanced memory / RAG** — Improved retrieval-augmented generation and long-term context
- [ ] **Multi-user support** — Shared instances for teams with role-based access
- [ ] **Voice enhancements** — Better TTS/STT pipelines, voice cloning options

### Long-term

- [ ] **Federated mode** — Connect multiple OpenSoul instances across networks
- [ ] **Custom agent personalities** — User-defined personas, behaviors, and training
- [ ] **Enterprise features** — SSO, audit logs, compliance tooling, and deployment management

## Roadmap Maintenance

After each tagged release, maintainers should:

1. Move shipped items from "Current Focus" to the appropriate "Shipped in vX.Y.Z" section.
2. Update "Current Focus" with the priorities for the next release.
3. Archive or remove stale bullets that are no longer relevant.

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to get involved.

## How to Contribute

**Looking for a place to start?** Check out [Good First Issues](https://github.com/NJX-njx/opensoul/labels/good%20first%20issue).

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to get involved. We welcome contributions in all areas — code, docs, design, and community support.
