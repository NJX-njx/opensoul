---
title: "Create Soulmate"
summary: "Create a new soulmate agent in Control UI, validate success, and recover from common failures"
---

# Create Soulmate

Use **Create Soulmate** in Control UI to create a dedicated agent with its own workspace.

## Create flow

1. Open Control UI and click `Create Soulmate`.
2. Fill required `Name`.
3. Optional: set `Emoji` and upload `Avatar` (image only, <= 512KB).
4. Optional: set custom `Workspace path` in Advanced.
5. Click `Create`.

## Constraints

- Name is required.
- Avatar must be an image file.
- Avatar max size is 512KB.
- Workspace path must be writable by the gateway process.

## Common failures and recovery

- `Gateway is disconnected`: reconnect the gateway first, then retry.
- `Workspace path invalid/inaccessible`: choose a writable path and retry.
- `Create failed`: check gateway logs, then retry with a different name/workspace.

## Post-create behavior checklist

After successful create, verify all of the following:

- Active session switched to `agent:<new-agent-id>:main`.
- Chat history for new session loads.
- Avatar refreshes to new soulmate avatar (if uploaded).
- Agents list includes the new soulmate.
- URL/session state is synced to new session.

## Related docs

- [Getting Started](/start/getting-started)
- [Control UI](/web/control-ui)
- [Debugging](/help/debugging)
