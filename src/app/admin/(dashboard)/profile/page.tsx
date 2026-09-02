import type { Metadata } from "next";
import { AdminPageHeader, AdminPlaceholder } from "@/components/admin/page-header";

export const metadata: Metadata = { title: "Profil" };

export default function ProfileAdminPage() {
  return (
    <>
      <AdminPageHeader title="Profil" description="Photo, identité, bio, coordonnées, CV et réseaux sociaux." />
      <AdminPlaceholder note="Formulaire profil à implémenter en Phase 3." />
    </>
  );
}
