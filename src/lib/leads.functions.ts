import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { appointmentRules } from "./appointment-rules";
import { ATTACHMENT_RULES } from "./lead-attachments";

const leadSchema = z.object({
  type: z.enum(["offerte", "onderhoud", "herstelling", "afspraak"]),
  requestId: z.string().uuid(),
  requestedDate: z.string().optional().default(""),
  alternativeDate: z.string().optional().default(""),
  conditions: z.string().optional().default(""),
  startedAt: z.coerce.number().finite().refine(value => Date.now() - value >= 1500 && Date.now() - value < 86400000, "Ongeldige aanvraag."),
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(120),
  postalCode: z.string().trim().min(4).max(10),
  subject: z.string().trim().min(2).max(80),
  brand: z.string().max(40).optional().default(""),
  message: z.string().max(1500).optional().default(""),
  pagePath: z.string().max(200).optional().default(""),
  /** Anti-spam: verborgen veld moet leeg zijn. */
  trap: z.string().max(0).optional().default(""),
});

export type LeadInput = z.input<typeof leadSchema>;

type ValidFile = { file: File; ext: string; mime: string };

/** Controleert de eerste bytes zodat enkel echte JPG/PNG/WEBP/PDF-bestanden binnenkomen. */
function sniff(bytes: Uint8Array): { ext: string; mime: string } | null {
  const b = bytes;
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return { ext: "jpg", mime: "image/jpeg" };
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return { ext: "png", mime: "image/png" };
  if (b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 && b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50)
    return { ext: "webp", mime: "image/webp" };
  if (b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46) return { ext: "pdf", mime: "application/pdf" };
  return null;
}

function parseInput(data: unknown) {
  if (!(data instanceof FormData)) throw new Error("Ongeldige aanvraag.");
  const get = (key: string) => {
    const value = data.get(key);
    return typeof value === "string" ? value : "";
  };
  const lead = leadSchema.parse({
    type: get("type"),
    requestId: get("requestId") || crypto.randomUUID(),
    requestedDate: get("requestedDate"),
    alternativeDate: get("alternativeDate"),
    conditions: get("conditions"),
    // Existing published quote forms predate these fields; appointments must supply them.
    startedAt: get("startedAt") || (get("type") === "afspraak" ? "" : String(Date.now() - 2000)),
    name: get("name"),
    phone: get("phone"),
    email: get("email"),
    postalCode: get("postalCode"),
    subject: get("subject"),
    brand: get("brand"),
    message: get("message"),
    pagePath: get("pagePath"),
    trap: get("company_url"),
  });
  if (lead.type === "afspraak") {
    appointmentRules.parse(lead);
    if (lead.conditions !== "accepted") throw new Error("Bevestig de prijsvoorwaarden.");
  }
  const files = data
    .getAll("files")
    .filter((f): f is File => typeof f === "object" && f !== null && "arrayBuffer" in f && (f as File).size > 0);
  if (files.length > ATTACHMENT_RULES.maxFiles) throw new Error("Te veel bestanden.");
  let total = 0;
  for (const f of files) {
    if (f.size > ATTACHMENT_RULES.maxFileBytes) throw new Error("Bestand te groot.");
    total += f.size;
  }
  if (total > ATTACHMENT_RULES.maxTotalBytes) throw new Error("Bestanden samen te groot.");
  return { lead, files };
}

/**
 * Ontvangt een aanvraag van de website: valideert, bewaart de bijlagen in een
 * afgeschermde opslagmap en slaat de aanvraag op in de tabel `quote_requests`.
 */
export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => parseInput(data))
  .handler(async ({ data }) => {
    const { lead, files } = data;
    const { trap: _trap, ...values } = lead;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const checked: ValidFile[] = [];
    for (const file of files) {
      const head = new Uint8Array(await file.slice(0, 12).arrayBuffer());
      const kind = sniff(head);
      if (!kind) throw new Error("Bestandstype niet toegestaan.");
      checked.push({ file, ...kind });
    }

    const requestId = values.requestId;
    const { data: existing } = await supabaseAdmin.from("quote_requests").select("id").eq("id", requestId).maybeSingle();
    if (existing) return { ok: true as const, id: requestId, attachments: 0 };
    const folder = `${new Date().toISOString().slice(0, 10)}/${requestId}`;
    const attachments: Array<{ path: string; name: string; size: number; type: string }> = [];

    for (const [index, item] of checked.entries()) {
      const safeBase = item.file.name
        .replace(/\.[^.]+$/, "")
        .normalize("NFKD")
        .replace(/[^a-zA-Z0-9-_]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 50) || "bijlage";
      const path = `${folder}/${index + 1}-${safeBase}.${item.ext}`;
      const { error } = await supabaseAdmin.storage
        .from("offerte-bijlagen")
        .upload(path, await item.file.arrayBuffer(), { contentType: item.mime, upsert: false });
      if (error) {
        if (attachments.length) await supabaseAdmin.storage.from("offerte-bijlagen").remove(attachments.map(item => item.path));
        console.error("[lead] upload mislukt", error.message);
        throw new Error("Upload mislukt.");
      }
      attachments.push({ path, name: item.file.name.slice(0, 120), size: item.file.size, type: item.mime });
    }

    const { error } = await supabaseAdmin.from("quote_requests").insert({
      id: requestId,
      request_type: values.type,
      requested_date: values.requestedDate || null,
      alternative_date: values.alternativeDate || null,
      name: values.name,
      phone: values.phone,
      email: values.email,
      postal_code: values.postalCode,
      subject: values.subject,
      brand: values.brand,
      message: values.message,
      page_path: values.pagePath,
      attachments,
    });
    if (error) {
      if (error.code === "23505") return { ok: true as const, id: requestId, attachments: attachments.length };
      if (attachments.length) await supabaseAdmin.storage.from("offerte-bijlagen").remove(attachments.map(item => item.path));
      console.error("[lead] opslaan mislukt", error.message);
      throw new Error("Opslaan mislukt.");
    }

    return { ok: true as const, id: requestId, attachments: attachments.length };
  });
