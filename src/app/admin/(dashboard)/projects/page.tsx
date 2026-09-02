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
import { toggleProject, deleteProject } from "./actions";

export const metadata: Metadata = { title: "Projets" };

async function getProjects() {
  try {
    return await prisma.project.findMany({
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      include: { technologies: { select: { name: true } } },
    });
  } catch {
    return null;
  }
}

export default async function ProjectsAdminPage() {
  await requirePermission("MANAGE_PROJECTS");
  const projects = await getProjects();

  return (
    <>
      <AdminPageHeader
        title="Projets"
        description="Créer, modifier, publier et mettre en vedette les projets."
        action={
          <Button asChild>
            <Link href="/admin/projects/new">
              <Plus /> Nouveau projet
            </Link>
          </Button>
        }
      />

      {projects === null ? (
        <AdminPlaceholder note="Base de données indisponible." />
      ) : projects.length === 0 ? (
        <AdminPlaceholder note="Aucun projet. Créez-en un pour commencer." />
      ) : (
        <AdminTable
          head={
            <>
              <th>Projet</th>
              <th>Statut</th>
              <th>Publié</th>
              <th>Vedette</th>
              <th>Vues</th>
              <th className="text-right">Actions</th>
            </>
          }
        >
          {projects.map((p) => (
            <tr key={p.id}>
              <td>
                <Link
                  href={`/admin/projects/${p.id}`}
                  className="font-medium hover:underline"
                >
                  {p.title}
                </Link>
                <p className="text-muted-foreground text-xs">
                  {p.technologies.map((t) => t.name).join(" · ") || "—"}
                </p>
              </td>
              <td className="text-muted-foreground">{p.status}</td>
              <td>
                <InlineToggle
                  action={toggleProject}
                  id={p.id}
                  field="isPublished"
                  value={p.isPublished}
                  onLabel="Publié"
                  offLabel="Brouillon"
                />
              </td>
              <td>
                <InlineToggle
                  action={toggleProject}
                  id={p.id}
                  field="featured"
                  value={p.featured}
                />
              </td>
              <td className="text-muted-foreground">{p.views}</td>
              <td>
                <div className="flex justify-end gap-1">
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/admin/projects/${p.id}`}>Modifier</Link>
                  </Button>
                  <DeleteButton action={deleteProject} id={p.id} label={p.title} />
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </>
  );
}
