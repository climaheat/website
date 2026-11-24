import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "../components/ServicePage";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "../lib/seo";
import { company } from "../lib/site";
import placed from "@/assets/stock-utility-room.jpg";
import technician from "@/assets/stock-install-review.jpg";
import heroVideo from "@/assets/videos/verwarmingsketels.mp4.asset.json";
import heroPoster from "@/assets/videos/verwarmingsketels-poster.jpg";

const faq = [
  {
    q: "Wat kost een nieuwe verwarmingsketel?",
    a: "De prijs hangt af van het type toestel, het benodigde vermogen, de warmwaterbehoefte en de aanpassingen aan uw bestaande installatie. We bekijken uw situatie en lichten in een voorstel toe welk werk voorzien is.",
  },
  {
    q: "Hoelang duurt de plaatsing van een verwarmingsketel?",
    a: "Dat hangt af van de plaats van het toestel, de aansluitingen en de eventuele aanpassingen aan leidingen of rookgasafvoer. We bespreken de uitvoering en planning nadat we de installatie hebben bekeken.",
  },
  {
    q: "Welke merken plaatst Clima Heat?",
    a: "We werken met verschillende gangbare merken, waaronder Vaillant, Viessmann, Bulex, Bosch, Junkers, Buderus en Remeha. Geef bij uw aanvraag altijd het merk en type door, zodat we uw vraag juist kunnen inschatten.",
  },
  {
    q: "Krijg ik een attest na de plaatsing?",
    a: "Welke documenten nodig zijn, hangt af van het toestel en de uitgevoerde werken. We bespreken bij het voorstel welke keuring of documentatie van toepassing is; bij periodiek onderhoud bezorgen we het officiële onderhoudsattest.",
  },
  {
    q: "In welke regio plaatsen jullie verwarmingsketels?",
    a: `In ${company.serviceArea}. Twijfelt u of uw gemeente erbij hoort? Bel ${company.phone} of stuur een bericht.`,
  },
] as const;

