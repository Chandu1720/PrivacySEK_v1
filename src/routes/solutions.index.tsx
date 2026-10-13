import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { PageHero, Section, FinalCTA } from "@/components/kit";
import { solutions } from "@/data/solutions";
import { productBySlug } from "@/data/products";

export const Route = createFileRoute("/solutions/")({
  head: () => seo({ title: "Privacy Solutions by Team | PrivacySEK", description: "How privacy, security, legal, data and IT teams and enterprises use PrivacySEK to connect privacy operations, risk and data protection enforcement.", path: "/solutions" }),
  component: Solutions,
});

function Solutions() {
  return (
    <>
      <PageHero crumbs={[{ name: "Home", path: "/" }, { name: "Solutions", path: "/solutions" }]} eyebrow="Solutions" title="One platform, shared across the teams that protect data" body="Privacy, security, legal and data teams each see a different part of the picture. PrivacySEK gives them the same context." />
      <Section>
        <div className="space-y-6">
          {solutions.map((s) => (
            <article key={s.slug} id={s.slug} className="grid gap-6 rounded-2xl border p-8 md:grid-cols-[1fr_1.4fr]">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-purple">{s.name}</p>
                <h2 className="mt-2 text-xl font-semibold sm:text-2xl">{s.h1}</h2>
                <p className="mt-3 text-muted-foreground">{s.intro}</p>
                <p className="mt-4 text-sm text-muted-foreground">Key modules: {s.products.map((p) => productBySlug(p)?.name).join(" · ")}</p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {s.outcomes.map((o) => (
                  <li key={o.title} className="rounded-xl bg-surface p-4"><h3 className="font-semibold">{o.title}</h3><p className="mt-1 text-sm text-muted-foreground">{o.body}</p></li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>
      <FinalCTA />
    </>
  );
}
