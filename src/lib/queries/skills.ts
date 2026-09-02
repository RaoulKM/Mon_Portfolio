import "server-only";
import { cache } from "react";
import type { Skill, SkillCategory } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const SKILL_CATEGORY_LABELS: Record<SkillCategory, string> = {
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  DATABASE: "Base de données",
  DEVOPS: "DevOps / Cloud",
  AI: "Intelligence Artificielle",
  MOBILE: "Mobile",
  OTHER: "Autres",
};

const CATEGORY_ORDER: SkillCategory[] = [
  "FRONTEND",
  "BACKEND",
  "DATABASE",
  "DEVOPS",
  "AI",
  "MOBILE",
  "OTHER",
];

export type SkillGroup = { category: SkillCategory; label: string; skills: Skill[] };

/** Visible skills grouped by category, in canonical category order. */
export const getSkillGroups = cache(async (): Promise<SkillGroup[]> => {
  let skills: Skill[] = [];
  try {
    skills = await prisma.skill.findMany({
      where: { isVisible: true },
      orderBy: [{ displayOrder: "asc" }, { level: "desc" }],
    });
  } catch {
    return [];
  }

  return CATEGORY_ORDER.map((category) => ({
    category,
    label: SKILL_CATEGORY_LABELS[category],
    skills: skills.filter((s) => s.category === category),
  })).filter((g) => g.skills.length > 0);
});
