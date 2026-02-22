/**
 * Lightweight i18n system for the onboarding wizard.
 * Provides translations for the first-launch setup flow.
 */

export type Locale = "en" | "zh-CN" | "zh-TW" | "ja" | "ko" | "es" | "fr" | "de" | "pt-BR" | "ru";

export type I18nMessages = typeof EN;

const EN = {
  // Step indicator
  stepOf: (current: number, total: number) => `Step ${current} of ${total}`,

  // Step 1: Language
  langTitle: "Welcome to OpenSoul",
  langSubtitle: "Choose your preferred language to get started.",
  langLabel: "Language",

  // Step 2: AI Provider
  providerTitle: "Choose an AI Provider",
  providerSubtitle:
    "Select one or more AI model providers. You can always change this later in Settings.",
  providerSearch: "Search providers…",
  providerNoneSelected: "No provider selected yet.",
  providerSkip: "Skip for now",
  providerApiKeyPlaceholder: "Paste your API key…",
  providerConnected: "Connected",

  // Step 3: Channels
  channelTitle: "Connect a Channel",
  channelSubtitle:
    "Link a messaging platform so your AI companion can chat with you. You can skip and configure this later.",
  channelSkip: "Skip for now",
  channelTokenPlaceholder: "Paste bot token…",

  // Step 4: Confirm
  confirmTitle: "You're All Set!",
  confirmSubtitle: "Review your choices and launch OpenSoul.",
  confirmLanguage: "Language",
  confirmProvider: "AI Provider",
  confirmProviderNone: "None (configure later)",
  confirmChannel: "Channel",
  confirmChannelNone: "None (configure later)",
  confirmLaunch: "Launch OpenSoul",

  // Common
  next: "Next",
  back: "Back",
  skip: "Skip",
  finish: "Finish",
};

const ZH_CN: I18nMessages = {
  stepOf: (current, total) => `第 ${current} 步，共 ${total} 步`,

  langTitle: "欢迎使用 OpenSoul",
  langSubtitle: "选择你偏好的语言以开始设置。",
  langLabel: "语言",

  providerTitle: "选择 AI 提供商",
  providerSubtitle: "选择一个或多个 AI 模型提供商。你随时可以在设置中更改。",
  providerSearch: "搜索提供商…",
  providerNoneSelected: "尚未选择提供商。",
  providerSkip: "暂时跳过",
  providerApiKeyPlaceholder: "粘贴你的 API Key…",
  providerConnected: "已连接",

  channelTitle: "连接聊天渠道",
  channelSubtitle: "链接一个聊天平台，让你的 AI 伙伴与你对话。你也可以稍后配置。",
  channelSkip: "暂时跳过",
  channelTokenPlaceholder: "粘贴 Bot Token…",

  confirmTitle: "一切就绪！",
  confirmSubtitle: "检查你的选择，然后启动 OpenSoul。",
  confirmLanguage: "语言",
  confirmProvider: "AI 提供商",
  confirmProviderNone: "无（稍后配置）",
  confirmChannel: "聊天渠道",
  confirmChannelNone: "无（稍后配置）",
  confirmLaunch: "启动 OpenSoul",

  next: "下一步",
  back: "上一步",
  skip: "跳过",
  finish: "完成",
};

const ZH_TW: I18nMessages = {
  stepOf: (current, total) => `第 ${current} 步，共 ${total} 步`,

  langTitle: "歡迎使用 OpenSoul",
  langSubtitle: "選擇你偏好的語言以開始設定。",
  langLabel: "語言",

  providerTitle: "選擇 AI 提供商",
  providerSubtitle: "選擇一個或多個 AI 模型提供商。你隨時可以在設定中更改。",
  providerSearch: "搜尋提供商…",
  providerNoneSelected: "尚未選擇提供商。",
  providerSkip: "暫時跳過",
  providerApiKeyPlaceholder: "貼上你的 API Key…",
  providerConnected: "已連接",

  channelTitle: "連接聊天頻道",
  channelSubtitle: "連結一個聊天平台，讓你的 AI 夥伴與你對話。你也可以稍後設定。",
  channelSkip: "暫時跳過",
  channelTokenPlaceholder: "貼上 Bot Token…",

  confirmTitle: "一切就緒！",
  confirmSubtitle: "檢查你的選擇，然後啟動 OpenSoul。",
  confirmLanguage: "語言",
  confirmProvider: "AI 提供商",
  confirmProviderNone: "無（稍後設定）",
  confirmChannel: "聊天頻道",
  confirmChannelNone: "無（稍後設定）",
  confirmLaunch: "啟動 OpenSoul",

  next: "下一步",
  back: "上一步",
  skip: "跳過",
  finish: "完成",
};

