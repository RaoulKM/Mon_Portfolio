import type { Metadata } from "next";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth/guard";
import { AdminPageHeader, AdminPlaceholder } from "@/components/admin/page-header";
import { MediaAdder, MediaGrid } from "./media-client";

export const metadata: Metadata = { title: "Médias" };

export default async function MediaAdminPage() {
  await requirePermission("MANAGE_MEDIA");
  const items = await prisma.media
    .findMany({ orderBy: { createdAt: "desc" } })
    .catch(() => null);

  return (
    <>
      <AdminPageHeader
        title="Médias"
        description="Bibliothèque partagée — upload direct ou URL externe."
      />
      <div className="space-y-8">
        <MediaAdder />
        {items === null ? (
          <AdminPlaceholder note="Base de données indisponible." />
        ) : items.length === 0 ? (
          <AdminPlaceholder note="Aucun média." />
        ) : (
          <MediaGrid items={items} />
        )}
      </div>
    </>
  );
}
