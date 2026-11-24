import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "../brand/Logo";
import { company, navigation } from "../../lib/site";
import { AppointmentButton } from "../AppointmentButton";
import { Button } from "../ui/button";
import { track } from "../../lib/tracking";

/** Zwevende, afgeronde menubalk die over de grote beelden bovenaan ligt. */
export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3">
      <div className="mx-auto max-w-6xl rounded-lg border border-border/70 bg-background/85 shadow-[0_8px_30px_-12px_oklch(0.23_0.025_240/0.18)] backdrop-blur-md">
        <div className="flex h-16 items-center justify-between gap-2 pl-3 pr-2.5 sm:gap-4">
          <Link to="/" aria-label="Clima Heat Solutions — home">
            <Logo />
          </Link>

          <nav aria-label="Hoofdnavigatie" className="hidden items-center gap-1.5 lg:flex">
            {navigation.map((item) => (
              <div key={item.to} className="group relative">
                <Link
                  to={item.to}
                  className="flex items-center rounded-md bg-muted px-3.5 py-2 text-[13px] font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
                  activeProps={{ className: "!bg-secondary !text-foreground" }}
                >
                  {item.label}
                  {"children" in item && <span className="ml-1 text-[10px] transition-transform group-hover:rotate-180" aria-hidden="true">▾</span>}
                </Link>
                {"children" in item && item.children ? (
                  <div className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-all group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="rounded-lg border border-border bg-background p-2 shadow-lg">
                      {item.children.map((child) => (
                        <Link
                          key={`${child.to}-${child.label}`}
                          to={child.to}
                          {...("hash" in child ? { hash: child.hash } : {})}
                          className={`arrow-link flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted ${"nested" in child && child.nested ? "ml-3 border-l border-border text-muted-foreground" : "mt-1 font-medium"}`}
                        >
                          {child.label} <span aria-hidden="true" className="text-accent-deep">→</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href={company.phoneHref}
              onClick={() => track("phone_click", { location: "header" })}
              className="hidden rounded-md px-3 py-2 text-[13px] font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {company.phone}
            </a>
            <AppointmentButton location="header" className="cta-primary !min-h-11 !px-4 !text-sm shadow-[0_8px_20px_-10px_var(--color-accent)]" />
            <Link
              to="/offerte"
              onClick={() => track("quote_cta_click", { location: "header" })}
              className="cta-secondary arrow-nudge !min-h-11 !px-4 !text-sm"
            >
              Vraag een offerte <span aria-hidden="true">→</span>
            </Link>
          </div>
          <AppointmentButton location="header_mobile" label="Afspraak" className="cta-primary ml-auto !min-h-11 !px-3 !text-sm md:hidden" />
          <Link
            to="/offerte"
            onClick={() => track("quote_cta_click", { location: "header_mobile" })}
            className="cta-secondary !min-h-11 !px-3 !text-sm md:hidden"
          >
            Offerte
          </Link>

          <Button variant="ghost"
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Menu sluiten" : "Menu openen"}
            className="flex size-11 items-center justify-center rounded-md bg-muted lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute inset-x-0 top-0 h-0.5 rounded bg-foreground transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`}
              />
              <span
                className={`absolute inset-x-0 bottom-0 h-0.5 rounded bg-foreground transition-transform ${open ? "-translate-y-1 -rotate-45" : ""}`}
              />
            </span>
          </Button>
        </div>

        {open && (
          <div className="max-h-[calc(100svh-6rem)] overflow-y-auto border-t border-border px-4 pb-5 pt-3 lg:hidden">
            <nav aria-label="Mobiele navigatie" className="grid gap-1">
              {navigation.map((item) => (
                <div key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-2 py-2.5 text-[15px] font-medium"
                  >
                    {item.label}
                  </Link>
                  {"children" in item && item.children ? (
                    <div className="mb-1 ml-2 grid gap-0.5 border-l border-border pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={`${child.to}-${child.label}`}
                          to={child.to}
                          {...("hash" in child ? { hash: child.hash } : {})}
                          onClick={() => setOpen(false)}
                          className={`block py-1.5 text-sm ${"nested" in child && child.nested ? "ml-3 border-l border-border pl-3 text-muted-foreground" : "font-medium text-foreground"}`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
              <Link to="/afspraak-maken" onClick={() => { setOpen(false); track("appointment_cta_click", { location: "mobile_menu" }); }} className="cta-primary mt-3">Maak een afspraak</Link>
              <Link to="/offerte" onClick={() => { setOpen(false); track("quote_cta_click", { location: "mobile_menu" }); }} className="cta-primary mt-3">
                Vraag een offerte
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
