import type { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  FolderGit2,
  Newspaper,
  Mail,
  Eye,
  Download,
  ArrowRight,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin/page-header";

export const metadata: Metadata = { title: "Dashboard" };

const dtFmt = new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" });
const fmt = new Intl.NumberFormat("fr-FR");

async function getData() {
  try {
    const [
      projects,
      articles,
      unread,
      projectViews,
      cvDownloads,
      visitors,
      recentMessages,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.article.count(),
      prisma.contactMessage.count({ where: { status: "UNREAD" } }),
      prisma.analyticsEvent.count({ where: { eventType: "PROJECT_VIEW" } }),
      prisma.analyticsEvent.count({ where: { eventType: "CV_DOWNLOAD" } }),
      prisma.analyticsEvent.count({ where: { eventType: "PAGE_VIEW" } }),
      prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);
    return {
      projects,
      articles,
      unread,
      projectViews,
      cvDownloads,
      visitors,
      recentMessages,
    };
  } catch {
    return null;
  }
}

export default async function DashboardPage() {
  const data = await getData();

  const cards = [
    { label: "Visiteurs", value: data?.visitors, icon: Users },
    { label: "Projets", value: data?.projects, icon: FolderGit2 },
    { label: "Articles", value: data?.articles, icon: Newspaper },
    { label: "Messages non lus", value: data?.unread, icon: Mail },
    { label: "Vues projets", value: data?.projectViews, icon: Eye },
    { label: "CV téléchargés", value: data?.cvDownloads, icon: Download },
  ];

  return (
    <>
      <AdminPageHeader title="Dashboard" description="Vue d'ensemble du portfolio." />

      {!data && (
        <p className="border-border text-muted-foreground mb-6 rounded-md border border-dashed p-4 text-sm">
          Base de données non initialisée. Lancez{" "}
          <code className="bg-muted rounded px-1">npm run prisma:migrate</code> puis{" "}
          <code className="bg-muted rounded px-1">npm run db:seed</code>.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="bg-card border-border rounded-xl border p-5">
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

      {data && data.recentMessages.length > 0 && (
        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold">Messages récents</h2>
            <Link
              href="/admin/messages"
              className="text-primary inline-flex items-center gap-1 text-sm hover:underline"
            >
              Tous les messages <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="border-border divide-border divide-y rounded-xl border">
            {data.recentMessages.map((m) => (
              <Link
                key={m.id}
                href="/admin/messages"
                className="hover:bg-muted/50 flex items-center justify-between gap-4 p-4 text-sm"
              >
                <span className="min-w-0">
                  <span className="font-medium">{m.name}</span>
                  <span className="text-muted-foreground ml-2 truncate">
                    {m.subject || m.message.slice(0, 60)}
                  </span>
                </span>
                <span className="text-muted-foreground shrink-0 text-xs">
                  {dtFmt.format(m.createdAt)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
