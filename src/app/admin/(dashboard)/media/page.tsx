import type { Metadata } from "next";
import { AdminPageHeader, AdminPlaceholder } from "@/components/admin/page-header";

export const metadata: Metadata = { title: "Médias" };

export default function MediaAdminPage() {
  return (
    <>
      <AdminPageHeader title="Médias" description="Médiathèque : upload, recherche, preview et suppression." />
      <AdminPlaceholder note="Médiathèque à implémenter en Phase 3." />
    </>
  );
}
