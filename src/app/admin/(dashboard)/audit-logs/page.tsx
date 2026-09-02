import type { Metadata } from "next";
import { AdminPageHeader, AdminPlaceholder } from "@/components/admin/page-header";

export const metadata: Metadata = { title: "Audit Logs" };

export default function AuditLogsAdminPage() {
  return (
    <>
      <AdminPageHeader title="Audit Logs" description="Historique des actions importantes." />
      <AdminPlaceholder note="Journal d'audit à implémenter en V2." />
    </>
  );
}
