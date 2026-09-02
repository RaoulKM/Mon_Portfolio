import type { Metadata } from "next";
import { AdminPageHeader, AdminPlaceholder } from "@/components/admin/page-header";

export const metadata: Metadata = { title: "Expériences" };

export default function ExperienceAdminPage() {
  return (
    <>
      <AdminPageHeader title="Expériences" description="Parcours professionnel." />
      <AdminPlaceholder note="CRUD expériences à implémenter en Phase 3." />
    </>
  );
}
