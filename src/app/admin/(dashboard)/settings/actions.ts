"use server";

import type { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { apiRequire } from "@/lib/auth/guard";
import { logAudit } from "@/lib/admin/audit";
import { errResult, ok, type ActionResult } from "@/lib/admin/action";

const ALLOWED_KEYS = ["general", "seo", "social", "contact"] as const;

export async function saveSetting(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user, error } = await apiRequire("MANAGE_SETTINGS");
  if (error === "unauthorized") return errResult("Session expirée.");
  if (error === "forbidden") return errResult("Permission refusée.");

  const key = String(formData.get("_key") ?? "");
  if (!ALLOWED_KEYS.includes(key as (typeof ALLOWED_KEYS)[number])) {
    return errResult("Clé de paramètre invalide.");
  }

  const value: Record<string, unknown> = {};
  for (const [field, raw] of formData.entries()) {
    if (field === "_key" || raw instanceof File) continue;
    const v = String(raw).trim();
    value[field] = field === "keywords" ? splitList(v) : v;
  }

  try {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value: value as Prisma.InputJsonValue },
      create: { key, value: value as Prisma.InputJsonValue },
    });
  } catch (err) {
    console.error("[settings]", err);
    return errResult("Enregistrement impossible.");
  }

  await logAudit({
    action: "SETTING_UPDATED",
    entity: "SiteSetting",
    entityId: key,
    userId: user.id,
  });
  revalidatePath("/");
  revalidatePath("/admin/settings");
  return ok(undefined, "Paramètres enregistrés.");
}

function splitList(v: string): string[] {
  return v
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);
}
