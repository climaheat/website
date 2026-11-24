import { Link } from "@tanstack/react-router";
import { track } from "../lib/tracking";

/** Eén rechtstreekse bestemming voor offerteoproepen, met behoud van de dienstkeuze. */
export function QuoteButton({ location, subject, className = "cta-primary cta-lg arrow-nudge" }: {
  location: string;
  subject?: string | undefined;
  className?: string;
}) {
  return (
    <Link to="/offerte" search={subject ? { dienst: subject } : {}} onClick={() => track("quote_cta_click", { location })} className={className}>
      Vraag een offerte <span aria-hidden="true">→</span>
    </Link>
  );
}