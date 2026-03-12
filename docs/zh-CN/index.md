---
read_when:
  - 向新用户介绍 OpenSoul
summary: OpenSoul — 面向跨表面任务连续性的自托管 AI 智能体运行时。
title: OpenSoul
x-i18n:
  generated_at: "2026-02-04T17:53:40Z"
  model: claude-opus-4-5
  provider: pi
  source_hash: fc8babf7885ef91d526795051376d928599c4cf8aff75400138a0d7d9fa3b75f
  source_path: index.md
  workflow: 15
---

# OpenSoul 🦞

<p align="center">
    <img
        src="/assets/opensoul-logo-text-dark.png"
        alt="OpenSoul"
        width="500"
        class="dark:hidden"
    />
    <img
        src="/assets/opensoul-logo-text.png"
        alt="OpenSoul"
        width="500"
        class="hidden dark:block"
    />
</p>

> _"去壳！去壳！"_ — 大概是一只太空龙虾说的

<p align="center">
  <strong>一个智能体，多种表面，一条连续的任务生命线。</strong><br />
  面向跨表面任务连续性的自托管 AI 智能体运行时，覆盖聊天应用、Control UI、Canvas、cron 和配对设备。<br />
  从私信开始，切到浏览器继续，承诺、事件与 handoff 全程可见。
</p>

<Columns>
  <Card title="入门指南" href="/start/getting-started" icon="rocket">
    安装 OpenSoul 并在几分钟内启动 Gateway 网关。
  </Card>
  <Card title="运行向导" href="/start/wizard" icon="sparkles">
    通过 `opensoul onboard` 和配对流程进行引导式设置。
  </Card>
  <Card title="打开控制界面" href="/web/control-ui" icon="layout-dashboard">
    打开浏览器操作台，查看聊天、任务连续性、配置和会话。
  </Card>
</Columns>

OpenSoul 通过单个 Gateway 网关进程把聊天应用、浏览器界面、Canvas、自动化和设备表面连接到同一个智能体运行时。重点不再只是“多渠道都能聊天”，而是让同一项任务在不同表面之间持续推进而不丢状态。

## 工作原理

```mermaid
flowchart LR
  A["Chat apps + plugins"] --> B["Gateway"]
  B --> C["Pi agent"]
  B --> D["Task Continuity Engine"]
  B --> E["CLI"]
  B --> F["Web Control UI"]
  D --> F
  B --> G["macOS app"]
  B --> H["iOS and Android nodes"]
```

Gateway 网关是会话、路由、渠道连接与任务连续性状态的唯一事实来源。

## 核心功能

<Columns>
  <Card title="任务连续性" icon="route">
    同一项任务可以在私信、Control UI、Canvas、cron 和子代理之间持续推进。
  </Card>
  <Card title="多渠道 Gateway 网关" icon="network">
    WhatsApp、Telegram、Discord、Slack 等只是进入同一运行时的传输层。
  </Card>
  <Card title="插件渠道" icon="plug">
    通过扩展包添加 Mattermost 等更多渠道。
  </Card>
  <Card title="多智能体路由" icon="route">
    按智能体、工作区或发送者隔离会话。
  </Card>
  <Card title="可见的操作侧栏" icon="monitor">
    Control UI 聊天页右侧展示任务状态、承诺、事件时间线和表面切换轨迹。
  </Card>
  <Card title="Web 控制界面" icon="monitor">
    浏览器操作台，用于聊天、连续性查看、配置、会话和节点管理。
  </Card>
  <Card title="移动节点" icon="smartphone">
    配对 iOS 和 Android 节点，支持 Canvas。
  </Card>
</Columns>

## 快速开始

<Steps>
  <Step title="安装 OpenSoul">
    ```bash
    npm install -g opensoul@latest
    ```
  </Step>
  <Step title="新手引导并安装服务">
    ```bash
    opensoul onboard --install-daemon
    ```
  </Step>
  <Step title="配对 WhatsApp 并启动 Gateway 网关">
    ```bash
    opensoul channels login
    opensoul gateway --port 18789
    ```
  </Step>
</Steps>

需要完整的安装和开发环境设置？请参阅[快速开始](/start/quickstart)。

## 仪表板

Gateway 网关启动后，打开浏览器控制界面。

- 本地默认地址：http://127.0.0.1:18789/
- 远程访问：[Web 界面](/web)和 [Tailscale](/gateway/tailscale)
- 聊天页现在也是任务连续性的主界面：右侧 rail 会展示当前任务、承诺、事件时间线和 handoff 轨迹。

## 配置（可选）

配置文件位于 `~/.opensoul/opensoul.json`。

- 如果你**不做任何修改**，OpenSoul 将使用内置的 Pi 二进制文件以 RPC 模式运行，并按发送者创建独立会话。
- 如果你想要限制访问，可以从 `channels.whatsapp.allowFrom` 和（针对群组的）提及规则开始配置。

示例：

```json5
{
  channels: {
    whatsapp: {
      allowFrom: ["+15555550123"],
      groups: { "*": { requireMention: true } },
    },
  },
  messages: { groupChat: { mentionPatterns: ["@opensoul"] } },
}
```

## 从这里开始

<Columns>
  <Card title="文档中心" href="/start/hubs" icon="book-open">
    所有文档和指南，按用例分类。
  </Card>
  <Card title="配置" href="/gateway/configuration" icon="settings">
    核心 Gateway 网关设置、令牌和提供商配置。
  </Card>
  <Card title="远程访问" href="/gateway/remote" icon="globe">
    SSH 和 tailnet 访问模式。
  </Card>
  <Card title="渠道" href="/channels/telegram" icon="message-square">
    WhatsApp、Telegram、Discord 等渠道的具体设置。
  </Card>
  <Card title="节点" href="/nodes" icon="smartphone">
    iOS 和 Android 节点的配对与 Canvas 功能。
  </Card>
  <Card title="帮助" href="/help" icon="life-buoy">
    常见修复方法和故障排除入口。
  </Card>
</Columns>

## 了解更多

<Columns>
  <Card title="完整功能列表" href="/concepts/features" icon="list">
    任务连续性、渠道、路由和操作界面能力总览。
  </Card>
  <Card title="多智能体路由" href="/concepts/multi-agent" icon="route">
    工作区隔离和按智能体的会话管理。
  </Card>
  <Card title="安全" href="/gateway/security" icon="shield">
    令牌、白名单和安全控制。
  </Card>
  <Card title="故障排除" href="/gateway/troubleshooting" icon="wrench">
    Gateway 网关诊断和常见错误。
  </Card>
  <Card title="关于与致谢" href="/reference/credits" icon="info">
    项目起源、贡献者和许可证。
  </Card>
</Columns>
