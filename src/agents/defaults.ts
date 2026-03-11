// Defaults for agent metadata when upstream does not supply them.
// Model id uses the configured provider/model runtime catalog.
export const DEFAULT_PROVIDER = "openai";
export const DEFAULT_MODEL = "gpt-5.2";
// Conservative fallback used when model metadata is unavailable.
export const DEFAULT_CONTEXT_TOKENS = 200_000;
