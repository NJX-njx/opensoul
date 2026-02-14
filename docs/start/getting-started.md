---
summary: "Get OpenSoul installed and run your first chat in minutes."
read_when:
  - First time setup from zero
  - You want the fastest path to a working chat
title: "Getting Started"
---

# Getting Started

Goal: go from zero to a first working chat with minimal setup.

<Info>
Fastest chat: open the Control UI (no channel setup needed). Run `opensoul dashboard`
and chat in the browser, or open `http://127.0.0.1:18789/` on the
<Tooltip headline="Gateway host" tip="The machine running the OpenSoul gateway service.">gateway host</Tooltip>.
Docs: [Dashboard](/web/dashboard) and [Control UI](/web/control-ui).
</Info>

Recommended path: use the **CLI onboarding wizard** (`opensoul onboard`). It configures:

- Model/Auth (OAuth recommended)
- Gateway settings
- Channels (WhatsApp, Telegram, Discord, etc.)
- Pairing defaults (secure DMs)
- Workspace bootstrapping + Skills
- Optional background services

For deeper reference, see: [Wizard](/start/wizard), [Setup](/start/setup), [Pairing](/channels/pairing), [Security](/gateway/security).

### Sandbox Note
`agents.defaults.sandbox.mode: "non-main"` uses `session.mainKey` (default `"main"`), so group/channel sessions are sandboxed. If you want a main agent to always run on the host, set an explicit per-agent override:

```json
{
  "routing": {
    "agents": {
      "main": {
        "workspace": "~/.opensoul/workspace",
        "sandbox": { "mode": "off" }
      }
    }
  }
}
```

## 0) Prereqs

- Node `>=22`
- `pnpm` (optional; recommended if building from source)
- **Recommended:** Brave Search API key for web search. Easiest path: `opensoul configure --section web` (stores `tools.web.search.apiKey`). See [Web tools](/tools/web).

**macOS:** If you plan to build the app, install Xcode / CLT. For CLI + Gateway only, Node is enough.
**Windows:** Use **WSL2** (Ubuntu recommended). Native Windows is untested and has more tool compatibility issues. See [Windows (WSL2)](/platforms/windows).

## 1) Install OpenSoul (CLI)

<Tabs>
  <Tab title="macOS/Linux">
    ```bash
    curl -fsSL https://opensoul.ai/install.sh | bash
    ```
  </Tab>
  <Tab title="Windows (PowerShell)">
    ```powershell
    iwr -useb https://opensoul.ai/install.ps1 | iex
    ```
  </Tab>
</Tabs>

<Note>
Other install methods and requirements: [Install](/install).
</Note>

## 2) Run the onboarding wizard

```bash
opensoul onboard --install-daemon
```

You will choose:
- **Local vs Remote** Gateway.
- **Auth**: Anthropic API key (recommended) or OAuth.
- **Providers**: WhatsApp QR login, Telegram/Discord bot tokens, etc.
- **Daemon**: Background installation (launchd/systemd).
- **Gateway Token**: Generated and stored in `gateway.auth.token`.

See [Onboarding Wizard](/start/wizard) for details.

## 3) Check the Gateway

If you installed the service, it should already be running:

```bash
opensoul gateway status
```

Manual run (foreground):
```bash
opensoul gateway --port 18789 --verbose
```

## 4) Pair + Connect your first chat

### WhatsApp (QR login)
```bash
opensoul channels login
```
Scan via WhatsApp -> Settings -> Linked Devices. See [WhatsApp](/channels/whatsapp).

### Telegram / Discord / Others
The wizard can write tokens/config for you. If you prefer manual setup:
- [Telegram](/channels/telegram)
- [Discord](/channels/discord)

**Telegram DM Tip:** Your first DM returns a pairing code. Approve it in the next step, or the bot won't respond.

## 5) DM Safety (Pairing Approval)

Default stance: unknown DMs get a shortcode and messages aren't processed until approved.

```bash
opensoul pairing list whatsapp
opensoul pairing approve whatsapp <code>
```
See [Pairing](/channels/pairing).

## From source (Dev)

If you are developing OpenSoul itself:

```bash
git clone https://github.com/opensoul/opensoul.git
cd opensoul
pnpm install
pnpm ui:build # auto-installs UI deps on first run
pnpm build
opensoul onboard --install-daemon
```

## 7) Verify end-to-end

In a new terminal, send a test message:

```bash
opensoul message send --target +15555550123 --message "Hello from OpenSoul"
```

If `opensoul health` shows "Auth not configured", go back to the wizard—agents won't respond without it.

## Next steps

- DM safety and approvals: [Pairing](/channels/pairing)
- Connect more channels: [Channels](/channels)
- Advanced workflows and from source: [Setup](/start/setup)
- Mobile nodes (iOS/Android): [Nodes](/nodes)
- Remote access: [Remote Access](/gateway/remote)
