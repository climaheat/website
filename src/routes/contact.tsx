import { createFileRoute } from "@tanstack/react-router";
import { AppointmentButton } from "../components/AppointmentButton";
import { QuoteButton } from "../components/QuoteButton";
import { LeadForm } from "../components/LeadForm";
import { Breadcrumbs } from "../components/PageHero";
import { AmbientVideo } from "../components/AmbientVideo";
import heroVideo from "@/assets/videos/contact.mp4.asset.json";
import heroPoster from "@/assets/videos/contact-poster.jpg";
import prepImg from "@/assets/onderhoud.jpg";
import { CallButton, Faq, HeroTrust, MailButton, Section, SectionHeading, Steps, Werkgebied } from "../components/sections";
import { breadcrumbSchema, pageMeta } from "../lib/seo";
import { company, faqHome, whatsappHref } from "../lib/site";
import { track } from "../lib/tracking";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export const Route = createFileRoute("/contact")({
  head: () => ({
    ...pageMeta({
      title: "Offerte aanvragen of contact | Clima Heat Solutions",
      description:
        "Vraag vrijblijvend een offerte voor een nieuwe verwarmingsketel, onderhoud, herstelling, sanitair of gasleidingen. Bel of mail Clima Heat Solutions in Antwerpen.",
      path: "/contact",
    }),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(breadcrumbSchema(crumbs)) }],
  }),
  component: Contact,
});

const situaties = [
  ["Offerte voor een nieuwe ketel", "Geef het merk, type en de plaats van uw huidige toestel door, samen met uw postcode. Een foto van de ketel en de aansluitingen helpt om een eerste inschatting te maken. Daarna bespreken we een bezoek om de situatie ter plaatse te bekijken."],
  ["Onderhoud inplannen", "Vermeld wanneer het laatste onderhoud plaatsvond en welk toestel u heeft. Zo kunnen we de juiste tijd voorzien. Na het onderhoud ontvangt u het officiële attest."],
  ["Storing of defect", "Bij een storing is bellen de snelste weg. Noteer de foutcode op het display en de waterdruk, en vertel sinds wanneer het probleem zich voordoet."],
  ["Sanitair of gas", "Voor een kraan, boiler of waterverzachter: vermeld waar het toestel komt en voeg gerust een foto toe aan het formulier. Voor gasleidingen: beschrijf welk toestel aangesloten moet worden en waar."],
] as const;

const gasTips = [
  "Bedien geen elektrische schakelaars, geen deurbel en maak geen vuur.",
  "Zet ramen en deuren open en draai, indien mogelijk, de gaskraan aan de meter dicht.",
  "Verlaat de woning en bel vanop een veilige plaats uw netbeheerder of, bij acuut gevaar, 112.",
] as const;

