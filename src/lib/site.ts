import ketelOpenInterventie from "@/assets/ketel-open-interventie.jpg.asset.json";
import techniekerKetel from "@/assets/technieker-ketel.jpg.asset.json";
import vaillantKetel from "@/assets/vaillant-ketel-geplaatst.jpg.asset.json";
import vaillantOnderhoud from "@/assets/vaillant-onderhoud-open.jpg.asset.json";
import vaillantEcotec from "@/assets/vaillant-ecotec-plus-geplaatst.jpg.asset.json";
import radiatorSlaapkamer from "@/assets/radiator-paneelradiator-slaapkamer.jpg.asset.json";

/**

 * Centrale plek voor alle bedrijfsgegevens en herbruikbare content.
 * De eigenaar kan hier teksten, contactgegevens, diensten, FAQ, reviews,
 * werkgebied en realisaties aanpassen zonder de pagina's aan te raken.
 *
 * BELANGRIJK: vul hier uitsluitend gegevens in die feitelijk correct zijn.
 * Alles wat nog niet bevestigd is, blijft leeg (`[]` of `null`).
 */

export const company = {
  name: "Clima Heat Solutions",
  shortName: "Clima Heat",
  /**
   * Maatschappelijke zetel: enkel gebruikt in de wettelijke vermelding
   * (privacybeleid). Niet tonen in footer, contactblokken of schema.
   */
  street: "Hendriklei 22",
  postalCode: "2020",
  city: "Antwerpen",
  country: "BE",
  vat: "BE1001.682.376",
  phone: "+32 476 07 36 12",
  phoneHref: "tel:+32476073612",
  email: "info@climaheatsolutions.be",
  emailHref: "mailto:info@climaheatsolutions.be",
  /** Zakelijk WhatsApp-nummer zoals gelinkt op de oorspronkelijke website. */
  whatsappNumber: "32476073612",
  whatsappMessage: "Hallo, ik heb een vraag over de diensten van Clima Heat.",
  /** Publiek getoonde regio in plaats van een adres. */
  region: "Antwerpen en omgeving",
  serviceArea: "Antwerpen en heel Vlaanderen",
} as const;

export const whatsappHref = `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(company.whatsappMessage)}`;


/** Alleen claims die op de bestaande site/Google bevestigd zijn. */
export const trustPoints = [
  "Verschillende verwarmingsmerken",
  "Erkende technieker",
  "Officieel onderhoudsattest",
  "Persoonlijke service",
] as const;

/** Google-beoordeling uit het door de klant aangeleverde overzicht op 15 november 2026. */
export const googleRating = {
  score: "5,0",
  count: 20,
  asOf: "15 november 2026",
} as const;

/** Link naar het Google-profiel; vervang door de directe reviewlink zodra die bekend is. */
export const googleReviewsUrl = "https://www.google.com/search?q=Clima+Heat+Solutions+Antwerpen+reviews";

export type Review = {
  /** Naam zoals publiek zichtbaar op Google (bv. "Sarah V."). */
  author: string;
  /** Aantal sterren op Google, 1 tot 5. */
  rating: 1 | 2 | 3 | 4 | 5;
  /** Letterlijke reviewtekst van Google — niets herschrijven of verzinnen. */
  text: string;
  /** Optioneel, bv. "oktober 2026". */
  date?: string;
  /** Optioneel: link naar de originele review op Google. */
  url?: string;
};

/**
 * Echte Google-reviews. Voeg hier letterlijke reviews toe (kopieer ze van
 * Google). Zodra er items staan, verschijnen ze automatisch in de reviewslider
 * op de homepage, Over Clima Heat, Realisaties en de dienstpagina's.
 *
 * Voorbeeldstructuur (niet echt, niet gebruiken):
 * { author: "Voornaam N.", rating: 5, text: "…", date: "oktober 2026", url: "https://g.co/…" }
 */
