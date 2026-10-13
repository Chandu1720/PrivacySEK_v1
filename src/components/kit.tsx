// import type { ReactNode } from "react";
// import { Link } from "@tanstack/react-router";
// import { ArrowRight, ChevronRight } from "lucide-react";
// import { track } from "@/lib/consent";

// /* -------------------------------------------------------------------------- */
// /*  Layout                                                                    */
// /* -------------------------------------------------------------------------- */

// export function Container({
//   children,
//   className = "",
// }: {
//   children: ReactNode;
//   className?: string;
// }) {
//   return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
// }

// export function Section({
//   children,
//   className = "",
//   id,
//   label,
// }: {
//   children: ReactNode;
//   className?: string;
//   id?: string;
//   label?: string;
// }) {
//   return (
//     <section id={id} aria-label={label} className={`scroll-mt-24 py-16 md:py-24 ${className}`}>
//       <Container>{children}</Container>
//     </section>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*  Headings                                                                  */
// /* -------------------------------------------------------------------------- */

// type Tone = "purple" | "sky" | "risk";

// const toneStyles: Record<Tone, { pill: string; dot: string }> = {
//   purple: { pill: "bg-soft-purple text-purple-deep border-purple/20", dot: "bg-purple" },
//   sky: { pill: "bg-soft-blue text-blue border-sky/30", dot: "bg-sky" },
//   risk: { pill: "bg-soft-risk text-foreground border-risk/40", dot: "bg-risk" },
// };

// /** Small pill label with a status dot. Sentence case, no tracking tricks. */
// export function Eyebrow({
//   children,
//   tone = "purple",
// }: {
//   children: ReactNode;
//   tone?: Tone | undefined;
// }) {
//   const t = toneStyles[tone];
//   return (
//     <p
//       className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${t.pill}`}
//     >
//       <span aria-hidden="true" className={`size-1.5 rounded-full ${t.dot}`} />
//       {children}
//     </p>
//   );
// }

// export function SectionHeading({
//   eyebrow,
//   title,
//   body,
//   tone,
//   center,
// }: {
//   eyebrow?: string;
//   title: ReactNode;
//   body?: ReactNode;
//   tone?: Tone | undefined;
//   center?: boolean;
// }) {
//   return (
//     <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
//       {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
//       <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
//         {title}
//       </h2>
//       {body && (
//         <p
//           className={`mt-5 max-w-2xl text-pretty text-base leading-7 text-muted-foreground md:text-lg ${
//             center ? "mx-auto" : ""
//           }`}
//         >
//           {body}
//         </p>
//       )}
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*  Navigation                                                                */
// /* -------------------------------------------------------------------------- */

// export function Breadcrumb({ items }: { items: { name: string; path: string }[] }) {
//   return (
//     <nav aria-label="Breadcrumb" className="mb-6">
//       <ol className="inline-flex flex-wrap items-center gap-0.5 rounded-full border bg-background/80 p-1 text-sm text-muted-foreground backdrop-blur">
//         {items.map((it, i) => {
//           const last = i === items.length - 1;
//           return (
//             <li key={it.path} className="flex items-center gap-0.5">
//               {i > 0 && <ChevronRight aria-hidden="true" className="size-3.5 opacity-50" />}
//               {last ? (
//                 <span
//                   aria-current="page"
//                   className="rounded-full bg-soft-purple px-3 py-1 font-medium text-purple-deep"
//                 >
//                   {it.name}
//                 </span>
//               ) : (
//                 <Link
//                   to={it.path}
//                   className="rounded-full px-3 py-1 transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple"
//                 >
//                   {it.name}
//                 </Link>
//               )}
//             </li>
//           );
//         })}
//       </ol>
//     </nav>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*  Calls to action                                                           */
// /* -------------------------------------------------------------------------- */

// const ctaBase =
//   "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100";

