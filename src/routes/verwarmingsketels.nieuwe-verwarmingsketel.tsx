import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "../components/ServicePage";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "../lib/seo";
import { company } from "../lib/site";
import placed from "@/assets/stock-boiler-installation.jpg";
import sanitary from "@/assets/stock-controls.jpg";
import heroVideo from "@/assets/videos/nieuwe-verwarmingsketel.mp4.asset.json";
import heroPoster from "@/assets/videos/nieuwe-verwarmingsketel-poster.jpg";

const faq = [
  {
    q: "Wat kost een nieuwe verwarmingsketel?",
    a: "Dat verschilt per woning: het type en vermogen, de warmwaterbehoefte, bestaande leidingen en eventuele aanpassingen bepalen samen het werk. Na bespreking van uw situatie ontvangt u een voorstel voor uw installatie.",
  },
  {
    q: "Welke ketel past bij mijn woning?",
    a: "We bekijken uw warmte- en warmwaterbehoefte, huidige installatie, afgiftesysteem en beschikbare ruimte. Op basis daarvan bespreken we welk toestel en vermogen geschikt lijken; een keuze op alleen vloeroppervlakte is te beperkt.",
  },
  {
    q: "Kan de nieuwe ketel op dezelfde plaats?",
    a: "Dat hangt af van de ruimte, de bestaande aansluitingen en de rookgasafvoer. We bekijken of de huidige plaats geschikt is en welke wijzigingen een andere plaats zou vragen.",
  },
  {
    q: "Hoe snel kan een nieuwe ketel geplaatst worden?",
    a: "Dat hangt af van de planning en de beschikbaarheid van het gekozen toestel. Bij uw voorstel spreken we een concrete datum af.",
  },
  {
    q: "Werken jullie in mijn gemeente?",
    a: `We werken in ${company.serviceArea}. Bel ${company.phone} als u wil weten of uw gemeente erbij hoort.`,
  },
] as const;

