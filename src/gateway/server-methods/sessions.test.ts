import { describe, expect, it, vi, beforeEach } from "vitest";
import { sessionsHandlers } from "./sessions.js";
import { ErrorCodes } from "../../gateway/protocol/index.js";
import type { GatewayRequestContext } from "./types.js";

vi.mock("../../config/config.js", () => ({
  loadConfig: vi.fn(),
}));

vi.mock("../../config/sessions.js", () => ({
  loadSessionStore: vi.fn(),
  snapshotSessionOrigin: vi.fn(),
  resolveMainSessionKey: vi.fn(),
  updateSessionStore: vi.fn(),
}));

vi.mock("../session-utils.js", () => ({
  listSessionsFromStore: vi.fn(),
  loadCombinedSessionStoreForGateway: vi.fn(),
  resolveGatewaySessionStoreTarget: vi.fn(),
  readSessionPreviewItemsFromTranscript: vi.fn(),
  loadSessionEntry: vi.fn(),
  resolveSessionModelRef: vi.fn(),
  resolveSessionTranscriptCandidates: vi.fn(),
  archiveFileOnDisk: vi.fn(),
}));

vi.mock("../sessions-resolve.js", () => ({
  resolveSessionKeyFromResolveParams: vi.fn(),
}));

vi.mock("../sessions-patch.js", () => ({
  applySessionsPatchToStore: vi.fn(),
}));

vi.mock("../../auto-reply/reply/queue.js", () => ({
  clearSessionQueues: vi.fn(),
}));

vi.mock("../../auto-reply/reply/abort.js", () => ({
  stopSubagentsForRequester: vi.fn(),
}));

vi.mock("../../agents/pi-embedded.js", () => ({
  abortEmbeddedPiRun: vi.fn(),
  waitForEmbeddedPiRunEnd: vi.fn().mockResolvedValue(true),
}));

import { loadConfig } from "../../config/config.js";
import { resolveSessionKeyFromResolveParams } from "../sessions-resolve.js";
import { listSessionsFromStore, loadCombinedSessionStoreForGateway } from "../session-utils.js";
import { updateSessionStore } from "../../config/sessions.js";

describe("sessionsHandlers", () => {
  const mockContext = {
    loadGatewayModelCatalog: vi.fn(),
  } as unknown as GatewayRequestContext;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("sessions.list", () => {
    it("responds with error for invalid params", () => {
      const respond = vi.fn();
      sessionsHandlers["sessions.list"]!({ params: { limit: "not-a-number" }, respond, context: mockContext });
      
      expect(respond).toHaveBeenCalledWith(false, undefined, expect.objectContaining({
        code: ErrorCodes.INVALID_REQUEST,
      }));
    });

    it("returns list of sessions successfully", () => {
      const respond = vi.fn();
      vi.mocked(loadConfig).mockReturnValue({} as any);
      vi.mocked(loadCombinedSessionStoreForGateway).mockReturnValue({ storePath: "/path", store: {} });
      vi.mocked(listSessionsFromStore).mockReturnValue({ sessions: [{ key: "foo", sessionId: "123" }] } as any);

      sessionsHandlers["sessions.list"]!({ params: { limit: 10 }, respond, context: mockContext });

      expect(respond).toHaveBeenCalledWith(true, { sessions: [{ key: "foo", sessionId: "123" }] }, undefined);
    });
  });

  describe("sessions.resolve", () => {
    it("responds with error for invalid params", () => {
      const respond = vi.fn();
      sessionsHandlers["sessions.resolve"]!({ params: { key: 123 }, respond, context: mockContext });
      expect(respond).toHaveBeenCalledWith(false, undefined, expect.objectContaining({
        code: ErrorCodes.INVALID_REQUEST,
      }));
    });

    it("responds with error when resolution fails", () => {
      const respond = vi.fn();
      vi.mocked(loadConfig).mockReturnValue({} as any);
      vi.mocked(resolveSessionKeyFromResolveParams).mockReturnValue({
        ok: false,
        error: { code: ErrorCodes.INVALID_REQUEST, message: "No match" },
      });

      sessionsHandlers["sessions.resolve"]!({ params: { key: "foo" }, respond, context: mockContext });
      expect(respond).toHaveBeenCalledWith(false, undefined, expect.objectContaining({
        code: ErrorCodes.INVALID_REQUEST,
      }));
    });

    it("returns successfully resolved key", () => {
      const respond = vi.fn();
      vi.mocked(loadConfig).mockReturnValue({} as any);
      vi.mocked(resolveSessionKeyFromResolveParams).mockReturnValue({
        ok: true,
        key: "canon-foo",
      });

      sessionsHandlers["sessions.resolve"]!({ params: { key: "foo" }, respond, context: mockContext });
      expect(respond).toHaveBeenCalledWith(true, { ok: true, key: "canon-foo" }, undefined);
    });
  });

  describe("sessions.delete", () => {
    it("responds with error for invalid params", async () => {
      const respond = vi.fn();
      await sessionsHandlers["sessions.delete"]!({ params: { key: 123 }, respond, context: mockContext });
      expect(respond).toHaveBeenCalledWith(false, undefined, expect.objectContaining({
        code: ErrorCodes.INVALID_REQUEST,
      }));
    });

    // We can add more comprehensive tests here if we wanted to mock all fs and queue logic completely.
  });

});
