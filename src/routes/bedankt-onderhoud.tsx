import { createFileRoute } from "@tanstack/react-router";
import { ThankYou } from "../components/ThankYou";
import { pageMeta } from "../lib/seo";

const meta = pageMeta({
  title: "Bedankt voor uw onderhoudsaanvraag | Clima Heat Solutions",
  description: "Uw onderhoudsaanvraag is verzonden. We nemen contact op om een moment af te spreken.",
  path: "/bedankt-onderhoud",
});

export const Route = createFileRoute("/bedankt-onderhoud")({
  head: () => ({
    ...meta,
    meta: [...meta.meta, { name: "robots", content: "noindex, follow" }],
  }),
  component: () => (
    <ThankYou
      title="Bedankt, uw onderhoudsaanvraag is binnen"
      text="We nemen contact met u op om een moment af te spreken dat u past. Na het onderhoud ontvangt u het officiële attest."
      eventLabel="onderhoud"
    />
  ),
});
