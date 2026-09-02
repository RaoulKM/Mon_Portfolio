import type { NextRequest } from "next/server";

import { getProfile } from "@/lib/queries";
import { track } from "@/lib/analytics";
import { parseBrowser, parseDevice } from "@/lib/analytics/ua";

export const dynamic = "force-dynamic";

const LANGS = ["fr", "en"] as const;
type Lang = (typeof LANGS)[number];

function isLang(v: string): v is Lang {
  return (LANGS as readonly string[]).includes(v);
}

/** ASCII, dash-separated slug for the download filename. */
function slugifyName(name: string): string {
  return (
    name
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "cv"
  );
}

/**
 * CV download endpoint — `/cv/fr` and `/cv/en`.
 *
 * - Resolves the requested language, falling back to the other one.
 * - Records a `CV_DOWNLOAD` analytics event server-side (reliable, also counts
 *   right-click "save as" and prefetch-less clients).
 * - Streams the file back as an attachment with a clean filename, whether it
 *   lives on Cloudinary (absolute URL) or in `/uploads` (local).
 * - Redirects to `/resume` when no CV is configured.
 */
export async function GET(req: NextRequest, ctx: RouteContext<"/cv/[lang]">) {
  const { lang } = await ctx.params;
  if (!isLang(lang)) {
    return new Response("Not found", { status: 404 });
  }

  const profile = await getProfile();
  const preferred = lang === "en" ? profile?.cvUrlEn : profile?.cvUrlFr;
  const other = lang === "en" ? profile?.cvUrlFr : profile?.cvUrlEn;
  const target = preferred ?? other ?? null;

  if (!target) {
    return Response.redirect(new URL("/resume", req.url), 302);
  }

  const ua = req.headers.get("user-agent");
  await track({
    eventType: "CV_DOWNLOAD",
    entityId: lang,
    path: `/cv/${lang}`,
    device: parseDevice(ua),
    browser: parseBrowser(ua),
    referrer: req.headers.get("referer") ?? undefined,
  });

  const absolute = /^https?:\/\//i.test(target)
    ? target
    : new URL(target, req.url).toString();

  const filename = `CV-${slugifyName(profile?.fullName ?? "")}-${lang.toUpperCase()}.pdf`;

  try {
    const upstream = await fetch(absolute, { redirect: "follow" });
    if (!upstream.ok || !upstream.body) {
      // File missing / unreachable — hand the raw URL to the browser.
      return Response.redirect(absolute, 302);
    }

    const headers = new Headers();
    headers.set(
      "Content-Type",
      upstream.headers.get("content-type") ?? "application/pdf",
    );
    const length = upstream.headers.get("content-length");
    if (length) headers.set("Content-Length", length);
    headers.set("Content-Disposition", `attachment; filename="${filename}"`);
    headers.set("Cache-Control", "public, max-age=3600, must-revalidate");

    return new Response(upstream.body, { status: 200, headers });
  } catch {
    return Response.redirect(absolute, 302);
  }
}
