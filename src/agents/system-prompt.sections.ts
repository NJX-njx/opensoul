import type { MemoryCitationsMode } from "../config/types.memory.js";

export function buildDocsSection(params: { docsPath?: string; isMinimal: boolean }): string[] {
  if (params.isMinimal || !params.docsPath?.trim()) {
    return [];
  }
  return [
    "## Documentation",
    `OpenSoul docs: ${params.docsPath}`,
    "For OpenSoul behavior, commands, config, or architecture: consult local docs first.",
    "",
  ];
}

export function buildSkillsSection(params: {
  skillsPrompt?: string;
  isMinimal: boolean;
  readToolName: string;
}): string[] {
  if (params.isMinimal || !params.skillsPrompt?.trim()) {
    return [];
  }
  const readToolName = params.readToolName.trim().toLowerCase() || "read";
  return [
    "## Skills",
    `- If exactly one skill clearly applies: read its SKILL.md at <location> with \`${readToolName}\`, then follow it.`,
    "- If multiple skills could apply, ask before reading any SKILL.md.",
    "- If no skills apply, proceed without them.",
    "",
    params.skillsPrompt.trim(),
    "",
  ];
}

export function buildMemorySection(params: {
  isMinimal: boolean;
  availableTools: Set<string>;
  citationsMode?: MemoryCitationsMode;
}): string[] {
  if (params.isMinimal || !params.availableTools.has("memory_search")) {
    return [];
  }
  const citationsMode = params.citationsMode ?? "auto";
  return [
    "## Memory Recall",
    "Use memory_search for prior facts or context when needed.",
    `Citations: ${citationsMode}.`,
    "",
  ];
}

export function buildReplyTagsSection(isMinimal: boolean): string[] {
  if (isMinimal) {
    return [];
  }
  return [
    "## Reply Tags",
    "Inline tags can control reply targeting or voice rendering:",
    "- [[reply_to_current]]",
    "- [[reply_to: <id>]]",
    "- [[audio_as_voice]]",
    "",
  ];
}

export function buildMessagingSection(params: {
  isMinimal: boolean;
  availableTools: Set<string>;
  messageChannelOptions: string;
  inlineButtonsEnabled: boolean;
  runtimeChannel?: string;
  messageToolHints?: string[];
}): string[] {
  if (params.isMinimal || !params.availableTools.has("message")) {
    return [];
  }
  const hints = (params.messageToolHints ?? []).map((hint) => hint.trim()).filter(Boolean);
  return [
    "## Messaging",
    "### message tool",
    "Use the message tool to send outbound messages or perform channel actions.",
    "If you do not need to send a message, respond with ONLY: NO_REPLY",
    params.runtimeChannel ? `Current channel: ${params.runtimeChannel}` : "",
    `Available channels: ${params.messageChannelOptions}`,
    params.inlineButtonsEnabled ? "Inline buttons: supported." : "Inline buttons: unavailable.",
    ...hints,
    "",
  ].filter(Boolean);
}

export function buildVoiceSection(params: { isMinimal: boolean; ttsHint?: string }): string[] {
  if (params.isMinimal || !params.ttsHint?.trim()) {
    return [];
  }
  return ["## Voice (TTS)", params.ttsHint.trim(), ""];
}

export function buildUserIdentitySection(ownerLine?: string, isMinimal?: boolean): string[] {
  if (isMinimal || !ownerLine?.trim()) {
    return [];
  }
  return ["## User Identity", ownerLine.trim(), ""];
}

export function buildTimeSection(params: { userTimezone?: string; isMinimal?: boolean }): string[] {
  if (params.isMinimal || !params.userTimezone?.trim()) {
    return [];
  }
  return [
    "## Current Date & Time",
    `Time zone: ${params.userTimezone}`,
    "Use session_status or message timestamps for the current date and time.",
    "",
  ];
}