// Alleen volledige teksten uit het aangeleverde Google-overzicht.
// Drie afgebroken teksten en de naam zonder tekst zijn niet gepubliceerd.
export const reviews: Review[] = [
  { author: "muhammed ali yardimsever", rating: 5, text: "Uitstekend werk geleverd.\nSnel en professioneel deze mannen weten zeker waar ze mee bezig zijn." },
  { author: "Latif Uyar", rating: 5, text: "echt een vakman hij heeft ons gered van een co vergifteging super tevreden. een echte aanrader" },
  { author: "Kader Bas", rating: 5, text: "Gasblok laten vervangen. Snelle service en oog voor detail. Zeer behulpzaam. Dank u wel ClimaHeat Solutions!" },
  { author: "Rumeysa G", rating: 5, text: "Zat sinds gisterenavond zonder warm water in huis, wat niet handig is met een baby van 6maand oud. Vanmorgen gebeld en meteen telefonisch verder geholpen en probleem opgelost! Super vriendelijk, bedankt!" },
  { author: "Said A", rating: 5, text: "Ik had een lekkende radiator. Binnen de week offerte gekregen en nieuwe radiator geplaatst. Ze werken netjes en het zijn klantvriendelijke mensen." },
  { author: "maurice kassima", rating: 5, text: "Top service!!!! pomp was stuk hebben nieuwe geplaatst heel netjes gewerkt en heel snel ook gemaakt top heel top!" },
  { author: "Semih Per", rating: 5, text: "Ik heb een onderhoudsbeurt voor mijn ketel aangevraagd via de website en binnen twee dagen kreeg ik een reactie. De ketel is ondertussen ook al onderhouden. Al met al een top service en snelle afhandeling!" },
  { author: "Gosia Wozniczka", rating: 5, text: "Zeer goede service ⭐⭐⭐⭐⭐\nHeel behulpzaam, uitstekend advies en snelle reactie. Zou hem zeker aanraden 😉" },
  { author: "Ayoub El-Haddouchi", rating: 5, text: "Langs geweest voor mijn ketel onderhoud. Correcte en eerlijke persoon.\nAanrader!" },
  { author: "Jan Van Bert", rating: 5, text: "Mijn ketel gaf een foutieve melding weer, maar het team van clima heat solutions loste het probleem snel weer op en het werkt terug. Top gewerkt! Zeker aangeraden." },
  { author: "Nivina AT", rating: 5, text: "Gebeld voor een ketelonderhoud, de volgende geholpen geweest! Snel, profesioneel, op tijd. Niks op aan te merken! Tot de volgende onderhoud." },
  { author: "Sam Van den Heuvel", rating: 5, text: "Ketelonderhoud laten uitvoeren bij hen en echt wel tevreden, ze waren heel vriendelijk en correct!" },
  { author: "Mustafa Ava", rating: 5, text: "Top technieker" },
  { author: "Mika G.", rating: 5, text: "Ketel laten plaatsen, top werk! Op 2 dagen stond mijn ketel. Oog op detail en denken met u mee! Top team, dank u wel jongens!" },
  { author: "Jacob Van Hoofstat", rating: 5, text: "Vlotte team. Heel snel en efficiënt gewerkt, probleem snel opgelost, ik raad het zeker aan." },
  { author: "Turgut Reis Kursun", rating: 5, text: "competente technieker, vlotte communicatie en service" },
];

/**
 * Realisaties: eigen werkfoto's van Clima Heat Solutions.
 * Gemeente wordt pas toegevoegd zodra die per project bevestigd is.
 */
export const projects: Array<{
  title: string;
  gemeente?: string;
  type: string;
  merk?: string;
  description: string;
  image?: string;
  alt?: string;
  date?: string;
}> = [
  {
    title: "Nieuwe condensatieketel geplaatst",
    type: "Plaatsing",
    merk: "Vaillant",
    description:
      "Nieuwe Vaillant condensatieketel met expansievat en condenspomp, netjes aangesloten op de bestaande koperleidingen.",
    image: vaillantKetel.url,
    alt: "Nieuw geplaatste Vaillant condensatieketel met expansievat en koperleidingen",
  },
  {
    title: "Condensatieketel met nieuwe rookgasafvoer",
    type: "Plaatsing",
    merk: "Vaillant",
    description:
      "Wandketel in een technische ruimte, met nieuwe concentrische rookgasafvoer, filter en koperen aansluitingen. Het expansievat en de bestaande leidingen zijn netjes ingepast.",
    image: vaillantEcotec.url,
    alt: "Nieuw geplaatste Vaillant wandketel met witte rookgasafvoer, expansievat en koperen leidingen in een kelder",
  },
  {
    title: "Paneelradiator onder het raam",
    type: "Radiatoren",
    description:
      "Paneelradiator onder een breed raam, met de leidingen netjes langs de plint weggewerkt. Een plaats onder het raam zorgt voor een gelijkmatige warmte in de kamer.",
    image: radiatorSlaapkamer.url,
    alt: "Witte paneelradiator onder een breed raam met leidingen langs de plint in een kamer met parket",
  },
  {
    title: "Onderhoud met reiniging van de warmtewisselaar",
    type: "Onderhoud",
    merk: "Vaillant",
    description:
      "Ketel open voor een volledige onderhoudsbeurt: brander en warmtewisselaar gereinigd en gecontroleerd, met onderhoudsattest.",
    image: vaillantOnderhoud.url,
    alt: "Geopende ketel tijdens een onderhoudsbeurt met zichtbare brander en warmtewisselaar",
  },
  {
    title: "Werkdag bij de klant",
    type: "Interventie",
    description:
      "Junkers-ketel geopend tijdens een interventie: brander, aansluitingen en instellingen van nabij nagekeken.",
    image: ketelOpenInterventie.url,
    alt: "Geopende Junkers-verwarmingsketel met zichtbare brander, aansluitingen en display tijdens een interventie",
  },
  {
    title: "Controle van een warmwatertoestel",
    type: "Herstelling",
    description:
      "Nazicht en herstelling van een warmwatertoestel in een badkamer, met controle van de rookgasafvoer.",
    image: techniekerKetel.url,
    alt: "Technieker controleert een warmwatertoestel in een badkamer",
  },
];


