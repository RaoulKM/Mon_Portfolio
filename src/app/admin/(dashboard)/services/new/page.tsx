import type { Metadata } from "next";

import { requirePermission } from "@/lib/auth/guard";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ServiceForm } from "../service-form";

export const metadata: Metadata = { title: "Nouveau service" };

export default async function NewServicePage() {
  await requirePermission("MANAGE_SERVICES");
  return (
    <>
      <AdminPageHeader title="Nouveau service" />
      <div className="max-w-5xl">
        <ServiceForm />
      </div>
    </>
  );
}
