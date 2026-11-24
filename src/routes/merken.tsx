import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import heroImg from "@/assets/hero-ketel.jpg";
import panelImg from "@/assets/stock-hero-comfort.jpg";
import { IntroBand, PageHero } from "../components/PageHero";
import { CallButton, CtaStrip, Faq, FinalCta, Section, SectionHeading, brands } from "../components/sections";
import { breadcrumbSchema, faqSchema, pageMeta } from "../lib/seo";
import { company } from "../lib/site";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Onze merken", path: "/merken" },
];

const faq = [
  {
    q: "Met welke merken van verwarmingsketels werken jullie?",
    a: `We plaatsen, onderhouden en herstellen ketels van onder meer ${brands.join(", ")}. Heeft u een ander merk, vermeld dan het merk en type bij uw aanvraag; dan laten we u weten of we u kunnen helpen.`,
  },
  {
    q: "Kunnen jullie een ketel onderhouden die door een andere installateur werd geplaatst?",
    a: "Dat kan. Voor een onderhoud of herstelling maakt het niet uit wie het toestel oorspronkelijk plaatste. Geef het merk, het type en indien mogelijk de datum van het laatste onderhoud door, zodat we het bezoek goed kunnen voorbereiden.",
  },
  {
    q: "Welk merk verwarmingsketel is het beste voor mijn woning?",
    a: "Er is geen merk dat voor elke woning het beste is. De juiste keuze hangt af van uw warmte- en warmwaterbehoefte, de plaats van het toestel, de rookgasafvoer en de bestaande leidingen. We bekijken eerst uw situatie en leggen daarna uit waarom we een bepaald toestel voorstellen.",
  },
  {
    q: "Mijn merk staat niet in de lijst. Kan ik toch contact opnemen?",
    a: `Zeker. De lijst toont de merken die we het vaakst tegenkomen. Bel ons op ${company.phone} of mail ons het merk, het type en een foto van het typeplaatje; dan krijgt u snel duidelijkheid.`,
  },
  {
    q: "Wat geef ik best door bij een storing?",
    a: "Het merk en type van uw ketel, de foutcode op het display, de waterdruk en sinds wanneer het probleem zich voordoet. Met die informatie kunnen we vaak al inschatten welk nazicht nodig is.",
  },
] as const;

export const Route = createFileRoute("/merken")({
  head: () => ({
    ...pageMeta({
      title: "Onze merken: Vaillant, Viessmann, Bulex, Bosch & meer | Clima Heat",
      description:
        "Clima Heat plaatst, onderhoudt en herstelt verwarmingsketels van Vaillant, Viessmann, Bulex, Bosch, Junkers, Buderus en Remeha in Antwerpen en Vlaanderen.",
      path: "/merken",
    }),
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema(crumbs)) },
      { type: "application/ld+json", children: JSON.stringify(faqSchema(faq)) },
    ],
  }),
  component: Page,
});

const services = [
  { title: "Plaatsing en vervanging", text: "Een nieuwe ketel die past bij uw woning, uw warmwatergebruik en uw bestaande aansluitingen. We leggen uit waarom we een toestel voorstellen.", to: "/verwarmingsketels" },
  { title: "Onderhoud met attest", text: "Reiniging en controle van uw ketel, met het officiële onderhoudsattest na het uitgevoerde onderhoud.", to: "/onderhoud" },
  { title: "Herstelling en storingen", text: "We zoeken eerst de oorzaak van de storing. Niet elk defect vraagt om een nieuw toestel.", to: "/herstellingen" },
  { title: "Advies bij uw keuze", text: "Twijfelt u tussen herstellen en vervangen, of tussen twee toestellen? We vergelijken de mogelijkheden in gewone taal.", to: "/contact" },
] as const;

const typeplaatje = [
  ["Merk en type", "Meestal op een sticker of plaatje aan de onderkant of binnenin het toestel. Noteer ook het bouwjaar als dat vermeld staat."],
  ["Foutcode en waterdruk", "Bij een storing: de code op het display en de druk op de manometer. Zo kunnen we gerichter voorbereiden."],
  ["Een foto", "Een foto van het typeplaatje en van de aansluitingen onder de ketel zegt vaak meer dan een lange beschrijving."],
] as const;

