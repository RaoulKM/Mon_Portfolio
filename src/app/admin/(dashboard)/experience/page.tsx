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
import { formatDateRange } from "@/lib/utils";
import { toggleExperience, deleteExperience } from "./actions";

export const metadata: Metadata = { title: "Expériences" };

export default async function ExperienceAdminPage() {
  await requirePermission("MANAGE_EXPERIENCE");
  const items = await prisma.experience
    .findMany({ orderBy: [{ startDate: "desc" }] })
    .catch(() => null);

  return (
    <>
      <AdminPageHeader
        title="Expériences"
        description="Parcours professionnel."
        action={
          <Button asChild>
            <Link href="/admin/experience/new">
              <Plus /> Nouvelle expérience
            </Link>
          </Button>
        }
      />

      {items === null ? (
        <AdminPlaceholder note="Base de données indisponible." />
      ) : items.length === 0 ? (
        <AdminPlaceholder note="Aucune expérience." />
      ) : (
        <AdminTable
          head={
            <>
              <th>Poste</th>
              <th>Période</th>
              <th>Visible</th>
              <th className="text-right">Actions</th>
            </>
          }
        >
          {items.map((e) => (
            <tr key={e.id}>
              <td>
                <span className="font-medium">{e.position}</span>
                <p className="text-muted-foreground text-xs">{e.company}</p>
              </td>
              <td className="text-muted-foreground">
                {formatDateRange(e.startDate, e.endDate)}
              </td>
              <td>
                <InlineToggle
                  action={toggleExperience}
                  id={e.id}
                  field="isVisible"
                  value={e.isVisible}
                />
              </td>
              <td>
                <div className="flex justify-end gap-1">
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/admin/experience/${e.id}`}>Modifier</Link>
                  </Button>
                  <DeleteButton
                    action={deleteExperience}
                    id={e.id}
                    label={`${e.position} — ${e.company}`}
                  />
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </>
  );
}
