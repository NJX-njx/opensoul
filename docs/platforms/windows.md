---
summary: "Windows support: native app + WSL2 for Gateway"
read_when:
  - Installing OpenSoul on Windows
  - Looking for Windows companion app status
title: "Windows"
---

# Windows

OpenSoul supports Windows in two ways:

1. **Native Windows app** — C#/.NET WPF desktop app with system tray, deep link protocol
   (`opensoul://`), Mica/Acrylic effects, and Velopack auto-updates. Connects to a Gateway
   (local or remote).
2. **WSL2 (recommended for Gateway)** — Run the CLI + Gateway inside Linux for full tooling
   compatibility (Node/Bun/pnpm, skills). One command to install: `wsl --install`.

## Install (WSL2)

- [Getting Started](/start/getting-started) (use inside WSL)
- [Install & updates](/install/updating)
- Official WSL2 guide (Microsoft): [https://learn.microsoft.com/windows/wsl/install](https://learn.microsoft.com/windows/wsl/install)

## Gateway

- [Gateway runbook](/gateway)
- [Configuration](/gateway/configuration)

## Gateway service install (CLI)

Inside WSL2:

```
opensoul onboard --install-daemon
```

Or:

```
opensoul gateway install
```

Or:

```
opensoul configure
```

Select **Gateway service** when prompted.

Repair/migrate:

```
opensoul doctor
```

## Advanced: expose WSL services over LAN (portproxy)

WSL has its own virtual network. If another machine needs to reach a service
running **inside WSL** (SSH, a local TTS server, or the Gateway), you must
forward a Windows port to the current WSL IP. The WSL IP changes after restarts,
so you may need to refresh the forwarding rule.

Example (PowerShell **as Administrator**):

```powershell
$Distro = "Ubuntu-24.04"
$ListenPort = 2222
$TargetPort = 22

$WslIp = (wsl -d $Distro -- hostname -I).Trim().Split(" ")[0]
if (-not $WslIp) { throw "WSL IP not found." }

netsh interface portproxy add v4tov4 listenaddress=0.0.0.0 listenport=$ListenPort `
  connectaddress=$WslIp connectport=$TargetPort
```

Allow the port through Windows Firewall (one-time):

```powershell
New-NetFirewallRule -DisplayName "WSL SSH $ListenPort" -Direction Inbound `
  -Protocol TCP -LocalPort $ListenPort -Action Allow
```

Refresh the portproxy after WSL restarts:

```powershell
netsh interface portproxy delete v4tov4 listenport=$ListenPort listenaddress=0.0.0.0 | Out-Null
netsh interface portproxy add v4tov4 listenport=$ListenPort listenaddress=0.0.0.0 `
  connectaddress=$WslIp connectport=$TargetPort | Out-Null
```

Notes:

- SSH from another machine targets the **Windows host IP** (example: `ssh user@windows-host -p 2222`).
- Remote nodes must point at a **reachable** Gateway URL (not `127.0.0.1`); use
  `opensoul status --all` to confirm.
- Use `listenaddress=0.0.0.0` for LAN access; `127.0.0.1` keeps it local only.
- If you want this automatic, register a Scheduled Task to run the refresh
  step at login.

## Step-by-step WSL2 install

### 1) Install WSL2 + Ubuntu

Open PowerShell (Admin):

```powershell
wsl --install
# Or pick a distro explicitly:
wsl --list --online
wsl --install -d Ubuntu-24.04
```

Reboot if Windows asks.

### 2) Enable systemd (required for gateway install)

In your WSL terminal:

```bash
sudo tee /etc/wsl.conf >/dev/null <<'EOF'
[boot]
systemd=true
EOF
```

Then from PowerShell:

```powershell
wsl --shutdown
```

Re-open Ubuntu, then verify:

```bash
systemctl --user status
```

### 3) Install OpenSoul (inside WSL)

Follow the Linux Getting Started flow inside WSL:

```bash
git clone https://github.com/NJX-njx/opensoul.git
cd opensoul
pnpm install
pnpm ui:build # auto-installs UI deps on first run
pnpm build
opensoul onboard
```

Full guide: [Getting Started](/start/getting-started)

## Windows companion app

A native Windows desktop app is available in `apps/windows/` — C#/.NET WPF with WebView2,
system tray, deep link protocol (`opensoul://`), Mica/Acrylic background effects, and
Velopack auto-updates. Build from source or download releases from [Releases](https://github.com/NJX-njx/opensoul/releases).
