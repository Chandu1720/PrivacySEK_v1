import { useState } from "react";
import { CheckCircle2, ChevronDown, ChevronRight, Database, FileText, Globe, Layers, Lock, Shield, Sparkles } from "lucide-react";

interface TreeNode {
  id: string;
  label: string;
  category?: string;
  badge?: string;
  desc: string;
  regulations: Array<"DPDPA" | "GDPR" | "CCPA">;
  children?: TreeNode[];
}

const treeData: {
  root: {
    title: string;
    subtitle: string;
    frameworks: string[];
  };
  pillars: Array<{
    id: string;
    title: string;
    eyebrow: string;
    tone: "purple" | "sky" | "emerald" | "amber";
    icon: typeof Shield;
    summary: string;
    nodes: TreeNode[];
  }>;
} = {
  root: {
    title: "PrivacySEK Architecture",
    subtitle: "A Complete Data Privacy Solution for Business Needs",
    frameworks: ["DPDPA", "GDPR", "CCPA"],
  },
  pillars: [
    {
      id: "compliance",
      title: "Regulatory Frameworks",
      eyebrow: "Global Governance",
      tone: "purple",
      icon: Globe,
      summary: "Statutory alignment across jurisdictions with automated legal obligations.",
      nodes: [
        {
          id: "dpdpa",
          label: "DPDPA (India, 2023)",
          badge: "Mandatory",
          desc: "Notice in 22 languages, explicit consent logs, Data Principal rights, and Fiduciary accountability.",
          regulations: ["DPDPA"],
        },
        {
          id: "gdpr",
          label: "GDPR (EU & UK)",
          badge: "Enforced",
          desc: "Article 6 lawful bases, Article 30 ROPA, DPIAs, cross-border SCCs, and 72-hour breach reporting.",
          regulations: ["GDPR"],
        },
        {
          id: "ccpa",
          label: "CCPA & CPRA (California)",
          badge: "Active",
          desc: "Do Not Sell/Share opt-outs, Sensitive Personal Information limits, and consumer privacy notices.",
          regulations: ["CCPA"],
        },
      ],
    },
    {
      id: "discovery",
      title: "Data Discovery & Mapping",
      eyebrow: "Data Intelligence",
      tone: "sky",
      icon: Database,
      summary: "Automated multi-cloud inventory, living data flow maps, and PII classification.",
      nodes: [
        {
          id: "connectors",
          label: "Multi-Source Connectors",
          badge: "Metadata-first",
          desc: "Read-only integrations across cloud DBs, SaaS tools, internal data warehouses, and public endpoints.",
          regulations: ["DPDPA", "GDPR", "CCPA"],
        },
        {
          id: "classification",
          label: "PII & Sensitive Classification",
          badge: "AI-assisted",
          desc: "Automated tagging for direct identifiers, financial data, health attributes, and quasi-identifiers.",
          regulations: ["DPDPA", "GDPR", "CCPA"],
        },
        {
          id: "lineage",
          label: "Data Flow & Movement(ROPA)",
          badge: "Real-time",
          desc: "Mapping internal transfers, external destinations, cross-border hops, and storage locations.",
          regulations: ["GDPR", "DPDPA"],
        },
      ],
    },
    {
      id: "operations",
      title: "Privacy Operations & Rights",
      eyebrow: "Lifecycle Execution",
      tone: "emerald",
      icon: Layers,
      summary: "End-to-end management of consents, processing records, and subject access requests.",
      nodes: [
        {
          id: "consent",
          label: "Consent & Preference Engine",
          badge: "Granular",
          desc: "Cookie consent banners, opt-in/opt-out choice tracking, and audit-ready consent receipts.",
          regulations: ["DPDPA", "GDPR", "CCPA"],
        },
        {
          id: "ropa",
          label: "Living ROPA Records",
          badge: "Automated",
          desc: "Real-time Records of Processing Activities linked directly to live system and asset inventories.",
          regulations: ["GDPR", "DPDPA"],
        },
        {
          id: "dsar",
          label: "DSAR / DSR Automation",
          badge: "SLA tracked",
          desc: "Automated intake, identity verification, system data collection, deletion, and delivery workflows.",
          regulations: ["GDPR", "CCPA", "DPDPA"],
        },
        {
          id: "retention",
          label: "Data Retention & Disposal",
          badge: "Policy enforced",
          desc: "Configurable retention schedules tied to systems with defensible deletion verification.",
          regulations: ["GDPR", "DPDPA"],
        },
      ],
    },
    {
      id: "risk",
      title: "Risk, Vendor & Enforcement",
      eyebrow: "Continuous Security",
      tone: "amber",
      icon: Shield,
      summary: "Continuous risk scoring, third-party vendor oversight, and real-time policy enforcement.",
      nodes: [
        {
          id: "dpia",
          label: "DPIA & Privacy Assessments",
          badge: "Risk-scored",
          desc: "Pre-filled privacy impact templates assessing high-risk processing, transfers, and safeguards.",
          regulations: ["GDPR", "DPDPA"],
        },
        {
          id: "vendor",
          label: "3rd-Party & Vendor Oversight",
          badge: "Supply chain",
          desc: "Vendor DPA tracking, subprocessor notifications, security posture validation, and transfer checks.",
          regulations: ["GDPR", "CCPA", "DPDPA"],
        },
        {
          id: "Data protection and Enforcement",
          label: "Data protection and Enforcement Decision Engine",
          badge: "Enforcement",
          desc: "Contextual policy engine evaluating live activity against rules (Warn, Mask, Require Approval, Block).",
          regulations: ["DPDPA", "GDPR", "CCPA"],
        },
        {
          id: "reporting",
          label: "Audit & Executive Reports",
          badge: "Board-ready",
          desc: "Comprehensive compliance dashboards, defensible proof-of-compliance packs, and regulator reports.",
          regulations: ["DPDPA", "GDPR", "CCPA"],
        },
      ],
    },
  ],
};

