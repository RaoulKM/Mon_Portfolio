"use server";

import { prisma } from "@/lib/prisma";
import { runAction, type ActionResult } from "@/lib/admin/action";
import { makeDeleteAction } from "@/lib/admin/crud";
import { mediaFormSchema } from "@/lib/validation/admin";

const REVALIDATE = ["/admin/media"];

export async function saveMedia(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  return runAction(
    {
      permission: "MANAGE_MEDIA",
      schema: mediaFormSchema,
      formData,
      audit: { action: "MEDIA_CREATED", entity: "Media" },
      revalidate: REVALIDATE,
    },
    async (data) =>
      prisma.media.create({ data: { ...data, provider: "external" } }),
  );
}

export const deleteMedia = makeDeleteAction({
  model: "media",
  permission: "MANAGE_MEDIA",
  entity: "Media",
  revalidate: REVALIDATE,
});
