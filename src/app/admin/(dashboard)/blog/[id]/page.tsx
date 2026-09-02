import type { Metadata } from "next";
import { AdminPageHeader, AdminPlaceholder } from "@/components/admin/page-header";

export const metadata: Metadata = { title: "Modifier l'article" };

export default function BlogEditAdminPage() {
  return (
    <>
      <AdminPageHeader title="Modifier l'article" description="Édition d'un article." />
      <AdminPlaceholder note="Éditeur d'article à implémenter en V2." />
    </>
  );
}
