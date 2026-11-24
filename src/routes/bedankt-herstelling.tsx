import { createFileRoute } from "@tanstack/react-router";
import { ThankYou } from "../components/ThankYou";
import { pageMeta } from "../lib/seo";

const meta = pageMeta({
  title: "Bedankt voor uw herstellingsaanvraag | Clima Heat Solutions",
  description: "Uw herstellingsaanvraag is verzonden. Bel ons gerust als het dringend is.",
  path: "/bedankt-herstelling",
});

export const Route = createFileRoute("/bedankt-herstelling")({
  head: () => ({
    ...meta,
    meta: [...meta.meta, { name: "robots", content: "noindex, follow" }],
  }),
  component: () => (
    <ThankYou
      title="Bedankt, we hebben uw aanvraag ontvangen"
      text="Is het dringend of zit u zonder verwarming? Bel ons dan gerust rechtstreeks — zo gaat het het snelst."
      eventLabel="herstelling"
      urgent
    />
  ),
});
