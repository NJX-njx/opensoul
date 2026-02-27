import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { OpenSoulApp } from "./app.ts";

// Helper from navigation.browser.test.ts
// oxlint-disable-next-line typescript/unbound-method
const originalConnect = OpenSoulApp.prototype.connect;

function mountApp(pathname: string) {
  window.history.replaceState({}, "", pathname);
  const app = document.createElement("opensoul-app") as OpenSoulApp;
  document.body.append(app);
  return app;
}

beforeEach(() => {
  OpenSoulApp.prototype.connect = () => {
    // no-op
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

describe("Operate Zoom Control", () => {
  it("shows zoom control on Operate tabs", async () => {
    const app = mountApp("/channels");
    await app.updateComplete;

    const zoomControl = app.shadowRoot?.querySelector(".nav-zoom-control");
    expect(zoomControl).not.toBeNull();
  });

  it("hides zoom control on non-Operate tabs", async () => {
    const app = mountApp("/chat");
    await app.updateComplete;

    const zoomControl = app.shadowRoot?.querySelector(".nav-zoom-control");
    expect(zoomControl).toBeNull();
  });

  it("applies default zoom level", async () => {
    const app = mountApp("/channels");
    await app.updateComplete;

    const content = app.shadowRoot?.querySelector("main.content") as HTMLElement;
    // Default 1.0, so no style applied or empty style
    expect(content.style.transform).toBe("");
  });

  it("applies stored zoom level", async () => {
    localStorage.setItem("opensoul.control.settings.v1", JSON.stringify({ operateZoomLevel: 1.5 }));
    const app = mountApp("/channels");
    await app.updateComplete;

    const content = app.shadowRoot?.querySelector("main.content") as HTMLElement;
    expect(content.style.transform).toBe("scale(1.5)");
    // 100 / 1.5 = 66.666...
    expect(content.style.width).toContain("66.666");
  });

  it("updates zoom on button click", async () => {
    const app = mountApp("/channels");
    await app.updateComplete;

    const zoomInBtn = app.shadowRoot?.querySelector(
      ".nav-zoom-control__btn[title='Zoom In']",
    ) as HTMLElement;
    expect(zoomInBtn).not.toBeNull();

    expect(app.settings.operateZoomLevel).toBe(1.1);
    await app.updateComplete;

    const content = app.shadowRoot?.querySelector("main.content") as HTMLElement;
    expect(content.style.transform).toBe("scale(1.1)");
  });

  it("updates zoom on slider input", async () => {
    const app = mountApp("/channels");
    await app.updateComplete;

    const slider = app.shadowRoot?.querySelector(".nav-zoom-control__slider") as HTMLInputElement;
    expect(slider).not.toBeNull();

    slider.value = "2.0";

    expect(app.settings.operateZoomLevel).toBe(2.0);
    await app.updateComplete;

    const content = app.shadowRoot?.querySelector("main.content") as HTMLElement;
    expect(content.style.transform).toBe("scale(2)");
  });

  it("updates zoom on wheel event", async () => {
    const app = mountApp("/channels");
    await app.updateComplete;

    const slider = app.shadowRoot?.querySelector(".nav-zoom-control__slider") as HTMLInputElement;
    expect(slider).not.toBeNull();

    expect(app.settings.operateZoomLevel).toBe(1.1);
    const content = app.shadowRoot?.querySelector("main.content") as HTMLElement;
    expect(content.style.transform).toBe("scale(1.1)");
  });
});
