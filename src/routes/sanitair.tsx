import { createFileRoute, Link } from "@tanstack/react-router";
import { ProblemGrid, ServicePage } from "../components/ServicePage";
import { Eyebrow, Section } from "../components/sections";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "../lib/seo";
import { RenovationBand } from "../components/RenovationBand";
import { AppointmentButton } from "../components/AppointmentButton";
import { track } from "../lib/tracking";
import kraanImg from "@/assets/stock-keukenkraan.jpg";
import aansluitingImg from "@/assets/stock-badkamerkraan.jpg";
import heroVideo from "@/assets/videos/sanitair.mp4.asset.json";
import heroPoster from "@/assets/videos/sanitair-poster.jpg";

const faq = [
  { q: "Welke sanitaire diensten voert Clima Heat uit?", a: "We verzorgen algemene sanitaire werken zoals handenwassers plaatsen, kranen installeren en lekkages opsporen. Daarnaast plaatsen en vervangen we warmwatertoestellen, close-in boilers en waterverzachters. Een complete sanitaire renovatie kan ook, maar valt niet onder de vaste uurtarieven: daarvoor maken we een offerte op maat." },
  { q: "Wat is een close-in boiler?", a: "Een close-in boiler is een kleine elektrische boiler die dicht bij het tappunt hangt, meestal onder of boven het aanrecht. Zo heeft u daar snel warm water, zonder te wachten tot het van ver komt." },
  { q: "Heb ik een speciale kraan nodig voor een close-in boiler?", a: "Dat hangt af van het type. Een drukloze (open) close-in boiler werkt met een aangepaste kraan; een boiler onder druk kan op een gewone mengkraan. We bekijken vooraf welk type bij uw keuken en kraan past." },
  { q: "Wat doet een waterverzachter?", a: "Een waterverzachter haalt een groot deel van de kalk uit het leidingwater. Daardoor zet er minder kalk af in kranen, douche, toestellen en leidingen." },
  { q: "Waar wordt een waterverzachter geplaatst?", a: "Meestal op de hoofdleiding, kort na de watermeter, met een bypass zodat u het toestel kunt omzeilen. Er is plaats nodig voor het toestel en het zout, en een afvoer in de buurt. We bekijken de beste plek bij een bezoek." },
  { q: "Brengen jullie zelf een kraan of toestel mee?", a: "Dat kan in overleg. U kunt ook zelf een kraan of toestel kiezen; we bekijken dan vooraf of het past bij uw aansluitingen." },
  { q: "In welke regio werken jullie?", a: "In Antwerpen en heel Vlaanderen." },
] as const;

const crumbs = [{ name: "Home", path: "/" }, { name: "Diensten", path: "/diensten" }, { name: "Sanitair", path: "/sanitair" }];

const description =
  "Sanitaire kranen, warmwatertoestellen, close-in boilers en waterverzachters laten plaatsen of vervangen in Antwerpen en Vlaanderen. Vraag een offerte bij Clima Heat.";

export const Route = createFileRoute("/sanitair")({
  head: () => ({
    ...pageMeta({ title: "Sanitair in Antwerpen: kranen, boilers & waterverzachters | Clima Heat", description, path: "/sanitair" }),
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceSchema({ name: "Sanitair: kranen, warmwatertoestellen, close-in boilers en waterverzachters", description, path: "/sanitair" })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema(crumbs)) },
      { type: "application/ld+json", children: JSON.stringify(faqSchema(faq)) },
    ],
  }),
  component: Page,
});

type SanitairService = {
  id: string;
  label: string;
  title: string;
  intro: string;
  paragraphs: string[];
  bullets: string[];
  subject: string;
  cta: string;
  image?: { src: string; alt: string };
  more?: { to: "/warmwatertoestellen"; label: string };
};

