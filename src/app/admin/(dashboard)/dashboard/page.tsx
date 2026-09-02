import type { Metadata } from "next";
import Link from "next/link";
import { Users, Eye, FolderGit2, Newspaper, Download, ArrowRight } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { resolveRange, delta } from "@/lib/analytics/range";
import { getAnalyticsOverview, getTimeSeries } from "@/lib/queries/analytics";
import { AdminPageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { TrendArea } from "@/components/charts/trend-area";

export const metadata: Metadata = { title: "Dashboard" };

const dtFmt = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "medium",
  timeStyle: "short",
});

async function getContent() {
  try {
    const [projects, articles, unread, recentMessages] = await Promise.all([
      prisma.project.count(),
      prisma.article.count(),
      prisma.contactMessage.count({ where: { status: "UNREAD" } }),
      prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);
    return { projects, articles, unread, recentMessages };
  } catch {
    return null;
  }
}

export default async function DashboardPage() {
  const range = resolveRange("30d");
  const [content, overview, series] = await Promise.all([
    getContent(),
    getAnalyticsOverview(range),
    getTimeSeries(range),
  ]);

  const d = (pair?: [number, number]) => (pair ? delta(pair[0], pair[1]) : null);

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="Vue d'ensemble — 30 derniers jours."
      />

      {!content && (
        <p className="terminal-frame text-muted-foreground mb-6 p-4 font-mono text-sm">
          <span className="text-terminal-dim">$</span> base non initialisée —
          lancez <code className="text-accent">npm run prisma:migrate</code> puis{" "}
          <code className="text-accent">npm run db:seed</code>.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Visiteurs"
          value={overview?.uniqueVisitors[0]}
          delta={d(overview?.uniqueVisitors)}
          icon={Users}
        />
        <StatCard
          label="Pages vues"
          value={overview?.pageViews[0]}
          delta={d(overview?.pageViews)}
          icon={Eye}
        />
        <StatCard
          label="Vues projets"
          value={overview?.projectViews[0]}
          delta={d(overview?.projectViews)}
          icon={FolderGit2}
        />
        <StatCard
          label="CV téléchargés"
          value={overview?.cvDownloads[0]}
          delta={d(overview?.cvDownloads)}
          icon={Download}
        />
        <StatCard label="Projets" value={content?.projects} icon={FolderGit2} />
        <StatCard label="Articles" value={content?.articles} icon={Newspaper} />
      </div>

      <section className="border-border bg-card/60 mt-6 rounded-xl border p-5 backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="mono-eyebrow">trafic · 30 jours</h2>
          <Link
            href="/admin/analytics"
            className="text-accent inline-flex items-center gap-1 font-mono text-xs hover:underline"
          >
            détails <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <TrendArea data={series} />
      </section>

      {content && (
        <section className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="mono-eyebrow">messages récents</h2>
            <Link
              href="/admin/messages"
              className="text-accent inline-flex items-center gap-1 font-mono text-xs hover:underline"
            >
              boîte de réception
              {content.unread > 0 && (
                <span className="bg-accent/15 text-accent ml-1 rounded px-1.5">
                  {content.unread}
                </span>
              )}
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
          {content.recentMessages.length === 0 ? (
            <p className="terminal-frame text-muted-foreground p-6 font-mono text-sm">
              <span className="text-terminal-dim">$</span> aucun message
            </p>
          ) : (
            <div className="border-border divide-border bg-card/50 divide-y rounded-xl border backdrop-blur-sm">
              {content.recentMessages.map((m) => (
                <Link
                  key={m.id}
                  href="/admin/messages"
                  className="hover:bg-muted/40 flex items-center justify-between gap-4 p-4 font-mono text-sm"
                >
                  <span className="min-w-0">
                    <span className="font-medium">{m.name}</span>
                    <span className="text-muted-foreground ml-2 truncate">
                      {m.subject || m.message.slice(0, 60)}
                    </span>
                  </span>
                  <span className="text-terminal-dim shrink-0 text-xs">
                    {dtFmt.format(m.createdAt)}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
}
