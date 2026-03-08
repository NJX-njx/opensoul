---
title: "Beginner Deployment"
summary: "Lowest-friction OpenSoul deployment path with verify checklist and rollback"
---

# Beginner Deployment

This guide is the simplest safe path for non-technical users to get OpenSoul running.

## 1) Baseline local deployment

Use one of these command blocks exactly.

### Windows (PowerShell)

```powershell
git clone https://github.com/NJX-njx/opensoul.git
cd opensoul
pnpm install
pnpm build
$env:OPENSOUL_SKIP_CHANNELS = "1"
$env:OPENSOUL_GATEWAY_TOKEN = "dev-token"
pnpm gateway:dev
```

### macOS/Linux (bash)

```bash
git clone https://github.com/NJX-njx/opensoul.git
cd opensoul
pnpm install
pnpm build
export OPENSOUL_SKIP_CHANNELS=1
export OPENSOUL_GATEWAY_TOKEN=dev-token
pnpm gateway:dev
```

## 2) Baseline VPS deployment

Use Docker for the shortest path:

```bash
git clone https://github.com/NJX-njx/opensoul.git
cd opensoul
docker compose up -d
```

## 3) Post-deploy verification checklist

- Gateway process is running without crash loops.
- `http://localhost:19001/health` returns healthy response.
- Web Control UI loads in browser.
- A test chat request returns an assistant response.
- Logs do not show repeated auth/config errors.

## 4) Fast rollback and uninstall

If a deployment breaks, use one of these fast exits:

- Local source run: stop process, `git checkout <last-known-good-commit>`, restart gateway.
- Docker: `docker compose down` then `docker compose up -d` at the last known good tag/commit.
- Full uninstall: `opensoul uninstall --all --yes --non-interactive`

## 5) Next step

After baseline success, move to model/provider setup:

- [Model Setup Guide](/guides/model-setup)
- [Install Docs Index](/install)
