import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  company,
  faqHome,
  googleRating,
  googleReviewsUrl,
  projects,
  reviews,
  serviceCategories,
  steps,
  trustPoints,
  whyUs,
} from "../lib/site";
import { track } from "../lib/tracking";
import { LeadForm } from "./LeadForm";
import { AmbientVideo } from "./AmbientVideo";
import { AppointmentButton } from "./AppointmentButton";
import { QuoteButton } from "./QuoteButton";
import { ReviewBelt } from "./ReviewBelt";

export const brands = ["Vaillant", "Viessmann", "Bulex", "Bosch", "Junkers", "Buderus", "Remeha"] as const;

export function Section({
  children,
  className = "",
  id,
  tone = "plain",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "plain" | "muted" | "ink";
}) {
  const tones = {
    plain: "bg-background",
    muted: "bg-muted",
    ink: "bg-ink text-ink-foreground",
  } as const;
  return (
    <section id={id} className={`${tones[tone]} ${className}`}>
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

/* ---------- kleine lijniconen ---------- */
type IconName = "flame" | "drop" | "gas" | "star" | "pin" | "shield" | "check" | "wrench";
export function Icon({ name, className = "size-4" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    flame: <path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.2 1-3.7 2.3-4.8.2 1.6.9 2.6 1.9 3 0-3 .2-5.6.8-8.2Z" />,
    drop: <path d="M12 3.5S6 10 6 14a6 6 0 0 0 12 0c0-4-6-10.5-6-10.5Z" />,
    gas: <><path d="M4 12h10" /><path d="M14 8v8" /><path d="M14 12h6" /><circle cx="17.5" cy="7" r="1.6" /></>,
    star: <path d="m12 4 2.4 5 5.4.6-4 3.7 1.1 5.3L12 16l-4.9 2.6 1.1-5.3-4-3.7 5.4-.6Z" />,
    pin: <><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.3" /></>,
    shield: <><path d="M12 3 5 6v5.5c0 4.3 3 7.8 7 9.5 4-1.7 7-5.2 7-9.5V6Z" /><path d="m9 12 2 2 4-4" /></>,
    check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
    wrench: <path d="M14.5 4.5a4.5 4.5 0 0 0-4.2 6.1L4 16.9 7.1 20l6.3-6.3a4.5 4.5 0 0 0 6.1-4.2l-2.7 2.7-2.9-.4-.4-2.9Z" />,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      {paths[name]}
    </svg>
  );
}

/**
 * Vaste titelopbouw: klein omkaderd label, grote korte titel en een korte
 * toelichting rechts (of gecentreerd).
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  light = false,
  align = "split",
  className = "",
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  light?: boolean;
  align?: "split" | "center";
  className?: string;
  children?: ReactNode;
}) {
  if (align === "center") {
    return (
      <div className={`reveal mx-auto flex max-w-3xl flex-col items-center text-center ${className}`}>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="display-2 mt-5">{title}</h2>
        {intro && <p className={`lead mt-5 max-w-[52ch] ${light ? "text-ink-foreground/75" : "text-muted-foreground"}`}>{intro}</p>}
        {children && <div className="mt-7 flex flex-wrap justify-center gap-3">{children}</div>}
      </div>
    );
  }
  return (
    <div className={`reveal grid gap-6 lg:grid-cols-12 ${className}`}>
      <div className="lg:col-span-6">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="display-2 mt-5 max-w-[16ch]">{title}</h2>
      </div>
      {(intro || children) && (
        <div className="lg:col-span-6 lg:pt-10">
          {intro && <p className={`max-w-[56ch] text-[15px] leading-relaxed ${light ? "text-ink-foreground/75" : "text-muted-foreground"}`}>{intro}</p>}
          {children && <div className="mt-5 flex flex-wrap gap-3">{children}</div>}
        </div>
      )}
    </div>
  );
}

/** Donkere, gecentreerde afsluiter met korte titel en twee acties. */
export function CtaStrip({
  title = "Klaar voor meer comfort?",
  text = "Vertel ons wat u nodig heeft. U ontvangt snel een duidelijk, vrijblijvend voorstel.",
  location,
  primary = { label: "Vraag een offerte", to: "/offerte" },
  eyebrow = "Volgende stap",
}: {
  title?: string;
  text?: string;
  location: string;
  primary?: { label: string; to?: string; hash?: string; subject?: string | undefined };
  eyebrow?: string;
}) {
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="reveal mx-auto flex max-w-3xl flex-col items-center px-5 py-20 text-center sm:py-28">
        <p className="eyebrow text-ink-foreground/80">{eyebrow}</p>
        <h2 className="display-2 mt-5">{title}</h2>
        <p className="lead mt-5 max-w-[50ch] text-ink-foreground/70">{text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          {primary.to === "/afspraak-maken" ? (<AppointmentButton location={location} subject={primary.subject} label={primary.label} />) : primary.label === "Vraag een offerte" ? (
            <QuoteButton location={location} subject={primary.subject} />
          ) : primary.to ? (
            <Link to={primary.to} onClick={() => track("quote_cta_click", { location })} className="cta-primary cta-lg arrow-link">
              {primary.label} <span aria-hidden="true">→</span>
            </Link>
          ) : (
            <a href={primary.hash ?? "#aanvraag"} className="cta-primary cta-lg arrow-link">
              {primary.label} <span aria-hidden="true">→</span>
            </a>
          )}
          <CallButton location={location} className="cta-ghost-light cta-lg" />
        </div>
      </div>
    </section>
  );
}

export function CallButton({
  location,
  label = "Bel ons",
  className = "cta-secondary",
}: {
  location: string;
  label?: string;
  className?: string;
}) {
  return (
    <a href={company.phoneHref} onClick={() => track("phone_click", { location })} className={className}>
      {label}
    </a>
  );
}

export function MailButton({ location, className = "cta-secondary" }: { location: string; className?: string }) {
  return (
    <a href={company.emailHref} onClick={() => track("email_click", { location })} className={className}>
      Mail ons
    </a>
  );
}

/** Korte vertrouwenspunten met icoon, voor onder een grote hero. */
export function HeroTrust({ light = true }: { light?: boolean }) {
  const items: Array<[IconName, string]> = [
    ["star", `${googleRating.score} op Google · ${googleRating.count} reviews (stand ${googleRating.asOf})`],
    ["pin", "Antwerpen & Vlaanderen"],
    ["shield", "Erkende technieker"],
  ];
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-2 text-[13px] ${light ? "text-ink-foreground/85" : "text-muted-foreground"}`}>
      {items.map(([icon, label]) => (
        <li key={label} className="flex items-center gap-2">
          <Icon name={icon} className="size-4 text-ember" />
          {label}
        </li>
      ))}
    </ul>
  );
}

/** Gecentreerde introductiezin met drie kernpunten. */
export function IntroStatement({
  eyebrow = "Introductie",
  text,
  points = [
    ["flame", "Verwarming"],
    ["drop", "Sanitair"],
    ["gas", "Gas"],
  ],
}: {
  eyebrow?: string;
  text: ReactNode;
  points?: Array<[IconName, string]>;
}) {
  return (
    <section className="bg-muted">
      <div className="reveal mx-auto flex max-w-4xl flex-col items-center px-5 py-20 text-center sm:py-28">
        <p className="eyebrow">{eyebrow}</p>
        <p className="display-3 mt-6 !text-[clamp(1.5rem,1.15rem+1.4vw,2.35rem)] !leading-[1.15]">{text}</p>
        <ul className="mt-10 flex flex-wrap justify-center gap-x-12 gap-y-6">
          {points.map(([icon, label]) => (
            <li key={label} className="flex w-28 flex-col items-center gap-2.5 text-sm font-medium">
              <Icon name={icon} className="size-6 text-accent" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function TrustBar() {
  const icons: IconName[] = ["flame", "shield", "check", "star"];
  return (
    <div className="bg-background">
      <ul className="mx-auto grid max-w-6xl gap-2 px-5 py-6 sm:grid-cols-2 lg:grid-cols-4">
        {trustPoints.map((point, i) => (
          <li key={point} className="surface flex items-center gap-3 border border-border px-4 py-3.5 text-sm font-medium">
            <Icon name={icons[i] ?? "check"} className="size-5 text-accent" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RatingBadge({ light = false }: { light?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-3 rounded-md px-3 py-2 ${light ? "bg-ink-foreground/10 backdrop-blur-sm" : "bg-muted"}`}>
      <span className="text-lg font-medium">{googleRating.score}</span>
      <span className="tracking-[0.15em] text-ember" aria-hidden="true">★★★★★</span>
      <span className={`text-xs leading-tight ${light ? "text-ink-foreground/70" : "text-muted-foreground"}`}>
        {googleRating.count} Google-reviews
        <span className="block">Stand {googleRating.asOf}</span>
      </span>
    </div>
  );
}

