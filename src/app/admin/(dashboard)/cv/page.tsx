import type { Metadata } from "next";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth/guard";
import { AdminPageHeader } from "@/components/admin/page-header";
import { CvForm } from "./cv-form";

export const metadata: Metadata = { title: "CV" };

export default async function CvAdminPage() {
  await requirePermission("MANAGE_PROFILE");
  const profile = await prisma.profile
    .findFirst({ where: { isPrimary: true } })
    .catch(() => null);

  return (
    <>
      <AdminPageHeader
        title="CV"
        description="Fichiers PDF du CV — version française et anglaise."
      />
      <CvForm profile={profile} />
    </>
  );
}
