import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "../components/PageHero";
import {
  CallButton,
  CategoryRows,
  FactsStrip,
  Faq,
  FinalCta,
  HeroTrust,
  IntroStatement,
  QuoteBand,
  Reviews,
  Section,
  SectionHeading,
  Steps,
  Werkgebied,
  WhyUs,
  brands,
} from "../components/sections";
import { breadcrumbSchema, faqSchema, pageMeta } from "../lib/seo";
import { company } from "../lib/site";
import pipesImg from "@/assets/stock-dienst-vaillant.jpg";
import boilerImg from "@/assets/stock-hot-water.jpg";
import comfortImg from "@/assets/stock-sanitair-cat.jpg";
import { AmbientVideo } from "../components/AmbientVideo";
import heroVideo from "@/assets/videos/over-ons.mp4.asset.json";
import heroPoster from "@/assets/videos/over-ons-poster.jpg";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Over Clima Heat", path: "/over-ons" },
];

const faq = [
  {
    q: "Waar is Clima Heat Solutions actief?",
    a: `Clima Heat Solutions is een onderneming uit ${company.city}, actief in ${company.region} en heel Vlaanderen. Ons ondernemingsnummer is ${company.vat}.`,
  },
  {
    q: "In welke regio werken jullie?",
    a: "We werken in Antwerpen en heel Vlaanderen. Vermeld bij uw aanvraag uw postcode; dan bevestigen we meteen of en wanneer we langs kunnen komen.",
  },
  {
    q: "Voor welke werken kan ik bij Clima Heat terecht?",
    a: "Voor verwarming (verwarmingsketels plaatsen, vervangen, onderhouden en herstellen, radiatoren en warmwatertoestellen), voor sanitaire kranen in keuken en badkamer en voor het plaatsen en aanpassen van gasleidingen.",
  },
  {
    q: "Met welke merken werken jullie?",
    a: `We werken met verschillende verwarmingsmerken, waaronder ${brands.join(", ")}. Heeft u een ander merk, vermeld dan merk en type bij uw aanvraag.`,
  },
  {
    q: "Krijg ik een attest na het onderhoud van mijn ketel?",
    a: "Ja. Na het uitgevoerde onderhoud van uw verwarmingsketel ontvangt u het officiële onderhoudsattest.",
  },
  {
    q: "Is een offerteaanvraag vrijblijvend?",
    a: "Ja. U vertelt ons wat u nodig heeft, wij bekijken de situatie en lichten het voorstel toe. Pas als u akkoord gaat, plannen we de werken in.",
  },
] as const;