export const Route = createFileRoute("/verwarmingsketels/")({
  head: () => ({
    ...pageMeta({
      title: "Verwarmingsketel plaatsen of vervangen | Clima Heat Antwerpen",
      description:
        "Verwarmingsketel plaatsen of vervangen in Antwerpen en Vlaanderen. Advies op maat van uw woning en verbruik, duidelijk voorstel. Vraag vrijblijvend een offerte.",
      path: "/verwarmingsketels",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          serviceSchema({
            name: "Verwarmingsketel plaatsen en vervangen",
            description:
              "Plaatsing en vervanging van verwarmingsketels voor particuliere woningen in Antwerpen en Vlaanderen.",
            path: "/verwarmingsketels",
          }),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Verwarmingsketels", path: "/verwarmingsketels" },
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
      eyebrow="Verwarmingsketels"
      h1="Verwarmingsketel plaatsen of vervangen"
      intro="Een verwarmingsketel kiezen vraagt meer dan een blik op het vermogen. Het juiste toestel hangt af van uw woning, uw gezin en de manier waarop u verwarming en warm water gebruikt. Een te klein toestel laat u in de kou staan op koude dagen; een te groot toestel verbruikt onnodig veel en slijt sneller. Daarom begint Clima Heat nooit bij het toestel, maar bij uw situatie. We bekijken uw bestaande installatie, de staat van leidingen en rookgasafvoer, uw warmte- en warmwaterbehoefte en de beschikbare plaats in uw woning. Op basis daarvan krijgt u begrijpelijk advies in gewone taal: welk type ketel past, welk vermogen nodig is en welke aanpassingen eventueel moeten gebeuren. U ontvangt een duidelijk voorstel voor plaatsing of vervanging, zonder verrassingen achteraf. We werken met verschillende gangbare merken, waaronder Vaillant, Viessmann, Bulex, Bosch, Junkers, Buderus en Remeha. Voor plaatsing, onderhoud en herstellingen kunt u bij ons terecht, welk merk u ook heeft."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Verwarmingsketels", path: "/verwarmingsketels" },
      ]}
      formSubject="Nieuwe verwarmingsketel / ketel vervangen"
      layout="editorial"
      projectTypes={["Plaatsing", "Interventie", "Sanitair"]}
      focus={{
        label: "De installatie in beeld",
        title: "Eerst de woning begrijpen, dan het toestel kiezen",
        paragraphs: [
          "Een goede keuze begint bij uw bestaande leidingen, de ruimte rond de ketel en de manier waarop u warm water gebruikt. Daarom kijken we verder dan het vermogen op het typeplaatje van de oude installatie.",
          "De situatie in uw woning bepaalt welke aansluitingen en voorbereiding nodig zijn.",
        ],
        image: { src: placed, alt: "Ketel in een lichte technische ruimte", caption: "Verwarmingsinstallatie" },
        secondImage: { src: technician, alt: "Technieker bekijkt een ketelinstallatie", caption: "Voorbereiding" },
      }}
      blocks={[
        {
          h2: "Wanneer is vervangen zinvoller dan herstellen?",
          paragraphs: [
            "Niet elke storing is een reden om de ketel te vervangen. We kijken naar de toestand van het toestel, de oorzaak van terugkerende problemen en de beschikbaarheid van onderdelen. Daarna bespreken we of herstel nog zinvol is.",
          ],
          bullets: [
            "De ketel geeft steeds vaker storing",
            "Onderdelen zijn moeilijk of niet meer verkrijgbaar",
            "Het toestel is verouderd en past niet meer bij uw comfortbehoefte",
            "U hoort of merkt dat de ketel onregelmatig werkt",
            "U verbouwt of vernieuwt uw verwarmingsinstallatie",
          ],
        },
        {
          h2: "Welke ketel past bij uw woning?",
          paragraphs: ["Een woning met één douche stelt andere eisen aan warm water dan een huis met meerdere badkamers. Ook de bestaande radiatoren, leidingen en plaats voor de ketel tellen mee. We vergelijken de mogelijkheden op comfort, benodigde aanpassingen en onderhoud, niet alleen op de aanschafprijs."],
          bullets: ["Voldoende verwarmingsvermogen, zonder zomaar groter te kiezen", "Warmwatercomfort afgestemd op uw dagelijkse gebruik", "Aansluitingen, afvoer en beschikbare plaats", "Een toestel dat bij uw installatie past"],
        },
        {
          h2: "Advies op maat van uw woning",
          paragraphs: [
            "Het duurste toestel is niet automatisch het juiste. We vragen wat u nu heeft, wat er niet goed werkt en wat u van uw verwarming verwacht. Bij een vervanging bekijken we ook of de bestaande aansluitingen en rookgasafvoer geschikt zijn.",
            "U krijgt uitleg over het voorgestelde toestel en de werkzaamheden. Twijfelt u nog tussen herstellen en vervangen? Dan bespreken we die keuze eerst.",
          ],
        },
        {
          h2: "Zo verloopt de plaatsing",
          bullets: [
            "We bekijken de bestaande installatie en de aansluitingen",
            "De bestaande ketel wordt veilig afgekoppeld",
            "De nieuwe ketel wordt geplaatst en afgeregeld",
            "We testen de werking en overlopen het gebruik met u",
            "We leggen uit welke controles en onderhoud later nodig zijn",
          ],
        },
        {
          h2: "Wat staat er in uw voorstel?",
          paragraphs: ["Een voorstel moet u helpen om het werk te begrijpen, niet alleen een toestel te vergelijken. We lichten toe welke ketel we voorstellen, waarom die bij uw woning past en welke aanpassingen aan aansluitingen of afvoer nodig kunnen zijn. Ook de uitvoering en planning bespreken we vooraf."],
        },
        {
          h2: "Plaatsen, vervangen, onderhouden of herstellen",
          paragraphs: ["Een verwarmingsketel doorloopt verschillende fasen: de keuze en plaatsing, het periodieke onderhoud, af en toe een herstelling en uiteindelijk de vervanging. Clima Heat helpt u in elk van die fasen, met hetzelfde aanspreekpunt.", "Twijfelt u welke stap bij uw situatie past? Beschrijf kort hoe oud uw toestel is en wat u merkt. Dan adviseren we u welke aanpak het meest zinvol is."],
        },
        {
          h2: "Verwarmingsketels van verschillende merken",
          paragraphs: ["Clima Heat werkt met verschillende verwarmingsmerken, waaronder Vaillant, Viessmann, Bulex, Bosch, Junkers, Buderus en Remeha. U hoeft dus niet van merk te veranderen om bij ons terecht te kunnen.", "Het merk alleen bepaalt niet wat uw installatie nodig heeft. Geef daarom ook het toesteltype, de brandstof en de leeftijd van de ketel door. Zo kunnen we vooraf beter beoordelen of uw vraag over plaatsing, onderhoud of herstelling gaat en hoe we die het best aanpakken."],
        },
      ]}
      faq={faq}
      finalCta={{
        title: "Klaar voor een nieuwe verwarmingsketel?",
        text: "Vertel welk toestel u nu heeft en wat u wilt verbeteren. We bespreken de mogelijkheden en een passend voorstel.",
      }}
    />
  );
}
