import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth/guard";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminPlaceholder } from "@/components/admin/page-header";
import { AdminTable } from "@/components/admin/table";
import { InlineToggle } from "@/components/admin/inline-toggle";
import { DeleteButton } from "@/components/admin/delete-button";
import { toggleService, deleteService } from "./actions";

export const metadata: Metadata = { title: "Services" };

export default async function ServicesAdminPage() {
  await requirePermission("MANAGE_SERVICES");
  const items = await prisma.service
    .findMany({ orderBy: [{ displayOrder: "asc" }] })
    .catch(() => null);

  return (
    <>
      <AdminPageHeader
        title="Services"
        description="Prestations proposées."
        action={
          <Button asChild>
            <Link href="/admin/services/new">
              <Plus /> Nouveau service
            </Link>
          </Button>
        }
      />

      {items === null ? (
        <AdminPlaceholder note="Base de données indisponible." />
      ) : items.length === 0 ? (
        <AdminPlaceholder note="Aucun service." />
      ) : (
        <AdminTable
          head={
            <>
              <th>Service</th>
              <th>Vedette</th>
              <th>Visible</th>
              <th className="text-right">Actions</th>
            </>
          }
        >
          {items.map((s) => (
            <tr key={s.id}>
              <td>
                <span className="font-medium">{s.title}</span>
                <p className="text-muted-foreground line-clamp-1 text-xs">
                  {s.description}
                </p>
              </td>
              <td>
                <InlineToggle
                  action={toggleService}
                  id={s.id}
                  field="featured"
                  value={s.featured}
                />
              </td>
              <td>
                <InlineToggle
                  action={toggleService}
                  id={s.id}
                  field="isVisible"
                  value={s.isVisible}
                />
              </td>
              <td>
                <div className="flex justify-end gap-1">
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/admin/services/${s.id}`}>Modifier</Link>
                  </Button>
                  <DeleteButton action={deleteService} id={s.id} label={s.title} />
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </>
  );
}
