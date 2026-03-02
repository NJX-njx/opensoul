import type { OpenSoulPluginApi } from "../../src/plugins/types.js";
import { createLlmTaskTool } from "./src/llm-task-tool.js";

export default function register(api: OpenSoulPluginApi) {
  api.registerTool(createLlmTaskTool(api), { optional: true });
}