export const serviceCategories = [
  {
    key: "verwarming",
    title: "Verwarming",
    description: "Verwarmingsketels plaatsen, vervangen, onderhouden en herstellen, voor verschillende verwarmingsmerken. Ook voor radiatoren en de warmwatervoorziening van uw ketel.",
    items: [
      { label: "Nieuwe ketel / ketel vervangen", to: "/verwarmingsketels/nieuwe-verwarmingsketel" },
      { label: "Stookolieketels", to: "/stookolie" },
      { label: "Onderhoud ketels", to: "/onderhoud" },
      { label: "Herstelling ketels", to: "/herstellingen" },
      { label: "Alle ketelmerken", to: "/merken" },
      { label: "Radiatoren", to: "/radiatoren" },
      { label: "Algemene verwarmingswerken", to: "/radiatoren", hash: "renovatie" },
      { label: "Totaalrenovatie centrale verwarming", to: "/radiatoren", hash: "renovatie" },
    ],
    cta: "Bekijk verwarming",
    to: "/verwarmingsketels",
  },
  {
    key: "sanitair",
    title: "Sanitair",
    description: "Algemene sanitaire werken, handenwassers, kranen en lekkages opsporen. Ook warmwatertoestellen, close-in boilers en waterverzachters, netjes aangesloten op uw leidingen.",
    items: [
      { label: "Algemene sanitaire werken", to: "/algemeen-sanitair" },
      { label: "Sanitaire kranen", to: "/sanitair" },
      { label: "Warmwatertoestellen", to: "/warmwatertoestellen" },
      { label: "Close-in boilers", to: "/sanitair" },
      { label: "Waterverzachters", to: "/sanitair" },
      { label: "Totaalrenovatie sanitair", to: "/sanitair" },
    ],
    cta: "Bekijk sanitair",
    to: "/sanitair",
  },
  {
    key: "gas",
    title: "Gas",
    description: "Gasleidingen plaatsen en aanpassen, onder meer bij een nieuwe of vervangende installatie, met aandacht voor veiligheid en keuring.",
    items: [
      { label: "Gasleidingen", to: "/gasleidingen" },
      { label: "Aanpassingen", to: "/gasleidingen" },
      { label: "Keuring", to: "/gasleidingen" },
    ],
    cta: "Bekijk gas",
    to: "/gasleidingen",
  },
] as const;

export const steps = [
  {
    title: "Vertel ons wat u nodig heeft",
    text: "Vertel welk toestel u heeft en of het om plaatsing, onderhoud of een storing gaat. Een foutcode of foto kan helpen.",
  },
  {
    title: "We bekijken de juiste oplossing",
    text: "We vragen naar de huidige installatie, uw warmte- en warmwaterbehoefte of de symptomen van de storing.",
  },
  {
    title: "U ontvangt een duidelijk voorstel",
    text: "U krijgt uitleg over de voorgestelde aanpak en wat daarbij komt kijken, voordat we aan de slag gaan.",
  },
  {
    title: "Clima Heat zorgt voor de uitvoering",
    text: "We controleren het resultaat en leggen uit wat we hebben gedaan en waar u nadien op kunt letten.",
  },
] as const;

