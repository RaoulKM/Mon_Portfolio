import "server-only";
import { cache } from "react";

import { prisma } from "@/lib/prisma";

const listInclude = {
  technologies: { orderBy: { name: "asc" } },
  category: true,
} as const;

export type ProjectListItem = Awaited<ReturnType<typeof loadPublished>>[number];
export type ProjectDetail = NonNullable<Awaited<ReturnType<typeof loadBySlug>>>;

function loadPublished() {
  return prisma.project.findMany({
    where: { isPublished: true },
    orderBy: [{ featured: "desc" }, { displayOrder: "asc" }, { createdAt: "desc" }],
    include: listInclude,
  });
}

function loadBySlug(slug: string) {
  return prisma.project.findFirst({
    where: { slug, isPublished: true },
    include: listInclude,
  });
}

export const getPublishedProjects = cache(async (): Promise<ProjectListItem[]> => {
  try {
    return await loadPublished();
  } catch {
    return [];
  }
});

export const getFeaturedProjects = cache(async (limit = 3): Promise<ProjectListItem[]> => {
  const all = await getPublishedProjects();
  const featured = all.filter((p) => p.featured);
  return (featured.length ? featured : all).slice(0, limit);
});

export const getProjectSlugs = cache(async (): Promise<string[]> => {
  try {
    const rows = await prisma.project.findMany({
      where: { isPublished: true },
      select: { slug: true },
    });
    return rows.map((r) => r.slug);
  } catch {
    return [];
  }
});

export const getProjectBySlug = cache(async (slug: string) => {
  try {
    return await loadBySlug(slug);
  } catch {
    return null;
  }
});

/** Previous / next published project by display order (for detail nav, §11). */
export const getAdjacentProjects = cache(async (slug: string) => {
  const all = await getPublishedProjects();
  const i = all.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? all[i - 1] : null,
    next: i < all.length - 1 ? all[i + 1] : null,
  };
});

/** Increment the view counter — best effort, never throws. */
export async function incrementProjectViews(id: string) {
  try {
    await prisma.project.update({ where: { id }, data: { views: { increment: 1 } } });
  } catch {
    /* ignore */
  }
}