// export function PrimaryCTA({
//   to = "/contact",
//   children,
//   cta,
// }: {
//   to?: string;
//   children: ReactNode;
//   cta: string;
// }) {
//   return (
//     <Link
//       to={to}
//       onClick={() => track("cta_click", { cta })}
//       className={`${ctaBase} bg-primary text-primary-foreground shadow-md shadow-purple/25 hover:bg-purple-deep hover:shadow-lg hover:shadow-purple/30 focus-visible:ring-purple`}
//     >
//       {children}
//       <ArrowRight
//         aria-hidden="true"
//         className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
//       />
//     </Link>
//   );
// }

// export function SecondaryCTA({
//   to,
//   children,
//   cta,
// }: {
//   to: string;
//   children: ReactNode;
//   cta: string;
// }) {
//   return (
//     <Link
//       to={to}
//       onClick={() => track("cta_click", { cta })}
//       className={`${ctaBase} border border-input bg-background text-foreground hover:border-purple hover:bg-soft-purple hover:text-purple-deep focus-visible:ring-purple`}
//     >
//       {children}
//     </Link>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*  Page hero                                                                 */
// /* -------------------------------------------------------------------------- */

// export function PageHero({
//   crumbs,
//   eyebrow,
//   title,
//   body,
//   children,
//   aside,
// }: {
//   crumbs?: { name: string; path: string }[];
//   eyebrow?: string;
//   title: ReactNode;
//   body?: ReactNode;
//   children?: ReactNode;
//   aside?: ReactNode;
// }) {
//   return (
//     <section className="relative isolate overflow-hidden border-b bg-surface">
//       {/* dotted field that fades out toward the bottom */}
//       <div
//         aria-hidden="true"
//         className="absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(var(--color-border,#d4d4d8)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
//       />
//       {/* single soft glow, top right */}
//       <div
//         aria-hidden="true"
//         className="absolute -right-24 -top-24 -z-10 size-[28rem] rounded-full bg-soft-purple blur-3xl"
//       />
//       <Container className="grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
//         <div>
//           {crumbs && <Breadcrumb items={crumbs} />}
//           {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
//           <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-5xl lg:text-6xl">
//             {title}
//           </h1>
//           {body && (
//             <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-muted-foreground">
//               {body}
//             </p>
//           )}
//           {children && <div className="mt-9 flex flex-wrap items-center gap-3">{children}</div>}
//         </div>
//         {aside && (
//           <div className="rounded-3xl border bg-background/70 p-2 shadow-xl shadow-purple/5 backdrop-blur">
//             {aside}
//           </div>
//         )}
//       </Container>
//     </section>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*  Status + risk                                                             */
// /* -------------------------------------------------------------------------- */

// export type Status =
//   | "Completed"
//   | "Pending"
//   | "Review Required"
//   | "Blocked"
//   | "Warning"
//   | "Error"
//   | "Active"
//   | "Masked"
//   | "Allowed"
//   | "Escalated"
//   | "In progress";

// const statusTone: Record<Status, { wrap: string; chip: string }> = {
//   Completed: { wrap: "bg-soft-ok text-ok border-ok/25", chip: "bg-ok text-white" },
//   Allowed: { wrap: "bg-soft-ok text-ok border-ok/25", chip: "bg-ok text-white" },
//   Active: { wrap: "bg-soft-blue text-blue border-sky/30", chip: "bg-blue text-white" },
//   "In progress": { wrap: "bg-soft-blue text-blue border-sky/30", chip: "bg-blue text-white" },
//   Pending: { wrap: "bg-surface text-muted-foreground border-border", chip: "bg-border text-foreground" },
//   Masked: { wrap: "bg-soft-purple text-purple-deep border-purple/25", chip: "bg-purple text-white" },
//   Escalated: { wrap: "bg-soft-purple text-purple-deep border-purple/25", chip: "bg-purple text-white" },
//   "Review Required": { wrap: "bg-soft-risk text-foreground border-risk/40", chip: "bg-risk text-foreground" },
//   Warning: { wrap: "bg-soft-risk text-foreground border-risk/40", chip: "bg-risk text-foreground" },
//   Blocked: { wrap: "bg-soft-risk text-foreground border-risk", chip: "bg-risk text-foreground" },
//   Error: { wrap: "bg-soft-risk text-destructive border-destructive/40", chip: "bg-destructive text-white" },
// };

