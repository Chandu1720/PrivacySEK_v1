import { createFileRoute } from "@tanstack/react-router";
import { seo, breadcrumbLd, pageLd } from "@/lib/seo";
import { PageHero, Section } from "@/components/kit";
import { guides } from "@/data/resources";

const title = "Practical Privacy Guides: ROPA, DPIA, DSAR | PrivacySEK";
const description = "Step-by-step guides to building a connected ROPA, running DPIAs, handling DSARs and vendor privacy due diligence.";
const crumbs = [{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }, { name: "Guides", path: "/resources/guides" }];

export const Route = createFileRoute("/resources/guides")({
  head: () => seo({ title, description, path: "/resources/guides", jsonLd: [pageLd(title, description, "/resources/guides"), breadcrumbLd(crumbs)] }),
  component: Guides,
});

function Guides() {
  return (
    <>
      <PageHero crumbs={crumbs} eyebrow="Guides" title="Step-by-step privacy playbooks" />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {guides.map((g) => (
            <article key={g.id} id={g.id} className="rounded-2xl border p-6">
              <h2 className="text-xl font-semibold">{g.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{g.summary}</p>
              <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm">{g.steps.map((s) => <li key={s}>{s}</li>)}</ol>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
