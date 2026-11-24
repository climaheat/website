/** Regels voor bijlagen bij een offerteaanvraag (gedeeld door formulier en server). */
export const ATTACHMENT_RULES = {
  maxFiles: 5,
  maxFileBytes: 10 * 1024 * 1024,
  maxTotalBytes: 20 * 1024 * 1024,
  accept: ".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf",
  allowedMime: ["image/jpeg", "image/png", "image/webp", "application/pdf"],
  allowedExt: ["jpg", "jpeg", "png", "webp", "pdf"],
} as const;

export function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} kB`;
  return `${(bytes / (1024 * 1024)).toFixed(1).replace(".", ",")} MB`;
}

/** Geeft een foutmelding terug als het bestand niet mag, anders null. */
export function checkAttachment(file: { name: string; size: number; type: string }, current: { size: number }[]) {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const typeOk =
    (ATTACHMENT_RULES.allowedMime as readonly string[]).includes(file.type) ||
    (ATTACHMENT_RULES.allowedExt as readonly string[]).includes(ext);
  if (!typeOk) return `${file.name}: enkel JPG, PNG, WEBP of PDF.`;
  if (file.size > ATTACHMENT_RULES.maxFileBytes) return `${file.name} is groter dan 10 MB.`;
  if (current.length >= ATTACHMENT_RULES.maxFiles) return `Maximaal ${ATTACHMENT_RULES.maxFiles} bestanden.`;
  const total = current.reduce((sum, f) => sum + f.size, 0) + file.size;
  if (total > ATTACHMENT_RULES.maxTotalBytes) return "Samen mogen de bestanden maximaal 20 MB zijn.";
  return null;
}
