import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { OpenSoulApp } from "./app.ts";
import { UI_LOCALE_STORAGE_KEY } from "./i18n.ts";

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

describe("Settings language sync", () => {
  it("renders system language selector in Settings > General", async () => {
    const app = await mountMainUi("/chat");
    app.openSettings("general");
    await app.updateComplete;

    const select = app.querySelector<HTMLSelectElement>("#settings-system-language");
    expect(select).not.toBeNull();
    expect(select?.options.length ?? 0).toBeGreaterThan(0);
  });

  it("keeps settings language and onboarding language in sync", async () => {
    const app = await mountMainUi("/chat");
    app.openSettings("general");
    await app.updateComplete;

    const select = app.querySelector<HTMLSelectElement>("#settings-system-language");
    expect(select).not.toBeNull();
    if (!select) {
      return;
    }

    select.value = "zh-CN";
    select.dispatchEvent(new Event("change", { bubbles: true }));
    await app.updateComplete;

    expect(app.uiLocale).toBe("zh-CN");
    expect(app.onboardingLocale).toBe("zh-CN");
    expect(localStorage.getItem(UI_LOCALE_STORAGE_KEY)).toBe("zh-CN");
  });
});
