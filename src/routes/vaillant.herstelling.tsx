import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, ProblemGrid } from "../components/ServicePage";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "../lib/seo";
import { company } from "../lib/site";
import maintenance from "@/assets/stock-error-check.jpg";
import technician from "@/assets/stock-connection-test.jpg";
import heroVideo from "@/assets/videos/vaillant-herstelling.mp4.asset.json";
import heroPoster from "@/assets/videos/vaillant-herstelling-poster.jpg";

const faq = [
  {
    q: "Mijn Vaillant ketel geeft een foutcode, wat betekent dat?",
    a: `Noteer de volledige code en bel ${company.phone}. De code is een startpunt voor het nazicht, maar de oorzaak kunnen we pas na controle van het toestel bevestigen.`,
  },
  {
    q: "Kan een herstelling nog zinvol zijn bij een oudere ketel?",
    a: "Vaak wel. We bekijken de leeftijd, het defect en de beschikbaarheid van onderdelen en zeggen eerlijk of herstellen of vervangen het meest zinvol is.",
  },
  {
    q: "Wat kan ik zelf al nakijken?",
    a: "Controleer alleen wat veilig kan: of de ketel stroom heeft, welke druk het display aangeeft en welke code zichtbaar is. Open het toestel niet zelf. Ruikt u gas? Verlaat de ruimte, vermijd schakelaars en volg de instructies van uw gasnetbeheerder.",
  },
  {
    q: "Werken jullie in mijn gemeente?",
    a: `We werken in ${company.serviceArea}.`,
  },
] as const;

