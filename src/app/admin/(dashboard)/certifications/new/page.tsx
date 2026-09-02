import type { Metadata } from "next";

import { requirePermission } from "@/lib/auth/guard";
import { AdminPageHeader } from "@/components/admin/page-header";
import { CertificationForm } from "../certification-form";

export const metadata: Metadata = { title: "Nouvelle certification" };

export default async function NewCertificationPage() {
  await requirePermission("MANAGE_CERTIFICATIONS");
  return (
    <>
      <AdminPageHeader title="Nouvelle certification" />
      <div className="max-w-5xl">
        <CertificationForm />
      </div>
    </>
  );
}
