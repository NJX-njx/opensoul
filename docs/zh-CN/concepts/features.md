---
read_when:
  - 你想了解 OpenSoul 支持的完整功能列表
summary: OpenSoul 在渠道、路由、媒体和用户体验方面的功能。
title: 功能
x-i18n:
  generated_at: "2026-02-04T17:53:22Z"
  model: claude-opus-4-5
  provider: pi
  source_hash: 1b6aee0bfda751824cb6b3a99080b4c80c00ffb355a96f9cff1b596d55d15ed4
  source_path: concepts/features.md
  workflow: 15
---

## 亮点

<Columns>
  <Card title="30+ 渠道" icon="message-square">
    通过单个 Gateway 网关支持 WhatsApp、Telegram、Discord、Slack、iMessage、Signal、Matrix 等。
  </Card>
  <Card title="50+ 技能" icon="plug">
    GitHub、Notion、Obsidian、Canvas、1Password 及可扩展插件 SDK。
  </Card>
  <Card title="多智能体路由" icon="route">
    按智能体、工作区或发送者隔离会话。
  </Card>
  <Card title="媒体" icon="image">
    支持图片、音频和文档的收发。
  </Card>
  <Card title="跨平台应用" icon="monitor">
    Web 控制界面、macOS、Windows、iOS、Android、CLI/TUI。
  </Card>
  <Card title="移动节点" icon="smartphone">
    iOS 和 Android 节点，支持 Canvas。
  </Card>
</Columns>

## 完整列表

### 渠道（30+）
- WhatsApp（Baileys）、Telegram（grammY）、Discord、Slack、Signal、iMessage（BlueBubbles）
- Mattermost、Matrix、LINE、Zalo、飞书、Google Chat、Microsoft Teams（插件）
- Nextcloud Talk、Nostr、Twitch、WebChat、REST API、WebSocket

### 智能体核心
- Pi 智能体 RPC 模式，支持工具流式传输
- 多模型支持：OpenAI、Anthropic、AWS Bedrock、Ollama（本地）等
- 记忆系统，支持向量搜索（LanceDB）
- 多智能体路由，按工作区或发送者隔离会话
- Anthropic 和 OpenAI 的 OAuth 订阅认证
- 会话：私信合并为共享的 `main`；群组相互隔离
- 群聊支持，通过提及激活
- 长响应的流式传输和分块处理

### 媒体与语音
- 图片、音频和文档的收发
- 可选的语音消息转录
- Voice Call 扩展，支持 TTS/STT

### 应用与界面
- Web 控制界面和 WebChat
- macOS 菜单栏应用
- Windows 原生桌面应用（WPF）
- iOS 和 Android 节点，支持配对和 Canvas
- CLI 和 TUI，面向高级用户

<Note>
旧版 Claude、Codex、Gemini 和 Opencode 路径已被移除。Pi 是唯一的编程智能体路径。
</Note>
