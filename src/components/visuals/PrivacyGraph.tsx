import { useState } from "react";

const nodes = [
  { id: "subject", label: "Data Subject", x: 120, y: 90 },
  { id: "asset", label: "Data Asset", x: 330, y: 200 },
  { id: "activity", label: "Processing Activity", x: 560, y: 120 },
  { id: "system", label: "System", x: 180, y: 320 },
  { id: "vendor", label: "Vendor", x: 790, y: 210 },
  { id: "purpose", label: "Purpose", x: 560, y: 330 },
  { id: "location", label: "Location", x: 900, y: 80 },
  { id: "jurisdiction", label: "Jurisdiction", x: 960, y: 330 },
  { id: "policy", label: "Policy", x: 400, y: 420 },
  { id: "risk", label: "Risk", x: 720, y: 430 },
] as const;
type Id = (typeof nodes)[number]["id"];

const edges: [Id, Id][] = [
  ["subject", "asset"], ["asset", "activity"], ["asset", "system"], ["activity", "purpose"], ["activity", "vendor"],
  ["vendor", "location"], ["location", "jurisdiction"], ["vendor", "risk"], ["asset", "risk"], ["activity", "risk"],
  ["policy", "asset"], ["policy", "risk"], ["jurisdiction", "policy"], ["system", "activity"], ["subject", "jurisdiction"],
];

const explain: Record<Id, string> = {
  subject: "A data subject connects to the assets holding their data and to the jurisdictions that protect them.",
  asset: "A data asset connects to processing activities, systems, owners, classification and risk.",
  activity: "A processing activity connects purpose, data, systems, vendors, its ROPA record and risk.",
  system: "A system hosts data assets and supports processing activities.",
  vendor: "A vendor connects to processing, data, its DPA, subprocessors, transfer locations and risk.",
  purpose: "A purpose explains why processing happens and bounds what is appropriate.",
  location: "A location determines where data is stored or transferred.",
  jurisdiction: "Jurisdiction follows from subject, organization, processing and destination together.",
  policy: "Policy applies to assets and risk, shaped by jurisdiction.",
  risk: "Risk aggregates signals from assets, activities and vendors.",
};

export function PrivacyGraph() {
  const [sel, setSel] = useState<Id>("activity");
  const related = new Set<Id>([sel]);
  edges.forEach(([a, b]) => { if (a === sel) related.add(b); if (b === sel) related.add(a); });
  const label = (id: Id) => nodes.find((n) => n.id === id)!.label;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="-mx-5 overflow-x-auto px-5">
        <svg viewBox="0 0 1060 500" className="min-w-[680px]" aria-hidden="true">
          {edges.map(([a, b]) => {
            const A = nodes.find((n) => n.id === a)!, B = nodes.find((n) => n.id === b)!;
            const on = a === sel || b === sel;
            return (
              <path key={a + b} d={`M ${A.x} ${A.y} Q ${(A.x + B.x) / 2} ${(A.y + B.y) / 2 - 40}, ${B.x} ${B.y}`} fill="none"
                className={`transition-all duration-500 ${on ? "stroke-purple" : "stroke-border"}`} strokeWidth={on ? 2 : 1.2} />
            );
          })}
          {nodes.map((n) => {
            const on = related.has(n.id);
            const isRisk = n.id === "risk";
            return (
              <g key={n.id} className={`transition-opacity duration-500 ${on ? "opacity-100" : "opacity-35"}`}>
                <circle cx={n.x} cy={n.y} r={n.id === sel ? 14 : 9} className={`${isRisk ? "fill-soft-risk stroke-risk" : n.id === sel ? "fill-purple stroke-purple" : "fill-background stroke-purple"}`} strokeWidth="2" />
                <text x={n.x} y={n.y - 22} textAnchor="middle" fontSize="14" className="fill-foreground font-medium">{n.label}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-purple">
          Interactive Relationships
        </span>
        <h4 className="mt-0.5 text-base font-semibold text-foreground">Select an entity to explore</h4>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          Hover or click any privacy concept to see what it connects to in your operational estate:
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label="Graph entities">
          {nodes.map((n) => (
            <button
              key={n.id}
              aria-pressed={sel === n.id}
              onClick={() => setSel(n.id)}
              onMouseEnter={() => setSel(n.id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                sel === n.id
                  ? "border-purple bg-purple text-primary-foreground shadow-sm"
                  : "hover:border-purple/40 text-foreground"
              }`}
            >
              {n.label}
            </button>
          ))}
        </div>
        <div className="mt-5 rounded-2xl border bg-surface p-5" aria-live="polite">
          <div className="flex items-center justify-between border-b pb-2">
            <h4 className="text-base font-semibold text-foreground">{label(sel)}</h4>
            <span className="font-mono text-[10px] uppercase tracking-wider text-purple">Active Focus</span>
          </div>
          <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">{explain[sel]}</p>
          <div className="mt-4 border-t pt-3">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Direct Connections:</p>
            <ul className="mt-2 space-y-1.5">
              {[...related]
                .filter((r) => r !== sel)
                .map((r) => (
                  <li key={r} className="flex items-center gap-2 text-xs sm:text-sm text-foreground">
                    <span aria-hidden="true" className="text-purple font-semibold">→</span>
                    <span>{label(r)}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
