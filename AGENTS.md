<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Use the Assimilyze-inspired design system defined in src/styles.css and shared components (Geist type, floating rounded header, small outlined `eyebrow` tags, full-bleed media heroes under the header via `under-header`, contrasting light/dark sections, numbered rows with thin rules instead of generic card grids, dark footer with inset light card) in the existing brand colors; the client chose this direction over the earlier editorial style.
- Each photograph should appear only once across the site: reserve authentic work photos for the realisations portfolio (the homepage may preview three of them, as the client requested), never caption stock imagery as a realisation, and show text-only realisations previews on service pages.
- Lead forms post FormData to `submitLead` (src/lib/leads.functions.ts), which validates, stores attachments in the private `offerte-bijlagen` bucket and inserts a row in `quote_requests` with the service role; visitors have no table or bucket access, so submissions stay private.
- Form choices live in src/lib/lead-options.ts and attachment limits in src/lib/lead-attachments.ts, shared by form, server and tests; pages pass `formSubject` or `/offerte?dienst=` and `resolveSubject` maps old names, so options stay consistent.
- Conversion events fire only after a successful submit (`generate_lead` + request-type event); CTA clicks use `quote_cta_click`, so Google Ads never counts a click as a lead.
- Reviews come only from the `reviews` array in src/lib/site.ts (real Google reviews); the slider renders them and falls back to a Google link when empty, so no content is ever invented.
- ReviewBelt scrolls authentic reviews horizontally, pauses on interaction and reduced motion, and hides loop duplicates from assistive technology.
- Keep landing-page distinctions in ServicePage's editorial focus, content-layout, and filtered-project props; it preserves shared lead actions while giving each search intent its own visual and informational hierarchy.
- Brand content lives on /merken (navigation "Onze merken") with the brand list exported once as `brands` from src/components/sections.tsx; /vaillant stays the Vaillant-specific landing page so search intents stay separate.
- Service offering is grouped into three categories (verwarming, sanitair, gas) defined once in `serviceCategories` in src/lib/site.ts; homepage, /diensten and navigation read from it so the offer stays consistent.
- Moving imagery uses the shared AmbientVideo component (muted, looping, poster frame, lazy-loaded and paused off-screen, `eager` only for heroes, paused under reduced motion) with each clip compressed, served from a CDN asset pointer and used on one page only; service-page heroes render the clip as a dark full-bleed background, so video stays prominent without slowing pages.
- Headings use the display-1/display-hero/display-2/display-3 utilities and the shared SectionHeading/CtaStrip/IntroBand components in src/styles.css and the shared section components; this keeps one consistent title hierarchy and CTA rhythm site-wide.
- QuoteButton normalizes shared quote CTAs to /offerte and preserves the selected service; the quote page puts the form first on smaller screens so a quote click immediately reaches inputs.
- Router scroll restoration is instant so navigating to the quote form never animates through a previous page's scroll position; in-page anchor scrolling retains the CSS behavior.
- Key the quote-page form by its selected service so navigating to a new service on the same page resets stale inputs and attachments.

- Store public prices and appointment service intent in src/lib/pricing.ts; all pages and forms read the same source to prevent contradictory prices.
- Map public appointment labels through serviceLabel without changing stored subjects or tracking values; this preserves existing requests and links when wording changes.
- Appointment requests share the private quote_requests storage flow with requested_date and alternative_date, use request UUIDs for idempotency and require server-side date/conditions validation; requests never imply calendar booking.
- Route service CTAs through serviceIntent: maintenance, repairs and small plumbing go to /afspraak-maken; larger installations remain on /offerte to separate conversion intent.
