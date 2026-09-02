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
import { toggleCertification, deleteCertification } from "./actions";

export const metadata: Metadata = { title: "Certifications" };

const dateFmt = new Intl.DateTimeFormat("fr-FR", { month: "short", year: "numeric" });

export default async function CertificationsAdminPage() {
  await requirePermission("MANAGE_CERTIFICATIONS");
  const items = await prisma.certification
    .findMany({ orderBy: [{ issueDate: "desc" }] })
    .catch(() => null);

  return (
    <>
      <AdminPageHeader
        title="Certifications"
        description="Certifications et accréditations."
        action={
          <Button asChild>
            <Link href="/admin/certifications/new">
              <Plus /> Nouvelle certification
            </Link>
          </Button>
        }
      />

      {items === null ? (
        <AdminPlaceholder note="Base de données indisponible." />
      ) : items.length === 0 ? (
        <AdminPlaceholder note="Aucune certification." />
      ) : (
        <AdminTable
          head={
            <>
              <th>Certification</th>
              <th>Date</th>
              <th>Visible</th>
              <th className="text-right">Actions</th>
            </>
          }
        >
          {items.map((c) => (
            <tr key={c.id}>
              <td>
                <span className="font-medium">{c.name}</span>
                <p className="text-muted-foreground text-xs">{c.issuer}</p>
              </td>
              <td className="text-muted-foreground">{dateFmt.format(c.issueDate)}</td>
              <td>
                <InlineToggle
                  action={toggleCertification}
                  id={c.id}
                  field="isVisible"
                  value={c.isVisible}
                />
              </td>
              <td>
                <div className="flex justify-end gap-1">
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/admin/certifications/${c.id}`}>Modifier</Link>
                  </Button>
                  <DeleteButton
                    action={deleteCertification}
                    id={c.id}
                    label={c.name}
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
