import type { Metadata } from "next";
import { AdminPageHeader, AdminPlaceholder } from "@/components/admin/page-header";

export const metadata: Metadata = { title: "Blog" };

export default function BlogAdminPage() {
  return (
    <>
      <AdminPageHeader title="Blog" description="Articles techniques : brouillon, publication, catégories et tags." />
      <AdminPlaceholder note="CRUD blog à implémenter en Phase 5 (V2)." />
    </>
  );
}
