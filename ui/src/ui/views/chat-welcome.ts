import { html } from "lit";
import type { Locale } from "./onboarding/i18n.ts";
import { uiText } from "../i18n.ts";

export type ChatWelcomeProps = {
  locale: Locale;
  basePath: string;
};

export function renderChatWelcome(props: ChatWelcomeProps) {
  const t = (english: string, chinese: string) => uiText(props.locale, english, chinese);
  const logoUrl = props.basePath ? `${props.basePath}/logo.jpg` : "/logo.jpg";

  return html`
    <div class="chat-welcome-page">
      <div class="chat-welcome-page__content">
        <div class="chat-welcome-page__logo">
          <img src=${logoUrl} alt="OpenSoul" class="chat-welcome-page__logo-img" />
        </div>
        <h1 class="chat-welcome-page__title">OpenSoul</h1>
        <p class="chat-welcome-page__slogan">
          ${t("Start a conversation with your AI assistant", "与您的 AI 助手开始对话")}
        </p>
        <p class="chat-welcome-page__hint">
          ${t(
            "Select a conversation from the list, or type /new in the input to create a new one.",
            "从左侧列表选择会话，或在输入框输入 /new 创建新会话。",
          )}
        </p>
      </div>
    </div>
  `;
}
