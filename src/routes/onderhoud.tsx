import { createFileRoute, Link } from "@tanstack/react-router";
import { PriceSummary } from "../components/Pricing";
import { Button } from "../components/ui/button";
import { PRICES, euros } from "../lib/pricing";
import { ServicePage } from "../components/ServicePage";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "../lib/seo";
import { company } from "../lib/site";
import maintenance from "@/assets/stock-component-cleaning.jpg";
import technician from "@/assets/stock-pressure-maintenance.jpg";
import heroVideo from "@/assets/videos/onderhoud.mp4.asset.json";
import heroPoster from "@/assets/videos/onderhoud-poster.jpg";

const faq = [
  {
    q: "Hoe vaak moet een gasketel onderhouden worden?",
    a: "Voor een centrale verwarmingsketel op gas met een vermogen vanaf 20 kW is in Vlaanderen om de twee jaar een onderhoud door een erkende technicus vereist. Het attest toont aan dat dit onderhoud is uitgevoerd. Twijfelt u over uw toestel? Geef het type door bij uw aanvraag.",
  },
  {
    q: "Welke toestellen onderhoudt Clima Heat?",
    a: "We onderhouden gasketels, stookolieketels en warmwatertoestellen van verschillende gangbare merken. Daaronder vallen onder meer Vaillant, Viessmann, Bulex, Bosch, Junkers, Buderus en Remeha. Geef het merk en type door bij uw aanvraag.",
  },
  {
    q: "Wat kost een onderhoud?",
    a: `Standaard gasketelonderhoud kost ${euros(PRICES.gas.net)} excl. btw. Onderhoud stookolieketel (mazoutketel) kost ${euros(PRICES.oil.net)} excl. btw. Vanaf 3 stookolieketels in dezelfde straat geldt ${euros(PRICES.oil.tiers[0].net)} excl. btw per ketel. Wisselstukken en materialen zijn niet inbegrepen; eventuele bijkomende werkzaamheden bespreken we vooraf.`,
  },
  {
    q: "Krijg ik een attest na het onderhoud?",
    a: "Ja. U ontvangt het officiële onderhoudsattest, conform de Vlaamse wetgeving.",
  },
  {
    q: "Kan een kleine herstelling meteen mee?",
    a: `Meld de klacht bij uw aanvraag of bel ${company.phone}. Dan kunnen we nagaan wat tijdens de afspraak mogelijk is; extra werk bespreken we eerst met u.`,
  },
  {
    q: "Wat is het verschil tussen onderhoud en herstelling?",
    a: "Bij onderhoud controleren en reinigen we een werkend toestel volgens de vereisten. Werkt uw ketel niet, geeft hij een foutcode of heeft u geen warm water? Vraag dan een herstelling aan, zodat we de storing gericht kunnen onderzoeken.",
  },
] as const;

