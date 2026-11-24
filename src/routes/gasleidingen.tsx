import { createFileRoute, Link } from "@tanstack/react-router";
import { ProblemGrid, ServicePage } from "../components/ServicePage";
import { Section } from "../components/sections";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "../lib/seo";
import img1 from "@/assets/stock-gasleiding.jpg";
import img2 from "@/assets/stock-gas-controle.jpg";
import heroVideo from "@/assets/videos/gasleidingen.mp4.asset.json";
import heroPoster from "@/assets/videos/gasleidingen-poster.jpg";

const faq = [{"q": "Kunnen jullie een gasleiding verleggen bij een verbouwing?", "a": "Ja. We bekijken het nieuwe tracé en passen de leiding aan, zodat die correct aansluit op uw toestellen."}, {"q": "Is een keuring verplicht na werken aan de gasleiding?", "a": "Dat hangt af van de situatie, bijvoorbeeld bij een nieuwe installatie of een indienststelling. We lichten vooraf toe wat in uw geval van toepassing is."}, {"q": "Voeren jullie zelf de keuring uit?", "a": "Een keuring gebeurt volgens de geldende regels door een daartoe bevoegde instantie. We bespreken met u welke stappen nodig zijn."}, {"q": "Wat kost een nieuwe gasleiding?", "a": "Dat hangt af van de lengte, het tracé en de aansluitingen. Na een korte bespreking ontvangt u een duidelijk voorstel."}, {"q": "In welke regio werken jullie?", "a": "In Antwerpen en heel Vlaanderen."}] as const;
const crumbs = [{ name: "Home", path: "/" }, { name: "Diensten", path: "/diensten" }, { name: "Gasleidingen", path: "/gasleidingen" }];

export const Route = createFileRoute("/gasleidingen")({
  head: () => ({
    ...pageMeta({ title: "Gasleiding plaatsen of aanpassen in Antwerpen | Clima Heat", description: "Nieuwe gasleiding plaatsen of een bestaande gasleiding aanpassen, bijvoorbeeld bij een nieuwe ketel of kookplaat. Veilig uitgevoerd in Antwerpen en Vlaanderen.", path: "/gasleidingen" }),
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceSchema({ name: "Gasleidingen plaatsen en aanpassen", description: "Nieuwe gasleiding plaatsen of een bestaande gasleiding aanpassen, bijvoorbeeld bij een nieuwe ketel of kookplaat. Veilig uitgevoerd in Antwerpen en Vlaanderen.", path: "/gasleidingen" })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema(crumbs)) },
      { type: "application/ld+json", children: JSON.stringify(faqSchema(faq)) },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ServicePage
      heroVideo={{ src: heroVideo.url, poster: heroPoster }}
      eyebrow="Gas · Leidingen"
      h1="Gasleidingen plaatsen en aanpassen"
      intro="Werken aan een gasinstallatie vragen vakkennis en zorgvuldigheid. Plaatst u een nieuwe verwarmingsketel of gaskookplaat, verbouwt u, of moet een bestaande gasleiding verlegd worden? Clima Heat plaatst nieuwe gasleidingen en past bestaande leidingen aan, met aandacht voor veiligheid, correcte materialen en een nette uitvoering. We bekijken vooraf de bestaande installatie en de plaats van de toestellen, en lichten toe wat er nodig is rond keuring. Zo weet u voor de start waar u aan toe bent, in Antwerpen en heel Vlaanderen."
      breadcrumbs={crumbs}
      primaryLabel="Vraag een offerte"
      formSubject="Gasleidingen"
      layout="editorial"
      projectTypes={["Plaatsing", "Interventie"]}
      focus={{
        label: "Veiligheid eerst",
        title: "Een gasleiding vraagt een zorgvuldige aanpak",
        paragraphs: ["Bij gas laat u niets aan het toeval over. Daarom bekijken we vooraf het tracé, de bestaande aansluiting en de toestellen die op de leiding komen.", "Na de werken controleren we de dichtheid van de leiding en bespreken we met u welke keuring van toepassing is."],
        image: { src: img1, alt: "Gasleiding in koper met afsluitkraan en gasmeter", caption: "Gasinstallatie" },
        secondImage: { src: img2, alt: "Controle van een gasleiding met drukmeter", caption: "Dichtheidscontrole" },
      }}
      extra={
        <>
          <ProblemGrid title="Waarvoor u ons contacteert" items={["Gasleiding voor een nieuwe ketel", "Leiding verleggen bij verbouwing", "Aansluiting gaskookplaat", "Bestaande leiding aanpassen", "Vervanging van een oude installatie", "Vragen over keuring"]} />
          <Section>
            <p className="text-[15px] leading-relaxed text-muted-foreground">Gerelateerd: <Link to="/verwarmingsketels/gasketel-vervangen" className="font-semibold text-accent-deep underline">lees verder</Link> of bekijk al <Link to="/diensten" className="font-semibold text-accent-deep underline">onze diensten</Link>.</p>
          </Section>
        </>
      }
      blocks={[{"h2": "Een nieuwe gasleiding plaatsen", "paragraphs": ["Voor een nieuw toestel of een nieuwe ruimte is soms een nieuwe gasleiding nodig. We bekijken het meest logische tracé, de gebruikte materialen en de aansluiting op de bestaande installatie."]}, {"h2": "Een bestaande gasleiding aanpassen", "paragraphs": ["Bij een verbouwing of een nieuwe indeling moet een gasleiding vaak verlegd, verlengd of ingekort worden. We passen de leiding aan en zorgen dat ze correct en veilig is aangesloten."]}, {"h2": "Aansluiting bij een nieuwe of vervangende installatie", "paragraphs": ["Bij de plaatsing of vervanging van een verwarmingsketel hoort vaak ook werk aan de gasleiding. Door dit samen te bekijken, sluiten de werken goed op elkaar aan. Lees meer over gasketel vervangen."]}, {"h2": "Veiligheid tijdens en na de werken", "bullets": ["Werken met geschikte materialen", "Controle op dichtheid na de werken", "Correcte aansluiting van toestellen", "Uitleg over wat er is uitgevoerd"]}, {"h2": "Keuring van een gasinstallatie", "paragraphs": ["Bij een nieuwe gasinstallatie of bij bepaalde aanpassingen is een keuring vereist, bijvoorbeeld voordat de netbeheerder de installatie in dienst stelt. Of een keuring nodig is en door wie die moet gebeuren, hangt af van uw situatie. We lichten dit vooraf toe, zodat u weet welke stappen er volgen en hoe de keuring kan worden aangevraagd."]}, {"h2": "Ruikt u gas?", "paragraphs": ["Verlaat dan de ruimte, vermijd schakelaars en open vuur, sluit indien mogelijk de gaskraan aan de meter en volg de instructies van uw netbeheerder. Laat de installatie nadien nakijken."]}]}
      faq={faq}
      finalCta={{ title: "Gasleiding plaatsen of aanpassen?" }}
    />
  );
}