export const Route = createFileRoute("/vaillant/herstelling")({
  head: () => ({
    ...pageMeta({
      title: "Vaillant herstelling bij storing of defect | Clima Heat",
      description:
        "Vaillant ketel defect of storing? Clima Heat kijkt uw Vaillant installatie professioneel na in Antwerpen en Vlaanderen. Bel voor een herstelling.",
      path: "/vaillant/herstelling",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          serviceSchema({
            name: "Vaillant herstelling",
            description: "Herstelling van defecten en storingen op Vaillant verwarmingsketels.",
            path: "/vaillant/herstelling",
          }),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Vaillant", path: "/vaillant" },
            { name: "Vaillant herstelling", path: "/vaillant/herstelling" },
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
      eyebrow="Vaillant herstelling"
      h1="Vaillant ketel defect of in storing?"
      intro="Geeft uw Vaillant ketel een foutcode, valt de verwarming uit of blijft het water koud? Bij een Vaillant storing maakt merkspecialisatie het verschil: wie de toestellen dagelijks openlegt, herkent patronen en vindt de oorzaak sneller. Clima Heat onderzoekt de storing gericht — van de bekende foutcodes tot minder voor de hand liggende defecten aan brander, pomp, driewegklep of elektronica. U krijgt daarna een eerlijke inschatting: is herstel zinvol en wat kost dat, of is het toestel aan vervanging toe? Bel met de foutcode en het toesteltype, of vul het herstellingsformulier in. Met die gegevens kan de technieker zich voorbereiden, wat de kans vergroot dat de herstelling in één bezoek rond is."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Vaillant", path: "/vaillant" },
        { name: "Vaillant herstelling", path: "/vaillant/herstelling" },
      ]}
      urgent
      formVariant="herstelling"
      showBrands={false}
      layout="sequence"
      projectTypes={["Herstelling", "Onderhoud"]}
      showSteps={false}
      focus={{
        label: "Onderzoek aan het toestel",
        title: "Een Vaillant foutcode is een aanwijzing, geen conclusie",
        paragraphs: [
          "Noteer de code exact zoals die op het display staat, samen met het toesteltype en wat u merkt aan verwarming en warm water. Zo kunnen we de klacht gericht bespreken. De daadwerkelijke oorzaak bevestigen we pas na controle.",
          "Welke onderdelen bij uw storing aandacht nodig hebben, hangt af van de diagnose.",
        ],
        image: { src: maintenance, alt: "Technieker leest een foutmelding af op een ketel", caption: "Storingsonderzoek" },
        secondImage: { src: technician, alt: "Technieker meet aansluitingen onder een ketel", caption: "Technisch nazicht" },
      }}
      extra={
        <ProblemGrid
          title="Klachten waarmee mensen ons bellen"
          items={[
            "Ketel start niet",
            "Geen verwarming",
            "Geen warm water",
            "Foutmelding of storingscode",
            "Drukproblemen of steeds bijvullen",
            "Onregelmatige werking of lawaai",
          ]}
        />
      }
      blocks={[
        {
          h2: "Wat we nakijken",
          paragraphs: ["Een storingscode helpt om het onderzoek te richten, maar verklaart niet altijd waarom het probleem ontstaat. Daarom combineren we de melding met een controle van de relevante onderdelen en de werking van het toestel."],
          bullets: [
            "De melding of foutcode op uw toestel",
            "Waterdruk, ontsteking en warmwaterwerking",
            "Vervuiling en versleten onderdelen",
            "Instellingen en afregeling van de ketel",
          ],
        },
        {
          h2: "Herstellen of toch vervangen?",
          paragraphs: [
            "We bekijken de oorzaak, de toestand van het toestel en de beschikbaarheid van onderdelen. Is een herstelling zinvol, dan bespreken we die met u. Lijkt vervanging verstandiger, dan leggen we uit waarom, zonder u een nieuw toestel op te dringen.",
          ],
        },
        {
          h2: "Wat u kunt doorgeven bij uw aanvraag",
          bullets: [
            "Het type Vaillant toestel",
            "De foutmelding op het display",
            "Sinds wanneer het probleem er is",
            "Of het om verwarming, warm water of beide gaat",
          ],
        },
        {
          h2: "Van aanvraag tot oplossing",
          paragraphs: [
            `Bij een defecte Vaillant ketel is bellen de kortste weg: ${company.phone}. We bespreken uw klacht en een mogelijk nazicht. Na de diagnose krijgt u uitleg over de volgende stap voordat extra werk wordt uitgevoerd. Kunt u niet bellen? Gebruik dan het formulier.`,
          ],
        },
        {
          h2: "Wat u intussen veilig kunt nakijken",
          paragraphs: ["Kijk of er stroom is en noteer de weergegeven druk en foutcode. Laat het toestel verder gesloten. Bij gasgeur verlaat u de ruimte, bedient u geen schakelaars en volgt u de instructies van uw gasnetbeheerder. Meld bij uw aanvraag ook of het probleem steeds terugkeert of eenmalig optrad."],
        },
        {
          h2: "Een Vaillant storing gericht laten onderzoeken",
          paragraphs: ["Vaillant ketels tonen bij een probleem vaak een code op het display. Die code vertelt welk deel van de werking aandacht vraagt, maar niet altijd waarom. Daarom combineren we de melding met een controle van het toestel.", "Na de diagnose weet u wat er aan de hand is en welke herstelling nodig is. Pas na uw akkoord voeren we het werk uit."],
        },
        {
          h2: "Storing op een ketel van een ander merk?",
          paragraphs: ["Vaillant is onze specialiteit, maar we herstellen ook ketels van Viessmann, Bulex, Bosch, Junkers, Buderus en Remeha. Bel met de foutcode en het toesteltype of vul het formulier in; de werkwijze blijft hetzelfde: eerst de oorzaak achterhalen, dan pas werken."],
        },
      ]}
      faq={faq}
      faqTitle="Vragen bij een Vaillant storing"
      finalCta={{
        title: "Probleem met uw Vaillant ketel?",
        text: "Bel ons of vul het korte formulier in. We bekijken samen wat de juiste stap is.",
      }}
    />
  );
}
