import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "../components/ServicePage";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "../lib/seo";
import { company } from "../lib/site";
import placed from "@/assets/stock-replacement.jpg";
import technician from "@/assets/stock-install-detail.jpg";
import heroVideo from "@/assets/videos/gasketel-vervangen.mp4.asset.json";
import heroPoster from "@/assets/videos/gasketel-vervangen-poster.jpg";

const faq = [
  {
    q: "Wat kost het vervangen van een gasketel?",
    a: "Het toestel en vermogen zijn maar een deel van de prijs. Ook leidingen, aansluitingen en rookgasafvoer kunnen aanpassingen vragen. We bekijken de installatie en lichten het voorgestelde werk toe voordat u beslist.",
  },
  {
    q: "Hoelang duurt het vervangen van een gasketel?",
    a: "De uitvoering hangt af van de huidige ketel, de nieuwe plaats en de aanpassingen aan aansluitingen en afvoer. Na een beoordeling bespreken we de planning en de verwachte duur.",
  },
  {
    q: "Kan ik mijn oude ketel beter herstellen of vervangen?",
    a: "We kijken naar de oorzaak van de storing, de algemene toestand van het toestel en de beschikbaarheid van onderdelen. Daarna leggen we uit welke mogelijkheden zinvol zijn, zodat u kunt kiezen.",
  },
  {
    q: "Nemen jullie de oude ketel mee?",
    a: "Het afkoppelen van de oude ketel hoort bij de vervanging. Bespreek bij het voorstel of de afvoer van het oude toestel inbegrepen is, zodat de afspraken duidelijk zijn.",
  },
  {
    q: "Werken jullie in mijn regio?",
    a: `We werken in ${company.serviceArea}. Bel ${company.phone} voor de zekerheid.`,
  },
] as const;

