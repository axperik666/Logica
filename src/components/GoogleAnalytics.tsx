"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { COOKIE_CONSENT_STORAGE_KEY } from "@/lib/cookieConsent";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function hasAnalyticsConsent(): boolean {
  try {
    return (
      typeof window !== "undefined" &&
      window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) === "1"
    );
  } catch {
    return false;
  }
}

/** Загрузка gtag только после «Принять» в баннере cookies. */
export function GoogleAnalytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(hasAnalyticsConsent());
    const onChange = () => setConsented(hasAnalyticsConsent());
    window.addEventListener("storage", onChange);
    window.addEventListener("logica-cookie-consent", onChange);
    return () => {
      window.removeEventListener("storage", onChange);
      window.removeEventListener("logica-cookie-consent", onChange);
    };
  }, []);

  if (!GA_ID || !consented) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
