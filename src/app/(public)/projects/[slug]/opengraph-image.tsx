import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";
import { getProjectBySlug } from "@/lib/queries";

export const alt = "Projet";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ProjectOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  const title = project?.title ?? "Projet";
  const desc = project?.shortDescription ?? siteConfig.description;
  const tech = project?.technologies.map((t) => t.name).slice(0, 6).join(" · ") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(1200px 600px at 80% 0%, #10233f 0%, #05070d 55%)",
          color: "#e6f6f4",
          fontFamily: "monospace",
        }}
      >
        <div style={{ fontSize: 24, color: "#5eead4", letterSpacing: 3 }}>
          {siteConfig.url.replace(/^https?:\/\//, "")} / projects
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05 }}>
            {title}
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#a9bdcf",
              maxWidth: 980,
              lineHeight: 1.35,
            }}
          >
            {desc.length > 160 ? desc.slice(0, 157) + "…" : desc}
          </div>
        </div>

        <div style={{ fontSize: 24, color: "#7dd3fc" }}>{tech}</div>
      </div>
    ),
    size,
  );
}
