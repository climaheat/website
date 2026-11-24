import { createFileRoute } from "@tanstack/react-router";
import { ProblemGrid, ServicePage } from "../components/ServicePage";
import { BrandGrid } from "../components/sections";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "../lib/seo";
import { company } from "../lib/site";
import technician from "@/assets/stock-repair-diagnostics.jpg";
import maintenance from "@/assets/stock-open-boiler.jpg";
import heroVideo from "@/assets/videos/herstellingen.mp4.asset.json";
import heroPoster from "@/assets/videos/herstellingen-poster.jpg";

const faq = [
  {
    q: "Kan ik Clima Heat bellen voor een storing?",
    a: `Ja. Bel ${company.phone} en vertel welk merk en type toestel u heeft, wat er misloopt en welke foutcode u ziet. We bespreken de volgende stap en de planning met u.`,
  },
  {
    q: "Wat kan ik zelf al nakijken?",
    a: "Controleer alleen wat veilig kan: of het toestel stroom heeft, welke waterdruk het display aangeeft en of een foutcode zichtbaar is. Open de ketel niet zelf. Ruikt u gas? Verlaat de ruimte, vermijd schakelaars en volg de instructies van uw gasnetbeheerder.",
  },
  {
    q: "Herstellen jullie alle merken?",
    a: "We herstellen gasketels, stookolieketels en warmwatertoestellen van verschillende gangbare merken, waaronder Vaillant, Viessmann, Bulex, Bosch, Junkers, Buderus en Remeha. Geef merk, type en foutcode door, zodat we kunnen inschatten hoe we u kunnen helpen.",
  },
  {
    q: "Wat als herstellen niet meer zinvol is?",
    a: "Dan zeggen we dat eerlijk en bekijken we samen een vervanging. U beslist, wij geven het advies.",
  },
  {
    q: "In welke regio komen jullie?",
    a: `In ${company.serviceArea}.`,
  },
  {
    q: "Wat kost een herstelling van een verwarmingsketel?",
    a: "Zonder diagnose is de oorzaak niet betrouwbaar vast te stellen. De kost hangt af van het nazicht, de benodigde onderdelen en het herstelwerk. We bespreken de bevindingen en de vervolgstap met u voordat er extra werk gebeurt.",
  },
] as const;

