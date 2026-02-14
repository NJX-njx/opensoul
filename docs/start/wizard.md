---
summary: "CLI onboarding wizard: guided setup for gateway, workspace, channels, and skills"
read_when:
  - Running or configuring the onboarding wizard
  - Setting up a new machine
title: "Onboarding Wizard (CLI)"
sidebarTitle: "Onboarding: CLI"
---

# Onboarding Wizard (CLI)

The onboarding wizard is the **recommended** way to set up OpenSoul on macOS,
Linux, or Windows (via WSL2; strongly recommended).
It configures a local Gateway or a remote Gateway connection, plus channels, skills,
and workspace defaults in one guided flow.

```bash
opensoul onboard
```

<Info>
Fastest first chat: open the Control UI (no channel setup needed). Run
`opensoul dashboard` and chat in the browser. Docs: [Dashboard](/web/dashboard).
</Info>

To reconfigure later:

```bash
opensoul configure
opensoul agents add <name>
```

<Note>
`--json` does not imply non-interactive mode. For scripts, use `--non-interactive`.
</Note>

<Tip>
Recommended: set up a Brave Search API key so the agent can use `web_search`
(`web_fetch` works without a key). Easiest path: `opensoul configure --section web`
which stores `tools.web.search.apiKey`. Docs: [Web tools](/tools/web).
</Tip>

## QuickStart vs Advanced

The wizard starts with **QuickStart** (defaults) vs **Advanced** (full control).

<Tabs>
  <Tab title="QuickStart (defaults)">
    - Local gateway (loopback)
    - Workspace default (or existing workspace)
    - Gateway port **18789**
    - Gateway auth **Token** (auto‑generated, even on loopback)
    - Tailscale exposure **Off**
    - Telegram + WhatsApp DMs default to **allowlist** (you'll be prompted for your phone number)
  </Tab>
  <Tab title="Advanced (full control)">
    - Exposes every step (mode, workspace, gateway, channels, daemon, skills).
  </Tab>
</Tabs>

## What the wizard configures

**Local mode (default)** walks you through these steps:

### 1. Model/Auth
- **Anthropic API key (recommended)**: Uses `ANTHROPIC_API_KEY` or prompts for one, then saves it for the daemon.
- **Anthropic OAuth (Claude Code)**: Reuses credentials from Claude Code CLI when available.
- **OpenAI / Codex**: OAuth or API key support.
- **Other Providers**: Support for Gemini, Z.AI, Vercel AI Gateway, MiniMax, Moonshot (Kimi), and more.
- **Auth Profiles**: Credentials are stored in `~/.opensoul/agents/<agentId>/agent/auth-profiles.json`.

### 2. Workspace
- Default location: `~/.opensoul/workspace`.
- Seeds bootstrap files for agent initialization.
- See [Agent Workspace](/concepts/agent-workspace) for layout details.

### 3. Gateway
- Configures port (default 18789), bind address, and auth mode.
- **Security Tip**: Keep **Token** auth enabled even on loopback for security.
- Optional Tailscale exposure for remote access.

### 4. Channels
- Setup for [WhatsApp](/channels/whatsapp), [Telegram](/channels/telegram), [Discord](/channels/discord), [Google Chat](/channels/googlechat), [Mattermost](/channels/mattermost), [Signal](/channels/signal), and [iMessage](/channels/imessage).
- Configures pairing flow for secure DMs.

### 5. Daemon Installation
- **macOS**: LaunchAgent (requires user session).
- **Linux / WSL2**: systemd user unit.
- **Lingering**: Tries to enable `loginctl enable-linger` so the gateway stays up after logout.
- **Node vs Bun**: **Node** is recommended for WhatsApp/Telegram stability.

### 6. Skills
- Installs recommended skills and checks dependencies.
- Configuration for Node manager (`npm` or `pnpm`).

## Advanced Management

### Add another agent
```bash
opensoul agents add <name>
```
Creates isolated workspaces and auth profiles for multi-agent setups.

### Non-interactive Mode
Automate setup for CI or headless environments:

```bash
opensoul onboard --non-interactive \
  --mode local \
  --auth-choice apiKey \
  --anthropic-api-key "$ANTHROPIC_API_KEY" \
  --gateway-port 18789 \
  --install-daemon \
  --daemon-runtime node
```

### Wizard RPC
The gateway exposes the wizard flow via RPC (`wizard.start`, `wizard.next`, etc.), allowing UI clients (macOS app, Control UI) to render the setup flow.

## Related docs

- CLI command reference: [`opensoul onboard`](/cli/onboard)
- macOS app onboarding: [Onboarding](/start/onboarding)
- Agent first-run ritual: [Agent Bootstrapping](/start/bootstrapping)
- Configuration reference: [Gateway Configuration](/gateway/configuration)
