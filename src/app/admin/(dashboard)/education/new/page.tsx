import type { Metadata } from "next";

import { requirePermission } from "@/lib/auth/guard";
import { AdminPageHeader } from "@/components/admin/page-header";
import { EducationForm } from "../education-form";

export const metadata: Metadata = { title: "Nouvelle formation" };

export default async function NewEducationPage() {
  await requirePermission("MANAGE_EDUCATION");
  return (
    <>
      <AdminPageHeader title="Nouvelle formation" />
      <div className="max-w-5xl">
        <EducationForm />
      </div>
    </>
  );
}
