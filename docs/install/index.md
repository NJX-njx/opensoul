---
summary: "Install OpenSoul — installer script, npm/pnpm, from source, Docker, and more"
read_when:
  - You need an install method other than the Getting Started quickstart
  - You want to deploy to a cloud platform
  - You need to update, migrate, or uninstall
title: "Install"
---

# Install

Already followed [Getting Started](/start/getting-started)? You're all set — this page is for alternative install methods, platform-specific instructions, and maintenance.

## System requirements

- **[Node 22+](/install/node)** (the [installer script](#install-methods) will install it if missing)
- macOS, Linux, or Windows
- `pnpm` only if you build from source

<Note>
On Windows, we strongly recommend running OpenSoul under [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install).
</Note>

## Install methods

<Tip>
The **installer script** is the recommended way to install OpenSoul. It handles Node detection, installation, and onboarding in one step.
</Tip>

<AccordionGroup>
  <Accordion title="Installer script" icon="rocket" defaultOpen>
    Downloads the CLI, installs it globally via npm, and launches the onboarding wizard.

    <Tabs>
      <Tab title="macOS / Linux / WSL2">
        ```bash
        curl -fsSL https://opensoul.ai/install.sh | bash
        ```
      </Tab>
      <Tab title="Windows (PowerShell)">
        ```powershell
        iwr -useb https://opensoul.ai/install.ps1 | iex
        ```
      </Tab>
    </Tabs>

    That's it — the script handles Node detection, installation, and onboarding.

    To skip onboarding and just install the binary:

    <Tabs>
      <Tab title="macOS / Linux / WSL2">
        ```bash
        curl -fsSL https://opensoul.ai/install.sh | bash -s -- --no-onboard
        ```
      </Tab>
      <Tab title="Windows (PowerShell)">
        ```powershell
        & ([scriptblock]::Create((iwr -useb https://opensoul.ai/install.ps1))) -NoOnboard
        ```
      </Tab>
    </Tabs>

    For all flags, env vars, and CI/automation options, see [Installer internals](/install/installer).

  </Accordion>

  <Accordion title="npm / pnpm" icon="package">
    If you already have Node 22+ and prefer to manage the install yourself:

    <Tabs>
      <Tab title="npm">
        ```bash
        npm install -g opensoul@latest
        opensoul onboard --install-daemon
        ```

        <Accordion title="sharp build errors?">
          If you have libvips installed globally (common on macOS via Homebrew) and `sharp` fails, force prebuilt binaries:

          ```bash
          SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm install -g opensoul@latest
          ```

          If you see `sharp: Please add node-gyp to your dependencies`, either install build tooling (macOS: Xcode CLT + `npm install -g node-gyp`) or use the env var above.
        </Accordion>
      </Tab>
      <Tab title="pnpm">
        ```bash
        pnpm add -g opensoul@latest
        pnpm approve-builds -g        # approve opensoul, node-llama-cpp, sharp, etc.
        opensoul onboard --install-daemon
        ```

        <Note>
        pnpm requires explicit approval for packages with build scripts. After the first install shows the "Ignored build scripts" warning, run `pnpm approve-builds -g` and select the listed packages.
        </Note>
      </Tab>
    </Tabs>

  </Accordion>

  <Accordion title="From source" icon="github">
    For contributors or anyone who wants to run from a local checkout.

    <Steps>
      <Step title="Clone and build">
        Clone the [OpenSoul repo](https://github.com/NJX-njx/opensoul) and build:

        ```bash
        git clone https://github.com/NJX-njx/opensoul.git
        cd opensoul
        pnpm install
        pnpm ui:build
        pnpm build
        ```
      </Step>
      <Step title="Link the CLI">
        Make the `opensoul` command available globally:

        ```bash
        pnpm link --global
        ```

        Alternatively, skip the link and run commands via `pnpm opensoul ...` from inside the repo.
      </Step>
      <Step title="Run onboarding">
        ```bash
        opensoul onboard --install-daemon
        ```
      </Step>
    </Steps>

    For deeper development workflows, see [Setup](/start/setup).

  </Accordion>
</AccordionGroup>

## Other install methods

<CardGroup cols={2}>
  <Card title="Docker" href="/install/docker" icon="container">
    Containerized or headless deployments.
  </Card>
  <Card title="Nix" href="/install/nix" icon="snowflake">
    Declarative install via Nix.
  </Card>
  <Card title="Ansible" href="/install/ansible" icon="server">
    Automated fleet provisioning.
  </Card>
  <Card title="Bun" href="/install/bun" icon="zap">
    CLI-only usage via the Bun runtime.
  </Card>
</CardGroup>

## After install

Verify everything is working:

```bash
opensoul doctor         # check for config issues
opensoul status         # gateway status
opensoul dashboard      # open the browser UI
```

## Native dependencies & platform prerequisites

OpenSoul bundles native modules (`sharp`, `better-sqlite3` via `sqlite-vec`). Most platforms ship prebuilt binaries, but if you see `node-gyp` errors during install you need a C/C++ toolchain:

<Tabs>
  <Tab title="macOS">
    ```bash
    xcode-select --install          # installs Apple CLT (includes clang, make, python3)
    ```

    If `sharp` fails with a libvips error (common when Homebrew libvips is present):

    ```bash
    SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm install -g opensoul@latest
    ```
  </Tab>
  <Tab title="Ubuntu / Debian">
    ```bash
    sudo apt-get update
    sudo apt-get install -y build-essential python3
    ```
  </Tab>
  <Tab title="Fedora / RHEL">
    ```bash
    sudo dnf groupinstall "Development Tools"
    sudo dnf install python3
    ```
  </Tab>
  <Tab title="Alpine (Docker)">
    ```bash
    apk add --no-cache build-base python3
    ```
  </Tab>
  <Tab title="Windows">
    Install the Visual Studio C++ build tools (or the full Visual Studio with "Desktop development with C++" workload):

    ```powershell
    npm install -g windows-build-tools   # or install Visual Studio Build Tools manually
    ```

    We strongly recommend running OpenSoul under [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install) instead.
  </Tab>
</Tabs>

**Optional native dependencies** — these are not required for core functionality:

| Package           | Purpose                              | Install                       |
| ----------------- | ------------------------------------ | ----------------------------- |
| `@napi-rs/canvas` | Image generation for certain plugins | `npm install @napi-rs/canvas` |
| `node-llama-cpp`  | Local LLM inference (llama.cpp)      | `npm install node-llama-cpp`  |

## Troubleshooting: `opensoul` not found

<Accordion title="PATH diagnosis and fix">
  Quick diagnosis:

```bash
node -v
npm -v
npm prefix -g
echo "$PATH"
```

If `$(npm prefix -g)/bin` (macOS/Linux) or `$(npm prefix -g)` (Windows) is **not** in your `$PATH`, your shell can't find global npm binaries (including `opensoul`).

Fix — add it to your shell startup file (`~/.zshrc` or `~/.bashrc`):

```bash
export PATH="$(npm prefix -g)/bin:$PATH"
```

On Windows, add the output of `npm prefix -g` to your PATH.

Then open a new terminal (or `rehash` in zsh / `hash -r` in bash).
</Accordion>

## Update / uninstall

<CardGroup cols={3}>
  <Card title="Updating" href="/install/updating" icon="refresh-cw">
    Keep OpenSoul up to date.
  </Card>
  <Card title="Migrating" href="/install/migrating" icon="arrow-right">
    Move to a new machine.
  </Card>
  <Card title="Uninstall" href="/install/uninstall" icon="trash-2">
    Remove OpenSoul completely.
  </Card>
</CardGroup>
