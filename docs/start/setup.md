---
summary: "Advanced setup and development workflows for OpenSoul"
read_when:
  - Setting up a new machine
  - You want “latest + greatest” without breaking your personal setup
title: "Setup"
---

# Setup

<Note>
If you are setting up for the first time, start with [Getting Started](/start/getting-started).
For wizard details, see [Onboarding Wizard](/start/wizard).
</Note>

Last updated: 2026-01-01

## TL;DR

- **Tailoring lives outside the repo:** `~/.opensoul/workspace` (workspace) + `~/.opensoul/opensoul.json` (config).
- **Stable workflow:** install the macOS app; let it run the bundled Gateway.
- **Bleeding edge workflow:** run the Gateway yourself via `pnpm gateway:watch`, then let the macOS app attach in Local mode.

## Prereqs (from source)

- Node `>=22`
- `pnpm`
- Docker (optional; only for containerized setup/e2e — see [Docker](/install/docker))

## Tailoring strategy (so updates don’t hurt)

If you want “100% tailored to me” _and_ easy updates, keep your customization in:

- **Config:** `~/.opensoul/opensoul.json` (JSON/JSON5-ish)
- **Workspace:** `~/.opensoul/workspace` (skills, prompts, memories; make it a private git repo)

Bootstrap once:

```bash
opensoul setup
```

From inside this repo, use the local CLI entry:

```bash
opensoul setup
```

If you don’t have a global install yet, run it via `pnpm opensoul setup`.

## Run the Gateway from this repo

After `pnpm build`, you can run the packaged CLI directly:

```bash
node opensoul.mjs gateway --port 18789 --verbose
```

## Continuity rollout and rollback

Task continuity can now be rolled out or degraded by config instead of forcing an all-or-nothing rollback.
The fastest rollback path is `gateway.controlUi.continuity.features` in `~/.opensoul/opensoul.json`:

```json5
{
  gateway: {
    controlUi: {
      continuity: {
        features: {
          reads: true,
          writes: true,
          handoff: true,
          uiActions: true,
        },
      },
    },
  },
}
```

Use the flags like this:

- `reads: false` hides continuity timelines/workbench data by degrading `tasks.*` reads to empty results.
- `writes: false` rejects task / commitment mutations while leaving the rest of the Gateway up.
- `handoff: false` stops automatic Control UI / Canvas handoff without disabling other continuity data.
- `uiActions: false` keeps continuity visible in Control UI but removes action buttons, useful for read-only incident mode.

Recommended rollback order during incidents:

1. Turn off `handoff` if richer-surface routing is noisy.
2. Turn off `uiActions` if operators should inspect continuity without mutating it.
3. Turn off `writes` if continuity state itself looks suspect.
4. Turn off `reads` only if continuity queries are the problem and you need the UI fully quiet.

## Stable workflow (macOS app first)

1. Install + launch **OpenSoul.app** (menu bar).
2. Complete the onboarding/permissions checklist (TCC prompts).
3. Ensure Gateway is **Local** and running (the app manages it).
4. Link surfaces (example: WhatsApp):

```bash
opensoul channels login
```

5. Sanity check:

```bash
opensoul health
```

If onboarding is not available in your build:

- Run `opensoul setup`, then `opensoul channels login`, then start the Gateway manually (`opensoul gateway`).

## Bleeding edge workflow (Gateway in a terminal)

Goal: work on the TypeScript Gateway, get hot reload, keep the macOS app UI attached.

### 0) (Optional) Run the macOS app from source too

If you also want the macOS app on the bleeding edge:

```bash
./scripts/restart-mac.sh
```

### 1) Start the dev Gateway

```bash
pnpm install
pnpm gateway:watch
```

`gateway:watch` runs the gateway in watch mode and reloads on TypeScript changes.

### 2) Point the macOS app at your running Gateway

In **OpenSoul.app**:

- Connection Mode: **Local**
  The app will attach to the running gateway on the configured port.

### 3) Verify

- In-app Gateway status should read **“Using existing gateway …”**
- Or via CLI:

```bash
opensoul health
```

### Common footguns

- **Wrong port:** Gateway WS defaults to `ws://127.0.0.1:18789`; keep app + CLI on the same port.
- **Where state lives:**
  - Credentials: `~/.opensoul/credentials/`
  - Sessions: `~/.opensoul/agents/<agentId>/sessions/`
  - Logs: `/tmp/opensoul/`

## Credential storage map

Use this when debugging auth or deciding what to back up:

- **WhatsApp**: `~/.opensoul/credentials/whatsapp/<accountId>/creds.json`
- **Telegram bot token**: config/env or `channels.telegram.tokenFile`
- **Discord bot token**: config/env (token file not yet supported)
- **Slack tokens**: config/env (`channels.slack.*`)
- **Pairing allowlists**: `~/.opensoul/credentials/<channel>-allowFrom.json`
- **Model auth profiles**: `~/.opensoul/agents/<agentId>/agent/auth-profiles.json`
- **Legacy OAuth import**: `~/.opensoul/credentials/oauth.json`
  More detail: [Security](/gateway/security#credential-storage-map).

## Updating (without wrecking your setup)

- Keep `~/.opensoul/workspace` and `~/.opensoul/` as “your stuff”; don’t put personal prompts/config into the `opensoul` repo.
- Updating source: `git pull` + `pnpm install` (when lockfile changed) + keep using `pnpm gateway:watch`.

## Linux (systemd user service)

Linux installs use a systemd **user** service. By default, systemd stops user
services on logout/idle, which kills the Gateway. Onboarding attempts to enable
lingering for you (may prompt for sudo). If it’s still off, run:

```bash
sudo loginctl enable-linger $USER
```

For always-on or multi-user servers, consider a **system** service instead of a
user service (no lingering needed). See [Gateway runbook](/gateway) for the systemd notes.

## Related docs

- [Gateway runbook](/gateway) (flags, supervision, ports)
- [Gateway configuration](/gateway/configuration) (config schema + examples)
- [Discord](/channels/discord) and [Telegram](/channels/telegram) (reply tags + replyToMode settings)
- [OpenSoul assistant setup](/start/opensoul)
- [macOS app](/platforms/macos) (gateway lifecycle)
