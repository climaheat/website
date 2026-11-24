import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "../components/ServicePage";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "../lib/seo";
import { company } from "../lib/site";
import placed from "@/assets/stock-new-boiler.jpg";
import maintenance from "@/assets/stock-heat-exchanger.jpg";
import heroVideo from "@/assets/videos/gasketel.mp4.asset.json";
import heroPoster from "@/assets/videos/gasketel-poster.jpg";

const faq = [
  {
    q: "Wat kost een nieuwe gasketel?",
    a: "Het type toestel, benodigde vermogen en aanpassingen aan aansluitingen of rookgasafvoer beïnvloeden de prijs. We bespreken wat bij uw woning nodig is en maken daarna een voorstel.",
  },
  {
    q: "Hoe vaak moet een gasketel onderhouden worden?",
    a: "Voor een centrale verwarmingsketel op gas vanaf 20 kW is in Vlaanderen om de twee jaar onderhoud door een erkende technicus vereist. Na het uitgevoerde onderhoud krijgt u het officiële attest.",
  },
  {
    q: "Plaatsen jullie ook de gasleiding?",
    a: "We helpen bij de controle, vernieuwing en keuring van gasleidingen. Welke keuring of attest nodig is, hangt af van de werken en de installatie; dat bespreken we vooraf.",
  },
  {
    q: "Kan ik een gasketel laten nakijken zonder ze te vervangen?",
    a: `Zeker. Bel ${company.phone} en we bekijken de installatie eerst. Herstellen kan vaak volstaan.`,
  },
] as const;

