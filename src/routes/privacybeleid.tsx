import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "../lib/seo";
import { company } from "../lib/site";
import { CookieSettingsButton } from "../components/layout/CookieBanner";

export const Route = createFileRoute("/privacybeleid")({
  head: () =>
    pageMeta({
      title: "Privacybeleid | Clima Heat Solutions",
      description:
        "Hoe Clima Heat Solutions omgaat met uw persoonsgegevens bij offerteaanvragen, onderhoud en herstellingen.",
      path: "/privacybeleid",
    }),
  component: Page,
});

function Page() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-14 sm:py-20">
      <h1 className="text-3xl font-semibold sm:text-4xl">Privacybeleid</h1>
      <div className="mt-6 grid gap-4 text-[15px] leading-relaxed text-muted-foreground">
        <p>
          {company.name} ({company.street}, {company.postalCode} {company.city}, ondernemingsnummer{" "}
          {company.vat}) is verantwoordelijk voor de verwerking van de gegevens die u via deze website
          doorgeeft.
        </p>

        <h2 className="mt-4 font-display text-xl font-semibold text-foreground">
          Welke gegevens we verwerken
        </h2>
        <p>
          Via onze formulieren vragen we uw naam, telefoonnummer, e-mailadres, postcode, het onderwerp
          van uw aanvraag en optioneel uw bericht. We vragen niets meer dan nodig is om uw aanvraag te
          behandelen.
        </p>

        <h2 className="mt-4 font-display text-xl font-semibold text-foreground">Waarvoor</h2>
        <p>
          Uitsluitend om uw aanvraag te behandelen: u contacteren, een voorstel opmaken, een afspraak
          plannen of een herstelling voorbereiden. We gebruiken uw gegevens niet voor andere doeleinden
          en verkopen ze niet.
        </p>

        <h2 className="mt-4 font-display text-xl font-semibold text-foreground">
          Meting en advertenties
        </h2>
        <p>
          Met uw toestemming meten we het gebruik van deze website en het resultaat van onze
          advertenties via Google Tag Manager, Google Analytics 4 en Google Ads. Die diensten worden
          pas geladen nadat u toestemming gaf. Weigert u, dan blijven ze uit.
        </p>

        <h2 className="mt-4 font-display text-xl font-semibold text-foreground">Uw rechten</h2>
        <p>
          U kunt op elk moment vragen welke gegevens we van u hebben, ze laten corrigeren of laten
          verwijderen, en uw toestemming intrekken. Stuur daarvoor een bericht naar{" "}
          <a href={company.emailHref} className="underline">
            {company.email}
          </a>{" "}
          of bel {company.phone}.
        </p>

        <h2 className="mt-4 font-display text-xl font-semibold text-foreground">Uw keuze aanpassen</h2>
        <p>
          <CookieSettingsButton className="underline" /> — uw nieuwe keuze geldt onmiddellijk.
        </p>
      </div>
    </section>
  );
}
