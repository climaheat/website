import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useId, useRef, useState } from "react";
import { submitLead } from "../lib/leads.functions";
import { ATTACHMENT_RULES, checkAttachment, formatBytes } from "../lib/lead-attachments";
import { LEAD_BRANDS, LEAD_SUBJECTS, resolveSubject, type LeadVariant } from "../lib/lead-options";
import { PriceSummary } from "./Pricing";
import { Button } from "./ui/button";
import { PRICES, euros, gross, priceForSubject, serviceLabel, VAT_NOTE, MISSED_NOTE, PARKING_NOTE } from "../lib/pricing";
import { appointmentRules, todayUtc } from "../lib/appointment-rules";
import { track } from "../lib/tracking";

const TITLES: Record<LeadVariant, { title: string; button: string; thanks: string; event: "quote_request" | "maintenance_request" | "repair_request" | "appointment_request" }> = {
  afspraak: { title: "Maak eenvoudig een afspraak", button: "Verstuur mijn afspraakaanvraag", thanks: "/bedankt-afspraak", event: "appointment_request" },
  offerte: {
    title: "Vraag vrijblijvend uw offerte aan",
    button: "Verstuur mijn offerteaanvraag",
    thanks: "/bedankt-offerte",
    event: "quote_request",
  },
  onderhoud: {
    title: "Plan uw onderhoud",
    button: "Plan mijn onderhoud",
    thanks: "/bedankt-onderhoud",
    event: "maintenance_request",
  },
  herstelling: {
    title: "Herstelling aanvragen",
    button: "Vraag een herstelling aan",
    thanks: "/bedankt-herstelling",
    event: "repair_request",
  },
};

const CONTACT_FIELDS = ["name", "phone", "email", "postalCode"] as const;