const services: SanitairService[] = [
  {
    id: "kranen",
    label: "Sanitaire kranen",
    title: "Kranen plaatsen en vervangen",
    intro: "Een kraan gebruikt u elke dag. Druppelt hij, draait hij stroef of past hij niet meer bij uw nieuwe keuken of lavabo? We plaatsen een nieuwe kraan en sluiten hem lekvrij aan op uw bestaande leidingen.",
    paragraphs: [
      "We plaatsen keukenkranen, mengkranen en wastafelkranen, en vervangen oude exemplaren. Vooraf bekijken we de aansluitpunten, de stopkranen en de afvoer, zodat de nieuwe kraan meteen goed werkt.",
    ],
    bullets: ["Keukenkraan of wastafelkraan", "Controle van stopkranen en flexibels", "Lekvrije verbindingen", "Werking nagekeken na plaatsing"],
    subject: "Sanitaire kranen",
    cta: "Maak een afspraak",
    image: { src: kraanImg, alt: "Moderne keukenkraan boven een stenen spoelbak" },
  },
  {
    id: "warmwatertoestellen",
    label: "Warmwatertoestellen",
    title: "Warmwatertoestellen en boilers",
    intro: "Genoeg warm water voor het hele gezin, zonder dat het te snel op is. We plaatsen en vervangen boilers en warmwatertoestellen, afgestemd op het aantal bewoners, badkamers en uw gewoontes.",
    paragraphs: [
      "Een toestel dat te klein is, raakt snel leeg; een te groot toestel verbruikt onnodig. Daarom vragen we eerst naar uw verbruik en de beschikbare ruimte, en bekijken we de bestaande aansluitingen.",
    ],
    bullets: ["Nieuwe boiler of warmwatertoestel", "Vervanging van een verouderd toestel", "Aansluiting op water en, waar nodig, afvoer", "Advies over capaciteit"],
    subject: "Warmwatertoestel",
    cta: "Offerte voor warm water",
    more: { to: "/warmwatertoestellen", label: "Alles over warmwatertoestellen" },
  },
  {
    id: "close-in-boilers",
    label: "Close-in boilers",
    title: "Close-in boiler: warm water dicht bij de kraan",
    intro: "Lang wachten op warm water in de keuken? Een close-in boiler is een compacte elektrische boiler die vlak bij het tappunt hangt, meestal onder of boven het aanrecht. Zo heeft u daar snel warm water.",
    paragraphs: [
      "Er bestaan drukloze (open) close-in boilers, die werken met een aangepaste kraan, en boilers onder druk, die op een gewone mengkraan aangesloten kunnen worden. We bekijken welk type past bij uw keuken, uw kraan en de beschikbare ruimte, en of er een stopcontact in de buurt is.",
    ],
    bullets: ["Compact, onder of boven het aanrecht", "Snel warm water aan het tappunt", "Keuze tussen drukloos of onder druk", "Aansluiting op de koudwaterleiding"],
    subject: "Close-in boiler",
    cta: "Offerte voor een close-in boiler",
  },
  {
    id: "waterverzachters",
    label: "Waterverzachters",
    title: "Waterverzachter: minder kalk in huis",
    intro: "Witte kalkranden op kranen en douchewand, of toestellen die verkalken? Een waterverzachter haalt een groot deel van de kalk uit uw leidingwater, voor het hele huis.",
    paragraphs: [
      "Klanten kiezen een waterverzachter om minder te moeten ontkalken en om kranen, douche, boiler en huishoudtoestellen te beschermen tegen kalkaanslag. Het toestel wordt meestal op de hoofdleiding geplaatst, kort na de watermeter, met een bypass zodat u het kunt omzeilen.",
      "Bij de plaatsing bekijken we de ruimte voor het toestel en het zout, de afvoer in de buurt en hoe de leidingen lopen. We bespreken ook of u een kraan met onbehandeld water wilt behouden, bijvoorbeeld in de keuken.",
    ],
    bullets: ["Minder kalkaanslag op kranen en sanitair", "Bescherming van boiler en toestellen", "Plaatsing op de hoofdleiding met bypass", "Uitleg over gebruik en zout bijvullen"],
    subject: "Waterverzachter",
    cta: "Offerte voor een waterverzachter",
  },
];

