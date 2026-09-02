"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { apiRequire } from "@/lib/auth/guard";
import { logAudit } from "@/lib/admin/audit";
import { makeDeleteAction } from "@/lib/admin/crud";
import { errResult, ok, type ActionResult } from "@/lib/admin/action";
import { messageStatusSchema } from "@/lib/validation/admin";

export async function setMessageStatus(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user, error } = await apiRequire("MANAGE_MESSAGES");
  if (error === "unauthorized") return errResult("Session expirée.");
  if (error === "forbidden") return errResult("Permission refusée.");

  const parsed = messageStatusSchema.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
  });
  if (!parsed.success) return errResult("Requête invalide.");

  try {
    await prisma.contactMessage.update({
      where: { id: parsed.data.id },
      data: {
        status: parsed.data.status,
        readAt:
          parsed.data.status === "READ" ? new Date() : undefined,
      },
    });
  } catch (err) {
    console.error("[messages]", err);
    return errResult("Mise à jour impossible.");
  }

  await logAudit({
    action: "MESSAGE_STATUS_CHANGED",
    entity: "ContactMessage",
    entityId: parsed.data.id,
    userId: user.id,
    metadata: { status: parsed.data.status },
  });
  revalidatePath("/admin/messages");
  revalidatePath("/admin/dashboard");
  return ok();
}

export const deleteMessage = makeDeleteAction({
  model: "contactMessage",
  permission: "MANAGE_MESSAGES",
  entity: "ContactMessage",
  revalidate: ["/admin/messages", "/admin/dashboard"],
});
