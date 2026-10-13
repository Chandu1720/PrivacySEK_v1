import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { seo, breadcrumbLd, pageLd } from "@/lib/seo";
import { PageHero, Section, SectionHeading, FinalCTA, PrimaryCTA } from "@/components/kit";
import { solutionBySlug } from "@/data/solutions";
import { productBySlug } from "@/data/products";

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }) => {
    const solution = solutionBySlug(params.slug);
    if (!solution) throw notFound();
    return { solution };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Not found | PrivacySEK" }, { name: "robots", content: "noindex" }] };
    const s = loaderData.solution;
    const path = `/solutions/${params.slug}`;
    return seo({ title: s.title, description: s.description, path, jsonLd: [pageLd(s.title, s.description, path), breadcrumbLd([{ name: "Home", path: "/" }, { name: "Solutions", path: "/solutions" }, { name: s.name, path }])] });
  },
  component: SolutionPage,
});

function SolutionPage() {
  const { solution: s } = Route.useLoaderData();
  return (
    <>
      <PageHero crumbs={[{ name: "Home", path: "/" }, { name: "Solutions", path: "/solutions" }, { name: s.name, path: `/solutions/${s.slug}` }]} eyebrow={s.name} title={s.h1} body={s.intro}>
        <PrimaryCTA cta={`solution_${s.slug}`}>Request Demo</PrimaryCTA>
      </PageHero>
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Challenges" title="What gets in the way" />
            <ul className="mt-6 list-disc space-y-2 pl-5 text-muted-foreground">{s.challenges.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
          <div>
            <SectionHeading eyebrow="Outcomes" title="What changes" />
            <ul className="mt-6 space-y-4">{s.outcomes.map((o) => <li key={o.title} className="rounded-xl bg-surface p-4"><h3 className="font-semibold">{o.title}</h3><p className="mt-1 text-sm text-muted-foreground">{o.body}</p></li>)}</ul>
          </div>
        </div>
        <h2 className="mt-16 text-2xl font-bold">Key modules</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {s.products.map((slug) => { const p = productBySlug(slug); return p ? <li key={slug}><Link to="/platform/$slug" params={{ slug }} className="text-purple underline underline-offset-2">{p.name}</Link></li> : null; })}
        </ul>
      </Section>
      <FinalCTA />
    </>
  );
}
