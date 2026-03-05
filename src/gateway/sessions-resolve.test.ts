import { describe, expect, it, vi, beforeEach } from "vitest";
import { resolveSessionKeyFromResolveParams } from "./sessions-resolve.js";
import { ErrorCodes } from "./protocol/index.js";
import type { OpenSoulConfig } from "../config/config.js";

vi.mock("../config/sessions.js", () => ({
  loadSessionStore: vi.fn(),
}));

vi.mock("./session-utils.js", () => ({
  listSessionsFromStore: vi.fn(),
  loadCombinedSessionStoreForGateway: vi.fn(),
  resolveGatewaySessionStoreTarget: vi.fn(),
}));

import { loadSessionStore } from "../config/sessions.js";
import {
  listSessionsFromStore,
  loadCombinedSessionStoreForGateway,
  resolveGatewaySessionStoreTarget,
} from "./session-utils.js";

describe("sessions-resolve", () => {
  const mockCfg = {} as OpenSoulConfig;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns error if params have multiple selection criteria", () => {
    const res = resolveSessionKeyFromResolveParams({
      cfg: mockCfg,
      p: { key: "foo", sessionId: "bar" },
    });
    expect(res.ok).toBe(false);
    expect((res as any).error.code).toBe(ErrorCodes.INVALID_REQUEST);
    expect((res as any).error.message).toContain("not multiple");
  });

  it("returns error if params have no selection criteria", () => {
    const res = resolveSessionKeyFromResolveParams({
      cfg: mockCfg,
      p: {},
    });
    expect(res.ok).toBe(false);
    expect((res as any).error.code).toBe(ErrorCodes.INVALID_REQUEST);
    expect((res as any).error.message).toContain("is required");
  });

  describe("resolve by key", () => {
    it("returns error if key not found", () => {
      vi.mocked(resolveGatewaySessionStoreTarget).mockReturnValue({
        storePath: "/path/to",
        canonicalKey: "canon-foo",
        storeKeys: ["canon-foo"],
        agentId: "agent-a",
      });
      vi.mocked(loadSessionStore).mockReturnValue({});

      const res = resolveSessionKeyFromResolveParams({
        cfg: mockCfg,
        p: { key: "foo" },
      });
      expect(res.ok).toBe(false);
      expect((res as any).error.message).toContain("No session found");
    });

    it("returns ok with canonicalKey if key found", () => {
      vi.mocked(resolveGatewaySessionStoreTarget).mockReturnValue({
        storePath: "/path/to",
        canonicalKey: "canon-foo",
        storeKeys: ["canon-foo", "fallback"],
        agentId: "agent-a",
      });
      vi.mocked(loadSessionStore).mockReturnValue({
        "canon-foo": { sessionId: "foo-id" } as any,
      });

      const res = resolveSessionKeyFromResolveParams({
        cfg: mockCfg,
        p: { key: "foo" },
      });
      expect(res.ok).toBe(true);
      expect((res as any).key).toBe("canon-foo");
    });
  });

  describe("resolve by sessionId", () => {
    it("returns error if no match", () => {
      vi.mocked(loadCombinedSessionStoreForGateway).mockReturnValue({
        storePath: "/path/to",
        store: {},
      });
      vi.mocked(listSessionsFromStore).mockReturnValue({
        sessions: [],
      });

      const res = resolveSessionKeyFromResolveParams({
        cfg: mockCfg,
        p: { sessionId: "sid-123" },
      });
      expect(res.ok).toBe(false);
      expect((res as any).error.message).toContain("No session found");
    });

    it("returns error if multiple matches", () => {
      vi.mocked(loadCombinedSessionStoreForGateway).mockReturnValue({
        storePath: "/path/to",
        store: {},
      });
      vi.mocked(listSessionsFromStore).mockReturnValue({
        sessions: [
          { key: "key-1", sessionId: "sid-123" } as any,
          { key: "key-2", sessionId: "sid-123" } as any,
        ],
      });

      const res = resolveSessionKeyFromResolveParams({
        cfg: mockCfg,
        p: { sessionId: "sid-123" },
      });
      expect(res.ok).toBe(false);
      expect((res as any).error.message).toContain("Multiple sessions found");
    });

    it("returns ok if exact match", () => {
      vi.mocked(loadCombinedSessionStoreForGateway).mockReturnValue({
        storePath: "/path/to",
        store: {},
      });
      vi.mocked(listSessionsFromStore).mockReturnValue({
        sessions: [{ key: "key-1", sessionId: "sid-123" } as any],
      });

      const res = resolveSessionKeyFromResolveParams({
        cfg: mockCfg,
        p: { sessionId: "sid-123" },
      });
      expect(res.ok).toBe(true);
      expect((res as any).key).toBe("key-1");
    });
  });

  describe("resolve by label", () => {
    it("returns error if label is invalid", () => {
      vi.mocked(loadCombinedSessionStoreForGateway).mockReturnValue({
        storePath: "/path/to",
        store: {},
      });
      vi.mocked(listSessionsFromStore).mockReturnValue({
        sessions: [],
      });
      const res = resolveSessionKeyFromResolveParams({
        cfg: mockCfg,
        p: { label: "invalid label with spaces" },
      });
      expect(res.ok).toBe(false);
    });

    it("returns error if no match", () => {
      vi.mocked(loadCombinedSessionStoreForGateway).mockReturnValue({
        storePath: "/path/to",
        store: {},
      });
      vi.mocked(listSessionsFromStore).mockReturnValue({
        sessions: [],
      });

      const res = resolveSessionKeyFromResolveParams({
        cfg: mockCfg,
        p: { label: "mylabel" },
      });
      expect(res.ok).toBe(false);
    });

    it("returns error if multiple match", () => {
      vi.mocked(loadCombinedSessionStoreForGateway).mockReturnValue({
        storePath: "/path/to",
        store: {},
      });
      vi.mocked(listSessionsFromStore).mockReturnValue({
        sessions: [{ key: "k1" } as any, { key: "k2" } as any],
      });

      const res = resolveSessionKeyFromResolveParams({
        cfg: mockCfg,
        p: { label: "mylabel" },
      });
      expect(res.ok).toBe(false);
    });

    it("returns ok if exact match", () => {
      vi.mocked(loadCombinedSessionStoreForGateway).mockReturnValue({
        storePath: "/path/to",
        store: {},
      });
      vi.mocked(listSessionsFromStore).mockReturnValue({
        sessions: [{ key: "k1" } as any],
      });

      const res = resolveSessionKeyFromResolveParams({
        cfg: mockCfg,
        p: { label: "mylabel" },
      });
      expect(res.ok).toBe(true);
      expect((res as any).key).toBe("k1");
    });
  });
});
