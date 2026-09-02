import type { Metadata } from "next";
import { AdminPageHeader, AdminPlaceholder } from "@/components/admin/page-header";

export const metadata: Metadata = { title: "Statistiques" };

export default function AnalyticsAdminPage() {
  return (
    <>
      <AdminPageHeader title="Statistiques" description="Visiteurs, pages vues, interactions et graphiques." />
      <AdminPlaceholder note="Tableaux de bord analytics à implémenter en Phase 4." />
    </>
  );
}
