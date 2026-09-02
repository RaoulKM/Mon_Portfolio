import type { Metadata } from "next";
import Link from "next/link";
import {
  Eye,
  Users,
  FolderGit2,
  Download,
  MailCheck,
} from "lucide-react";

import { requirePermission } from "@/lib/auth/guard";
import { cn } from "@/lib/utils";
import { RANGES, resolveRange, delta } from "@/lib/analytics/range";
import {
  getAnalyticsOverview,
  getTimeSeries,
  getTopPaths,
  getTopProjects,
  getInteractionBreakdown,
  getDeviceBreakdown,
} from "@/lib/queries/analytics";
import { AdminPageHeader, AdminPlaceholder } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { TrendArea } from "@/components/charts/trend-area";
import { InteractionsBar } from "@/components/charts/interactions-bar";
import { DeviceDonut } from "@/components/charts/device-donut";

export const metadata: Metadata = { title: "Statistiques" };

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-border bg-card/60 rounded-xl border p-5 backdrop-blur-sm">
      <h2 className="mono-eyebrow mb-4">{title}</h2>
      {children}
    </section>
  );
}

export default async function AnalyticsPage({
  searchParams,
}: PageProps<"/admin/analytics">) {
  await requirePermission("VIEW_ANALYTICS");
  const sp = await searchParams;
  const range = resolveRange(sp.range);

  const [overview, series, topPaths, topProjects, interactions, devices] =
    await Promise.all([
      getAnalyticsOverview(range),
      getTimeSeries(range),
      getTopPaths(range),
      getTopProjects(range),
      getInteractionBreakdown(range),
      getDeviceBreakdown(range),
    ]);

  const d = (pair?: [number, number]) => (pair ? delta(pair[0], pair[1]) : null);

  return (
    <>
      <AdminPageHeader
        title="Statistiques"
        description="Trafic et interactions du portfolio."
        action={
          <div className="border-border flex overflow-hidden rounded-md border font-mono text-xs">
            {RANGES.map((r) => (
              <Link
                key={r.key}
                href={`/admin/analytics?range=${r.key}`}
                className={cn(
                  "px-3 py-1.5 transition-colors",
                  range.key === r.key
                    ? "bg-accent/15 text-accent"
                    : "text-muted-foreground hover:bg-muted",
                )}
              >
                {r.label}
              </Link>
            ))}
          </div>
        }
      />

      {overview === null ? (
        <AdminPlaceholder note="Aucune donnée analytics (la base n'est pas encore alimentée)." />
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <StatCard
              label="Visiteurs"
              value={overview.uniqueVisitors[0]}
              delta={d(overview.uniqueVisitors)}
              icon={Users}
            />
            <StatCard
              label="Pages vues"
              value={overview.pageViews[0]}
              delta={d(overview.pageViews)}
              icon={Eye}
            />
            <StatCard
              label="Vues projets"
              value={overview.projectViews[0]}
              delta={d(overview.projectViews)}
              icon={FolderGit2}
            />
            <StatCard
              label="CV téléchargés"
              value={overview.cvDownloads[0]}
              delta={d(overview.cvDownloads)}
              icon={Download}
            />
            <StatCard
              label="Contacts"
              value={overview.contactSubmits[0]}
              delta={d(overview.contactSubmits)}
              icon={MailCheck}
            />
          </div>

          <Panel title={`trafic · ${range.label.toLowerCase()}`}>
            <TrendArea data={series} />
          </Panel>

          <div className="grid gap-6 lg:grid-cols-2">
            <Panel title="pages les plus visitées">
              {topPaths.length === 0 ? (
                <p className="text-muted-foreground font-mono text-sm">—</p>
              ) : (
                <RankedList
                  rows={topPaths.map((p) => ({ label: p.path, value: p.count }))}
                />
              )}
            </Panel>

            <Panel title="projets les plus consultés">
              {topProjects.length === 0 ? (
                <p className="text-muted-foreground font-mono text-sm">—</p>
              ) : (
                <RankedList
                  rows={topProjects.map((p) => ({
                    label: p.project.title,
                    href: `/projects/${p.project.slug}`,
                    value: p.count,
                  }))}
                />
              )}
            </Panel>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Panel title="interactions">
              <InteractionsBar data={interactions} />
            </Panel>
            <Panel title="appareils">
              <DeviceDonut data={devices} />
            </Panel>
          </div>
        </div>
      )}
    </>
  );
}

function RankedList({
  rows,
}: {
  rows: { label: string; href?: string; value: number }[];
}) {
  const max = Math.max(...rows.map((r) => r.value), 1);
  return (
    <ul className="space-y-2.5">
      {rows.map((r, i) => (
        <li key={i} className="font-mono text-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="text-terminal-dim">{String(i + 1).padStart(2, "0")}</span>
            {r.href ? (
              <Link
                href={r.href}
                target="_blank"
                className="hover:text-accent flex-1 truncate"
              >
                {r.label}
              </Link>
            ) : (
              <span className="flex-1 truncate">{r.label}</span>
            )}
            <span className="text-muted-foreground shrink-0">{r.value}</span>
          </div>
          <div className="bg-muted mt-1 h-1 overflow-hidden rounded-full">
            <div
              className="bg-accent/60 h-full rounded-full"
              style={{ width: `${(r.value / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