export const Route = createFileRoute("/onderhoud")({
  head: () => ({
    ...pageMeta({
      title: "Onderhoud gasketel & stookolieketel Antwerpen | Clima Heat",
      description:
        "Onderhoud van uw gasketel of stookolieketel (mazoutketel) in Antwerpen en Vlaanderen. Tarieven inclusief btw, controle en onderhoudsattest. Maak een afspraak.",
      path: "/onderhoud",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          serviceSchema({
            name: "Onderhoud verwarmingsketel",
            description:
              "Periodiek onderhoud van gasketels, stookolieketels en warmwatertoestellen met officieel attest.",
            path: "/onderhoud",
          }),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Onderhoud", path: "/onderhoud" },
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
      eyebrow="Onderhoud · Antwerpen"
      h1="Onderhoud verwarmingsketel in Antwerpen en omgeving"
      intro="Is uw verwarmingsketel aan onderhoud toe? Een regelmatig onderhoud houdt uw toestel veilig, zuinig en betrouwbaar — en het is voor veel toestellen ook wettelijk verplicht. Clima Heat controleert en reinigt uw gasketel, stookolieketel of warmwatertoestel tot in detail: van brander en warmtewisselaar tot veiligheidsvoorzieningen en afstelling. Daarna bespreekt de technieker in begrijpelijke taal wat opviel, wat goed is en wat in de toekomst aandacht vraagt. U ontvangt het officiële onderhoudsattest dat u nodig heeft voor verzekering en keuring. U plant de afspraak eenvoudig met ons, in Antwerpen en heel Vlaanderen — zonder tussenpersonen en zonder lange wachttijden."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Verwarmingsketels", path: "/verwarmingsketels" },
        { name: "Onderhoud", path: "/onderhoud" },
      ]}
      primaryLabel="Plan uw onderhoud"
      formVariant="onderhoud"
      layout="sequence"
      projectTypes={["Onderhoud", "Interventie"]}
      showSteps={false}
      extra={<section className="bg-background"><div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16"><div><p className="eyebrow">Stookolie · mazout</p><h2 className="display-2 mt-5">Onderhoud stookolieketel (mazoutketel)</h2><p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">Ook uw stookolieketel verdient een gericht onderhoud. Bij een mazoutketel kijken we naar de brander, de verbranding en de rookgasafvoer en reinigen en controleren we de onderdelen passend bij uw toestel. Voor centrale verwarmingsketels op stookolie vanaf 20 kW is in Vlaanderen jaarlijks onderhoud vereist. U ontvangt na het onderhoud het officiële attest.</p><p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">De sproeier, dichtingen, andere wisselstukken en materialen zijn niet inbegrepen. Bijkomende kosten bespreken we vooraf. Wilt u samen met buren onderhoud aanvragen voor minstens drie ketels in dezelfde straat? Vermeld dit bij uw aanvraag. Uw afspraak is pas definitief na onze bevestiging.</p><Button asChild variant="outline" className="cta-secondary mt-6"><Link to="/tarieven" hash="stookolieketelonderhoud">Bekijk de stookolietarieven <span aria-hidden="true">→</span></Link></Button></div><PriceSummary priceKey="oil" /></div></section>}
      focus={{
        label: "Tijdens het onderhoud",
        title: "Meer dan een snelle blik op het toestel",
        paragraphs: [
          "Bij een onderhoud gaat het om reinigen, controleren en beoordelen volgens het type toestel. De precieze handelingen hangen af van de installatie. Wat ons opvalt, bespreken we met u; het attest hoort bij het uitgevoerde onderhoud.",
          "Een storing die u al kende, vermeldt u het best bij de aanvraag. Dan kunnen we bespreken of een onderhoudsafspraak of eerst een gericht nazicht past.",
        ],
        image: { src: maintenance, alt: "Technieker reinigt onderdelen van een geopende ketel", caption: "Onderhoud" },
        secondImage: { src: technician, alt: "Technieker controleert de druk bij een ketel", caption: "Controle" },
      }}
      blocks={[
        {
          h2: "Waarom regelmatig onderhoud belangrijk is",
          paragraphs: ["Een ketel die jarenlang zonder nazicht draait, kan vervuilen of slijten zonder dat u het meteen merkt. Met regelmatig onderhoud houdt u zicht op de toestand van uw toestel."],
          bullets: [
            "Veiligheid: controle van verbranding en rookgasafvoer",
            "Efficiëntie: een schone ketel werkt zoals bedoeld, wat uw verbruik ten goede komt",
            "Minder kans op storingen, zeker vlak voor de winter",
          ],
        },
        {
          h2: "Wat wordt er nagekeken?",
          paragraphs: ["De technieker bekijkt de toestand van het toestel, reinigt onderdelen waar dat nodig is en controleert de werking. Welke metingen vereist zijn, hangt af van het toestel en de brandstof."],
          bullets: [
            "Controle van de werking en zichtbare toestand",
            "Reiniging en metingen passend bij het toestel",
            "Nazicht van druk, aansluitingen en afvoer",
            "Bespreking van bevindingen en mogelijk vervolgwerk",
          ],
        },
        {
          h2: "Periodiek onderhoud en attest",
          paragraphs: [
            "In Vlaanderen geldt voor centrale verwarmingsketels op gas vanaf 20 kW een periodiek onderhoud om de twee jaar; voor stookolie vanaf 20 kW jaarlijks. Na het onderhoud ontvangt u het attest, dat u bewaart als bewijs.",
            "Twijfelt u welke regel op uw toestel van toepassing is? Geef het type door bij uw aanvraag.",
          ],
        },
        {
          h2: "Welke toestellen en merken?",
          paragraphs: ["We onderhouden toestellen van verschillende verwarmingsmerken, waaronder Vaillant, Viessmann, Bulex, Bosch, Junkers, Buderus en Remeha. Vermeld bij uw aanvraag altijd het merk, het type en de brandstof; zo kunnen we uw vraag juist inschatten en de afspraak gericht voorbereiden."],
          bullets: [
            "Gasketels en condensatieketels",
            "Stookolieketels",
            "Warmwatertoestellen",
          ],
        },
        {
          h2: "Hoe verloopt een afspraak?",
          bullets: [
            `Bel ${company.phone} of vul het formulier in`,
            "Geef postcode, merk, type en datum van het laatste onderhoud door",
            "We spreken een moment af dat u past",
            "Na het onderhoud krijgt u uitleg en het attest",
          ],
        },
        {
          h2: "Werkgebied",
          paragraphs: [`We onderhouden verwarmingsketels in Antwerpen en omgeving, en in ${company.serviceArea}. Twijfelt u of we tot bij u komen? Stuur gerust een berichtje.`],
        },
        {
          h2: "Onderhoud van uw gasketel: wat merkt u ervan?",
          paragraphs: ["Tijdens een onderhoud van uw gasketel is het toestel een tijd buiten werking. Zorg dat de ketel vrij bereikbaar is en dat er wat ruimte rond het toestel is. Na het onderhoud wordt de ketel opnieuw opgestart en gecontroleerd op een correcte werking.", "U krijgt na afloop uitleg over wat we hebben vastgesteld. Zijn er onderdelen die slijtage vertonen, dan hoort u dat meteen, zodat u later niet voor verrassingen komt te staan."],
        },
        {
          h2: "Wanneer plant u het onderhoud best?",
          paragraphs: ["Veel mensen denken pas aan onderhoud wanneer de verwarming weer aan moet. Door het onderhoud tijdig te plannen, bijvoorbeeld voor het stookseizoen, heeft u meer keuze in afspraakmomenten en weet u dat de ketel klaar is voor de koude maanden.", "Weet u niet meer wanneer het laatste onderhoud plaatsvond? Kijk op uw vorige attest of op een sticker aan het toestel. Vindt u niets terug, vermeld dat dan gewoon bij uw aanvraag."],
        },
      ]}
      faq={faq}
      faqTitle="Vragen over onderhoud"
      finalCta={{
        title: "Plan het onderhoud van uw ketel",
        text: "Laat weten welk toestel u heeft en waar u woont. We nemen contact op voor een afspraak.",
      }}
    />
  );
}
