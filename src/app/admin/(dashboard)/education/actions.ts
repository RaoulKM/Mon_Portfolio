"use server";

import { prisma } from "@/lib/prisma";
import { runAction, type ActionResult } from "@/lib/admin/action";
import { makeDeleteAction, makeToggleAction } from "@/lib/admin/crud";
import { educationFormSchema } from "@/lib/validation/admin";

const REVALIDATE = ["/", "/education", "/admin/education"];

export async function saveEducation(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const id = (formData.get("id") as string) || null;
  return runAction(
    {
      permission: "MANAGE_EDUCATION",
      schema: educationFormSchema,
      formData,
      audit: {
        action: id ? "EDUCATION_UPDATED" : "EDUCATION_CREATED",
        entity: "Education",
      },
      revalidate: REVALIDATE,
    },
    async (data) =>
      id
        ? prisma.education.update({ where: { id }, data })
        : prisma.education.create({ data }),
  );
}

export const toggleEducation = makeToggleAction({
  model: "education",
  permission: "MANAGE_EDUCATION",
  entity: "Education",
  fields: ["isVisible"],
  revalidate: REVALIDATE,
});

export const deleteEducation = makeDeleteAction({
  model: "education",
  permission: "MANAGE_EDUCATION",
  entity: "Education",
  revalidate: REVALIDATE,
});
