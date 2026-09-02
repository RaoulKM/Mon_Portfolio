"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { apiRequire } from "@/lib/auth/guard";
import { getStorage } from "@/lib/storage";
import { logAudit } from "@/lib/admin/audit";
import { runAction, errResult, ok, type ActionResult } from "@/lib/admin/action";
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

export async function deleteMedia(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user, error } = await apiRequire("MANAGE_MEDIA");
  if (error === "unauthorized") return errResult("Session expirée.");
  if (error === "forbidden") return errResult("Permission refusée.");

  const id = String(formData.get("id") ?? "");
  if (!id) return errResult("Identifiant manquant.");

  try {
    const media = await prisma.media.delete({ where: { id } });
    if (media.provider === "local") {
      await getStorage().delete(media.url);
    }
    await logAudit({
      action: "MEDIA_DELETED",
      entity: "Media",
      entityId: id,
      userId: user.id,
    });
  } catch (err) {
    console.error("[media:delete]", err);
    return errResult("Suppression impossible.");
  }

  for (const p of REVALIDATE) revalidatePath(p);
  return ok(undefined, "Média supprimé.");
}
