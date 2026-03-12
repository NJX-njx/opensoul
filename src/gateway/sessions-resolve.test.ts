import { beforeEach, describe, expect, it, vi } from "vitest";
import type { OpenSoulConfig } from "../config/config.js";

const mocks = vi.hoisted(() => ({
  loadSessionStore: vi.fn(),
  parseSessionLabel: vi.fn(),
  resolveGatewaySessionStoreTarget: vi.fn(),
  loadCombinedSessionStoreForGateway: vi.fn(),
  listSessionsFromStore: vi.fn(),
}));

vi.mock("../config/sessions.js", async () => {
  const actual =
    await vi.importActual<typeof import("../config/sessions.js")>("../config/sessions.js");
  return {
    ...actual,
    loadSessionStore: mocks.loadSessionStore,
  };
});

vi.mock("../sessions/session-label.js", async () => {
  const actual = await vi.importActual<typeof import("../sessions/session-label.js")>(
    "../sessions/session-label.js",
  );
  return {
    ...actual,
    parseSessionLabel: mocks.parseSessionLabel,
  };
});

vi.mock("./session-utils.js", async () => {
  const actual = await vi.importActual<typeof import("./session-utils.js")>("./session-utils.js");
  return {
    ...actual,
    resolveGatewaySessionStoreTarget: mocks.resolveGatewaySessionStoreTarget,
    loadCombinedSessionStoreForGateway: mocks.loadCombinedSessionStoreForGateway,
    listSessionsFromStore: mocks.listSessionsFromStore,
  };
});

import { resolveSessionKeyFromResolveParams } from "./sessions-resolve.js";

describe("resolveSessionKeyFromResolveParams", () => {
  const cfg = {} as OpenSoulConfig;

  beforeEach(() => {
    vi.clearAllMocks();

    mocks.resolveGatewaySessionStoreTarget.mockReturnValue({
      agentId: "main",
      storePath: "C:/tmp/sessions.json",
      canonicalKey: "agent:main:main",
      storeKeys: ["agent:main:main", "main"],
    });

    mocks.loadCombinedSessionStoreForGateway.mockReturnValue({
      storePath: "(multiple)",
      store: {},
    });

    mocks.parseSessionLabel.mockReturnValue({ ok: true, label: "ops" });
  });

  it("rejects requests with multiple selectors", () => {
    const result = resolveSessionKeyFromResolveParams({
      cfg,
      p: { key: "k", sessionId: "s" },
    });
    expect(result.ok).toBe(false);
    if (result.ok) {
      return;
    }
    expect(result.error.message).toContain("not multiple");
  });

  it("resolves canonical key when a key alias exists in store", () => {
    mocks.loadSessionStore.mockReturnValue({
      main: { updatedAt: 1 },
    });

    const result = resolveSessionKeyFromResolveParams({
      cfg,
      p: { key: "main" },
    });

    expect(result).toEqual({ ok: true, key: "agent:main:main" });
  });

  it("returns not found when key does not exist", () => {
    mocks.loadSessionStore.mockReturnValue({});

    const result = resolveSessionKeyFromResolveParams({
      cfg,
      p: { key: "missing" },
    });

    expect(result.ok).toBe(false);
    if (result.ok) {
      return;
    }
    expect(result.error.message).toContain("No session found: missing");
  });

  it("rejects ambiguous sessionId matches", () => {
    mocks.listSessionsFromStore.mockReturnValue({
      sessions: [
        { key: "agent:main:a", sessionId: "same" },
        { key: "agent:main:b", sessionId: "same" },
      ],
      total: 2,
    });

    const result = resolveSessionKeyFromResolveParams({
      cfg,
      p: { sessionId: "same" },
    });

    expect(result.ok).toBe(false);
    if (result.ok) {
      return;
    }
    expect(result.error.message).toContain("Multiple sessions found for sessionId");
  });

  it("returns validation error for invalid labels", () => {
    mocks.parseSessionLabel.mockReturnValue({
      ok: false,
      error: "invalid label",
    });

    const result = resolveSessionKeyFromResolveParams({
      cfg,
      p: { label: "bad label" },
    });

    expect(result.ok).toBe(false);
    if (result.ok) {
      return;
    }
    expect(result.error.message).toContain("invalid label");
  });

  it("resolves exactly one label match", () => {
    mocks.listSessionsFromStore.mockReturnValue({
      sessions: [{ key: "agent:main:ops" }],
      total: 1,
    });

    const result = resolveSessionKeyFromResolveParams({
      cfg,
      p: { label: "ops" },
    });

    expect(result).toEqual({ ok: true, key: "agent:main:ops" });
  });
});