export const Route = createFileRoute("/verwarmingsketels/nieuwe-verwarmingsketel")({
  head: () => ({
    ...pageMeta({
      title: "Nieuwe verwarmingsketel nodig? | Clima Heat Solutions",
      description:
        "Nieuwe verwarmingsketel laten plaatsen in Antwerpen en Vlaanderen. Advies op maat van uw woning, verbruik en budget. Vraag vrijblijvend uw offerte aan.",
      path: "/verwarmingsketels/nieuwe-verwarmingsketel",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          serviceSchema({
            name: "Nieuwe verwarmingsketel plaatsen",
            description:
              "Plaatsing van een nieuwe energiezuinige verwarmingsketel bij particuliere woningen.",
            path: "/verwarmingsketels/nieuwe-verwarmingsketel",
          }),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Verwarmingsketels", path: "/verwarmingsketels" },
            {
              name: "Nieuwe verwarmingsketel",
              path: "/verwarmingsketels/nieuwe-verwarmingsketel",
            },
          ]),
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(faqSchema(faq)) },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ServicePage
      heroVideo={{ src: heroVideo.url, poster: heroPoster }}
      eyebrow="Nieuwe verwarmingsketel"
      h1="Nieuwe verwarmingsketel nodig?"
      intro="Een nieuwe verwarmingsketel moet niet alleen passen in de ruimte, maar ook bij uw warmte- en warmwaterbehoefte. Wie een toestel kiest op vermogen alleen, riskeert een ketel die te groot of te klein is — met onnodig verbruik of te weinig comfort tot gevolg. Clima Heat helpt u de opties begrijpen: welk type toestel past bij uw woning, welk vermogen u echt nodig heeft en welke aanpassingen aan leidingen of rookgasafvoer eventueel nodig zijn. We bekijken uw huidige installatie ter plaatse en stellen daarna een passende plaatsing voor, met een heldere uitleg over het toestel en de werkzaamheden. Na de plaatsing blijven we uw aanspreekpunt voor onderhoud en service. Actief in Antwerpen en heel Vlaanderen, voor verschillende verwarmingsmerken."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Verwarmingsketels", path: "/verwarmingsketels" },
        { name: "Nieuwe verwarmingsketel", path: "/verwarmingsketels/nieuwe-verwarmingsketel" },
      ]}
      formSubject="Nieuwe verwarmingsketel / ketel vervangen"
      layout="grid"
      projectTypes={["Plaatsing", "Sanitair", "Interventie"]}
      focus={{
        label: "Comfort in de praktijk",
        title: "Warm water en verwarming vragen elk hun eigen afweging",
        paragraphs: [
          "Hoeveel tappunten gebruikt u, en gebeurt dat soms tegelijk? Dat heeft invloed op de keuze van het toestel. Ook de bestaande radiatoren en leidingen spelen mee. We zetten die vragen op een rij voordat we een model aanbevelen.",
          "Het warmwatergedeelte is daarbij net zo belangrijk als de ketel zelf: een toestel dat te krap is voor uw gebruik, merkt u elke dag.",
        ],
        image: { src: placed, alt: "Technieker sluit een nieuwe ketel aan", caption: "Ketelplaatsing" },
        secondImage: { src: sanitary, alt: "Technieker stelt een verwarmingsregeling in", caption: "Regeling" },
      }}
      blocks={[
        {
          h2: "Wanneer is een nieuwe ketel aan de orde?",
          paragraphs: ["Een oudere ketel hoeft niet automatisch weg. Maar terugkerende storingen, lastig verkrijgbare onderdelen of een verbouwing kunnen een goed moment zijn om de hele installatie te bekijken. We bespreken eerst of herstel nog een verstandige optie is."],
          bullets: [
            "Herhaalde storingen of oplopende herstelkosten",
            "Een verouderd toestel dat niet meer bij uw behoeften past",
            "Onderdelen die niet meer verkrijgbaar zijn",
            "Uw woning wordt niet meer gelijkmatig warm",
            "U verbouwt en pakt de verwarming meteen aan",
          ],
        },
        {
          h2: "Comfort begint bij de juiste keuze",
          paragraphs: [
            "Een nieuw toestel biedt de kans om de installatie opnieuw af te stemmen op uw dagelijks gebruik. Of u vooral gelijkmatige verwarming, voldoende warm water of meer controle wilt: dat bespreken we vooraf. Het uiteindelijke verbruik hangt ook van de woning en het gebruik af.",
          ],
          bullets: [
            "Warmwatercapaciteit passend bij het aantal tappunten",
            "Verwarmingsvermogen afgestemd op de woning",
            "Aandacht voor bereikbaarheid voor later onderhoud",
            "Uitleg over bediening en periodieke controle",
          ],
        },
        {
          h2: "De mogelijkheden op een rij",
          paragraphs: [
            "Een condensatiegasketel kan bij een bestaande gasinstallatie een optie zijn, maar de beste aanpak hangt af van uw woning en de geldende regels. Heeft u stookolie of een apart warmwatertoestel? Geef dat mee, zodat we gericht naar de mogelijkheden kunnen kijken.",
            "We leggen uit waarom een bepaald toestel wordt voorgesteld, welke aanpassingen nodig zijn en wat u kunt verwachten tijdens de plaatsing.",
          ],
        },
        {
          h2: "Verschillende merken, eerlijk vergeleken",
          paragraphs: [
            "We plaatsen ketels van verschillende merken, zoals Vaillant, Viessmann, Bulex, Bosch, Junkers, Buderus en Remeha. Heeft u al een model op het oog? We bekijken of het past bij uw woning en warmwatergebruik, in plaats van automatisch hetzelfde vermogen als uw oude ketel te kiezen.",
          ],
        },
        {
          h2: "Voorbereid aan uw aanvraag beginnen",
          paragraphs: ["Vertel ons welk toestel u nu gebruikt, hoeveel badkamers u heeft en wat u aan het huidige comfort wilt veranderen. Foto’s van de huidige ketel en de ruimte eromheen kunnen helpen om het eerste gesprek concreet te maken; voor een definitieve keuze beoordelen we de installatie zelf."],
        },
        {
          h2: "Wat bekijken we voor een nieuwe verwarmingsketel?",
          paragraphs: ["Een nieuwe verwarmingsketel moet passen bij uw woning en uw gebruik. We kijken naar de bestaande installatie, de plaats van het toestel, de aansluitingen, de afvoer en uw behoefte aan warm water. Een gezin met meerdere badkamers heeft andere noden dan een appartement met één douche.", "Op basis daarvan bespreken we welke oplossing technisch zinvol is. U krijgt uitleg over de keuzes, zodat u een voorstel kunt vergelijken en weet waarvoor u betaalt."],
        },
        {
          h2: "Hoe verloopt de plaatsing?",
          paragraphs: ["Na uw akkoord plannen we de plaatsing. De oude ketel wordt afgekoppeld, het nieuwe toestel wordt geplaatst en aangesloten, en daarna wordt de installatie in gebruik genomen en gecontroleerd.", "Bij de oplevering leggen we uit hoe u het toestel bedient en waar u op moet letten. Zo weet u meteen hoe uw nieuwe verwarmingsketel werkt en wanneer het eerste onderhoud aan de orde is."],
        },
      ]}
      faq={faq}
      finalCta={{
        title: "Ontvang uw voorstel voor een nieuwe ketel",
        text: "Vertel welk toestel u nu heeft, hoeveel badkamers u gebruikt en wat u wilt verbeteren. We bespreken de volgende stap en een vrijblijvend voorstel.",
      }}
    />
  );
}
