import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, RotateCw } from "lucide-react";

interface LawCardData {
  id: string;
  countryCode: "IN" | "EU" | "US";
  title: string;
  penalty: string;
  slug: string;
  accent: {
    ringBorder: string;
    dotColor: string;
    textColor: string;
    bgCircle: string;
    badgeBg: string;
    backTextColor: string;
  };
  backInfo: {
    officialName: string;
    enactedBy: string;
    scope: string;
    keyPoints: string[];
    generalInfo: { label: string; value: string }[];
  };
}

const lawCards: LawCardData[] = [
  {
    id: "dpdp",
    countryCode: "IN",
    title: "DPDP Act 2023 and Rules 2025",
    penalty: "Penalties up to ₹250 crore",
    slug: "dpdp",
    accent: {
      ringBorder: "border-[#f97316]",
      dotColor: "bg-[#ea580c]",
      textColor: "text-[#ea580c]",
      bgCircle: "bg-[#fff7ed]",
      badgeBg: "bg-orange-50 text-orange-700 border-orange-200",
      backTextColor: "text-orange-300",
    },
    backInfo: {
      officialName: "Digital Personal Data Protection Act, 2023",
      enactedBy: "MeitY / Data Protection Board of India",
      scope: "Processing of digital personal data within India, and cross-border processing offering goods or services to Indian Data Principals.",
      keyPoints: [
        "Mandatory itemized notice in English + 22 scheduled Indian languages",
        "Clear, unconditional consent with registered Consent Managers",
        "Data Principal rights: access, correction, erasure, grievance redressal",
        "Strict children's data safeguards (parental consent & no tracking)",
      ],
      generalInfo: [
        { label: "Enacted", value: "2023 (Rules 2025)" },
        { label: "Regulator", value: "Data Protection Board" },
        { label: "Applies to", value: "Digital personal data" },
        { label: "Region", value: "India" },
      ],
    },
  },
  {
    id: "gdpr",
    countryCode: "EU",
    title: "GDPR",
    penalty: "Up to €20M or 4% global turnover",
    slug: "gdpr",
    accent: {
      ringBorder: "border-[#2563eb]",
      dotColor: "bg-[#1d4ed8]",
      textColor: "text-[#1d4ed8]",
      bgCircle: "bg-[#eff6ff]",
      badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
      backTextColor: "text-blue-300",
    },
    backInfo: {
      officialName: "General Data Protection Regulation (EU & UK)",
      enactedBy: "European Commission / EDPB & UK ICO",
      scope: "All organizations worldwide processing personal data of individuals located within the European Economic Area or UK.",
      keyPoints: [
        "Article 6 lawful bases (consent, contract, legitimate interests)",
        "Article 30 Records of Processing Activities (ROPA)",
        "Mandatory Data Protection Impact Assessments (DPIAs)",
        "Strict 72-hour supervisory breach notification window",
      ],
      generalInfo: [
        { label: "In force", value: "25 May 2018" },
        { label: "Regulator", value: "EDPB / National DPAs" },
        { label: "Breach notice", value: "Within 72 hours" },
        { label: "Region", value: "EU / EEA & UK" },
      ],
    },
  },
  {
    id: "ccpa",
    countryCode: "US",
    title: "CCPA and CPRA",
    penalty: "Fines up to $7,500 per violation",
    slug: "ccpa",
    accent: {
      ringBorder: "border-[#8b5cf6]",
      dotColor: "bg-[#7c3aed]",
      textColor: "text-[#7c3aed]",
      bgCircle: "bg-[#f5f3ff]",
      badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
      backTextColor: "text-purple-300",
    },
    backInfo: {
      officialName: "California Consumer Privacy Act & Rights Act",
      enactedBy: "California Privacy Protection Agency (CPPA)",
      scope: "Businesses operating in California meeting revenue thresholds ($25M+) or processing data of 100k+ consumers/households.",
      keyPoints: [
        "Mandatory 'Do Not Sell or Share My Personal Info' link and GPC support",
        "Right to limit the use of Sensitive Personal Information (SPI)",
        "Notice at collection detailing retention schedules and third-party sharing",
        "Fines up to $7,500 per intentional violation with private right of action for breaches",
      ],
      generalInfo: [
        { label: "Effective", value: "2020 (CPRA 2023)" },
        { label: "Regulator", value: "CPPA / CA Attorney General" },
        { label: "Model", value: "Opt-out of sale/sharing" },
        { label: "Region", value: "California, USA" },
      ],
    },
  },
];

