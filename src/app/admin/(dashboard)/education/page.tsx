import type { Metadata } from "next";
import { AdminPageHeader, AdminPlaceholder } from "@/components/admin/page-header";

export const metadata: Metadata = { title: "Formation" };

export default function EducationAdminPage() {
  return (
    <>
      <AdminPageHeader title="Formation" description="Diplômes et formations." />
      <AdminPlaceholder note="CRUD formation à implémenter en Phase 3." />
    </>
  );
}
