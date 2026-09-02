import type { Metadata } from "next";
import { AdminPageHeader, AdminPlaceholder } from "@/components/admin/page-header";

export const metadata: Metadata = { title: "Nouvel article" };

export default function BlogNewAdminPage() {
  return (
    <>
      <AdminPageHeader title="Nouvel article" description="Rédaction d'un article." />
      <AdminPlaceholder note="Éditeur d'article à implémenter en V2." />
    </>
  );
}
