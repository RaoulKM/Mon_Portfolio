"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { apiRequire } from "@/lib/auth/guard";
import { logAudit } from "@/lib/admin/audit";
import { errResult, ok, type ActionResult } from "@/lib/admin/action";
import { messageStatusSchema, messageReplySchema } from "@/lib/validation/admin";
import { sendEmail, isEmailConfigured } from "@/lib/email";

/** Refresh the messages page, the dashboard, and the shared admin layout
 *  (so the sidebar unread counter updates everywhere). */
function revalidateMessages() {
  revalidatePath("/admin/messages");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin", "layout");
}

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
        readAt: parsed.data.status === "READ" ? new Date() : undefined,
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
  revalidateMessages();
  return ok();
}

export async function replyToMessage(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user, error } = await apiRequire("MANAGE_MESSAGES");
  if (error === "unauthorized") return errResult("Session expirée.");
  if (error === "forbidden") return errResult("Permission refusée.");

  const parsed = messageReplySchema.safeParse({
    id: formData.get("id"),
    subject: formData.get("subject"),
    body: formData.get("body"),
  });
  if (!parsed.success) {
    return errResult(
      "Certains champs sont invalides.",
      parsed.error.flatten().fieldErrors as Record<string, string[]>,
    );
  }

  if (!isEmailConfigured()) {
    return errResult(
      "Aucun serveur d'email configuré (EMAIL_SERVER). La réponse n'a pas été envoyée.",
    );
  }

  const message = await prisma.contactMessage
    .findUnique({ where: { id: parsed.data.id } })
    .catch(() => null);
  if (!message) return errResult("Message introuvable.");

  try {
    await sendEmail({
      to: message.email,
      subject: parsed.data.subject,
      text: parsed.data.body,
      replyTo: process.env.EMAIL_FROM,
    });
  } catch (err) {
    console.error("[messages:reply:send]", err);
    return errResult("L'envoi de l'email a échoué. Réessayez plus tard.");
  }

  try {
    await prisma.contactMessage.update({
      where: { id: parsed.data.id },
      data: {
        repliedAt: new Date(),
        replyBody: parsed.data.body,
        status: message.status === "UNREAD" ? "READ" : message.status,
        readAt: message.readAt ?? new Date(),
      },
    });
  } catch (err) {
    // The email went out — don't fail the action, just log.
    console.error("[messages:reply:persist]", err);
  }

  await logAudit({
    action: "MESSAGE_REPLIED",
    entity: "ContactMessage",
    entityId: parsed.data.id,
    userId: user.id,
    metadata: { to: message.email, subject: parsed.data.subject },
  });
  revalidateMessages();
  return ok(undefined, `Réponse envoyée à ${message.email}.`);
}

export async function deleteMessage(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user, error } = await apiRequire("MANAGE_MESSAGES");
  if (error === "unauthorized") return errResult("Session expirée.");
  if (error === "forbidden") return errResult("Permission refusée.");

  const id = String(formData.get("id") ?? "");
  if (!id) return errResult("Identifiant manquant.");

  try {
    await prisma.contactMessage.delete({ where: { id } });
    await logAudit({
      action: "MESSAGE_DELETED",
      entity: "ContactMessage",
      entityId: id,
      userId: user.id,
    });
  } catch (err) {
    console.error("[messages:delete]", err);
    return errResult("Suppression impossible.");
  }

  revalidateMessages();
  return ok(undefined, "Message supprimé.");
}
