import { Link } from "@tanstack/react-router";
import { CallButton, MailButton } from "./sections";
import { company } from "../lib/site";

/** Aparte bedankpagina: nodig voor betrouwbare Google Ads-conversiemeting. */
export function ThankYou({
  title,
  text,
  eventLabel,
  urgent = false,
}: {
  title: string;
  text: string;
  eventLabel: string;
  urgent?: boolean;
}) {
  return (
    <section className="heat-glow">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
        <div className="glass-panel p-7 sm:p-10">
          <p className="eyebrow">Aanvraag verzonden · {eventLabel}</p>
          <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">{title}</h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">{text}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <CallButton location="thankyou" className={urgent ? "cta-primary" : "cta-secondary"} />
            <MailButton location="thankyou" />
          </div>

          <div className="mt-8 border-t border-border pt-6 text-sm text-muted-foreground">
            <p>
              {company.name} · {company.phone} · {company.email}
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <Link to="/" className="underline">
                Naar de homepage
              </Link>
              <Link to="/realisaties" className="underline">
                Bekijk realisaties
              </Link>
              <Link to="/onderhoud" className="underline">
                Onderhoud
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