export const Route = createFileRoute("/over-ons")({
  head: () => ({
    ...pageMeta({
      title: "Over Clima Heat Solutions | Verwarming, sanitair & gas Antwerpen",
      description:
        "Clima Heat Solutions uit Antwerpen staat voor verwarming, sanitair en gas: correct uitgevoerd werk, duidelijke communicatie en service voor, tijdens en na de uitvoering.",
      path: "/over-ons",
    }),
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema(crumbs)) },
      { type: "application/ld+json", children: JSON.stringify(faqSchema(faq)) },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      {/* HERO */}
      <section className="under-header relative isolate flex min-h-[92svh] flex-col overflow-hidden bg-ink text-ink-foreground">
        <AmbientVideo eager src={heroVideo.url} poster={heroPoster} className="ken-burns absolute inset-0 -z-20 size-full object-cover" />
        <span className="sr-only">Gereedschap van een installateur</span>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/60 to-ink/15" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-ink/85 to-transparent" aria-hidden="true" />
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pb-8 pt-[calc(var(--header-space)+2rem)]">
          <Breadcrumbs light items={crumbs} />
          <p className="eyebrow animate-rise mt-12 text-ink-foreground/85">Over Clima Heat</p>
          <h1 className="display-1 mt-6 max-w-[15ch] !text-[clamp(2.9rem,1.6rem+5.2vw,6.25rem)] !leading-[0.95]">
            <span className="line-mask"><span>Clima Heat Solutions.</span></span>
            <span className="line-mask"><span style={{ animationDelay: "120ms" }} className="text-ink-foreground/55">Techniek waarop u kunt vertrouwen.</span></span>
          </h1>
          <p className="lead animate-rise mt-7 max-w-[50ch] text-ink-foreground/80" style={{ animationDelay: "250ms" }}>
            Een onderneming uit Antwerpen voor verwarming, sanitair en gas. Correct uitgevoerd werk,
            duidelijke communicatie en oplossingen die passen bij uw woning.
          </p>
          <div className="animate-rise mt-8 flex flex-wrap gap-2.5" style={{ animationDelay: "350ms" }}>
            <Link to="/offerte" className="cta-primary cta-lg arrow-nudge">Vraag een offerte <span aria-hidden="true">→</span></Link>
            <Link to="/realisaties" className="cta-ghost-light cta-lg">Bekijk realisaties</Link>
          </div>
          <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-14">
            <HeroTrust />
          </div>
        </div>
      </section>

      <IntroStatement
        eyebrow="Wie we zijn"
        text={<>Clima Heat Solutions helpt klanten in {company.serviceArea} met verwarmingsketels, onderhoud en herstellingen, radiatoren, warmwatertoestellen, sanitaire kranen, close-in boilers, waterverzachters en gasleidingen.</>}
      />

      {/* KERNCIJFERS + WAARDEN */}
      <Section>
        <FactsStrip />
        <div className="mt-20 sm:mt-28">
          <SectionHeading
            eyebrow="Onze waarden"
            title="Waar we voor staan."
            intro={
              <>
                Waar we voor staan is eenvoudig: correct uitgevoerd werk, duidelijke communicatie en kwalitatieve
                oplossingen. We bekijken niet alleen het toestel, maar ook de aansluitingen, de leidingen en wat
                technisch zinvol is in uw woning, voor verschillende verwarmingsmerken.
                <span className="mt-3 block">
                  Bij onderhoud voeren we de nodige controles uit en leveren we het officiële attest af. Bij een
                  defect zoeken we eerst de oorzaak; niet iedere storing vraagt om een nieuw toestel. We leggen onze
                  bevindingen uit en bespreken de mogelijkheden voordat u een keuze maakt.
                </span>
              </>
            }
          />
        </div>
        <div className="mt-14 grid gap-2 md:auto-rows-[17rem] md:grid-cols-12">
          <figure className="img-reveal group relative overflow-hidden rounded-md md:col-span-7 md:row-span-2">
            <img src={pipesImg} alt="Wandketel met strak koperen leidingwerk" loading="lazy" width={1200} height={912} className="aspect-[4/3] size-full object-cover transition-[scale] duration-[1400ms] group-hover:scale-[1.05] md:aspect-auto" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" aria-hidden="true" />
            <figcaption className="absolute inset-x-6 bottom-6 text-ink-foreground">
              <p className="text-xl font-medium tracking-[-0.02em]">Strak leidingwerk</p>
              <p className="mt-1 max-w-[40ch] text-sm text-ink-foreground/80">Een verzorgde aansluiting is veiliger, makkelijker te onderhouden en mooier om te zien.</p>
            </figcaption>
          </figure>
          <div className="flex flex-col justify-between rounded-md bg-muted p-6 md:col-span-5">
            <p className="text-sm text-muted-foreground">Voor, tijdens en na</p>
            <p className="text-[clamp(1.4rem,1.1rem+1vw,2rem)] font-medium leading-[1.15] tracking-[-0.03em]">Een helder voorstel vooraf, zorgvuldig werk en uitleg bij de oplevering.</p>
          </div>
          <figure className="img-reveal group relative overflow-hidden rounded-md md:col-span-5">
            <img src={boilerImg} alt="Aansluitingen van een warmwatertoestel" loading="lazy" width={1200} height={900} className="aspect-[4/3] size-full object-cover transition-[scale] duration-[1400ms] group-hover:scale-[1.05] md:aspect-auto" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" aria-hidden="true" />
            <figcaption className="absolute inset-x-6 bottom-5 text-lg font-medium text-ink-foreground">Ook na de plaatsing bereikbaar</figcaption>
          </figure>
        </div>
      </Section>

      {/* WAT WE DOEN */}
      <Section tone="ink">
        <SectionHeading
          light
          eyebrow="Wat we doen"
          title="Drie vakgebieden. Eén aanspreekpunt."
          intro="Verwarming, sanitair en gas raken elkaar vaak: een nieuwe ketel vraagt soms een aangepaste gasleiding, een nieuw warmwatertoestel een andere aansluiting. Omdat we de drie vakgebieden samen opvolgen, sluiten de werken op elkaar aan en heeft u één partij die het geheel bekijkt."
        >
          <Link to="/diensten" className="cta-ghost-light arrow-nudge">Alle diensten <span aria-hidden="true">→</span></Link>
        </SectionHeading>
        <div className="mt-14">
          <CategoryRows light />
        </div>
      </Section>

      <Section>
        <WhyUs />
      </Section>

      <QuoteBand image={comfortImg} alt="Rustige badkamer met moderne kraan in warm licht" quote="Comfort in huis begint bij een installatie die klopt." />

      <Section tone="muted">
        <Steps />
      </Section>

      <Section>
        <Reviews />
        <div className="mt-10 flex flex-wrap gap-2.5">
          <Link to="/contact" className="cta-primary arrow-nudge">Contacteer ons <span aria-hidden="true">→</span></Link>
          <CallButton location="over_ons_reviews" className="cta-secondary" />
        </div>
      </Section>

      <Section tone="muted">
        <Werkgebied />
      </Section>

      <Section>
        <Faq items={faq} title="Vragen over Clima Heat" />
        <p className="mt-12 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
          Bekijk ook onze <Link to="/realisaties" className="font-medium text-accent-deep underline underline-offset-4">realisaties</Link>,{" "}
          <Link to="/merken" className="font-medium text-accent-deep underline underline-offset-4">de merken waarmee we werken</Link> of{" "}
          <Link to="/diensten" className="font-medium text-accent-deep underline underline-offset-4">al onze diensten</Link>. {company.name} ·{" "}
          {company.region} · ondernemingsnummer {company.vat}
        </p>
      </Section>

      <FinalCta />
    </>
  );
}
