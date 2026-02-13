# OpenSoul

> 一个智能体形态的灵魂伴侣

## 简介

OpenSoul 是一个基于 AI 的智能体伴侣项目，支持多渠道消息集成，可以通过 WhatsApp、Telegram、Slack、Discord 等渠道与你交互。

本项目基于 [OpenClaw](https://github.com/openclaw/openclaw)（MIT 许可证）构建。

## 安装

运行环境要求：**Node ≥ 22**

```bash
# 克隆仓库
git clone https://github.com/NJX-njx/opensoul.git
cd opensoul

# 安装依赖
pnpm install

# 构建
pnpm build
```

## 开发

```bash
# 开发模式运行
pnpm dev

# 类型检查 + 格式化 + Lint
pnpm check

# 运行测试
pnpm test
```

## 项目结构

```
src/          - 源代码
extensions/   - 插件/扩展
apps/         - 移动端 & 桌面端应用
docs/         - 文档
scripts/      - 构建脚本
ui/           - Web UI
```

## 许可证

MIT License — 详见 [LICENSE](LICENSE)

本项目基于 [OpenClaw](https://github.com/openclaw/openclaw) 构建，原始许可证见 [LICENSE-ORIGINAL](LICENSE-ORIGINAL)。
