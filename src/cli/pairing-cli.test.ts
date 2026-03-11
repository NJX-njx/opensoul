import { Command } from "commander";
import { beforeEach, describe, expect, it, vi } from "vitest";

const listChannelPairingRequests = vi.fn();
const approveChannelPairingCode = vi.fn();
const notifyPairingApproved = vi.fn();
const loadConfigMock = vi.fn().mockReturnValue({});
const listWhatsAppAccountIdsMock = vi.fn(() => ["default"]);
const pairingIdLabels: Record<string, string> = {
  telegram: "telegramUserId",
  discord: "discordUserId",
  whatsapp: "whatsappSenderId",
};
const normalizeChannelId = vi.fn((raw: string) => {
  if (!raw) {
    return null;
  }
  if (raw === "imsg") {
    return "imessage";
  }
  if (["telegram", "discord", "imessage", "whatsapp"].includes(raw)) {
    return raw;
  }
  return null;
});
const getPairingAdapter = vi.fn((channel: string) => ({
  idLabel: pairingIdLabels[channel] ?? "userId",
}));
const listPairingChannels = vi.fn(() => ["telegram", "discord", "imessage", "whatsapp"]);

vi.mock("../pairing/pairing-store.js", () => ({
  listChannelPairingRequests,
  approveChannelPairingCode,
}));

vi.mock("../channels/plugins/pairing.js", () => ({
  listPairingChannels,
  notifyPairingApproved,
  getPairingAdapter,
}));

vi.mock("../channels/plugins/index.js", () => ({
  normalizeChannelId,
}));

vi.mock("../config/config.js", () => ({
  loadConfig: loadConfigMock,
}));

vi.mock("../web/accounts.js", () => ({
  listWhatsAppAccountIds: listWhatsAppAccountIdsMock,
}));

