import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** На Vercel задана переменная `VERCEL` — там свой рантайм; `standalone` оставляем для Docker/своего сервера. */
const nextConfig: NextConfig = {
  ...(!process.env.VERCEL ? { output: "standalone" as const } : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/api/portraits/**"
      }
    ]
  }
};

export default withNextIntl(nextConfig);
