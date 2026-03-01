#!/usr/bin/env node
/**
 * One-off script to add Minimax API key for dev agent.
 * Usage: OPENSOUL_PROFILE=dev node scripts/add-minimax-api.mjs <api-key>
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const apiKey = process.argv[2]?.trim();
if (!apiKey) {
  console.error("Usage: node scripts/add-minimax-api.mjs <minimax-api-key>");
  process.exit(1);
}

const homedir = os.homedir();
const stateDir = path.join(homedir, ".opensoul-dev");
const agentDir = path.join(stateDir, "agents", "dev", "agent");
const authPath = path.join(agentDir, "auth-profiles.json");
const configPath = path.join(stateDir, "opensoul.json");

// 1. Ensure agent dir exists and write auth-profiles.json
fs.mkdirSync(agentDir, { recursive: true });
let authStore = { version: 1, profiles: {} };
if (fs.existsSync(authPath)) {
  authStore = JSON.parse(fs.readFileSync(authPath, "utf-8"));
}
authStore.profiles = authStore.profiles || {};
authStore.profiles["minimax:default"] = {
  type: "api_key",
  provider: "minimax",
  key: apiKey,
};
fs.writeFileSync(authPath, JSON.stringify(authStore, null, 2), "utf-8");
console.log("Minimax API key written to auth-profiles.json");

// 2. Update config: add minimax provider and set as primary model
const cfg = JSON.parse(fs.readFileSync(configPath, "utf-8"));
const agents = cfg.agents || {};
const defaults = agents.defaults || {};
const model = defaults.model || {};
defaults.model = {
  ...model,
  primary: "minimax/MiniMax-M2.1",
};
agents.defaults = defaults;
cfg.agents = agents;

const providers = cfg.models?.providers || {};
providers.minimax = {
  baseUrl: "https://api.minimaxi.com/anthropic",
  api: "anthropic-messages",
  models: [
    {
      id: "MiniMax-M2.1",
      name: "MiniMax M2.1",
      reasoning: false,
      input: ["text"],
      cost: { input: 15, output: 60, cacheRead: 2, cacheWrite: 10 },
      contextWindow: 200000,
      maxTokens: 8192,
    },
  ],
};
cfg.models = cfg.models || {};
cfg.models.providers = providers;
cfg.models.mode = cfg.models.mode || "merge";

fs.writeFileSync(configPath, JSON.stringify(cfg, null, 2), "utf-8");
console.log("Config updated: primary model set to minimax/MiniMax-M2.1");

console.log("Done. Restart the gateway to apply changes.");
