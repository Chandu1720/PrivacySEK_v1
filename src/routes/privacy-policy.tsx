import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/privacy-policy")({
  head: () => seo({ title: "Privacy Policy | PrivacySEK", description: "How PrivacySEK collects, uses and protects personal information shared through this website and access requests.", path: "/privacy-policy" }),
  component: () => (
    <LegalPage name="Privacy Policy" path="/privacy-policy" intro="How we handle the information you share with us." sections={[
      { h: "What we collect", p: "Details you submit in the Request Demo form (name, work email, company, job title, company size, interest and message)." },
      { h: "How we use it", p: "Only to respond to your request and arrange a walkthrough. We do not sell personal information." },
      { h: "Analytics", p: "With your consent only, we record anonymous first-party events such as button clicks and form completions. No form contents are included." },
      { h: "Your rights", p: "You can ask to access, correct or delete your information by contacting us." },
    ]} />
  ),
});
