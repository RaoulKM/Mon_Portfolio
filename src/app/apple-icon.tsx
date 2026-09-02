import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05070d",
          color: "#5eead4",
          fontSize: 96,
          fontWeight: 800,
          fontFamily: "monospace",
          borderRadius: 40,
        }}
      >
        {siteConfig.shortName.slice(0, 2) || "KM"}
      </div>
    ),
    size,
  );
}
