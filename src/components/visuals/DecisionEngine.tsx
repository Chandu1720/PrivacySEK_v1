import { useState } from "react";

const pipeline = [
  { k: "Data activity", v: "Export of 18,400 customer records" },
  { k: "Context", v: "Analyst · unmanaged device · outside business hours" },
  { k: "Data sensitivity", v: "Contact data + national ID (classified, 94%)" },
  { k: "Policy", v: "DP-07 · Customer data export control" },
  { k: "Risk", v: "High — volume × sensitivity × destination" },
  { k: "Jurisdiction", v: "EU data subjects → GDPR obligations" },
];

const decisions = {
  Allow: { tone: "sky", text: "Activity proceeds. Decision and context are logged as evidence." },
  Warn: { tone: "risk", text: "User is warned inline; activity proceeds and the warning is recorded." },
  "Require justification": { tone: "purple", text: "User must state a business reason before continuing." },
  Mask: { tone: "purple", text: "Sensitive fields are masked; the rest of the data continues." },
  Restrict: { tone: "purple", text: "Only permitted fields or destinations are allowed through." },
  Block: { tone: "risk", text: "Activity is stopped. The user sees why, and the event is recorded." },
  Quarantine: { tone: "risk", text: "Data is held in a controlled location pending review." },
  Escalate: { tone: "purple", text: "Routed to the data owner for human review with full context." },
  "Create incident": { tone: "risk", text: "A linked incident opens in Incident Management." },
} as const;
type D = keyof typeof decisions;

function Current({ d }: { d: D }) {
  const base = "M 20 90 C 200 90, 260 90, 380 90";
  return (
    <svg viewBox="0 0 800 180" className="w-full" aria-hidden="true">
      <path d={base} fill="none" className="stroke-sky current-flow" strokeWidth="3" />
      <circle cx="380" cy="90" r="16" className="fill-soft-purple stroke-purple" strokeWidth="2" />
      <text x="380" y="95" textAnchor="middle" fontSize="11" className="fill-purple-deep font-mono">Data protection and Enforcement</text>
      {d === "Allow" && <path d="M 396 90 L 780 90" className="stroke-sky current-flow" strokeWidth="3" />}
      {d === "Warn" && <><path d="M 396 90 L 780 90" className="stroke-sky current-flow" strokeWidth="3" /><path d="M 520 60 L 540 90 L 500 90 Z" className="fill-risk" /><text x="520" y="50" textAnchor="middle" fontSize="12" className="fill-foreground font-mono">WARN</text></>}
      {d === "Require justification" && <><path d="M 396 90 L 540 90" className="stroke-sky" strokeWidth="3" /><rect x="540" y="72" width="80" height="36" rx="6" className="fill-background stroke-purple" strokeWidth="2" /><text x="580" y="95" textAnchor="middle" fontSize="11" className="fill-purple-deep font-mono">REASON?</text><path d="M 620 90 L 780 90" className="stroke-sky current-flow" strokeWidth="3" strokeDasharray="4 8" /></>}
      {d === "Mask" && <><path d="M 396 90 L 560 90" className="stroke-sky" strokeWidth="3" /><circle cx="570" cy="90" r="10" className="fill-purple" /><text x="570" y="128" textAnchor="middle" fontSize="12" className="fill-purple-deep font-mono">MASK</text><path d="M 580 90 L 780 90" className="stroke-purple current-flow" strokeWidth="3" /></>}
      {d === "Restrict" && <><path d="M 396 90 C 500 90, 520 50, 780 50" className="stroke-sky current-flow" strokeWidth="1.5" fill="none" /><path d="M 396 90 C 500 90, 520 130, 600 130" className="stroke-border" strokeWidth="3" fill="none" /><line x1="600" y1="118" x2="600" y2="142" className="stroke-risk" strokeWidth="3" /><text x="640" y="40" fontSize="12" className="fill-foreground font-mono">PERMITTED FIELDS ONLY</text></>}
      {d === "Block" && <><path d="M 396 90 L 560 90" className="stroke-sky" strokeWidth="3" /><g className="stroke-risk" strokeWidth="4"><line x1="560" y1="74" x2="592" y2="106" /><line x1="592" y1="74" x2="560" y2="106" /></g><text x="576" y="132" textAnchor="middle" fontSize="12" className="fill-foreground font-mono">BLOCKED</text></>}
      {d === "Quarantine" && <><path d="M 396 90 L 560 90" className="stroke-sky current-flow" strokeWidth="3" /><rect x="560" y="56" width="120" height="68" rx="8" className="fill-soft-risk stroke-risk" strokeWidth="2" strokeDasharray="5 4" /><text x="620" y="95" textAnchor="middle" fontSize="12" className="fill-foreground font-mono">HELD</text></>}
      {d === "Escalate" && <><path d="M 396 90 L 560 90" className="stroke-sky" strokeWidth="3" /><path d="M 560 90 L 640 90 L 640 150" className="stroke-purple current-flow" strokeWidth="3" fill="none" /><rect x="600" y="150" width="80" height="26" rx="13" className="fill-purple" /><text x="640" y="167" textAnchor="middle" fontSize="11" className="fill-primary-foreground font-mono">REVIEW</text></>}
      {d === "Create incident" && <><path d="M 396 90 L 520 90" className="stroke-sky" strokeWidth="3" /><g className="stroke-risk" strokeWidth="3"><line x1="520" y1="78" x2="544" y2="102" /><line x1="544" y1="78" x2="520" y2="102" /></g><path d="M 532 102 C 532 140, 600 150, 680 150" className="stroke-risk current-flow" strokeWidth="2.5" fill="none" /><text x="690" y="155" fontSize="12" className="fill-foreground font-mono">INC-2291</text></>}
    </svg>
  );
}

export function DecisionEngine() {
  const [d, setD] = useState<D>("Mask");
  return (
    <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
      <ol className="relative space-y-3 border-l-2 border-dashed border-purple/30 pl-6">
        {pipeline.map((p, i) => (
          <li key={p.k} className="relative">
            <span aria-hidden="true" className="absolute -left-[31px] top-1.5 size-3 rounded-full border-2 border-purple bg-background" />
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{i + 1}. {p.k}</p>
            <p className="text-sm font-medium text-foreground">{p.v}</p>
          </li>
        ))}
        <li className="relative">
          <span aria-hidden="true" className="absolute -left-[33px] top-1 size-4 rounded-full bg-purple" />
          <p className="font-mono text-xs uppercase tracking-widest text-purple">7. Decision</p>
          <p className="text-sm font-semibold text-foreground">{d}</p>
        </li>
      </ol>
      <div className="rounded-2xl border bg-surface p-5 md:p-8">
        <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Data protection and Enforcement decision">
          {(Object.keys(decisions) as D[]).map((k) => (
            <button key={k} role="radio" aria-checked={d === k} onClick={() => setD(k)}
              className={`min-h-9 rounded-md border px-3 font-mono text-xs uppercase transition-colors ${d === k ? (decisions[k].tone === "risk" ? "border-risk bg-soft-risk text-foreground" : "border-purple bg-purple text-primary-foreground") : "bg-background hover:border-purple/50"}`}>
              {k}
            </button>
          ))}
        </div>
        <div className="mt-6 rounded-xl border bg-background p-4"><Current d={d} /></div>
        <p className="mt-4 text-sm text-foreground" aria-live="polite"><strong>{d}:</strong> {decisions[d].text}</p>
      </div>
    </div>
  );
}
