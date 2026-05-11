/** Ключ должен совпадать с `CookieConsent` и `GoogleAnalytics`. */
export const COOKIE_CONSENT_STORAGE_KEY = "logica_cookie_consent_v1";

export function dispatchCookieConsentAccepted() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("logica-cookie-consent"));
}
