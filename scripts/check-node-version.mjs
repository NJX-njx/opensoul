/**
 * preinstall check — ensures Node >= 22.12.0 with a friendly message.
 * Runs as a lifecycle script; must work on the oldest Node the user might have.
 */

const required = [22, 12, 0];
const current = process.versions.node.split(".").map(Number);

const meetsMinimum =
  current[0] > required[0] ||
  (current[0] === required[0] &&
    (current[1] > required[1] || (current[1] === required[1] && current[2] >= required[2])));

if (!meetsMinimum) {
  console.error(
    `\n` +
      `  ╔══════════════════════════════════════════════════════════════╗\n` +
      `  ║  OpenSoul requires Node.js >= 22.12.0                      ║\n` +
      `  ║  You are running Node.js ${process.versions.node.padEnd(36)}║\n` +
      `  ║                                                            ║\n` +
      `  ║  Please upgrade Node.js:                                   ║\n` +
      `  ║    https://nodejs.org/                                     ║\n` +
      `  ║    or use nvm: nvm install 22                              ║\n` +
      `  ╚══════════════════════════════════════════════════════════════╝\n`,
  );
  process.exit(1);
}
