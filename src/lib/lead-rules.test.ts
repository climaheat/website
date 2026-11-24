import { describe, expect, it } from "vitest";
import { checkAttachment } from "./lead-attachments";
import { BOILER_SUBJECT, LEAD_BRANDS, LEAD_SUBJECTS, resolveSubject } from "./lead-options";

const MB = 1024 * 1024;

describe("offerteformulier: keuzes", () => {
  it("laat onderhoudsaanvragen voor mazout toe via afspraken", () => {
    expect(resolveSubject("afspraak", "Onderhoud mazoutketel")).toBe("Onderhoud mazoutketel");
  });
  it("laat aanvragen voor algemene sanitaire werken toe", () => {
    expect(resolveSubject("offerte", "Algemene sanitaire werken")).toBe("Grotere sanitaire werkzaamheden");
  });
  it("voegt nieuwe ketel en ketel vervangen samen tot één keuze", () => {
    expect(BOILER_SUBJECT).toBe("Nieuwe verwarmingsketel / ketel vervangen");
    expect(LEAD_SUBJECTS.offerte).toContain(BOILER_SUBJECT);
    expect(LEAD_SUBJECTS.offerte).not.toContain("Nieuwe verwarmingsketel");
    expect(LEAD_SUBJECTS.offerte).not.toContain("Ketel vervangen");
  });

  it("zet oude benamingen om naar de samengevoegde keuze", () => {
    expect(resolveSubject("offerte", "Ketel vervangen")).toBe(BOILER_SUBJECT);
    expect(resolveSubject("offerte", "Nieuwe verwarmingsketel")).toBe(BOILER_SUBJECT);
  });

  it("bevat de sanitaire diensten close-in boiler en waterverzachter", () => {
    expect(LEAD_SUBJECTS.offerte).toContain("Warmwatertoestel / close-in boiler");
    expect(LEAD_SUBJECTS.offerte).toContain("Waterverzachter");
  });

  it("biedt alle zeven verwarmingsmerken afzonderlijk aan", () => {
    expect(LEAD_BRANDS).toEqual(["Vaillant", "Viessmann", "Bulex", "Bosch", "Junkers", "Buderus", "Remeha", "Ander merk", "Onbekend"]);
  });
});

describe("offerteformulier: bijlagen", () => {
  it("weigert andere bestandstypes dan JPG, PNG, WEBP of PDF", () => {
    expect(checkAttachment({ name: "plan.docx", size: MB, type: "application/msword" }, [])).not.toBeNull();
    expect(checkAttachment({ name: "foto.jpg", size: MB, type: "image/jpeg" }, [])).toBeNull();
    expect(checkAttachment({ name: "foto.png", size: MB, type: "image/png" }, [])).toBeNull();
    expect(checkAttachment({ name: "foto.webp", size: MB, type: "image/webp" }, [])).toBeNull();
    expect(checkAttachment({ name: "offerte.pdf", size: MB, type: "application/pdf" }, [])).toBeNull();
  });

  it("weigert een bestand groter dan 10 MB", () => {
    expect(checkAttachment({ name: "groot.png", size: 10 * MB + 1, type: "image/png" }, [])).not.toBeNull();
  });

  it("staat maximaal 5 bestanden toe", () => {
    const vijf = Array.from({ length: 5 }, () => ({ size: MB }));
    expect(checkAttachment({ name: "zes.webp", size: MB, type: "image/webp" }, vijf)).not.toBeNull();
  });

  it("weigert wanneer alle bestanden samen boven 20 MB komen", () => {
    expect(checkAttachment({ name: "c.jpg", size: 6 * MB, type: "image/jpeg" }, [{ size: 8 * MB }, { size: 7 * MB }])).not.toBeNull();
  });
});