export const Route = createFileRoute("/herstellingen")({
  head: () => ({
    ...pageMeta({
      title: "Verwarmingsketel defect? Herstelling | Clima Heat Antwerpen",
      description:
        "Ketel start niet, geen verwarming of geen warm water? Clima Heat kijkt uw verwarmingsketel professioneel na in Antwerpen en Vlaanderen. Bel voor een herstelling.",
      path: "/herstellingen",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          serviceSchema({
            name: "Herstelling verwarmingsketel",
            description:
              "Herstelling van defecten en storingen aan verwarmingsketels en warmwatertoestellen.",
            path: "/herstellingen",
          }),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Herstellingen", path: "/herstellingen" },
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
      eyebrow="Herstellingen"
      h1="Probleem met uw verwarmingsketel?"
      intro="Geen verwarming, geen warm water of een foutcode op het display? Een storing komt nooit gelegen, en zeker niet in de winter. Clima Heat onderzoekt de oorzaak gericht: we gaan niet zomaar onderdelen vervangen, maar zoeken eerst uit waarom het toestel faalt. Daarna krijgt u een eerlijke inschatting of herstellen zinvol is, of dat vervanging op termijn verstandiger is. We werken aan gasketels, stookolieketels en warmwatertoestellen van verschillende merken, zoals Vaillant, Viessmann, Bulex, Bosch, Junkers, Buderus en Remeha. Bel met uw toestelgegevens en de foutcode — zo kan de technieker zich voorbereiden en is de kans groter dat de herstelling in één bezoek lukt. Actief in Antwerpen en heel Vlaanderen."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Verwarmingsketels", path: "/verwarmingsketels" },
        { name: "Herstellingen", path: "/herstellingen" },
      ]}
      urgent
      formVariant="herstelling"
      layout="editorial"
      projectTypes={["Herstelling", "Onderhoud", "Interventie"]}
      showSteps={false}
      showBrands={false}
      focus={{
        label: "Gericht nazicht",
        title: "De klacht is het begin van de diagnose",
        paragraphs: [
          "Geen warm water kan verschillende oorzaken hebben. Een foutcode of een drukwaarde helpt ons het onderzoek voor te bereiden, maar vertelt niet altijd welk onderdeel aandacht vraagt. Open het toestel daarom niet zelf.",
          "We beoordelen uw eigen installatie ter plaatse voordat we een herstelling adviseren.",
        ],
        image: { src: technician, alt: "Technieker onderzoekt een storing aan een ketel", caption: "Diagnose" },
        secondImage: { src: maintenance, alt: "Geopende ketel met technische onderdelen", caption: "Geopend toestel" },
      }}
      extra={
        <>
        <ProblemGrid
          title="Waarmee mensen ons bellen"
          items={[
            "Ketel start niet",
            "Geen verwarming",
            "Geen warm water",
            "Foutmelding of storing",
            "Drukproblemen",
            "Onregelmatige werking",
          ]}
        />
        <BrandGrid
          title="Merken die we herstellen"
          intro="We kijken storingen na aan verwarmingsketels en warmwatertoestellen van onder meer deze merken. Geef bij uw aanvraag het merk, het type en de foutcode door, dan bereiden we het nazicht gericht voor."
        />
        </>
      }
      blocks={[
        {
          h2: "Van symptoom naar oorzaak",
          paragraphs: ["Een foutmelding is een aanwijzing, geen volledige diagnose. We bekijken de klacht in samenhang met de waterdruk, ontsteking, warmwatervoorziening en toestand van het toestel. Pas na het nazicht kunnen we zeggen welke ingreep passend is."],
          bullets: [
            "De melding of foutcode op uw toestel",
            "Ontsteking, waterdruk en warmwaterwerking",
            "Vervuiling en versleten onderdelen",
            "Instellingen en afregeling",
          ],
        },
        {
          h2: "Wat kunt u vooraf doorgeven?",
          paragraphs: [
            `Bel ${company.phone} en geef het merk, toesteltype, de foutcode en uw postcode door. Vertel sinds wanneer het probleem speelt en of zowel verwarming als warm water uitvalt. Een foto van het display kan helpen bij de voorbereiding.`,
          ],
        },
        {
          h2: "Ketels en merken die we herstellen",
          paragraphs: ["We herstellen toestellen van verschillende verwarmingsmerken; hieronder ziet u ze elk afzonderlijk. Of een herstelling mogelijk is, hangt af van het toesteltype, de oorzaak en de beschikbaarheid van onderdelen."],
          bullets: [
            "Gasketels",
            "Stookolieketels",
            "Warmwatertoestellen",
          ],
        },
        {
          h2: "Herstellen of vervangen?",
          paragraphs: [
            "Een storing betekent niet automatisch dat een nieuwe ketel nodig is. We bekijken het defect, de toestand van het toestel en de beschikbaarheid van onderdelen. Daarna leggen we uit welke opties er zijn; u beslist of we de herstelling uitvoeren.",
          ],
        },
        {
          h2: "Veilig wachten op een nazicht",
          paragraphs: ["Noteer wat het display aangeeft en wanneer het probleem begon. Controleer alleen wat veilig zichtbaar is, zoals stroom en de weergegeven druk; open de ketel niet. Ruikt u gas, verlaat dan de ruimte, vermijd schakelaars en volg de instructies van uw gasnetbeheerder."],
        },
        {
          h2: "Herstelling van uw verwarmingsketel: hoe we te werk gaan",
          paragraphs: ["Een ketel die niet meer opstart of geen warm water geeft, kan verschillende oorzaken hebben: een drukprobleem, een ontstekingsprobleem, een defect onderdeel of een verkeerde instelling. We beginnen daarom met de symptomen en de melding op het display, en controleren daarna de onderdelen die daarbij horen.", "Zodra de oorzaak duidelijk is, bespreken we de mogelijke herstelling. Als een onderdeel vervangen moet worden, hoort u dat vooraf. Zo beslist u zelf, met de nodige uitleg."],
        },
        {
          h2: "Wanneer belt u best meteen?",
          paragraphs: ["Heeft u helemaal geen verwarming of warm water, of valt de ketel steeds opnieuw uit, bel dan rechtstreeks. Aan de telefoon kunnen we de klacht beter inschatten dan via een formulier en bespreken we meteen de mogelijkheden voor een nazicht.", "Ruikt u gas, dan belt u niet eerst ons: verlaat de ruimte, bedien geen schakelaars en volg de instructies van uw gasnetbeheerder."],
        },
      ]}
      faq={faq}
      faqTitle="Vragen bij een storing"
      finalCta={{
        title: "Uw ketel laten nakijken?",
        text: "Bel ons of vul het korte formulier in. We bekijken samen wat de juiste stap is.",
      }}
    />
  );
}
