import type { MetadataRoute } from "next";

import { siteConfig, publicNav } from "@/config/site";
import { getPublishedProjects } from "@/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = publicNav.map((item) => ({
    url: `${siteConfig.url}${item.href === "/" ? "" : item.href}`,
    lastModified: now,
    changeFrequency: item.href === "/" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : 0.7,
  }));

  let projectEntries: MetadataRoute.Sitemap = [];
  try {
    const projects = await getPublishedProjects();
    projectEntries = projects.map((p) => ({
      url: `${siteConfig.url}/projects/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly",
      priority: p.featured ? 0.8 : 0.6,
    }));
  } catch {
    /* DB unavailable at build — ship the static routes only */
  }

  return [...staticEntries, ...projectEntries];
}
