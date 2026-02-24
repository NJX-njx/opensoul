<p align="center">
  <img src="opensoul.png" alt="OpenSoul" width="640">
</p>

<p align="center">
  <h1 align="center">OpenSoul</h1>
  <p align="center">
    <strong>Your AI Soul Companion — Chat, Collaborate, Create</strong>
  </p>
  <p align="center">
    A self-hosted AI agent that lives across all your apps — WhatsApp, Telegram, Discord, Slack, and 30+ more channels. Your personal AI companion for life and work.
  </p>
</p>

<p align="center">
  <a href="https://github.com/NJX-njx/opensoul/actions/workflows/ci.yml"><img src="https://github.com/NJX-njx/opensoul/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <a href="https://github.com/NJX-njx/opensoul/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT"></a>
  <img src="https://img.shields.io/badge/node-%3E%3D22-brightgreen.svg" alt="Node.js >= 22">
  <img src="https://img.shields.io/badge/TypeScript-ESM-blue.svg" alt="TypeScript ESM">
  <a href="https://github.com/NJX-njx/opensoul/stargazers"><img src="https://img.shields.io/github/stars/NJX-njx/opensoul?style=social" alt="GitHub Stars"></a>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#supported-channels">Channels</a> •
  <a href="#skills">Skills</a> •
  <a href="#cross-platform-apps">Apps</a> •
  <a href="#documentation">Docs</a> •
  <a href="ROADMAP.md">Roadmap</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#中文简介">中文</a>
</p>

---

## Why OpenSoul?

Most AI assistants are locked inside a single app. **OpenSoul breaks that boundary** — it's a self-hosted AI companion that integrates into the messaging apps you already use, runs on your own infrastructure, and keeps your data private.

Whether you need an **emotional companion** for daily life or a **productivity collaborator** for work, OpenSoul adapts to your needs across every platform.

## Features

### 🌐 30+ Messaging Channels

Connect your AI companion to the apps you already use — no new app to install.

| Category          | Channels                                                             |
| ----------------- | -------------------------------------------------------------------- |
| **Messaging**     | WhatsApp · Telegram · Signal · iMessage · Matrix · Mattermost · Zalo |
| **Collaboration** | Slack · Discord · Microsoft Teams · Lark (Feishu) · LINE             |
| **Voice**         | Voice Call (built-in TTS/STT)                                        |
| **Web**           | Web Control UI · REST API · WebSocket                                |

### 🧠 Intelligent Agent Core

- **Multi-model support** — OpenAI, Anthropic, Google Gemini (including new Gemini 2.5 Flash), AWS Bedrock, Ollama (local), and more
- **Memory system** — Long-term memory with vector search (LanceDB)
- **Multi-agent routing** — Session isolation and intelligent routing
- **Tool use** — Agents can browse the web, run code, manage files, and more

### 🛠️ 50+ Built-in Skills

Pre-built skills for real-world tasks:

| Category          | Skills                                           |
| ----------------- | ------------------------------------------------ |
| **Developer**     | GitHub · Git · Docker · tmux · Shell             |
| **Productivity**  | Notion · Obsidian · Canvas · 1Password           |
| **Communication** | Email · Calendar · Contacts                      |
| **Media**         | Image generation · PDF processing · Web scraping |
| **And more...**   | 50+ skills with an extensible plugin SDK         |

### 📱 Cross-Platform Apps

Native apps for every major platform:

- **macOS** — Native Swift app with menu bar integration
- **iOS** — iPhone & iPad companion
- **Android** — Full-featured Android app
- **Windows** — Native Windows desktop app (with improved gateway connection)
- **Web** — Browser-based control dashboard with intuitive onboarding & API key management
- **CLI / TUI** — Terminal interface for power users

### 🔒 Privacy-First & Self-Hosted

- **Your data stays yours** — runs on your own server or machine
- **No cloud dependency** — works with local models via Ollama
- **Open source** — MIT licensed, fully transparent

## Quick Start

### Prerequisites

