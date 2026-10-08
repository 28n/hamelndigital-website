import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        background: "#ffffff",
        padding: 72,
      }}
    >
      <div
        style={{
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: "#0b0d10",
        }}
      >
        {site.name}
      </div>
      <div
        style={{
          fontSize: 76,
          fontWeight: 500,
          letterSpacing: "-0.03em",
          lineHeight: 1.08,
          color: "#0b0d10",
          maxWidth: 900,
        }}
      >
        Digitale Produkte. Durchdacht entwickelt.
      </div>
      <div style={{ fontSize: 26, color: "#586069" }}>
        Webentwicklung · Softwareentwicklung · Hameln
      </div>
    </div>,
    size,
  );
}
