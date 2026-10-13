import { PageHero, Section } from "@/components/kit";

export function LegalPage({ name, path, intro, sections }: { name: string; path: string; intro: string; sections: { h: string; p: string }[] }) {
  return (
    <>
      <PageHero crumbs={[{ name: "Home", path: "/" }, { name, path }]} eyebrow="Legal" title={name} body={intro} />
      <Section>
        <div className="max-w-3xl space-y-8">
          {sections.map((s) => <section key={s.h}><h2 className="text-xl font-semibold">{s.h}</h2><p className="mt-2 leading-relaxed text-muted-foreground">{s.p}</p></section>)}
          <p className="text-sm text-muted-foreground">This summary is a placeholder pending final review by counsel.</p>
        </div>
      </Section>
    </>
  );
}
