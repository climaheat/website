import type { ReactNode } from "react";
import { QuoteButton } from "./QuoteButton";

type Option = { title: string; text: string; price: string };

/** Aparte dienst voor renovaties: altijd prijs op offerte, los van de vaste uurtarieven. */
export function RenovationBand({ id, eyebrow, title, text, list, options, subject, location, note }: {
  id: string; eyebrow: string; title: string; text: string; list?: readonly string[]; options: readonly Option[]; subject: string; location: string; note?: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[1.1fr_1fr] lg:py-20">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display-2 mt-5">{title}</h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed opacity-80">{text}</p>
          {list && <ul className="mt-6 grid gap-2 text-[15px]">{list.map(i => <li key={i} className="flex gap-3 border-t border-primary-foreground/15 pt-2"><span aria-hidden="true" className="text-accent">—</span>{i}</li>)}</ul>}
          <div className="mt-8"><QuoteButton location={location} subject={subject} /></div>
        </div>
        <div className="grid content-start gap-4">
          {options.map(o => (
            <article key={o.title} className="rounded-xl bg-card p-6 text-card-foreground shadow-sm">
              <h3 className="text-base font-semibold">{o.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.text}</p>
              <p className="mt-4 border-t border-border pt-4 text-2xl font-semibold tracking-tight text-accent-deep">{o.price}</p>
            </article>
          ))}
          {note && <p className="text-xs leading-relaxed opacity-70">{note}</p>}
        </div>
      </div>
    </section>
  );
}
