import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth/guard";
import { AdminPageHeader } from "@/components/admin/page-header";
import { SkillForm } from "../skill-form";

export const metadata: Metadata = { title: "Modifier la compétence" };

export default async function EditSkillPage({
  params,
}: PageProps<"/admin/skills/[id]">) {
  await requirePermission("MANAGE_SKILLS");
  const { id } = await params;
  const skill = await prisma.skill.findUnique({ where: { id } }).catch(() => null);
  if (!skill) notFound();

  return (
    <>
      <AdminPageHeader title={skill.name} description="Modifier la compétence." />
      <div className="max-w-2xl">
        <SkillForm skill={skill} />
      </div>
    </>
  );
}
