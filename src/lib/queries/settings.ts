import "server-only";
import { cache } from "react";

import { prisma } from "@/lib/prisma";

export interface SiteSettings {
  general: {
    siteName?: string;
    siteDescription?: string;
    timezone?: string;
    language?: string;
  };
  seo: {
    defaultTitle?: string;
    defaultDescription?: string;
    keywords?: string[];
    ogImage?: string;
  };
  social: Record<string, string>;
  contact: { contactEmail?: string; notificationEmail?: string };
}

const EMPTY: SiteSettings = { general: {}, seo: {}, social: {}, contact: {} };

/** All site settings as one typed object; never throws. */
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const rows = await prisma.siteSetting.findMany();
    const out = { general: {}, seo: {}, social: {}, contact: {} } as Record<
      keyof SiteSettings,
      unknown
    >;
    for (const row of rows) {
      if (row.key in out) {
        out[row.key as keyof SiteSettings] = row.value ?? {};
      }
    }
    return out as unknown as SiteSettings;
  } catch {
    return EMPTY;
  }
});
