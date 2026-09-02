"use server";

import { prisma } from "@/lib/prisma";
import { runAction, type ActionResult } from "@/lib/admin/action";
import { makeDeleteAction, makeToggleAction } from "@/lib/admin/crud";
import { projectFormSchema } from "@/lib/validation/admin";

const REVALIDATE = ["/", "/projects", "/admin/projects", "/sitemap.xml"];

export async function saveProject(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const id = (formData.get("id") as string) || null;

  return runAction(
    {
      permission: "MANAGE_PROJECTS",
      schema: projectFormSchema,
      formData,
      audit: {
        action: id ? "PROJECT_UPDATED" : "PROJECT_CREATED",
        entity: "Project",
        entityId: (_i, r) => (r as { id: string }).id,
      },
      revalidate: REVALIDATE,
    },
    async (input) => {
      const { technologyIds, categoryId, ...rest } = input;
      const connect = technologyIds.map((tid) => ({ id: tid }));

      if (id) {
        return prisma.project.update({
          where: { id },
          data: {
            ...rest,
            technologies: { set: connect },
            category: categoryId
              ? { connect: { id: categoryId } }
              : { disconnect: true },
          },
        });
      }

      return prisma.project.create({
        data: {
          ...rest,
          technologies: { connect },
          category: categoryId ? { connect: { id: categoryId } } : undefined,
        },
      });
    },
  );
}

export const toggleProject = makeToggleAction({
  model: "project",
  permission: "MANAGE_PROJECTS",
  entity: "Project",
  fields: ["isPublished", "featured"],
  revalidate: REVALIDATE,
});

export const deleteProject = makeDeleteAction({
  model: "project",
  permission: "MANAGE_PROJECTS",
  entity: "Project",
  revalidate: REVALIDATE,
});
