import { useState } from "react";

const lenses = {
  Data: {
    tone: "sky",
    label: "Data lens",
    desc: "Track your data lifecycle: discover where files live, quantify sensitive PII, apply encryption, enforce access policies, and generate compliance reports.",
    items: [
      "Data Sources",
      "Total assets",
      "Volume of Data (PII/Non PII)",
      "Classification & labelling",
      "Encryption / Masking",
      "Policy enforcement",
      "Anomaly detection",
      "Risk & compliance Reports",
    ],
    values: [
      "Databases · SaaS · APIs",
      "1,240 discovered assets",
      "4.2M records · 68% PII",
      "Direct ID · Quasi-ID",
      "AES-256 · Tokenized",
      "RBAC / ABAC enforced",
      "Drift & exfiltration alerts",
      "Audit-ready evidence log",
    ],
  },
  Privacy: {
    tone: "purple",
    label: "Privacy lens",
    desc: "Manage everyday privacy obligations: publish notices, collect user consent, maintain processing records (ROPA), fulfill data requests (DSR), and enforce retention.",
    items: [
      "Privacy policy / notice",
      "Consent management",
      "ROPA records",
      "DSR fulfillment",
      "Data retention",
      "Contractual (SCC/DPA)",
      "Risk & governance reports",
    ],
    values: [
      "Published & versioned",
      "Recorded & opt-out tracked",
      "Processing activities mapped",
      "Access & deletion workflows",
      "Automated retention schedules",
      "Standard clauses executed",
      "Executive governance sign-off",
    ],
  },
  Risk: {
    tone: "risk",
    label: "Risk lens",
    desc: "Uncover and minimize compliance liabilities: monitor access privileges, perform impact assessments (DPIAs), deploy safeguards, and track real-time risk scores.",
    items: [
      "High-sensitivity data",
      "Access privileges",
      "Risk monitoring",
      "DPIA / PIA assessments",
      "Risk mitigations",
      "Compliance scorecards",
    ],
    values: [
      "Financial · Health · Biometric",
      "Privileged accounts & roles",
      "Continuous posture telemetry",
      "High-risk impact assessments",
      "Compensating controls active",
      "Real-time posture scorecard",
    ],
  },
  DPO: {
    tone: "purple",
    label: "DPO lens",
    desc: "Executive oversight for Data Protection Officers: review classifications, validate lawful bases, monitor third-party vendors, and maintain breach preparedness.",
    items: [
      "Data classification review",
      "ROPA validation",
      "Consent review",
      "DSR audit",
      "Supply chain oversight",
      "Incident readiness",
      "Residual risk review",
      "Reports & dashboard",
    ],
    values: [
      "Categorization verified",
      "Processing purpose validated",
      "Lawful basis verified",
      "Timely fulfillment checked",
      "Vendor & processor oversight",
      "72-hour breach readiness",
      "Residual exposure evaluated",
      "Supervisory dashboard ready",
    ],
  },
  Jurisdiction: {
    tone: "purple",
    label: "Jurisdiction lens",
    desc: "Align with global regulations: identify where subjects reside, protect cross-border data transfers, and generate defensible DPDPA, GDPR & CCPA filings.",
    items: [
      "Individual PII",
      "Organization collection",
      "Technical safeguards",
      "Cross-border transfer",
      "Governance structure",
      "Compliance reports",
    ],
    values: [
      "Data principal residency",
      "Entity collection boundaries",
      "Operational safeguards active",
      "Transfer mechanisms verified",
      "Accountability structures",
      "DPDPA · GDPR · CCPA filings",
    ],
  },
} as const;

type LensKey = keyof typeof lenses;

function computePoints(count: number) {
  const startX = 60;
  const endX = 1140;
  const step = (endX - startX) / (count - 1);
  return Array.from({ length: count }, (_, i) => ({
    x: Math.round(startX + i * step),
    y: i % 2 === 0 ? 190 : 110,
  }));
}