const JA: I18nMessages = {
  stepOf: (current, total) => `ステップ ${current} / ${total}`,

  langTitle: "OpenSoul へようこそ",
  langSubtitle: "お好みの言語を選択してください。",
  langLabel: "言語",

  providerTitle: "AI プロバイダーを選択",
  providerSubtitle:
    "1つ以上のAIモデルプロバイダーを選択してください。設定でいつでも変更できます。",
  providerSearch: "プロバイダーを検索…",
  providerNoneSelected: "プロバイダーが選択されていません。",
  providerSkip: "スキップ",
  providerApiKeyPlaceholder: "API キーを貼り付け…",
  providerConnected: "接続済み",

  channelTitle: "チャンネルを接続",
  channelSubtitle:
    "メッセージングプラットフォームを接続して、AIコンパニオンとチャットしましょう。後で設定することもできます。",
  channelSkip: "スキップ",
  channelTokenPlaceholder: "ボットトークンを貼り付け…",

  confirmTitle: "準備完了！",
  confirmSubtitle: "設定を確認して、OpenSoul を起動します。",
  confirmLanguage: "言語",
  confirmProvider: "AI プロバイダー",
  confirmProviderNone: "なし（後で設定）",
  confirmChannel: "チャンネル",
  confirmChannelNone: "なし（後で設定）",
  confirmLaunch: "OpenSoul を起動",

  next: "次へ",
  back: "戻る",
  skip: "スキップ",
  finish: "完了",
};

const KO: I18nMessages = {
  stepOf: (current, total) => `${total}단계 중 ${current}단계`,

  langTitle: "OpenSoul에 오신 것을 환영합니다",
  langSubtitle: "원하는 언어를 선택하세요.",
  langLabel: "언어",

  providerTitle: "AI 제공자 선택",
  providerSubtitle: "하나 이상의 AI 모델 제공자를 선택하세요. 설정에서 언제든지 변경할 수 있습니다.",
  providerSearch: "제공자 검색…",
  providerNoneSelected: "선택된 제공자가 없습니다.",
  providerSkip: "건너뛰기",
  providerApiKeyPlaceholder: "API 키를 붙여넣기…",
  providerConnected: "연결됨",

  channelTitle: "채널 연결",
  channelSubtitle:
    "메시징 플랫폼을 연결하여 AI 동반자와 대화하세요. 나중에 설정할 수도 있습니다.",
  channelSkip: "건너뛰기",
  channelTokenPlaceholder: "봇 토큰 붙여넣기…",

  confirmTitle: "모두 준비되었습니다!",
  confirmSubtitle: "선택 사항을 검토하고 OpenSoul을 시작하세요.",
  confirmLanguage: "언어",
  confirmProvider: "AI 제공자",
  confirmProviderNone: "없음 (나중에 설정)",
  confirmChannel: "채널",
  confirmChannelNone: "없음 (나중에 설정)",
  confirmLaunch: "OpenSoul 시작",

  next: "다음",
  back: "뒤로",
  skip: "건너뛰기",
  finish: "완료",
};

const ES: I18nMessages = {
  stepOf: (current, total) => `Paso ${current} de ${total}`,
  langTitle: "Bienvenido a OpenSoul",
  langSubtitle: "Elige tu idioma preferido para comenzar.",
  langLabel: "Idioma",
  providerTitle: "Elige un proveedor de IA",
  providerSubtitle:
    "Selecciona uno o más proveedores de modelos de IA. Puedes cambiarlo en Configuración.",
  providerSearch: "Buscar proveedores…",
  providerNoneSelected: "Ningún proveedor seleccionado.",
  providerSkip: "Omitir por ahora",
  providerApiKeyPlaceholder: "Pega tu API key…",
  providerConnected: "Conectado",
  channelTitle: "Conectar un canal",
  channelSubtitle:
    "Vincula una plataforma de mensajería. Puedes configurarlo después.",
  channelSkip: "Omitir por ahora",
  channelTokenPlaceholder: "Pega el token del bot…",
  confirmTitle: "¡Todo listo!",
  confirmSubtitle: "Revisa tus opciones e inicia OpenSoul.",
  confirmLanguage: "Idioma",
  confirmProvider: "Proveedor de IA",
  confirmProviderNone: "Ninguno (configurar después)",
  confirmChannel: "Canal",
  confirmChannelNone: "Ninguno (configurar después)",
  confirmLaunch: "Iniciar OpenSoul",
  next: "Siguiente",
  back: "Atrás",
  skip: "Omitir",
  finish: "Finalizar",
};

