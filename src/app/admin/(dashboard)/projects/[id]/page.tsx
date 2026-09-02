import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth/guard";
import { AdminPageHeader } from "@/components/admin/page-header";
import { getTechnologies, getCategories } from "@/lib/queries";
import { ProjectForm } from "../project-form";

export const metadata: Metadata = { title: "Modifier le projet" };

export default async function EditProjectPage({
  params,
}: PageProps<"/admin/projects/[id]">) {
  await requirePermission("MANAGE_PROJECTS");
  const { id } = await params;

  const [project, technologies, categories] = await Promise.all([
    prisma.project
      .findUnique({ where: { id }, include: { technologies: true } })
      .catch(() => null),
    getTechnologies(),
    getCategories(),
  ]);

  if (!project) notFound();

  return (
    <>
      <AdminPageHeader title={project.title} description="Modifier le projet." />
      <div className="max-w-3xl">
        <ProjectForm
          project={project}
          technologies={technologies}
          categories={categories}
        />
      </div>
    </>
  );
}
