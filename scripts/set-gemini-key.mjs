#!/usr/bin/env node
/**
 * One-off script: write Gemini API key to auth-profiles.json (agent credentials store).
 * Usage: node scripts/set-gemini-key.mjs <key>   OR   pnpm exec tsx scripts/set-gemini-key.ts <key>
 */
const key = process.argv[2];
if (!key || !key.trim()) {
  console.error("Usage: node scripts/set-gemini-key.mjs <GEMINI_API_KEY>");
  process.exit(1);
}

// Dynamic import from source when run with tsx
const mod = await import("../src/commands/onboard-auth.credentials.ts");
await mod.setGeminiApiKey(key.trim());
console.log("Gemini API key written to auth-profiles.json.");
