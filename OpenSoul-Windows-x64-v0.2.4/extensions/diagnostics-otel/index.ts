import type { OpenSoulPluginApi } from "opensoul/plugin-sdk";
import { emptyPluginConfigSchema } from "opensoul/plugin-sdk";
import { createDiagnosticsOtelService } from "./src/service.js";

const plugin = {
  id: "diagnostics-otel",
  name: "Diagnostics OpenTelemetry",
  description: "Export diagnostics events to OpenTelemetry",
  configSchema: emptyPluginConfigSchema(),
  register(api: OpenSoulPluginApi) {
    api.registerService(createDiagnosticsOtelService());
  },
};

export default plugin;
