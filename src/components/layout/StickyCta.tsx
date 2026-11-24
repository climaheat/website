import { Link } from "@tanstack/react-router";
import { company, whatsappHref } from "../../lib/site";
import { track } from "../../lib/tracking";

export function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2C6.57 2 2.13 6.43 2.13 11.9c0 1.75.46 3.45 1.33 4.95L2 22l5.3-1.39a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.43 9.9-9.9A9.86 9.86 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.14.83.84-3.06-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.26-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.21-8.24 8.21Zm4.52-6.16c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}

/**
 * Mobiel: actiebalk met bellen, WhatsApp en offerte, binnen duimbereik.
 * Desktop: zwevende WhatsApp-knop rechtsonder.
 */
export function StickyCta() {
  return (
    <>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("whatsapp_click", { location: "floating_button" })}
        aria-label="Stuur ons een WhatsApp-bericht"
        className="group fixed bottom-6 right-6 z-40 hidden items-center gap-2.5 rounded-full bg-whatsapp py-3 pl-3 pr-5 text-sm font-medium text-whatsapp-foreground shadow-[0_12px_30px_-10px_var(--color-whatsapp)] transition-transform hover:-translate-y-0.5 md:flex"
      >
        <WhatsAppIcon className="size-6" />
        WhatsApp
      </a>

      <div className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-[.7fr_.7fr_1fr_1fr] gap-1.5 rounded-lg border border-border/70 bg-background/90 p-1.5 shadow-[0_8px_30px_-12px_oklch(0.23_0.025_240/0.3)] backdrop-blur-md md:hidden">
        <a
          href={company.phoneHref}
          onClick={() => track("phone_click", { location: "sticky_bar" })}
          className="rounded-md bg-muted py-3 text-center text-xs font-medium text-foreground"
        >
          Bel ons
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click", { location: "sticky_bar" })}
          className="flex items-center justify-center gap-1.5 rounded-md bg-whatsapp py-3 text-xs font-medium text-whatsapp-foreground"
        >
          <WhatsAppIcon className="size-4" />
          <span className="sr-only">WhatsApp</span>
        </a>
        <Link to="/afspraak-maken" onClick={() => track("appointment_cta_click", { location: "sticky_bar" })} className="flex items-center justify-center rounded-md bg-accent px-1 py-3 text-xs font-semibold text-accent-foreground">Afspraak</Link>
        <Link
          to="/offerte"
          onClick={() => track("quote_cta_click", { location: "sticky_bar" })}
          className="rounded-md bg-muted py-3 text-center text-xs font-semibold text-foreground"
        >
          Offerte
        </Link>
      </div>
      <div className="h-20 bg-ink md:hidden" aria-hidden="true" />
    </>
  );
}