export function PrivacyLawFlipCards() {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full">
      <div className="grid gap-6 md:grid-cols-3">
        {lawCards.map((card) => {
          const isFlipped = !!flipped[card.id];

          return (
            <div
              key={card.id}
              className="group h-[390px] w-full [perspective:1200px]"
              onMouseEnter={() => setFlipped((p) => ({ ...p, [card.id]: true }))}
              onMouseLeave={() => setFlipped((p) => ({ ...p, [card.id]: false }))}
              onClick={() => toggleFlip(card.id)}
            >
              <div
                className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${
                  isFlipped ? "[transform:rotateY(180deg)]" : ""
                }`}
              >
                {/* FRONT SIDE */}
                <div className="absolute inset-0 flex flex-col items-center justify-between rounded-2xl border border-border/80 bg-background p-7 text-center shadow-sm transition-all hover:border-border hover:shadow-md [backface-visibility:hidden]">
                  {/* Circular Orbit Badge */}
                  <div className="relative mt-2 flex size-28 items-center justify-center">
                    {/* Outer Orbit Track + Orbiting Dot */}
                    <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
                      <div className="absolute inset-0 rounded-full border border-dashed border-slate-300 dark:border-slate-700" />
                      <div
                        className={`absolute -top-1.5 left-1/2 size-2.5 -translate-x-1/2 rounded-full ${card.accent.dotColor} shadow-[0_0_8px_currentColor] ring-4 ring-background`}
                      />
                    </div>

                    {/* Inner Solid Circle with Country Code */}
                    <div
                      className={`flex size-20 items-center justify-center rounded-full border-2 ${card.accent.ringBorder} ${card.accent.bgCircle}`}
                    >
                      <span className={`font-mono text-xl font-bold tracking-tight ${card.accent.textColor}`}>
                        {card.countryCode}
                      </span>
                    </div>
                  </div>

                  {/* Title & Penalty */}
                  <div className="my-auto px-2">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                      {card.title}
                    </h3>
                    <p className="mt-1.5 text-xs font-medium text-muted-foreground sm:text-sm">
                      {card.penalty}
                    </p>
                  </div>

                  {/* Bottom Link */}
                  <div className={`flex items-center gap-1.5 text-xs font-medium ${card.accent.textColor}`}>
                    <span>General information</span>
                    <RotateCw className="size-3.5 transition-transform duration-500 group-hover:rotate-180" />
                  </div>
                </div>

                {/* BACK SIDE */}
                <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-white/10 bg-[#14264d] p-7 text-left text-white shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div>
                    <p className={`font-mono text-[11px] font-semibold uppercase tracking-wider ${card.accent.backTextColor}`}>
                      {card.countryCode} · Key details
                    </p>
                    <h4 className="mt-1.5 text-sm font-semibold leading-snug sm:text-base">
                      {card.backInfo.officialName}
                    </h4>

                    <ul className="mt-4 space-y-3">
                      {card.backInfo.generalInfo.map((info) => (
                        <li key={info.label} className="flex items-start gap-2.5">
                          <CheckCircle2 className={`mt-0.5 size-4 shrink-0 ${card.accent.backTextColor}`} />
                          <div>
                            <p className="font-mono text-[10px] uppercase tracking-wider text-white/60">
                              {info.label}
                            </p>
                            <p className="text-xs font-medium leading-snug text-white/90 sm:text-sm">{info.value}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/15 pt-3">
                    <Link
                      to="/regulations/$slug"
                      params={{ slug: card.slug }}
                      className={`inline-flex items-center gap-1.5 text-xs font-medium ${card.accent.backTextColor} hover:underline`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Explore complete regulation</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                    <span className="font-mono text-[10px] text-white/50">Hover / Tap to flip</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
