import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, ProblemGrid } from "../components/ServicePage";
import { pageMeta, serviceSchema, faqSchema, breadcrumbSchema } from "../lib/seo";
import image from "@/assets/stookolie-brander.jpg";

const description = "Onderhoud en herstelling van stookolieketels in Antwerpen en Vlaanderen. Clima Heat bekijkt uw brander, ketel en installatie. Vraag een offerte.";
const crumbs = [{ name: "Home", path: "/" }, { name: "Verwarming", path: "/verwarmingsketels" }, { name: "Stookolie", path: "/stookolie" }];
const faq = [
  { q: "Kan ik mijn bestaande stookolieketel laten onderhouden?", a: "Ja. Geef merk, type en de datum van het laatste onderhoud door. We bespreken het onderhoud dat uw toestel nodig heeft en bekijken de installatie ter plaatse." },
  { q: "Wat als de brander in storing valt?", a: "Noteer de melding en wat u opmerkt. Blijf de brander niet herhaaldelijk resetten en open het toestel niet zelf. Bel ons om een nazicht te bespreken." },
  { q: "Mag ik zomaar een nieuwe stookolieketel plaatsen?", a: "Nee. In Vlaanderen gelden beperkingen voor plaatsing en vervanging. Onder meer de gebouwsituatie en de beschikbaarheid van aardgas spelen mee. We beoordelen eerst wat in uw situatie toegestaan en zinvol is." },
  { q: "Is tankcontrole hetzelfde als ketelonderhoud?", a: "Nee. Onderhoud van de ketel en controle van een stookolietank zijn verschillende opdrachten. Vermeld duidelijk wat u nodig heeft; deze pagina gaat over de ketel en de brander." },
] as const;
export const Route = createFileRoute("/stookolie")({
  head: () => ({ ...pageMeta({ title: "Stookolieketel: onderhoud en herstelling | Clima Heat Antwerpen", description, path: "/stookolie" }), scripts: [
    { type: "application/ld+json", children: JSON.stringify(serviceSchema({ name: "Onderhoud en herstelling stookolieketel", description, path: "/stookolie" })) },
    { type: "application/ld+json", children: JSON.stringify(faqSchema(faq)) },
    { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema(crumbs)) },
  ] }), component: Page,
});
function Page() {
  return <ServicePage eyebrow="Verwarming · Stookolie" h1="Stookolieketel onderhouden of herstellen" breadcrumbs={crumbs}
    intro="Verwarmt u met stookolie? Een goed werkende ketel begint bij een brander en installatie die op elkaar afgestemd zijn. Clima Heat verzorgt onderhoud en onderzoekt storingen aan bestaande stookolieketels in Antwerpen en Vlaanderen. We bekijken uw toestel, de klachten en de onderhoudshistoriek voordat we een ingreep voorstellen. Ook wanneer u twijfelt over de toekomst van uw installatie, krijgt u uitleg over de mogelijke volgende stap, zonder automatisch naar vervanging te sturen."
    formSubject="Stookolieketel" layout="sequence" showBrands={false} projectTypes={["Onderhoud", "Herstelling"]}
    focus={{ label: "Ketel en brander", title: "Een gerichte controle.", paragraphs: ["De brander zorgt voor de verbranding; de ketel draagt de warmte over aan het verwarmingswater. Een storing kan dus meer oorzaken hebben dan alleen een onderdeel dat versleten is. We bekijken het geheel en bespreken wat aandacht vraagt.", "Bij uw aanvraag helpen het merk, het toesteltype, een foto van de brander en het laatste onderhoudsattest ons om het bezoek voor te bereiden."], image: { src: image, alt: "Illustratie van een stookolieketel met brander en verwarmingsleidingen", caption: "Stookolieketel en brander" } }}
    extra={<ProblemGrid title="Wanneer vraagt u een nazicht?" description="Een verandering in de werking is reden om uw toestel te laten beoordelen. Beschrijf wat u merkt en sinds wanneer, zodat we gericht kunnen voorbereiden." items={["Brander valt in storing", "Ketel start niet op", "Ongewone geluiden", "Onvoldoende warmte", "Onderhoud nodig", "Twijfel over herstellen of vervangen"]} />}
    blocks={[
      { h2: "Onderhoud van uw stookolieketel", paragraphs: ["Bij onderhoud kijken we de toestand van ketel en brander na. Reiniging, controle van de verbranding en afregeling gebeuren op basis van het toestel en de geldende voorschriften. De bevindingen helpen om problemen tijdig te herkennen en de werking op te volgen.", "Geef bij het plannen door wanneer het vorige onderhoud gebeurde en of u sinds dat bezoek veranderingen heeft gemerkt. Bewaar de onderhoudsdocumenten bij uw installatie: ze zijn nuttig bij een volgend nazicht."] },
      { h2: "Herstelling begint bij de oorzaak", paragraphs: ["Een brander die blokkeert, kan problemen hebben met de ontsteking, brandstoftoevoer of regeling. We onderzoeken eerst de symptomen en bespreken daarna de geschikte herstelling. Niet elke storing vraagt om een nieuwe ketel.", "Of herstel zinvol is, hangt af van de staat van het toestel, de benodigde onderdelen en hun beschikbaarheid. U krijgt uitleg over het voorgestelde werk voordat u beslist."] },
      { h2: "Vervanging zorgvuldig afwegen", paragraphs: ["Een oudere stookolieketel vervangen is geen automatische keuze. In Vlaanderen gelden regels die nieuwe plaatsing of vervanging beperken. We bekijken daarom eerst uw gebouw, bestaande aansluiting en mogelijke alternatieven.", "Daarnaast spelen warmtebehoefte, radiatoren, warmwatervoorziening en beschikbare ruimte mee. Een verandering van warmtebron vraagt advies over de hele installatie, niet alleen het toestel."] },
      { h2: "Veilig bij een storing", paragraphs: ["Open de brander niet zelf en blijf niet resetten wanneer hij telkens opnieuw in storing gaat. Noteer wat de regeling aangeeft. Bij rook, sterke geur of een zichtbaar lek stopt u het gebruik en laat u de situatie beoordelen.", "Uw ketel en stookolietank zijn afzonderlijke onderdelen. Vermeld of uw vraag over verwarming, brander of tank gaat; we bespreken welke opdracht nodig is zonder een tankkeuring als ketelonderhoud voor te stellen."] },
      { h2: "Zo bereiden we uw aanvraag voor", paragraphs: ["Vermeld merk en type, de leeftijd voor zover bekend, uw postcode en het probleem of gewenste onderhoud. Een foto van het typeplaatje en de brander is vaak nuttiger dan een algemene foto van de ruimte.", "We bespreken uw aanvraag, bekijken de situatie en lichten het voorstel toe. Na het werk krijgt u uitleg over de werking en aandachtspunten voor het verdere gebruik."] },
    ]} faq={faq} finalCta={{ title: "Uw stookolieketel laten nakijken?", text: "Beschrijf uw toestel en uw vraag. We bespreken het juiste onderhoud of nazicht." }} />;
}