import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { OpenSoulApp } from "./app.ts";
import "../styles.css";

// oxlint-disable-next-line typescript/unbound-method
const originalConnect = OpenSoulApp.prototype.connect;

function mountApp(pathname: string) {
  window.history.replaceState({}, "", pathname);
  const app = document.createElement("opensoul-app") as OpenSoulApp;
  document.body.append(app);
  return app;
}

function nextFrame() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

function findNavGroupByLabel(app: OpenSoulApp, label: string): HTMLElement | undefined {
  return Array.from(app.querySelectorAll<HTMLElement>(".nav-group")).find(
    (group) => group.querySelector(".nav-label__text")?.textContent?.trim() === label,
  );
}

beforeEach(() => {
  OpenSoulApp.prototype.connect = () => {
    // no-op: avoid real gateway WS connections in browser tests
  };
  window.__OPENSOUL_CONTROL_UI_BASE_PATH__ = undefined;
  localStorage.clear();
  document.body.innerHTML = "";
});

afterEach(() => {
  OpenSoulApp.prototype.connect = originalConnect;
  window.__OPENSOUL_CONTROL_UI_BASE_PATH__ = undefined;
  localStorage.clear();
  document.body.innerHTML = "";
});

describe("control UI routing", () => {
  it("hydrates the tab from the location", async () => {
    const app = mountApp("/sessions");
    await app.updateComplete;

    expect(app.tab).toBe("sessions");
    expect(window.location.pathname).toBe("/sessions");
  });

  it("respects /ui base paths", async () => {
    const app = mountApp("/ui/cron");
    await app.updateComplete;

    expect(app.basePath).toBe("/ui");
    expect(app.tab).toBe("cron");
    expect(window.location.pathname).toBe("/ui/cron");
  });

  it("infers nested base paths", async () => {
    const app = mountApp("/apps/opensoul/cron");
    await app.updateComplete;

    expect(app.basePath).toBe("/apps/opensoul");
    expect(app.tab).toBe("cron");
    expect(window.location.pathname).toBe("/apps/opensoul/cron");
  });

  it("honors explicit base path overrides", async () => {
    window.__OPENSOUL_CONTROL_UI_BASE_PATH__ = "/opensoul";
    const app = mountApp("/opensoul/sessions");
    await app.updateComplete;

    expect(app.basePath).toBe("/opensoul");
    expect(app.tab).toBe("sessions");
    expect(window.location.pathname).toBe("/opensoul/sessions");
  });

  it("updates the URL when clicking nav items", async () => {
    const app = mountApp("/chat");
    await app.updateComplete;

    const link = app.querySelector<HTMLAnchorElement>('a.nav-item[href="/channels"]');
    expect(link).not.toBeNull();
    link?.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, button: 0 }));

    await app.updateComplete;
    expect(app.tab).toBe("channels");
    expect(window.location.pathname).toBe("/channels");
  });

  it("collapses Assist group even when Chat is the active tab", async () => {
    const app = mountApp("/chat");
    await app.updateComplete;

    const assistGroup = findNavGroupByLabel(app, "Assist");
    expect(assistGroup).toBeDefined();
    const toggle = assistGroup?.querySelector<HTMLButtonElement>("button.nav-label");
    expect(toggle).not.toBeNull();
    toggle?.click();

    await app.updateComplete;

    expect(app.settings.navGroupsCollapsed.Assist).toBe(true);
    const nextAssistGroup = findNavGroupByLabel(app, "Assist");
    expect(nextAssistGroup?.classList.contains("nav-group--collapsed")).toBe(true);

    const items = nextAssistGroup?.querySelector<HTMLElement>(".nav-group__items");
    expect(items).not.toBeNull();
    if (items) {
      expect(getComputedStyle(items).display).toBe("none");
    }
  });

  it("keeps chat and nav usable on narrow viewports", async () => {
    const app = mountApp("/chat");
    await app.updateComplete;

    expect(window.matchMedia("(max-width: 768px)").matches).toBe(true);

    const split = app.querySelector(".chat-split-container");
    expect(split).not.toBeNull();
    if (split) {
      expect(getComputedStyle(split).position).not.toBe("fixed");
    }

    const chatMain = app.querySelector(".chat-main");
    expect(chatMain).not.toBeNull();
    if (chatMain) {
      expect(getComputedStyle(chatMain).display).not.toBe("none");
    }

    if (split) {
      split.classList.add("chat-split-container--open");
      await app.updateComplete;
      expect(getComputedStyle(split).position).toBe("fixed");
    }
    if (chatMain) {
      expect(getComputedStyle(chatMain).display).toBe("none");
    }
  });

  it("auto-scrolls chat history to the latest message", async () => {
    const app = mountApp("/chat");
    await app.updateComplete;

    const initialContainer: HTMLElement | null = app.querySelector(".chat-thread");
    expect(initialContainer).not.toBeNull();
    if (!initialContainer) {
      return;
    }
    initialContainer.style.maxHeight = "180px";
    initialContainer.style.overflow = "auto";

    app.chatMessages = Array.from({ length: 60 }, (_, index) => ({
      role: "assistant",
      content: `Line ${index} - ${"x".repeat(200)}`,
      timestamp: Date.now() + index,
    }));

    await app.updateComplete;
    for (let i = 0; i < 6; i++) {
      await nextFrame();
    }

    const container = app.querySelector(".chat-thread");
    expect(container).not.toBeNull();
    if (!container) {
      return;
    }
    const maxScroll = container.scrollHeight - container.clientHeight;
    expect(maxScroll).toBeGreaterThan(0);
    for (let i = 0; i < 10; i++) {
      if (container.scrollTop === maxScroll) {
        break;
      }
      await nextFrame();
    }
    expect(container.scrollTop).toBe(maxScroll);
  });

  it("hydrates token from URL params and strips it", async () => {
    const app = mountApp("/ui/overview?token=abc123");
    await app.updateComplete;

    expect(app.settings.token).toBe("abc123");
    expect(window.location.pathname).toBe("/ui/overview");
    expect(window.location.search).toBe("");
  });

  it("strips password URL params without importing them", async () => {
    const app = mountApp("/ui/overview?password=sekret");
    await app.updateComplete;

    expect(app.password).toBe("");
    expect(window.location.pathname).toBe("/ui/overview");
    expect(window.location.search).toBe("");
  });

  it("hydrates token from URL params even when settings already set", async () => {
    localStorage.setItem(
      "opensoul.control.settings.v1",
      JSON.stringify({ token: "existing-token" }),
    );
    const app = mountApp("/ui/overview?token=abc123");
    await app.updateComplete;

    expect(app.settings.token).toBe("abc123");
    expect(window.location.pathname).toBe("/ui/overview");
    expect(window.location.search).toBe("");
  });

  it("hydrates token from URL hash and strips it", async () => {
    const app = mountApp("/ui/overview#token=abc123");
    await app.updateComplete;

    expect(app.settings.token).toBe("abc123");
    expect(window.location.pathname).toBe("/ui/overview");
    expect(window.location.hash).toBe("");
  });
});
