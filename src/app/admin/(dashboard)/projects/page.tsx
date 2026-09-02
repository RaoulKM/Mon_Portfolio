import type { Metadata } from "next";
import { AdminPageHeader, AdminPlaceholder } from "@/components/admin/page-header";

export const metadata: Metadata = { title: "Projets" };

export default function ProjectsAdminPage() {
  return (
    <>
      <AdminPageHeader title="Projets" description="Créer, modifier, publier, mettre en vedette et réordonner les projets." />
      <AdminPlaceholder note="Table CRUD projets à implémenter en Phase 3." />
    </>
  );
}
