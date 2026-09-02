"use server";

import { prisma } from "@/lib/prisma";
import { runAction, type ActionResult } from "@/lib/admin/action";
import { makeDeleteAction, makeToggleAction } from "@/lib/admin/crud";
import { certificationFormSchema } from "@/lib/validation/admin";

const REVALIDATE = ["/", "/certifications", "/admin/certifications"];

export async function saveCertification(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const id = (formData.get("id") as string) || null;
  return runAction(
    {
      permission: "MANAGE_CERTIFICATIONS",
      schema: certificationFormSchema,
      formData,
      audit: {
        action: id ? "CERTIFICATION_UPDATED" : "CERTIFICATION_CREATED",
        entity: "Certification",
      },
      revalidate: REVALIDATE,
    },
    async (data) =>
      id
        ? prisma.certification.update({ where: { id }, data })
        : prisma.certification.create({ data }),
  );
}

export const toggleCertification = makeToggleAction({
  model: "certification",
  permission: "MANAGE_CERTIFICATIONS",
  entity: "Certification",
  fields: ["isVisible"],
  revalidate: REVALIDATE,
});

export const deleteCertification = makeDeleteAction({
  model: "certification",
  permission: "MANAGE_CERTIFICATIONS",
  entity: "Certification",
  revalidate: REVALIDATE,
});
