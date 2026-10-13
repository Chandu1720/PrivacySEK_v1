import { createFileRoute, Link } from "@tanstack/react-router";
import { seo, breadcrumbLd, pageLd } from "@/lib/seo";
import { PageHero, Section, FinalCTA, PrimaryCTA } from "@/components/kit";
import { products } from "@/data/products";

const title = "Privacy Management Platform | PrivacySEK";
const description = "Explore the PrivacySEK platform: data discovery, cookie & preference consent, ROPA, DPIA, DSAR, vendors, retention, Data protection and Enforcement & incident management in one place.";
const crumbs = [{ name: "Home", path: "/" }, { name: "Platform", path: "/platform" }];

export const Route = createFileRoute("/platform/")({
  head: () => seo({ title, description, path: "/platform", jsonLd: [pageLd(title, description, "/platform"), breadcrumbLd(crumbs)] }),
  component: Platform,
});

function Platform() {
  return (
    <>
      <PageHero crumbs={crumbs} eyebrow="Platform" title="One connected privacy operating platform" body="Every module shares the same map of your data, so discovery, records, assessments and enforcement stay in step.">
        <PrimaryCTA cta="platform_hero">Request Demo</PrimaryCTA>
      </PageHero>
      <Section>
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <li key={p.slug}>
              <Link to="/platform/$slug" params={{ slug: p.slug }} className="block h-full rounded-2xl border p-6 transition-colors hover:border-purple">
                <p className="font-mono text-xs uppercase tracking-widest text-purple">{p.stage}</p>
                <h2 className="mt-2 text-xl font-semibold">{p.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{p.short}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <FinalCTA />
    </>
  );
}
