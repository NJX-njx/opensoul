---
read_when:
  - 在 Windows 上安装 OpenSoul
  - 查找 Windows 配套应用状态
summary: Windows 支持：原生应用 + WSL2 运行 Gateway 网关
title: Windows
x-i18n:
  generated_at: "2026-02-03T07:53:19Z"
  model: claude-opus-4-5
  provider: pi
  source_hash: c93d2263b4e5b60cb6fbe9adcb1a0ca95b70cd6feb6e63cfc4459cb18b229da0
  source_path: platforms/windows.md
  workflow: 15
---

# Windows

OpenSoul 在 Windows 上支持两种方式：

1. **原生 Windows 应用** — C#/.NET WPF 桌面应用，带系统托盘、深链接协议（`opensoul://`）、Mica/Acrylic 效果和 Velopack 自动更新。可连接本地或远程 Gateway 网关。
2. **WSL2（推荐用于 Gateway 网关）** — 在 Linux 内运行 CLI + Gateway 网关，获得完整工具兼容性（Node/Bun/pnpm、Skills）。一条命令安装：`wsl --install`。

## 安装（WSL2）

- [入门指南](/start/getting-started)（在 WSL 内使用）
- [安装和更新](/install/updating)
- 官方 WSL2 指南（Microsoft）：https://learn.microsoft.com/windows/wsl/install

## Gateway 网关

- [Gateway 网关操作手册](/gateway)
- [配置](/gateway/configuration)

## Gateway 网关服务安装（CLI）

在 WSL2 内：

```
opensoul onboard --install-daemon
```

或：

```
opensoul gateway install
```

或：

```
opensoul configure
```

出现提示时选择 **Gateway service**。

修复/迁移：

```
opensoul doctor
```

## 高级：通过 LAN 暴露 WSL 服务（portproxy）

WSL 有自己的虚拟网络。如果另一台机器需要访问**在 WSL 内**运行的服务（SSH、本地 TTS 服务器或 Gateway 网关），你必须将 Windows 端口转发到当前的 WSL IP。WSL IP 在重启后会改变，因此你可能需要刷新转发规则。

示例（以**管理员身份**运行 PowerShell）：

```powershell
$Distro = "Ubuntu-24.04"
$ListenPort = 2222
$TargetPort = 22

$WslIp = (wsl -d $Distro -- hostname -I).Trim().Split(" ")[0]
if (-not $WslIp) { throw "WSL IP not found." }

netsh interface portproxy add v4tov4 listenaddress=0.0.0.0 listenport=$ListenPort `
  connectaddress=$WslIp connectport=$TargetPort
```

允许端口通过 Windows 防火墙（一次性）：

```powershell
New-NetFirewallRule -DisplayName "WSL SSH $ListenPort" -Direction Inbound `
  -Protocol TCP -LocalPort $ListenPort -Action Allow
```

在 WSL 重启后刷新 portproxy：

```powershell
netsh interface portproxy delete v4tov4 listenport=$ListenPort listenaddress=0.0.0.0 | Out-Null
netsh interface portproxy add v4tov4 listenport=$ListenPort listenaddress=0.0.0.0 `
  connectaddress=$WslIp connectport=$TargetPort | Out-Null
```

注意事项：

- 从另一台机器 SSH 目标是 **Windows 主机 IP**（示例：`ssh user@windows-host -p 2222`）。
- 远程节点必须指向**可访问的** Gateway 网关 URL（不是 `127.0.0.1`）；使用 `opensoul status --all` 确认。
- 使用 `listenaddress=0.0.0.0` 进行 LAN 访问；`127.0.0.1` 仅保持本地访问。
- 如果你想自动化，注册一个计划任务在登录时运行刷新步骤。

## WSL2 分步安装

### 1）安装 WSL2 + Ubuntu

打开 PowerShell（管理员）：

```powershell
wsl --install
# Or pick a distro explicitly:
wsl --list --online
wsl --install -d Ubuntu-24.04
```

如果 Windows 要求则重启。

### 2）启用 systemd（Gateway 网关安装所需）

在你的 WSL 终端中：

```bash
sudo tee /etc/wsl.conf >/dev/null <<'EOF'
[boot]
systemd=true
EOF
```

然后从 PowerShell：

```powershell
wsl --shutdown
```

重新打开 Ubuntu，然后验证：

```bash
systemctl --user status
```

### 3）安装 OpenSoul（在 WSL 内）

在 WSL 内按照 Linux 入门指南流程：

```bash
git clone https://github.com/NJX-njx/opensoul.git
cd opensoul
pnpm install
pnpm ui:build # auto-installs UI deps on first run
pnpm build
opensoul onboard
```

完整指南：[入门指南](/start/getting-started)

## Windows 配套应用

原生 Windows 桌面应用位于 `apps/windows/` — C#/.NET WPF + WebView2，带系统托盘、深链接协议（`opensoul://`）、Mica/Acrylic 背景效果和 Velopack 自动更新。从源码构建或从 [Releases](https://github.com/NJX-njx/opensoul/releases) 下载。
