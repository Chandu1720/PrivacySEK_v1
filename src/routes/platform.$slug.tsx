import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { seo, breadcrumbLd, pageLd } from "@/lib/seo";
import { PageHero, Section, SectionHeading, FinalCTA, PrimaryCTA } from "@/components/kit";
import { productBySlug } from "@/data/products";

export const Route = createFileRoute("/platform/$slug")({
  loader: ({ params }) => {
    const product = productBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Not found | PrivacySEK" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.product;
    const path = `/platform/${params.slug}`;
    return seo({
      title: p.title, description: p.description, path,
      jsonLd: [
        { "@context": "https://schema.org", "@type": "SoftwareApplication", name: `PrivacySEK ${p.name}`, applicationCategory: "BusinessApplication", operatingSystem: "Web", description: p.description },
        breadcrumbLd([{ name: "Home", path: "/" }, { name: "Platform", path: "/platform" }, { name: p.name, path }]),
        pageLd(p.title, p.description, path),
      ],
    });
  },
  component: ProductPage,
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  return (
    <>
      <PageHero crumbs={[{ name: "Home", path: "/" }, { name: "Platform", path: "/platform" }, { name: p.name, path: `/platform/${p.slug}` }]} eyebrow={p.name} title={p.h1} body={p.intro}>
        <PrimaryCTA cta={`product_${p.slug}`}>Request Demo</PrimaryCTA>
      </PageHero>
      <Section>
        <SectionHeading eyebrow="Capabilities" title={`What ${p.name} does`} body={p.owns} />
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {p.capabilities.map((c) => <li key={c.title} className="rounded-xl border p-5"><h3 className="font-semibold">{c.title}</h3><p className="mt-1 text-sm text-muted-foreground">{c.body}</p></li>)}
        </ul>
        <h2 className="mt-16 text-2xl font-bold">Workflow</h2>
        <ol className="mt-4 flex flex-wrap gap-2">
          {p.workflow.map((w, i) => <li key={w} className="rounded-full border bg-surface px-3 py-1 text-sm"><span className="font-mono text-purple">{i + 1}.</span> {w}</li>)}
        </ol>
        {p.connects.length > 0 && (
          <>
            <h2 className="mt-16 text-2xl font-bold">Connects with</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {p.connects.map((c) => { const o = productBySlug(c); return o ? <li key={c}><Link to="/platform/$slug" params={{ slug: c }} className="text-purple underline underline-offset-2">{o.name}</Link></li> : null; })}
            </ul>
          </>
        )}
      </Section>
      <FinalCTA />
    </>
  );
}
