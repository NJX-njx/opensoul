import { AVAILABLE_LOCALES, detectLocale, type Locale } from "./views/onboarding/i18n.ts";

export const UI_LOCALE_STORAGE_KEY = "opensoul.ui.locale";

const SUPPORTED_LOCALES = new Set<Locale>(
  AVAILABLE_LOCALES.map((entry) => entry.value),
);

export function resolveUiLocale(value: string | null | undefined): Locale {
  const trimmed = String(value ?? "").trim();
  if (SUPPORTED_LOCALES.has(trimmed as Locale)) {
    return trimmed as Locale;
  }
  return detectLocale();
}

export function loadUiLocale(): Locale {
  if (typeof localStorage === "undefined") {
    return detectLocale();
  }
  try {
    return resolveUiLocale(localStorage.getItem(UI_LOCALE_STORAGE_KEY));
  } catch {
    return detectLocale();
  }
}

export function saveUiLocale(locale: Locale): void {
  if (typeof document !== "undefined") {
    document.documentElement.lang = locale;
  }
  if (typeof localStorage === "undefined") {
    return;
  }
  try {
    localStorage.setItem(UI_LOCALE_STORAGE_KEY, locale);
  } catch {
    // Ignore storage write errors (private mode / quota / disabled storage).
  }
}

export function isChineseLocale(locale: Locale | string | null | undefined): boolean {
  return String(locale ?? "")
    .trim()
    .toLowerCase()
    .startsWith("zh");
}

export function uiText(
  locale: Locale | string | null | undefined,
  english: string,
  chinese: string,
): string {
  return isChineseLocale(locale) ? chinese : english;
}
