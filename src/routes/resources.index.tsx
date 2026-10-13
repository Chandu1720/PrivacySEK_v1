import { createFileRoute, Link } from "@tanstack/react-router";
import { seo, breadcrumbLd, pageLd } from "@/lib/seo";
import { PageHero, Section, FinalCTA } from "@/components/kit";

const title = "Privacy Resources: Blog, Guides, Glossary & FAQs | PrivacySEK";
const description = "Articles, practical guides, a privacy glossary and answers to common questions about privacy operations and the PrivacySEK platform.";
const crumbs = [{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }];

export const Route = createFileRoute("/resources/")({
  head: () => seo({ title, description, path: "/resources", jsonLd: [pageLd(title, description, "/resources"), breadcrumbLd(crumbs)] }),
  component: Resources,
});

const items = [
  { to: "/resources/blog", l: "Blog", d: "Perspectives on privacy operations." },
  { to: "/resources/guides", l: "Guides", d: "Step-by-step practical playbooks." },
  { to: "/resources/glossary", l: "Glossary", d: "Privacy and platform terms." },
  { to: "/resources/faqs", l: "FAQs", d: "Common questions answered." },
] as const;

function Resources() {
  return (
    <>
      <PageHero crumbs={crumbs} eyebrow="Resources" title="Learn how PrivacySEK thinks about privacy" />
      <Section>
        <ul className="grid gap-5 md:grid-cols-2">
          {items.map((i) => <li key={i.to}><Link to={i.to} className="block rounded-2xl border p-6 hover:border-purple"><h2 className="text-xl font-semibold">{i.l}</h2><p className="mt-1 text-sm text-muted-foreground">{i.d}</p></Link></li>)}
        </ul>
      </Section>
      <FinalCTA />
    </>
  );
}
