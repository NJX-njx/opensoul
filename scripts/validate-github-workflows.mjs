#!/usr/bin/env node
/**
 * Validate .github workflows and actions locally.
 * Run: node scripts/validate-github-workflows.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const GITHUB = join(ROOT, ".github");

let errors = 0;

function log(msg, isError = false) {
  console.log(isError ? `\x1b[31m✗ ${msg}\x1b[0m` : `\x1b[32m✓ ${msg}\x1b[0m`);
  if (isError) {
    errors++;
  }
}

async function main() {
  console.log("Validating .github structure...\n");

  // 1. YAML syntax
  const workflows = [
    "workflows/ci.yml",
    "workflows/welcome.yml",
    "workflows/auto-response.yml",
    "workflows/labeler.yml",
    "workflows/workflow-sanity.yml",
    "workflows/docker-release.yml",
    "workflows/formal-conformance.yml",
    "workflows/install-smoke.yml",
    "actions/detect-docs-only/action.yml",
    "actions/setup-pnpm-store-cache/action.yml",
    "dependabot.yml",
    "labeler.yml",
    "ISSUE_TEMPLATE/config.yml",
  ];

  const { default: yaml } = await import("yaml");
  for (const rel of workflows) {
    const path = join(GITHUB, rel);
    if (!existsSync(path)) {
      log(`${rel}: file not found`, true);
      continue;
    }
    try {
      const content = readFileSync(path, "utf8");
      yaml.parse(content);
      log(`${rel}: valid YAML`);
    } catch (e) {
      log(`${rel}: ${e.message}`, true);
    }
  }

  // 2. Workflow structure checks
  const ciPath = join(GITHUB, "workflows/ci.yml");
  const ci = yaml.parse(readFileSync(ciPath, "utf8"));
  if (!ci.jobs?.["docs-scope"]) {
    log("ci.yml: missing docs-scope job", true);
  } else {
    log("ci.yml: docs-scope job present");
  }
  if (!ci.jobs?.["build-artifacts"]) {
    log("ci.yml: missing build-artifacts job", true);
  } else {
    log("ci.yml: build-artifacts job present");
  }

  // 3. Action references
  const detectPath = join(GITHUB, "actions/detect-docs-only/action.yml");
  const detect = yaml.parse(readFileSync(detectPath, "utf8"));
  if (detect.runs?.using !== "composite") {
    log("detect-docs-only: must use composite", true);
  } else {
    log("detect-docs-only: composite action OK");
  }

  // 4. Labeler config
  const labelerPath = join(GITHUB, "labeler.yml");
  const labeler = yaml.parse(readFileSync(labelerPath, "utf8"));
  const keys = Object.keys(labeler || {});
  if (keys.length < 5) {
    log("labeler.yml: expected multiple label rules", true);
  } else {
    log(`labeler.yml: ${keys.length} label rules`);
  }

  console.log("\n" + (errors === 0 ? "All checks passed." : `${errors} error(s) found.`));
  process.exit(errors > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
