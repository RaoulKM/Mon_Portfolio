import "server-only";
import { z } from "zod";
import { revalidatePath } from "next/cache";

import { apiRequire } from "@/lib/auth/guard";
import type { Permission } from "@/lib/auth/permissions";
import { logAudit } from "./audit";

export type ActionResult<T = unknown> =
  | { ok: true; message?: string; data?: T }
  | { ok: false; message: string; fieldErrors?: Record<string, string[]> };

export const ok = <T>(data?: T, message?: string): ActionResult<T> => ({
  ok: true,
  data,
  message,
});

export const errResult = (
  message: string,
  fieldErrors?: Record<string, string[]>,
): { ok: false; message: string; fieldErrors?: Record<string, string[]> } => ({
  ok: false,
  message,
  fieldErrors,
});

/**
 * Wrap a Server Action body with: permission check, Zod validation of the
 * submitted FormData, audit logging and path revalidation.
 */
export async function runAction<S extends z.ZodType, T>(
  opts: {
    permission: Permission;
    schema: S;
    formData: FormData;
    audit?: { action: string; entity: string; entityId?: (input: z.infer<S>, result: T) => string | undefined };
    revalidate?: string[];
  },
  handler: (input: z.infer<S>, ctx: { userId: string }) => Promise<T>,
): Promise<ActionResult<T>> {
  const { user, error } = await apiRequire(opts.permission);
  if (error === "unauthorized") return errResult("Session expirée. Reconnectez-vous.");
  if (error === "forbidden") return errResult("Vous n'avez pas la permission requise.");

  const raw = formDataToObject(opts.formData);
  const parsed = opts.schema.safeParse(raw);
  if (!parsed.success) {
    return errResult("Certains champs sont invalides.", parsed.error.flatten().fieldErrors as Record<string, string[]>);
  }

  let result: T;
  try {
    result = await handler(parsed.data, { userId: user.id });
  } catch (err) {
    console.error(`[action:${opts.audit?.action ?? "?"}]`, err);
    if (isUniqueConstraintError(err)) {
      return errResult("Un enregistrement avec cette valeur existe déjà (slug ?).");
    }
    return errResult("Une erreur est survenue lors de l'enregistrement.");
  }

  if (opts.audit) {
    await logAudit({
      action: opts.audit.action,
      entity: opts.audit.entity,
      entityId: opts.audit.entityId?.(parsed.data, result),
      userId: user.id,
    });
  }

  for (const path of opts.revalidate ?? []) revalidatePath(path);

  return ok(result);
}

function formDataToObject(fd: FormData): Record<string, unknown> {
  const obj: Record<string, unknown> = {};
  for (const key of new Set(fd.keys())) {
    const all = fd.getAll(key).filter((v) => !(v instanceof File));
    obj[key] = all.length > 1 ? all : all[0];
  }
  return obj;
}

function isUniqueConstraintError(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code?: string }).code === "P2002"
  );
}
