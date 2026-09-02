import "server-only";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { apiRequire } from "@/lib/auth/guard";
import type { Permission } from "@/lib/auth/permissions";
import { logAudit } from "./audit";
import { errResult, ok, type ActionResult } from "./action";

type ModelName = Parameters<typeof getDelegate>[0];

/* eslint-disable @typescript-eslint/no-explicit-any */
function getDelegate(model: string) {
  // Prisma delegates aren't easily typed generically; this stays internal.
  return (prisma as unknown as Record<string, {
    update: (a: unknown) => any;
    delete: (a: unknown) => any;
  }>)[model];
}

async function guard(permission: Permission) {
  const { user, error } = await apiRequire(permission);
  if (error === "unauthorized") return { user: null, msg: "Session expirée." as const };
  if (error === "forbidden") return { user: null, msg: "Permission refusée." as const };
  return { user, msg: null };
}

/** Toggle a boolean column: FormData { id, field, value:"true"|"false" }. */
export function makeToggleAction(cfg: {
  model: ModelName;
  permission: Permission;
  entity: string;
  fields: string[];
  revalidate?: string[];
}) {
  return async function toggle(
    _prev: ActionResult | null,
    fd: FormData,
  ): Promise<ActionResult> {
    const g = await guard(cfg.permission);
    if (g.msg) return errResult(g.msg);

    const id = String(fd.get("id") ?? "");
    const field = String(fd.get("field") ?? "");
    const value = String(fd.get("value") ?? "") === "true";
    if (!id || !cfg.fields.includes(field)) return errResult("Requête invalide.");

    try {
      await getDelegate(cfg.model).update({ where: { id }, data: { [field]: value } });
    } catch (err) {
      console.error(`[toggle:${cfg.model}]`, err);
      return errResult("Mise à jour impossible.");
    }

    await logAudit({
      action: `${cfg.entity.toUpperCase()}_UPDATED`,
      entity: cfg.entity,
      entityId: id,
      userId: g.user!.id,
      metadata: { [field]: value },
    });
    for (const p of cfg.revalidate ?? []) revalidatePath(p);
    return ok();
  };
}

/** Delete a row: FormData { id }. */
export function makeDeleteAction(cfg: {
  model: ModelName;
  permission: Permission;
  entity: string;
  revalidate?: string[];
}) {
  return async function remove(
    _prev: ActionResult | null,
    fd: FormData,
  ): Promise<ActionResult> {
    const g = await guard(cfg.permission);
    if (g.msg) return errResult(g.msg);

    const id = String(fd.get("id") ?? "");
    if (!id) return errResult("Identifiant manquant.");

    try {
      await getDelegate(cfg.model).delete({ where: { id } });
    } catch (err) {
      console.error(`[delete:${cfg.model}]`, err);
      return errResult("Suppression impossible.");
    }

    await logAudit({
      action: `${cfg.entity.toUpperCase()}_DELETED`,
      entity: cfg.entity,
      entityId: id,
      userId: g.user!.id,
    });
    for (const p of cfg.revalidate ?? []) revalidatePath(p);
    return ok(undefined, "Élément supprimé.");
  };
}

/** Persist a new order: FormData { ids: [] } → displayOrder = index. */
export function makeReorderAction(cfg: {
  model: ModelName;
  permission: Permission;
  entity: string;
  revalidate?: string[];
}) {
  return async function reorder(
    _prev: ActionResult | null,
    fd: FormData,
  ): Promise<ActionResult> {
    const g = await guard(cfg.permission);
    if (g.msg) return errResult(g.msg);

    const ids = fd.getAll("ids").map(String).filter(Boolean);
    if (!ids.length) return errResult("Rien à réordonner.");

    try {
      await prisma.$transaction(
        ids.map((id, index) =>
          getDelegate(cfg.model).update({ where: { id }, data: { displayOrder: index } }),
        ) as any,
      );
    } catch (err) {
      console.error(`[reorder:${cfg.model}]`, err);
      return errResult("Réordonnancement impossible.");
    }

    for (const p of cfg.revalidate ?? []) revalidatePath(p);
    return ok(undefined, "Ordre mis à jour.");
  };
}