type BrandLink = { label: string; to: string };
const brandLinks = (brand: string): BrandLink[] =>
  brand === "Vaillant"
    ? [
        { label: "Vaillant onderhoud", to: "/vaillant/onderhoud" },
        { label: "Vaillant herstelling", to: "/vaillant/herstelling" },
        { label: "Ketel vervangen", to: "/verwarmingsketels/gasketel-vervangen" },
        { label: "Meer over Vaillant", to: "/vaillant" },
      ]
    : [
        { label: "Onderhoud", to: "/onderhoud" },
        { label: "Herstelling", to: "/herstellingen" },
        { label: "Ketel vervangen", to: "/verwarmingsketels/gasketel-vervangen" },
        { label: "Nieuwe ketel", to: "/verwarmingsketels/nieuwe-verwarmingsketel" },
      ];

const brandText = (brand: string) =>
  brand === "Vaillant"
    ? "Heeft u een Vaillant-ketel? We kunnen hem onderhouden, een storing nakijken of samen met u bekijken of herstellen of vervangen het meest zinvol is."
    : `Heeft u een ${brand}-ketel? We kunnen hem onderhouden, een storing nakijken of samen met u bekijken of herstellen of vervangen het meest zinvol is.`;

function BrandPanel({ name }: { name: string }) {
  return (
    <div key={name} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <p className="text-[15px] leading-relaxed text-muted-foreground">{brandText(name)}</p>
      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
        {brandLinks(name).map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="link-line text-sm font-medium">{l.label}</Link>
          </li>
        ))}
      </ul>
      <a href="#offerte" className="cta-primary arrow-nudge mt-6">Offerte voor uw {name} <span aria-hidden="true">→</span></a>
    </div>
  );
}

