import { createFileRoute, Link } from "@tanstack/react-router";
import { ProblemGrid, ServicePage } from "../components/ServicePage";
import { Section } from "../components/sections";
import { RenovationBand } from "../components/RenovationBand";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "../lib/seo";
import img1 from "@/assets/stock-radiator.jpg";
import img2 from "@/assets/stock-radiator-valve.jpg";
import heroVideo from "@/assets/videos/radiatoren.mp4.asset.json";
import heroPoster from "@/assets/videos/radiatoren-poster.jpg";

const faq = [{"q": "Kunnen jullie een radiator bijplaatsen op mijn bestaande verwarming?", "a": "In veel gevallen wel. We bekijken de bestaande leidingen, de ketel en de plaats van de nieuwe radiator om te beoordelen hoe die het best aangesloten wordt."}, {"q": "Mijn radiator wordt niet warm. Moet hij vervangen worden?", "a": "Niet noodzakelijk. Vaak ligt de oorzaak bij lucht, een kraan of de waterdruk. We zoeken eerst de oorzaak voordat we vervanging voorstellen."}, {"q": "Wat kost een nieuwe radiator?", "a": "Dat hangt af van het type, de afmetingen en het werk aan de leidingen. Na een korte bespreking van uw situatie ontvangt u een duidelijk voorstel."}, {"q": "Kunnen radiatoren verplaatst worden bij een verbouwing?", "a": "Ja, dat is vaak mogelijk. Bespreek het liefst vroeg in de verbouwing, zodat leidingen kunnen worden aangepast voordat afwerking gebeurt."}, {"q": "In welke regio werken jullie?", "a": "In Antwerpen en heel Vlaanderen."}] as const;
const crumbs = [{ name: "Home", path: "/" }, { name: "Diensten", path: "/diensten" }, { name: "Radiatoren", path: "/radiatoren" }];

