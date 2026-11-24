import { createFileRoute, Link } from "@tanstack/react-router";
import catVerwarming from "@/assets/stock-dienst-nieuw.jpg";
import catSanitair from "@/assets/stock-water-comfort.jpg";
import catGas from "@/assets/stock-gas-kraan.jpg";
import { IntroBand, PageHero } from "../components/PageHero";
import heroVideo from "@/assets/videos/diensten.mp4.asset.json";
import heroPoster from "@/assets/videos/diensten-poster.jpg";
import { CtaStrip, FinalCta, Section, SectionHeading, ServiceCategories } from "../components/sections";
import { AppointmentButton } from "../components/AppointmentButton";
import { breadcrumbSchema, pageMeta } from "../lib/seo";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Diensten", path: "/diensten" },
];

export const Route = createFileRoute("/diensten")({
  head: () => ({
    ...pageMeta({
      title: "Diensten: verwarming, sanitair & gas in Antwerpen | Clima Heat",
      description:
        "Diensten voor verwarming, sanitair en gas: verwarmingsketels van verschillende merken, ketelonderhoud en herstellingen, radiatoren, warmwatertoestellen, kranen en gasleidingen.",
      path: "/diensten",
    }),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(breadcrumbSchema(crumbs)) }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Onze diensten · Antwerpen & Vlaanderen"
        title="Alles voor verwarming, sanitair en gas."
        subtitle="Eén aanspreekpunt voor uw volledige installatie: van een nieuwe verwarmingsketel tot onderhoud, radiatoren, warm water, kranen en gasleidingen."
        primary={{ label: "Vraag een offerte", to: "/offerte" }}
        breadcrumbs={crumbs}
        video={{ src: heroVideo.url, poster: heroPoster }}
      />
      <IntroBand text="Een nieuwe ketel plaatsen of een bestaande ketel vervangen is één dienst. Daarnaast verzorgen we ketelonderhoud en herstellingen, ook voor stookolie. Onder sanitair vindt u algemene sanitaire werken zoals handenwassers plaatsen, kranen installeren en lekkages opsporen, naast warmwatertoestellen, close-in boilers en waterverzachters. Kies hieronder uw categorie: maak een afspraak voor onderhoud, herstellingen en kleine loodgieterswerken, of vraag een offerte voor grotere installaties." />
      <Section>
        <SectionHeading
          eyebrow="Overzicht"
          title="Eén adres. Drie vakgebieden."
          intro="Elk vakgebied met een eigen aanpak, één heldere manier van werken."
        />
        <div className="mt-12">
          <ServiceCategories
            images={[
              { src: catVerwarming, alt: "Moderne wandketel in een technische ruimte" },
              { src: catSanitair, alt: "Stromend water uit een kraan" },
              { src: catGas, alt: "Gasleiding met gele afsluitkraan" },
            ]}
          />
        </div>
        <div className="mt-12 flex flex-wrap gap-3 border-t border-border pt-8">
          <AppointmentButton location="services" />
          <Link to="/tarieven" className="cta-secondary cta-lg">Bekijk alle tarieven</Link>
          <Link to="/offerte" className="cta-primary cta-lg">Vraag een offerte</Link>
          <Link to="/realisaties" className="cta-secondary cta-lg arrow-link">Bekijk onze realisaties <span aria-hidden="true">→</span></Link>
        </div>
      </Section>
      <CtaStrip location="diensten_strip" title="Twijfelt u welke dienst u nodig heeft?" text="Bel ons of beschrijf kort uw situatie. We zeggen u eerlijk wat zinvol is." />
      <FinalCta />
    </>
  );
}