// // Glyphs stay so status never depends on colour alone.
// const statusGlyph: Record<Status, string> = {
//   Completed: "✓",
//   Allowed: "✓",
//   Active: "●",
//   "In progress": "◐",
//   Pending: "○",
//   Masked: "◉",
//   Escalated: "↑",
//   "Review Required": "!",
//   Warning: "!",
//   Blocked: "✕",
//   Error: "✕",
// };

// export function StatusBadge({ status }: { status: Status }) {
//   const t = statusTone[status];
//   return (
//     <span
//       className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border py-0.5 pl-0.5 pr-2.5 text-xs font-medium ${t.wrap}`}
//     >
//       <span
//         aria-hidden="true"
//         className={`grid size-5 place-items-center rounded-full text-[10px] leading-none ${t.chip}`}
//       >
//         {statusGlyph[status]}
//       </span>
//       {status}
//     </span>
//   );
// }

// export type RiskLevel = "Low" | "Medium" | "High" | "Critical";

// export function RiskSignal({ level }: { level: RiskLevel }) {
//   const n = { Low: 1, Medium: 2, High: 3, Critical: 4 }[level];
//   const fill = n >= 3 ? "bg-risk" : "bg-sky";
//   return (
//     <span className="inline-flex items-center gap-2 text-xs font-medium text-foreground">
//       <span className="flex gap-1" aria-hidden="true">
//         {[1, 2, 3, 4].map((i) => (
//           <span
//             key={i}
//             className={`h-1.5 w-4 rounded-full transition-colors ${i <= n ? fill : "bg-border"}`}
//           />
//         ))}
//       </span>
//       {level}
//     </span>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*  Final CTA                                                                 */
// /* -------------------------------------------------------------------------- */

// export function FinalCTA({
//   title = "See your data the way PrivacySEK does.",
//   body = "Request Demo and we'll walk through your environment, priorities and the modules that matter first.",
//   exploreFirst = false,
//   exploreLabel = "Explore the platform",
// }: {
//   title?: string;
//   body?: string;
//   exploreFirst?: boolean;
//   exploreLabel?: string;
// }) {
//   const explore = (
//     <SecondaryCTA to="/platform" cta="final_explore">
//       {exploreLabel}
//     </SecondaryCTA>
//   );
//   return (
//     <section aria-label="Request Demo" className="py-16 md:py-24">
//       <Container>
//         <div className="grid overflow-hidden rounded-3xl border bg-surface lg:grid-cols-[1.35fr_1fr]">
//           {/* left: message, with faint flowing lines contained to this half */}
//           <div className="relative isolate px-8 py-12 md:px-14 md:py-16">
//             <svg
//               aria-hidden="true"
//               className="absolute inset-0 -z-10 h-full w-full"
//               preserveAspectRatio="none"
//               viewBox="0 0 1200 400"
//             >
//               {[0, 1, 2, 3].map((i) => (
//                 <path
//                   key={i}
//                   d={`M-20 ${80 + i * 70} C 300 ${40 + i * 90}, 700 ${320 - i * 60}, 1220 ${140 + i * 50}`}
//                   fill="none"
//                   className={i % 2 ? "stroke-purple/15 current-flow" : "stroke-sky/25 current-flow"}
//                   strokeWidth="1.5"
//                 />
//               ))}
//             </svg>
//             <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl md:leading-[1.1]">
//               {title}
//             </h2>
//             <p className="mt-4 max-w-lg text-pretty text-base leading-7 text-muted-foreground md:text-lg">
//               {body}
//             </p>
//           </div>

