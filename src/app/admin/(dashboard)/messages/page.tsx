import type { Metadata } from "next";
import { AdminPageHeader, AdminPlaceholder } from "@/components/admin/page-header";

export const metadata: Metadata = { title: "Messages" };

export default function MessagesAdminPage() {
  return (
    <>
      <AdminPageHeader title="Messages" description="Messages de contact : non lus, lus, archivés, spam." />
      <AdminPlaceholder note="Boîte de réception à implémenter en Phase 3." />
    </>
  );
}
