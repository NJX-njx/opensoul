---
summary: "Where OpenSoul loads environment variables and the precedence order"
read_when:
  - You need to know which env vars are loaded, and in what order
  - You are debugging missing API keys in the Gateway
  - You are documenting provider auth or deployment environments
title: "Environment Variables"
---

# Environment variables

OpenSoul pulls environment variables from multiple sources. The rule is **never override existing values**.

## Precedence (highest → lowest)

1. **Process environment** (what the Gateway process already has from the parent shell/daemon).
2. **`.env` in the current working directory** (dotenv default; does not override).
3. **Global `.env`** at `~/.opensoul/.env` (aka `$OPENSOUL_STATE_DIR/.env`; does not override).
4. **Config `env` block** in `~/.opensoul/opensoul.json` (applied only if missing).
5. **Optional login-shell import** (`env.shellEnv.enabled` or `OPENSOUL_LOAD_SHELL_ENV=1`), applied only for missing expected keys.

If the config file is missing entirely, step 4 is skipped; shell import still runs if enabled.

## Config `env` block

Two equivalent ways to set inline env vars (both are non-overriding):

```json5
{
  env: {
    OPENROUTER_API_KEY: "sk-or-...",
    vars: {
      GROQ_API_KEY: "gsk-...",
    },
  },
}
```

## Shell env import

`env.shellEnv` runs your login shell and imports only **missing** expected keys:

```json5
{
  env: {
    shellEnv: {
      enabled: true,
      timeoutMs: 15000,
    },
  },
}
```

Env var equivalents:

- `OPENSOUL_LOAD_SHELL_ENV=1`
- `OPENSOUL_SHELL_ENV_TIMEOUT_MS=15000`

## Env var substitution in config

You can reference env vars directly in config string values using `${VAR_NAME}` syntax:

```json5
{
  models: {
    providers: {
      "vercel-gateway": {
        apiKey: "${VERCEL_GATEWAY_API_KEY}",
      },
    },
  },
}
```

See [Configuration: Env var substitution](/gateway/configuration#env-var-substitution-in-config) for full details.

## `OPENSOUL_*` reference

These are the recognised `OPENSOUL_*` environment variables (also shown by `opensoul --help`):

| Variable | Purpose |
|----------|--------|
| `OPENSOUL_GATEWAY_TOKEN` | Gateway authentication token |
| `OPENSOUL_GATEWAY_PASSWORD` | Gateway password (alternative to token) |
| `OPENSOUL_GATEWAY_PORT` | Gateway port (default: 18789) |
| `OPENSOUL_PROFILE` | Named profile (isolates state/config) |
| `OPENSOUL_STATE_DIR` | Override state directory path |
| `OPENSOUL_CONFIG_PATH` | Override config file path |
| `OPENSOUL_GIT_DIR` | Override git checkout directory for dev channel |
| `OPENSOUL_SKIP_CHANNELS` | Skip loading channel extensions |
| `OPENSOUL_HIDE_BANNER` | Suppress CLI banner output |
| `OPENSOUL_NON_INTERACTIVE` | Disable interactive prompts (CI/automation) |
| `OPENSOUL_DISABLE_LAZY_SUBCOMMANDS` | Force eager command registration |
| `OPENSOUL_DISABLE_ROUTE_FIRST` | Disable optimised route-first logic |
| `OPENSOUL_LOAD_SHELL_ENV` | Import missing keys from login shell (see above) |
| `OPENSOUL_SHELL_ENV_TIMEOUT_MS` | Timeout for shell env import (default: 15000) |

## Related

- [Gateway configuration](/gateway/configuration)
- [FAQ: env vars and .env loading](/help/faq#env-vars-and-env-loading)
- [Models overview](/concepts/models)
