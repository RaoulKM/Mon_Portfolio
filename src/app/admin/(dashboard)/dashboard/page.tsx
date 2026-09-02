import type { Metadata } from "next";
import {
  Users,
  FolderGit2,
  Newspaper,
  Mail,
  Eye,
  Download,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin/page-header";

export const metadata: Metadata = { title: "Dashboard" };

async function getStats() {
  // Resilient to an un-migrated DB during Phase 1 setup.
  try {
    const [projects, articles, messages, projectViews, cvDownloads, visitors] =
      await Promise.all([
        prisma.project.count(),
        prisma.article.count(),
        prisma.contactMessage.count({ where: { status: "UNREAD" } }),
        prisma.analyticsEvent.count({ where: { eventType: "PROJECT_VIEW" } }),
        prisma.analyticsEvent.count({ where: { eventType: "CV_DOWNLOAD" } }),
        prisma.analyticsEvent.count({ where: { eventType: "PAGE_VIEW" } }),
      ]);
    return { projects, articles, messages, projectViews, cvDownloads, visitors };
  } catch {
    return null;
  }
}

const fmt = new Intl.NumberFormat("fr-FR");

export default async function DashboardPage() {
  const stats = await getStats();

  const cards = [
    { label: "Visiteurs", value: stats?.visitors, icon: Users },
    { label: "Projets", value: stats?.projects, icon: FolderGit2 },
    { label: "Articles", value: stats?.articles, icon: Newspaper },
    { label: "Messages non lus", value: stats?.messages, icon: Mail },
    { label: "Vues projets", value: stats?.projectViews, icon: Eye },
    { label: "CV téléchargés", value: stats?.cvDownloads, icon: Download },
  ];

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="Vue d'ensemble du portfolio."
      />

      {!stats && (
        <p className="border-border text-muted-foreground mb-6 rounded-md border border-dashed p-4 text-sm">
          Base de données non initialisée. Lancez{" "}
          <code className="bg-muted rounded px-1">npm run prisma:migrate</code>{" "}
          puis <code className="bg-muted rounded px-1">npm run db:seed</code>.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.label}
            className="bg-card border-border rounded-xl border p-5"
          >
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <c.icon className="size-4" />
              {c.label}
            </div>
            <p className="mt-2 text-3xl font-bold tracking-tight">
              {c.value == null ? "—" : fmt.format(c.value)}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
