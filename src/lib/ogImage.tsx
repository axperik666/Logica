import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

type PageOgProps = {
  eyebrow: string;
  headline: string;
  subline?: string;
};

export function createPageOgImage({ eyebrow, headline, subline }: PageOgProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background: "linear-gradient(145deg, #0a0f1c 0%, #121a2e 40%, #1a1428 100%)",
          color: "#fff",
          fontFamily:
            'ui-sans-serif, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 600, color: "#7ee8ff", letterSpacing: "0.12em" }}>
          {eyebrow}
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 52,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            maxWidth: 1000
          }}
        >
          {headline}
        </div>
        {subline ? (
          <div style={{ marginTop: 24, fontSize: 26, color: "rgba(255,255,255,0.75)" }}>{subline}</div>
        ) : null}
        <div style={{ marginTop: 40, fontSize: 28, fontWeight: 700, color: "#7ee8ff" }}>LOGICA</div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
