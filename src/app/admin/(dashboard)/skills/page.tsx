import type { Metadata } from "next";
import { AdminPageHeader, AdminPlaceholder } from "@/components/admin/page-header";

export const metadata: Metadata = { title: "Compétences" };

export default function SkillsAdminPage() {
  return (
    <>
      <AdminPageHeader title="Compétences" description="Compétences par catégorie, niveaux et réorganisation drag & drop." />
      <AdminPlaceholder note="CRUD compétences à implémenter en Phase 3." />
    </>
  );
}
