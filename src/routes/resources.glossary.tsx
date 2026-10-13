import { createFileRoute } from "@tanstack/react-router";
import { seo, breadcrumbLd, abs } from "@/lib/seo";
import { PageHero, Section } from "@/components/kit";
import { glossary } from "@/data/resources";

const title = "Privacy Glossary: DPIA, ROPA, DSAR & More | PrivacySEK";
const description = "Plain-language definitions of privacy and data protection terms, from applicability and consent evidence to Data protection and Enforcement and subprocessors.";
const crumbs = [{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }, { name: "Glossary", path: "/resources/glossary" }];

export const Route = createFileRoute("/resources/glossary")({
  head: () => seo({
    title, description, path: "/resources/glossary",
    jsonLd: [
      { "@context": "https://schema.org", "@type": "DefinedTermSet", name: "PrivacySEK Glossary", url: abs("/resources/glossary"), hasDefinedTerm: glossary.map((g) => ({ "@type": "DefinedTerm", name: g.term, description: g.def })) },
      breadcrumbLd(crumbs),
    ],
  }),
  component: Glossary,
});

function Glossary() {
  return (
    <>
      <PageHero crumbs={crumbs} eyebrow="Glossary" title="Privacy and platform terms" />
      <Section>
        <dl className="max-w-3xl divide-y">
          {glossary.map((g) => <div key={g.term} className="py-4"><dt className="font-semibold">{g.term}</dt><dd className="mt-1 text-muted-foreground">{g.def}</dd></div>)}
        </dl>
      </Section>
    </>
  );
}