const FR: I18nMessages = {
  stepOf: (current, total) => `Étape ${current} sur ${total}`,
  langTitle: "Bienvenue sur OpenSoul",
  langSubtitle: "Choisissez votre langue préférée pour commencer.",
  langLabel: "Langue",
  providerTitle: "Choisir un fournisseur IA",
  providerSubtitle:
    "Sélectionnez un ou plusieurs fournisseurs de modèles IA. Modifiable dans les paramètres.",
  providerSearch: "Rechercher…",
  providerNoneSelected: "Aucun fournisseur sélectionné.",
  providerSkip: "Passer pour l'instant",
  providerApiKeyPlaceholder: "Collez votre clé API…",
  providerConnected: "Connecté",
  channelTitle: "Connecter un canal",
  channelSubtitle:
    "Liez une plateforme de messagerie. Vous pouvez configurer plus tard.",
  channelSkip: "Passer pour l'instant",
  channelTokenPlaceholder: "Collez le token du bot…",
  confirmTitle: "Tout est prêt !",
  confirmSubtitle: "Vérifiez vos choix et lancez OpenSoul.",
  confirmLanguage: "Langue",
  confirmProvider: "Fournisseur IA",
  confirmProviderNone: "Aucun (configurer plus tard)",
  confirmChannel: "Canal",
  confirmChannelNone: "Aucun (configurer plus tard)",
  confirmLaunch: "Lancer OpenSoul",
  next: "Suivant",
  back: "Retour",
  skip: "Passer",
  finish: "Terminer",
};

const DE: I18nMessages = {
  stepOf: (current, total) => `Schritt ${current} von ${total}`,
  langTitle: "Willkommen bei OpenSoul",
  langSubtitle: "Wähle deine bevorzugte Sprache.",
  langLabel: "Sprache",
  providerTitle: "KI-Anbieter wählen",
  providerSubtitle:
    "Wähle einen oder mehrere KI-Modellanbieter. Du kannst dies jederzeit in den Einstellungen ändern.",
  providerSearch: "Anbieter suchen…",
  providerNoneSelected: "Kein Anbieter ausgewählt.",
  providerSkip: "Vorerst überspringen",
  providerApiKeyPlaceholder: "API-Schlüssel einfügen…",
  providerConnected: "Verbunden",
  channelTitle: "Kanal verbinden",
  channelSubtitle:
    "Verbinde eine Messaging-Plattform. Du kannst dies später konfigurieren.",
  channelSkip: "Vorerst überspringen",
  channelTokenPlaceholder: "Bot-Token einfügen…",
  confirmTitle: "Alles bereit!",
  confirmSubtitle: "Überprüfe deine Auswahl und starte OpenSoul.",
  confirmLanguage: "Sprache",
  confirmProvider: "KI-Anbieter",
  confirmProviderNone: "Keiner (später konfigurieren)",
  confirmChannel: "Kanal",
  confirmChannelNone: "Keiner (später konfigurieren)",
  confirmLaunch: "OpenSoul starten",
  next: "Weiter",
  back: "Zurück",
  skip: "Überspringen",
  finish: "Fertig",
};

const PT_BR: I18nMessages = {
  stepOf: (current, total) => `Passo ${current} de ${total}`,
  langTitle: "Bem-vindo ao OpenSoul",
  langSubtitle: "Escolha seu idioma preferido para começar.",
  langLabel: "Idioma",
  providerTitle: "Escolha um provedor de IA",
  providerSubtitle:
    "Selecione um ou mais provedores de modelos de IA. Você pode alterar nas configurações.",
  providerSearch: "Buscar provedores…",
  providerNoneSelected: "Nenhum provedor selecionado.",
  providerSkip: "Pular por enquanto",
  providerApiKeyPlaceholder: "Cole sua chave API…",
  providerConnected: "Conectado",
  channelTitle: "Conectar um canal",
  channelSubtitle:
    "Vincule uma plataforma de mensagens. Você pode configurar depois.",
  channelSkip: "Pular por enquanto",
  channelTokenPlaceholder: "Cole o token do bot…",
  confirmTitle: "Tudo pronto!",
  confirmSubtitle: "Revise suas escolhas e inicie o OpenSoul.",
  confirmLanguage: "Idioma",
  confirmProvider: "Provedor de IA",
  confirmProviderNone: "Nenhum (configurar depois)",
  confirmChannel: "Canal",
  confirmChannelNone: "Nenhum (configurar depois)",
  confirmLaunch: "Iniciar OpenSoul",
  next: "Próximo",
  back: "Voltar",
  skip: "Pular",
  finish: "Concluir",
};

