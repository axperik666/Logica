import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "LOGICA Marketing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const OG_COPY: Record<string, { tagline: string; sub: string }> = {
  en: {
    tagline: "Performance marketing",
    sub: "3–7× ROI · Funnels · Paid media · Creative"
  },
  ru: {
    tagline: "Performance-маркетинг",
    sub: "ROI 3–7× · Воронки · Реклама · Креативы"
  },
  it: {
    tagline: "Performance marketing",
    sub: "ROI 3–7× · Funnel · Ads · Creatività"
  }
};

export default async function Image({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = OG_COPY[locale] ?? OG_COPY.en;

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
          background: "linear-gradient(145deg, #101624 0%, #151e34 45%, #1a1428 100%)",
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
            {copy.tagline}
          </div>
          <div style={{ fontSize: 22, color: "rgba(126,232,255,0.9)", marginTop: 8 }}>
            {copy.sub}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