function SanitairServices() {
  return (
    <Section>
      <Eyebrow>Ons sanitair aanbod</Eyebrow>
      <h2 className="display-2 reveal mt-5 max-w-[16ch]">Water in huis, goed geregeld.</h2>
      <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">Ook voor een handenwasser, kraaninstallatie of het opsporen van een lekkage kunt u bij ons terecht. Bekijk onze <Link to="/algemeen-sanitair" className="font-semibold text-accent-deep underline">algemene sanitaire werken</Link>.</p>
      <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
        Van een nieuwe kraan tot minder kalk in het hele huis: voor kleine werken op uurbasis maakt u een afspraak. Voor grotere installaties vraagt u een offerte op maat.
      </p>
      <nav aria-label="Sanitaire diensten" className="mt-8 flex flex-wrap gap-2">
        {services.map((s, i) => (
          <a key={s.id} href={`#${s.id}`} className="cta-secondary !min-h-10 !px-4 !text-sm">
            0{i + 1} · {s.label}
          </a>
        ))}
      </nav>
      <div className="mt-12 border-t border-border">
        {services.map((s, i) => (
          <article key={s.id} id={s.id} className="reveal grid scroll-mt-28 gap-8 border-b border-border py-12 lg:grid-cols-12 lg:gap-12">
            <div className={s.image ? "lg:col-span-7" : "lg:col-span-8"}>
              <p className="flex items-baseline gap-4">
                <span className="text-[2.5rem] font-medium leading-none tracking-[-0.05em] text-accent">0{i + 1}</span>
                <span className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">{s.label}</span>
              </p>
              <h3 className="display-3 mt-6 max-w-[22ch]">{s.title}</h3>
              <p className="lead mt-4 max-w-[58ch]">{s.intro}</p>
              {s.paragraphs.map((p) => (
                <p key={p} className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-muted-foreground">{p}</p>
              ))}
              <div className="mt-7 flex flex-wrap gap-2.5">
                {s.id === "kranen" ? <AppointmentButton subject="Loodgieterij" location="sanitair_kranen" /> : <Link
                  to="/offerte"
                  search={{ dienst: s.subject }}
                  onClick={() => track("quote_cta_click", { location: `sanitair_${s.id}` })}
                  className="cta-primary arrow-nudge"
                >
                  {s.cta} <span aria-hidden="true">→</span>
                </Link>}
                {s.more && (
                  <Link to={s.more.to} className="cta-secondary arrow-nudge">
                    {s.more.label} <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            </div>
            <div className={s.image ? "lg:col-span-5" : "lg:col-span-4"}>
              {s.image && (
                <div className="img-reveal group mb-6 overflow-hidden rounded-md">
                  <img src={s.image.src} alt={s.image.alt} loading="lazy" width={1200} height={900} className="aspect-[4/3] w-full object-cover transition-[scale] duration-[1400ms] ease-out group-hover:scale-[1.05]" />
                </div>
              )}
              <ul className="grid gap-2.5 rounded-md bg-muted p-6">
                <li className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">In de praktijk</li>
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5 text-[15px]">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Page() {
  return (
    <ServicePage
      heroVideo={{ src: heroVideo.url, poster: heroPoster }}
      eyebrow="Sanitair"
      h1="Sanitair: kranen, boilers en waterverzachters"
      intro="Voor sanitair in huis heeft u bij Clima Heat één aanspreekpunt. We plaatsen en vervangen sanitaire kranen, warmwatertoestellen, close-in boilers en waterverzachters, netjes aangesloten op uw bestaande leidingen. Vooraf bekijken we de aansluitpunten, de afvoer en de beschikbare ruimte, zodat alles meteen goed werkt. Zo combineert u sanitair eenvoudig met werken aan uw verwarming of warm water, in Antwerpen en heel Vlaanderen."
      breadcrumbs={crumbs}
      primaryLabel="Vraag een offerte"
      formSubject="Algemene sanitaire werken"
      layout="editorial"
      projectTypes={["Sanitair"]}
      showBrands={false}
      extra={
        <>
          <SanitairServices />
          <RenovationBand id="renovatie" eyebrow="Aparte dienst · Prijs op offerte" title="Totaalrenovatie sanitair" location="sanitair_renovatie" subject="Totaalrenovatie sanitair"
            text="Van het vernieuwen van sanitaire leidingen en aansluitingen tot een volledige renovatie van sanitaire installaties. Clima Heat bekijkt de bestaande situatie en de gewenste werkzaamheden en werkt een voorstel op maat uit."
            options={[{ title: "Kleine sanitaire werken", text: "Kraan, handenwasser of lek: per uur, eerste uur inclusief verplaatsing.", price: "Vast uurtarief" }, { title: "Totaalrenovatie sanitair", text: "De vaste uurtarieven gelden niet automatisch voor volledige renovatieprojecten.", price: "Prijs op offerte" }]} />
          <ProblemGrid
            title="Waarvoor u ons contacteert"
            description="Herkent u een van deze situaties? Vermeld bij uw aanvraag waar het werk zich bevindt en voeg gerust een foto toe van de kraan, het toestel of de plaats waar het moet komen."
            items={["Druppelende of versleten kraan", "Nieuwe keuken- of wastafelkraan", "Warm water snel op", "Lang wachten op warm water in de keuken", "Kalkaanslag op kranen en douche", "Verkalkte boiler of toestellen"]}
          />
        </>
      }
      focus={{
        label: "Nette aansluiting",
        title: "Het werk zit in de aansluiting",
        paragraphs: [
          "Een kraan of boiler lijkt een klein werk, maar de aansluiting bepaalt of alles lekvrij en veilig blijft. Flexibels, stopkranen, drukbeveiliging en afvoer moeten correct passen.",
          "We werken netjes en controleren na de plaatsing de werking en de dichtheid van alle verbindingen. U krijgt uitleg over het gebruik en waar u later op let.",
        ],
        image: { src: aansluitingImg, alt: "Technieker sluit een kraan aan onder de lavabo", caption: "Aansluiting onder de lavabo" },
      }}
      blocks={[
        { h2: "Eén aanspreekpunt voor water in huis", paragraphs: ["Kraan, boiler en waterverzachter hangen samen: ze delen dezelfde leidingen en aansluitingen. Door ze samen te bekijken, sluiten de werken op elkaar aan en vermijdt u dubbel werk."] },
        { h2: "Hoe we te werk gaan", bullets: ["U beschrijft uw vraag, eventueel met een foto", "We bekijken de aansluitingen en de ruimte", "U krijgt een duidelijk voorstel", "We plaatsen, testen en geven uitleg"] },
        { h2: "Kalk: waarom het ertoe doet", paragraphs: ["Kalk zet zich af waar water wordt opgewarmd of verdampt: in boilers, op kranen, douchekoppen en in huishoudtoestellen. Dat maakt reinigen lastiger en kan toestellen sneller doen verouderen. Een waterverzachter beperkt die afzetting voor het hele huis."] },
        { h2: "Combineren met andere werken", paragraphs: ["Laat u ook werken uitvoeren aan uw verwarming of warm water? Dan bekijken we dat samen, zodat alles in één keer goed geregeld is."] },
      ]}
      faq={faq}
      finalCta={{ title: "Sanitair laten plaatsen of vervangen?" }}
    />
  );
}
