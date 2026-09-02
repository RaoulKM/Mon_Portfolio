import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth/guard";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ServiceForm } from "../service-form";

export const metadata: Metadata = { title: "Modifier le service" };

export default async function EditServicePage({
  params,
}: PageProps<"/admin/services/[id]">) {
  await requirePermission("MANAGE_SERVICES");
  const { id } = await params;
  const service = await prisma.service
    .findUnique({ where: { id } })
    .catch(() => null);
  if (!service) notFound();

  return (
    <>
      <AdminPageHeader title={service.title} description="Modifier le service." />
      <div className="max-w-2xl">
        <ServiceForm service={service} />
      </div>
    </>
  );
}
