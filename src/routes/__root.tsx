import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { StickyCta } from "../components/layout/StickyCta";
import { CookieBanner } from "../components/layout/CookieBanner";
import { localBusiness } from "../lib/seo";
import { company } from "../lib/site";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5">
      <div className="glass-panel max-w-lg p-8 text-center">
        <p className="eyebrow">Pagina niet gevonden</p>
        <h1 className="mt-3 font-display text-3xl font-semibold">Deze pagina bestaat niet (meer)</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Zoekt u een nieuwe verwarmingsketel, onderhoud of een herstelling? Kies hieronder of bel
          ons gerust op {company.phone}.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="cta-primary">
            Vraag vrijblijvend een offerte
          </Link>
          <Link to="/" className="cta-secondary">
            Naar de homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5">
      <div className="glass-panel max-w-lg p-8 text-center">
        <h1 className="font-display text-2xl font-semibold">Deze pagina laadde niet</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Probeer het opnieuw, of bel ons rechtstreeks op {company.phone}.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="cta-primary"
          >
            Opnieuw proberen
          </button>
          <a href="/" className="cta-secondary">
            Naar de homepage
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Clima Heat Solutions — verwarming, sanitair & gas in Antwerpen" },
      {
        name: "description",
        content:
          "Clima Heat Solutions: verwarming, sanitair en gas in Antwerpen en Vlaanderen. Ketels van Vaillant, Viessmann, Bulex, Bosch, Junkers, Buderus en Remeha.",
      },
      { property: "og:site_name", content: "Clima Heat Solutions" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#E2622A" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(localBusiness),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="nl-BE">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-ink-foreground"
      >
        Naar de inhoud
      </a>
      <Header />
      <main id="main" className="pt-[var(--header-space)]">
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <Footer />
      <StickyCta />
      <CookieBanner />
    </QueryClientProvider>
  );
}
