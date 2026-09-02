import type { Metadata } from "next";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth/guard";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ProfileForm } from "./profile-form";

export const metadata: Metadata = { title: "Profil" };

export default async function ProfileAdminPage() {
  await requirePermission("MANAGE_PROFILE");
  const profile = await prisma.profile
    .findFirst({
      where: { isPrimary: true },
      include: { socialLinks: { orderBy: { displayOrder: "asc" } } },
    })
    .catch(() => null);

  return (
    <>
      <AdminPageHeader
        title="Profil"
        description="Identité, bio, coordonnées, CV et réseaux sociaux."
      />
      <div className="max-w-3xl">
        <ProfileForm profile={profile} />
      </div>
    </>
  );
}
