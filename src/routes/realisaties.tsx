import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import ctaImage from "@/assets/installatie.jpg";
import { Breadcrumbs } from "../components/PageHero";
import { AmbientVideo } from "../components/AmbientVideo";
import heroVideo from "@/assets/videos/realisaties.mp4.asset.json";
import heroPoster from "@/assets/videos/realisaties-poster.jpg";
import { CallButton, CategoryRows, Faq, HeroTrust, MailButton, Reviews, Section, SectionHeading } from "../components/sections";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../components/ui/dialog";
import { breadcrumbSchema, faqSchema, pageMeta } from "../lib/seo";
import { projects } from "../lib/site";
import { track } from "../lib/tracking";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Realisaties", path: "/realisaties" },
];

const faq = [
  {
    q: "Zijn dit echte projecten van Clima Heat?",
    a: "Ja. De projectfoto's op deze pagina zijn eigen werkfoto's van opdrachten van Clima Heat, met een korte uitleg over het uitgevoerde werk.",
  },
  {
    q: "Kan ik een gelijkaardige installatie laten plaatsen?",
    a: "Elke woning is anders. We bekijken eerst uw huidige installatie, de leidingen, de rookgasafvoer en de plaats van het toestel, en stellen daarna een oplossing voor die bij uw situatie past.",
  },
  {
    q: "Waarom staan er geen prijzen of gemeenten bij de projecten?",
    a: "De prijs van een opdracht hangt af van de situatie ter plaatse en is dus niet zomaar vergelijkbaar. Gemeenten en extra details vermelden we alleen wanneer we die per project kunnen bevestigen.",
  },
  {
    q: "Mag ik foto's van mijn huidige installatie doorsturen?",
    a: "Graag. Een foto van uw toestel, het typeplaatje en de aansluitingen helpt ons om uw aanvraag voor te bereiden. U kunt ze meesturen per mail.",
  },
] as const;

export const Route = createFileRoute("/realisaties")({
  head: () => ({
    ...pageMeta({
      title: "Realisaties: ons werk in beeld | Clima Heat Solutions",
      description:
        "Bekijk realisaties van Clima Heat: nieuwe verwarmingsketels, radiatoren, onderhoud, herstellingen en sanitair bij klanten in Antwerpen en omgeving.",
      path: "/realisaties",
    }),
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema(crumbs)) },
      { type: "application/ld+json", children: JSON.stringify(faqSchema(faq)) },
    ],
  }),
  component: Page,
});

type Filter = "Alles" | "Verwarming" | "Sanitair";
const vakgebied = (type: string): Filter => (type === "Sanitair" ? "Sanitair" : "Verwarming");

const withImage = projects.filter((p) => Boolean(p.image));
const featured = withImage.find((p) => p.type === "Onderhoud");
const gallery = withImage.filter((p) => p !== featured);
const filters: Filter[] = (["Alles", "Verwarming", "Sanitair"] as const).filter((f) => f === "Alles" || gallery.some((p) => vakgebied(p.type) === f));
/** Afwisselende, asymmetrische breedtes in het raster. */
const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];

const checks = [
  ["Bestaande situatie", "We kijken eerst wat er al staat: het toestel, de leidingen, de rookgasafvoer en de plaats waar alles hangt."],
  ["Strak leidingwerk", "Leidingen lopen logisch en recht, zodat de installatie overzichtelijk blijft en later makkelijk te onderhouden is."],
  ["Correcte aansluitingen", "Water, gas en afvoer worden zorgvuldig aangesloten en nagekeken, volgens de geldende regels."],
  ["Controle en test", "Voor de oplevering testen we de werking en controleren we het resultaat."],
  ["Uitleg en opgeruimd", "U krijgt uitleg over de installatie en waar u op kunt letten. De ruimte blijft opgeruimd achter."],
] as const;

