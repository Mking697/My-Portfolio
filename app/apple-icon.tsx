import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS home-screen icon — mirrors the "MT" monogram/gradient in app/icon.svg.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0b12",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "transparent",
            backgroundImage:
              "linear-gradient(135deg, #a855f7, #7c3aed 50%, #22d3ee)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            fontSize: 84,
            fontWeight: 700,
          }}
        >
          MT
        </div>
      </div>
    ),
    { ...size },
  );
}
