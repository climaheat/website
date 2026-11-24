export const APPOINTMENT_SUBJECTS = ["Onderhoud gasketel", "Onderhoud mazoutketel", "Keteldepannage / herstelling", "Loodgieterij", "Andere aanvraag"] as const;
export type AppointmentSubject = (typeof APPOINTMENT_SUBJECTS)[number];
export const PRICES = {
  gas: { subject: APPOINTMENT_SUBJECTS[0], net: 110, tiers: [{ count: 3, net: 100 }, { count: 10, net: 90 }], exclusion: "Branderdichting, andere dichtingen, wisselstukken en eventuele materialen zijn niet inbegrepen; bijkomende kosten bespreken we vooraf." },
  oil: { subject: APPOINTMENT_SUBJECTS[1], net: 250, tiers: [{ count: 3, net: 240 }], exclusion: "Sproeier, dichtingen, andere wisselstukken en materialen zijn niet inbegrepen." },
  repair: { subject: APPOINTMENT_SUBJECTS[2], net: 120, extraHour: 60, lateSurcharge: 60, exclusion: "Eerste uur inclusief verplaatsing. Wisselstukken en materialen worden afzonderlijk aangerekend na overleg." },
  plumbing: { subject: APPOINTMENT_SUBJECTS[3], net: 120, extraHour: 60, exclusion: "Eerste uur inclusief verplaatsing. Materialen en wisselstukken worden afzonderlijk aangerekend." },
  missed: { net: 50 },
} as const;
export type PriceKey = "gas" | "oil" | "repair" | "plumbing";
/** Public labels may evolve without changing stored request subjects or tracking values. */
export function serviceLabel(subject: string) { return subject === APPOINTMENT_SUBJECTS[1] || subject === "Onderhoud stookolieketel" ? "Onderhoud stookolieketel (mazoutketel)" : subject; }
export function gross(net: number, vat: 6 | 21 = 21) { return Math.round(net * (100 + vat)) / 100; }
export function euros(amount: number) { return new Intl.NumberFormat("nl-BE", { style: "currency", currency: "EUR" }).format(amount); }
export function priceForSubject(subject: string): PriceKey | undefined {
  return (["gas", "oil", "repair", "plumbing"] as const).find(key => PRICES[key].subject === subject);
}
export const VAT_NOTE = "Prijzen in het groot zijn inclusief 21% btw; het basistarief exclusief btw staat eronder. Afhankelijk van de wettelijke voorwaarden kan 6% btw van toepassing zijn. Materialen en wisselstukken zijn niet inbegrepen, tenzij uitdrukkelijk vermeld. Volledige renovaties vallen niet onder deze tarieven en gebeuren op offerte.";
export function vatHint(key: PriceKey) { return key === "gas" ? `Afhankelijk van de wettelijke voorwaarden kan 6% btw van toepassing zijn: dan ${euros(gross(PRICES.gas.net, 6))}.` : "Afhankelijk van de wettelijke voorwaarden kan een ander btw-tarief van toepassing zijn."; }
export const MISSED_NOTE = `Een vergoeding van ${euros(gross(PRICES.missed.net))} incl. 21% btw (${euros(PRICES.missed.net)} excl. btw) kan worden aangerekend wanneer u niet thuis bent op het afgesproken tijdstip, de ketel niet toegankelijk is of het onderhoud door omstandigheden bij u niet kan doorgaan.`;
export const PARKING_NOTE = "Eventuele parkeerkosten in het historisch centrum van Antwerpen kunnen afzonderlijk worden aangerekend wanneer dit vooraf duidelijk is meegedeeld. Parkeerboetes en retributies worden niet automatisch doorgerekend.";
export function serviceIntent(variant: string, subject?: string) {
  if (variant === "herstelling") return { subject: APPOINTMENT_SUBJECTS[2], price: "repair" as PriceKey };
  if (subject === "Stookolieketel" || subject === "Onderhoud stookolieketel") return { subject: APPOINTMENT_SUBJECTS[1], price: "oil" as PriceKey };
  if (variant === "onderhoud") return { subject: APPOINTMENT_SUBJECTS[0], price: "gas" as PriceKey };
  if (subject === "Algemene sanitaire werken") return { subject: APPOINTMENT_SUBJECTS[3], price: "plumbing" as PriceKey };
  return undefined;
}