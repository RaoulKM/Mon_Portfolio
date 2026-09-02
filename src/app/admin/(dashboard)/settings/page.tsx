import type { Metadata } from "next";
import { AdminPageHeader, AdminPlaceholder } from "@/components/admin/page-header";

export const metadata: Metadata = { title: "Paramètres" };

export default function SettingsAdminPage() {
  return (
    <>
      <AdminPageHeader title="Paramètres" description="Général, SEO, réseaux sociaux et contact." />
      <AdminPlaceholder note="Formulaires de paramètres à implémenter en Phase 3." />
    </>
  );
}
