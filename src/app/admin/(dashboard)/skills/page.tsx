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
import { toggleSkill, deleteSkill } from "./actions";

export const metadata: Metadata = { title: "Compétences" };

export default async function SkillsAdminPage() {
  await requirePermission("MANAGE_SKILLS");

  const skills = await prisma.skill
    .findMany({ orderBy: [{ category: "asc" }, { displayOrder: "asc" }] })
    .catch(() => null);

  return (
    <>
      <AdminPageHeader
        title="Compétences"
        description="Niveaux, catégories et visibilité."
        action={
          <Button asChild>
            <Link href="/admin/skills/new">
              <Plus /> Nouvelle compétence
            </Link>
          </Button>
        }
      />

      {skills === null ? (
        <AdminPlaceholder note="Base de données indisponible." />
      ) : skills.length === 0 ? (
        <AdminPlaceholder note="Aucune compétence." />
      ) : (
        <AdminTable
          head={
            <>
              <th>Nom</th>
              <th>Catégorie</th>
              <th>Niveau</th>
              <th>Visible</th>
              <th className="text-right">Actions</th>
            </>
          }
        >
          {skills.map((s) => (
            <tr key={s.id}>
              <td className="font-medium">{s.name}</td>
              <td className="text-muted-foreground">{s.category}</td>
              <td>{s.level}%</td>
              <td>
                <InlineToggle
                  action={toggleSkill}
                  id={s.id}
                  field="isVisible"
                  value={s.isVisible}
                />
              </td>
              <td>
                <div className="flex justify-end gap-1">
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/admin/skills/${s.id}`}>Modifier</Link>
                  </Button>
                  <DeleteButton action={deleteSkill} id={s.id} label={s.name} />
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </>
  );
}
