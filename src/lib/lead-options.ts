import { APPOINTMENT_SUBJECTS } from "./pricing";
/** Keuzes in het aanvraagformulier, gedeeld door formulier, pagina's en tests. */
export type LeadVariant = "offerte" | "onderhoud" | "herstelling" | "afspraak";

export const BOILER_SUBJECT = "Nieuwe verwarmingsketel / ketel vervangen";

export const LEAD_SUBJECTS: Record<LeadVariant, readonly string[]> = {
  offerte: [BOILER_SUBJECT, "Totaalrenovatie centrale verwarming", "Radiatoren plaatsen of vervangen", "Totaalrenovatie sanitair", "Waterverzachter", "Warmwatertoestel / close-in boiler", "Grotere sanitaire werkzaamheden", "Gasleidingen", "Andere werkzaamheden"],
  afspraak: APPOINTMENT_SUBJECTS,
  onderhoud: ["Onderhoud gasketel", "Onderhoud Vaillant ketel", "Onderhoud stookolieketel", "Andere"],
  herstelling: [
    "Ketel start niet",
    "Geen verwarming",
    "Geen warm water",
    "Foutmelding of storing",
    "Drukproblemen",
    "Andere",
  ],
};

/** Oude of verwante benamingen die naar één keuze in het formulier verwijzen. */
const SUBJECT_ALIASES: Record<string, string> = {
  "Nieuwe verwarmingsketel": BOILER_SUBJECT,
  "Ketel vervangen": BOILER_SUBJECT,
  "Verwarmingsketel vervangen": BOILER_SUBJECT,
  "Sanitaire werkzaamheden": "Grotere sanitaire werkzaamheden",
  "Algemene sanitaire werken": "Grotere sanitaire werkzaamheden",
  "Sanitaire kranen": "Grotere sanitaire werkzaamheden",
  "Radiatoren plaatsen": "Radiatoren plaatsen of vervangen",
  "Warmwatertoestel": "Warmwatertoestel / close-in boiler",
  "Close-in boiler": "Warmwatertoestel / close-in boiler",
  "Andere aanvraag": "Andere werkzaamheden",
  "Complete sanitaire renovatie": "Totaalrenovatie sanitair",
  "Volledige renovatie centrale verwarming": "Totaalrenovatie centrale verwarming",
};

/** Geeft de geldige formulierkeuze terug voor een (mogelijk oude) benaming. */
export function resolveSubject(variant: LeadVariant, wanted?: string | null) {
  const options = LEAD_SUBJECTS[variant];
  if (!wanted) return options[0] ?? BOILER_SUBJECT;
  if (variant === "afspraak") return options.includes(wanted) ? wanted : APPOINTMENT_SUBJECTS[0];
  const mapped = SUBJECT_ALIASES[wanted] ?? wanted;
  return options.includes(mapped) ? mapped : (options[0] ?? BOILER_SUBJECT);
}

export const LEAD_BRANDS = ["Vaillant", "Viessmann", "Bulex", "Bosch", "Junkers", "Buderus", "Remeha", "Ander merk", "Onbekend"] as const;
