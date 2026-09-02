import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";
import { getProfile } from "@/lib/queries";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const profile = await getProfile();
  const name = profile?.fullName ?? siteConfig.name;
  const headline = profile?.headline ?? "Développeur Full-Stack";

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
            "radial-gradient(1200px 600px at 20% 0%, #0b1b3a 0%, #05070d 55%)",
          color: "#e6f6f4",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            color: "#5eead4",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #5eead4",
              borderRadius: 10,
            }}
          >
            {">_"}
          </div>
          {siteConfig.url.replace(/^https?:\/\//, "")}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 26, color: "#5eead4", letterSpacing: 4 }}>
            $ whoami
          </div>
          <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1.05 }}>
            {name}
          </div>
          <div style={{ fontSize: 38, color: "#7dd3fc" }}>{"> " + headline}</div>
        </div>

        <div style={{ fontSize: 24, color: "#8aa0b4" }}>
          Laravel · Next.js · React · TypeScript · PostgreSQL
        </div>
      </div>
    ),
    size,
  );
}