/** Interactieve merkenkiezer: links grote merknamen, rechts wat we voor dat merk doen. */
function BrandExplorer() {
  const [active, setActive] = useState(0);
  const brand = brands[active]!;
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
      <div className="border-t border-border">
        {brands.map((name, i) => {
          const open = i === active;
          const id = `merk-${name.toLowerCase()}`;
          return (
            <div key={name} className="border-b border-border">
              <button
                type="button"
                id={`${id}-knop`}
                aria-expanded={open}
                aria-controls={id}
                onClick={() => setActive(i)}
                className="group flex w-full items-baseline gap-5 py-4 text-left sm:py-5"
              >
                <span className={`text-sm tabular-nums transition-colors ${open ? "text-accent" : "text-muted-foreground"}`}>0{i + 1}</span>
                <span className={`text-[clamp(1.9rem,1.4rem+2vw,3.25rem)] font-medium leading-none tracking-[-0.045em] transition-colors duration-300 ${open ? "text-foreground" : "text-foreground/30 group-hover:text-foreground/60"}`}>
                  {name}
                </span>
                <span className={`ml-auto self-center text-xl transition-all duration-300 ${open ? "text-accent opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"}`} aria-hidden="true">→</span>
              </button>
              <div id={id} role="region" aria-labelledby={`${id}-knop`} hidden={!open} className="pb-7 lg:hidden">
                <BrandPanel name={name} />
              </div>
            </div>
          );
        })}
        <div className="flex items-baseline gap-5 py-5">
          <span className="text-sm text-muted-foreground">+</span>
          <Link to="/offerte" className="link-line text-lg font-medium">Ander merk? Vraag het na →</Link>
        </div>
      </div>
      <div className="relative hidden min-h-[36rem] overflow-hidden rounded-md bg-ink lg:block">
        <img src={panelImg} alt="Woonkamer met radiator en een wandketel in de berging" loading="lazy" width={1600} height={1200} className="ken-burns absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-6 bottom-6 max-w-md rounded-md bg-background/90 p-6 backdrop-blur-md">
          <p className="text-sm text-muted-foreground">0{active + 1} · Uw {brand}-ketel</p>
          <div className="mt-3">
            <BrandPanel key={brand} name={brand} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Onze merken · Verwarmingsketels"
        title="Verwarmingsketels van alle gangbare merken in Antwerpen"
        subtitle="Vaillant, Viessmann, Bulex, Bosch, Junkers, Buderus of Remeha: we plaatsen, onderhouden en herstellen uw ketel, ongeacht wie hem oorspronkelijk installeerde."
        primary={{ label: "Vraag een offerte", hash: "#offerte" }}
        breadcrumbs={crumbs}
        backdrop={{ src: heroImg, alt: "Moderne wandketel in een lichte woning" }}
      />

      <IntroBand text="Elk merk heeft zijn eigen toestellen, onderdelen en foutcodes. Door met verschillende merken te werken, kunnen we bij een onderhoud gerichter controleren, bij een storing sneller de oorzaak vinden en bij een vervanging eerlijk vergelijken welk toestel bij uw woning past." />

      {/* MERKENKIEZER */}
      <Section>
        <SectionHeading
          eyebrow="Kies uw merk"
          title="Welk toestel hangt er bij u?"
          intro="Dit zijn de merken die we het vaakst tegenkomen in woningen in Antwerpen en Vlaanderen. Kies uw merk en zie meteen waarvoor u bij ons terecht kunt. Staat uw toestel er niet bij? Vraag het gerust na."
        />
        <div className="mt-14">
          <BrandExplorer />
        </div>
        <p className="mt-6 text-xs text-muted-foreground">Merknamen ter informatie, zonder logo's. Clima Heat claimt geen officieel partnerschap met deze merken.</p>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Wat we doen"
          title="Eén aanpak, voor elk merk."
          intro="Of u nu een Vaillant, een Viessmann of een Bulex heeft: de werkwijze blijft dezelfde. We bekijken eerst uw toestel en uw installatie, en u weet vooraf wat we komen doen."
        />
        <ol className="mt-12 border-t border-border">
          {services.map((s, i) => (
            <li key={s.title} className="reveal group border-b border-border">
              <Link to={s.to} className="grid gap-3 py-8 sm:grid-cols-[5rem_minmax(0,1fr)_minmax(0,1.2fr)_2rem] sm:items-baseline sm:gap-8">
                <span className="text-[2.5rem] font-medium leading-none tracking-[-0.05em] text-accent">0{i + 1}</span>
                <h3 className="display-3 transition-colors group-hover:text-accent-deep">{s.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{s.text}</p>
                <span className="hidden text-xl text-accent transition-transform duration-300 group-hover:translate-x-1 sm:block" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      {/* TYPEPLAATJE */}
      <Section>
        <SectionHeading
          eyebrow="Goed voorbereid"
          title="Merk en type bij de hand."
          intro="Vermeld deze gegevens bij uw aanvraag, samen met uw postcode en wat u merkt. Zo kunnen we het bezoek gericht voorbereiden en weet u sneller waar u aan toe bent."
        />
        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {typeplaatje.map(([title, text], i) => (
            <li key={title} className="reveal border-t border-foreground/80 pt-5">
              <span className="text-[3rem] font-medium leading-none tracking-[-0.05em] text-accent">0{i + 1}</span>
              <h3 className="mt-8 text-xl font-medium leading-snug">{title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* HERSTELLEN OF VERVANGEN */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Eerlijk advies"
          title="Herstellen of vervangen?"
          intro="Die vraag krijgen we vaak, ongeacht het merk. Er is geen standaardantwoord: we bekijken het toestel, de staat van de installatie en uw verbruik, en leggen de mogelijkheden naast elkaar."
        />
        <div className="mt-14 grid gap-2 md:grid-cols-2">
          {[
            {
              title: "Herstellen is vaak zinvol als",
              items: ["het toestel verder goed werkt en regelmatig onderhouden werd", "de oorzaak duidelijk is en het onderdeel nog beschikbaar is", "de storing een eenmalig probleem is"],
              to: "/herstellingen",
              cta: "Meer over herstellingen",
            },
            {
              title: "Vervangen kan zinvol zijn als",
              items: ["storingen steeds terugkomen", "onderdelen moeilijk verkrijgbaar worden", "uw warmte- of warmwaterbehoefte veranderd is"],
              to: "/verwarmingsketels/gasketel-vervangen",
              cta: "Meer over vervangen",
            },
          ].map((col) => (
            <div key={col.title} className="reveal rounded-md bg-background p-6 sm:p-8">
              <h3 className="display-3">{col.title}</h3>
              <ul className="mt-6 border-t border-border">
                {col.items.map((item) => (
                  <li key={item} className="flex gap-3 border-b border-border py-4 text-[15px] leading-relaxed text-muted-foreground">
                    <span className="text-accent" aria-hidden="true">—</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to={col.to} className="arrow-nudge mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent-deep">
                {col.cta} <span aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-2.5">
          <CallButton location="merken_advies" className="cta-primary" />
          <a href="#offerte" className="cta-secondary">Vraag advies</a>
        </div>
      </Section>

      <CtaStrip location="merken_strip" title="Welk merk u ook heeft." text="Bel ons of vraag een offerte. We zeggen u eerlijk wat zinvol is voor uw toestel." primary={{ label: "Vraag een offerte", hash: "#offerte" }} />

      <Section>
        <Faq items={faq} title="Vragen over merken" />
      </Section>

      <FinalCta title="Offerte voor uw ketel?" />
    </>
  );
}
