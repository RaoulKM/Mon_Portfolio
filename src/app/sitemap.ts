import type { MetadataRoute } from "next";

import { siteConfig, publicNav } from "@/config/site";
import { getPublishedProjects } from "@/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const paths = [...publicNav.map((i) => i.href), "/certifications", "/resume"];
  const staticEntries: MetadataRoute.Sitemap = Array.from(new Set(paths)).map(
    (href) => ({
      url: `${siteConfig.url}${href === "/" ? "" : href}`,
      lastModified: now,
      changeFrequency: href === "/" ? "weekly" : "monthly",
      priority: href === "/" ? 1 : 0.7,
    }),
  );

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