export const Route = createFileRoute("/verwarmingsketels/gasketel")({
  head: () => ({
    ...pageMeta({
      title: "Gasketel plaatsen, onderhouden of herstellen | Clima Heat",
      description:
        "Gasketel plaatsen, onderhouden of herstellen in Antwerpen en Vlaanderen. Onderhoud met officieel attest, advies op maat. Vraag vrijblijvend een offerte.",
      path: "/verwarmingsketels/gasketel",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          serviceSchema({
            name: "Gasketel plaatsen en onderhouden",
            description:
              "Plaatsing, onderhoud en herstelling van gasketels voor woningen in Antwerpen en Vlaanderen.",
            path: "/verwarmingsketels/gasketel",
          }),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Verwarmingsketels", path: "/verwarmingsketels" },
            { name: "Gasketel", path: "/verwarmingsketels/gasketel" },
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
      eyebrow="Gasketel"
      h1="Gasketel plaatsen, onderhouden of herstellen"
      intro="Een gasketel plaatsen, laten onderhouden of bij een storing laten nakijken? De gasketel is nog steeds de meest voorkomende verwarmingsoplossing in Vlaamse woningen — betrouwbaar, krachtig en geschikt voor zowel verwarming als warm water. Clima Heat helpt u in Antwerpen en Vlaanderen met de volledige levenscyclus van uw gasketel: het juiste toestel kiezen en correct plaatsen, het wettelijke onderhoud uitvoeren met attest, en storingen gericht opsporen en herstellen. We werken met verschillende merken, waaronder Vaillant, Viessmann, Bulex, Bosch, Junkers, Buderus en Remeha. U krijgt advies dat past bij uw installatie en uw verbruik, in begrijpelijke taal en met een duidelijk voorstel vooraf. Kies hieronder de dienst die u nodig heeft en neem contact met ons op."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Verwarmingsketels", path: "/verwarmingsketels" },
        { name: "Gasketel", path: "/verwarmingsketels/gasketel" },
      ]}
      formSubject="Nieuwe verwarmingsketel / ketel vervangen"
      layout="editorial"
      projectTypes={["Plaatsing", "Onderhoud", "Herstelling"]}
      showSteps={false}
      focus={{
        label: "Van plaatsing tot nazicht",
        title: "Eén toestel, verschillende vragen",
        paragraphs: [
          "Een nieuwe gasketel vraagt een andere aanpak dan een onderhoud of een storing. Bij plaatsing bekijken we de woning en aansluitingen; bij onderhoud staat de toestand van het toestel centraal; bij een defect zoeken we eerst de oorzaak.",
          "Vertel bij uw aanvraag welke van die situaties voor u geldt, zodat we gericht kunnen reageren.",
        ],
        image: { src: placed, alt: "Moderne gasketel met koperen aansluitingen", caption: "Plaatsing" },
        secondImage: { src: maintenance, alt: "Technieker inspecteert een geopend toestel", caption: "Onderhoud" },
      }}
      blocks={[
        {
          h2: "Een nieuwe gasketel plaatsen",
          paragraphs: [
            "We bekijken de warmte- en warmwaterbehoefte, de plaats van het toestel, bestaande aansluitingen en rookgasafvoer. Op basis daarvan adviseren we een passend toestel en leggen we uit wat de plaatsing inhoudt.",
            "Na de installatie controleren we de werking en overlopen we de bediening met u. Heeft u al een merk of model in gedachten? Dan kijken we of het bij uw woning past.",
          ],
        },
        {
          h2: "Onderhoud met attest",
          paragraphs: [
            "Voor centrale gasketels vanaf 20 kW geldt in Vlaanderen een periodieke onderhoudsplicht. We controleren en reinigen het toestel volgens de vereisten, bespreken onze bevindingen en bezorgen het officiële onderhoudsattest.",
            "Vermeld merk, model en laatste onderhoudsdatum bij uw aanvraag. Een bestaande foutcode of uitval vraagt mogelijk eerst om een gericht nazicht.",
          ],
        },
        {
          h2: "Herstelling van uw gasketel",
          paragraphs: ["Bij een defect bekijken we niet alleen de foutmelding, maar ook de mogelijke oorzaak. We bespreken na het nazicht welke herstelling zinvol is en of onderdelen beschikbaar zijn. Bel bij uitval en houd het toesteltype en een eventuele foutcode bij de hand."],
          bullets: [
            "Ketel start niet of valt uit",
            "Geen verwarming of geen warm water",
            "Foutmelding of storing op het display",
            "Drukverlies of steeds bijvullen",
            "Onregelmatige werking of vreemde geluiden",
          ],
        },
        {
          h2: "Ook gasleidingen en warm water",
          paragraphs: [
            "Naast het toestel helpen we bij controle, vernieuwing en keuring van gasleidingen en bij onderhoud van warmwatertoestellen. Vertel welke werkzaamheden u nodig heeft, zodat we de juiste aanpak kunnen bespreken.",
          ],
        },
        {
          h2: "Welke vraag stelt u het best?",
          paragraphs: ["Werkt uw toestel normaal en is het tijd voor periodiek onderhoud? Vraag dan een onderhoudsafspraak aan. Staat er een foutcode op het display of valt de warmte weg, beschrijf de storing en bel voor een nazicht. Voor een nieuwe installatie bespreken we eerst uw woning en warmwatergebruik."],
        },
        {
          h2: "Een gasketel die past bij uw woning",
          paragraphs: ["Niet elke gasketel is geschikt voor elke woning. De warmtevraag van uw huis, de hoeveelheid warm water die u gebruikt en de bestaande leidingen bepalen mee welk toestel zinvol is. Daarom bekijken we eerst uw situatie voordat we een toestel voorstellen.", "U krijgt uitleg over de verschillen tussen de mogelijkheden, zodat u zelf kunt kiezen. We stellen geen toestel voor dat niet bij uw gebruik past."],
        },
      ]}
      faq={faq}
      finalCta={{
        title: "Gasketel plaatsen, onderhouden of herstellen?",
        text: "Vraag een offerte voor een nieuwe gasketel, plan onderhoud met attest of bel ons bij een storing.",
      }}
    />
  );
}
