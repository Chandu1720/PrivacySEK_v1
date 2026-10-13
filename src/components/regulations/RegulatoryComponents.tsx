import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  ExternalLink,
  Search,
  ShieldCheck,
} from "lucide-react";
import type { Regulation } from "@/data/regulations";

const lawRows = [
  ["Jurisdiction", "EU", "California", "India"],
  ["Consent", "Applicable", "Context-dependent", "Applicable"],
  ["Individual / consumer rights", "Applicable", "Applicable", "Applicable"],
  ["Data access", "Applicable", "Applicable", "Applicable"],
  ["Correction", "Applicable", "Applicable", "Applicable"],
  ["Deletion / erasure", "Applicable", "Applicable", "Applicable"],
  ["Children", "Applicable", "Applicable", "Applicable"],
  ["Processor requirements", "Applicable", "Applicable", "Applicable"],
  ["Breach requirements", "Applicable", "Applicable", "Applicable"],
  ["Risk assessment", "Applicable contexts", "Relevant contexts", "Applicable contexts"],
  ["International transfer", "Applicable contexts", "Applicable contexts", "Applicable contexts"],
  ["Evidence / accountability", "Applicable", "Applicable", "Applicable"],
];

const mappings = [
  {
    label: "Data subject rights",
    requirement: "Rights request workflow",
    module: "DSAR / DSR",
    evidence: "Request, actions and completion record",
    regulation: "GDPR",
  },
  {
    label: "Consent",
    requirement: "Consent collection and management",
    module: "Consent Management",
    evidence: "Consent record, timestamp, purpose and status",
    regulation: "DPDP",
  },
  {
    label: "Processing accountability",
    requirement: "Processing activity management",
    module: "ROPA",
    evidence: "Processing record, ownership and linked evidence",
    regulation: "GDPR · CCPA / CPRA · DPDP",
  },
  {
    label: "High-risk processing",
    requirement: "Privacy risk assessment",
    module: "DPIA / PIA",
    evidence: "Assessment, risk, mitigations and review",
    regulation: "GDPR · DPDP",
  },
  {
    label: "Policy decision",
    requirement: "Operational policy enforcement",
    module: "Data protection and Enforcement",
    evidence: "Decision, rationale and evidence",
    regulation: "Cross-regulation",
  },
];

const lifecycle = [
  ["Regulation", "Start with the law and the context that may bring it into scope."],
  ["Understand", "Know what the regulation requires."],
  ["Map", "Connect requirements to privacy controls."],
  ["Discover", "Understand what personal data exists and where it flows."],
  ["Assess", "Evaluate processing activities and privacy risks."],
  ["Operationalize", "Implement consent, rights, records and governance workflows."],
  ["Enforce", "Apply policy decisions using Data protection and Enforcement."],
  ["Monitor", "Track obligations, risks and verified regulatory developments."],
  ["Prove", "Maintain evidence, reports and audit-ready records."],
];

export function RegulationCard({ regulation }: { regulation: Regulation }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple/50 hover:shadow-[0_18px_55px_-34px_rgba(72,67,190,0.55)] focus-within:border-purple/50 sm:p-7">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky/70 via-purple/70 to-transparent opacity-50 transition-opacity group-hover:opacity-100"
      />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {regulation.region}
          </p>
          <h3 className="mt-3 text-3xl font-bold">{regulation.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{regulation.full}</p>
        </div>
        <span
          aria-hidden="true"
          className="mt-1 grid size-10 shrink-0 place-items-center rounded-full border border-sky/30 bg-soft-blue text-blue transition-all group-hover:border-sky group-hover:shadow-[0_0_22px_rgba(61,167,220,0.3)]"
        >
          <span className="size-2 rounded-full bg-sky shadow-[0_0_12px_currentColor]" />
        </span>
      </div>
      <p className="mt-5 min-h-[76px] text-sm leading-relaxed text-muted-foreground">
        {regulation.cardDescription}
      </p>
      <div className="my-5 border-t" />
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.17em] text-muted-foreground">
        Key areas
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {(regulation.keyAreas ?? []).slice(0, 5).map((area) => (
          <li
            key={area}
            className="rounded-full border bg-surface px-2.5 py-1 text-xs text-foreground"
          >
            {area}
          </li>
        ))}
        {(regulation.keyAreas?.length ?? 0) > 5 && (
          <li className="rounded-full border bg-surface px-2.5 py-1 text-xs text-muted-foreground">
            +{regulation.keyAreas!.length - 5} areas
          </li>
        )}
      </ul>
      <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.17em] text-muted-foreground">
        PrivacySEK capabilities
      </p>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        {regulation.capabilities?.join(" · ")}
      </p>
      <Link
        to="/regulations/$slug"
        params={{ slug: regulation.slug }}
        aria-label={`Explore ${regulation.name}`}
        className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 text-sm font-semibold text-purple transition-all group-hover:gap-3 group-hover:text-purple-deep"
      >
        Explore {regulation.name} <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </article>
  );
}

