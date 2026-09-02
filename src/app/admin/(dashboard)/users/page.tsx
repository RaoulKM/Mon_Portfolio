import type { Metadata } from "next";
import { AdminPageHeader, AdminPlaceholder } from "@/components/admin/page-header";

export const metadata: Metadata = { title: "Utilisateurs" };

export default function UsersAdminPage() {
  return (
    <>
      <AdminPageHeader title="Utilisateurs" description="Comptes admin, rôles et permissions." />
      <AdminPlaceholder note="Gestion des utilisateurs à implémenter en V2." />
    </>
  );
}
