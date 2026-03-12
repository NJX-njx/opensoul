---
summary: "Step-by-step guide for setting up model providers: API key, OAuth, and local Ollama paths."
read_when:
  - You are setting up a model provider for the first time
  - You want to understand the difference between API key, OAuth, and local setup
  - You want verification commands or help with common setup failures
title: "Model Setup Guide"
---

# Model Setup Guide

This guide walks you through the three supported paths for connecting a model provider
to OpenSoul. Choose the path that fits your provider.

---

## Choosing a Setup Path

| Path                     | When to use                               | Examples                                                      |
| ------------------------ | ----------------------------------------- | ------------------------------------------------------------- |
| **API key**              | Provider gives you a secret key           | OpenAI, Anthropic, Google Gemini, xAI, MiniMax, OpenRouter, … |
| **OAuth / device login** | Provider uses browser or device-code auth | GitHub Copilot, Google Gemini CLI, Google Antigravity         |
| **Local (no key)**       | Model runs on your machine                | Ollama, LM Studio, vLLM, LiteLLM                              |

---

## Path A — API Key

### 1. Get your key

Visit the provider's developer portal and generate an API key:

| Provider      | Key source                             |
| ------------- | -------------------------------------- |
| OpenAI        | https://platform.openai.com/api-keys   |
| Anthropic     | https://console.anthropic.com/         |
| Google Gemini | https://aistudio.google.com/app/apikey |
| OpenRouter    | https://openrouter.ai/keys             |
| xAI           | https://console.x.ai                   |
| MiniMax       | https://platform.minimaxi.com          |
| Moonshot AI   | https://platform.moonshot.ai           |
| Venice AI     | https://venice.ai/settings             |

### 2. Add the key to OpenSoul

**Option A — onboarding wizard (recommended for first-time setup):**

```bash
opensoul onboard
```

Select the provider in Step 3 and paste your API key.

**Option B — env file:**

Add to `~/.opensoul/.env`:

```bash
# Replace with your actual provider and key
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GEMINI_API_KEY=AIza...
```

**Option C — `opensoul.json` config:**

```json5
{
  env: {
    OPENAI_API_KEY: "${OPENAI_API_KEY}", // or paste key directly
  },
  agents: {
    defaults: {
      model: { primary: "openai/gpt-5.1-codex" },
    },
  },
}
```

### 3. Verify

```bash
# Check auth status (exit code 1 = missing/expired)
opensoul models status --check

# Live probe — makes a real call to the provider
opensoul models status --probe-provider openai

# List discovered models
opensoul models list --provider openai
```

---

## Path B — OAuth / Device Login

Some providers authenticate via browser or CLI device-code flow.

### GitHub Copilot

```bash
# Enable the plugin (already bundled, disabled by default)
opensoul plugins enable github-copilot-auth

# Start device-code login (opens browser or shows code)
opensoul models auth login --provider github-copilot --set-default

# Verify
opensoul models status --probe-provider github-copilot
```

### Google Gemini CLI

```bash
opensoul plugins enable google-gemini-cli-auth
opensoul models auth login --provider google-gemini-cli --set-default
opensoul models status --probe-provider google-gemini-cli
```

### Google Antigravity

```bash
opensoul plugins enable google-antigravity-auth
opensoul models auth login --provider google-antigravity --set-default
opensoul models status --probe-provider google-antigravity
```

> **Note:** OAuth tokens are stored in auth profiles on the gateway host.
> You do **not** need to paste client IDs or secrets into `opensoul.json`.

---

## Path C — Local (Ollama)

Run models entirely on your own machine — no API key required.

### 1. Install Ollama

Download from [https://ollama.ai](https://ollama.ai) and follow the installer for your OS.

### 2. Pull a model

```bash
ollama pull llama3.3          # recommended default
# or
ollama pull deepseek-r1:7b   # smaller reasoning model
ollama pull mistral           # compact general-purpose
```

### 3. Start Ollama

```bash
ollama serve
# Listens on http://127.0.0.1:11434 by default
```

### 4. Configure OpenSoul

Ollama is **auto-detected** when running at `http://127.0.0.1:11434/v1` — no config needed.

To set it as the default model:

```json5
// opensoul.json
{
  agents: {
    defaults: {
      model: { primary: "ollama/llama3.3" },
    },
  },
}
```

For a custom Ollama URL or port:

```json5
{
  models: {
    mode: "merge",
    providers: {
      ollama: {
        baseUrl: "http://my-server:11434/v1",
        api: "openai-completions",
        models: [],
      },
    },
  },
}
```

### 5. Verify

```bash
ollama list                          # show pulled models
opensoul models list --provider ollama
opensoul models status --probe-provider ollama
```

---

## Minimal Config Snippets

### OpenAI

```json5
{
  env: { OPENAI_API_KEY: "sk-..." },
  agents: { defaults: { model: { primary: "openai/gpt-5.1-codex" } } },
}
```

### Anthropic

```json5
{
  env: { ANTHROPIC_API_KEY: "sk-ant-..." },
  agents: { defaults: { model: { primary: "anthropic/claude-opus-4-6" } } },
}
```

### Google Gemini

```json5
{
  env: { GEMINI_API_KEY: "AIza..." },
  agents: { defaults: { model: { primary: "google/gemini-2.5-flash" } } },
}
```

### OpenRouter (multi-model gateway)

```json5
{
  env: { OPENROUTER_API_KEY: "sk-or-..." },
  agents: { defaults: { model: { primary: "openrouter/anthropic/claude-sonnet-4-5" } } },
}
```

### Ollama (local)

```json5
{
  agents: { defaults: { model: { primary: "ollama/llama3.3" } } },
}
```

---

## Verification Commands

After any setup path, run these to confirm everything works:

```bash
# Overall model auth health (exit 0 = ok, 1 = expired/missing, 2 = expiring soon)
opensoul models status --check

# Live probe all configured providers
opensoul models status --probe

# Probe a single provider
opensoul models status --probe-provider <provider-name>

# List available models
opensoul models list
opensoul models list --provider <provider-name>

# Show current default model
opensoul models status
```

---

## Common Failures & Fixes

| Symptom                                | Likely cause                      | Fix                                                                                             |
| -------------------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------- |
| `401 Unauthorized` / `invalid api key` | Wrong or expired API key          | Re-generate key from provider console; run `opensoul models auth paste-token --provider <name>` |
| `ECONNREFUSED 127.0.0.1:11434`         | Ollama not running                | Run `ollama serve`                                                                              |
| `Model not found`                      | Model ID typo or model not pulled | Run `opensoul models list --provider <name>` or `ollama list`                                   |
| `429 Too Many Requests`                | Rate limit exceeded               | Check provider dashboard for quota; switch to a lower-tier model                                |
| OAuth token expired                    | Token needs refresh               | Re-run `opensoul models auth login --provider <name>`                                           |
| `Config hash mismatch`                 | Concurrent config edit            | Reload config page and re-apply                                                                 |
| `OPENSOUL_GATEWAY_TOKEN not set`       | Gateway auth missing              | Set `OPENSOUL_GATEWAY_TOKEN` or `gateway.auth.token` in config                                  |
| `env var not found in process`         | Key in shell but not gateway      | Add to `~/.opensoul/.env` or set `env.shellEnv: true` in config                                 |

---

## Next Steps

- [Model Providers reference](../concepts/model-providers.md) — full provider list with all config options
- [Models CLI reference](../cli/models.md) — all `opensoul models` commands
- [Model selection rules](../concepts/models.md) — how the gateway picks a model at runtime
- [Onboarding wizard](../start/onboarding.md) — interactive first-time setup
