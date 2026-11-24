import { createFileRoute, Link } from "@tanstack/react-router";
import { ProblemGrid, ServicePage } from "../components/ServicePage";
import { Section } from "../components/sections";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "../lib/seo";
import img1 from "@/assets/stock-warmwatertoestel.jpg";
import img2 from "@/assets/stock-warm-water-douche.jpg";
import heroVideo from "@/assets/videos/warmwatertoestellen.mp4.asset.json";
import heroPoster from "@/assets/videos/warmwatertoestellen-poster.jpg";

const faq = [{"q": "Welk warmwatertoestel past bij mijn gezin?", "a": "Dat hangt af van het aantal bewoners, badkamers en uw gewoontes. We bespreken uw verbruik en de beschikbare ruimte voordat we een toestel voorstellen."}, {"q": "Plaatsen jullie ook elektrische boilers?", "a": "Ja. We plaatsen en vervangen warmwatertoestellen, waaronder elektrische boilers, en sluiten ze aan op de bestaande leidingen."}, {"q": "Ik heb geen warm water meer. Wat doe ik?", "a": "Bel ons en vermeld het merk en type van uw toestel en wat u merkt. Open het toestel niet zelf."}, {"q": "Hebben warmwatertoestellen onderhoud nodig?", "a": "Een periodieke controle helpt om kalk, slijtage of lekken tijdig op te merken. We bespreken graag wat voor uw toestel zinvol is."}, {"q": "In welke regio werken jullie?", "a": "In Antwerpen en heel Vlaanderen."}] as const;
const crumbs = [{ name: "Home", path: "/" }, { name: "Diensten", path: "/diensten" }, { name: "Sanitair", path: "/sanitair" }, { name: "Warmwatertoestellen", path: "/warmwatertoestellen" }];

export const Route = createFileRoute("/warmwatertoestellen")({
  head: () => ({
    ...pageMeta({ title: "Warmwatertoestel plaatsen of vervangen in Antwerpen | Clima Heat", description: "Boiler of warmwatertoestel plaatsen, vervangen, onderhouden of laten nakijken in Antwerpen en Vlaanderen. Advies op maat van uw warmwaterverbruik. Vraag een offerte.", path: "/warmwatertoestellen" }),
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceSchema({ name: "Warmwatertoestellen plaatsen en onderhouden", description: "Boiler of warmwatertoestel plaatsen, vervangen, onderhouden of laten nakijken in Antwerpen en Vlaanderen. Advies op maat van uw warmwaterverbruik. Vraag een offerte.", path: "/warmwatertoestellen" })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema(crumbs)) },
      { type: "application/ld+json", children: JSON.stringify(faqSchema(faq)) },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ServicePage
      heroVideo={{ src: heroVideo.url, poster: heroPoster }}
      eyebrow="Sanitair · Warm water"
      h1="Warmwatertoestellen plaatsen en vervangen"
      intro="Warm water is iets wat u pas mist als het wegvalt. Of u nu een nieuwe boiler nodig heeft, een verouderd warmwatertoestel wilt vervangen of merkt dat het warm water sneller op is dan vroeger: Clima Heat bekijkt uw verbruik, de plaats van het toestel en hoe het aansluit op uw bestaande installatie. We plaatsen, vervangen en onderhouden warmwatertoestellen en kijken problemen met warm water gericht na. U krijgt eerlijk advies over wat bij uw gezin en woning past, in Antwerpen en heel Vlaanderen."
      breadcrumbs={crumbs}
      primaryLabel="Offerte voor warm water"
      formSubject="Warmwatertoestel"
      layout="editorial"
      projectTypes={["Sanitair", "Herstelling"]}
      focus={{
        label: "Comfort elke dag",
        title: "Genoeg warm water, afgestemd op uw gezin",
        paragraphs: ["Hoeveel warm water u nodig heeft, hangt af van het aantal bewoners, het aantal badkamers en uw gewoontes. Een toestel dat te klein is, raakt snel leeg; een te groot toestel verbruikt onnodig.", "Daarom vragen we eerst naar uw gebruik en bekijken we de bestaande aansluitingen, voordat we een toestel voorstellen."],
        image: { src: img1, alt: "Wandboiler in een opgeruimde technische ruimte", caption: "Warmwatertoestel" },
        secondImage: { src: img2, alt: "Warm water uit een regendouche", caption: "Warmwatercomfort" },
      }}
      extra={
        <>
          <ProblemGrid title="Waarvoor u ons contacteert" items={["Geen warm water meer", "Warm water snel op", "Water wordt niet warm genoeg", "Lekkend toestel of aansluiting", "Verouderde boiler vervangen", "Nieuw toestel bij verbouwing"]} />
          <Section>
            <p className="text-[15px] leading-relaxed text-muted-foreground">Warm water dicht bij het tappunt nodig, of last van kalk? Bekijk ook <Link to="/sanitair" hash="close-in-boilers" className="font-semibold text-accent-deep underline">close-in boilers</Link> en <Link to="/sanitair" hash="waterverzachters" className="font-semibold text-accent-deep underline">waterverzachters</Link> onder sanitair, of een <Link to="/verwarmingsketels/nieuwe-verwarmingsketel" className="font-semibold text-accent-deep underline">ketel met warmwaterfunctie</Link> of bekijk al <Link to="/diensten" className="font-semibold text-accent-deep underline">onze diensten</Link>.</p>
          </Section>
        </>
      }
      blocks={[{"h2": "Een warmwatertoestel laten plaatsen", "paragraphs": ["Bij een nieuwbouw, verbouwing of uitbreiding bekijken we welk type toestel past: een elektrische boiler of een toestel gekoppeld aan uw verwarming. We houden rekening met de beschikbare ruimte, de leidingen en uw verbruik."]}, {"h2": "Uw boiler of warmwatertoestel vervangen", "paragraphs": ["Een oud toestel kan minder efficiënt werken, kalk bevatten of beginnen lekken. Bij vervanging sluiten we het nieuwe toestel netjes aan op de bestaande leidingen, met de nodige veiligheidsonderdelen."]}, {"h2": "Problemen met warm water", "paragraphs": ["Geen of te weinig warm water kan liggen aan het toestel zelf, de instellingen, de ketel of de leidingen. We kijken de situatie gericht na en bespreken daarna of een herstelling of vervanging zinvol is."]}, {"h2": "Koppeling met uw verwarmingsinstallatie", "paragraphs": ["Wordt uw warm water geleverd door uw verwarmingsketel, dan bekijken we ook die kant. Zo krijgt u advies over het geheel, niet alleen over één toestel. Lees ook meer over een nieuwe verwarmingsketel."]}, {"h2": "Wat we bij de plaatsing controleren", "bullets": ["Correcte aansluiting op koud en warm water", "Drukbeveiliging en afvoer", "Instellingen en werking na plaatsing", "Uitleg over gebruik en onderhoud"]}, {"h2": "Zo verloopt uw aanvraag", "paragraphs": ["Vertel ons welk toestel u nu heeft, hoeveel personen er wonen en wat u merkt. Een foto van het typeplaatje helpt. Daarna ontvangt u een duidelijk voorstel en plannen we de uitvoering."]}]}
      faq={faq}
      finalCta={{ title: "Warmwatertoestel plaatsen of vervangen?" }}
    />
  );
}
