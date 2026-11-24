import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/videos/home-hero-poster.jpg";
import heroVideo from "@/assets/videos/home-hero.mp4.asset.json";
import clipVerwarming from "@/assets/videos/home-verwarming.mp4.asset.json";
import posterVerwarming from "@/assets/videos/home-verwarming-poster.jpg";
import clipSanitair from "@/assets/videos/home-sanitair.mp4.asset.json";
import posterSanitair from "@/assets/videos/home-sanitair-poster.jpg";
import clipGas from "@/assets/videos/home-gas.mp4.asset.json";
import posterGas from "@/assets/videos/home-gas-poster.jpg";
import detailImg from "@/assets/stock-dienst-herstelling.jpg";
import { AmbientVideo } from "../components/AmbientVideo";
import { HomePrices } from "../components/Pricing";
import { AppointmentButton } from "../components/AppointmentButton";
import { LeadForm } from "../components/LeadForm";
import {
  BrandsBand,
  CallButton,
  HeroTrust,
  MailButton,
  Reviews,
  Section,
  SectionHeading,
  ServiceTabs,
  WhyUs,
} from "../components/sections";
import { company, projects } from "../lib/site";
import { pageMeta } from "../lib/seo";
import { track } from "../lib/tracking";

export const Route = createFileRoute("/")({
  head: () => ({
    ...pageMeta({
      title: "Verwarming, sanitair & gas in Antwerpen | Clima Heat Solutions",
      description:
        "Verwarmingsketel plaatsen, onderhoud, herstelling, radiatoren, warmwatertoestellen, sanitaire kranen en gasleidingen in Antwerpen en Vlaanderen. Vraag een offerte bij Clima Heat.",
      path: "/",
    }),
  }),
  component: Home,
});

const heroLines = ["Verwarming.", "Sanitair.", "Gas."];

