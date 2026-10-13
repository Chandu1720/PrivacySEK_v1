import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/accessibility")({
  head: () => seo({ title: "Accessibility Statement | PrivacySEK", description: "PrivacySEK's commitment to an accessible website aligned with WCAG 2.2 AA.", path: "/accessibility" }),
  component: () => (
    <LegalPage name="Accessibility Statement" path="/accessibility" intro="We aim for WCAG 2.2 AA across this website." sections={[
      { h: "What we do", p: "Keyboard navigation, visible focus states, a skip link, semantic landmarks, accessible form errors and reduced-motion support." },
      { h: "Feedback", p: "If something is hard to use, tell us through the contact page and we will respond." },
    ]} />
  ),
});
