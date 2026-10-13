import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => seo({ title: "Terms of Use | PrivacySEK", description: "Terms governing use of the PrivacySEK website and its content.", path: "/terms" }),
  component: () => (
    <LegalPage name="Terms of Use" path="/terms" intro="The rules for using this website." sections={[
      { h: "Website content", p: "Content is provided for information only and is not legal advice." },
      { h: "Acceptable use", p: "Do not misuse the site, attempt unauthorized access or submit false information." },
      { h: "Changes", p: "We may update these terms; the current version is always published here." },
    ]} />
  ),
});