//           {/* right: the tint IS the column, so the card sits fully inside it */}
//           <div className="grid place-items-center border-t bg-soft-purple p-8 md:p-12 lg:border-l lg:border-t-0">
//             <div className="flex w-full max-w-sm flex-col gap-3 rounded-2xl border bg-background p-5 shadow-sm">
//               {exploreFirst && explore}
//               <PrimaryCTA cta="final_request_access">Request Demo</PrimaryCTA>
//               {!exploreFirst && explore}
//             </div>
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// }
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  Check,
  ChevronRight,
  Database,
  Radar,
  ShieldCheck,
} from "lucide-react";
import { track } from "@/lib/consent";

/* -------------------------------------------------------------------------- */
/* Container                                                                  */
/* -------------------------------------------------------------------------- */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-5 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Eyebrow                                                                    */
/* -------------------------------------------------------------------------- */

export function Eyebrow({
  children,
  tone = "purple",
}: {
  children: ReactNode;
  tone?: "purple" | "sky" | "risk" | undefined;
}) {
  const color =
    tone === "sky"
      ? "text-blue"
      : tone === "risk"
        ? "text-risk"
        : "text-purple";

  return (
    <p
      className={`font-mono text-[10px] font-medium uppercase tracking-[0.2em] ${color}`}
    >
      {children}
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/* Section Heading                                                            */
/* -------------------------------------------------------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  body,
  tone,
  center,
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  tone?: "purple" | "sky" | "risk";
  center?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}

      <h2 className="mt-2.5 text-[1.9rem] font-semibold leading-tight tracking-[-0.03em] text-foreground sm:text-[2.2rem] md:text-[2.45rem]">
        {title}
      </h2>

      {body && (
        <p className="mt-3.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {body}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Section                                                                    */
/* -------------------------------------------------------------------------- */

export function Section({
  children,
  className = "",
  id,
  label,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  label?: string;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={`py-20 md:py-28 ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Breadcrumb                                                                 */
/* -------------------------------------------------------------------------- */

export function Breadcrumb({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li
            key={item.path}
            className="flex items-center gap-1"
          >
            {index > 0 && (
              <ChevronRight
                aria-hidden="true"
                className="size-3.5"
              />
            )}

            {index === items.length - 1 ? (
              <span
                aria-current="page"
                className="text-foreground"
              >
                {item.name}
              </span>
            ) : (
              <Link
                to={item.path}
                className="transition-colors hover:text-purple"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/* Primary CTA                                                                */
/* -------------------------------------------------------------------------- */

export function PrimaryCTA({
  to = "/contact",
  children,
  cta,
}: {
  to?: string;
  children: ReactNode;
  cta: string;
}) {
  return (
    <Link
      to={to}
      onClick={() => track("cta_click", { cta })}
      className="
        inline-flex
        min-h-12
        items-center
        justify-center
        rounded-md
        bg-primary
        px-6
        text-sm
        font-semibold
        text-primary-foreground
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:bg-purple-deep
        hover:shadow-lg
        hover:shadow-purple/10
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-purple
        focus-visible:ring-offset-2
      "
    >
      {children}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Secondary CTA                                                              */
/* -------------------------------------------------------------------------- */

export function SecondaryCTA({
  to,
  children,
  cta,
}: {
  to: string;
  children: ReactNode;
  cta: string;
}) {
  return (
    <Link
      to={to}
      onClick={() => track("cta_click", { cta })}
      className="
        inline-flex
        min-h-12
        items-center
        justify-center
        rounded-md
        border
        border-input
        bg-background/80
        px-6
        text-sm
        font-semibold
        text-foreground
        backdrop-blur-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-purple
        hover:text-purple
        hover:shadow-sm
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-purple
        focus-visible:ring-offset-2
      "
    >
      {children}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Page Hero                                                                  */
/* -------------------------------------------------------------------------- */

export function PageHero({
  crumbs,
  eyebrow,
  title,
  body,
  children,
  aside,
}: {
  crumbs?: { name: string; path: string }[];
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="border-b bg-gradient-to-b from-surface to-background">
      <Container className="grid items-center gap-12 py-16 md:py-20 lg:grid-cols-[1.1fr_1fr]">
        <div>
          {crumbs && <Breadcrumb items={crumbs} />}

          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}

          <h1 className="mt-3 text-[2.2rem] font-semibold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-[2.75rem] md:text-[3.1rem]">
            {title}
          </h1>

          {body && (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {body}
            </p>
          )}

          {children && (
            <div className="mt-8 flex flex-wrap gap-3">
              {children}
            </div>
          )}
        </div>

        {aside && <div>{aside}</div>}
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Status                                                                     */
/* -------------------------------------------------------------------------- */

export type Status =
  | "Completed"
  | "Pending"
  | "Review Required"
  | "Blocked"
  | "Warning"
  | "Error"
  | "Active"
  | "Masked"
  | "Allowed"
  | "Escalated"
  | "In progress";

const statusTone: Record<Status, string> = {
  Completed: "bg-soft-ok text-ok border-ok/30",
  Allowed: "bg-soft-ok text-ok border-ok/30",
  Active: "bg-soft-blue text-blue border-sky/40",
  "In progress": "bg-soft-blue text-blue border-sky/40",
  Pending: "bg-surface text-muted-foreground border-border",
  Masked: "bg-soft-purple text-purple-deep border-purple/30",
  Escalated: "bg-soft-purple text-purple-deep border-purple/30",
  "Review Required":
    "bg-soft-risk text-foreground border-risk/50",
  Warning: "bg-soft-risk text-foreground border-risk/50",
  Blocked: "bg-soft-risk text-foreground border-risk",
  Error: "bg-soft-risk text-destructive border-destructive/40",
};

const statusGlyph: Record<Status, string> = {
  Completed: "✓",
  Allowed: "✓",
  Active: "●",
  "In progress": "◐",
  Pending: "○",
  Masked: "◉",
  Escalated: "↑",
  "Review Required": "!",
  Warning: "!",
  Blocked: "✕",
  Error: "✕",
};

export function StatusBadge({
  status,
}: {
  status: Status;
}) {
  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        whitespace-nowrap
        rounded-full
        border
        px-2.5
        py-1
        text-xs
        font-medium
        ${statusTone[status]}
      `}
    >
      <span aria-hidden="true">
        {statusGlyph[status]}
      </span>

      {status}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Risk Signal                                                                */
/* -------------------------------------------------------------------------- */

export type RiskLevel =
  | "Low"
  | "Medium"
  | "High"
  | "Critical";

export function RiskSignal({
  level,
}: {
  level: RiskLevel;
}) {
  const n = {
    Low: 1,
    Medium: 2,
    High: 3,
    Critical: 4,
  }[level];

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground">
      <span
        className="flex gap-0.5"
        aria-hidden="true"
      >
        {[1, 2, 3, 4].map((index) => (
          <span
            key={index}
            className={`
              h-3
              w-1
              rounded-sm
              transition-colors
              ${
                index <= n
                  ? n >= 3
                    ? "bg-risk"
                    : "bg-sky"
                  : "bg-border"
              }
            `}
          />
        ))}
      </span>

      {level}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Privacy Network                                                            */
/* -------------------------------------------------------------------------- */

function PrivacyNetwork() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute -right-32 -top-32 size-[420px] rounded-full bg-purple/10 blur-3xl" />

      <div className="absolute -bottom-40 right-20 size-[360px] rounded-full bg-sky/10 blur-3xl" />

      {/* Technical grid */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.035]
        "
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
        }}
      />

      {/* Network */}
      <svg
        viewBox="0 0 900 520"
        className="absolute right-0 top-0 h-full w-[62%]"
        preserveAspectRatio="none"
      >
        {/* Network paths */}
        <path
          d="M30 90 C180 90 190 180 330 180 C470 180 500 70 650 100 C760 120 790 190 900 190"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-purple/20"
        />

        <path
          d="M20 410 C150 410 190 300 320 310 C450 320 490 420 620 390 C740 360 790 280 900 300"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-sky/25"
        />

        <path
          d="M210 0 C240 100 340 110 390 200 C440 290 390 350 490 520"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-purple/15"
        />

        <path
          d="M590 0 C530 90 650 150 610 230 C570 310 700 350 730 520"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-sky/15"
        />

        {/* Animated data packets */}
        <circle
          r="3.5"
          className="fill-purple"
        >
          <animateMotion
            dur="7s"
            repeatCount="indefinite"
            path="M30 90 C180 90 190 180 330 180 C470 180 500 70 650 100 C760 120 790 190 900 190"
          />
        </circle>

        <circle
          r="3"
          className="fill-sky"
        >
          <animateMotion
            dur="8s"
            begin="1.5s"
            repeatCount="indefinite"
            path="M20 410 C150 410 190 300 320 310 C450 320 490 420 620 390 C740 360 790 280 900 300"
          />
        </circle>

        <circle
          r="2.5"
          className="fill-purple"
        >
          <animateMotion
            dur="9s"
            begin="3s"
            repeatCount="indefinite"
            path="M210 0 C240 100 340 110 390 200 C440 290 390 350 490 520"
          />
        </circle>

        {/* Network nodes */}
        <circle
          cx="330"
          cy="180"
          r="4"
          className="fill-background stroke-purple/50"
          strokeWidth="1"
        />

        <circle
          cx="650"
          cy="100"
          r="4"
          className="fill-background stroke-sky/50"
          strokeWidth="1"
        />

        <circle
          cx="620"
          cy="390"
          r="4"
          className="fill-background stroke-sky/50"
          strokeWidth="1"
        />
      </svg>

      {/* Privacy control core */}
      <div className="absolute right-[18%] top-1/2 -translate-y-1/2">
        <div className="relative flex size-44 items-center justify-center">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border border-purple/10" />

          {/* Animated ring */}
          <div className="absolute inset-3 rounded-full border border-sky/20 animate-pulse" />

          {/* Radar ring */}
          <div
            className="
              absolute
              inset-7
              rounded-full
              border
              border-purple/20
              [animation:spin_18s_linear_infinite]
            "
          >
            <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-purple shadow-[0_0_12px_currentColor] text-purple" />
          </div>

          {/* Core */}
          <div
            className="
              relative
              flex
              size-20
              items-center
              justify-center
              rounded-full
              border
              border-purple/30
              bg-background/90
              shadow-xl
              shadow-purple/10
              backdrop-blur-md
            "
          >
            <div
              className="
                absolute
                inset-3
                rounded-full
                bg-soft-purple
                opacity-70
              "
            />

            <ShieldCheck
              className="relative z-10 size-7 text-purple"
              strokeWidth={1.7}
            />
          </div>

          {/* Pulse */}
          <span
            className="
              absolute
              inset-0
              rounded-full
              border
              border-purple/20
              animate-ping
              [animation-duration:4s]
            "
          />
        </div>
      </div>

      {/* Floating nodes */}
      <div
        className="
          absolute
          right-[42%]
          top-[25%]
          flex
          size-8
          items-center
          justify-center
          rounded-lg
          border
          border-border
          bg-background/80
          shadow-sm
          backdrop-blur
        "
      >
        <Database className="size-3.5 text-sky" />
      </div>

      <div
        className="
          absolute
          bottom-[23%]
          right-[34%]
          flex
          size-8
          items-center
          justify-center
          rounded-lg
          border
          border-border
          bg-background/80
          shadow-sm
          backdrop-blur
        "
      >
        <Radar className="size-3.5 text-purple" />
      </div>

      {/* Small signal points */}
      <span className="absolute right-[9%] top-[18%] size-1.5 rounded-full bg-sky shadow-[0_0_10px_currentColor] text-sky animate-pulse" />

      <span className="absolute bottom-[17%] right-[13%] size-1.5 rounded-full bg-purple shadow-[0_0_10px_currentColor] text-purple animate-pulse" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Final CTA                                                                  */
/* -------------------------------------------------------------------------- */

export function FinalCTA({
  title = "See your data the way PrivacySEK does.",
  body = "Request a walkthrough of your environment, regulatory priorities, and the modules that matter most to your business.",
  exploreFirst = false,
  exploreLabel = "Explore the platform",
}: {
  title?: string;
  body?: string;
  exploreFirst?: boolean;
  exploreLabel?: string;
}) {
  return (
    <section
      aria-label="Request access"
      className="relative overflow-hidden py-20 md:py-28"
    >
      <Container>
        <div
          className="
            relative
            min-h-[500px]
            overflow-hidden
            rounded-3xl
            border
            border-border
            bg-background
            shadow-sm
          "
        >
          {/* Animated visual layer */}
          <PrivacyNetwork />

          {/* Left side fade to keep content readable */}
          <div
            aria-hidden="true"
            className="
              absolute
              inset-y-0
              left-0
              z-[1]
              w-full
              bg-gradient-to-r
              from-background
              via-background/95
              to-transparent
              lg:w-[75%]
            "
          />

          {/* Content */}
          <div
            className="
              relative
              z-10
              flex
              min-h-[500px]
              items-center
              px-8
              py-16
              md:px-14
              lg:px-20
            "
          >
            <div className="max-w-2xl">
              {/* Eyebrow */}
              <div
                className="
                  mb-6
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-purple/20
                  bg-soft-purple
                  px-3.5
                  py-1.5
                "
              >
                <span className="relative flex size-2">
                  <span
                    className="
                      absolute
                      inline-flex
                      size-full
                      animate-ping
                      rounded-full
                      bg-purple
                      opacity-60
                    "
                  />

                  <span className="relative inline-flex size-2 rounded-full bg-purple" />
                </span>

                <span
                  className="
                    font-mono
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-purple
                  "
                >
                  Privacy Security & Privacy Intelligence
                </span>
              </div>

              {/* Heading */}
              <h2
                className="
                  max-w-xl
                  text-[1.9rem]
                  font-semibold
                  leading-tight
                  tracking-[-0.03em]
                  text-foreground
                  sm:text-[2.3rem]
                  md:text-[2.6rem]
                "
              >
                {title}
              </h2>

              {/* Description */}
              <p
                className="
                  mt-5
                  max-w-xl
                  text-sm
                  leading-relaxed
                  text-muted-foreground
                  sm:text-base
                "
              >
                {body}
              </p>

              {/* CTAs */}
              <div className="mt-9 flex flex-wrap gap-3">
                {exploreFirst && (
                  <SecondaryCTA
                    to="/platform"
                    cta="final_explore"
                  >
                    {exploreLabel}
                  </SecondaryCTA>
                )}

                <PrimaryCTA cta="final_request_access">
                  Request Demo
                </PrimaryCTA>

                {!exploreFirst && (
                  <SecondaryCTA
                    to="/platform"
                    cta="final_explore"
                  >
                    {exploreLabel}
                  </SecondaryCTA>
                )}
              </div>

              {/* Platform capabilities */}
              <div
                className="
                  mt-12
                  flex
                  flex-wrap
                  gap-x-7
                  gap-y-3
                  border-t
                  border-border/70
                  pt-6
                "
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex size-5 items-center justify-center rounded-full bg-soft-ok">
                    <Check className="size-3 text-ok" />
                  </span>
                  Data Discovery
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex size-5 items-center justify-center rounded-full bg-soft-blue">
                    <Check className="size-3 text-blue" />
                  </span>
                  Data Classification
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex size-5 items-center justify-center rounded-full bg-soft-purple">
                    <Check className="size-3 text-purple" />
                  </span>
                  Privacy Risk
                </div>
              </div>
            </div>
          </div>

          {/* Corner system label */}
          <div
            className="
              absolute
              bottom-6
              right-7
              z-20
              hidden
              rounded-lg
              border
              border-border/70
              bg-background/75
              px-3
              py-2
              backdrop-blur-md
              lg:block
            "
          >
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-ok shadow-[0_0_8px_currentColor] text-ok" />

              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Privacy layer active
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}