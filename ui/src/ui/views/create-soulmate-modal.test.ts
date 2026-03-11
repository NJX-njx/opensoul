import { render } from "lit";
import { describe, expect, it, vi } from "vitest";
import type { AppViewState } from "../app-view-state.ts";
import {
  INITIAL_CREATE_SOULMATE_STATE,
  type CreateSoulmateModalState,
  defaultWorkspace,
  renderCreateSoulmateModal,
} from "./create-soulmate-modal.ts";

function createFieldChangeSpy() {
  return vi.fn<(field: keyof CreateSoulmateModalState, value: string | boolean | null) => void>();
}

function createSubmitSpy() {
  return vi.fn<() => void>();
}

function renderModal(opts?: {
  modalState?: typeof INITIAL_CREATE_SOULMATE_STATE;
  onFieldChange?: ReturnType<typeof createFieldChangeSpy>;
  onSubmit?: ReturnType<typeof createSubmitSpy>;
}) {
  const state = {
    showCreateSoulmateModal: true,
    uiLocale: "en",
  } as AppViewState;
  const modalState = { ...INITIAL_CREATE_SOULMATE_STATE, ...opts?.modalState };
  const onClose = vi.fn();
  const onFieldChange = opts?.onFieldChange ?? createFieldChangeSpy();
  const onSubmit = opts?.onSubmit ?? createSubmitSpy();
  const container = document.createElement("div");
  render(renderCreateSoulmateModal(state, modalState, onClose, onFieldChange, onSubmit), container);
  return { container, onFieldChange, onSubmit };
}

describe("create soulmate modal", () => {
  it("builds deterministic workspace slug from name", () => {
    expect(defaultWorkspace("Sophie AI")).toBe("~/.opensoul/workspace-sophie-ai");
    expect(defaultWorkspace("  ")).toBe("~/.opensoul/workspace-workspace");
  });

  it("blocks submit when name is empty", async () => {
    const { container, onFieldChange, onSubmit } = renderModal();
    const form = container.querySelector("form");
    form?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    await Promise.resolve();

    expect(onSubmit).not.toHaveBeenCalled();
    expect(onFieldChange).toHaveBeenCalledWith("error", "Name is required");
  });

  it("submits when name is valid", async () => {
    const { container, onSubmit } = renderModal({
      modalState: { ...INITIAL_CREATE_SOULMATE_STATE, name: "Sophie" },
    });
    const form = container.querySelector("form");
    form?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    await Promise.resolve();

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("shows actionable error on non-image avatar upload", async () => {
    const onFieldChange = vi.fn();
    const { container } = renderModal({
      modalState: { ...INITIAL_CREATE_SOULMATE_STATE, name: "Sophie" },
      onFieldChange,
    });

    const input = container.querySelector("#create-soulmate-avatar-file") as HTMLInputElement;
    const file = new File(["abc"], "note.txt", { type: "text/plain" });
    Object.defineProperty(input, "files", { value: [file] });
    input.dispatchEvent(new Event("change", { bubbles: true }));
    await Promise.resolve();

    expect(onFieldChange).toHaveBeenCalledWith("error", "Please select an image file");
  });
});
