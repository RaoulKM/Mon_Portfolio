import "server-only";
import { cache } from "react";
import { Prisma, type AnalyticsEventType } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import type { ResolvedRange } from "@/lib/analytics/range";

const between = (r: { start: Date; end: Date }) => ({
  createdAt: { gte: r.start, lte: r.end },
});

async function countEvents(
  type: AnalyticsEventType,
  window: { start: Date; end: Date },
) {
  return prisma.analyticsEvent.count({
    where: { eventType: type, ...between(window) },
  });
}

async function uniqueVisitors(window: { start: Date; end: Date }) {
  const rows = await prisma.analyticsEvent.findMany({
    where: { eventType: "PAGE_VIEW", sessionId: { not: null }, ...between(window) },
    distinct: ["sessionId"],
    select: { sessionId: true },
  });
  return rows.length;
}

export interface Overview {
  pageViews: [number, number];
  uniqueVisitors: [number, number];
  projectViews: [number, number];
  cvDownloads: [number, number];
  contactSubmits: [number, number];
}

export const getAnalyticsOverview = cache(
  async (range: ResolvedRange): Promise<Overview | null> => {
    try {
      const cur = { start: range.start, end: range.end };
      const prev = { start: range.prevStart, end: range.prevEnd };

      const [
        pv,
        pvP,
        uv,
        uvP,
        prj,
        prjP,
        cv,
        cvP,
        ct,
        ctP,
      ] = await Promise.all([
        countEvents("PAGE_VIEW", cur),
        countEvents("PAGE_VIEW", prev),
        uniqueVisitors(cur),
        uniqueVisitors(prev),
        countEvents("PROJECT_VIEW", cur),
        countEvents("PROJECT_VIEW", prev),
        countEvents("CV_DOWNLOAD", cur),
        countEvents("CV_DOWNLOAD", prev),
        countEvents("CONTACT_SUBMIT", cur),
        countEvents("CONTACT_SUBMIT", prev),
      ]);

      return {
        pageViews: [pv, pvP],
        uniqueVisitors: [uv, uvP],
        projectViews: [prj, prjP],
        cvDownloads: [cv, cvP],
        contactSubmits: [ct, ctP],
      };
    } catch {
      return null;
    }
  },
);

export interface TimePoint {
  ts: string;
  label: string;
  views: number;
  visitors: number;
}

export const getTimeSeries = cache(
  async (range: ResolvedRange): Promise<TimePoint[]> => {
    try {
      const rows = await prisma.$queryRaw<
        { bucket: Date; views: bigint; visitors: bigint }[]
      >`
        SELECT
          date_trunc(${Prisma.raw(`'${range.bucket}'`)}, "createdAt") AS bucket,
          count(*) FILTER (WHERE "eventType" = 'PAGE_VIEW') AS views,
          count(DISTINCT "sessionId") FILTER (WHERE "eventType" = 'PAGE_VIEW') AS visitors
        FROM "AnalyticsEvent"
        WHERE "createdAt" >= ${range.start} AND "createdAt" <= ${range.end}
        GROUP BY 1
        ORDER BY 1 ASC
      `;

      const fmt = new Intl.DateTimeFormat("fr-FR", {
        month: range.bucket === "month" ? "short" : "2-digit",
        day: range.bucket === "month" ? undefined : "2-digit",
        hour: range.bucket === "hour" ? "2-digit" : undefined,
      });

      return rows.map((r) => ({
        ts: r.bucket.toISOString(),
        label: fmt.format(r.bucket),
        views: Number(r.views),
        visitors: Number(r.visitors),
      }));
    } catch {
      return [];
    }
  },
);

export const getTopPaths = cache(
  async (range: ResolvedRange, limit = 8) => {
    try {
      const rows = await prisma.analyticsEvent.groupBy({
        by: ["path"],
        where: { eventType: "PAGE_VIEW", path: { not: null }, ...between(range) },
        _count: { path: true },
        orderBy: { _count: { path: "desc" } },
        take: limit,
      });
      return rows.map((r) => ({ path: r.path ?? "—", count: r._count.path }));
    } catch {
      return [];
    }
  },
);

export const getTopProjects = cache(
  async (range: ResolvedRange, limit = 6) => {
    try {
      const rows = await prisma.analyticsEvent.groupBy({
        by: ["entityId"],
        where: {
          eventType: "PROJECT_VIEW",
          entityId: { not: null },
          ...between(range),
        },
        _count: { entityId: true },
        orderBy: { _count: { entityId: "desc" } },
        take: limit,
      });

      const ids = rows.map((r) => r.entityId!).filter(Boolean);
      const projects = await prisma.project.findMany({
        where: { id: { in: ids } },
        select: { id: true, title: true, slug: true },
      });
      const byId = new Map(projects.map((p) => [p.id, p]));

      return rows
        .map((r) => ({
          project: byId.get(r.entityId!),
          count: r._count.entityId,
        }))
        .filter((r): r is { project: NonNullable<typeof r.project>; count: number } =>
          Boolean(r.project),
        );
    } catch {
      return [];
    }
  },
);

const INTERACTIONS: { type: AnalyticsEventType; label: string }[] = [
  { type: "PROJECT_VIEW", label: "Vues projet" },
  { type: "GITHUB_CLICK", label: "Clics GitHub" },
  { type: "LIVE_DEMO_CLICK", label: "Clics démo" },
  { type: "CV_DOWNLOAD", label: "Téléch. CV" },
  { type: "CONTACT_SUBMIT", label: "Contacts" },
  { type: "SOCIAL_CLICK", label: "Clics sociaux" },
];

export const getInteractionBreakdown = cache(async (range: ResolvedRange) => {
  try {
    const counts = await Promise.all(
      INTERACTIONS.map((i) => countEvents(i.type, range)),
    );
    return INTERACTIONS.map((i, idx) => ({
      type: i.type,
      label: i.label,
      count: counts[idx],
    }));
  } catch {
    return [];
  }
});

export const getDeviceBreakdown = cache(async (range: ResolvedRange) => {
  try {
    const rows = await prisma.analyticsEvent.groupBy({
      by: ["device"],
      where: { device: { not: null }, ...between(range) },
      _count: { device: true },
      orderBy: { _count: { device: "desc" } },
    });
    return rows.map((r) => ({
      device: r.device ?? "inconnu",
      count: r._count.device,
    }));
  } catch {
    return [];
  }
});