/**
 * Interactieve dienstenmodule: links grote titels van de drie vakgebieden,
 * rechts een groot bewegend beeld dat meewisselt met de keuze.
 */
export function ServiceTabs({ media }: { media: Array<{ src: string; poster: string; alt: string }> }) {
  const [active, setActive] = useState(0);
  const current = serviceCategories[active]!;
  const clip = media[active];
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-14">
      <div className="border-t border-border">
        {serviceCategories.map((cat, index) => {
          const open = index === active;
          const panelId = `dienst-${cat.key}`;
          return (
            <div key={cat.key} className="border-b border-border">
              <button
                type="button"
                id={`${panelId}-knop`}
                onClick={() => setActive(index)}
                aria-expanded={open}
                aria-controls={panelId}
                className="group flex w-full items-baseline gap-5 py-6 text-left"
              >
                <span className={`text-sm tabular-nums transition-colors ${open ? "text-accent" : "text-muted-foreground"}`}>0{index + 1}</span>
                <span className={`text-[clamp(2.2rem,1.6rem+2.4vw,3.75rem)] font-medium leading-none tracking-[-0.045em] transition-colors duration-300 ${open ? "text-foreground" : "text-foreground/30 group-hover:text-foreground/60"}`}>
                  {cat.title}
                </span>
                <span className={`ml-auto self-center text-xl transition-all duration-300 ${open ? "translate-x-0 text-accent opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"}`} aria-hidden="true">→</span>
              </button>
              <div id={panelId} role="region" aria-labelledby={`${panelId}-knop`} hidden={!open} className="pb-7">
                <div key={cat.key} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <p className="max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground">{cat.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                    {cat.items.map((item) => (
                      <li key={item.label}>
                        <Link to={item.to} className="link-line text-sm font-medium">{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                  <Link to={cat.to} className="cta-primary arrow-nudge mt-6">
                    {cat.cta} <span aria-hidden="true">→</span>
                  </Link>
                  {media[index] && (
                    <div className="relative mt-6 overflow-hidden rounded-md lg:hidden">
                      <AmbientVideo src={media[index]!.src} poster={media[index]!.poster} className="aspect-[16/10] w-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {clip && (
        <div className="relative hidden min-h-[36rem] overflow-hidden rounded-md bg-ink lg:block">
          <div key={clip.src} className="absolute inset-0 animate-in fade-in zoom-in-105 duration-700">
            <AmbientVideo src={clip.src} poster={clip.poster} className="size-full object-cover" />
          </div>
          <span className="sr-only">{clip.alt}</span>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" aria-hidden="true" />
          <div key={current.key} className="absolute inset-x-6 bottom-6 max-w-sm animate-in fade-in slide-in-from-bottom-3 rounded-md bg-background/85 p-6 backdrop-blur-md duration-500">
            <p className="text-sm text-muted-foreground">0{active + 1} · {current.title}</p>
            <p className="mt-3 text-xl font-medium leading-snug tracking-[-0.02em]">{current.items.slice(0, 4).map((i) => i.label).join(" · ")}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/** Drie vakgebieden als beeldkaarten (gebruikt op de dienstenpagina). */
export function ServiceCategories({ images, videos = [] }: { images: Array<{ src: string; alt: string }>; videos?: Array<{ src: string; poster: string } | undefined> }) {
  return (
    <div className="grid gap-2 lg:grid-cols-3">
      {serviceCategories.map((cat, index) => {
        const img = images[index];
        const clip = videos[index];
        return (
          <article key={cat.key} className="reveal surface group flex flex-col overflow-hidden">
            {img && (
              <div className="relative overflow-hidden">
                {clip ? (
                  <>
                    <AmbientVideo src={clip.src} poster={clip.poster} className="aspect-[4/3] w-full object-cover transition-[scale] duration-[1200ms] ease-out group-hover:scale-[1.04]" />
                    <span className="sr-only">{img.alt}</span>
                  </>
                ) : (
                  <img src={img.src} alt={img.alt} width={1024} height={1280} loading="lazy" className="aspect-[4/3] w-full object-cover transition-[scale] duration-[1200ms] ease-out group-hover:scale-[1.04]" />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" aria-hidden="true" />
                <h3 className="display-3 absolute bottom-4 left-5 text-ink-foreground">{cat.title}</h3>
              </div>
            )}
            <div className="flex flex-1 flex-col p-5">
              <p className="text-sm leading-relaxed text-muted-foreground">{cat.description}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="inline-block rounded-md bg-muted px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-secondary">{item.label}</Link>
                  </li>
                ))}
              </ul>
              <Link to={cat.to} className="arrow-link mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-accent-deep">
                {cat.cta} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}

/** Rijen met titel links en uitleg rechts, op lichte kaarten. */
export function FeatureRows({ items }: { items: readonly { title: string; text: string }[] }) {
  return (
    <ul className="grid gap-2">
      {items.map((item) => (
        <li key={item.title} className="reveal surface group grid gap-2 px-6 py-5 transition-colors duration-300 hover:bg-card/70 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] sm:gap-10 sm:py-6">
          <h3 className="display-3 !text-[1.3rem]">{item.title}</h3>
          <p className="text-[15px] leading-relaxed text-muted-foreground">{item.text}</p>
        </li>
      ))}
    </ul>
  );
}

/**
 * Waarom Clima Heat: krachtige titel, korte introductie, groot technisch
 * detailbeeld en een verticale lijst met grote nummers en dunne lijnen.
 */
export function WhyUs({
  items = whyUs,
  image,
}: {
  items?: readonly { title: string; text: string }[];
  image?: { src: string; alt: string; caption: string };
}) {
  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className={image ? "lg:col-span-5" : "lg:col-span-5"}>
        <div className="lg:sticky lg:top-28">
          <p className="eyebrow">Waarom Clima Heat</p>
          <h2 className="display-2 reveal mt-5 max-w-[13ch]">Techniek waarop u kunt vertrouwen.</h2>
          <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-muted-foreground">
            Aan verwarming, sanitair of gas laat u niet elke maand werken. Daarom leggen we in gewone taal
            uit wat er aan uw installatie gebeurt en waarom, vóór, tijdens en na het werk.
          </p>
          {image && (
            <figure className="mt-8">
              <div className="img-reveal group overflow-hidden rounded-md">
                <img src={image.src} alt={image.alt} width={1200} height={912} loading="lazy" className="aspect-[5/4] w-full object-cover transition-[scale] duration-[1400ms] ease-out group-hover:scale-[1.05]" />
              </div>
              <figcaption className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{image.caption}</figcaption>
            </figure>
          )}
        </div>
      </div>
      <ol className="border-t border-border lg:col-span-7">
        {items.map((item, index) => (
          <li key={item.title} className="reveal group grid grid-cols-[4.5rem_1fr] gap-4 border-b border-border py-8 sm:grid-cols-[7rem_1fr] sm:py-10">
            <span className="text-[2.75rem] font-medium leading-none tracking-[-0.05em] text-accent transition-transform duration-500 group-hover:-translate-y-1 sm:text-[4rem]">
              0{index + 1}
            </span>
            <div className="sm:pt-2">
              <h3 className="display-3 transition-colors duration-300 group-hover:text-accent-deep">{item.title}</h3>
              <p className="mt-2 max-w-[48ch] text-[15px] leading-relaxed text-muted-foreground">{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Merken als rustige, typografische rij, zonder logo's of partnerclaims. */
export function BrandsBand({ tone = "plain" }: { tone?: "plain" | "muted" }) {
  return (
    <Section tone={tone}>
      <SectionHeading
        eyebrow="Onze merken"
        title="Vertrouwd met verschillende verwarmingsmerken."
        intro="We plaatsen, onderhouden en herstellen verwarmingsketels van verschillende merken. Welk toestel u ook heeft: vermeld merk en type bij uw aanvraag, dan bereiden we het bezoek gericht voor."
      >
        <Link to="/merken" className="cta-secondary arrow-nudge">Meer over onze merken <span aria-hidden="true">→</span></Link>
      </SectionHeading>
      <ul className="mt-14 grid grid-cols-2 border-l border-t border-border sm:grid-cols-4 lg:grid-cols-7">
        {brands.map((brand, i) => (
          <li key={brand} className="reveal group relative flex aspect-[2/1] flex-col justify-between sm:aspect-[4/3] overflow-hidden border-b border-r border-border p-4 transition-colors duration-500 hover:bg-ink hover:text-ink-foreground">
            <span className="text-[11px] text-muted-foreground transition-colors group-hover:text-ember">0{i + 1}</span>
            <span className="text-lg font-medium tracking-[-0.02em] transition-transform duration-500 group-hover:-translate-y-1 sm:text-xl">{brand}</span>
          </li>
        ))}
        <li className="flex aspect-[2/1] items-end border-b border-r border-border bg-muted p-4 text-sm text-muted-foreground sm:hidden">
          en andere merken
        </li>
      </ul>
      <p className="mt-4 text-xs text-muted-foreground">Merknamen ter informatie, zonder logo's. Vraag gerust na of we met uw specifieke toestel vertrouwd zijn.</p>
    </Section>
  );
}

/** Volle-breedte beeld met een korte, krachtige uitspraak. */
export function QuoteBand({ image, alt, quote, by = "Clima Heat Solutions" }: { image: string; alt: string; quote: string; by?: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
      <img src={image} alt={alt} loading="lazy" width={1600} height={1200} className="ken-burns absolute inset-0 -z-20 size-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-ink/85 via-ink/45 to-ink/20" aria-hidden="true" />
      <div className="mx-auto flex min-h-[32rem] max-w-6xl flex-col justify-between px-5 py-12 sm:min-h-[38rem] sm:py-16">
        <p className="reveal display-2 max-w-[18ch]">{quote}</p>
        <div className="flex items-end justify-between gap-4 text-sm">
          <p className="font-medium">{by}</p>
        </div>
      </div>
    </section>
  );
}

export function Steps() {
  return (
    <>
      <SectionHeading
        eyebrow="Werkwijze"
        title="Helder, van begin tot eind."
        intro="Elke aanvraag begint met een kort gesprek over uw toestel en uw vraag. Hoe meer we vooraf weten, hoe gerichter we het bezoek voorbereiden. Extra werk dat niet gepland was, bespreken we altijd eerst met u. Zo zijn er geen verrassingen en beslist u zelf over de volgende stap."
      />
      <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {steps.map((step, index) => (
          <li key={step.title} className="reveal group border-t border-foreground/80 pt-5">
            <div className="flex items-baseline justify-between">
              <span className="text-[3rem] font-medium leading-none tracking-[-0.05em] text-accent">0{index + 1}</span>
              {index < steps.length - 1 && <span className="hidden text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 lg:inline" aria-hidden="true">→</span>}
            </div>
            <h3 className="mt-8 text-lg font-medium leading-snug">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
          </li>
        ))}
      </ol>
    </>
  );
}

export function Reviews({ light = false }: { light?: boolean }) {
  const sub = light ? "text-ink-foreground/70" : "text-muted-foreground";
  const card = light ? "bg-ink-foreground/[0.07]" : "surface border border-border";
  return (
    <>
      <div className="reveal grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <p className={`eyebrow ${light ? "text-ink-foreground/80" : ""}`}>Reviews</p>
          <h2 className="display-2 mt-5 max-w-[16ch]">Wat klanten zeggen.</h2>
        </div>
        <div className="lg:col-span-6">
          <p className={`max-w-[52ch] text-[15px] leading-relaxed ${sub}`}>
            Een review zegt vaak meer dan een belofte op een website.{" "}
            {reviews.length > 0
              ? "Hieronder leest u echte beoordelingen van klanten op Google; u kunt ze ook zelf nalezen op ons Google-profiel."
              : "U kunt alle beoordelingen van onze klanten zelf nalezen op ons Google-profiel."}
          </p>
          <p className={`mt-3 text-sm ${sub}`}>
            <span className="tracking-[0.15em] text-ember" aria-hidden="true">★★★★★</span>{" "}
            {googleRating.score} op Google · {googleRating.count} reviews (stand {googleRating.asOf})
          </p>
        </div>
      </div>
      {reviews.length > 0 ? (
        <ReviewBelt light={light} />
      ) : (
        <div className={`reveal mt-12 flex flex-col items-start justify-between gap-6 rounded-md p-6 sm:flex-row sm:items-center sm:p-8 ${card}`}>
          <div>
            <p className="tracking-[0.2em] text-ember" aria-hidden="true">★★★★★</p>
            <p className="mt-3 text-xl font-medium leading-snug tracking-[-0.02em]">Lees de beoordelingen van onze klanten op Google.</p>
          </div>
          <a href={googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="cta-secondary arrow-nudge shrink-0">
            Bekijk onze Google-reviews <span aria-hidden="true">↗</span>
          </a>
        </div>
      )}
    </>
  );
}

/** Zeven merken elk afzonderlijk, als nette raster; zonder partner- of erkenningsclaims. */
export function BrandGrid({
  title = "Merken die we behandelen",
  intro = "We werken aan toestellen van verschillende verwarmingsmerken. Of een herstelling mogelijk is, hangt af van het toesteltype, de oorzaak en de beschikbaarheid van onderdelen.",
}: {
  title?: string;
  intro?: string;
}) {
  return (
    <Section>
      <SectionHeading eyebrow="Merken" title={title} intro={intro}>
        <Link to="/merken" className="cta-secondary arrow-nudge">Meer over onze merken <span aria-hidden="true">→</span></Link>
      </SectionHeading>
      <ul className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7" aria-label="Verwarmingsmerken">
        {brands.map((brand, i) => (
          <li key={brand} className="reveal flex min-h-24 flex-col justify-between rounded-md border border-border bg-card p-4">
            <span className="text-[11px] text-muted-foreground">0{i + 1}</span>
            <span className="mt-4 text-lg font-medium tracking-[-0.02em]">{brand}</span>
          </li>
        ))}
        <li className="flex min-h-24 items-end rounded-md bg-muted p-4 text-sm text-muted-foreground sm:hidden">
          en andere merken
        </li>
      </ul>
      <p className="mt-4 text-xs text-muted-foreground">Merknamen ter informatie, zonder logo's en zonder officiële partner- of erkenningsclaim.</p>
    </Section>
  );
}

export function Realisaties({ limit, types, excludeImages = [], hideImages = false }: { limit?: number; types?: string[] | undefined; excludeImages?: string[]; hideImages?: boolean }) {
  const selected = projects.filter((project) => (!types || types.includes(project.type)) && (!project.image || !excludeImages.includes(project.image)));
  const items = typeof limit === "number" ? selected.slice(0, limit) : selected;
  return (
    <>
      <SectionHeading
        eyebrow="Recent werk"
        title="Onze realisaties."
        intro="Een selectie van uitgevoerde werken in verwarming en sanitair, met aandacht voor techniek en nette afwerking."
      >
        <Link to="/realisaties" className="cta-secondary arrow-link">Alle realisaties <span aria-hidden="true">→</span></Link>
      </SectionHeading>
      {items.length > 0 ? (
        <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((project, i) => (
            <article key={project.title} className="reveal surface group flex flex-col overflow-hidden border border-border">
              {project.image && !hideImages && (
                <div className="overflow-hidden">
                  <img src={project.image} alt={project.alt ?? `${project.type} door Clima Heat Solutions`} loading="lazy" width={1200} height={900} className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="eyebrow">{[project.type, project.merk].filter(Boolean).join(" · ")}</p>
                  <span className="text-sm text-muted-foreground">0{i + 1}</span>
                </div>
                <h3 className="mt-8 text-xl font-medium leading-snug">{project.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </>
  );
}

export function Werkgebied() {
  const plaatsen = ["Antwerpen", "Berchem", "Borgerhout", "Deurne", "Merksem", "Wilrijk", "Mortsel", "Heel Vlaanderen"];
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-6">
        <p className="eyebrow">Werkgebied</p>
        <h2 className="display-2 reveal mt-5 max-w-[14ch]">Antwerpen en heel Vlaanderen.</h2>
        <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground">
          Clima Heat is actief in {company.region} en werkt in heel Vlaanderen. Niet zeker of uw gemeente erbij hoort? Bel of mail ons, dan
          bevestigen we dat meteen.
        </p>
        <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground">
          Voor verwarming, sanitair en gas komen we bij u ter plaatse. Geef bij uw aanvraag uw postcode
          door; dan kunnen we de planning van een bezoek meteen concreet bespreken.
        </p>
        <div className="mt-7 flex flex-wrap gap-2.5">
          <CallButton location="werkgebied" className="cta-primary" />
          <MailButton location="werkgebied" />
        </div>
      </div>
      <div className="lg:col-span-6">
        <div className="surface relative overflow-hidden border border-border p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-md bg-accent text-accent-foreground"><Icon name="pin" className="size-5" /></span>
            <div>
              <p className="font-medium">{company.region}</p>
              <p className="text-sm text-muted-foreground">en heel Vlaanderen</p>
            </div>
          </div>
          <ul className="mt-8 flex flex-wrap gap-1.5">
            {plaatsen.map((p) => (
              <li key={p} className="flex items-center gap-1.5 rounded-md bg-muted px-3 py-2 text-sm">
                <Icon name="pin" className="size-3.5 text-accent" /> {p}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-muted-foreground">Voorbeelden van gemeenten binnen ons werkgebied rond Antwerpen.</p>
        </div>
      </div>
    </div>
  );
}

export function Faq({
  items = faqHome,
  title = "Veelgestelde vragen",
}: {
  items?: readonly { q: string; a: string }[];
  title?: string;
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <p className="eyebrow">Goed om te weten</p>
        <h2 className="display-2 reveal mt-5 max-w-[14ch]">{title}</h2>
        <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-muted-foreground">Hieronder vindt u antwoorden op vragen die we vaak krijgen. Staat uw vraag er niet bij, of gaat het over uw specifieke toestel? Bel of mail ons gerust; we geven liever vooraf duidelijkheid dan achteraf uitleg.</p>
      </div>
      <div className="grid content-start gap-2 lg:col-span-7">
        {items.map((item) => (
          <details key={item.q} className="surface group border border-border px-5 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium transition-colors hover:text-accent-deep sm:text-lg">
              {item.q}
              <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-lg text-accent transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="mt-3 pr-10 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

export function FinalCta({
  title = "Uw offerte, zonder verplichting.",
  text = "Verwarming, sanitair of gas: vertel ons waarmee we kunnen helpen. U ontvangt een duidelijk, vrijblijvend voorstel.",
  variant = "offerte",
  appointmentSubject,
}: {
  title?: string | undefined;
  text?: string | undefined;
  variant?: "offerte" | "onderhoud" | "herstelling" | "afspraak" | undefined;
  appointmentSubject?: string | undefined;
}) {
  return (
    <Section id="offerte" tone="muted">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h2 className="display-2 reveal mt-5 max-w-[14ch]">{variant === "afspraak" ? "Maak een afspraak." : title}</h2>
          <p className="lead mt-5 max-w-[42ch] text-muted-foreground">{variant === "afspraak" ? "Onderhoud of een kleine interventie nodig? Geef uw voorkeursdatum door; we bevestigen de afspraak persoonlijk." : text}</p>
          <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-muted-foreground">Vermeld indien mogelijk het merk en type van uw toestel, uw postcode en wat u merkt. Bij een dringende storing is bellen de snelste weg.</p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {variant === "afspraak" ? <AppointmentButton location="final_cta" subject={appointmentSubject} /> : <QuoteButton location="final_cta" />}
            <CallButton location="final_cta" />
            <MailButton location="final_cta" />
          </div>
          <div className="mt-8 grid gap-2 sm:grid-cols-2">
            <a
              href={company.phoneHref}
              onClick={() => track("phone_click", { location: "final_cta_details" })}
              className="surface block p-4 text-sm"
            >
              <span className="block text-xs text-muted-foreground">Telefoon</span>
              <span className="mt-1 block font-medium">{company.phone}</span>
            </a>
            <a
              href={company.emailHref}
              onClick={() => track("email_click", { location: "final_cta_details" })}
              className="surface block p-4 text-sm"
            >
              <span className="block text-xs text-muted-foreground">E-mail</span>
              <span className="mt-1 block break-all font-medium">{company.email}</span>
            </a>
            <p className="surface p-4 text-sm sm:col-span-2">
              <span className="block text-xs text-muted-foreground">Werkgebied</span>
              <span className="mt-1 block font-medium">{company.region} · heel Vlaanderen</span>
            </p>
          </div>
        </div>
        {variant === "afspraak" ? <div className="self-center border-t border-border pt-8"><p className="display-3">Uw aanvraag, eenvoudig geregeld.</p><p className="mt-4 text-muted-foreground">Bekijk het tarief, kies de gewenste datum en voeg eventueel een foto toe.</p><AppointmentButton location="service_final" subject={appointmentSubject} className="cta-primary cta-lg mt-6" /></div> : <LeadForm variant={variant} />}
      </div>
    </Section>
  );
}

/** Rij met grote kerncijfers en dunne lijnen; enkel bevestigde feiten. */
export function FactsStrip({ light = false }: { light?: boolean }) {
  const facts: Array<[string, string, string]> = [
    ["3", "vakgebieden", "Verwarming, sanitair en gas"],
    [String(brands.length), "merken", "Van Vaillant tot Remeha"],
    [googleRating.score, "op Google", `${googleRating.count} reviews · stand ${googleRating.asOf}`],
    ["1", "aanspreekpunt", "Van voorstel tot oplevering"],
  ];
  const rule = light ? "border-ink-foreground/20" : "border-border";
  const sub = light ? "text-ink-foreground/65" : "text-muted-foreground";
  return (
    <dl className={`grid grid-cols-2 border-t lg:grid-cols-4 ${rule}`}>
      {facts.map(([value, label, note], i) => (
        <div key={label} className={`reveal border-b py-7 pr-4 lg:border-b-0 lg:py-9 ${rule} ${i > 0 ? "lg:border-l lg:pl-8" : ""} ${i % 2 === 1 ? "border-l pl-5 lg:pl-8" : ""}`}>
          <dt className="sr-only">{label}</dt>
          <dd>
            <span className="block text-[clamp(2.75rem,2rem+3vw,4.75rem)] font-medium leading-none tracking-[-0.055em]">
              {value}
              <span className="ml-2 align-top text-sm font-medium tracking-normal text-accent">{label}</span>
            </span>
            <span className={`mt-3 block text-sm ${sub}`}>{note}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** De drie vakgebieden als grote genummerde rijen met links naar de diensten. */
export function CategoryRows({ light = false }: { light?: boolean }) {
  const rule = light ? "border-ink-foreground/20" : "border-border";
  const sub = light ? "text-ink-foreground/70" : "text-muted-foreground";
  return (
    <ol className={`border-t ${rule}`}>
      {serviceCategories.map((cat, i) => (
        <li key={cat.key} className={`reveal group grid gap-5 border-b py-9 sm:py-12 lg:grid-cols-12 lg:gap-10 ${rule}`}>
          <div className="flex items-baseline gap-5 lg:col-span-5">
            <span className={`text-sm tabular-nums ${light ? "text-ember" : "text-accent"}`}>0{i + 1}</span>
            <Link to={cat.to} className="text-[clamp(2.4rem,1.7rem+2.8vw,4.25rem)] font-medium leading-none tracking-[-0.05em] transition-colors duration-300 group-hover:text-accent">
              {cat.title}
            </Link>
          </div>
          <div className="lg:col-span-7 lg:pt-2">
            <p className={`max-w-[54ch] text-[15px] leading-relaxed ${sub}`}>{cat.description}</p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {cat.items.filter((item, idx, all) => all.findIndex((x) => x.to === item.to) === idx).map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="link-line text-sm font-medium">{item.label}</Link>
                </li>
              ))}
            </ul>
            <Link to={cat.to} className={`arrow-nudge mt-6 inline-flex items-center gap-2 text-sm font-medium ${light ? "text-ember" : "text-accent-deep"}`}>
              {cat.cta} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </li>
      ))}
    </ol>
  );
}
