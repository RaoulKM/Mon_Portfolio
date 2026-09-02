import type { Metadata } from "next";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth/guard";
import { AdminPageHeader } from "@/components/admin/page-header";
import { SettingsForms } from "./settings-forms";

export const metadata: Metadata = { title: "Paramètres" };

export default async function SettingsAdminPage() {
  await requirePermission("MANAGE_SETTINGS");

  const rows = await prisma.siteSetting.findMany().catch(() => []);
  const settings = Object.fromEntries(
    rows.map((r) => [r.key, (r.value ?? {}) as Record<string, unknown>]),
  );

  return (
    <>
      <AdminPageHeader
        title="Paramètres"
        description="Général, SEO, réseaux sociaux et contact."
      />
      <SettingsForms settings={settings} />
    </>
  );
}