- **Node.js** ≥ 22
- **pnpm** (comes with the repo's `packageManager` field)

### Installation

```bash
# Clone the repository
git clone https://github.com/NJX-njx/opensoul.git
cd opensoul

# Install dependencies
pnpm install

# Build the project
pnpm build

# Start OpenSoul
pnpm start
```

### Development

```bash
# Run in development mode (hot reload)
pnpm dev

# Type-check + lint + format
pnpm check

# Run tests
pnpm test

# Launch the Web UI
pnpm ui:dev
```

### Docker

```bash
# Build and run with Docker
docker build -t opensoul .
docker run -d --name opensoul opensoul
```

## Architecture

```
opensoul/
├── src/              # Core agent engine
├── extensions/       # 30+ channel & feature plugins
│   ├── whatsapp/     #   WhatsApp integration
│   ├── telegram/     #   Telegram bot
│   ├── discord/      #   Discord bot
│   ├── slack/        #   Slack app
│   ├── memory-core/  #   Memory system
│   ├── voice-call/   #   Voice calling
│   └── ...           #   And many more
├── skills/           # 50+ built-in skills
│   ├── github/       #   GitHub operations
│   ├── notion/       #   Notion integration
│   ├── obsidian/     #   Obsidian vault access
│   └── ...           #   And many more
├── apps/             # Native platform apps
│   ├── macos/        #   macOS (Swift)
│   ├── ios/          #   iOS (Swift)
│   ├── android/      #   Android (Kotlin)
│   ├── windows/      #   Windows (C#/.NET)
│   └── shared/       #   Shared OpenSoulKit
├── ui/               # Web Control UI (Lit)
├── packages/         # Internal packages
├── docs/             # Documentation
└── scripts/          # Build & utility scripts
```

## Supported Channels

<table>
<tr>
<td><strong>WhatsApp</strong></td>
<td><strong>Telegram</strong></td>
<td><strong>Discord</strong></td>
<td><strong>Slack</strong></td>
<td><strong>Signal</strong></td>
</tr>
<tr>
<td><strong>iMessage</strong></td>
<td><strong>Matrix</strong></td>
<td><strong>Mattermost</strong></td>
<td><strong>LINE</strong></td>
<td><strong>Lark</strong></td>
</tr>
<tr>
<td><strong>Zalo</strong></td>
<td><strong>Voice Call</strong></td>
<td><strong>Web UI</strong></td>
<td><strong>REST API</strong></td>
<td><strong>WebSocket</strong></td>
</tr>
</table>

Each channel is implemented as an independent extension under `extensions/`, making it easy to add new channels or customize existing ones.

## Skills

OpenSoul comes with 50+ built-in skills that give your AI companion real-world capabilities:

- **github** — Create issues, PRs, review code
- **notion** — Read and write Notion pages
- **obsidian** — Access your Obsidian vault
- **canvas** — Visual canvas interactions
- **1password** — Secure credential access
- **tmux** — Terminal session management
- And [many more](skills/)...

Skills are modular and can be enabled/disabled per session. Build your own skills using the plugin SDK.

## Documentation

Comprehensive documentation is available in the [`docs/`](docs/) directory:

- [Getting Started](docs/start/)
- [Platform Guides](docs/platforms/) — macOS, iOS, Android, Windows, Linux
- [Channel Setup](docs/channels/) — Configure each messaging channel
- [Skills & Tools](docs/tools/)
- [Plugin Development](docs/plugins/)
- [Gateway Architecture](docs/gateway/)
- [API Reference](docs/reference/)

## Contributing

We welcome contributions of all kinds! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:

- Setting up the development environment
- Code style and conventions
- Submitting pull requests
- Reporting bugs and requesting features

## License

[MIT License](LICENSE) — see [LICENSE](LICENSE) for details.

This project is built upon [OpenClaw](https://github.com/nicepkg/openclaw) (MIT). Original license: [LICENSE-ORIGINAL](LICENSE-ORIGINAL).

## Acknowledgments

- Built on the foundation of [OpenClaw](https://github.com/nicepkg/openclaw) by Peter Steinberger
- Powered by open-source AI models and frameworks

---

## 中文简介

<p align="center">
  <strong>OpenSoul —— 你的 AI 灵魂伴侣：聊天、协作、创造</strong>
</p>

OpenSoul 是一个突破平台限制的自托管 AI 智能体伴侣。它可以无缝集成到你日常使用的 30 多种消息应用中（如 WhatsApp、Telegram、Discord、Slack 等），运行在你自己的设备或服务器上，既能提供贴心的生活情感陪伴，也能作为工作中的高效协作者。

### ✨ 核心特性

- **🌐 30+ 消息渠道支持**
  无需安装新应用，直接在微信（通过特定渠道）、Telegram、WhatsApp、Slack、Discord 等你最熟悉的平台中与 AI 交流。
- **🧠 强大的智能体核心与多模型支持**
  全面支持 **OpenAI、Anthropic、Google Gemini (最新支持 2.5 Flash)、AWS Bedrock** 以及 **Ollama（本地大模型）**。配备长期记忆（通过 LanceDB 向量搜索）和智能路由机制。
- **🛠️ 50+ 实用开箱即用技能**
  内置 GitHub、Notion、Obsidian 读写、Canvas 可视化、终端命令行（Shell/Tmux）等技能，不仅能聊天，更能帮你执行复杂任务。
- **📱 全平台原生应用覆盖**
  提供 macOS、iOS、Android 和 Windows 原生客户端，以及具有完善 Onboarding（引导流程）和密钥管理的 Web 控制台面板。
- **🔒 绝对的隐私安全与自托管**
  支持通过 Ollama 纯本地运行大模型，你的聊天记录和数据完全留在你自己的服务器或设备上，告别云端隐私泄露焦虑。

### 🚀 快速开始

确保已安装 **Node.js ≥ 22** 及 **pnpm**：

```bash
# 克隆仓库
git clone https://github.com/NJX-njx/opensoul.git
cd opensoul

# 安装依赖
pnpm install

# 编译项目
pnpm build

# 启动 OpenSoul
pnpm start
```

### 📖 更多资源

- 完整的开发与使用文档请参阅 [`docs/`](docs/) 目录。
- 欢迎通过提交 Issue 或 Pull Request 来参与贡献（详见 [贡献指南](CONTRIBUTING.md)）。

---

<p align="center">
  <sub>如果你觉得 OpenSoul 对你有帮助，请在 GitHub 上给我们点亮 ⭐！</sub>
</p>
