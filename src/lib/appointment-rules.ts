import { z } from "zod";
import { APPOINTMENT_SUBJECTS } from "./pricing";
export function todayUtc() { return new Date().toISOString().slice(0, 10); }
export function validDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}
export const appointmentRules = z.object({
  subject: z.enum(APPOINTMENT_SUBJECTS),
  requestedDate: z.string().refine(value => validDate(value) && value >= todayUtc(), "Kies een geldige datum vanaf vandaag."),
  alternativeDate: z.string().refine(value => value === "" || (validDate(value) && value >= todayUtc()), "Kies een geldige alternatieve datum."),
});