import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "LOGICA Marketing — performance marketing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #050810 0%, #0a1224 45%, #12081a 100%)",
          color: "#fff",
          fontFamily:
            'ui-sans-serif, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            padding: 48,
            textAlign: "center"
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "#7ee8ff"
            }}
          >
            LOGICA
          </div>
          <div style={{ fontSize: 30, fontWeight: 600, color: "rgba(255,255,255,0.88)" }}>
            Performance marketing
          </div>
          <div style={{ fontSize: 22, color: "rgba(126,232,255,0.9)", marginTop: 8 }}>
            3–7× ROI · Paid social · Funnels · Creative
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
