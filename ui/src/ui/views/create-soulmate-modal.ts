import { html, nothing } from "lit";
import type { AppViewState } from "../app-view-state.ts";
import { uiText } from "../i18n.ts";
import { icons } from "../icons.ts";

const ACCEPT_IMAGE_TYPES = "image/png,image/jpeg,image/webp,image/gif";
const MAX_AVATAR_SIZE_BYTES = 512 * 1024; // 512KB

/**
 * 从名称生成 workspace slug，与后端 normalizeAgentId 逻辑一致
 */
function slugFromName(name: string): string {
  const trimmed = (name ?? "").trim();
  if (!trimmed) {
    return "workspace";
  }
  return (
    trimmed
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 64) || "workspace"
  );
}

/**
 * 默认工作区路径：~/.opensoul/workspace-<slug>
 */
export function defaultWorkspace(name: string): string {
  const slug = slugFromName(name);
  return `~/.opensoul/workspace-${slug}`;
}

export type CreateSoulmateModalState = {
  name: string;
  emoji: string;
  workspace: string;
  avatarDataUrl: string | null;
  avatarFileName: string | null;
  error: string | null;
  submitting: boolean;
};

export const INITIAL_CREATE_SOULMATE_STATE: CreateSoulmateModalState = {
  name: "",
  emoji: "",
  workspace: "",
  avatarDataUrl: null,
  avatarFileName: null,
  error: null,
  submitting: false,
};

export function renderCreateSoulmateModal(
  state: AppViewState,
  modalState: CreateSoulmateModalState,
  onClose: () => void,
  onFieldChange: (field: keyof CreateSoulmateModalState, value: string | null | boolean) => void,
  onSubmit: () => void,
) {
  if (!state.showCreateSoulmateModal) {
    return nothing;
  }

  const t = (english: string, chinese: string) => uiText(state.uiLocale, english, chinese);

  function handleNameInput(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    onFieldChange("name", val);
    if (!modalState.workspace.trim()) {
      onFieldChange("workspace", defaultWorkspace(val));
    }
    onFieldChange("error", null);
  }

  function handleAvatarChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      onFieldChange("avatarDataUrl", null);
      onFieldChange("avatarFileName", null);
      return;
    }
    if (!file.type.startsWith("image/")) {
      onFieldChange("error", t("Please select an image file", "请选择图片文件"));
      input.value = "";
      return;
    }
    if (file.size > MAX_AVATAR_SIZE_BYTES) {
      onFieldChange("error", t("Image too large (max 512KB)", "图片过大（最大 512KB）"));
      input.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      onFieldChange("avatarDataUrl", dataUrl);
      onFieldChange("avatarFileName", file.name);
      onFieldChange("error", null);
    };
    reader.readAsDataURL(file);
    input.value = "";
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    if (modalState.submitting) {
      return;
    }
    const name = modalState.name.trim();
    if (!name) {
      onFieldChange("error", t("Name is required", "名称为必填项"));
      return;
    }
    onSubmit();
  }

  return html`
    <div class="exec-approval-overlay" role="dialog" aria-modal="true" aria-labelledby="create-soulmate-title">
      <div class="exec-approval-card create-soulmate-modal">
        <div class="exec-approval-header">
          <div>
            <div id="create-soulmate-title" class="exec-approval-title">
              ${t("Create Soulmate", "创建 Soulmate")}
            </div>
            <div class="exec-approval-sub">
              ${t("Create a new AI agent with its own workspace", "创建新的 AI 智能体及其工作区")}
            </div>
          </div>
        </div>

        <form @submit=${handleSubmit} class="create-soulmate-form">
            <div class="field">
              <label for="create-soulmate-name">
                ${t("Name", "名称")} <span style="color: var(--danger);">*</span>
              </label>
              <input
                id="create-soulmate-name"
                type="text"
                placeholder=${t("e.g. Sophie", "例如 Sophie")}
                .value=${modalState.name}
                @input=${handleNameInput}
                ?disabled=${modalState.submitting}
                autocomplete="off"
              />
            </div>

            <div class="field">
              <label for="create-soulmate-emoji">
                ${t("Emoji", "Emoji")} <span style="color: var(--muted); font-weight: 400;">(${t("optional", "可选")})</span>
              </label>
              <input
                id="create-soulmate-emoji"
                type="text"
                placeholder=${t("e.g. 🤖", "例如 🤖")}
                .value=${modalState.emoji}
                @input=${(e: Event) => {
                  onFieldChange("emoji", (e.target as HTMLInputElement).value);
                  onFieldChange("error", null);
                }}
                ?disabled=${modalState.submitting}
                autocomplete="off"
              />
            </div>

            <div class="field">
              <label>
                ${t("Avatar", "头像")} <span style="color: var(--muted); font-weight: 400;">(${t("optional", "可选")})</span>
              </label>
              <div class="create-soulmate-avatar">
                <div class="create-soulmate-avatar-preview">
                  ${
                    modalState.avatarDataUrl
                      ? html`<img src=${modalState.avatarDataUrl} alt="" />`
                      : html`<span class="avatar-placeholder" aria-hidden="true">${icons.image}</span>`
                  }
                </div>
                <div class="create-soulmate-avatar-actions">
                  <input
                    type="file"
                    id="create-soulmate-avatar-file"
                    class="create-soulmate-avatar-file"
                    accept=${ACCEPT_IMAGE_TYPES}
                    @change=${handleAvatarChange}
                    ?disabled=${modalState.submitting}
                  />
                  <label for="create-soulmate-avatar-file" class="btn">
                    ${icons.image}
                    <span>${t("Select file", "选择文件")}</span>
                  </label>
                  ${
                    modalState.avatarFileName
                      ? html`<div class="create-soulmate-avatar-filename">${modalState.avatarFileName}</div>`
                      : html`<div class="create-soulmate-avatar-filename">${t("No file selected", "未选择任何文件")}</div>`
                  }
                </div>
              </div>
            </div>

            <details class="create-soulmate-advanced">
              <summary>${t("Advanced", "高级")}</summary>
              <div class="field">
                <label for="create-soulmate-workspace">${t("Workspace path", "工作区路径")}</label>
                <input
                  id="create-soulmate-workspace"
                  type="text"
                  class="mono"
                  placeholder=${defaultWorkspace(modalState.name || "agent")}
                  .value=${modalState.workspace}
                  @input=${(e: Event) => {
                    onFieldChange("workspace", (e.target as HTMLInputElement).value);
                    onFieldChange("error", null);
                  }}
                  ?disabled=${modalState.submitting}
                  autocomplete="off"
                />
              </div>
            </details>

            ${
              modalState.error
                ? html`
                <div class="callout danger" style="margin: 0;">
                  ${modalState.error}
                </div>
              `
                : nothing
            }

          <div class="create-soulmate-actions">
            <button type="submit" class="btn primary" ?disabled=${modalState.submitting}>
              ${modalState.submitting ? t("Creating...", "创建中...") : t("Create", "创建")}
            </button>
            <button
              type="button"
              class="btn"
              @click=${onClose}
              ?disabled=${modalState.submitting}
            >
              ${t("Cancel", "取消")}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}
