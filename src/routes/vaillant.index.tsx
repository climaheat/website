import { createFileRoute } from "@tanstack/react-router";
import { ChoiceCards } from "../components/PageHero";
import { ServicePage } from "../components/ServicePage";
import { Section, Eyebrow, CallButton } from "../components/sections";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "../lib/seo";
import { company } from "../lib/site";
import placed from "@/assets/vaillant-ketel-geplaatst.jpg.asset.json";
import maintenance from "@/assets/stock-boiler-inspection.jpg";
import heroVideo from "@/assets/videos/vaillant.mp4.asset.json";
import heroPoster from "@/assets/videos/vaillant-poster.jpg";

const faq = [
  {
    q: "Wanneer moet een Vaillant ketel onderhouden worden?",
    a: "Dat hangt af van de brandstof en het vermogen van uw toestel. Voor centrale verwarmingsketels op gas vanaf 20 kW geldt in Vlaanderen een periodiek onderhoud om de twee jaar. Ook los van die verplichting helpt regelmatig onderhoud om uw ketel betrouwbaar te laten werken. Weet u niet wanneer het laatste onderhoud gebeurde? Geef het toesteltype door, dan bekijken we wat nodig is.",
  },
  {
    q: "Kan Clima Heat mijn bestaande Vaillant ketel onderhouden?",
    a: "Ja. Ook als uw Vaillant ketel door iemand anders werd geplaatst, kunnen we het onderhoud uitvoeren. We controleren en reinigen het toestel, bespreken wat ons opvalt en bezorgen u het attest na het uitgevoerde onderhoud. Vermeld bij uw aanvraag het type en, als u dat weet, de datum van het vorige onderhoud.",
  },
  {
    q: "Herstellen jullie ook oudere Vaillant ketels?",
    a: "We bekijken ook oudere Vaillant toestellen. Of een herstelling zinvol is, hangt af van de oorzaak van het defect, de algemene toestand van de ketel en de beschikbaarheid van onderdelen. Na het nazicht hoort u eerlijk wat we vaststellen, zodat u zelf kunt beslissen.",
  },
  {
    q: "Wanneer is vervangen interessanter dan herstellen?",
    a: "Bij terugkerende storingen, een ketel die al lang meegaat, onderdelen die moeilijk te vinden zijn of een verbouwing kan vervanging het overwegen waard zijn. We vergelijken de herstelling met een nieuw toestel en leggen uit waarom we iets voorstellen. De keuze blijft bij u.",
  },
  {
    q: "Welke Vaillant ketel past bij mijn woning?",
    a: "Dat hangt af van de grootte van uw woning, uw warmwatergebruik, de bestaande aansluitingen en de rookgasafvoer. Daarom bekijken we eerst uw situatie voordat we een model voorstellen. Zo krijgt u een toestel dat bij uw woning past, niet zomaar het grootste of duurste.",
  },
  {
    q: "Kan ik een offerte aanvragen voor vervanging van mijn huidige ketel?",
    a: `Zeker. Vul het formulier in of bel ${company.phone}. Vermeld het merk en type van uw huidige ketel en stuur gerust een foto van het toestel en de aansluitingen mee. Daarna bespreken we de mogelijkheden en ontvangt u een duidelijk voorstel.`,
  },
] as const;

