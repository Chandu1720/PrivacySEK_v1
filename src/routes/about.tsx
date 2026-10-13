import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { Container, FinalCTA, PageHero, Section, SectionHeading } from "@/components/kit";
import { ArrowRight, Clock, Construction, Sparkles, Target, Users, Shield } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title: "About Us | In Progress — PrivacySEK",
      description:
        "PrivacySEK is building a connected privacy operating platform. Our full company background and leadership profiles are currently in progress.",
      path: "/about",
    }),
  component: About,
});

const milestones = [
  { label: "Core Privacy Intelligence Engine", status: "Completed", done: true },
  { label: "Global Regulatory Knowledge Graph (DPDPA, GDPR, CCPA)", status: "Completed", done: true },
  { label: "Data Discovery & Data protection and Enforcement Decision System", status: "Completed", done: true },
  { label: "Executive Leadership, Story & Investor Overview", status: "In Progress", done: false },
];

const pillars = [
  {
    icon: Target,
    title: "Mission-Driven Privacy",
    desc: "Transforming static privacy compliance documents into live, automated operational intelligence.",
  },
  {
    icon: Shield,
    title: "Defensible Governance",
    desc: "Enabling enterprises to protect sensitive personal data across borders with verifiable proof.",
  },
  {
    icon: Users,
    title: "Human-in-the-Loop",
    desc: "AI assists and accelerates analysis, while accountable human professionals always make the final decisions.",
  },
];

function About() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "About Us", path: "/about" }]}
        eyebrow="Company Overview"
        title="About Us"
        body="We are finalizing our company story, leadership backgrounds, and mission roadmap. Explore our progress and what drives PrivacySEK below."
      />

      <Section>
        {/* IN PROGRESS HERO BANNER */}
        <div className="relative overflow-hidden rounded-3xl border border-purple/30 bg-gradient-to-br from-soft-purple via-background to-surface p-6 shadow-sm sm:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple/30 bg-purple/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-purple">
                <span className="size-2 animate-ping rounded-full bg-purple" />
                In Progress
              </div>

              <h2 className="mt-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                Our About Us experience is under construction
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                We are putting the finishing touches on our company background, founding principles, and leadership profiles. Check back soon for the complete story of how PrivacySEK is pioneering modern privacy intelligence.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row md:flex-col">
              <Link
                to="/platform"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-purple-deep"
              >
                <span>Explore Platform</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
              >
                <span>Contact Our Team</span>
              </Link>
            </div>
          </div>

          {/* ROADMAP PROGRESS TRACKER */}
          <div className="mt-8 border-t border-purple/20 pt-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Page Development Progress
              </span>
              <span className="font-mono text-xs font-bold text-purple">75% Complete</span>
            </div>

            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-purple/10">
              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-purple to-purple-deep" />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {milestones.map((m) => (
                <div
                  key={m.label}
                  className={`rounded-xl border p-3 ${
                    m.done
                      ? "border-emerald-500/20 bg-emerald-500/5 text-foreground"
                      : "border-purple/30 bg-purple/5 text-purple font-medium"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="truncate">{m.label}</span>
                    <span
                      className={`ml-2 shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] ${
                        m.done
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-purple/15 text-purple"
                      }`}
                    >
                      {m.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CORE FOUNDATION PILLARS */}
        <div className="mt-14">
          <SectionHeading
            eyebrow="Our Foundation"
            title="What drives PrivacySEK"
            body="While our full leadership story is being prepared, our core tenets remain clear."
          />

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="rounded-2xl border bg-surface p-6 shadow-sm">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-purple/10 text-purple">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}
