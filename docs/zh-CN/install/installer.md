---
read_when:
  - 你想了解 `opensoul.ai/install.sh` 的工作机制
  - 你想自动化安装（CI / 无头环境）
  - 你想从 GitHub 检出安装
summary: 安装器脚本的工作原理（install.sh + install-cli.sh）、参数和自动化
title: 安装器内部机制
x-i18n:
  generated_at: "2026-02-01T21:07:55Z"
  model: claude-opus-4-5
  provider: pi
  source_hash: 9e0a19ecb5da0a395030e1ccf0d4bedf16b83946b3432c5399d448fe5d298391
  source_path: install/installer.md
  workflow: 14
---

# 安装器内部机制

OpenSoul 提供三个安装器脚本（托管在 `opensoul.ai`）：

| 脚本                               | 平台                 | 功能                                                                                 |
| ---------------------------------- | -------------------- | -------------------------------------------------------------------------------------------- |
| [`install.sh`](#installsh)         | macOS / Linux / WSL  | 在需要时安装 Node，通过 npm（默认）或 git 安装 OpenSoul，并可运行新手引导。 |
| [`install-cli.sh`](#install-clish) | macOS / Linux / WSL  | 将 Node + OpenSoul 安装到本地前缀目录（`~/.opensoul`）。无需 root 权限。              |
| [`install.ps1`](#installps1)       | Windows (PowerShell) | 在需要时安装 Node，通过 npm（默认）或 git 安装 OpenSoul，并可运行新手引导。 |

## 快速命令

<Tabs>
  <Tab title="install.sh">
    ```bash
    curl -fsSL https://opensoul.ai/install.sh | bash
    ```

    ```bash
    curl -fsSL https://opensoul.ai/install.sh | bash -s -- --help
    ```

  </Tab>
  <Tab title="install-cli.sh">
    ```bash
    curl -fsSL https://opensoul.ai/install-cli.sh | bash
    ```

    ```bash
    curl -fsSL https://opensoul.ai/install-cli.sh | bash -s -- --help
    ```

  </Tab>
  <Tab title="install.ps1">
    ```powershell
    iwr -useb https://opensoul.ai/install.ps1 | iex
    ```

    ```powershell
    & ([scriptblock]::Create((iwr -useb https://opensoul.ai/install.ps1))) -Tag beta -NoOnboard -DryRun
    ```

  </Tab>
</Tabs>

<Note>
如果安装成功但在新终端中找不到 `opensoul`，请参见 [Node.js 故障排除](/install/node#troubleshooting)。
</Note>

---

## install.sh

<Tip>
推荐用于 macOS/Linux/WSL 上的大多数交互式安装。
</Tip>

### 流程 (install.sh)

<Steps>
  <Step title="检测操作系统">
    支持 macOS 和 Linux（包括 WSL）。如果检测到 macOS，则安装缺失的 Homebrew。
  </Step>
  <Step title="确保 Node.js 22+">
    检查 Node 版本并在需要时安装 Node 22（macOS 使用 Homebrew，Linux 使用 NodeSource 设置脚本）。
  </Step>
  <Step title="确保 Git">
    安装缺失的 Git。
  </Step>
  <Step title="安装 OpenSoul">
    - `npm` 方式（默认）：全局 npm 安装。
    - `git` 方式：克隆/更新仓库，使用 pnpm 安装依赖并构建，然后在 `~/.local/bin/opensoul` 安装包装脚本。
  </Step>
  <Step title="后期安装任务">
    - 在升级和 git 安装时运行 `opensoul doctor --non-interactive`。
    - 在适当情况下尝试运行新手引导。
    - 默认设置 `SHARP_IGNORE_GLOBAL_LIBVIPS=1`。
  </Step>
</Steps>

### 参数参考 (install.sh)

| 参数                             | 描述                                                       |
| ------------------------------- | ---------------------------------------------------------- |
| `--install-method npm\|git`     | 选择安装方式（默认：`npm`）。别名：`--method`  |
| `--npm`                         | npm 方式快捷键                                    |
| `--git`                         | git 方式快捷键。别名：`--github`                 |
| `--version <version\|dist-tag>` | npm 版本或标签（默认：`latest`）                |
| `--no-onboard`                  | 跳过新手引导                                            |
| `--dry-run`                     | 打印操作而不应用更改                                    |

---

## install-cli.sh

<Info>
适用于希望将所有内容放在本地前缀目录（默认 `~/.opensoul`）且不改动系统 Node 依赖的环境。
</Info>

### 流程 (install-cli.sh)

<Steps>
  <Step title="安装本地 Node 运行时">
    下载 Node 压缩包（默认 `22.22.0`）到前缀目录下并验证。
  </Step>
  <Step title="安装 OpenSoul">
    使用 `npm --prefix` 安装 OpenSoul，然后写入包装脚本。
  </Step>
</Steps>

### 故障排除

<AccordionGroup>
  <Accordion title="为什么在 Linux 上 npm 会报 EACCES 错误？">
    某些 Linux 设置中，npm 全局前缀指向 root 拥有的路径。`install.sh` 可以将前缀切换到 `~/.npm-global` 并更新 PATH。
  </Accordion>

  <Accordion title="sharp/libvips 问题">
    脚本默认设置 `SHARP_IGNORE_GLOBAL_LIBVIPS=1` 以避免 sharp 针对系统 libvips 构建。
  </Accordion>

  <Accordion title='Windows: "opensoul is not recognized"'>
    运行 `npm config get prefix`，附加 `\bin`，将其添加到 PATH，然后重新打开 PowerShell。
  </Accordion>
</AccordionGroup>