export const whyUs = [
  {
    title: "Verwarming, sanitair en gas onder één dak",
    text: "Eén aanspreekpunt voor uw ketel, radiatoren, warm water, kranen en gasleidingen. Zo sluiten de werken op elkaar aan.",
  },
  {
    title: "Ervaring met verschillende merken",
    text: "Plaatsing, vervanging, onderhoud en herstelling van onder meer Vaillant, Viessmann, Bulex, Bosch, Junkers, Buderus en Remeha.",
  },
  {
    title: "Werk volgens de geldende normen",
    text: "Correct uitgevoerd onderhoud met officieel attest, conform de Vlaamse wetgeving.",
  },
  {
    title: "Duidelijk voorstel vóór we starten",
    text: "U weet welke oplossing wordt voorgesteld en waarom, voordat er iets gebeurt.",
  },
  {
    title: "Ook na de plaatsing bereikbaar",
    text: "Voor onderhoud, vragen of een storing kunt u ons gewoon opnieuw bellen.",
  },
] as const;

export const faqHome = [
  {
    q: "Wat kost een nieuwe verwarmingsketel?",
    a: "Dat hangt af van uw warmte- en warmwaterbehoefte, de plaats van het toestel en mogelijke aanpassingen aan uw installatie. We bespreken uw situatie en lichten het voorgestelde werk toe.",
  },
  {
    q: "Wanneer moet ik mijn ketel vervangen?",
    a: "Terugkerende storingen, moeilijk verkrijgbare onderdelen of een verbouwing kunnen aanleiding zijn om vervanging te overwegen. We bekijken eerst of herstellen nog zinvol is.",
  },
  {
    q: "Hoe vaak moet een gasketel onderhouden worden?",
    a: "Voor centrale gasketels vanaf 20 kW is in Vlaanderen tweejaarlijks onderhoud door een erkende technicus vereist. Na het uitgevoerde onderhoud bezorgen we het officiële attest.",
  },
  {
    q: "Met welke ketelmerken werkt Clima Heat?",
    a: "We plaatsen, onderhouden en herstellen verwarmingsketels van verschillende merken, waaronder Vaillant, Viessmann, Bulex, Bosch, Junkers, Buderus en Remeha. Heeft u een ander merk? Vermeld het merk en type bij uw aanvraag.",
  },
  {
    q: "Kan ik Clima Heat bellen voor een storing?",
    a: `Zeker. Bel ons op ${company.phone} en geef merk, toesteltype en eventuele foutcode door. We bespreken hoe we de storing het best kunnen nakijken.`,
  },
  {
    q: "In welke regio werken jullie?",
    a: `We werken in ${company.serviceArea}. Twijfelt u of uw gemeente erbij hoort? Bel of stuur een berichtje, dan bevestigen we dat meteen.`,
  },
] as const;

export const navigation = [
  {
    label: "Diensten",
    to: "/diensten",
    children: [
      { label: "Verwarmingsketels — overzicht", to: "/verwarmingsketels", group: "Verwarmingsketels" },
      { label: "Nieuwe ketel / ketel vervangen", to: "/verwarmingsketels/nieuwe-verwarmingsketel", nested: true },
      { label: "Stookolieketels", to: "/stookolie", nested: true },
      { label: "Onderhoud ketel", to: "/onderhoud", nested: true },
      { label: "Herstelling ketel", to: "/herstellingen", nested: true },
      { label: "Vaillant-ketels", to: "/vaillant", nested: true },
      { label: "Radiatoren", to: "/radiatoren" },
      { label: "Algemene verwarmingswerken", to: "/radiatoren", hash: "renovatie" },
      { label: "Totaalrenovatie centrale verwarming", to: "/radiatoren", hash: "renovatie", nested: true },
      { label: "Sanitair — overzicht", to: "/sanitair", group: "Sanitair" },
      { label: "Algemene sanitaire werken", to: "/algemeen-sanitair", nested: true },
      { label: "Sanitaire kranen", to: "/sanitair", hash: "kranen", nested: true },
      { label: "Warmwatertoestellen", to: "/warmwatertoestellen", nested: true },
      { label: "Close-in boilers", to: "/sanitair", hash: "close-in-boilers", nested: true },
      { label: "Waterverzachters", to: "/sanitair", hash: "waterverzachters", nested: true },
      { label: "Totaalrenovatie sanitair", to: "/sanitair", hash: "renovatie", nested: true },
      { label: "Gasleidingen", to: "/gasleidingen" },
    ],
  },
  { label: "Onze merken", to: "/merken" },
  { label: "Onze prijzen", to: "/tarieven" },
  { label: "Realisaties", to: "/realisaties" },
  { label: "Over Clima Heat", to: "/over-ons" },
  { label: "Contact", to: "/contact" },
] as const;
