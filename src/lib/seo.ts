import { company } from "./site";

export const localBusiness = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: company.name,
  url: "/",
  telephone: company.phone,
  email: company.email,
  vatID: company.vat,
  // Bewust geen straatadres: enkel de regio waarin Clima Heat actief is.
  address: {
    "@type": "PostalAddress",
    addressLocality: company.city,
    addressRegion: "Antwerpen",
    addressCountry: company.country,
  },
  areaServed: [
    { "@type": "City", name: "Antwerpen" },
    { "@type": "AdministrativeArea", name: "Vlaanderen" },
  ],
};

export function serviceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: name,
    url: path,
    provider: { "@type": "HVACBusiness", name: company.name, telephone: company.phone },
    areaServed: [
      { "@type": "City", name: "Antwerpen" },
      { "@type": "AdministrativeArea", name: "Vlaanderen" },
    ],
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path,
    })),
  };
}

export function faqSchema(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** Bouwt de standaard meta-set voor een pagina. */
export function pageMeta({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: string;
}) {
  const canonical = `https://clima-conversion-co.lovable.app${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: canonical },
      { property: "og:locale", content: "nl_BE" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
}