function Contact() {
  const channels = [
    {
      label: "Bel ons",
      value: company.phone,
      note: "De snelste weg bij een storing of een dringende vraag.",
      href: company.phoneHref,
      onClick: () => track("phone_click", { location: "contact_channels" }),
    },
    {
      label: "Mail ons",
      value: company.email,
      note: "Handig om foto's van uw toestel of typeplaatje mee te sturen.",
      href: company.emailHref,
      onClick: () => track("email_click", { location: "contact_channels" }),
    },
    {
      label: "WhatsApp",
      value: "Stuur een bericht",
      note: "Handig voor een korte vraag of om snel een foto van uw toestel door te sturen.",
      href: whatsappHref,
      onClick: () => track("whatsapp_click", { location: "contact_channels" }),
      external: true,
    },
    {
      label: "Vraag een offerte",
      value: "Offerteformulier",
      note: "Beschrijf uw vraag; we nemen contact met u op met een duidelijk voorstel.",
      href: "/offerte",
      onClick: () => track("quote_cta_click", { location: "contact_channels" }),
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="under-header relative isolate flex min-h-[78svh] flex-col overflow-hidden bg-ink text-ink-foreground">
        <AmbientVideo eager src={heroVideo.url} poster={heroPoster} className="ken-burns absolute inset-0 -z-20 size-full object-cover" />
        <span className="sr-only">Thermostaat wordt bediend</span>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/75 to-ink/30" aria-hidden="true" />
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pb-8 pt-[calc(var(--header-space)+2rem)]">
          <Breadcrumbs light items={crumbs} />
          <p className="eyebrow animate-rise mt-12 text-ink-foreground/85">Contact &amp; offerte</p>
          <h1 className="display-1 mt-6 max-w-[14ch] !text-[clamp(2.9rem,1.6rem+5.2vw,6.25rem)] !leading-[0.95]">
            <span className="line-mask"><span>Vertel ons waarmee</span></span>
            <span className="line-mask"><span style={{ animationDelay: "120ms" }} className="text-ink-foreground/55">we kunnen helpen.</span></span>
          </h1>
          <p className="lead animate-rise mt-7 max-w-[54ch] text-ink-foreground/80" style={{ animationDelay: "250ms" }}>
            Een ketel laten plaatsen, een onderhoud aanvragen, een storing laten nakijken of werken aan sanitair of gas? Beschrijf kort uw situatie en vermeld het merk, het type toestel en uw postcode.
          </p>
          <div className="animate-rise mt-8 flex flex-wrap gap-2.5" style={{ animationDelay: "350ms" }}>
            <AppointmentButton location="contact_hero" />
            <QuoteButton location="contact_hero" className="cta-ghost-light cta-lg" />
            <CallButton location="contact_hero" className="cta-ghost-light cta-lg" />
            <MailButton location="contact_hero" className="cta-ghost-light cta-lg" />
            <a href="#formulier" className="cta-ghost-light cta-lg arrow-nudge">Offerteformulier <span aria-hidden="true">↓</span></a>
          </div>
          <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-14">
            <HeroTrust />
          </div>
        </div>
      </section>

      {/* DRIE MANIEREN */}
      <Section>
        <SectionHeading
          eyebrow="Direct contact"
          title="Kies wat voor u het makkelijkst is."
          intro="Bellen, mailen, WhatsApp of het formulier invullen: elke aanvraag komt bij Clima Heat terecht en wordt persoonlijk opgevolgd. Bij een storing belt u best rechtstreeks, zo kunnen we meteen de eerste vragen stellen."
        />
        <ol className="mt-14 border-t border-border">
          {channels.map((c, i) => (
            <li key={c.label} className="border-b border-border">
              <a href={c.href} onClick={c.onClick} {...("external" in c && c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group grid gap-3 py-8 sm:py-10 lg:grid-cols-12 lg:items-center lg:gap-10">
                <span className="flex items-baseline gap-4 lg:col-span-3">
                  <span className="text-sm tabular-nums text-accent">0{i + 1}</span>
                  <span className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">{c.label}</span>
                </span>
                <span className={`min-w-0 break-words font-medium leading-none tracking-[-0.045em] transition-colors duration-300 group-hover:text-accent lg:col-span-6 ${c.value.includes("@") ? "text-[clamp(1.35rem,0.9rem+1.9vw,2.4rem)]" : "text-[clamp(1.9rem,1.2rem+2.8vw,3.75rem)]"}`}>
                  {c.value}
                </span>
                <span className="flex items-center justify-between gap-6 lg:col-span-3">
                  <span className="max-w-[34ch] text-sm leading-relaxed text-muted-foreground">{c.note}</span>
                  <span className="text-2xl text-accent transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </Section>

      {/* GEGEVENS + FORMULIER */}
      <Section id="formulier" tone="muted">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Afspraak of offerte</p>
            <h2 className="display-2 reveal mt-5 max-w-[12ch]">Uw aanvraag, zonder verplichting.</h2>
            <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-muted-foreground">
              Hoe concreter uw vraag, hoe gerichter we kunnen antwoorden. Vermeld uw postcode en, indien van toepassing, het merk en type van uw toestel.
            </p>
            <p className="mt-5 text-sm text-muted-foreground">Onderhoud, een herstelling of een klein sanitair werk? Vraag rechtstreeks een afspraak aan met zichtbaar tarief. Grotere installaties bespreken we via een offerte.</p>
            <AppointmentButton location="contact_form" className="cta-primary mt-5" />
            <dl className="mt-10 border-t border-border text-[15px]">
              {[
                ["Regio", company.region],
                ["Werkgebied", company.serviceArea],
                ["Ondernemingsnummer", company.vat],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-border py-4">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-right font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-7">
            <LeadForm variant="offerte" />
          </div>
        </div>
      </Section>

      {/* GOED VOORBEREID */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">Goed voorbereid</p>
              <h2 className="display-2 reveal mt-5 max-w-[13ch]">Wat we graag van u weten.</h2>
              <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-muted-foreground">
                Met een paar gegevens kunnen we uw aanvraag sneller en gerichter opvolgen. Dit geeft u best door, afhankelijk van uw vraag.
              </p>
              <figure className="mt-8">
                <div className="img-reveal group overflow-hidden rounded-md">
                  <img src={prepImg} alt="Controle van de waterdruk aan een wandketel" loading="lazy" width={1280} height={960} className="aspect-[5/4] w-full object-cover transition-[scale] duration-[1400ms] ease-out group-hover:scale-[1.05]" />
                </div>
                <figcaption className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Waterdruk aflezen</figcaption>
              </figure>
            </div>
          </div>
          <ol className="border-t border-border lg:col-span-7">
            {situaties.map(([title, text], i) => (
              <li key={title} className="reveal group grid grid-cols-[4.5rem_1fr] gap-4 border-b border-border py-8 sm:grid-cols-[7rem_1fr] sm:py-10">
                <span className="text-[2.75rem] font-medium leading-none tracking-[-0.05em] text-accent transition-transform duration-500 group-hover:-translate-y-1 sm:text-[4rem]">0{i + 1}</span>
                <div className="sm:pt-2">
                  <h3 className="display-3">{title}</h3>
                  <p className="mt-2 max-w-[48ch] text-[15px] leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* GASGEUR */}
      <Section tone="ink">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <p className="eyebrow text-ink-foreground/80">Veiligheid eerst</p>
            <h2 className="display-2 reveal mt-5 max-w-[12ch]">Ruikt u gas?</h2>
            <p className="mt-5 max-w-[44ch] text-[15px] leading-relaxed text-ink-foreground/70">
              Neem dan eerst de juiste veiligheidsmaatregelen. Een gasgeur is geen gewone storing en gaat voor op elke offerte of afspraak.
            </p>
          </div>
          <ol className="border-t border-ink-foreground/20 lg:col-span-7">
            {gasTips.map((tip, i) => (
              <li key={tip} className="reveal grid grid-cols-[3.5rem_1fr] gap-4 border-b border-ink-foreground/20 py-6">
                <span className="text-2xl font-medium tracking-[-0.04em] text-ember">0{i + 1}</span>
                <p className="text-[1.05rem] leading-relaxed">{tip}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section>
        <Steps />
      </Section>

      <Section tone="muted">
        <Werkgebied />
      </Section>

      <Section>
        <Faq items={faqHome} />
      </Section>
    </>
  );
}
