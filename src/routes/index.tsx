import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { Container, Eyebrow, FinalCTA, PrimaryCTA, Section, SectionHeading, SecondaryCTA } from "@/components/kit";
import { GlobalPrivacyGlobe } from "@/components/visuals/GlobalPrivacyGlobe";
import { PrivacyLens } from "@/components/visuals/PrivacyLens";
import { PrivacyGraph } from "@/components/visuals/PrivacyGraph";
import { DecisionEngine } from "@/components/visuals/DecisionEngine";
import { PrivacyTreeGraph } from "@/components/visuals/PrivacyTreeGraph";
import { PrivacyLawFlipCards } from "@/components/visuals/PrivacyLawFlipCards";
import { products } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Privacy Management & Data Protection Platform | PrivacySEK",
      description:
        "Enterprise privacy management and data protection: data discovery, consent, ROPA, DPIA, DSAR, vendors, retention, risk and policy enforcement in one platform.",
      path: "/",
      jsonLd: [{ "@context": "https://schema.org", "@type": "SoftwareApplication", name: "PrivacySEK", applicationCategory: "BusinessApplication" }],
    }),
  component: Home,
});

const ai = [
  { m: "Data Discovery", s: "Unknown field → suggested: Email Address", c: "Confidence 96%" },
  { m: "Cookie Scanner", s: "Suggested category: Analytics", c: "Provider + observed request pattern" },
  { m: "DPIA", s: "Potential high-risk processing detected", c: "Review factors" },
  { m: "Vendor", s: "Potential transfer assessment required", c: "New subprocessor location" },
];

function Home() {
  return (
    <>
      <section className="border-b bg-gradient-to-b from-surface to-background">
        <Container className="grid gap-10 pb-16 pt-14 md:pt-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Eyebrow tone="sky">Living privacy intelligence</Eyebrow>
            <h1 className="mt-4 max-w-2xl text-4xl font-extrabold leading-[1.05] text-foreground md:text-5xl xl:text-6xl">
              A Trusted Partner and Service Provider for Data Privacy & Security.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              PrivacySEK helps organizations enable data privacy compliance to meet global business requirements.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SecondaryCTA to="/platform" cta="hero_explore">Explore PrivacySEK</SecondaryCTA>
              <PrimaryCTA cta="hero_request_access">Request Demo</PrimaryCTA>
            </div>
          </div>

          <div className="lg:pl-2">
            <GlobalPrivacyGlobe />
          </div>
        </Container>
      </section>

      <Section className="bg-surface" label="Privacy Lens">
        <SectionHeading eyebrow="The Privacy Lens" title="One environment. Five ways to see it." body="Switch lenses to see the same data current as data, privacy, risk, jurisdiction or DPO." />
        <div className="mt-10"><PrivacyLens /></div>
      </Section>

      <Section label="Complete privacy architecture">
        <SectionHeading
          eyebrow="Platform Tree Graph"
          title="A complete data privacy solution for Your business needs(DPDPA,CCPA,GDPR)"
          body="Explore how PrivacySEK connects global regulations, automated discovery, lifecycle operations, and continuous enforcement into one unified tree architecture."
        />
        <div className="mt-10">
          <PrivacyTreeGraph />
        </div>
      </Section>

      <Section className="bg-surface" label="Privacy Intelligence Graph">
        <SectionHeading eyebrow="Privacy Intelligence Graph" title="Every record is a relationship." body="Select an entity to see what it connects to — progressively, not as a spider web." />
        <div className="mt-10"><PrivacyGraph /></div>
      </Section>

      {/* <Section label="Data protection and Enforcement decision engine">
        <SectionHeading eyebrow="Data protection and Enforcement · Data Protection & Risk Enforcement" title="Put privacy decisions into operation." body="Data protection and Enforcement evaluates data activity in context and returns a decision — and the decision changes the current." />
        <div className="mt-10"><DecisionEngine /></div>
      </Section> */}

      {/* <Section className="bg-surface" label="Embedded AI">
        <SectionHeading eyebrow="Embedded assistance" title="AI suggests. People decide. Evidence proves it." body="Assistance appears inside real workflows as suggestions a reviewer accepts or corrects." />
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {ai.map((a) => (
            <li key={a.m} className="rounded-xl border bg-background p-5">
              <p className="font-mono text-xs uppercase tracking-widest text-purple">{a.m}</p>
              <p className="mt-2 font-medium">{a.s}</p>
              <p className="mt-1 text-sm text-muted-foreground">{a.c}</p>
              <span className="mt-3 inline-block rounded-md border border-risk/50 bg-soft-risk px-2 py-0.5 text-xs font-medium">! Review</span>
            </li>
          ))}
        </ul>
      </Section> */}

      <Section label="Complete platform">
        <SectionHeading eyebrow="Complete platform" title="End-to-end data privacy modules " />
        {/* <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {products.map((p) => (
            <li key={p.slug} className="bg-background">
              <Link to="/platform/$slug" params={{ slug: p.slug }} className="block h-full p-5 hover:bg-surface">
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{p.stage}</p>
                <p className="mt-1 font-semibold">{p.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{p.short}</p>
              </Link>
            </li>
          ))}
        </ul> */}
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
  {products.map((p) => (
    <li key={p.slug} className="group relative hover:z-10">
      <Link
        to="/platform/$slug"
        params={{ slug: p.slug }}
        className="block h-full rounded-2xl border bg-background p-5
                   transition-all duration-300 ease-out
                   group-hover:-translate-y-2 group-hover:scale-105
                   group-hover:border-violet-500/60 group-hover:bg-surface
                   group-hover:shadow-xl group-hover:shadow-violet-500/20"
      >
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {p.stage}
        </p>
        <p className="mt-1 font-semibold transition-colors duration-300
                      group-hover:text-violet-600 dark:group-hover:text-violet-400">
          {p.name}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{p.short}</p>
      </Link>
    </li>
  ))}
</ul>
        <p className="mt-3 rounded-xl border bg-surface p-4 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">Platform security · shared infrastructure beneath every module</p>
      </Section>

      <Section label="Key Privacy Laws">
        <SectionHeading
          eyebrow="Regulatory Impact & Scope"
          title="Major privacy laws and operational coverage"
          body="Hover over any jurisdiction card to review statutory scope, maximum non-compliance penalties, and how PrivacySEK automates your defense."
        />
        <div className="mt-10">
          <PrivacyLawFlipCards />
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}
