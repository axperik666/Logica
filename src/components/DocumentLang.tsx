"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";

/** Синхронизирует `<html lang>` с текущей локалью next-intl. */
export function DocumentLang() {
  const locale = useLocale();

  useEffect(() => {
    const htmlLang =
      locale === "en" ? "en" : locale === "it" ? "it" : "ru";
    document.documentElement.lang = htmlLang;
  }, [locale]);

  return null;
}
