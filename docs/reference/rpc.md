---
summary: "RPC adapters for external CLIs (signal-cli, legacy imsg) and gateway patterns"
read_when:
  - Adding or changing external CLI integrations
  - Debugging RPC adapters (signal-cli, imsg)
title: "RPC Adapters"
---

# RPC adapters

OpenSoul integrates external CLIs via JSON-RPC. Two patterns are used today.

## Pattern A: HTTP daemon (signal-cli)

- `signal-cli` runs as a daemon with JSON-RPC over HTTP.
- Event stream is SSE (`/api/v1/events`).
- Health probe: `/api/v1/check`.
- OpenSoul owns lifecycle when `channels.signal.autoStart=true`.

See [Signal](/channels/signal) for setup and endpoints.

## Pattern B: stdio child process (legacy: imsg)

> **Note:** For new iMessage setups, use [BlueBubbles](/channels/bluebubbles) instead.

- OpenSoul spawns `imsg rpc` as a child process (legacy iMessage integration).
- JSON-RPC is line-delimited over stdin/stdout (one JSON object per line).
- No TCP port, no daemon required.

Core methods used:

- `watch.subscribe` → notifications (`method: "message"`)
- `watch.unsubscribe`
- `send`
- `chats.list` (probe/diagnostics)

See [iMessage](/channels/imessage) for legacy setup and addressing (`chat_id` preferred).

## Adapter guidelines

- Gateway owns the process (start/stop tied to provider lifecycle).
- Keep RPC clients resilient: timeouts, restart on exit.
- Prefer stable IDs (e.g., `chat_id`) over display strings.

## Continuity state maintenance

Task continuity state is stored locally in a per-agent SQLite database. The live `tasks.*`
gateway methods are for online reads and operator actions; export/import/prune are
intentionally handled by the CLI so operators can take safe backups before changing data.

Recommended maintenance flow:

- `opensoul tasks export --agent main`
- `opensoul tasks import --agent main --in ./continuity.json --replace`
- `opensoul tasks prune --agent main --closed-tasks-days 30 --events-days 30`

Use `tasks export` before migrations, repairs, or manual incident response. `tasks prune`
automatically writes a backup snapshot unless you run it with `--dry-run`.
