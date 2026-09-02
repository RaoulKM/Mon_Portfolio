import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth/guard";
import { AdminPageHeader } from "@/components/admin/page-header";
import { EducationForm } from "../education-form";

export const metadata: Metadata = { title: "Modifier la formation" };

export default async function EditEducationPage({
  params,
}: PageProps<"/admin/education/[id]">) {
  await requirePermission("MANAGE_EDUCATION");
  const { id } = await params;
  const education = await prisma.education
    .findUnique({ where: { id } })
    .catch(() => null);
  if (!education) notFound();

  return (
    <>
      <AdminPageHeader title={education.degree} description="Modifier la formation." />
      <div className="max-w-2xl">
        <EducationForm education={education} />
      </div>
    </>
  );
}
