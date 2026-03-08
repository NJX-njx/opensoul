import type { Command } from "commander";
import type { ProgramContext } from "./context.js";
import { formatDocsLink } from "../../terminal/links.js";
import { isRich, theme } from "../../terminal/theme.js";
import { formatCliBannerLine, hasEmittedCliBanner } from "../banner.js";
import { replaceCliName, resolveCliName } from "../cli-name.js";

const CLI_NAME = resolveCliName();

const EXAMPLES = [
  [
    "opensoul channels login --verbose",
    "Link personal WhatsApp Web and show QR + connection logs.",
  ],
  [
    'opensoul message send --target +15555550123 --message "Hi" --json',
    "Send via your web session and print JSON result.",
  ],
  ["opensoul gateway --port 18789", "Run the WebSocket Gateway locally."],
  ["opensoul --dev gateway", "Run a dev Gateway (isolated state/config) on ws://127.0.0.1:19001."],
  ["opensoul gateway --force", "Kill anything bound to the default gateway port, then start it."],
  ["opensoul gateway ...", "Gateway control via WebSocket."],
  [
    'opensoul agent --to +15555550123 --message "Run summary" --deliver',
    "Talk directly to the agent using the Gateway; optionally send the WhatsApp reply.",
  ],
  [
    'opensoul message send --channel telegram --target @mychat --message "Hi"',
    "Send via your Telegram bot.",
  ],
] as const;

export function configureProgramHelp(program: Command, ctx: ProgramContext) {
  program
    .name(CLI_NAME)
    .description("")
    .version(ctx.programVersion)
    .option(
      "--dev",
      "Dev profile: isolate state under ~/.opensoul-dev, default gateway port 19001, and shift derived ports (browser/canvas)",
    )
    .option(
      "--profile <name>",
      "Use a named profile (isolates OPENSOUL_STATE_DIR/OPENSOUL_CONFIG_PATH under ~/.opensoul-<name>)",
    );

  program.option("--no-color", "Disable ANSI colors", false);

  program.configureHelp({
    // sort options and subcommands alphabetically
    sortSubcommands: true,
    sortOptions: true,
    optionTerm: (option) => theme.option(option.flags),
    subcommandTerm: (cmd) => theme.command(cmd.name()),
  });

  program.configureOutput({
    writeOut: (str) => {
      const colored = str
        .replace(/^Usage:/gm, theme.heading("Usage:"))
        .replace(/^Options:/gm, theme.heading("Options:"))
        .replace(/^Commands:/gm, theme.heading("Commands:"));
      process.stdout.write(colored);
    },
    writeErr: (str) => process.stderr.write(str),
    outputError: (str, write) => write(theme.error(str)),
  });

  if (
    process.argv.includes("-V") ||
    process.argv.includes("--version") ||
    process.argv.includes("-v")
  ) {
    console.log(ctx.programVersion);
    process.exit(0);
  }

  program.addHelpText("beforeAll", () => {
    if (hasEmittedCliBanner()) {
      return "";
    }
    const rich = isRich();
    const line = formatCliBannerLine(ctx.programVersion, { richTty: rich });
    return `\n${line}\n`;
  });

  const fmtExamples = EXAMPLES.map(
    ([cmd, desc]) => `  ${theme.command(replaceCliName(cmd, CLI_NAME))}\n    ${theme.muted(desc)}`,
  ).join("\n");

  const ENV_VARS = [
    ["OPENSOUL_GATEWAY_TOKEN", "Gateway authentication token"],
    ["OPENSOUL_GATEWAY_PASSWORD", "Gateway password (alternative to token)"],
    ["OPENSOUL_GATEWAY_PORT", "Gateway port (default: 18789)"],
    ["OPENSOUL_PROFILE", "Named profile (isolates state/config)"],
    ["OPENSOUL_STATE_DIR", "Override state directory path"],
    ["OPENSOUL_CONFIG_PATH", "Override config file path"],
    ["OPENSOUL_GIT_DIR", "Override git checkout directory for dev channel"],
    ["OPENSOUL_SKIP_CHANNELS", "Skip loading channel extensions"],
    ["OPENSOUL_HIDE_BANNER", "Suppress CLI banner output"],
    ["OPENSOUL_NON_INTERACTIVE", "Disable interactive prompts (CI/automation)"],
    ["OPENSOUL_DISABLE_LAZY_SUBCOMMANDS", "Force eager command registration"],
    ["OPENSOUL_DISABLE_ROUTE_FIRST", "Disable optimized route-first logic"],
  ] as const;

  const fmtEnvVars = ENV_VARS.map(
    ([name, desc]) => `  ${theme.option(name)}\n    ${theme.muted(desc)}`,
  ).join("\n");

  program.addHelpText("afterAll", ({ command }) => {
    if (command !== program) {
      return "";
    }
    const docs = formatDocsLink("/cli", "docs.opensoul.ai/cli");
    return `\n${theme.heading("Examples:")}\n${fmtExamples}\n\n${theme.heading("Environment Variables:")}\n${fmtEnvVars}\n\n${theme.muted("Docs:")} ${docs}\n`;
  });
}
