export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/** Best-effort parse of an Accept-Language header. */
export function localeFromAcceptLanguage(header?: string | null): Locale | null {
  if (!header) return null;
  for (const part of header.split(",")) {
    const tag = part.trim().split(";")[0]?.toLowerCase().slice(0, 2);
    if (isLocale(tag)) return tag;
  }
  return null;
}