export function PrivacyLens() {
  const [lens, setLens] = useState<LensKey>("Data");
  const L = lenses[lens];
  const stroke = L.tone === "risk" ? "stroke-risk" : L.tone === "sky" ? "stroke-sky" : "stroke-purple";
  const fill = L.tone === "risk" ? "fill-risk" : L.tone === "sky" ? "fill-sky" : "fill-purple";
  const pts = computePoints(L.items.length);
  const path =
    `M 0 210 C 35 210, 40 190, ${pts[0]!.x} ${pts[0]!.y} ` +
    pts
      .slice(1)
      .map((p, i) => `S ${(pts[i]!.x + p.x) / 2} ${p.y}, ${p.x} ${p.y}`)
      .join(" ") +
    ` S 1170 150, 1200 150`;
  return (
    <div className="rounded-2xl border bg-background p-4 md:p-8">
      <div role="tablist" aria-label="Privacy Lens" className="flex flex-wrap gap-2">
        {(Object.keys(lenses) as LensKey[]).map((k) => (
          <button
            key={k}
            role="tab"
            id={`lens-tab-${k}`}
            aria-selected={lens === k}
            aria-controls="lens-panel"
            onClick={() => setLens(k)}
            onKeyDown={(e) => {
              const keys = Object.keys(lenses) as LensKey[];
              const i = keys.indexOf(k);
              if (e.key === "ArrowRight") {
                const n = keys[(i + 1) % keys.length];
                setLens(n!);
                document.getElementById(`lens-tab-${n}`)?.focus();
              }
              if (e.key === "ArrowLeft") {
                const n = keys[(i - 1 + keys.length) % keys.length];
                setLens(n!);
                document.getElementById(`lens-tab-${n}`)?.focus();
              }
            }}
            tabIndex={lens === k ? 0 : -1}
            className={`min-h-10 rounded-full border px-4 font-mono text-xs font-medium uppercase tracking-wider transition-colors ${
              lens === k ? "border-purple bg-purple text-primary-foreground" : "text-foreground hover:border-purple/50"
            }`}
          >
            {lenses[k].label}
          </button>
        ))}
      </div>

      <div id="lens-panel" role="tabpanel" aria-labelledby={`lens-tab-${lens}`} className="mt-6">
        <p className="text-sm font-medium leading-relaxed text-muted-foreground md:text-base">{L.desc}</p>

        <div className="-mx-4 mt-6 overflow-x-auto px-4 pb-2">
          <svg viewBox="0 0 1200 300" className="min-w-[880px]" aria-hidden="true">
            <path d={path} fill="none" className="stroke-border" strokeWidth="14" strokeLinecap="round" />
            <path key={lens} d={path} fill="none" className={`${stroke} current-flow transition-all`} strokeWidth="2.5" />
            {pts.map((p, i) => (
              <g key={`${lens}-${i}`} className="reveal" style={{ animationDelay: `${i * 60}ms` }}>
                <circle cx={p.x} cy={p.y} r="10" className={`fill-background ${stroke}`} strokeWidth="2.5" />
                <circle cx={p.x} cy={p.y} r="4" className={fill} />
                {/* <text
                  x={p.x}
                  y={p.y + (p.y < 160 ? -30 : 38)}
                  textAnchor="middle" */}
                  <text
                  x={i === 0 ? p.x - 20 : i === pts.length - 1 ? p.x + 20 : p.x}
                  y={p.y + (p.y < 160 ? -30 : 38)}
                  textAnchor={i === 0 ? "start" : i === pts.length - 1 ? "end" : "middle"}
                  fontSize="12"
                  className="fill-foreground font-medium uppercase"
                >
                  {String(i + 1).padStart(2, "0")} · {L.items[i]}
                </text>
                {/* <text
                  x={p.x}
                  y={p.y + (p.y < 160 ? -48 : 56)}
                  textAnchor="middle" */}
                <text
                  x={i === 0 ? p.x - 20 : i === pts.length - 1 ? p.x + 20 : p.x}
                  y={p.y + (p.y < 160 ? -48 : 56)}
                  textAnchor={i === 0 ? "start" : i === pts.length - 1 ? "end" : "middle"}                  fontSize="13"
                  className="fill-muted-foreground font-mono "
                >
                  {L.values[i]}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {L.items.map((it, i) => (
            <div key={it} className="rounded-xl border bg-surface p-3 text-left">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Step {i + 1}
              </span>
              <p className="mt-1 text-xs font-medium text-foreground">{it}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{L.values[i]}</p>
            </div>
          ))}
        </div>

        <dl className="sr-only">
          {L.items.map((it, i) => (
            <div key={it}>
              <dt>{it}</dt>
              <dd>{L.values[i]}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 font-mono text-xs text-muted-foreground">Continuous data pipeline · switch tabs above to view different operational perspectives</p>
      </div>
    </div>
  );
}
