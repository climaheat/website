import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "../lib/seo";
import { company } from "../lib/site";
import { CookieSettingsButton } from "../components/layout/CookieBanner";

export const Route = createFileRoute("/cookiebeleid")({
  head: () =>
    pageMeta({
      title: "Cookiebeleid | Clima Heat Solutions",
      description:
        "Welke cookies deze website gebruikt, waarvoor ze dienen en hoe u uw keuze aanpast.",
      path: "/cookiebeleid",
    }),
  component: Page,
});

function Page() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-14 sm:py-20">
      <h1 className="text-3xl font-semibold sm:text-4xl">Cookiebeleid</h1>
      <div className="mt-6 grid gap-4 text-[15px] leading-relaxed text-muted-foreground">
        <p>
          Deze website van {company.name} gebruikt drie soorten cookies. U kiest zelf wat u toelaat.
        </p>

        <h2 className="mt-4 font-display text-xl font-semibold text-foreground">
          Noodzakelijke cookies
        </h2>
        <p>
          Nodig om de website te laten werken en om uw cookiekeuze te bewaren. Deze staan altijd aan
          en bevatten geen advertentiegegevens.
        </p>

        <h2 className="mt-4 font-display text-xl font-semibold text-foreground">
          Statistieken (analytics)
        </h2>
        <p>
          Meten hoeveel bezoekers welke pagina's bekijken, zodat we de website kunnen verbeteren.
          Worden pas geplaatst nadat u ze aanvaardt.
        </p>

        <h2 className="mt-4 font-display text-xl font-semibold text-foreground">Marketing</h2>
        <p>
          Meten het resultaat van onze Google Ads-campagnes. Worden pas geplaatst nadat u ze
          aanvaardt. Zolang u geen keuze maakt, staan alle advertentie- en statistiekdoeleinden op
          geweigerd (Google Consent Mode v2).
        </p>

        <h2 className="mt-4 font-display text-xl font-semibold text-foreground">Uw keuze aanpassen</h2>
        <p>
          <CookieSettingsButton className="underline" /> — u kunt uw toestemming op elk moment
          intrekken of uitbreiden. Uw nieuwe keuze geldt onmiddellijk.
        </p>
      </div>
    </section>
  );
}