export const Route = createFileRoute("/verwarmingsketels/gasketel-vervangen")({
  head: () => ({
    ...pageMeta({
      title: "Gasketel vervangen in Antwerpen & Vlaanderen | Clima Heat",
      description:
        "Gasketel vervangen door een energiezuinig toestel. Eerlijk advies over herstellen of vervangen, nette plaatsing, duidelijk voorstel. Vraag uw offerte aan.",
      path: "/verwarmingsketels/gasketel-vervangen",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          serviceSchema({
            name: "Gasketel vervangen",
            description: "Vervanging van bestaande gasketels bij particuliere woningen.",
            path: "/verwarmingsketels/gasketel-vervangen",
          }),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Verwarmingsketels", path: "/verwarmingsketels" },
            { name: "Gasketel vervangen", path: "/verwarmingsketels/gasketel-vervangen" },
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
      eyebrow="Gasketel vervangen"
      h1="Uw gasketel laten vervangen"
      intro="Heeft uw gasketel herhaaldelijk storingen of denkt u aan vernieuwing? Een oude ketel die steeds vaker hapert, kost u niet alleen herstellingen maar ook elke maand meer gas dan nodig. Toch is vervangen niet altijd het juiste antwoord. Clima Heat bekijkt daarom eerst de toestand van uw toestel, de oorzaak van de problemen en de beschikbaarheid van onderdelen — pas dan bespreken we of herstellen nog zinvol is. Kiest u voor vervanging, dan bekijken we welk nieuw toestel past bij uw woning, uw warmwaterverbruik en uw bestaande aansluitingen en rookgasafvoer. U krijgt advies in gewone taal en een duidelijk voorstel voor de plaatsing, zonder verrassingen achteraf. Actief in Antwerpen en heel Vlaanderen."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Verwarmingsketels", path: "/verwarmingsketels" },
        { name: "Gasketel vervangen", path: "/verwarmingsketels/gasketel-vervangen" },
      ]}
      formSubject="Nieuwe verwarmingsketel / ketel vervangen"
      layout="sequence"
      projectTypes={["Plaatsing", "Interventie"]}
      showSteps={false}
      focus={{
        label: "Vervanging in beeld",
        title: "Een nieuwe ketel is geen automatische één-op-één-wissel",
        paragraphs: [
          "Zelfs wanneer de nieuwe ketel op dezelfde plek komt, kunnen aansluitingen, rookgasafvoer en de ruimte voor onderhoud om aandacht vragen. Daarom bekijken we de bestaande situatie voordat we het werk vastleggen.",
          "We bespreken vooraf wat voor uw woning nodig is, zodat u weet welke aanpassingen er bij de vervanging komen kijken.",
        ],
        image: { src: placed, alt: "Geplaatste ketel met koperen leidingen", caption: "Ketelvervanging" },
        secondImage: { src: technician, alt: "Technieker werkt aan nieuwe ketelaansluitingen", caption: "Installatiewerk" },
      }}
      blocks={[
        {
          h2: "Herstellen of vervangen?",
          paragraphs: [
            "Niet elke storing betekent dat u een nieuwe ketel nodig heeft. We bekijken wat er precies misloopt, hoe de rest van de installatie eraan toe is en of onderdelen nog verkrijgbaar zijn.",
            "Een herstel kan de juiste keuze zijn. Als vervanging technisch verstandiger lijkt, leggen we uit waarom en welke alternatieven er zijn.",
          ],
        },
        {
          h2: "Zo verloopt een vervanging",
          bullets: [
            "Bestaande installatie bekijken en warmte- en warmwaterbehoefte bespreken",
            "Voorstel met het toestel en de benodigde aanpassingen",
            "Oude ketel veilig afkoppelen",
            "Nieuwe ketel plaatsen, aansluiten en afregelen",
            "Werking testen en bediening met u overlopen",
          ],
        },
        {
          h2: "Waarop we letten in uw woning",
          paragraphs: ["Een vervanging op dezelfde plaats is niet altijd één-op-één mogelijk. De rookgasafvoer, aansluitingen, beschikbare ruimte en toegankelijkheid voor onderhoud bepalen mee wat er nodig is."],
          bullets: [
            "Bestaande leidingen en aansluitingen",
            "Rookgasafvoer en verluchting",
            "Plaats van de ketel en bereikbaarheid voor onderhoud",
            "Warmwatercomfort bij meerdere kranen of badkamers",
          ],
        },
        {
          h2: "Elk merk, ook uw huidige",
          paragraphs: [
            "Heeft u een Vaillant, Viessmann, Bulex, Bosch, Junkers, Buderus of Remeha, of overweegt u een ander merk? We bekijken welk model bij uw woning past en houden rekening met de bestaande installatie.",
          ],
        },
        {
          h2: "Voor een gericht voorstel",
          paragraphs: ["Geef het merk en type van uw huidige ketel door en beschrijf waarom u vervanging overweegt: een defect, terugkerende klachten of veranderde comfortwensen. Vertel ook of het warm water voor meerdere badkamers moet volstaan. We bespreken op basis daarvan wat nog ter plaatse bekeken moet worden."],
        },
        {
          h2: "Signalen dat vervanging het overwegen waard is",
          paragraphs: ["Een oudere gasketel die steeds vaker in storing valt, onregelmatig warm water geeft of waarvoor onderdelen moeilijk te vinden zijn, is vaak een reden om vervanging te bekijken. Dat betekent niet dat vervangen altijd nodig is; soms volstaat een herstelling.", "We bekijken de toestand van het toestel en bespreken eerlijk wat u kunt verwachten van herstellen of vervangen. Zo neemt u een beslissing op basis van de feiten over uw eigen ketel."],
        },
        {
          h2: "Voorbereiding op een vervanging",
          paragraphs: ["Om een gerichte offerte te maken, helpt het als u het merk, het type en de plaats van uw huidige ketel doorgeeft. Een foto van het toestel en de aansluitingen eronder maakt veel duidelijk.", "Vermeld ook of u tegelijk iets wilt veranderen, zoals de plaats van het toestel of de manier waarop u warm water gebruikt. Dan kunnen we dat meteen meenemen in het voorstel."],
        },
      ]}
      faq={faq}
      finalCta={{
        title: "Uw gasketel laten vervangen?",
        text: "Geef het merk en type van uw huidige ketel door en vertel waarom u aan vervanging denkt. We bespreken de volgende stap en een vrijblijvend voorstel.",
      }}
    />
  );
}