export const Route = createFileRoute("/vaillant/")({
  head: () => ({
    ...pageMeta({
      title: "Vaillant verwarmingsketel plaatsen, onderhouden of herstellen | Clima Heat",
      description:
        "Vaillant ketel in Antwerpen: plaatsing, vervanging, onderhoud en herstelling door één vaste technieker. Vraag een offerte of bel Clima Heat Solutions.",
      path: "/vaillant",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          serviceSchema({
            name: "Vaillant installatie, onderhoud en herstelling",
            description:
              "Plaatsing, vervanging, onderhoud en herstelling van Vaillant verwarmingsketels.",
            path: "/vaillant",
          }),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Vaillant", path: "/vaillant" },
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
      eyebrow="Vaillant ketel · Antwerpen"
      h1="Vaillant verwarmingsketel plaatsen, onderhouden of herstellen"
      intro="Een nieuwe Vaillant ketel, uw huidige Vaillant gasketel vervangen, een onderhoud of een storing? Vaillant is de specialiteit van Clima Heat: we kennen de toestellen van binnen en buiten, van de klassieke modellen tot de nieuwste generatie. Daardoor vinden we storingen sneller, weten we welke onderdelen beschikbaar zijn en kunnen we u gericht adviseren over vervanging. Werkt uw ketel van een ander merk, zoals Viessmann, Bulex, Bosch, Junkers, Buderus of Remeha? Ook daarvoor helpen we u graag. Bij Clima Heat bespreekt u uw vraag rechtstreeks met ons — geen callcenter, geen doorverwijzingen. U krijgt helder advies, een duidelijk voorstel en één vast aanspreekpunt voor plaatsing, onderhoud en herstellingen. Actief in Antwerpen en omgeving, en in heel Vlaanderen."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Vaillant", path: "/vaillant" },
      ]}
      primaryLabel="Vraag een offerte"
      formSubject="Nieuwe verwarmingsketel / ketel vervangen"
      showBrands={false}
      layout="grid"
      projectTypes={["Plaatsing", "Onderhoud", "Herstelling"]}
      showSteps={false}
      focus={{
        label: "Vaillant in de praktijk",
        title: "Eén technieker voor plaatsing, onderhoud en herstelling",
        paragraphs: [
          "Een ketel kiezen, onderhouden en herstellen zijn verschillende momenten in het leven van dezelfde installatie. Bij plaatsing kijken we naar uw woning en warmwatergebruik, bij onderhoud naar de werking en bij een storing naar de oorzaak van de klacht.",
          "Omdat we uw installatie en de vorige ingrepen kennen, hoeft u niet elke keer alles opnieuw uit te leggen.",
        ],
        image: { src: placed.url, alt: "Door Clima Heat geplaatste Vaillant ketel", caption: "Eigen werkfoto · Vaillant plaatsing" },
        secondImage: { src: maintenance, alt: "Technieker kijkt een geopend toestel na", caption: "Onderhoud" },
      }}
      extra={
        <Section tone="muted">
          <Eyebrow>Waarmee kunnen we helpen?</Eyebrow>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Kies wat op u van toepassing is</h2>
          <div className="mt-8">
            <ChoiceCards
              items={[
                {
                  title: "Nieuwe Vaillant ketel",
                  text: "Voor een nieuwe installatie of om uw huidige ketel te vervangen.",
                  cta: "Offerte nieuwe Vaillant ketel",
                  hash: "#aanvraag",
                },
                {
                  title: "Vaillant onderhoud",
                  text: "Periodiek onderhoud van uw Vaillant toestel, met attest.",
                  cta: "Onderhoud aanvragen",
                  to: "/vaillant/onderhoud",
                },
                {
                  title: "Probleem met uw Vaillant ketel",
                  text: "Storing, foutcode, geen verwarming of geen warm water.",
                  cta: "Bekijk herstelling",
                  to: "/vaillant/herstelling",
                },
              ]}
            />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-5">
            <p className="text-sm text-muted-foreground">Werkt uw Vaillant ketel nu niet?</p>
            <CallButton location="vaillant_problem" label={`Bel ${company.phone}`} />
          </div>
        </Section>
      }
      blocks={[
        {
          h2: "Waarom kiezen voor een Vaillant ketel?",
          paragraphs: [
            "Vaillant is een bekend merk voor verwarming en warm water, met een breed gamma aan gasketels en condensatieketels. Veel woningen in Antwerpen hebben al een Vaillant toestel, waardoor een nieuw model vaak goed aansluit op de bestaande situatie.",
          ],
          bullets: [
            "Modellen voor verwarming alleen of verwarming met warm water",
            "Condensatietechniek bij een geschikte installatie",
            "Bedieningen en thermostaten die bij het toestel horen",
            "Onderhoud en herstelling bij hetzelfde aanspreekpunt",
          ],
        },
        {
          h2: "Nieuwe Vaillant ketel of vervanging",
          paragraphs: [
            "Wilt u uw Vaillant ketel vervangen of kiest u voor het eerst voor Vaillant? We bekijken het benodigde vermogen, uw warmwaterbehoefte, de aansluitingen en de rookgasafvoer. Daarna krijgt u een voorstel met uitleg over het model en het werk dat erbij komt kijken.",
          ],
        },
        {
          h2: "Vaillant onderhoud",
          paragraphs: [
            "Tijdens een onderhoud wordt uw Vaillant ketel gecontroleerd en gereinigd waar nodig. Wat ons opvalt, bespreken we meteen met u. Na het uitgevoerde onderhoud ontvangt u het attest.",
          ],
        },
        {
          h2: "Diagnose en herstelling",
          paragraphs: [
            "Een foutcode op het display is een startpunt, geen diagnose op afstand. We kijken na waar de storing vandaan komt en bespreken eerst of herstellen zinvol is, voordat we onderdelen vervangen.",
          ],
          bullets: [
            "Geen verwarming of geen warm water",
            "Foutcode of storing op het display",
            "Drukverlies of een ketel die telkens uitvalt",
          ],
        },
        {
          h2: "Persoonlijk advies over een passend toestel",
          paragraphs: [
            "Het grootste of duurste model is niet altijd de beste keuze. We vragen naar uw woning, het aantal badkamers en uw gebruik, en leggen uit waarom een bepaald Vaillant toestel bij u past. Zo weet u waarvoor u kiest.",
          ],
        },
        {
          h2: "Hoe verloopt een aanvraag?",
          bullets: [
            "U belt, mailt of vult het formulier in",
            "Geef merk, type en eventueel een foto of foutcode door",
            "We bespreken de situatie en plannen een bezoek",
            "U ontvangt een duidelijk voorstel voordat het werk start",
          ],
        },
        {
          h2: "Ook ketels van andere merken",
          paragraphs: [
            "Vaillant is onze specialiteit, maar geen beperking. Voor plaatsing, vervanging, onderhoud en herstelling helpen we ook bij ketels van Viessmann, Bulex, Bosch, Junkers, Buderus en Remeha. Geef bij uw aanvraag het merk en type door, dan bekijken we wat uw toestel nodig heeft.",
          ],
        },
      ]}
      faq={faq}
      finalCta={{
        title: "Vaillant ketel, onderhoud of herstelling nodig?",
        text: "Voor plaatsing vraagt u een voorstel aan; voor onderhoud plant u een afspraak. Werkt uw ketel niet? Bel ons en geef de foutcode door.",
      }}
    />
  );
}
