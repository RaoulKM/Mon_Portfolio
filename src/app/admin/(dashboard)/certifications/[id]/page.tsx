import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth/guard";
import { AdminPageHeader } from "@/components/admin/page-header";
import { CertificationForm } from "../certification-form";

export const metadata: Metadata = { title: "Modifier la certification" };

export default async function EditCertificationPage({
  params,
}: PageProps<"/admin/certifications/[id]">) {
  await requirePermission("MANAGE_CERTIFICATIONS");
  const { id } = await params;
  const certification = await prisma.certification
    .findUnique({ where: { id } })
    .catch(() => null);
  if (!certification) notFound();

  return (
    <>
      <AdminPageHeader
        title={certification.name}
        description="Modifier la certification."
      />
      <div className="max-w-2xl">
        <CertificationForm certification={certification} />
      </div>
    </>
  );
}