describe("pairing cli", () => {
  beforeEach(() => {
    listChannelPairingRequests.mockReset();
    approveChannelPairingCode.mockReset();
    notifyPairingApproved.mockReset();
    loadConfigMock.mockReset().mockReturnValue({});
    listWhatsAppAccountIdsMock.mockReset().mockReturnValue(["default"]);
  });

  it("evaluates pairing channels when registering the CLI (not at import)", async () => {
    listPairingChannels.mockClear();

    const { registerPairingCli } = await import("./pairing-cli.js");
    expect(listPairingChannels).not.toHaveBeenCalled();

    const program = new Command();
    program.name("test");
    registerPairingCli(program);

    expect(listPairingChannels).toHaveBeenCalledTimes(1);
  });

  it("labels Telegram ids as telegramUserId", async () => {
    const { registerPairingCli } = await import("./pairing-cli.js");
    listChannelPairingRequests.mockResolvedValueOnce([
      {
        id: "123",
        code: "ABC123",
        createdAt: "2026-01-08T00:00:00Z",
        lastSeenAt: "2026-01-08T00:00:00Z",
        meta: { username: "peter" },
      },
    ]);

    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const program = new Command();
    program.name("test");
    registerPairingCli(program);
    await program.parseAsync(["pairing", "list", "--channel", "telegram"], {
      from: "user",
    });
    const output = log.mock.calls.map((call) => call.join(" ")).join("\n");
    expect(output).toContain("telegramUserId");
    expect(output).toContain("123");
  });

  it("accepts channel as positional for list", async () => {
    const { registerPairingCli } = await import("./pairing-cli.js");
    listChannelPairingRequests.mockResolvedValueOnce([]);

    const program = new Command();
    program.name("test");
    registerPairingCli(program);
    await program.parseAsync(["pairing", "list", "telegram"], { from: "user" });

    expect(listChannelPairingRequests).toHaveBeenCalledWith("telegram");
  });

  it("normalizes channel aliases", async () => {
    const { registerPairingCli } = await import("./pairing-cli.js");
    listChannelPairingRequests.mockResolvedValueOnce([]);

    const program = new Command();
    program.name("test");
    registerPairingCli(program);
    await program.parseAsync(["pairing", "list", "imsg"], { from: "user" });

    expect(normalizeChannelId).toHaveBeenCalledWith("imsg");
    expect(listChannelPairingRequests).toHaveBeenCalledWith("imessage");
  });

  it("accepts extension channels outside the registry", async () => {
    const { registerPairingCli } = await import("./pairing-cli.js");
    listChannelPairingRequests.mockResolvedValueOnce([]);

    const program = new Command();
    program.name("test");
    registerPairingCli(program);
    await program.parseAsync(["pairing", "list", "zalo"], { from: "user" });

    expect(normalizeChannelId).toHaveBeenCalledWith("zalo");
    expect(listChannelPairingRequests).toHaveBeenCalledWith("zalo");
  });

  it("labels Discord ids as discordUserId", async () => {
    const { registerPairingCli } = await import("./pairing-cli.js");
    listChannelPairingRequests.mockResolvedValueOnce([
      {
        id: "999",
        code: "DEF456",
        createdAt: "2026-01-08T00:00:00Z",
        lastSeenAt: "2026-01-08T00:00:00Z",
        meta: { tag: "Ada#0001" },
      },
    ]);

    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const program = new Command();
    program.name("test");
    registerPairingCli(program);
    await program.parseAsync(["pairing", "list", "--channel", "discord"], {
      from: "user",
    });
    const output = log.mock.calls.map((call) => call.join(" ")).join("\n");
    expect(output).toContain("discordUserId");
    expect(output).toContain("999");
  });

  it("accepts channel as positional for approve (npm-run compatible)", async () => {
    const { registerPairingCli } = await import("./pairing-cli.js");
    approveChannelPairingCode.mockResolvedValueOnce({
      id: "123",
      entry: {
        id: "123",
        code: "ABCDEFGH",
        createdAt: "2026-01-08T00:00:00Z",
        lastSeenAt: "2026-01-08T00:00:00Z",
      },
    });

    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const program = new Command();
    program.name("test");
    registerPairingCli(program);
    await program.parseAsync(["pairing", "approve", "telegram", "ABCDEFGH"], {
      from: "user",
    });

    expect(approveChannelPairingCode).toHaveBeenCalledWith({
      channel: "telegram",
      code: "ABCDEFGH",
    });
    expect(log).toHaveBeenCalledWith(expect.stringContaining("Approved"));
  });

  it("aggregates WhatsApp pairing requests across accounts by default", async () => {
    const { registerPairingCli } = await import("./pairing-cli.js");
    listWhatsAppAccountIdsMock.mockReturnValue(["default", "work"]);
    listChannelPairingRequests
      .mockResolvedValueOnce([
        {
          id: "+111",
          code: "AAA11111",
          createdAt: "2026-01-08T00:00:00Z",
          lastSeenAt: "2026-01-08T00:00:00Z",
        },
      ])
      .mockResolvedValueOnce([
        {
          id: "+222",
          code: "BBB22222",
          createdAt: "2026-01-09T00:00:00Z",
          lastSeenAt: "2026-01-09T00:00:00Z",
        },
      ]);

    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const program = new Command();
    program.name("test");
    registerPairingCli(program);
    await program.parseAsync(["pairing", "list", "--channel", "whatsapp", "--json"], {
      from: "user",
    });

    expect(listChannelPairingRequests).toHaveBeenNthCalledWith(
      1,
      "whatsapp",
      process.env,
      "default",
    );
    expect(listChannelPairingRequests).toHaveBeenNthCalledWith(2, "whatsapp", process.env, "work");
    const output = log.mock.calls.map((call) => call.join(" ")).join("\n");
    expect(output).toContain('"accountId": "default"');
    expect(output).toContain('"accountId": "work"');
  });

  it("approves WhatsApp code from the unique matching account when account is omitted", async () => {
    const { registerPairingCli } = await import("./pairing-cli.js");
    listWhatsAppAccountIdsMock.mockReturnValue(["default", "work"]);
    listChannelPairingRequests
      .mockResolvedValueOnce([
        {
          id: "+111",
          code: "AAA11111",
          createdAt: "2026-01-08T00:00:00Z",
          lastSeenAt: "2026-01-08T00:00:00Z",
        },
      ])
      .mockResolvedValueOnce([]);
    approveChannelPairingCode.mockResolvedValueOnce({
      id: "+111",
      entry: {
        id: "+111",
        code: "AAA11111",
        createdAt: "2026-01-08T00:00:00Z",
        lastSeenAt: "2026-01-08T00:00:00Z",
      },
    });

    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const program = new Command();
    program.name("test");
    registerPairingCli(program);
    await program.parseAsync(["pairing", "approve", "whatsapp", "AAA11111"], {
      from: "user",
    });

    expect(approveChannelPairingCode).toHaveBeenCalledWith({
      channel: "whatsapp",
      code: "AAA11111",
      accountId: "default",
    });
    const output = log.mock.calls.map((call) => call.join(" ")).join("\n");
    expect(output).toContain("account default");
  });

  it("rejects ambiguous WhatsApp approve requests without an account", async () => {
    const { registerPairingCli } = await import("./pairing-cli.js");
    listWhatsAppAccountIdsMock.mockReturnValue(["default", "work"]);
    listChannelPairingRequests
      .mockResolvedValueOnce([
        {
          id: "+111",
          code: "AAA11111",
          createdAt: "2026-01-08T00:00:00Z",
          lastSeenAt: "2026-01-08T00:00:00Z",
        },
      ])
      .mockResolvedValueOnce([
        {
          id: "+222",
          code: "AAA11111",
          createdAt: "2026-01-09T00:00:00Z",
          lastSeenAt: "2026-01-09T00:00:00Z",
        },
      ]);

    const program = new Command();
    program.name("test");
    registerPairingCli(program);

    await expect(
      program.parseAsync(["pairing", "approve", "whatsapp", "AAA11111"], {
        from: "user",
      }),
    ).rejects.toThrow(/Re-run with --account <id>/);
    expect(approveChannelPairingCode).not.toHaveBeenCalled();
  });
});
