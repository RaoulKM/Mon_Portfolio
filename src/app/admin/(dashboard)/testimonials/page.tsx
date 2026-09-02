import type { Metadata } from "next";
import { AdminPageHeader, AdminPlaceholder } from "@/components/admin/page-header";

export const metadata: Metadata = { title: "Témoignages" };

export default function TestimonialsAdminPage() {
  return (
    <>
      <AdminPageHeader title="Témoignages" description="Gestion des témoignages clients." />
      <AdminPlaceholder note="CRUD témoignages à implémenter en V2." />
    </>
  );
}