export const Route = createFileRoute("/radiatoren")({
  head: () => ({
    ...pageMeta({ title: "Radiatoren plaatsen of vervangen in Antwerpen | Clima Heat", description: "Nieuwe radiatoren plaatsen, oude radiatoren vervangen of een radiator die niet goed verwarmt? Clima Heat helpt in Antwerpen en Vlaanderen. Vraag een offerte.", path: "/radiatoren" }),
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceSchema({ name: "Radiatoren plaatsen en vervangen", description: "Nieuwe radiatoren plaatsen, oude radiatoren vervangen of een radiator die niet goed verwarmt? Clima Heat helpt in Antwerpen en Vlaanderen. Vraag een offerte.", path: "/radiatoren" })) },
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
      eyebrow="Verwarming · Radiatoren"
      h1="Radiatoren plaatsen en vervangen in Antwerpen"
      intro="Een goede verwarmingsketel levert pas comfort als de warmte ook in elke kamer aankomt. Daar zorgen uw radiatoren voor. Wilt u een extra radiator in een nieuwe ruimte, oude radiatoren vervangen bij een renovatie, of blijft een radiator koud terwijl de rest van het huis warm wordt? Clima Heat bekijkt de ruimte, de plaats van de radiator en de aansluiting op uw bestaande verwarmingsinstallatie. U krijgt helder advies over wat zinvol is en een duidelijk voorstel voordat we starten, in Antwerpen en heel Vlaanderen."
      breadcrumbs={crumbs}
      primaryLabel="Offerte voor radiatoren"
      formSubject="Radiatoren plaatsen"
      layout="editorial"
      projectTypes={["Plaatsing"]}
      focus={{
        label: "Warmte waar u ze nodig heeft",
        title: "De juiste radiator op de juiste plaats",
        paragraphs: ["Een radiator die te klein is of op een onhandige plek hangt, verwarmt een ruimte ongelijk. Bij een renovatie of een nieuwe indeling loont het daarom om plaatsing en aansluiting vooraf goed te bekijken.", "We houden rekening met de grootte van de ruimte, ramen en buitenmuren, het meubilair en de bestaande leidingen, zodat de nieuwe radiator logisch aansluit op uw installatie."],
        image: { src: img1, alt: "Witte paneelradiator onder een raam in een woonkamer", caption: "Radiator in de leefruimte" },
        secondImage: { src: img2, alt: "Technieker plaatst een thermostatische radiatorkraan", caption: "Aansluiting" },
      }}
      extra={
        <>
          <RenovationBand id="renovatie" eyebrow="Algemene verwarmingswerken en renovaties" title="Totaalrenovatie centrale verwarming" location="verwarming_renovatie" subject="Totaalrenovatie centrale verwarming"
            text="Een volledige vernieuwing van uw centrale verwarming? Clima Heat bekijkt de bestaande installatie, de gewenste aanpassingen en de technische mogelijkheden en stelt een oplossing op maat voor."
            list={["Aanpassingen aan bestaande centrale verwarming", "Vernieuwen van verwarmingsinstallaties", "Radiatoren plaatsen en vervangen", "Aanpassingen aan leidingen en aansluitingen", "Volledige renovatie van centrale verwarmingsinstallaties"]}
            options={[{ title: "Kleine verwarmingswerken", text: "Afhankelijk van de werkzaamheden plannen we een afspraak of maken we een prijs op maat.", price: "Afspraak of prijs op maat" }, { title: "Totaalrenovatie centrale verwarming", text: "Geen vaste prijs: we bekijken eerst uw installatie en woning.", price: "Prijs op offerte" }]} />
          <ProblemGrid title="Waarvoor u ons contacteert" items={["Nieuwe radiator in een extra ruimte", "Oude radiator vervangen", "Radiator blijft koud of lauw", "Radiator verplaatsen bij renovatie", "Lekkende of versleten radiatorkraan", "Ongelijke warmte in huis"]} />
          <Section>
            <p className="text-[15px] leading-relaxed text-muted-foreground">Gerelateerd: <Link to="/verwarmingsketels" className="font-semibold text-accent-deep underline">lees verder</Link> of bekijk al <Link to="/diensten" className="font-semibold text-accent-deep underline">onze diensten</Link>.</p>
          </Section>
        </>
      }
      blocks={[{"h2": "Nieuwe radiatoren plaatsen", "paragraphs": ["Bij een uitbreiding, een zolderkamer of een verbouwing is vaak een extra radiator nodig. We bekijken waar de radiator het best komt, hoe de leidingen kunnen lopen en hoe hij aansluit op uw bestaande centrale verwarming."]}, {"h2": "Bestaande radiatoren vervangen", "paragraphs": ["Oudere radiatoren kunnen versleten zijn, lekken of passen niet meer bij een nieuw interieur. Bij vervanging kijken we of de bestaande aansluitpunten bruikbaar zijn of beter aangepast worden, zodat het resultaat technisch en esthetisch klopt."]}, {"h2": "Radiator die onvoldoende verwarmt", "paragraphs": ["Blijft een radiator koud of wordt hij maar half warm, dan kan dat verschillende oorzaken hebben: lucht in het systeem, een vastzittende kraan, een te lage waterdruk of een onevenwicht in de installatie. We zoeken eerst de oorzaak voordat we iets vervangen."]}, {"h2": "Aanpassing bij renovatie", "paragraphs": ["Verbouwt u, dan verandert vaak de indeling of het gebruik van ruimtes. Dat is het moment om de plaats en het aantal radiatoren opnieuw te bekijken, liefst voordat muren en vloeren worden afgewerkt."]}, {"h2": "Aansluiting op uw bestaande installatie", "paragraphs": ["Een radiator werkt samen met uw verwarmingsketel, leidingen en thermostaat. We controleren of de nieuwe radiator correct aansluit en of de installatie na de werken goed functioneert."], "bullets": ["Controle van de bestaande leidingen", "Correcte aansluiting en ontluchting", "Controle van de waterdruk na de werken", "Uitleg over het gebruik van radiatorkranen"]}, {"h2": "Van aanvraag tot uitvoering", "paragraphs": ["U vertelt ons welke ruimte het betreft, hoeveel radiatoren u wilt plaatsen of vervangen en wat u nu merkt. Een foto van de huidige situatie helpt. Daarna bespreken we de mogelijkheden, ontvangt u een voorstel en plannen we de uitvoering."]}]}
      faq={faq}
      finalCta={{ title: "Radiatoren plaatsen of vervangen?" }}
    />
  );
}
