"use server";

import { prisma } from "@/lib/prisma";
import { runAction, type ActionResult } from "@/lib/admin/action";
import { makeDeleteAction, makeToggleAction } from "@/lib/admin/crud";
import { serviceFormSchema } from "@/lib/validation/admin";

const REVALIDATE = ["/", "/services", "/admin/services"];

export async function saveService(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const id = (formData.get("id") as string) || null;
  return runAction(
    {
      permission: "MANAGE_SERVICES",
      schema: serviceFormSchema,
      formData,
      audit: {
        action: id ? "SERVICE_UPDATED" : "SERVICE_CREATED",
        entity: "Service",
      },
      revalidate: REVALIDATE,
    },
    async (data) =>
      id
        ? prisma.service.update({ where: { id }, data })
        : prisma.service.create({ data }),
  );
}

export const toggleService = makeToggleAction({
  model: "service",
  permission: "MANAGE_SERVICES",
  entity: "Service",
  fields: ["isVisible", "featured"],
  revalidate: REVALIDATE,
});

export const deleteService = makeDeleteAction({
  model: "service",
  permission: "MANAGE_SERVICES",
  entity: "Service",
  revalidate: REVALIDATE,
});