function Page() {
  const [filter, setFilter] = useState<Filter>("Alles");
  const [open, setOpen] = useState<(typeof gallery)[number] | null>(null);
  const visible = filter === "Alles" ? gallery : gallery.filter((g) => vakgebied(g.type) === filter);

  return (
    <>
      {/* HERO */}
      <section className="under-header relative isolate flex min-h-[86svh] flex-col overflow-hidden bg-ink text-ink-foreground">
        <AmbientVideo eager src={heroVideo.url} poster={heroPoster} className="ken-burns absolute inset-0 -z-20 size-full object-cover" />
        <span className="sr-only">Een leiding wordt op maat gezaagd</span>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/60 to-ink/15" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-ink/85 to-transparent" aria-hidden="true" />
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pb-8 pt-[calc(var(--header-space)+2rem)]">
          <Breadcrumbs light items={crumbs} />
          <p className="eyebrow animate-rise mt-12 text-ink-foreground/85">Realisaties</p>
          <h1 className="display-1 mt-6 max-w-[15ch] !text-[clamp(2.9rem,1.6rem+5.2vw,6.25rem)] !leading-[0.95]">
            <span className="line-mask"><span>Onze realisaties.</span></span>
            <span className="line-mask"><span style={{ animationDelay: "120ms" }} className="text-ink-foreground/55">Realisaties in Antwerpen.</span></span>
          </h1>
          <p className="lead animate-rise mt-7 max-w-[48ch] text-ink-foreground/80" style={{ animationDelay: "250ms" }}>
            Van nieuwe verwarmingsketels tot onderhoud, herstellingen en sanitair. Echte opdrachten van Clima Heat, netjes uitgevoerd en correct afgewerkt.
          </p>
          <div className="animate-rise mt-8 flex flex-wrap gap-2.5" style={{ animationDelay: "350ms" }}>
            <Link to="/offerte" onClick={() => track("quote_cta_click", { location: "realisaties_hero" })} className="cta-primary cta-lg arrow-nudge">
              Vraag een offerte <span aria-hidden="true">→</span>
            </Link>
            <a href="#projecten" className="cta-ghost-light cta-lg">Bekijk de projecten</a>
          </div>
          <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-14">
            <HeroTrust />
          </div>
        </div>
      </section>

      {/* INTRO */}
      <Section>
        <SectionHeading
          eyebrow="Onze werkwijze"
          title="Netjes. Correct. Afgewerkt."
          intro={
            <>
              Verwarming is technisch, maar het eindresultaat moet vooral betrouwbaar, netjes en correct
              afgewerkt zijn. Op deze pagina tonen we installaties, onderhoudswerken, herstellingen en
              sanitaire werken uitgevoerd door Clima Heat.
              <span className="mt-3 block">
                Elke opdracht start met kijken wat er al staat: de bestaande installatie, de leidingen, de
                rookgasafvoer en de plaats van het toestel. Pas daarna volgt een voorstel. U heeft één vast
                aanspreekpunt bij Clima Heat, van het eerste voorstel tot de oplevering.
              </span>
            </>
          }
        />
        <dl className="mt-14 grid grid-cols-3 border-t border-border">
          {[
            [String(withImage.length), "projecten in beeld"],
            ["Echt", "eigen werkfoto's, geen stock"],
            ["1", "aanspreekpunt per project"],
          ].map(([v, l], i) => (
            <div key={l} className={`reveal py-7 ${i > 0 ? "border-l border-border pl-4 sm:pl-8" : ""}`}>
              <dt className="sr-only">{l}</dt>
              <dd>
                <span className="block text-[clamp(2.25rem,1.6rem+2.6vw,4.25rem)] font-medium leading-none tracking-[-0.055em]">{v}</span>
                <span className="mt-3 block text-sm text-muted-foreground">{l}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* GALERIJ */}
      <Section id="projecten" tone="muted">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Projecten</p>
            <h2 className="display-2 reveal mt-5">Recente realisaties.</h2>
            <p className="mt-4 max-w-[54ch] text-[15px] leading-relaxed text-muted-foreground">
              Klik op een project voor een groter beeld en een korte uitleg. We tonen alleen echte opdrachten;
              nieuwe projecten en foto's voegen we regelmatig toe.
            </p>
          </div>
          <div className="flex gap-1 rounded-md bg-background p-1" role="tablist" aria-label="Filter realisaties">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${filter === f ? "bg-ink text-ink-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-2 md:auto-rows-[24rem] md:grid-cols-12">
          {visible.map((project, i) => (
            <button
              key={project.title}
              type="button"
              onClick={() => setOpen(project)}
              aria-label={`Bekijk groter: ${project.title}`}
              className={`img-reveal group relative overflow-hidden rounded-md bg-ink text-left text-ink-foreground ${visible.length === 1 ? "md:col-span-12" : spans[i % spans.length]}`}
            >
              <img
                src={project.image}
                alt={project.alt ?? `${project.title} door Clima Heat Solutions`}
                loading="lazy"
                width={1200}
                height={900}
                className="aspect-[4/5] size-full object-cover transition-[scale] duration-[1400ms] ease-out group-hover:scale-[1.05] sm:aspect-[4/3] md:aspect-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-transparent" aria-hidden="true" />
              <span className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-md bg-background/85 text-lg text-foreground opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true">+</span>
              <div className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7">
                <p className="text-xs text-ink-foreground/75">0{i + 1} · {[project.type, project.merk, project.gemeente].filter(Boolean).join(" · ")}</p>
                <h3 className="mt-2 text-xl font-medium leading-snug tracking-[-0.02em] sm:text-2xl">{project.title}</h3>
                <p className="mt-2 max-w-[48ch] text-sm leading-relaxed text-ink-foreground/80 md:max-h-0 md:overflow-hidden md:opacity-0 md:transition-all md:duration-500 md:group-hover:max-h-28 md:group-hover:opacity-100">
                  {project.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </Section>

      <Dialog open={open !== null} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-5xl gap-0 overflow-hidden border-0 bg-ink p-0 text-ink-foreground sm:rounded-md [&>button]:text-ink-foreground">
          {open && (
            <div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
              <img src={open.image} alt={open.alt ?? `${open.title} door Clima Heat Solutions`} width={1200} height={900} className="max-h-[70vh] w-full object-cover lg:max-h-[80vh]" />
              <div className="flex flex-col p-6 sm:p-8">
                <p className="text-xs text-ink-foreground/65">{[open.type, open.merk, open.gemeente].filter(Boolean).join(" · ")}</p>
                <DialogTitle className="mt-3 text-2xl font-medium leading-snug tracking-[-0.02em]">{open.title}</DialogTitle>
                <DialogDescription className="mt-3 text-[15px] leading-relaxed text-ink-foreground/75">{open.description}</DialogDescription>
                <div className="mt-auto flex flex-wrap gap-2 pt-8">
                  <Link to="/offerte" onClick={() => track("quote_cta_click", { location: "realisaties_lightbox" })} className="cta-primary arrow-nudge">
                    Vraag een offerte <span aria-hidden="true">→</span>
                  </Link>
                  <CallButton location="realisaties_lightbox" className="cta-ghost-light" />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* UITGELICHT */}
      {featured && (
        <Section>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <figure className="img-reveal group overflow-hidden rounded-md lg:col-span-7">
              <img src={featured.image} alt={featured.alt ?? `${featured.title} door Clima Heat Solutions`} loading="lazy" width={1200} height={900} className="aspect-[4/3] w-full object-cover transition-[scale] duration-[1400ms] group-hover:scale-[1.04]" />
            </figure>
            <div className="lg:col-span-5">
              <p className="eyebrow">Uitgelichte realisatie</p>
              <h2 className="display-2 reveal mt-5 max-w-[14ch]">{featured.title}.</h2>
              <p className="mt-3 text-sm text-muted-foreground">{[featured.merk, "Onderhoud verwarmingsketel"].filter(Boolean).join(" · ")}</p>
              <dl className="mt-8 border-t border-border text-[15px]">
                {[
                  ["Situatie", "Een Vaillant ketel die toe was aan zijn periodieke onderhoudsbeurt."],
                  ["Oplossing", "Een volledige onderhoudsbeurt in plaats van een snelle visuele controle."],
                  ["Uitgevoerd", "Ketel geopend, brander en warmtewisselaar gereinigd en gecontroleerd."],
                  ["Resultaat", "Een nagekeken toestel en een onderhoudsattest voor de klant."],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-border py-4">
                    <dt className="font-medium">{k}</dt>
                    <dd className="leading-relaxed text-muted-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
              <Link to="/onderhoud" className="cta-secondary arrow-nudge mt-8">Meer over onderhoud <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </Section>
      )}

      {/* WAAR WE OP LETTEN */}
      <Section tone="ink">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow text-ink-foreground/80">Bij elke opdracht</p>
              <h2 className="display-2 reveal mt-5 max-w-[13ch]">Waar we op letten.</h2>
              <p className="mt-6 max-w-[46ch] leading-relaxed text-ink-foreground/75">
                Een realisatie is meer dan een nieuw toestel aan de muur. Deze punten komen bij elk werk terug,
                van een onderhoud tot een volledige plaatsing. Wat we afspreken, is ook wat er gebeurt; extra
                werk bespreken we altijd eerst met u.
              </p>
              <Link to="/contact" className="cta-primary arrow-nudge mt-8">Bespreek uw project <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <ol className="border-t border-ink-foreground/20 lg:col-span-7">
            {checks.map(([title, text], i) => (
              <li key={title} className="reveal group grid grid-cols-[4.5rem_1fr] gap-4 border-b border-ink-foreground/20 py-8 sm:grid-cols-[7rem_1fr] sm:py-10">
                <span className="text-[2.75rem] font-medium leading-none tracking-[-0.05em] text-ember transition-transform duration-500 group-hover:-translate-y-1 sm:text-[4rem]">0{i + 1}</span>
                <div className="sm:pt-2">
                  <h3 className="display-3">{title}</h3>
                  <p className="mt-2 max-w-[48ch] text-[15px] leading-relaxed text-ink-foreground/70">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* PER VAKGEBIED */}
      <Section>
        <SectionHeading
          eyebrow="Ook bij u"
          title="Welk werk mogen we voor u doen?"
          intro="Verwarming, sanitair of gas: kies het vakgebied dat bij uw vraag past en lees hoe we te werk gaan. Op elke pagina kunt u meteen een offerte vragen."
        />
        <div className="mt-14">
          <CategoryRows />
        </div>
      </Section>

      <Section tone="muted">
        <Reviews />
      </Section>

      <Section>
        <Faq items={faq} title="Vragen over onze realisaties" />
      </Section>

      {/* AFSLUITENDE CTA */}
      <Section id="offerte" tone="muted">
        <div className="grid overflow-hidden rounded-md bg-ink text-ink-foreground lg:grid-cols-2">
          <figure className="relative">
            <img src={ctaImage} alt="Verzorgde verwarmingsinstallatie met koperen leidingen" loading="lazy" width={1280} height={960} className="h-full min-h-[18rem] w-full object-cover" />
          </figure>
          <div className="p-8 sm:p-12">
            <p className="eyebrow text-ink-foreground/80">Uw project</p>
            <h2 className="display-2 mt-5 max-w-[14ch]">Ook uw installatie vernieuwen?</h2>
            <p className="mt-5 max-w-[44ch] leading-relaxed text-ink-foreground/75">
              Vertel ons kort wat u nodig heeft. U krijgt persoonlijk advies over de mogelijkheden voor uw woning.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              <Link to="/offerte" onClick={() => track("quote_cta_click", { location: "realisaties_final" })} className="cta-primary cta-lg arrow-nudge">
                Vraag een offerte <span aria-hidden="true">→</span>
              </Link>
              <CallButton location="realisaties_final" className="cta-ghost-light cta-lg" />
            </div>
            <p className="mt-5 text-sm text-ink-foreground/70">
              Liever een bericht? <MailButton location="realisaties_final" className="font-medium text-ink-foreground underline underline-offset-4" />
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
