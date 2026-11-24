/**
 * Tracking- en consentlaag.
 *
 * - Google Consent Mode v2 staat standaard op "denied" voor alle
 *   advertentie- en analyticsdoeleinden, tot de bezoeker kiest.
 * - Google Tag Manager wordt pas geladen nadat de bezoeker een keuze maakte
 *   (en dus nooit met marketing/analytics-cookies zonder toestemming).
 * - Alle belangrijke acties worden als afzonderlijk dataLayer-event gepusht,
 *   zodat ze in GTM/GA4/Google Ads apart meetbaar zijn.
 */

/** Vul hier het GTM-container-ID in (bv. "GTM-XXXXXXX"). Leeg = niets laden. */
export const GTM_ID = "GTM-TZ29FD3M";

export const CONSENT_STORAGE_KEY = "chs-consent-v1";

export type ConsentChoice = {
  analytics: boolean;
  marketing: boolean;
  /** ISO-tijdstip van de keuze, samen met de versie van de banner. */
  decidedAt: string;
  version: string;
};

export const CONSENT_VERSION = "2026-09-11";

type DataLayerRecord = Record<string, unknown>;

function dataLayer(): DataLayerRecord[] {
  const w = window as unknown as { dataLayer?: DataLayerRecord[] };
  w.dataLayer = w.dataLayer || [];
  return w.dataLayer;
}

function gtag(...args: unknown[]) {
  dataLayer().push(args as unknown as DataLayerRecord);
}

/** Zet de standaardweigering. Moet vóór elke tag draaien. */
export function initConsentDefaults() {
  if (typeof window === "undefined") return;
  const w = window as unknown as { __chsConsentInit?: boolean };
  if (w.__chsConsentInit) return;
  w.__chsConsentInit = true;

  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500,
  });
  dataLayer().push({ "gtm.start": Date.now(), event: "gtm.js" });
}

export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentChoice;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function applyConsent(choice: ConsentChoice) {
  gtag("consent", "update", {
    ad_storage: choice.marketing ? "granted" : "denied",
    ad_user_data: choice.marketing ? "granted" : "denied",
    ad_personalization: choice.marketing ? "granted" : "denied",
    analytics_storage: choice.analytics ? "granted" : "denied",
  });
  dataLayer().push({ event: "consent_update", chs_analytics: choice.analytics, chs_marketing: choice.marketing });
  if (choice.analytics || choice.marketing) loadGtm();
}

export function saveConsent(partial: { analytics: boolean; marketing: boolean }) {
  const choice: ConsentChoice = {
    ...partial,
    decidedAt: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(choice));
  } catch {
    /* localStorage geblokkeerd: keuze geldt dan enkel voor deze sessie */
  }
  applyConsent(choice);
  return choice;
}

let gtmLoaded = false;

export function loadGtm() {
  if (typeof window === "undefined" || gtmLoaded || !GTM_ID) return;
  gtmLoaded = true;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

/**
 * Eén plek voor alle conversie-events.
 * Conversies (enkel na een geslaagde verzending): generate_lead + quote_request /
 * maintenance_request / repair_request. Klikken op offerteknoppen zijn géén
 * conversie en gebruiken quote_cta_click, zodat er geen dubbele conversies ontstaan.
 */
export type TrackEvent =
  | "generate_lead"
  | "quote_cta_click"
  | "appointment_cta_click"
  | "appointment_request"
  | "whatsapp_click"
  | "quote_request"
  | "maintenance_request"
  | "repair_request"
  | "phone_click"
  | "email_click"
  | "form_start";

export function track(event: TrackEvent, params: DataLayerRecord = {}) {
  if (typeof window === "undefined") return;
  dataLayer().push({
    event,
    page_path: window.location.pathname,
    ...params,
  });
}
