import { describe, expect, it, vi, beforeEach } from "vitest";
import { channelsHandlers } from "./channels.js";
import { ErrorCodes } from "../../gateway/protocol/index.js";
import type { GatewayRequestContext } from "./types.js";

vi.mock("../../config/config.js", () => ({
  loadConfig: vi.fn(),
  readConfigFileSnapshot: vi.fn(),
}));

vi.mock("../../channels/plugins/index.js", () => ({
  listChannelPlugins: vi.fn(),
  getChannelPlugin: vi.fn(),
  normalizeChannelId: vi.fn((id: string) => id),
}));

vi.mock("../../channels/plugins/catalog.js", () => ({
  buildChannelUiCatalog: vi.fn(),
}));

vi.mock("../../channels/plugins/status.js", () => ({
  buildChannelAccountSnapshot: vi.fn(),
}));

vi.mock("../../infra/channel-activity.js", () => ({
  getChannelActivity: vi.fn(),
}));

vi.mock("../../channels/plugins/helpers.js", () => ({
  resolveChannelDefaultAccountId: vi.fn(),
}));

import { loadConfig, readConfigFileSnapshot } from "../../config/config.js";
import { listChannelPlugins, getChannelPlugin } from "../../channels/plugins/index.js";
import { buildChannelUiCatalog } from "../../channels/plugins/catalog.js";

describe("channelsHandlers", () => {
  const mockContext = {
    getRuntimeSnapshot: vi.fn().mockReturnValue({
      channelAccounts: {},
      channels: {},
    }),
    stopChannel: vi.fn(),
    markChannelLoggedOut: vi.fn(),
  } as unknown as GatewayRequestContext;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("channels.status", () => {
    it("responds with error for invalid params", async () => {
      const respond = vi.fn();
      await channelsHandlers["channels.status"]!({ params: { probe: "not-a-bool" }, respond, context: mockContext });
      expect(respond).toHaveBeenCalledWith(false, undefined, expect.objectContaining({
        code: ErrorCodes.INVALID_REQUEST,
      }));
    });

    it("returns correctly populated target", async () => {
      const respond = vi.fn();
      vi.mocked(loadConfig).mockReturnValue({} as any);
      vi.mocked(listChannelPlugins).mockReturnValue([]);
      vi.mocked(buildChannelUiCatalog).mockReturnValue({
        order: [],
        labels: {},
        detailLabels: {},
        systemImages: {},
        entries: {},
      } as any);

      await channelsHandlers["channels.status"]!({ params: {}, respond, context: mockContext });

      expect(respond).toHaveBeenCalledWith(true, expect.objectContaining({
        channelOrder: [],
        channels: {},
        channelAccounts: {},
        channelDefaultAccountId: {},
      }), undefined);
    });
  });

  describe("channels.logout", () => {
    it("responds with error for invalid params", async () => {
      const respond = vi.fn();
      await channelsHandlers["channels.logout"]!({ params: { channel: 123 }, respond, context: mockContext });
      expect(respond).toHaveBeenCalledWith(false, undefined, expect.objectContaining({
        code: ErrorCodes.INVALID_REQUEST,
      }));
    });

    it("responds with error if channel does not support logout", async () => {
      const respond = vi.fn();
      vi.mocked(getChannelPlugin).mockReturnValue({ gateway: {} } as any);
      
      await channelsHandlers["channels.logout"]!({ params: { channel: "discord" }, respond, context: mockContext });
      expect(respond).toHaveBeenCalledWith(false, undefined, expect.objectContaining({
        message: expect.stringMatching(/does not support logout/),
      }));
    });

    it("logs out supported channel correctly", async () => {
      const respond = vi.fn();
      const mockPlugin = {
        config: {
          listAccountIds: vi.fn().mockReturnValue(["id"]),
          resolveAccount: vi.fn().mockReturnValue({}),
        },
        gateway: {
          logoutAccount: vi.fn().mockResolvedValue({ cleared: true, loggedOut: true }),
        },
      };
      
      vi.mocked(getChannelPlugin).mockReturnValue(mockPlugin as any);
      vi.mocked(readConfigFileSnapshot).mockResolvedValue({ valid: true, config: {} } as any);

      await channelsHandlers["channels.logout"]!({ params: { channel: "discord" }, respond, context: mockContext });
      
      expect(mockContext.stopChannel).toHaveBeenCalled();
      expect(mockContext.markChannelLoggedOut).toHaveBeenCalled();
      expect(respond).toHaveBeenCalledWith(true, expect.objectContaining({ cleared: true }), undefined);
    });
  });
});