const toneStyles = {
  purple: {
    border: "border-purple/30",
    bg: "bg-soft-purple",
    text: "text-purple",
    glow: "rgba(139, 92, 246, 0.2)",
    accent: "#8b5cf6",
    badge: "bg-purple/10 text-purple border-purple/30",
  },
  sky: {
    border: "border-sky/30",
    bg: "bg-soft-sky",
    text: "text-sky",
    glow: "rgba(2, 132, 199, 0.2)",
    accent: "#0284c7",
    badge: "bg-sky/10 text-sky border-sky/30",
  },
  emerald: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    glow: "rgba(16, 185, 129, 0.2)",
    accent: "#10b981",
    badge: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  },
  amber: {
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    glow: "rgba(245, 158, 11, 0.2)",
    accent: "#f59e0b",
    badge: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30",
  },
};

export function PrivacyTreeGraph() {
  const [selectedReg, setSelectedReg] = useState<"ALL" | "DPDPA" | "GDPR" | "CCPA">("ALL");
  const [activeNodeId, setActiveNodeId] = useState<string>("dpdpa");
  const [expandedPillars, setExpandedPillars] = useState<Record<string, boolean>>({
    compliance: true,
    discovery: true,
    operations: true,
    risk: true,
  });

  const togglePillar = (id: string) => {
    setExpandedPillars((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allNodes = treeData.pillars.flatMap((p) => p.nodes);
  const activeNode = allNodes.find((n) => n.id === activeNodeId) ?? allNodes[0]!;

  return (
    <div className="rounded-3xl border border-border/80 bg-gradient-to-b from-surface/80 to-background p-5 shadow-sm md:p-8">
      {/* Top Controls: Filter by Regulation */}
      <div className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-wider text-purple">
            <Sparkles className="size-3.5" /> Hierarchical Architecture
          </span>
          <h3 className="mt-1 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            Connected Privacy Engine Tree
          </h3>
        </div>

        <div className="flex items-center gap-1.5 self-start rounded-full border bg-background/80 p-1 shadow-sm backdrop-blur sm:self-auto">
          <span className="px-2.5 py-1 text-[11px] font-medium text-muted-foreground">Scope:</span>
          {(["ALL", "DPDPA", "GDPR", "CCPA"] as const).map((reg) => (
            <button
              key={reg}
              type="button"
              onClick={() => setSelectedReg(reg)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                selectedReg === reg
                  ? "bg-purple text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {reg === "ALL" ? "All Frameworks" : reg}
            </button>
          ))}
        </div>
      </div>

      {/* Root Node Banner */}
      <div className="mt-8 flex flex-col items-center justify-center text-center">
        <div className="relative inline-flex flex-col items-center">
          <div className="group relative z-10 flex flex-col items-center rounded-2xl border border-purple/30 bg-background/95 px-6 py-4 shadow-md shadow-purple/5 backdrop-blur transition-transform hover:scale-[1.01]">
            <div className="flex items-center gap-2">
              <span className="inline-flex size-2.5 animate-ping rounded-full bg-purple opacity-75" />
              <span className="font-mono text-xs uppercase tracking-wider text-purple">Central Root Engine</span>
            </div>
            <h4 className="mt-1 text-base font-semibold text-foreground sm:text-lg">
              {treeData.root.title}
            </h4>
            <p className="mt-0.5 max-w-md text-xs text-muted-foreground">
              {treeData.root.subtitle}
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
              {treeData.root.frameworks.map((f) => (
                <span
                  key={f}
                  className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium transition-all ${
                    selectedReg === "ALL" || selectedReg === f
                      ? "border-purple/40 bg-soft-purple text-purple-deep"
                      : "opacity-40"
                  }`}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* SVG Tree Trunk Lines (Desktop) */}
          <div className="hidden h-12 w-full lg:block">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 800 48" preserveAspectRatio="none">
              <line x1="400" y1="0" x2="400" y2="48" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Pillars Grid / Tree Branches */}
      <div className="relative mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {treeData.pillars.map((pillar) => {
          const tone = toneStyles[pillar.tone];
          const Icon = pillar.icon;
          const isExpanded = expandedPillars[pillar.id];

          return (
            <div
              key={pillar.id}
              className={`relative flex flex-col rounded-2xl border bg-background/80 p-4 transition-all duration-300 hover:shadow-md ${tone.border}`}
            >
              {/* Branch Head */}
              <div className="flex items-start justify-between gap-2 border-b border-border/60 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className={`flex size-9 items-center justify-center rounded-xl ${tone.bg} ${tone.text}`}>
                    <Icon className="size-4.5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {pillar.eyebrow}
                    </span>
                    <h5 className="text-sm font-semibold text-foreground">{pillar.title}</h5>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => togglePillar(pillar.id)}
                  aria-label={`Toggle ${pillar.title} branch`}
                  className="rounded-md p-1 text-muted-foreground hover:bg-surface hover:text-foreground"
                >
                  {isExpanded ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
                </button>
              </div>

              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{pillar.summary}</p>

              {/* Children / Leaf Nodes */}
              {isExpanded && (
                <div className="mt-4 flex flex-col gap-2">
                  {pillar.nodes.map((node) => {
                    const isSelected = activeNodeId === node.id;
                    const matchesFilter =
                      selectedReg === "ALL" || node.regulations.includes(selectedReg);

                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => setActiveNodeId(node.id)}
                        className={`group relative flex flex-col items-start rounded-xl border p-3 text-left transition-all ${
                          isSelected
                            ? `${tone.border} bg-surface shadow-sm ring-1 ring-purple/20`
                            : "border-border/70 bg-background/60 hover:border-purple/30 hover:bg-surface"
                        } ${!matchesFilter ? "opacity-35 grayscale" : "opacity-100"}`}
                      >
                        <div className="flex w-full items-center justify-between gap-1.5">
                          <span className="text-xs font-medium text-foreground group-hover:text-purple">
                            {node.label}
                          </span>
                          {node.badge && (
                            <span className={`rounded-full border px-1.5 py-0.5 text-[9px] font-medium ${tone.badge}`}>
                              {node.badge}
                            </span>
                          )}
                        </div>

                        <p className="mt-1 line-clamp-2 text-[11px] text-muted-foreground">
                          {node.desc}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-1">
                          {node.regulations.map((r) => (
                            <span
                              key={r}
                              className={`rounded px-1.5 py-0.5 font-mono text-[9px] ${
                                selectedReg === r
                                  ? "bg-purple text-primary-foreground font-semibold"
                                  : "bg-surface text-muted-foreground border font-normal"
                              }`}
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Node Details Bar */}
      <div className="mt-8 rounded-2xl border border-purple/30 bg-soft-purple/40 p-4 sm:p-5 backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-purple text-primary-foreground shadow-sm">
              <CheckCircle2 className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-purple">
                  Node Details
                </span>
                <span className="rounded-full border border-purple/30 bg-purple/10 px-2 py-0.5 text-[10px] font-medium text-purple">
                  {activeNode.badge ?? "Component"}
                </span>
              </div>
              <h4 className="text-base font-semibold text-foreground">{activeNode.label}</h4>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-xs text-muted-foreground">Mapped to:</span>
            {activeNode.regulations.map((reg) => (
              <span
                key={reg}
                className="rounded-full border border-purple/30 bg-background px-2.5 py-0.5 font-mono text-xs font-medium text-purple"
              >
                {reg}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {activeNode.desc}
        </p>
      </div>
    </div>
  );
}
