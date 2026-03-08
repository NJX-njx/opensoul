export function formatCreateSoulmateError(params: {
  connected: boolean;
  rawError?: string | null;
}): string {
  const raw = params.rawError?.trim();

  if (!params.connected) {
    return "Gateway is disconnected. Reconnect first, then retry creating the soulmate.";
  }

  if (raw) {
    const lowered = raw.toLowerCase();
    if (lowered.includes("workspace") || lowered.includes("path")) {
      return "Workspace path is invalid or inaccessible. Choose a writable path, then retry.";
    }
    if (lowered.includes("exists") || lowered.includes("already")) {
      return "An agent with similar identity may already exist. Rename the soulmate and retry.";
    }
    return `Create failed: ${raw}. Check gateway logs, then retry.`;
  }

  return "Create failed. Confirm gateway is healthy and connected, then retry.";
}
