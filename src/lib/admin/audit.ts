import "server-only";
import { headers } from "next/headers";
import type { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

/** Record an admin action in the audit log (spec §35). Never throws. */
export async function logAudit(params: {
  action: string;
  entity?: string;
  entityId?: string;
  userId?: string;
  metadata?: Prisma.InputJsonValue;
}) {
  try {
    let ip: string | undefined;
    try {
      const h = await headers();
      ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined;
    } catch {
      /* headers() unavailable outside a request */
    }

    await prisma.auditLog.create({
      data: {
        action: params.action,
        entity: params.entity ?? null,
        entityId: params.entityId ?? null,
        userId: params.userId ?? null,
        metadata: params.metadata,
        ip: ip ?? null,
      },
    });
  } catch (err) {
    console.error("[audit] failed", err);
  }
}
