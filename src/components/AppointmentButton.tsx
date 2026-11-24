import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { track } from "../lib/tracking";
export function AppointmentButton({ subject, label = "Maak een afspraak", location, className = "cta-primary cta-lg arrow-nudge" }: { subject?: string | undefined; label?: string; location: string; className?: string }) {
  return <Button asChild className={className}><Link to="/afspraak-maken" search={subject ? { dienst: subject } : {}} onClick={() => track("appointment_cta_click", { location })}>{label} <span aria-hidden="true">→</span></Link></Button>;
}