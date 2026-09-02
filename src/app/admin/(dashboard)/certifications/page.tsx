import type { Metadata } from "next";
import { AdminPageHeader, AdminPlaceholder } from "@/components/admin/page-header";

export const metadata: Metadata = { title: "Certifications" };

export default function CertificationsAdminPage() {
  return (
    <>
      <AdminPageHeader title="Certifications" description="Certifications et accréditations." />
      <AdminPlaceholder note="CRUD certifications à implémenter en Phase 3." />
    </>
  );
}
