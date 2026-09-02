import type { Metadata } from "next";
import { AdminPageHeader, AdminPlaceholder } from "@/components/admin/page-header";

export const metadata: Metadata = { title: "Modifier le projet" };

export default function ProjectEditAdminPage() {
  return (
    <>
      <AdminPageHeader title="Modifier le projet" description="Édition d'un projet." />
      <AdminPlaceholder note="Formulaire d'édition à implémenter en Phase 3." />
    </>
  );
}
