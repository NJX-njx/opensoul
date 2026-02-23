import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { OpenSoulApp } from "./app.ts";

// oxlint-disable-next-line typescript/unbound-method
const originalConnect = OpenSoulApp.prototype.connect;

function mountApp(pathname: string) {
  window.history.replaceState({}, "", pathname);
  const app = document.createElement("opensoul-app") as OpenSoulApp;
  document.body.append(app);
  return app;
}

async function mountMainUi(pathname: string) {
  const app = mountApp(pathname);
  await app.updateComplete;
  app.showOnboardingWizard = false;
  await app.updateComplete;
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

describe("Sidebar Zoom Control Removal", () => {
  it("does not render zoom control on Operate tabs", async () => {
    const app = await mountMainUi("/channels");

    const zoomControl = app.querySelector(".nav-zoom-control");
    expect(zoomControl).toBeNull();
  });

  it("does not render zoom control on Assist tabs", async () => {
    const app = await mountMainUi("/chat");

    const zoomControl = app.querySelector(".nav-zoom-control");
    expect(zoomControl).toBeNull();
  });

  it("does not apply main-content scaling from stored zoom settings", async () => {
    localStorage.setItem("opensoul.control.settings.v1", JSON.stringify({ operateZoomLevel: 1.5 }));
    const app = await mountMainUi("/channels");

    const content = app.querySelector("main.content") as HTMLElement | null;
    expect(content).not.toBeNull();
    if (!content) {
      return;
    }
    expect(content.style.transform).toBe("");
    expect(content.style.width).toBe("");
    expect(content.style.height).toBe("");
  });
});