export function LeadForm({
  variant = "offerte",
  defaultSubject,
  defaultBrand,
  compact = false,
  id = "aanvraag",
}: {
  variant?: LeadVariant | undefined;
  defaultSubject?: string | undefined;
  defaultBrand?: string | undefined;
  compact?: boolean | undefined;
  id?: string | undefined;
}) {
  const navigate = useNavigate();
  const send = useServerFn(submitLead);
  const config = TITLES[variant];
  const subjects = LEAD_SUBJECTS[variant];
  const [subject, setSubject] = useState(() => resolveSubject(variant, defaultSubject));
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [fileErrors, setFileErrors] = useState<string[]>([]);
  const [filled, setFilled] = useState<Record<string, boolean>>({});
  const startedRef = useRef<number | null>(null);
  const submittingRef = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uid = useId();
  const requestIdRef = useRef<string | null>(null);
  const appointment = variant === "afspraak";
  const priceKey = priceForSubject(subject);

  const contactDone = CONTACT_FIELDS.filter((f) => filled[f]).length;

  const onInput = (event: React.FormEvent<HTMLFormElement>) => {
    if (startedRef.current === null) {
      startedRef.current = Date.now();
      track("form_start", { form_type: variant });
    }
    const target = event.target as HTMLInputElement;
    if ((CONTACT_FIELDS as readonly string[]).includes(target.name)) {
      setFilled((prev) => ({ ...prev, [target.name]: target.value.trim().length > 0 }));
    }
  };

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = [...files];
    const problems: string[] = [];
    for (const file of Array.from(list)) {
      const problem = checkAttachment(file, next);
      if (problem) problems.push(problem);
      else next.push(file);
    }
    setFiles(next);
    setFileErrors(problems);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFileErrors([]);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;
    const form = new FormData(event.currentTarget);
    const values = {
      name: String(form.get("name") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      postalCode: String(form.get("postalCode") ?? "").trim(),
    };

    const nextErrors: Record<string, string> = {};
    if (values.name.length < 2) nextErrors["name"] = "Vul uw naam in.";
    if (values.phone.replace(/\D/g, "").length < 8) nextErrors["phone"] = "Vul een geldig telefoonnummer in.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(values.email)) nextErrors["email"] = "Vul een geldig e-mailadres in.";
    if (values.postalCode.replace(/\D/g, "").length < 4) nextErrors["postalCode"] = "Vul uw postcode in.";
    if (appointment) {
      const dates = appointmentRules.safeParse({ subject, requestedDate: String(form.get("requestedDate") ?? ""), alternativeDate: String(form.get("alternativeDate") ?? "") });
      if (!dates.success) for (const issue of dates.error.issues) nextErrors[String(issue.path[0])] = issue.message;
      if (!form.get("conditions")) nextErrors["conditions"] = "Bevestig dat u de prijsvoorwaarden heeft gelezen.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // Anti-spam: verborgen veld gevuld of formulier onmenselijk snel ingevuld.
    const trap = String(form.get("company_url") ?? "");
    const tooFast = startedRef.current !== null && Date.now() - startedRef.current < 1500;
    if (trap !== "" || tooFast) {
      setStatus("error");
      return;
    }

    const payload = new FormData();
    payload.set("type", variant);
    requestIdRef.current ??= crypto.randomUUID();
    payload.set("requestId", requestIdRef.current);
    payload.set("startedAt", String(startedRef.current ?? Date.now()));
    if (appointment) {
      payload.set("requestedDate", String(form.get("requestedDate") ?? ""));
      payload.set("alternativeDate", String(form.get("alternativeDate") ?? ""));
      payload.set("conditions", String(form.get("conditions") ?? ""));
    }
    payload.set("name", values.name);
    payload.set("phone", values.phone);
    payload.set("email", values.email);
    payload.set("postalCode", values.postalCode);
    payload.set("subject", subject);
    payload.set("brand", String(form.get("brand") ?? ""));
    payload.set("message", String(form.get("message") ?? "").trim());
    payload.set("pagePath", typeof window !== "undefined" ? window.location.pathname : "");
    payload.set("company_url", "");
    for (const file of files) payload.append("files", file, file.name);

    submittingRef.current = true;
    setStatus("sending");
    try {
      const result = await send({ data: payload });
      if (!result.ok) throw new Error("Verzenden mislukt");
      // Conversie: enkel hier, na een geslaagde opslag.
      track(config.event, { form_type: variant, subject, postal_code: values.postalCode, attachments: files.length });
      track("generate_lead", { form_type: variant, subject, attachments: files.length });
      navigate({ to: config.thanks });
    } catch {
      submittingRef.current = false;
      setStatus("error");
    }
  }

  const steps = [
    { label: "Uw aanvraag", progress: 1 },
    { label: "Uw gegevens", progress: contactDone / CONTACT_FIELDS.length },
    { label: "Verzenden", progress: status === "sending" ? 1 : 0 },
  ];

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      onInput={onInput}
      noValidate
      className="overflow-hidden rounded-lg border border-border bg-card shadow-glass"
    >
      {/* Titelbalk met voortgang */}
      <div className="bg-ink px-5 pb-5 pt-5 text-ink-foreground sm:px-7 sm:pt-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ember">{appointment ? "Aanvraag · bevestiging volgt" : "Vrijblijvend · zonder verplichting"}</p>
            <h2 className="mt-2 font-display text-xl font-semibold sm:text-2xl">{config.title}</h2>
          </div>
        </div>
        <ol className="mt-5 grid grid-cols-3 gap-2" aria-label="Stappen">
          {steps.map((step, i) => (
            <li key={step.label}>
              <span className="block h-1 overflow-hidden rounded-full bg-ink-foreground/15">
                <span className="block h-full rounded-full bg-ember transition-[width] duration-500" style={{ width: `${Math.round(step.progress * 100)}%` }} />
              </span>
              <span className={`mt-2 block text-[11px] sm:text-xs ${step.progress > 0 ? "text-ink-foreground" : "text-ink-foreground/55"}`}>
                {i + 1}. {step.label}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="p-5 sm:p-7">
        {/* 1 — Aanvraag */}
        <fieldset>
          <legend className="text-sm font-semibold">
            {variant === "herstelling" ? "Wat is het probleem?" : "Waarmee kunnen we helpen? *"}
          </legend>
          <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
            {subjects.map((option) => (
              <label
                key={option}
                className={`flex cursor-pointer items-center gap-2.5 rounded-md border px-3.5 py-3 text-sm transition-colors ${
                  subject === option ? "border-accent bg-accent/8 font-semibold" : "border-input bg-background/70 hover:border-accent/50"
                }`}
              >
                <input
                  type="radio"
                  name="subject"
                  value={option}
                  checked={subject === option}
                  onChange={() => setSubject(option)}
                  className="accent-accent"
                />
                {serviceLabel(option)}
              </label>
            ))}
          </div>
        </fieldset>

        {appointment && <div className="mt-5">
          {priceKey ? <PriceSummary priceKey={priceKey} action={false} /> : <p className="text-sm">Voor deze aanvraag bespreken we de prijs vooraf.</p>}
          <p className="text-xs leading-relaxed text-muted-foreground">{VAT_NOTE}</p>
        </div>}
        <label className="mt-5 block">
          <span className="text-sm font-semibold">Merk van uw toestel (optioneel)</span>
          <select name="brand" defaultValue={defaultBrand ?? ""} className="field-input mt-1.5">
            <option value="">Weet ik niet / niet van toepassing</option>
            {LEAD_BRANDS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </label>

        {appointment && <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block"><span className="text-sm font-semibold">Gewenste datum <span className="text-accent">*</span></span><input name="requestedDate" type="date" required min={todayUtc()} className="field-input mt-1.5" aria-invalid={!!errors["requestedDate"]} />{errors["requestedDate"] && <span role="alert" className="text-xs text-destructive">{errors["requestedDate"]}</span>}</label>
          <label className="block"><span className="text-sm font-semibold">Alternatieve datum (optioneel)</span><input name="alternativeDate" type="date" min={todayUtc()} className="field-input mt-1.5" />{errors["alternativeDate"] && <span role="alert" className="text-xs text-destructive">{errors["alternativeDate"]}</span>}</label>
        </div>}
        {!compact && (
          <label className="mt-5 block">
            <span className="text-sm font-semibold">{appointment ? "Korte omschrijving (optioneel)" : "Vrij bericht (optioneel)"}</span>
            <textarea
              name="message"
              rows={3}
              className="field-input mt-1.5 resize-y"
              placeholder="Merk en leeftijd van uw toestel, wat u opmerkt, …"
            />
          </label>
        )}

        {/* Bijlagen */}
        <div className="mt-5">
          <span className="text-sm font-semibold" id={`${uid}-files-label`}>Voeg eventueel een foto of bestand toe</span>
          <label
            htmlFor={`${uid}-files`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              addFiles(e.dataTransfer.files);
            }}
            className="mt-1.5 flex cursor-pointer items-center gap-3 rounded-md border border-dashed border-input bg-background/70 px-4 py-3.5 text-sm transition-colors hover:border-accent"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-accent-deep" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                <path d="M12 16V4" /><path d="m7 9 5-5 5 5" /><path d="M5 20h14" />
              </svg>
            </span>
            <span>
              <span className="font-medium">Kies een foto of bestand</span>
              <span className="block text-xs text-muted-foreground">
                JPG, PNG, WEBP of PDF · max. {ATTACHMENT_RULES.maxFiles} bestanden · elk tot {formatBytes(ATTACHMENT_RULES.maxFileBytes)} · samen tot {formatBytes(ATTACHMENT_RULES.maxTotalBytes)}
              </span>
            </span>
          </label>
          <input
            ref={fileInputRef}
            id={`${uid}-files`}
            type="file"
            multiple
            accept={ATTACHMENT_RULES.accept}
            aria-labelledby={`${uid}-files-label`}
            onChange={(e) => addFiles(e.currentTarget.files)}
            className="sr-only"
          />
          {files.length > 0 && (
            <ul className="mt-2 grid gap-1.5" aria-live="polite">
              {files.map((file, i) => (
                <li key={`${file.name}-${i}`} className="flex items-center justify-between gap-3 rounded-md bg-muted px-3 py-2 text-sm">
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="text-accent" aria-hidden="true">✓</span>
                    <span className="truncate">{file.name}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">{formatBytes(file.size)}</span>
                  </span>
                  <Button variant="link" type="button" onClick={() => removeFile(i)} className="shrink-0 text-xs font-medium text-muted-foreground underline hover:text-foreground">
                    Verwijderen
                  </Button>
                </li>
              ))}
              <li className="text-xs font-medium text-accent-deep">
                {files.length === 1 ? "1 bestand toegevoegd" : `${files.length} bestanden toegevoegd`}
              </li>
            </ul>
          )}
          {fileErrors.length > 0 && (
            <ul role="alert" className="mt-2 grid gap-1 text-xs font-medium text-destructive">
              {fileErrors.map((err) => <li key={err}>{err}</li>)}
            </ul>
          )}
        </div>

        {/* 2 — Gegevens */}
        <p className="mt-7 border-t border-border pt-5 text-sm font-semibold">Uw gegevens</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Field label="Naam" name="name" error={errors["name"]} autoComplete="name" />
          <Field label="Telefoon" name="phone" type="tel" error={errors["phone"]} autoComplete="tel" inputMode="tel" />
          <Field label="E-mail" name="email" type="email" error={errors["email"]} autoComplete="email" inputMode="email" />
          <Field label="Postcode" name="postalCode" error={errors["postalCode"]} autoComplete="postal-code" inputMode="numeric" />
        </div>

        {/* Anti-spam honeypot, verborgen voor bezoekers */}
        <div className="hidden" aria-hidden="true">
          <label>
            Website
            <input type="text" name="company_url" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        {appointment && <div className="mt-6 border-t border-border pt-5">
          <p className="text-xs leading-relaxed text-muted-foreground">{MISSED_NOTE}</p>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{PARKING_NOTE} Bijkomende werkzaamheden bespreken we vooraf. Geen afzonderlijke weekendtoeslagen.</p>
          {priceKey === "repair" && <p className="mt-3 text-xs text-muted-foreground">Last-minute spoedtoeslag na 22.00 uur: + {euros(gross(PRICES.repair.lateSurcharge))} incl. 21% btw ({euros(PRICES.repair.lateSurcharge)} excl. btw), boven op het eerste uur. Geen gegarandeerde interventietermijn.</p>}
          <label className="mt-4 flex items-start gap-2 text-sm"><input type="checkbox" name="conditions" value="accepted" required className="mt-1 accent-accent" /><span>Ik heb de tarieven en voorwaarden gelezen. Mijn afspraak is pas definitief na bevestiging door Clima Heat. <span className="text-accent">*</span></span></label>
          {errors["conditions"] && <p role="alert" className="mt-2 text-xs text-destructive">{errors["conditions"]}</p>}
        </div>}
        {/* 3 — Verzenden */}
        <Button type="submit" disabled={status === "sending"} className="cta-primary cta-lg mt-6 w-full">
          {status === "sending" ? (files.length > 0 ? "Bestanden uploaden en versturen…" : "Versturen…") : config.button}
        </Button>

        {status === "error" && (
          <p role="alert" className="mt-3 text-sm font-medium text-destructive">
            Verzenden lukte niet. Probeer opnieuw of bel ons gerust op.
          </p>
        )}

        <p className="mt-3 text-xs text-muted-foreground">
          Uw gegevens en bestanden gebruiken we enkel om uw aanvraag te behandelen.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  autoComplete,
  inputMode,
}: {
  label: string;
  name: string;
  type?: string | undefined;
  error?: string | undefined;
  autoComplete?: string | undefined;
  inputMode?: "numeric" | "tel" | "email" | "text" | undefined;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label} <span aria-hidden="true" className="text-accent">*</span></span>
      <input
        type={type}
        name={name}
        required
        aria-required="true"
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={error ? true : undefined}
        className="field-input mt-1.5"
      />
      {error && (
        <span role="alert" className="mt-1 block text-xs font-medium text-destructive">
          {error}
        </span>
      )}
    </label>
  );
}
