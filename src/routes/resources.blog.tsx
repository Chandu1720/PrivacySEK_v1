import { createFileRoute } from "@tanstack/react-router";
import { seo, breadcrumbLd, pageLd } from "@/lib/seo";
import { PageHero, Section } from "@/components/kit";
import { posts } from "@/data/resources";

const title = "Privacy Operations Blog | PrivacySEK";
const description = "Perspectives from PrivacySEK on metadata-first discovery, connected records, risk-based enforcement and practical privacy operations.";
const crumbs = [{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }, { name: "Blog", path: "/resources/blog" }];

export const Route = createFileRoute("/resources/blog")({
  head: () => seo({ title, description, path: "/resources/blog", jsonLd: [pageLd(title, description, "/resources/blog", "Blog"), breadcrumbLd(crumbs)] }),
  component: Blog,
});

function Blog() {
  return (
    <>
      <PageHero crumbs={crumbs} eyebrow="Blog" title="Perspectives on privacy operations" />
      <Section>
        <div className="space-y-12">
          {posts.map((p) => (
            <article key={p.slug} id={p.slug} className="max-w-3xl border-b pb-10">
              <p className="font-mono text-xs uppercase tracking-widest text-purple">{p.category} · {p.readingTime}</p>
              <h2 className="mt-2 text-2xl font-bold">{p.title}</h2>
              <p className="mt-2 text-muted-foreground">{p.description}</p>
              {p.body.map((b) => <div key={b.h} className="mt-6"><h3 className="text-lg font-semibold">{b.h}</h3>{b.p.map((t, i) => <p key={i} className="mt-2 leading-relaxed text-foreground">{t}</p>)}</div>)}
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
