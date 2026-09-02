import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/** Consistent per-page metadata: canonical + Open Graph + Twitter. */
export function pageMetadata({
  path,
  title,
  description,
  image,
  type = "website",
  noindex = false,
}: {
  path: string;
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article" | "profile";
  noindex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path === "/" ? "" : path}`;
  const desc = description ?? siteConfig.description;
  const ogImage = image ?? `${siteConfig.url}/opengraph-image`;

  return {
    title,
    description: desc,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      url,
      title: title ?? siteConfig.title,
      description: desc,
      siteName: siteConfig.name,
      locale: "fr_FR",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? siteConfig.title,
      description: desc,
      images: [ogImage],
    },
  };
}
