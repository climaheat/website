import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "../components/ServicePage";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "../lib/seo";
import { company } from "../lib/site";
import maintenance from "@/assets/stock-burner-service.jpg";
import heroVideo from "@/assets/videos/vaillant-onderhoud.mp4.asset.json";
import heroPoster from "@/assets/videos/vaillant-onderhoud-poster.jpg";

const faq = [
  {
    q: "Hoe vaak moet een Vaillant ketel onderhouden worden?",
    a: "Voor een centrale verwarmingsketel op gas vanaf 20 kW is in Vlaanderen om de twee jaar onderhoud door een erkende technicus verplicht. We bezorgen het officiële attest na het onderhoud. Vermeld het type toestel als u twijfelt welke regels gelden.",
  },
  {
    q: "Wat gebeurt er tijdens het onderhoud?",
    a: "We controleren de werking, reinigen onderdelen waar dat nodig is en voeren metingen uit passend bij het toestel. We bespreken onze bevindingen en bezorgen het onderhoudsattest na het uitgevoerde onderhoud.",
  },
  {
    q: "Krijg ik een attest?",
    a: "Ja, na het onderhoud ontvangt u het officiële onderhoudsattest.",
  },
  {
    q: "Kan het onderhoud samen met een kleine herstelling?",
    a: `Meld de klacht bij uw aanvraag of bel ${company.phone}. We bekijken vooraf of nazicht en onderhoud samen kunnen en bespreken eventueel extra werk eerst met u.`,
  },
] as const;

export const Route = createFileRoute("/vaillant/onderhoud")({
  head: () => ({
    ...pageMeta({
      title: "Vaillant onderhoud met attest | Clima Heat Solutions",
      description:
        "Vaillant ketel laten onderhouden in Antwerpen en Vlaanderen. Periodiek onderhoud met officieel attest door een erkende technieker. Plan uw onderhoud.",
      path: "/vaillant/onderhoud",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          serviceSchema({
            name: "Vaillant onderhoud",
            description: "Periodiek onderhoud van Vaillant verwarmingsketels met officieel attest.",
            path: "/vaillant/onderhoud",
          }),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Vaillant", path: "/vaillant" },
            { name: "Vaillant onderhoud", path: "/vaillant/onderhoud" },
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
      eyebrow="Vaillant onderhoud"
      h1="Onderhoud van uw Vaillant ketel"
      intro="Uw Vaillant ketel laten onderhouden in Antwerpen of Vlaanderen? Een Vaillant toestel verdient een technieker die het merk echt kent. Clima Heat is gespecialiseerd in Vaillant en weet precies waar een onderhoud bij uw model om draait: van het reinigen van brander en warmtewisselaar tot het controleren van veiligheidsvoorzieningen, druk en afstelling. Na het onderhoud bespreekt de technieker de technische bevindingen in gewone taal en ontvangt u het officiële attest — belangrijk voor uw verzekering en de wettelijke verplichtingen. U plant de afspraak eenvoudig met ons, zonder tussenkomst van een callcenter. Zo weet u zeker dat uw Vaillant weer een jaar veilig en zuinig draait."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Vaillant", path: "/vaillant" },
        { name: "Vaillant onderhoud", path: "/vaillant/onderhoud" },
      ]}
      primaryLabel="Plan uw onderhoud"
      formVariant="onderhoud"
      formSubject="Onderhoud Vaillant ketel"
      showBrands={false}
      layout="sequence"
      projectTypes={["Onderhoud", "Interventie"]}
      showSteps={false}
      focus={{
        label: "Vaillant onderhoud in beeld",
        title: "Een geopend toestel vertelt meer dan een gesloten kast",
        paragraphs: [
          "Tijdens onderhoud wordt de toestand van het toestel beoordeeld en de werking gecontroleerd. Wat gereinigd en gemeten moet worden, verschilt per model en situatie.",
          "Na afloop bespreken we de bevindingen en bezorgen we het officiële attest. Een terugkerende foutcode behandelen we als aparte klacht, niet als iets dat vanzelf verdwijnt door regulier onderhoud.",
        ],
        image: { src: maintenance, alt: "Geopende ketel tijdens onderhoudswerk", caption: "Geopend toestel" },
      }}
      blocks={[
        {
          h2: "Onderhoud van een Vaillant gastoestel",
          paragraphs: ["Een ketel die nog warmte geeft, kan toch aandacht nodig hebben. Tijdens het onderhoud kijken we naar de werking en de toestand van het toestel. Dat is iets anders dan een diagnose van een bestaande storing."],
          bullets: [
            "Controle en reiniging afgestemd op het toestel",
            "Metingen en beoordeling van de werking",
            "Uitleg over wat we vaststellen",
            "Het officiële onderhoudsattest na uitvoering",
          ],
        },
        {
          h2: "Wat het onderhoud omvat",
          paragraphs: [
            "Bij een Vaillant ketel bekijken we de relevante onderdelen en de werking van verwarming en warm water. Wat precies wordt gereinigd en gemeten, hangt af van het toestel en zijn toestand.",
            "Merken we iets op dat om een herstelling vraagt, dan leggen we dat uit voordat er extra werk gebeurt. Zo weet u waarvoor u kiest.",
          ],
        },
        {
          h2: "Een afspraak maken",
          paragraphs: [
            `Vul het formulier in of bel ${company.phone}. Het toesteltype vindt u vaak op het typeplaatje of in de handleiding. Geef ook door wanneer het laatste onderhoud plaatsvond en of er een foutcode zichtbaar is.`,
          ],
        },
        {
          h2: "Attest en vervolgadvies",
          paragraphs: [
            "Na het onderhoud ontvangt u het officiële attest. Bewaar het bij de documenten van uw installatie. Is er een defect of blijft een foutmelding terugkeren? Dan bespreken we een gericht nazicht in plaats van die klacht als regulier onderhoud te behandelen.",
          ],
        },
        {
          h2: "Onderhoud of diagnose?",
          paragraphs: ["Werkt uw toestel normaal en is de periodieke beurt aan de orde, dan plant u een onderhoud. Heeft u geen warm water, valt de ketel uit of verschijnt er een terugkerende foutcode, geef dat vooraf door. Dan bespreken we of eerst een gericht nazicht nodig is."],
        },
        {
          h2: "Uw Vaillant ketel klaarzetten voor het onderhoud",
          paragraphs: ["Zorg dat het toestel vrij bereikbaar is en houd, als u die heeft, het vorige onderhoudsattest bij de hand. Zo zien we wanneer het laatste onderhoud plaatsvond en of er toen opmerkingen waren.", "Merkt u al iets vreemds, zoals een schommelende druk of een melding op het display, vermeld dat dan bij uw aanvraag. Dan houden we er tijdens het onderhoud rekening mee."],
        },
        {
          h2: "Ook onderhoud van andere merken",
          paragraphs: ["Heeft u een ketel van een ander merk, zoals Viessmann, Bulex, Bosch, Junkers, Buderus of Remeha? Ook daarvoor plant u bij ons een onderhoud, met het officiële attest na uitvoering. Vermeld bij uw aanvraag het merk en het type, zodat we met het juiste toestel ernaartoe komen."],
        },
      ]}
      faq={faq}
      faqTitle="Vragen over Vaillant onderhoud"
      finalCta={{
        title: "Plan het onderhoud van uw Vaillant ketel",
        text: "Laat weten welk toestel u heeft. We spreken samen een moment af.",
      }}
    />
  );
}
