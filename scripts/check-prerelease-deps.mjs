import fs from "node:fs";
import path from "node:path";

const packageJsonPath = path.resolve("package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

const trackedPrereleaseDeps = new Map([
  ["@buape/carbon", "Upstream only ships beta builds currently; review monthly for stable channel."],
  ["@lydell/node-pty", "Required Windows behavior currently depends on beta line; re-evaluate each release."],
  ["@whiskeysockets/baileys", "Project currently tracks upstream RC branch used by WhatsApp ecosystem."],
  ["sqlite-vec", "Project currently depends on alpha sqlite-vec features; migrate when stable is available."],
  ["@typescript/native-preview", "Required by current tsgo type-check workflow; review on each TypeScript release."],
  ["rolldown", "Toolchain currently uses RC build; review on each minor release."],
]);

const prereleasePattern = /(?:^|[.-])(alpha|beta|rc|dev)(?:[.-]|\d|$)/i;
const sections = ["dependencies", "devDependencies", "peerDependencies"];

const found = [];
for (const section of sections) {
  const deps = packageJson[section] ?? {};
  for (const [name, version] of Object.entries(deps)) {
    if (typeof version === "string" && prereleasePattern.test(version)) {
      found.push({ name, version, section });
    }
  }
}

let failed = false;
for (const dep of found) {
  if (!trackedPrereleaseDeps.has(dep.name)) {
    failed = true;
    console.error(
      `[check-prerelease-deps] Untracked pre-release dependency: ${dep.name}@${dep.version} in ${dep.section}`,
    );
  }
}

for (const name of trackedPrereleaseDeps.keys()) {
  if (!found.some((dep) => dep.name === name)) {
    console.warn(`[check-prerelease-deps] Tracked package no longer pre-release: ${name}`);
  }
}

if (failed) {
  process.exit(1);
}

console.log(`[check-prerelease-deps] OK. Found ${found.length} tracked pre-release dependencies.`);
