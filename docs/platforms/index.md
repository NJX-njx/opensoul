---
summary: "Platform support overview (Gateway + companion apps)"
read_when:
  - Looking for OS support or install paths
  - Deciding where to run the Gateway
title: "Platforms"
---

# Platforms

OpenSoul core is written in TypeScript. **Node is the recommended runtime**.
Bun is not recommended for the Gateway (WhatsApp/Telegram bugs).

Companion apps exist for macOS (menu bar app), Windows (native WPF app), and mobile nodes
(iOS/Android). Linux companion app is planned; the Gateway is fully supported on all platforms.

## Choose your OS

- macOS: [macOS](/platforms/macos)
- iOS: [iOS](/platforms/ios)
- Android: [Android](/platforms/android)
- Windows: [Windows](/platforms/windows)
- Linux: [Linux](/platforms/linux)

## VPS & hosting

- VPS hub: [VPS hosting](/vps)
- Fly.io: [Fly.io](/install/fly)
- Hetzner (Docker): [Hetzner](/install/hetzner)
- GCP (Compute Engine): [GCP](/install/gcp)
- exe.dev (VM + HTTPS proxy): [exe.dev](/install/exe-dev)

## Common links

- Install guide: [Getting Started](/start/getting-started)
- Gateway runbook: [Gateway](/gateway)
- Gateway configuration: [Configuration](/gateway/configuration)
- Service status: `opensoul gateway status`

## Gateway service install (CLI)

Use one of these (all supported):

- Wizard (recommended): `opensoul onboard --install-daemon`
- Direct: `opensoul gateway install`
- Configure flow: `opensoul configure` → select **Gateway service**
- Repair/migrate: `opensoul doctor` (offers to install or fix the service)

The service target depends on OS:

- macOS: LaunchAgent (`ai.opensoul.gateway` or `ai.opensoul.<profile>`; legacy `com.opensoul.*`)
- Linux/WSL2: systemd user service (`opensoul-gateway[-<profile>].service`)
