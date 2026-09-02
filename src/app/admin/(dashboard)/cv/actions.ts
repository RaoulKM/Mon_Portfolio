"use server";

import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { runAction, type ActionResult } from "@/lib/admin/action";
import { optionalImageRef } from "@/lib/validation/forms";

const cvSchema = z.object({
  cvUrlFr: optionalImageRef,
  cvUrlEn: optionalImageRef,
});

export async function saveCv(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  return runAction(
    {
      permission: "MANAGE_PROFILE",
      schema: cvSchema,
      formData,
      audit: { action: "CV_UPDATED", entity: "Profile" },
      revalidate: ["/", "/resume", "/admin/cv", "/admin/profile"],
    },
    async (data) => {
      const existing = await prisma.profile.findFirst({
        where: { isPrimary: true },
      });
      if (!existing) {
        throw new Error("Aucun profil : créez-le d'abord dans Profil.");
      }
      return prisma.profile.update({
        where: { id: existing.id },
        data: {
          cvUrlFr: data.cvUrlFr ?? null,
          cvUrlEn: data.cvUrlEn ?? null,
        },
      });
    },
  );
}
