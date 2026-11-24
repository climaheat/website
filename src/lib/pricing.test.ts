import { describe, expect, it } from "vitest";
import { APPOINTMENT_SUBJECTS, PRICES, gross, serviceIntent } from "./pricing";
import { appointmentRules } from "./appointment-rules";
describe("Bevestigde tarieven", () => {
  it("gasketelonderhoud: 110 euro excl. en 133,10 incl. 21%", () => { expect(PRICES.gas.net).toBe(110); expect(gross(PRICES.gas.net)).toBe(133.1); });
  it("gasketels vanaf 3 in dezelfde straat: 100 euro excl.", () => { expect(PRICES.gas.tiers[0]).toEqual({ count: 3, net: 100 }); expect(gross(PRICES.gas.tiers[0].net)).toBe(121); });
  it("gasketels vanaf 10 in dezelfde straat: 90 euro excl.", () => { expect(PRICES.gas.tiers[1]).toEqual({ count: 10, net: 90 }); expect(gross(PRICES.gas.tiers[1].net)).toBe(108.9); });
  it("mazoutonderhoud: 250 euro excl. en 302,50 incl.", () => { expect(PRICES.oil.net).toBe(250); expect(gross(PRICES.oil.net)).toBe(302.5); });
  it("mazoutketels vanaf 3 in dezelfde straat: 240 euro excl.", () => { expect(PRICES.oil.tiers[0]).toEqual({ count: 3, net: 240 }); expect(gross(PRICES.oil.tiers[0].net)).toBe(290.4); });
  it("depannage eerste uur inclusief verplaatsing: 120 euro excl.", () => { expect(PRICES.repair.net).toBe(120); expect(gross(PRICES.repair.net)).toBe(145.2); });
  it("depannage bijkomend uur: 60 euro excl.", () => { expect(PRICES.repair.extraHour).toBe(60); expect(gross(PRICES.repair.extraHour)).toBe(72.6); });
  it("spoedtoeslag na 22 uur: 60 euro excl. boven op eerste uur", () => { expect(PRICES.repair.lateSurcharge).toBe(60); expect(gross(PRICES.repair.net + PRICES.repair.lateSurcharge)).toBe(217.8); });
  it("loodgieterij eerste uur inclusief verplaatsing: 120 euro excl.", () => { expect(PRICES.plumbing.net).toBe(120); expect(gross(PRICES.plumbing.net)).toBe(145.2); });
  it("loodgieterij bijkomend uur: 60 euro excl.", () => { expect(PRICES.plumbing.extraHour).toBe(60); expect(gross(PRICES.plumbing.extraHour)).toBe(72.6); });
  it("mislukte afspraak: 50 euro excl. en 60,50 incl.", () => { expect(PRICES.missed.net).toBe(50); expect(gross(PRICES.missed.net)).toBe(60.5); });
  it("kan 6% berekenen zonder dit automatisch toe te passen", () => { expect(gross(110, 6)).toBe(116.6); expect(gross(110)).toBe(133.1); });
});
describe("Afspraak versus offerte", () => {
  it("onderhoud gaat naar afspraken", () => expect(serviceIntent("onderhoud")?.subject).toBe("Onderhoud gasketel"));
  it("mazout gaat naar afspraken", () => expect(serviceIntent("offerte", "Stookolieketel")?.subject).toBe("Onderhoud mazoutketel"));
  it("stookolieketelonderhoud selecteert de oliedienst en het tarief", () => { expect(serviceIntent("onderhoud", "Onderhoud stookolieketel")).toEqual({ subject: APPOINTMENT_SUBJECTS[1], price: "oil" }); });
  it("herstelling gaat naar afspraken", () => expect(serviceIntent("herstelling")?.subject).toBe("Keteldepannage / herstelling"));
  it("kleine sanitaire werken gaan naar afspraken", () => expect(serviceIntent("offerte", "Algemene sanitaire werken")?.subject).toBe("Loodgieterij"));
  it("nieuwe ketel blijft offerte", () => expect(serviceIntent("offerte", "Nieuwe verwarmingsketel / ketel vervangen")).toBeUndefined());
  it("weigert een ontbrekende voorkeursdatum", () => expect(appointmentRules.safeParse({ subject: APPOINTMENT_SUBJECTS[0], requestedDate: "", alternativeDate: "" }).success).toBe(false));
  it("weigert ongeldige en vroegere datums", () => { expect(appointmentRules.safeParse({ subject: APPOINTMENT_SUBJECTS[0], requestedDate: "2027-02-30", alternativeDate: "" }).success).toBe(false); expect(appointmentRules.safeParse({ subject: APPOINTMENT_SUBJECTS[0], requestedDate: "2020-01-01", alternativeDate: "" }).success).toBe(false); });
  it("alternatieve datum is optioneel", () => expect(appointmentRules.safeParse({ subject: APPOINTMENT_SUBJECTS[0], requestedDate: "2099-01-01", alternativeDate: "" }).success).toBe(true));
});describe("Renovaties op offerte (feedback 23 nov 2026)", async () => {
  const { LEAD_SUBJECTS, resolveSubject } = await import("./lead-options");
  it("offerteformulier bevat totaalrenovatie sanitair", () => expect(LEAD_SUBJECTS.offerte).toContain("Totaalrenovatie sanitair"));
  it("oude renovatienaam verwijst naar totaalrenovatie sanitair", () => expect(resolveSubject("offerte", "Complete sanitaire renovatie")).toBe("Totaalrenovatie sanitair"));
  it("offerteformulier bevat volledige renovatie centrale verwarming", () => expect(LEAD_SUBJECTS.offerte).toContain("Totaalrenovatie centrale verwarming"));
  it("renovaties zijn geen afspraakdienst met vast tarief", () => expect(LEAD_SUBJECTS.afspraak).not.toContain("Totaalrenovatie sanitair"));
});
