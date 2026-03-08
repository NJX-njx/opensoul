import { describe, expect, it } from "vitest";
import { formatCreateSoulmateError } from "./create-soulmate-errors.ts";

describe("formatCreateSoulmateError", () => {
  it("returns reconnect guidance when gateway is disconnected", () => {
    expect(formatCreateSoulmateError({ connected: false })).toContain("Gateway is disconnected");
  });

  it("returns workspace remediation when path-related error appears", () => {
    expect(
      formatCreateSoulmateError({ connected: true, rawError: "workspace path permission denied" }),
    ).toContain("Workspace path is invalid or inaccessible");
  });

  it("returns fallback remediation when no raw error is available", () => {
    expect(formatCreateSoulmateError({ connected: true })).toContain("Confirm gateway is healthy");
  });
});
