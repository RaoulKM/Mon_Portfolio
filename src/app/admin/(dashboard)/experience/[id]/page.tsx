import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth/guard";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ExperienceForm } from "../experience-form";

export const metadata: Metadata = { title: "Modifier l'expérience" };

export default async function EditExperiencePage({
  params,
}: PageProps<"/admin/experience/[id]">) {
  await requirePermission("MANAGE_EXPERIENCE");
  const { id } = await params;
  const experience = await prisma.experience
    .findUnique({ where: { id } })
    .catch(() => null);
  if (!experience) notFound();

  return (
    <>
      <AdminPageHeader
        title={`${experience.position} — ${experience.company}`}
        description="Modifier l'expérience."
      />
      <div className="max-w-2xl">
        <ExperienceForm experience={experience} />
      </div>
    </>
  );
}
