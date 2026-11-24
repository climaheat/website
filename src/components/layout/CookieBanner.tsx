import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { applyConsent, initConsentDefaults, readConsent, saveConsent } from "../../lib/tracking";

/**
 * Cookiebanner volgens Google Consent Mode v2.
 * Standaard staat alles op "denied"; er worden geen analytics- of
 * marketingtags geladen tot de bezoeker een keuze maakt.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    initConsentDefaults();
    const existing = readConsent();
    if (existing) {
      applyConsent(existing);
    } else {
      setVisible(true);
    }
    const open = () => setVisible(true);
    window.addEventListener("chs:open-cookie-settings", open);
    return () => window.removeEventListener("chs:open-cookie-settings", open);
  }, []);

  if (!visible) return null;

  const decide = (analytics: boolean, marketing: boolean) => {
    saveConsent({ analytics, marketing });
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookievoorkeuren"
      className="fixed inset-x-3 bottom-16 z-50 md:inset-x-auto md:bottom-5 md:left-5 md:max-w-md"
    >
      <div className="border border-border bg-background/95 p-5 shadow-glass backdrop-blur-md">
        <h2 className="font-display text-base font-semibold">Cookies op deze website</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          We gebruiken noodzakelijke cookies om de site te laten werken. Met uw toestemming meten we
          ook websitegebruik en advertentieresultaten. U kunt uw keuze later altijd aanpassen.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => decide(true, true)} className="cta-primary !min-h-11">
            Alles aanvaarden
          </button>
          <button
            type="button"
            onClick={() => decide(false, false)}
            className="cta-secondary !min-h-11"
          >
            Alleen noodzakelijke
          </button>
          <button
            type="button"
            onClick={() => decide(true, false)}
            className="cta-secondary !min-h-11"
          >
            Enkel statistieken
          </button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Meer info in ons{" "}
          <Link to="/cookiebeleid" className="underline">
            cookiebeleid
          </Link>{" "}
          en{" "}
          <Link to="/privacybeleid" className="underline">
            privacybeleid
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event("chs:open-cookie-settings"))}
    >
      Cookievoorkeuren aanpassen
    </button>
  );
}