export function RegulatoryGraph({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState("PrivacySEK");
  const nodes = compact
    ? [
        { id: "GDPR", x: 180, y: 42, type: "law" },
        { id: "CCPA / CPRA", x: 64, y: 102, type: "law" },
        { id: "DPDP", x: 296, y: 102, type: "law" },
        { id: "Requirements", x: 180, y: 137, type: "requirement" },
        { id: "PrivacySEK", x: 180, y: 222, type: "core" },
        { id: "Consent", x: 67, y: 299, type: "operation" },
        { id: "Risk", x: 293, y: 299, type: "operation" },
        { id: "Evidence", x: 180, y: 355, type: "evidence" },
      ]
    : [
        { id: "GDPR", x: 250, y: 28, type: "law" },
        { id: "Requirements", x: 250, y: 105, type: "requirement" },
        { id: "Consent", x: 73, y: 177, type: "operation" },
        { id: "PrivacySEK", x: 250, y: 195, type: "core" },
        { id: "Risk", x: 427, y: 177, type: "operation" },
        { id: "Evidence", x: 250, y: 283, type: "evidence" },
        { id: "CCPA / CPRA", x: 117, y: 344, type: "law" },
        { id: "DPDP", x: 383, y: 344, type: "law" },
      ];
  const links: [string, string][] = compact
    ? [
        ["GDPR", "Requirements"],
        ["CCPA / CPRA", "Requirements"],
        ["DPDP", "Requirements"],
        ["Requirements", "PrivacySEK"],
        ["Consent", "PrivacySEK"],
        ["Risk", "PrivacySEK"],
        ["PrivacySEK", "Evidence"],
        ["Evidence", "CCPA / CPRA"],
        ["Evidence", "DPDP"],
      ]
    : [
        ["GDPR", "Requirements"],
        ["Requirements", "PrivacySEK"],
        ["Consent", "PrivacySEK"],
        ["Risk", "PrivacySEK"],
        ["PrivacySEK", "Evidence"],
        ["Evidence", "CCPA / CPRA"],
        ["Evidence", "DPDP"],
      ];
  const coords = new Map(nodes.map((node) => [node.id, node]));
  const related = new Set([active]);
  links.forEach(([a, b]) => {
    if (a === active) related.add(b);
    if (b === active) related.add(a);
  });
  const point = (id: string) => coords.get(id)!;
  const viewBox = compact ? "0 0 360 395" : "0 0 500 390";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-background/70 ${compact ? "p-3" : "p-4 sm:p-6"}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 48%, rgba(111,126,234,.12), transparent 42%), linear-gradient(rgba(114,137,166,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(114,137,166,.06) 1px, transparent 1px)",
          backgroundSize: "auto, 28px 28px, 28px 28px",
        }}
      />
      <svg
        viewBox={viewBox}
        role="group"
        aria-label="Interactive network connecting regulations, requirements, privacy operations and evidence"
        className="relative mx-auto w-full max-w-[510px]"
      >
        <defs>
          <filter id="reg-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {links.map(([a, b]) => {
          const A = point(a);
          const B = point(b);
          const on = related.has(a) && related.has(b);
          return (
            <g
              key={`${a}-${b}`}
              className={`transition-opacity duration-500 ${on ? "opacity-100" : "opacity-30"}`}
            >
              <path
                d={`M${A.x} ${A.y} Q ${(A.x + B.x) / 2 + 10} ${(A.y + B.y) / 2} ${B.x} ${B.y}`}
                fill="none"
                stroke={on ? "#70bfea" : "#9aabc1"}
                strokeWidth={on ? "1.8" : "1"}
                strokeDasharray={on ? "5 8" : "none"}
                className={on ? "current-flow" : ""}
              />
              <circle r="2.5" fill="#74c9ed" className="particle">
                <animateMotion
                  dur="5s"
                  repeatCount="indefinite"
                  path={`M${A.x} ${A.y} Q ${(A.x + B.x) / 2 + 10} ${(A.y + B.y) / 2} ${B.x} ${B.y}`}
                />
              </circle>
            </g>
          );
        })}
        {nodes.map((node) => {
          const highlighted = related.has(node.id);
          const isCore = node.type === "core";
          const width = node.id.length * (compact ? 6 : 6.8) + (isCore ? 39 : 26);
          return (
            <g
              key={node.id}
              role="button"
              tabIndex={0}
              aria-label={`Highlight ${node.id} relationships`}
              aria-pressed={active === node.id}
              onFocus={() => setActive(node.id)}
              onMouseEnter={() => setActive(node.id)}
              onClick={() => setActive(node.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActive(node.id);
                }
              }}
              className={`cursor-pointer transition-opacity duration-300 ${highlighted ? "opacity-100" : "opacity-45"}`}
            >
              <rect
                x={node.x - width / 2}
                y={node.y - (isCore ? 20 : 16)}
                width={width}
                height={isCore ? 40 : 32}
                rx="16"
                fill={isCore ? "#242854" : "#fff"}
                fillOpacity={isCore ? ".98" : ".87"}
                stroke={isCore ? "#8185ee" : node.type === "law" ? "#79bbdb" : "#cbd4e2"}
                strokeWidth={isCore ? "1.7" : "1.2"}
                filter={highlighted && isCore ? "url(#reg-glow)" : undefined}
              />
              <circle
                cx={node.x - width / 2 + 13}
                cy={node.y}
                r="3"
                fill={
                  node.type === "law" ? "#53b8e8" : node.type === "core" ? "#a7a2ff" : "#816de0"
                }
              />
              <text
                x={node.x + 5}
                y={node.y + 4}
                textAnchor="middle"
                fontSize={compact ? "10" : "11"}
                fontWeight={isCore ? "700" : "500"}
                fill={isCore ? "#fff" : "#263247"}
              >
                {node.id}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="relative mt-1 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        Select or focus a node to explore relationships
      </p>
    </div>
  );
}

export function RegulationComparison() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-background">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Comparison of common requirements across GDPR, CCPA / CPRA and DPDP
          </caption>
          <thead>
            <tr className="bg-surface">
              {["Requirement", "GDPR", "CCPA / CPRA", "DPDP"].map((head) => (
                <th
                  key={head}
                  scope="col"
                  className="border-b px-5 py-4 font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lawRows.map((row) => (
              <tr key={row[0]} className="transition-colors hover:bg-soft-blue/50">
                {row.map((cell, index) => (
                  <td
                    key={index}
                    className={`border-b px-5 py-3.5 last:border-b-0 ${index === 0 ? "font-medium text-foreground" : "text-muted-foreground"}`}
                  >
                    {index > 0 && (
                      <span
                        aria-hidden="true"
                        className="mr-2 inline-block size-1.5 rounded-full bg-sky align-middle"
                      />
                    )}
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t bg-surface/70 px-5 py-3 text-xs leading-relaxed text-muted-foreground">
        Comparison is a high-level orientation only. Applicability depends on scope and
        circumstances; confirm specific obligations with qualified counsel.
      </p>
    </div>
  );
}

export function RequirementMapping() {
  const [selected, setSelected] = useState(0);
  const item = mappings[selected]!;
  return (
    <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
      <div className="grid gap-2" role="tablist" aria-label="Requirement mappings">
        {mappings.map((mapping, index) => (
          <button
            key={mapping.label}
            id={`mapping-tab-${index}`}
            role="tab"
            aria-selected={selected === index}
            aria-controls="mapping-panel"
            onClick={() => setSelected(index)}
            className={`flex min-h-14 items-center justify-between gap-3 rounded-xl border px-4 text-left text-sm font-medium transition-colors ${selected === index ? "border-purple/40 bg-soft-purple text-purple-deep" : "bg-background hover:border-purple/30"}`}
          >
            <span>{mapping.label}</span>
            <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
          </button>
        ))}
      </div>
      <div
        id="mapping-panel"
        role="tabpanel"
        aria-labelledby={`mapping-tab-${selected}`}
        className="rounded-2xl border bg-background p-5 sm:p-7"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-muted-foreground">
          {item.regulation}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {[item.label, item.requirement, item.module, item.evidence].map((text, index) => (
            <div key={text} className="flex items-center gap-2">
              <span
                className={`rounded-lg border px-3 py-2 text-xs font-semibold sm:text-sm ${index === 2 ? "border-purple/30 bg-soft-purple text-purple-deep" : "bg-surface"}`}
              >
                {text}
              </span>
              {index < 3 && <ArrowRight aria-hidden="true" className="size-4 text-sky" />}
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          A practical mapping example—not a representation that any particular module is legally
          required.
        </p>
      </div>
    </div>
  );
}

export function RegulatoryLifecycle() {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {lifecycle.map(([step, body], index) => (
        <li key={step} className="relative rounded-xl border bg-background p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-purple">
            0{index + 1} · {index === 0 ? "Start" : "Lifecycle"}
          </p>
          <h3 className="mt-2 text-lg font-semibold">{step}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
          {index < lifecycle.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute -right-2 top-1/2 z-10 hidden rounded-full border bg-background p-1 text-sky lg:block"
            >
              <ArrowRight className="size-3" />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

export function RegulationUpdateCard() {
  return (
    <article className="rounded-2xl border border-dashed bg-background p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-purple">
          Regulatory intelligence
        </p>
        <span className="rounded-full border bg-surface px-3 py-1 text-xs text-muted-foreground">
          Verified updates only
        </span>
      </div>
      <h3 className="mt-5 text-xl font-semibold">
        No verified regulatory updates published here yet.
      </h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        PrivacySEK will surface a development only when it can be tied to a verified regulatory
        source and its operational impact reviewed. No changes, dates or provisions are inferred or
        fabricated.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          ["What changed?", "Source-backed development"],
          ["Impact", "Organizations and activities potentially affected"],
          ["Action", "Operational areas to review"],
        ].map(([title, body]) => (
          <div key={title} className="rounded-lg border bg-surface/70 p-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {title}
            </p>
            <p className="mt-1 text-sm">{body}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

const places = ["European Union", "California, USA", "India", "Other / not sure"] as const;
type Place = (typeof places)[number];

export function RegulationApplicability({ regulations }: { regulations: Regulation[] }) {
  const [orgLocation, setOrgLocation] = useState<Place | "">("");
  const [userLocations, setUserLocations] = useState<Place[]>([]);
  const [industry, setIndustry] = useState("");
  const [dataType, setDataType] = useState("");
  const [targetsOther, setTargetsOther] = useState("");
  const [activities, setActivities] = useState("");
  const [organizationSize, setOrganizationSize] = useState("");
  const [vendors, setVendors] = useState("");
  const touched = Boolean(
    orgLocation ||
    userLocations.length ||
    industry ||
    dataType ||
    targetsOther ||
    activities ||
    organizationSize ||
    vendors,
  );
  const results = useMemo(() => {
    const gdpr = orgLocation === "European Union" || userLocations.includes("European Union");
    const ccpa = orgLocation === "California, USA" || userLocations.includes("California, USA");
    const dpdp = orgLocation === "India" || userLocations.includes("India");
    return regulations.filter((regulation) =>
      regulation.slug === "gdpr"
        ? gdpr
        : regulation.slug === "ccpa"
          ? ccpa
          : regulation.slug === "dpdp"
            ? dpdp
            : false,
    );
  }, [orgLocation, userLocations, regulations]);
  const inputClass =
    "mt-2 min-h-11 w-full rounded-lg border bg-background px-3 text-sm text-foreground";
  const togglePlace = (place: Place) =>
    setUserLocations((current) =>
      current.includes(place) ? current.filter((item) => item !== place) : [...current, place],
    );

  return (
    <div className="grid gap-7 lg:grid-cols-[1fr_0.78fr]">
      <form className="grid gap-4 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
        <label className="text-sm font-medium">
          Organization location
          <select
            className={inputClass}
            value={orgLocation}
            onChange={(event) => setOrgLocation(event.target.value as Place | "")}
          >
            <option value="">Choose a location</option>
            {places.map((place) => (
              <option key={place}>{place}</option>
            ))}
          </select>
        </label>
        <fieldset className="rounded-lg border p-3">
          <legend className="px-1 text-sm font-medium">Customer / user locations</legend>
          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-2">
            {places.map((place) => (
              <label key={place} className="flex items-center gap-1.5 text-xs">
                <input
                  type="checkbox"
                  checked={userLocations.includes(place)}
                  onChange={() => togglePlace(place)}
                />
                {place}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="text-sm font-medium">
          Industries served
          <select
            className={inputClass}
            value={industry}
            onChange={(event) => setIndustry(event.target.value)}
          >
            <option value="">Choose an industry</option>
            {[
              "Technology",
              "Financial services",
              "Healthcare",
              "Retail",
              "Public sector",
              "Other",
            ].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Types of personal data
          <select
            className={inputClass}
            value={dataType}
            onChange={(event) => setDataType(event.target.value)}
          >
            <option value="">Choose data types</option>
            {[
              "Basic identifiers",
              "Financial data",
              "Health data",
              "Children's data",
              "Sensitive data",
              "Multiple / not sure",
            ].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Target users in other jurisdictions?
          <select
            className={inputClass}
            value={targetsOther}
            onChange={(event) => setTargetsOther(event.target.value)}
          >
            <option value="">Choose an answer</option>
            <option>Yes</option>
            <option>No</option>
            <option>Not sure</option>
          </select>
        </label>
        <label className="text-sm font-medium">
          Processing activities
          <select
            className={inputClass}
            value={activities}
            onChange={(event) => setActivities(event.target.value)}
          >
            <option value="">Choose an activity</option>
            {[
              "Online services",
              "Advertising / profiling",
              "Employment",
              "Business operations",
              "Multiple / not sure",
            ].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Organization size / characteristics
          <select
            className={inputClass}
            value={organizationSize}
            onChange={(event) => setOrganizationSize(event.target.value)}
          >
            <option value="">Choose a range</option>
            {["Small", "Medium", "Large", "Publicly listed", "Not sure"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Use of vendors or processors
          <select
            className={inputClass}
            value={vendors}
            onChange={(event) => setVendors(event.target.value)}
          >
            <option value="">Choose an answer</option>
            <option>Yes</option>
            <option>No</option>
            <option>Not sure</option>
          </select>
        </label>
      </form>
      <div className="rounded-2xl border bg-background p-5 sm:p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-purple">
          Preliminary indicators
        </p>
        <h3 className="mt-2 text-xl font-semibold">Potentially relevant regulations</h3>
        {!touched && (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Choose organization and user locations to see preliminary jurisdictional indicators.
            Other answers add context, but do not determine legal applicability.
          </p>
        )}
        {touched && !results.length && (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Your current location selections do not identify a primary jurisdiction. Add customer or
            user locations, or review your circumstances with counsel.
          </p>
        )}
        <ul className="mt-4 space-y-3">
          {results.map((regulation) => (
            <li key={regulation.slug} className="rounded-xl border bg-surface/70 p-4">
              <div className="flex items-center gap-2">
                <Check aria-hidden="true" className="size-4 text-ok" />
                <span className="font-semibold">{regulation.name}</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Potential indicator:{" "}
                {orgLocation === regulation.region ||
                userLocations.includes(regulation.region as Place)
                  ? `organization or users connected to ${regulation.region}.`
                  : "cross-jurisdiction targeting requires a closer scope review."}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Review: {regulation.keyAreas?.slice(0, 3).join(" · ")}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Modules: {regulation.capabilities?.slice(0, 3).join(" · ")}
              </p>
              <Link
                to="/regulations/$slug"
                params={{ slug: regulation.slug }}
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-purple"
              >
                Explore {regulation.name}
                <ExternalLink aria-hidden="true" className="size-3" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-5 border-t pt-4 text-xs leading-relaxed text-muted-foreground">
          This self-assessment is an initial orientation, not a legal determination. Applicability
          depends on the specific facts and circumstances. PrivacySEK provides privacy intelligence
          and operational tooling, not legal advice.
        </p>
      </div>
    </div>
  );
}

export function RegulationSearch({ regulations }: { regulations: Regulation[] }) {
  const [query, setQuery] = useState("");
  const matches = useMemo(() => {
    const synonyms: Record<string, string> = { deletion: "delete", erasure: "erase" };
    const terms = query
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean)
      .map((term) => synonyms[term] ?? term);
    if (!terms.length) return [];
    return regulations.filter((regulation) => {
      const searchable = [
        regulation.name,
        regulation.full,
        regulation.region,
        regulation.slug,
        ...(regulation.keyAreas ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return terms.every((term) => searchable.includes(term));
    });
  }, [query, regulations]);
  return (
    <div className="relative mt-8 max-w-xl">
      <label htmlFor="regulation-search" className="sr-only">
        Search regulations, requirements, or topics
      </label>
      <Search
        aria-hidden="true"
        className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <input
        id="regulation-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search regulations, requirements, or topics..."
        className="min-h-12 w-full rounded-xl border border-white/20 bg-white/10 pl-11 pr-4 text-sm text-white placeholder:text-slate-300 focus-visible:outline-sky"
      />
      {query.trim() && (
        <ul
          className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-xl border bg-background shadow-xl"
          aria-live="polite"
        >
          {matches.length ? (
            matches.map((regulation) => (
              <li key={regulation.slug}>
                <Link
                  to="/regulations/$slug"
                  params={{ slug: regulation.slug }}
                  className="flex items-center justify-between gap-3 px-4 py-3 text-sm hover:bg-surface"
                >
                  <span>
                    <strong>{regulation.name}</strong>
                    <span className="ml-2 text-muted-foreground">{regulation.region}</span>
                  </span>
                  <ArrowRight aria-hidden="true" className="size-4 text-purple" />
                </Link>
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-sm text-muted-foreground">
              No regulation match yet. Try GDPR, consent, data rights or DPDP.
            </li>
          )}
        </ul>
      )}
      <p className="mt-2 text-xs text-slate-300">
        Try GDPR · Consent · Data subject rights · Data breach · DPDP · CCPA deletion rights
      </p>
    </div>
  );
}

export function MappingDownCue() {
  return (
    <span
      aria-hidden="true"
      className="mx-auto flex size-8 items-center justify-center rounded-full border bg-background text-sky"
    >
      <ArrowDown className="size-4" />
    </span>
  );
}

export function ExpandableRequirement({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group rounded-xl border bg-background p-4">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold">
        {title}
        <ChevronDown
          aria-hidden="true"
          className="size-4 transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="pt-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </details>
  );
}

export function LegalSourceNotice() {
  return (
    <p className="text-xs leading-relaxed text-muted-foreground">
      For specific provisions, dates, penalties and legal interpretations, consult current official
      regulatory sources and qualified counsel. This overview is not legal advice.
    </p>
  );
}

export function MappingEvidenceMark() {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
      <ShieldCheck aria-hidden="true" className="size-3.5" />
      Operational mapping, not a compliance guarantee
    </span>
  );
}
