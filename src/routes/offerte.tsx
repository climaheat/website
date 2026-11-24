import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { LeadForm } from "../components/LeadForm";
import { Breadcrumbs } from "../components/PageHero";
import { CallButton, HeroTrust, MailButton, Reviews, Section, Steps } from "../components/sections";
import { WhatsAppIcon } from "../components/layout/StickyCta";
import { breadcrumbSchema, pageMeta } from "../lib/seo";
import { company, whatsappHref } from "../lib/site";
import { track } from "../lib/tracking";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Offerte aanvragen", path: "/offerte" },
];

export const Route = createFileRoute("/offerte")({
  validateSearch: z.object({ dienst: z.string().max(80).optional() }),
  head: () => ({
    ...pageMeta({
      title: "Offerte aanvragen voor verwarming, sanitair of gas | Clima Heat",
      description:
        "Vraag vrijblijvend een offerte voor een nieuwe ketel, radiatoren, warmwatertoestel, close-in boiler, waterverzachter, kranen of gasleidingen. Voeg gerust een foto toe.",
      path: "/offerte",
    }),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(breadcrumbSchema(crumbs)) }],
  }),
  component: OffertePage,
});

const helps = [
  "Kies uw dienst en voeg eventueel een foto van uw toestel of typeplaatje toe.",
  "Laat uw naam, telefoon, e-mail en postcode achter.",
  "We nemen contact met u op om uw vraag te bespreken.",
] as const;

function OffertePage() {
  const { dienst } = Route.useSearch();
  return (
    <>
      <section className="under-header bg-ink text-ink-foreground">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-[calc(var(--header-space)+1.5rem)] sm:pb-20">
          <Breadcrumbs light items={crumbs} />
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="order-2 lg:order-1 lg:col-span-5 lg:pt-4">
              <p className="eyebrow text-ink-foreground/85">Offerte aanvragen</p>
              <h1 className="display-1 mt-6 max-w-[12ch] !text-[clamp(2.6rem,1.6rem+4vw,4.75rem)] !leading-[0.95]">
                Vraag vrijblijvend <span className="text-ink-foreground/55">uw offerte aan.</span>
              </h1>
              <p className="lead mt-6 max-w-[44ch] text-ink-foreground/80">
                Verwarming, sanitair of gas: vertel ons kort wat u nodig heeft. Een foto van uw toestel of de
                plaats van het werk helpt ons om uw aanvraag gericht voor te bereiden.
              </p>
              <ol className="mt-8 grid gap-3 border-t border-ink-foreground/15 pt-6">
                {helps.map((text, i) => (
                  <li key={text} className="flex gap-4 text-[15px] leading-relaxed text-ink-foreground/85">
                    <span className="text-sm tabular-nums text-ember">0{i + 1}</span>
                    {text}
                  </li>
                ))}
              </ol>
              <div className="mt-8 flex flex-wrap gap-2.5">
                <CallButton location="offerte_page" className="cta-ghost-light" />
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("whatsapp_click", { location: "offerte_page" })}
                  className="cta-ghost-light gap-2"
                >
                  <WhatsAppIcon className="size-4" /> WhatsApp
                </a>
                <MailButton location="offerte_page" className="cta-ghost-light" />
              </div>
              <div className="mt-10">
                <HeroTrust />
              </div>
            </div>
            <div className="order-1 text-foreground lg:order-2 lg:col-span-7">
              <LeadForm key={dienst ?? "offerte"} variant="offerte" defaultSubject={dienst} id="offerteformulier" />
            </div>
          </div>
        </div>
      </section>

      <Section tone="muted">
        <Reviews />
      </Section>

      <Section>
        <Steps />
        <p className="mt-10 text-sm text-muted-foreground">
          Liever meteen iemand spreken? Bel {company.phone} of mail {company.email}.
        </p>
      </Section>
    </>
  );
}
