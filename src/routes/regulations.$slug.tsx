import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  Container,
  FinalCTA,
  PageHero,
  PrimaryCTA,
  Section,
  SectionHeading,
} from "@/components/kit";
import {
  LegalSourceNotice,
  MappingEvidenceMark,
} from "@/components/regulations/RegulatoryComponents";
import { regulationBySlug } from "@/data/regulations";
import { productBySlug } from "@/data/products";
import { breadcrumbLd, pageLd, seo } from "@/lib/seo";

const mappingMatrix: [string, string, string[]][] = [
  ["Data discovery", "Data Discovery", ["data-discovery"]],
  ["Consent and preferences", "Consent Management", ["cookie-consent"]],
  ["Processing records", "ROPA", ["ropa"]],
  ["Privacy risk", "DPIA / PIA", ["dpia"]],
  ["Individual rights", "DSAR / DSR", ["dsar"]],
  ["Regulatory requirements", "Regulatory Intelligence", []],
  ["Policy enforcement", "Data protection and Enforcement", ["Data protection and Enforcement"]],
  ["Reporting", "Reports & Analytics", ["reports"]],
  ["Evidence", "Privacy Graph + Reports", ["reports"]],
];

export const Route = createFileRoute("/regulations/$slug")({
  loader: ({ params }) => {
    const regulation = regulationBySlug(params.slug);
    if (!regulation || !["gdpr", "ccpa", "dpdp"].includes(regulation.slug)) throw notFound();
    return { regulation };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData)
      return {
        meta: [{ title: "Not found | PrivacySEK" }, { name: "robots", content: "noindex" }],
      };
    const regulation = loaderData.regulation;
    const path = `/regulations/${params.slug}`;
    return seo({
      title: regulation.title,
      description: regulation.description,
      path,
      jsonLd: [
        pageLd(regulation.title, regulation.description, path),
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Regulations", path: "/regulations" },
          { name: regulation.name, path },
        ]),
      ],
    });
  },
  component: RegulationDetail,
});

function RegulationDetail() {
  const { regulation } = Route.useLoaderData();
  const sections = regulation.detailSections ?? [];
  const relevantProducts = new Set(regulation.themes.flatMap((theme) => theme.products));
  const rows = mappingMatrix.filter(
    ([, , productSlugs]) =>
      productSlugs.length === 0 || productSlugs.some((slug) => relevantProducts.has(slug)),
  );

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Regulations", path: "/regulations" },
          { name: regulation.name, path: `/regulations/${regulation.slug}` },
        ]}
        eyebrow={regulation.region ?? regulation.full}
        title={regulation.h1}
        body={regulation.intro}
      >
        <a
          href="#requirements"
          className="inline-flex min-h-12 items-center rounded-md border border-input bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:border-purple hover:text-purple"
        >
          Map {regulation.name} requirements
        </a>
        <PrimaryCTA to="/platform" cta={`regulation_platform_${regulation.slug}`}>
          Explore PrivacySEK
        </PrimaryCTA>
      </PageHero>

      <Section label={`${regulation.name} overview`}>
        <SectionHeading
          eyebrow="Overview"
          title={`Understand ${regulation.name} in operational context`}
          body={regulation.cardDescription}
        />
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {regulation.keyAreas?.map((area, index) => (
            <article key={area} className="rounded-xl border bg-background p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-purple">
                Area {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-2 text-base font-semibold">{area}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Review the requirement in the context of your organization, processing and current
                authoritative sources.
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="requirements" className="bg-surface" label={`${regulation.name} requirements`}>
        <SectionHeading
          eyebrow="Requirement guide"
          title="Requirements meet real privacy operations."
          body="These topic summaries are designed to orient your review. They do not replace current legal sources or counsel's assessment."
        />
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {sections.map((item) => (
            <article key={item.title} className="rounded-xl border bg-background p-5">
              <h2 className="text-base font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-7 rounded-xl border bg-background p-5">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Content governance
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Specific legal provisions, section references, dates, penalties and interpretations are
            intentionally not asserted here without a verified official source and documented review
            date.
          </p>
          <div className="mt-4">
            <LegalSourceNotice />
          </div>
        </div>
      </Section>

      <Section label={`${regulation.name} PrivacySEK mapping`}>
        <SectionHeading
          eyebrow="PrivacySEK mapping"
          title="Connect requirements to capabilities and evidence."
          body="These operational mappings show where teams may organize related work. They do not mean a capability is legally required or guarantee compliance."
        />
        <div className="mt-8 overflow-hidden rounded-2xl border bg-background">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">
                {regulation.name} areas mapped to PrivacySEK capabilities
              </caption>
              <thead className="bg-surface">
                <tr>
                  {["Regulatory area", "PrivacySEK capability", "Operational connection"].map(
                    (heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="border-b px-5 py-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map(([area, capability, productSlugs]) => (
                  <tr key={area} className="hover:bg-surface/60">
                    <th scope="row" className="border-b px-5 py-4 font-medium">
                      {area}
                    </th>
                    <td className="border-b px-5 py-4 font-semibold text-purple">{capability}</td>
                    <td className="border-b px-5 py-4 text-muted-foreground">
                      {productSlugs.map((slug) => {
                        const product = productBySlug(slug);
                        return product ? (
                          <Link
                            key={slug}
                            to="/platform/$slug"
                            params={{ slug }}
                            className="mr-3 inline-flex items-center gap-1 underline underline-offset-2 hover:text-purple"
                          >
                            {product.name}
                            <ArrowRight aria-hidden="true" className="size-3" />
                          </Link>
                        ) : null;
                      })}
                      {productSlugs.length === 0 && "Linked requirements, controls and evidence"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4">
          <MappingEvidenceMark />
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {regulation.themes.map((theme) => (
            <li key={theme.title} className="rounded-xl border bg-background p-5">
              <h3 className="font-semibold">{theme.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{theme.body}</p>
              <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm">
                {theme.products.map((slug) => {
                  const product = productBySlug(slug);
                  return product ? (
                    <Link
                      key={slug}
                      to="/platform/$slug"
                      params={{ slug }}
                      className="text-purple underline underline-offset-2"
                    >
                      {product.name}
                    </Link>
                  ) : null;
                })}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="bg-surface" label="Recommended operational steps">
        <SectionHeading eyebrow="Operational path" title="From understanding to evidence." />
        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Discover relevant data",
            "Map processing activities",
            "Assess privacy risk",
            "Maintain rights and evidence",
          ].map((step, index) => (
            <li key={step} className="rounded-xl border bg-background p-5">
              <span className="font-mono text-xs text-purple">0{index + 1}</span>
              <h2 className="mt-2 font-semibold">{step}</h2>
            </li>
          ))}
        </ol>
      </Section>

      <div className="pb-5">
        <Container>
          <p className="border-t pt-5 text-center text-xs text-muted-foreground">
            PrivacySEK provides privacy intelligence and operational tooling and does not provide
            legal advice.
          </p>
        </Container>
      </div>
      <FinalCTA
        title={`Map ${regulation.name} requirements to privacy action.`}
        body="Connect the requirements relevant to your organization to the processes, controls and evidence that support your privacy operations."
        exploreFirst
        exploreLabel="Explore PrivacySEK"
      />
    </>
  );
}
