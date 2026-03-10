import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(135deg, rgb(248, 250, 252) 0%, rgb(255, 247, 237) 45%, rgb(254, 215, 170) 100%)",
          color: "rgb(15, 23, 42)",
          fontFamily: "sans-serif",
          padding: "56px",
          justifyContent: "space-between"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%"
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgb(194, 65, 12)"
            }}
          >
            Fast Online Utility Suite
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 860 }}>
            <div style={{ display: "flex", fontSize: 72, fontWeight: 800, lineHeight: 1.05 }}>
              {siteConfig.name}
            </div>
            <div style={{ display: "flex", fontSize: 32, lineHeight: 1.35, color: "rgb(51, 65, 85)" }}>
              Free browser-based tools for images, text, PDFs, JSON, and calculators.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 18,
              fontSize: 28,
              color: "rgb(30, 41, 59)"
            }}
          >
            <div style={{ display: "flex" }}>Client-side processing</div>
            <div style={{ display: "flex" }}>Helpful guides</div>
            <div style={{ display: "flex" }}>Mobile friendly</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
