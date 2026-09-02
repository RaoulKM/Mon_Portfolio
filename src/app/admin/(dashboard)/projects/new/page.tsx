import type { Metadata } from "next";
import { AdminPageHeader, AdminPlaceholder } from "@/components/admin/page-header";

export const metadata: Metadata = { title: "Nouveau projet" };

export default function ProjectNewAdminPage() {
  return (
    <>
      <AdminPageHeader title="Nouveau projet" description="Création d'un projet." />
      <AdminPlaceholder note="Formulaire de création à implémenter en Phase 3." />
    </>
  );
}
