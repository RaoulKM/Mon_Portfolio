import type { Metadata } from "next";

import { requirePermission } from "@/lib/auth/guard";
import { AdminPageHeader } from "@/components/admin/page-header";
import { getTechnologies, getCategories } from "@/lib/queries";
import { ProjectForm } from "../project-form";

export const metadata: Metadata = { title: "Nouveau projet" };

export default async function NewProjectPage() {
  await requirePermission("MANAGE_PROJECTS");
  const [technologies, categories] = await Promise.all([
    getTechnologies(),
    getCategories(),
  ]);

  return (
    <>
      <AdminPageHeader title="Nouveau projet" description="Créer un projet." />
      <div className="max-w-3xl">
        <ProjectForm technologies={technologies} categories={categories} />
      </div>
    </>
  );
}
