import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { CallButton, HeroTrust, RatingBadge } from "./sections";
import { AmbientVideo } from "./AmbientVideo";
import { AppointmentButton } from "./AppointmentButton";
import { QuoteButton } from "./QuoteButton";

export function Breadcrumbs({ items, light = false }: { items: Array<{ name: string; path: string }>; light?: boolean }) {
  return (
    <nav aria-label="Kruimelpad" className={`text-xs ${light ? "text-ink-foreground/60" : "text-muted-foreground"}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => (
          <li key={item.path} className="flex items-center gap-1.5">
            {index > 0 && <span aria-hidden="true">/</span>}
            {index === items.length - 1 ? (
              <span aria-current="page">{item.name}</span>
            ) : (
              <Link to={item.path} className={light ? "hover:text-ink-foreground" : "hover:text-foreground"}>
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Splitst een lange intro: eerste zin(nen) als korte toelichting, de rest als verdieping. */
export function splitLead(text: string, min = 130): { lead: string; rest: string } {
  const sentences = text.split(/(?<=[.!?])\s+/);
  let lead = "";
  let i = 0;
  while (i < sentences.length && (lead.length < min || i === 0)) {
    lead = lead ? `${lead} ${sentences[i]}` : sentences[i]!;
    i += 1;
  }
  return { lead, rest: sentences.slice(i).join(" ") };
}

/** Splitst een titel in twee tinten: hoofdboodschap en (gedempte) aanvulling. */
export function TwoTone({ title, mutedClass }: { title: string; mutedClass: string }) {
  const idx = title.lastIndexOf(" in ");
  const colon = title.indexOf(": ");
  const cut = colon > 0 ? colon + 1 : idx > 12 ? idx : -1;
  if (cut < 0) return <>{title}</>;
  return (
    <>
      <span className="line-mask"><span>{title.slice(0, cut)}</span></span>
      <span className="line-mask"><span style={{ animationDelay: "120ms" }} className={mutedClass}>{title.slice(cut).trim()}</span></span>
    </>
  );
}

/**
 * Commerciële hero voor servicepagina's: binnen één blik duidelijk waar de
 * bezoeker is, plus een primaire CTA zonder te scrollen. Met video wordt de
 * hero een donkere, filmische opening met het sfeerfilmpje als achtergrond.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  primary,
  urgent = false,
  breadcrumbs,
  aside,
  photo,
  video,
  backdrop,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  primary: { label: string; to?: string; hash?: string; subject?: string | undefined };
  urgent?: boolean;
  breadcrumbs: Array<{ name: string; path: string }>;
  aside?: ReactNode;
  photo?: { src: string; alt: string };
  video?: { src: string; poster: string } | undefined;
  /** Groot stilstaand beeld als donkere achtergrond (wanneer er geen filmpje is). */
  backdrop?: { src: string; alt: string };
}) {
  const actions = primary.to === "/afspraak-maken" ? (<><AppointmentButton location="page_hero" subject={primary.subject} label={primary.label} /><CallButton location="page_hero" className={video || backdrop ? "cta-ghost-light cta-lg" : "cta-secondary cta-lg"} /></>) : urgent ? (
    <>
      <CallButton location="page_hero" label="Bel voor een herstelling" className="cta-primary cta-lg" />
      <a href="#aanvraag" className={video || backdrop ? "cta-ghost-light cta-lg" : "cta-secondary cta-lg"}>
        Herstelling aanvragen
      </a>
    </>
  ) : (
    <>
      {primary.label === "Vraag een offerte" ? (
        <QuoteButton location="page_hero" subject={primary.subject} />
      ) : primary.to ? (
        <Link to={primary.to} className="cta-primary cta-lg arrow-nudge">
          {primary.label} <span aria-hidden="true">→</span>
        </Link>
      ) : (
        <a href={primary.hash ?? "#aanvraag"} className="cta-primary cta-lg arrow-nudge">
          {primary.label} <span aria-hidden="true">→</span>
        </a>
      )}
      <CallButton location="page_hero" className={video || backdrop ? "cta-ghost-light cta-lg" : "cta-secondary cta-lg"} />
    </>
  );

  if (video || backdrop) {
    return (
      <section className="under-header relative isolate overflow-hidden bg-ink text-ink-foreground">
        {video ? (
          <AmbientVideo eager src={video.src} poster={video.poster} className="ken-burns absolute inset-0 -z-20 size-full object-cover" />
        ) : (
          <img src={backdrop!.src} alt={backdrop!.alt} width={1600} height={1200} className="ken-burns absolute inset-0 -z-20 size-full object-cover" />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/75 to-ink/25" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-ink/80 to-transparent" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-5 pb-12 pt-[calc(var(--header-space)+2rem)] sm:pb-16 lg:pb-20">
          <Breadcrumbs items={breadcrumbs} light />
          <div className={`mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12 ${aside ? "items-start" : "items-end"}`}>
            <div className={`${aside ? "lg:col-span-7" : "lg:col-span-9"} lg:pt-4`}>
              <p className="eyebrow animate-rise text-ink-foreground/85">{eyebrow}</p>
              <h1 className="display-hero mt-6 max-w-[18ch]"><TwoTone title={title} mutedClass="text-ink-foreground/55" /></h1>
              <p className="lead animate-rise mt-6 max-w-[50ch] text-ink-foreground/80" style={{ animationDelay: "250ms" }}>{subtitle}</p>
              <div className="animate-rise mt-8 flex flex-wrap gap-2.5" style={{ animationDelay: "350ms" }}>{actions}</div>
              <div className="mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-ink-foreground/15 pt-5">
                <HeroTrust />
              </div>
            </div>
            {aside && <div className="text-foreground lg:col-span-5">{aside}</div>}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="heat-glow">
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-6 sm:pb-14 sm:pt-8">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-6 grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="eyebrow animate-rise">{eyebrow}</p>
            <h1 className="display-hero mt-5 max-w-[17ch]"><TwoTone title={title} mutedClass="text-muted-foreground" /></h1>
            <p className="lead animate-rise mt-5 max-w-[52ch] text-muted-foreground">{subtitle}</p>
            <div className="animate-rise mt-7 flex flex-wrap gap-3">{actions}</div>
            <div className="mt-7">
              <RatingBadge />
            </div>
            {photo && <figure className="img-reveal mt-6 max-w-xl overflow-hidden rounded-md"><img src={photo.src} alt={photo.alt} className="aspect-[2.4/1] w-full object-cover" /></figure>}
          </div>
          <div className="lg:col-span-5">{aside}</div>
        </div>
      </div>
    </section>
  );
}

/** Grote, rustige introductietekst direct onder de hero. */
export function IntroBand({ label = "In het kort", text }: { label?: string; text: string }) {
  return (
    <section className="bg-muted">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-16 sm:py-24 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-3"><p className="eyebrow lg:mt-2">{label}</p></div>
        <p className="reveal max-w-[60ch] text-[1.15rem] font-medium leading-[1.55] tracking-[-0.015em] sm:text-[1.45rem] lg:col-span-9">{text}</p>
      </div>
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="grid max-w-3xl gap-4 text-[15px] leading-relaxed text-muted-foreground">
      {children}
    </div>
  );
}

export function ChoiceCards({
  items,
}: {
  items: Array<{ title: string; text: string; cta: string; to?: string; hash?: string; tone?: "urgent" }>;
}) {
  return (
    <div className="grid gap-2 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.title} className="surface group flex flex-col border border-border p-6 transition-colors duration-300 hover:border-foreground/40">
          <h3 className="display-3 !text-xl">{item.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
          {item.cta === "Vraag een offerte" ? (
            <QuoteButton location="choice" className="cta-primary mt-5" />
          ) : item.to ? (
            <Link to={item.to} className="cta-primary mt-5">
              {item.cta}
            </Link>
          ) : (
            <a href={item.hash ?? "#aanvraag"} className="cta-primary mt-5">
              {item.cta}
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
