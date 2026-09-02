import "server-only";
import { cache } from "react";
import { cookies, headers } from "next/headers";

import { getSiteSettings } from "@/lib/queries";
import { fr, type Dictionary } from "./dictionaries/fr";
import { en } from "./dictionaries/en";
import {
  defaultLocale,
  isLocale,
  localeFromAcceptLanguage,
  type Locale,
} from "./routing";

export const LOCALE_COOKIE = "NEXT_LOCALE";

const DICTS: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(locale: Locale): Dictionary {
  return DICTS[locale] ?? fr;
}

/**
 * Resolve the active locale for the current request:
 *   1. `NEXT_LOCALE` cookie (visitor's explicit choice)
 *   2. the admin's default (`SiteSetting.general.language`)
 *   3. the `Accept-Language` header
 *   4. `defaultLocale`
 */
export const getLocale = cache(async (): Promise<Locale> => {
  try {
    const cookie = (await cookies()).get(LOCALE_COOKIE)?.value;
    if (isLocale(cookie)) return cookie;
  } catch {
    /* cookies() unavailable */
  }

  try {
    const { general } = await getSiteSettings();
    if (isLocale(general.language)) return general.language;
  } catch {
    /* settings unavailable */
  }

  try {
    const fromHeader = localeFromAcceptLanguage(
      (await headers()).get("accept-language"),
    );
    if (fromHeader) return fromHeader;
  } catch {
    /* headers() unavailable */
  }

  return defaultLocale;
});

/** Convenience: `{ locale, t }` for a server component. */
export const getI18n = cache(async () => {
  const locale = await getLocale();
  return { locale, t: getDictionary(locale) };
});
