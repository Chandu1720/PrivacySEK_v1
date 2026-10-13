import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/cookie-policy")({
  head: () => seo({ title: "Cookie Policy | PrivacySEK", description: "The essential storage and optional, consent-based analytics used on the PrivacySEK website.", path: "/cookie-policy" }),
  component: () => (
    <LegalPage name="Cookie Policy" path="/cookie-policy" intro="We keep storage to a minimum and ask before measuring anything." sections={[
      { h: "Essential storage", p: "We store your consent choice in your browser so we don't ask again." },
      { h: "Optional analytics", p: "If you allow analytics, we count anonymous events such as call-to-action clicks and form steps. No names, emails or message text are recorded." },
      { h: "Third parties", p: "We do not load third-party trackers or advertising cookies." },
      { h: "Changing your choice", p: "Use \"Cookie preferences\" in the footer at any time." },
    ]} />
  ),
});
