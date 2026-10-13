import { createFileRoute } from "@tanstack/react-router";
import { seo, breadcrumbLd, pageLd } from "@/lib/seo";
import { PageHero, Section } from "@/components/kit";
import { faqs } from "@/data/resources";

const title = "PrivacySEK FAQs | Privacy Platform Questions";
const description = "Answers to common questions about PrivacySEK: data discovery, Data protection and Enforcement enforcement, AI assistance, applicable laws and getting access.";
const crumbs = [{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }, { name: "FAQs", path: "/resources/faqs" }];

export const Route = createFileRoute("/resources/faqs")({
  head: () => seo({ title, description, path: "/resources/faqs", jsonLd: [pageLd(title, description, "/resources/faqs"), breadcrumbLd(crumbs)] }),
  component: Faqs,
});

function Faqs() {
  return (
    <>
      <PageHero crumbs={crumbs} eyebrow="FAQs" title="Common questions, answered" />
      <Section>
        <div className="max-w-3xl divide-y border-y">
          {faqs.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex min-h-11 cursor-pointer items-center font-semibold">{f.q}</summary>
              <p className="mt-2 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}
