import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Container, FinalCTA, Section, SectionHeading } from "@/components/kit";
import {
  RegulationApplicability,
  RegulationCard,
  RegulationComparison,
  RegulationSearch,
  RegulatoryGraph,
  RegulatoryLifecycle,
  RegulationUpdateCard,
  RequirementMapping,
} from "@/components/regulations/RegulatoryComponents";
import { regulations } from "@/data/regulations";
import { breadcrumbLd, pageLd, seo } from "@/lib/seo";

const title = "Privacy Regulations | GDPR, CCPA & DPDP | PrivacySEK";
const description =
  "Explore GDPR, CCPA / CPRA, and India's DPDP framework. Understand privacy requirements and connect regulatory obligations to PrivacySEK's privacy operations and evidence workflows.";
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Regulations", path: "/regulations" },
];
const primaryRegulations = regulations
  .filter((regulation) => ["gdpr", "ccpa", "dpdp"].includes(regulation.slug))
  .sort(
    (left, right) =>
      ["gdpr", "ccpa", "dpdp"].indexOf(left.slug) - ["gdpr", "ccpa", "dpdp"].indexOf(right.slug),
  );

export const Route = createFileRoute("/regulations/")({
  head: () =>
    seo({
      title,
      description,
      path: "/regulations",
      jsonLd: [pageLd(title, description, "/regulations"), breadcrumbLd(crumbs)],
    }),
  component: Regulations,
});

function Regulations() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b bg-[#10162c] text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 75% 42%, rgba(72,94,190,.3), transparent 42%), linear-gradient(rgba(139,160,195,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(139,160,195,.055) 1px, transparent 1px)",
            backgroundSize: "auto, 34px 34px, 34px 34px",
          }}
        />
        <Container className="grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <nav aria-label="Breadcrumb" className="mb-7">
              <ol className="flex items-center gap-2 text-xs text-slate-300">
                <li>
                  <Link to="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="size-3" />
                </li>
                <li aria-current="page" className="text-white">
                  Regulations
                </li>
              </ol>
            </nav>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-sky">
              Regulatory intelligence
            </p>
            <h1 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Understand the regulations that govern your data.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              Privacy requirements vary by jurisdiction, organization, data type, and processing
              activity. PrivacySEK helps you understand what regulations may apply, what they
              require, and how those requirements connect to your privacy operations.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#featured-regulations"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-[#161a36] transition-colors hover:bg-sky/20 hover:text-white"
              >
                Explore regulations <ArrowRight aria-hidden="true" className="size-4" />
              </a>
              <a
                href="#comparison"
                className="inline-flex min-h-11 items-center rounded-lg border border-white/25 px-5 text-sm font-semibold text-white transition-colors hover:border-sky hover:bg-white/5"
              >
                Compare regulations
              </a>
            </div>
            <RegulationSearch regulations={primaryRegulations} />
          </div>
          <div className="relative">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-300">
              Regulatory intelligence map
            </p>
            <RegulatoryGraph />
          </div>
        </Container>
      </section>

      <Section id="featured-regulations" label="Featured regulations">
        <SectionHeading
          eyebrow="The regulatory landscape"
          title="Three regulations. One privacy intelligence layer."
          body="PrivacySEK connects regulatory requirements with the people, data, systems, processing activities, consent, rights, risks, and evidence involved in your privacy operations."
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {primaryRegulations.map((regulation) => (
            <li key={regulation.slug}>
              <RegulationCard regulation={regulation} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="comparison" className="bg-surface" label="Regulation comparison">
        <SectionHeading
          eyebrow="Compare requirements"
          title="See how privacy requirements differ"
          body="Compare common themes across GDPR, CCPA / CPRA, and DPDP without reading three separate legal documents. Applicability varies by scope and circumstances."
        />
        <div className="mt-9">
          <RegulationComparison />
        </div>
      </Section>

      <Section label="Requirements mapped to privacy operations">
        <SectionHeading
          eyebrow="From law to evidence"
          title="Turn regulatory requirements into privacy operations."
          body="PrivacySEK connects regulatory requirements directly to the operational controls and evidence teams use to manage privacy."
        />
        <div className="mt-9">
          <RequirementMapping />
        </div>
      </Section>

      <Section className="bg-surface" label="Privacy Graph">
        <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Privacy Graph"
              title="Regulations don't exist in isolation."
              body="A single requirement can affect data, processing activities, consent, vendors, privacy risks, individual rights, and enforcement. PrivacySEK connects these relationships through its Privacy Graph."
            />
            <div className="mt-6 rounded-xl border bg-background p-5">
              <p className="text-sm leading-relaxed text-muted-foreground">
                PrivacySEK does not merely tell you what a regulation says. It connects requirements
                to the data, processes, people, risks, privacy workflows, decisions, and evidence
                inside your organization.
              </p>
            </div>
          </div>
          <RegulatoryGraph compact />
        </div>
      </Section>

      <Section id="applicability" label="Regulation applicability assessment">
        <SectionHeading
          eyebrow="Applicability assessment"
          title="Which regulations may apply to your organization?"
          body="Regulatory applicability depends on where you operate, who you serve, what data you process, and how that data is used. Use this assessment as an initial orientation—not a legal determination."
        />
        <div className="mt-9">
          <RegulationApplicability regulations={primaryRegulations} />
        </div>
      </Section>

      <Section className="bg-surface" label="Regulatory lifecycle">
        <SectionHeading
          eyebrow="Operational lifecycle"
          title="From regulation to evidence."
          body="A connected sequence turns requirements into repeatable privacy operations and reviewable evidence."
        />
        <div className="mt-9">
          <RegulatoryLifecycle />
        </div>
      </Section>

      <Section id="updates" label="Regulatory intelligence updates">
        <SectionHeading
          eyebrow="Regulatory intelligence"
          title="Privacy regulations evolve. Your intelligence should too."
          body="Regulations, guidance, interpretations, and enforcement expectations can change. PrivacySEK should connect verified developments to their potential operational impact."
        />
        <div className="mt-8">
          <RegulationUpdateCard />
        </div>
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
        title="Turn regulatory requirements into privacy action."
        body="Understand your obligations, connect them to your privacy operations, and build evidence across the privacy lifecycle."
        exploreFirst
        exploreLabel="Explore PrivacySEK"
      />
    </>
  );
}
