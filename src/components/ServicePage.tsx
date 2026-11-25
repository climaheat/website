import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { serviceIntent } from "../lib/pricing";
import { PriceSummary } from "./Pricing";
import { AppointmentButton } from "./AppointmentButton";
import { QuoteButton } from "./QuoteButton";
import { LeadForm } from "./LeadForm";
import { IntroBand, PageHero, splitLead } from "./PageHero";
import {
  Faq,
  FinalCta,
  Realisaties,
  Reviews,
  Section,
  Steps,
  BrandsBand,
  Werkgebied,
  Eyebrow,
  CallButton,
  CtaStrip,
} from "./sections";

export type ContentBlock = {
  h2: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type EditorialFocus = {
  label: string;
  title: string;
  paragraphs: string[];
  image: { src: string; alt: string; caption: string };
  secondImage?: { src: string; alt: string; caption: string };
};

/**
 * Sjabloon voor alle commerciële service- en landingspagina's:
 * intentie → oplossing → vertrouwen → bewijs → CTA → lead.
 */
export function ServicePage({
  eyebrow,
  h1,
  intro,
  breadcrumbs,
  formVariant = "offerte",
  formSubject,
  primaryLabel = "Vraag een offerte",
  urgent = false,
  blocks,
  faq,
  faqTitle,
  extra,
  showBrands = true,
  finalCta,
  focus,
  layout = "grid",
  projectTypes,
  showSteps = true,
  showReviews = true,
  heroVideo,
}: {
  eyebrow: string;
  h1: string;
  intro: string;
  breadcrumbs: Array<{ name: string; path: string }>;
  formVariant?: "offerte" | "onderhoud" | "herstelling";
  formSubject?: string;
  primaryLabel?: string;
  urgent?: boolean;
  blocks: ContentBlock[];
  faq: readonly { q: string; a: string }[];
  faqTitle?: string;
  extra?: ReactNode;
  showBrands?: boolean;
  finalCta?: { title?: string; text?: string };
  focus?: EditorialFocus;
  layout?: "grid" | "sequence" | "editorial";
  projectTypes?: string[];
  showSteps?: boolean;
  showReviews?: boolean;
  heroVideo?: { src: string; poster: string };
}) {
  const { lead, rest } = splitLead(intro);
  const intent = serviceIntent(formVariant, formSubject);
  const action = intent ? { label: "Maak een afspraak", to: "/afspraak-maken", subject: intent.subject } : { label: "Vraag een offerte", subject: formSubject };
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={h1}
        subtitle={lead}
        primary={action}
        urgent={urgent}
        breadcrumbs={breadcrumbs}
        video={heroVideo}
        aside={
          intent ? <div className="rounded-lg bg-card p-6 text-card-foreground"><p className="eyebrow">Transparant tarief</p><PriceSummary priceKey={intent.price} /><p className="text-xs leading-relaxed text-muted-foreground">Prijs exclusief btw. Uw afspraak is pas definitief na bevestiging.</p>{intent.price === "plumbing" && <QuoteButton location="sanitary_larger" subject="Grotere sanitaire werkzaamheden" className="cta-secondary mt-4" />}</div> : <div id="aanvraag"><LeadForm variant="offerte" defaultSubject={formSubject} compact id="aanvraag-form" /></div>
        }
      />

      {rest && <IntroBand text={rest} />}

      {extra}

      {focus && (
        <Section tone={layout === "sequence" ? "muted" : "plain"}>
          <div className={`grid items-center gap-12 lg:grid-cols-12 lg:gap-16 ${layout === "editorial" ? "lg:[&>div:first-child]:order-2" : ""}`}>
            <div className="lg:col-span-6">
              <Eyebrow>{focus.label}</Eyebrow>
              <h2 className="display-2 reveal mt-5 max-w-[15ch]">{focus.title}</h2>
              {focus.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-muted-foreground">{paragraph}</p>
              ))}
            </div>
            <div className="reveal lg:col-span-6">
              <div className={`relative ${focus.secondImage ? "mb-7 mr-5 sm:mr-0" : ""}`}>
                <div className="img-reveal group overflow-hidden rounded-md"><img src={focus.image.src} alt={focus.image.alt} loading="lazy" width={1200} height={900} className="aspect-[5/4] w-full object-cover transition-[scale] duration-[1400ms] ease-out group-hover:scale-[1.05]" /></div>
                {focus.secondImage && (
                  <div className="float-soft absolute -bottom-5 -right-5 w-[38%] overflow-hidden rounded-md border-[5px] border-background sm:-bottom-7 sm:-left-7 sm:right-auto">
                    <img src={focus.secondImage.src} alt={focus.secondImage.alt} loading="lazy" width={1200} height={900} className="aspect-square w-full object-cover" />
                  </div>
                )}
              </div>
              <p className={`${focus.secondImage ? "mt-9" : "mt-3"} border-t border-border pt-3 text-xs text-muted-foreground`}>
                {focus.image.caption}{focus.secondImage ? ` · ${focus.secondImage.caption}` : ""}
              </p>
            </div>
          </div>
        </Section>
      )}

      <Section tone="muted">
        <div className={layout === "sequence" ? "grid border-t border-border" : layout === "editorial" ? "grid gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]" : "grid gap-2 lg:grid-cols-2"}>
          {blocks.map((block, index) => (
            <div key={block.h2} className={`reveal ${layout === "sequence" ? "group grid gap-3 border-b border-border py-8 sm:grid-cols-[4.5rem_minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-8" : layout === "editorial" ? "border-t border-foreground/70 pt-6" : "surface p-6 sm:p-8"}`}>
              {layout === "sequence" && <span className="text-[2.5rem] font-medium leading-none tracking-[-0.05em] text-accent transition-transform duration-500 group-hover:-translate-y-1">{String(index + 1).padStart(2, "0")}</span>}
              <h2 className="display-3">{block.h2}</h2>
              <div>{block.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
              {block.bullets && (
                <ul className="mt-3 grid gap-2">
                  {block.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2.5 text-[15px] text-muted-foreground">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}</div>
            </div>
          ))}
        </div>
      </Section>

      <CtaStrip
        location="service_content"
        title={urgent ? "Storing? We helpen u verder." : "Klaar om te starten?"}
        text={intent ? "Bekijk het tarief en geef uw voorkeursdatum door. We nemen contact op om uw afspraak te bevestigen." : "Vraag uw vrijblijvende offerte aan. We bekijken uw situatie en sturen een duidelijk voorstel."}
        primary={action}
      />

      <Section>
        <Eyebrow>Verder kijken</Eyebrow>
        <h2 className="display-2 reveal mt-5">Alles onder één dak.</h2>
        <p className="lead mt-5 max-w-3xl text-muted-foreground">Clima Heat werkt aan uw volledige installatie. Is uw ketel oud of vaak in storing, bekijk dan vervanging. Draait alles normaal, dan is onderhoud de logische stap. Ook voor radiatoren, warmwatertoestellen, close-in boilers, waterverzachters, sanitaire kranen en gasleidingen kunt u bij ons terecht.</p>
        <div className="mt-8 flex flex-wrap gap-2">
          {([
            ["/verwarmingsketels", "Verwarmingsketels"],
            ["/merken", "Onze merken"],
            ["/onderhoud", "Onderhoud"],
            ["/herstellingen", "Herstellingen"],
            ["/radiatoren", "Radiatoren"],
            ["/stookolie", "Stookolie"],
            ["/warmwatertoestellen", "Warmwatertoestellen"],
            ["/sanitair", "Sanitair"],
            ["/algemeen-sanitair", "Algemene sanitaire werken"],
            ["/gasleidingen", "Gasleidingen"],
            ["/vaillant", "Vaillant-ketels"],
          ] as const).map(([to, label]) => (
            <Link key={to} to={to} className="cta-secondary arrow-nudge !min-h-10 !px-4 !text-sm">{label} <span aria-hidden="true">→</span></Link>
          ))}
        </div>
      </Section>

      {showSteps && <Section><Steps /></Section>}

      {showBrands && <BrandsBand tone="plain" />}

      <Section tone="muted">
        <Realisaties limit={3} types={projectTypes} hideImages />
      </Section>

      {showReviews && <Section><Reviews /></Section>}

      <Section tone="muted">
        <Werkgebied />
      </Section>

      <Section>
        <Faq items={faq} title={faqTitle ?? "Veelgestelde vragen"} />
      </Section>

      <FinalCta
        appointmentSubject={intent?.subject}
        variant={intent ? "afspraak" : "offerte"}
        title={finalCta?.title}
        text={finalCta?.text}
      />
    </>
  );
}

export function ProblemGrid({ items, title, description = "Herkent u een van deze situaties? Noteer wat u merkt en of er een foutcode op het display staat. Met die informatie kunnen we al aan de telefoon inschatten welk nazicht nodig is en wat u best meebrengt of klaarzet voor het bezoek." }: { items: string[]; title: string; description?: string }) {
  return (
    <Section>
      <Eyebrow>Herkenbaar?</Eyebrow>
      <h2 className="display-2 reveal mt-5 max-w-[18ch]">{title}</h2>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">{description}</p>
      <ul className="mt-10 grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item} className="group flex items-center gap-3 border-b border-border py-5 pr-4 text-[15px] font-medium"><span className="text-accent transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
            {item}
          </li>
        ))}
      </ul>
    </Section>
  );
}