function Home() {
  // Drie verschillende soorten werk, zodat geen enkel merk of type de preview domineert.
  const featured = ["Plaatsing", "Radiatoren", "Sanitair"]
    .map((type) => projects.find((p) => p.type === type && p.image && p.title !== "Nieuwe condensatieketel geplaatst"))
    .filter((p): p is (typeof projects)[number] => Boolean(p));
  return (
    <>
      {/* 1 — HERO */}
      <section className="under-header relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-ink-foreground">
        <AmbientVideo eager src={heroVideo.url} poster={heroImg} className="ken-burns absolute inset-0 -z-20 h-full w-full object-cover" />
        <span className="sr-only">Vakman neemt gereedschap en sluit leidingen en kranen aan</span>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/10" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-t from-ink/85 to-transparent" aria-hidden="true" />

        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pb-8 pt-[calc(var(--header-space)+3.5rem)] sm:pt-[calc(var(--header-space)+5rem)]">
          <h1 className="display-1 !text-[clamp(3.2rem,1.6rem+6.4vw,7.5rem)] !leading-[0.92]">
            {heroLines.map((line, i) => (
              <span key={line} className="line-mask">
                <span style={{ animationDelay: `${120 + i * 110}ms` }} className={i === 2 ? "text-ember" : ""}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p className="animate-rise mt-7 text-[clamp(1.35rem,1.1rem+1vw,2rem)] font-medium tracking-[-0.025em]" style={{ animationDelay: "480ms" }}>
            Comfort in huis, vakkundig geregeld.
          </p>
          <p className="animate-rise mt-4 max-w-[46ch] text-[15px] leading-relaxed text-ink-foreground/75" style={{ animationDelay: "560ms" }}>
            Van verwarmingsketels en onderhoud tot radiatoren, sanitair en gasleidingen. Clima Heat staat voor
            betrouwbare oplossingen in Antwerpen en omgeving.
          </p>
          <div className="animate-rise mt-8 flex flex-wrap gap-2.5" style={{ animationDelay: "640ms" }}>
            <AppointmentButton location="home_hero" />
            <Link to="/offerte" onClick={() => track("quote_cta_click", { location: "home_hero" })} className="cta-ghost-light cta-lg arrow-nudge">
              Vraag een offerte <span aria-hidden="true">→</span>
            </Link>

          </div>

          <div className="mt-auto flex flex-wrap items-end justify-between gap-6 pt-16">
            <HeroTrust />
            <a href="#diensten" className="group hidden items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-ink-foreground/65 hover:text-ink-foreground sm:flex md:mr-40">
              Ontdek onze diensten
              <span className="relative block h-9 w-px overflow-hidden bg-ink-foreground/25" aria-hidden="true">
                <span className="scroll-cue absolute inset-x-0 top-0 h-3 bg-ember" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* 2 — DIENSTEN */}
      <Section id="diensten">
        <SectionHeading
          eyebrow="Onze diensten"
          title="Expertise die het verschil maakt."
          intro="Drie vakgebieden, één aanspreekpunt. Kies verwarming, sanitair of gas en zie meteen wat we voor u kunnen doen, van plaatsing tot onderhoud en herstelling."
        >
          <Link to="/diensten" className="cta-secondary arrow-nudge">Alle diensten <span aria-hidden="true">→</span></Link>
        </SectionHeading>
        <div className="mt-14">
          <ServiceTabs
            media={[
              { src: clipVerwarming.url, poster: posterVerwarming, alt: "Blauwe vlam van een brander" },
              { src: clipSanitair.url, poster: posterSanitair, alt: "Water stroomt uit een kraan" },
              { src: clipGas.url, poster: posterGas, alt: "Gasbrander die ontsteekt" },
            ]}
          />
        </div>
      </Section>

      <HomePrices />

      {/* 3 — MERKEN */}
      <BrandsBand tone="muted" />

      {/* 4 — WAAROM */}
      <Section>
        <WhyUs image={{ src: detailImg, alt: "Technieker controleert de druk op de aansluitingen van een wandketel", caption: "Drukcontrole bij een ketel" }} />
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/offerte" onClick={() => track("quote_cta_click", { location: "home_why" })} className="cta-primary cta-lg arrow-nudge">
            Vraag een offerte <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Section>

      {/* 5 — REALISATIES */}
      <Section tone="ink">
        <SectionHeading
          light
          eyebrow="Recent werk"
          title="Onze realisaties."
          intro="Echte werken van Clima Heat: nette aansluitingen, zorgvuldig onderhoud en installaties die er na jaren nog verzorgd uitzien."
        >
          <Link to="/realisaties" className="cta-ghost-light arrow-nudge">Bekijk alle realisaties <span aria-hidden="true">→</span></Link>
        </SectionHeading>
        <div className="mt-14 grid gap-2 md:auto-rows-[19rem] md:grid-cols-12">
          {featured.map((project, i) => (
            <Link
              key={project.title}
              to="/realisaties"
              className={`img-reveal group relative block overflow-hidden rounded-md ${i === 0 ? "md:col-span-7 md:row-span-2" : "md:col-span-5"}`}
            >
              <img
                src={project.image}
                alt={project.alt ?? `${project.title} door Clima Heat Solutions`}
                loading="lazy"
                width={1200}
                height={900}
                className={`w-full object-cover transition-[scale] duration-[1400ms] ease-out group-hover:scale-[1.05] ${i === 0 ? "aspect-[4/5]" : "aspect-[16/11]"} md:aspect-auto md:h-full`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent transition-opacity duration-500 group-hover:opacity-90" aria-hidden="true" />
              <div className="absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6">
                <p className="text-xs text-ink-foreground/75">0{i + 1} · {[project.type, project.merk].filter(Boolean).join(" · ")}</p>
                <h3 className="arrow-nudge mt-2 text-xl font-medium leading-snug tracking-[-0.02em] sm:text-2xl">
                  {project.title} <span aria-hidden="true" className="text-ember">→</span>
                </h3>
                <p className="mt-2 max-h-0 max-w-[44ch] overflow-hidden text-sm leading-relaxed text-ink-foreground/80 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* 6 — REVIEWS & CONTACT */}
      <Section tone="muted">
        <Reviews />
      </Section>

      <Section id="offerte">
        <div className="max-w-4xl">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 className="display-2 reveal mt-5 max-w-[13ch]">Afspraak of offerte?</h2>
            <p className="lead mt-5 max-w-[44ch] text-muted-foreground">
              Vertel ons waarmee we kunnen helpen: verwarming, sanitair of gas. Vermeld uw postcode en, indien van toepassing, het merk en type van uw toestel.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              <AppointmentButton location="home_final" />
              <Link to="/offerte" onClick={() => track("quote_cta_click", { location: "home_final" })} className="cta-primary cta-lg arrow-nudge">Vraag een offerte <span aria-hidden="true">→</span></Link>
              <CallButton location="home_final" className="cta-secondary cta-lg" />
              <MailButton location="home_final" className="cta-secondary cta-lg" />
            </div>
            <dl className="mt-10 grid border-t border-border text-sm">
              {[
                ["Telefoon", company.phone],
                ["E-mail", company.email],
                ["Werkgebied", `${company.region} · heel Vlaanderen`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-border py-3.5">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-right font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

        </div>
      </Section>
    </>
  );
}
