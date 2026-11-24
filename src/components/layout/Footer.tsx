import { Link } from "@tanstack/react-router";
import { LogoLight } from "../brand/Logo";
import { company, whatsappHref } from "../../lib/site";
import { AppointmentButton } from "../AppointmentButton";
import { track } from "../../lib/tracking";

/** Donkere afsluiter met de footer als lichte, afgeronde kaart erin. */
export function Footer() {
  return (
    <footer className="bg-ink px-3 pb-3 pt-3 sm:px-5 sm:pb-5">
      <div className="mx-auto max-w-6xl rounded-lg bg-background p-6 text-foreground sm:p-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <p className="display-3 max-w-[16ch]">Comfort in huis, vakkundig geregeld.</p>
          <LogoLight />
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="max-w-[34ch] text-sm leading-relaxed text-muted-foreground">
              Verwarming, sanitair en gas in {company.serviceArea}. Eén vast aanspreekpunt, van offerte tot oplevering.
            </p>
            <AppointmentButton location="footer" className="cta-primary mt-5" />
            <Link to="/offerte" onClick={() => track("quote_cta_click", { location: "footer" })} className="cta-primary arrow-link mt-5">
              Vraag een offerte <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em]">Diensten</h2>
            <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
              {([
                ["/verwarmingsketels", "Verwarmingsketels"],
                ["/onderhoud", "↳ Onderhoud ketels"],
                ["/herstellingen", "↳ Herstelling ketels"],
                ["/vaillant", "↳ Vaillant-ketels"],
                ["/radiatoren", "Radiatoren"],
                ["/sanitair", "Sanitair"],
                ["/warmwatertoestellen", "↳ Warmwatertoestellen"],
                ["/sanitair", "↳ Close-in boilers & waterverzachters"],
                ["/gasleidingen", "Gasleidingen"],
              ] as const).map(([to, label]) => (
                <Link key={label} to={to} className="hover:text-foreground">{label}</Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em]">Clima Heat</h2>
            <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
              <Link to="/tarieven" className="hover:text-foreground">Onze tarieven</Link>
              <Link to="/afspraak-maken" className="hover:text-foreground">Maak een afspraak</Link>
              <Link to="/diensten" className="hover:text-foreground">Alle diensten</Link>
              <Link to="/merken" className="hover:text-foreground">Onze merken</Link>
              <Link to="/realisaties" className="hover:text-foreground">Realisaties</Link>
              <Link to="/over-ons" className="hover:text-foreground">Over Clima Heat</Link>
              <Link to="/privacybeleid" className="hover:text-foreground">Privacybeleid</Link>
              <Link to="/cookiebeleid" className="hover:text-foreground">Cookiebeleid</Link>
            </div>
          </div>

          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em]">Contact</h2>
            <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
              <a
                href={company.phoneHref}
                onClick={() => track("phone_click", { location: "footer" })}
                className="hover:text-foreground"
              >
                {company.phone}
              </a>
              <a
                href={company.emailHref}
                onClick={() => track("email_click", { location: "footer" })}
                className="break-all hover:text-foreground"
              >
                {company.email}
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_click", { location: "footer" })}
                className="hover:text-foreground"
              >
                WhatsApp
              </a>
              <p className="mt-2 leading-relaxed">{company.region}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-border pt-5 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} {company.name} · BTW {company.vat}</span>
          <span>Verwarming · Sanitair · Gas — {company.serviceArea}</span>
        </div>
      </div>
    </footer>
  );
}
