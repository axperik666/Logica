import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LOGICA Marketing",
    short_name: "LOGICA",
    description: "Performance marketing, sites and funnels with measurable ROI.",
    start_url: "/",
    display: "standalone",
    background_color: "#020308",
    theme_color: "#060b18",
    icons: [
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png"
      }
    ]
  };
}
