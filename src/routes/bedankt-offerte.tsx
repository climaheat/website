import { createFileRoute } from "@tanstack/react-router";
import { ThankYou } from "../components/ThankYou";
import { pageMeta } from "../lib/seo";

export const Route = createFileRoute("/bedankt-offerte")({
  head: () => ({
    ...pageMeta({
      title: "Bedankt voor uw offerteaanvraag | Clima Heat Solutions",
      description: "Uw offerteaanvraag is verzonden. Clima Heat Solutions neemt zo snel mogelijk contact op.",
      path: "/bedankt-offerte",
    }),
    meta: [
      ...pageMeta({
        title: "Bedankt voor uw offerteaanvraag | Clima Heat Solutions",
        description:
          "Uw offerteaanvraag is verzonden. Clima Heat Solutions neemt zo snel mogelijk contact op.",
        path: "/bedankt-offerte",
      }).meta,
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: () => (
    <ThankYou
      title="Bedankt voor uw aanvraag"
      text="We hebben uw offerteaanvraag ontvangen en nemen zo snel mogelijk contact met u op. Heeft u er intussen iets aan toe te voegen? Bel ons gerust."
      eventLabel="offerte"
    />
  ),
});
