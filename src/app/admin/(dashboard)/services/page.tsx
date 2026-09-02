import type { Metadata } from "next";
import { AdminPageHeader, AdminPlaceholder } from "@/components/admin/page-header";

export const metadata: Metadata = { title: "Services" };

export default function ServicesAdminPage() {
  return (
    <>
      <AdminPageHeader title="Services" description="Prestations proposées." />
      <AdminPlaceholder note="CRUD services à implémenter en Phase 3." />
    </>
  );
}
