import type { Metadata } from "next";

import { requirePermission } from "@/lib/auth/guard";
import { AdminPageHeader } from "@/components/admin/page-header";
import { SkillForm } from "../skill-form";

export const metadata: Metadata = { title: "Nouvelle compétence" };

export default async function NewSkillPage() {
  await requirePermission("MANAGE_SKILLS");
  return (
    <>
      <AdminPageHeader title="Nouvelle compétence" />
      <div className="max-w-5xl">
        <SkillForm />
      </div>
    </>
  );
}
