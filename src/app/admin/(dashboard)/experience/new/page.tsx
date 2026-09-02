import type { Metadata } from "next";

import { requirePermission } from "@/lib/auth/guard";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ExperienceForm } from "../experience-form";

export const metadata: Metadata = { title: "Nouvelle expérience" };

export default async function NewExperiencePage() {
  await requirePermission("MANAGE_EXPERIENCE");
  return (
    <>
      <AdminPageHeader title="Nouvelle expérience" />
      <div className="max-w-2xl">
        <ExperienceForm />
      </div>
    </>
  );
}
