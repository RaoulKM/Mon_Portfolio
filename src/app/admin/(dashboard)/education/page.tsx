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
import { toggleEducation, deleteEducation } from "./actions";

export const metadata: Metadata = { title: "Formation" };

export default async function EducationAdminPage() {
  await requirePermission("MANAGE_EDUCATION");
  const items = await prisma.education
    .findMany({ orderBy: [{ startDate: "desc" }] })
    .catch(() => null);

  return (
    <>
      <AdminPageHeader
        title="Formation"
        description="Diplômes et formations."
        action={
          <Button asChild>
            <Link href="/admin/education/new">
              <Plus /> Nouvelle formation
            </Link>
          </Button>
        }
      />

      {items === null ? (
        <AdminPlaceholder note="Base de données indisponible." />
      ) : items.length === 0 ? (
        <AdminPlaceholder note="Aucune formation." />
      ) : (
        <AdminTable
          head={
            <>
              <th>Diplôme</th>
              <th>Période</th>
              <th>Visible</th>
              <th className="text-right">Actions</th>
            </>
          }
        >
          {items.map((e) => (
            <tr key={e.id}>
              <td>
                <span className="font-medium">{e.degree}</span>
                <p className="text-muted-foreground text-xs">{e.institution}</p>
              </td>
              <td className="text-muted-foreground">
                {formatDateRange(e.startDate, e.endDate)}
              </td>
              <td>
                <InlineToggle
                  action={toggleEducation}
                  id={e.id}
                  field="isVisible"
                  value={e.isVisible}
                />
              </td>
              <td>
                <div className="flex justify-end gap-1">
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/admin/education/${e.id}`}>Modifier</Link>
                  </Button>
                  <DeleteButton action={deleteEducation} id={e.id} label={e.degree} />
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </>
  );
}