const RU: I18nMessages = {
  stepOf: (current, total) => `Шаг ${current} из ${total}`,
  langTitle: "Добро пожаловать в OpenSoul",
  langSubtitle: "Выберите предпочитаемый язык.",
  langLabel: "Язык",
  providerTitle: "Выберите провайдера ИИ",
  providerSubtitle:
    "Выберите одного или нескольких провайдеров. Вы всегда можете изменить это в настройках.",
  providerSearch: "Поиск провайдеров…",
  providerNoneSelected: "Провайдер не выбран.",
  providerSkip: "Пропустить",
  providerApiKeyPlaceholder: "Вставьте API ключ…",
  providerConnected: "Подключено",
  channelTitle: "Подключить канал",
  channelSubtitle:
    "Подключите мессенджер. Вы можете настроить это позже.",
  channelSkip: "Пропустить",
  channelTokenPlaceholder: "Вставьте токен бота…",
  confirmTitle: "Всё готово!",
  confirmSubtitle: "Проверьте настройки и запустите OpenSoul.",
  confirmLanguage: "Язык",
  confirmProvider: "Провайдер ИИ",
  confirmProviderNone: "Нет (настроить позже)",
  confirmChannel: "Канал",
  confirmChannelNone: "Нет (настроить позже)",
  confirmLaunch: "Запустить OpenSoul",
  next: "Далее",
  back: "Назад",
  skip: "Пропустить",
  finish: "Готово",
};

const MESSAGES: Record<Locale, I18nMessages> = {
  en: EN,
  "zh-CN": ZH_CN,
  "zh-TW": ZH_TW,
  ja: JA,
  ko: KO,
  es: ES,
  fr: FR,
  de: DE,
  "pt-BR": PT_BR,
  ru: RU,
};

/** Locales shown in the language picker. */
export const AVAILABLE_LOCALES: Array<{ value: Locale; label: string; nativeLabel: string }> = [
  { value: "en", label: "English", nativeLabel: "English" },
  { value: "zh-CN", label: "Chinese (Simplified)", nativeLabel: "简体中文" },
  { value: "zh-TW", label: "Chinese (Traditional)", nativeLabel: "繁體中文" },
  { value: "ja", label: "Japanese", nativeLabel: "日本語" },
  { value: "ko", label: "Korean", nativeLabel: "한국어" },
  { value: "es", label: "Spanish", nativeLabel: "Español" },
  { value: "fr", label: "French", nativeLabel: "Français" },
  { value: "de", label: "German", nativeLabel: "Deutsch" },
  { value: "pt-BR", label: "Portuguese (Brazil)", nativeLabel: "Português (Brasil)" },
  { value: "ru", label: "Russian", nativeLabel: "Русский" },
];

export function getMessages(locale: Locale): I18nMessages {
  return MESSAGES[locale] ?? EN;
}

/** Detect the best initial locale from the browser. */
export function detectLocale(): Locale {
  const nav = navigator.language ?? "en";
  const lower = nav.toLowerCase();
  if (lower.startsWith("zh-tw") || lower.startsWith("zh-hant")) {
    return "zh-TW";
  }
  if (lower.startsWith("zh")) {
    return "zh-CN";
  }
  if (lower.startsWith("ja")) {
    return "ja";
  }
  if (lower.startsWith("ko")) {
    return "ko";
  }
  if (lower.startsWith("es")) {
    return "es";
  }
  if (lower.startsWith("fr")) {
    return "fr";
  }
  if (lower.startsWith("de")) {
    return "de";
  }
  if (lower.startsWith("pt")) {
    return "pt-BR";
  }
  if (lower.startsWith("ru")) {
    return "ru";
  }
  return "en";
}
