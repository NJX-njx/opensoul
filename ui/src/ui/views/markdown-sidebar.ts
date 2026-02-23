import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { icons } from "../icons.ts";
import { uiText } from "../i18n.ts";
import { toSanitizedMarkdownHtml } from "../markdown.ts";
import type { Locale } from "./onboarding/i18n.ts";

export type MarkdownSidebarProps = {
  locale: Locale;
  content: string | null;
  error: string | null;
  onClose: () => void;
  onViewRawText: () => void;
};

export function renderMarkdownSidebar(props: MarkdownSidebarProps) {
  const t = (english: string, chinese: string) => uiText(props.locale, english, chinese);
  return html`
    <div class="sidebar-panel">
      <div class="sidebar-header">
        <div class="sidebar-title">${t("Tool Output", "工具输出")}</div>
        <button @click=${props.onClose} class="btn" title=${t("Close sidebar", "关闭侧栏")}>
          ${icons.x}
        </button>
      </div>
      <div class="sidebar-content">
        ${
          props.error
            ? html`
              <div class="callout danger">${props.error}</div>
              <button @click=${props.onViewRawText} class="btn" style="margin-top: 12px;">
                ${t("View Raw Text", "查看原始文本")}
              </button>
            `
            : props.content
              ? html`<div class="sidebar-markdown">${unsafeHTML(toSanitizedMarkdownHtml(props.content))}</div>`
              : html`
                  <div class="muted">${t("No content available", "暂无内容")}</div>
                `
        }
      </div>
    </div>
  `;
}
