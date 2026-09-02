"use server";

import { prisma } from "@/lib/prisma";
import { apiUser } from "@/lib/auth/guard";
import { hashPassword, verifyPassword } from "@/lib/auth/hash";
import { logAudit } from "@/lib/admin/audit";
import { changePasswordSchema } from "@/lib/validation/auth";
import { errResult, ok, type ActionResult } from "@/lib/admin/action";

export async function changePassword(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const user = await apiUser();
  if (!user) return errResult("Session expirée. Reconnectez-vous.");

  const parsed = changePasswordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!parsed.success) {
    return errResult(
      "Vérifiez les champs.",
      parsed.error.flatten().fieldErrors as Record<string, string[]>,
    );
  }

  const record = await prisma.user
    .findUnique({ where: { id: user.id }, select: { passwordHash: true } })
    .catch(() => null);

  if (!record?.passwordHash) {
    return errResult("Aucun mot de passe défini sur ce compte.");
  }

  const okCurrent = await verifyPassword(
    parsed.data.currentPassword,
    record.passwordHash,
  );
  if (!okCurrent) {
    return errResult("Mot de passe actuel incorrect.", {
      currentPassword: ["Mot de passe actuel incorrect."],
    });
  }

  if (parsed.data.newPassword === parsed.data.currentPassword) {
    return errResult("Le nouveau mot de passe doit être différent.", {
      newPassword: ["Choisissez un mot de passe différent de l'actuel."],
    });
  }

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: await hashPassword(parsed.data.newPassword) },
    });
  } catch (err) {
    console.error("[account:password]", err);
    return errResult("Enregistrement impossible.");
  }

  await logAudit({
    action: "USER_PASSWORD_CHANGED",
    entity: "User",
    entityId: user.id,
    userId: user.id,
  });

  return ok(undefined, "Mot de passe mis à jour.");
}
