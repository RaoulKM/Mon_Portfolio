"use server";

import { prisma } from "@/lib/prisma";
import { runAction, type ActionResult } from "@/lib/admin/action";
import { makeDeleteAction, makeToggleAction } from "@/lib/admin/crud";
import { skillFormSchema } from "@/lib/validation/admin";

const REVALIDATE = ["/", "/skills", "/admin/skills"];

export async function saveSkill(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const id = (formData.get("id") as string) || null;
  return runAction(
    {
      permission: "MANAGE_SKILLS",
      schema: skillFormSchema,
      formData,
      audit: { action: id ? "SKILL_UPDATED" : "SKILL_CREATED", entity: "Skill" },
      revalidate: REVALIDATE,
    },
    async (data) =>
      id
        ? prisma.skill.update({ where: { id }, data })
        : prisma.skill.create({ data }),
  );
}

export const toggleSkill = makeToggleAction({
  model: "skill",
  permission: "MANAGE_SKILLS",
  entity: "Skill",
  fields: ["isVisible"],
  revalidate: REVALIDATE,
});

export const deleteSkill = makeDeleteAction({
  model: "skill",
  permission: "MANAGE_SKILLS",
  entity: "Skill",
  revalidate: REVALIDATE,
});
