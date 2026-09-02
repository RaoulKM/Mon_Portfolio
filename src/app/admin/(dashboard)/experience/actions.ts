"use server";

import { prisma } from "@/lib/prisma";
import { runAction, type ActionResult } from "@/lib/admin/action";
import { makeDeleteAction, makeToggleAction } from "@/lib/admin/crud";
import { experienceFormSchema } from "@/lib/validation/admin";

const REVALIDATE = ["/", "/experience", "/admin/experience"];

export async function saveExperience(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const id = (formData.get("id") as string) || null;
  return runAction(
    {
      permission: "MANAGE_EXPERIENCE",
      schema: experienceFormSchema,
      formData,
      audit: {
        action: id ? "EXPERIENCE_UPDATED" : "EXPERIENCE_CREATED",
        entity: "Experience",
      },
      revalidate: REVALIDATE,
    },
    async (data) =>
      id
        ? prisma.experience.update({ where: { id }, data })
        : prisma.experience.create({ data }),
  );
}

export const toggleExperience = makeToggleAction({
  model: "experience",
  permission: "MANAGE_EXPERIENCE",
  entity: "Experience",
  fields: ["isVisible", "isCurrent"],
  revalidate: REVALIDATE,
});

export const deleteExperience = makeDeleteAction({
  model: "experience",
  permission: "MANAGE_EXPERIENCE",
  entity: "Experience",
  revalidate: REVALIDATE,
});
