import { ImageResponse } from "next/og";
import { profile } from "@/lib/profile";

export const alt =
  "Manoj Tiwari — Sr. Business Automation & MIS Specialist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social-share preview (shown on WhatsApp, LinkedIn, etc.)
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#05060a",
          backgroundImage:
            "radial-gradient(circle at 12% 0%, rgba(124,58,237,0.45), transparent 45%), radial-gradient(circle at 90% 100%, rgba(34,211,238,0.30), transparent 45%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top row: monogram + eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "72px",
              height: "72px",
              borderRadius: "18px",
              border: "2px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.04)",
              color: "#22d3ee",
              fontSize: "34px",
              fontWeight: 700,
            }}
          >
            MT
          </div>
          <div
            style={{
              color: "#22d3ee",
              fontSize: "22px",
              letterSpacing: "8px",
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </div>
        </div>

        {/* Middle: name + title */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "white",
              fontSize: "88px",
              fontWeight: 700,
              lineHeight: 1.05,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              marginTop: "16px",
              fontSize: "40px",
              fontWeight: 600,
              color: "#a855f7",
            }}
          >
            {profile.title}
          </div>
          <div
            style={{
              marginTop: "20px",
              fontSize: "26px",
              color: "#94a3b8",
              maxWidth: "900px",
            }}
          >
            Web Apps · Workflow Automation · Real-time Business Intelligence
          </div>
        </div>

        {/* Bottom: tags */}
        <div style={{ display: "flex", gap: "14px" }}>
          {["Google Apps Script", "WhatsApp API", "Looker Studio", "Next.js"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  padding: "10px 22px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#cbd5e1",
                  fontSize: "22px",
                }}
              >
                {tag}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    { ...size },
  );
}
