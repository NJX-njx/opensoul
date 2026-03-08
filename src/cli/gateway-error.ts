import { buildGatewayConnectionDetails } from "../gateway/call.js";
import { colorize, isRich, theme } from "../terminal/theme.js";
import { formatCliCommand } from "./command-format.js";

/**
 * Emit a consistent, actionable error when the Gateway is unreachable.
 * Re-use this in every CLI that contacts the Gateway so users always get
 * the same troubleshooting guidance regardless of which command they ran.
 */
export function emitGatewayConnectionError(
  err: unknown,
  opts?: { url?: string },
): void {
  const rich = isRich();
  const details = buildGatewayConnectionDetails({ url: opts?.url });
  const message = "Gateway not reachable. Is it running and accessible?";
  const hint = `Hint: run \`${formatCliCommand("opensoul doctor")}\`.`;
  const errorText = err instanceof Error ? err.message : String(err);

  console.error(colorize(rich, theme.error, message));
  console.error(details.message);
  console.error(colorize(rich, theme.muted, `Error: ${errorText}`));
  console.error(colorize(rich, theme.muted, hint));
}
