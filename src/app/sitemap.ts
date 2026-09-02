import type { MetadataRoute } from "next";
import { siteConfig, publicNav } from "@/config/site";
import { getProjectSlugs } from "@/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = publicNav.map((item) => ({
    url: `${siteConfig.url}${item.href === "/" ? "" : item.href}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: item.href === "/" ? 1 : 0.7,
  }));

  const projectEntries: MetadataRoute.Sitemap = (await getProjectSlugs()).map(
    (slug) => ({
      url: `${siteConfig.url}/projects/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  return [...staticEntries, ...projectEntries];
}
