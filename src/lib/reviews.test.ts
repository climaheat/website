import { describe, expect, it } from "vitest";
import { googleRating, reviews } from "./site";

describe("aangeleverde Google-beoordelingen", () => {
  it("gebruikt de score en het totaal uit het klantoverzicht", () => {
    expect(googleRating).toEqual({ score: "5,0", count: 20, asOf: "15 november 2026" });
  });
  it("publiceert alleen de zestien volledige reviews", () => {
    expect(reviews).toHaveLength(16);
    expect(reviews.some((review) => ["sezgi alptekin", "liam cools", "Werner Nils", "Mehmet Garip"].includes(review.author))).toBe(false);
    expect(reviews.find((review) => review.author === "Mustafa Ava")?.text).toBe("Top technieker");
  });
});