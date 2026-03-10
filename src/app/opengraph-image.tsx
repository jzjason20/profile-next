import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Jacy — Creative Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Radial glow top-right */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 700,
            height: 700,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)",
            display: "flex",
          }}
        />
        {/* Tag */}
        <div
          style={{
            fontSize: 15,
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: 28,
            display: "flex",
          }}
        >
          Coding since 2017 · Shipping since 2019
        </div>
        {/* Name */}
        <div
          style={{
            fontSize: 110,
            fontWeight: 900,
            color: "#fff",
            lineHeight: 1,
            marginBottom: 22,
            display: "flex",
            letterSpacing: "-0.03em",
          }}
        >
          Jacy
        </div>
        {/* Subtitle */}
        <div
          style={{
            fontSize: 30,
            color: "rgba(255,255,255,0.55)",
            marginBottom: 56,
            display: "flex",
          }}
        >
          Curious developer building playful products
        </div>
        {/* Domain */}
        <div
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.25)",
            display: "flex",
          }}
        >
          jzxx.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
