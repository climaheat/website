import { Link } from "@tanstack/react-router";
import { PRICES, euros, VAT_NOTE, serviceLabel, type PriceKey } from "../lib/pricing";
import { AppointmentButton } from "./AppointmentButton";
import { Button } from "./ui/button";
import { QuoteButton } from "./QuoteButton";

export const RENOVATIONS = [
  { title: "Totaalrenovatie sanitair", text: "Van het vernieuwen van sanitaire leidingen en aansluitingen tot een volledige renovatie van sanitaire installaties. Clima Heat bekijkt de bestaande situatie en de gewenste werkzaamheden en werkt een voorstel op maat uit." },
  { title: "Totaalrenovatie centrale verwarming", text: "Een volledige vernieuwing van uw centrale verwarming? Clima Heat bekijkt de bestaande installatie, de gewenste aanpassingen en de technische mogelijkheden en stelt een oplossing op maat voor." },
] as const;

/** Renovaties: altijd prijs op offerte, nooit een vanafprijs. */
export function RenovationCard({ title, text }: { title: string; text: string }) {
  return <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm transition-shadow hover:shadow-md">
    <h3 className="text-base font-semibold">{title}</h3>
    <p className="mt-4"><span className="text-3xl font-semibold tracking-tight text-accent-deep">Prijs op offerte</span></p>
    <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">{text}</p>
    <div className="mt-auto pt-5"><QuoteButton location="price_renovation" subject={title} className="cta-primary w-full" /></div>
  </div>;
}
export function PriceSummary({ priceKey, action = true }: { priceKey: PriceKey; action?: boolean }) {
  const price = PRICES[priceKey];
  return <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm transition-shadow hover:shadow-md">
    <h3 className="text-base font-semibold">{serviceLabel(price.subject)}</h3>
    <p className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1"><span className="text-4xl font-semibold tracking-tight tabular-nums text-accent-deep">{euros(price.net)}</span><span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">excl. btw</span></p>
    {"extraHour" in price && <p className="mt-3 text-sm font-medium">Elk bijkomend uur: {euros(price.extraHour)} excl. btw</p>}
    {"tiers" in price && <dl className="mt-4 grid gap-3 border-t border-border pt-4">{price.tiers.map(tier => <div key={tier.count}><dt className="text-sm font-medium">Vanaf {tier.count} ketels in dezelfde straat</dt><dd className="mt-1 text-sm font-semibold tabular-nums">{euros(tier.net)} excl. btw per ketel</dd></div>)}</dl>}
    <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">{price.exclusion}</p>
    {action && <div className="mt-auto pt-5"><AppointmentButton subject={price.subject} location="price" label={priceKey === "repair" ? "Vraag een interventie aan" : "Maak een afspraak"} className="cta-primary w-full" /></div>}
  </div>;
}
export function HomePrices() {
  return <section className="bg-muted"><div className="mx-auto max-w-6xl px-5 py-14">
    <p className="eyebrow">Transparante tarieven</p><h2 className="display-2 mt-5">Weet vooraf wat u betaalt.</h2>
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{(["gas", "oil", "repair", "plumbing"] as const).map(key => <PriceSummary key={key} priceKey={key} />)}</div>
    <p className="mt-4 max-w-4xl text-xs leading-relaxed text-muted-foreground">{VAT_NOTE}</p>
    <Button asChild variant="outline" className="cta-secondary mt-5"><Link to="/tarieven">Bekijk alle tarieven <span aria-hidden="true">→</span></Link></Button>
  </div></section>;
}