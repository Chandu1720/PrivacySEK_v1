import { createFileRoute } from "@tanstack/react-router";
import { useId, useRef, useState } from "react";
import { Mail, CheckCircle2, Building, ShieldCheck, ArrowUpRight } from "lucide-react";
import { seo } from "@/lib/seo";
import { PageHero, Container } from "@/components/kit";
import { track } from "@/lib/consent";
import { contactSchema, TARGET_SALES_EMAIL, type ContactPayload } from "./api.contact";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      title: "Request Demo & Contact | PrivacySEK",
      description:
        "Request a demo of PrivacySEK or contact our sales and enterprise privacy team at sales@privacsek.com to discuss data protection for your organization.",
      path: "/contact",
    }),
  component: Contact,
});

type Values = ContactPayload;
type Errors = Partial<Record<keyof Values, string>>;

async function submitAccessRequest(values: Values) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    if (errorData?.errors) {
      return { success: false, errors: errorData.errors as Errors };
    }
    throw new Error("Request failed");
  }

  const json = await res.json();
  return { success: true, recipient: json.recipient || TARGET_SALES_EMAIL, data: values };
}

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  hint?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      {hint && !error && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-sm text-destructive">
          <span aria-hidden="true">✕ </span>
          {error}
        </p>
      )}
    </div>
  );
}

function Contact() {
  const uid = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submittedData, setSubmittedData] = useState<Values | null>(null);
  const started = useRef(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  const input =
    "block w-full min-h-11 rounded-md border border-input bg-background px-3 text-sm aria-[invalid=true]:border-destructive focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-colors";
  const ids = (k: keyof Values) => ({
    id: `${uid}-${k}`,
    name: k,
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `${uid}-${k}-err` : undefined,
  });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = contactSchema.safeParse(data);
    track("demo_form_submit");

    if (!parsed.success) {
      const errs: Errors = {};
      parsed.error.issues.forEach((i) => {
        errs[i.path[0] as keyof Values] ??= i.message;
      });
      setErrors(errs);
      setTimeout(() => summaryRef.current?.focus(), 0);
      return;
    }

    setErrors({});
    setState("loading");

    try {
      const r = await submitAccessRequest(parsed.data);
      if (!r.success && r.errors) {
        setErrors(r.errors);
        setState("idle");
        return;
      }
      setSubmittedData(parsed.data);
      setState("success");
      track("demo_form_success");
    } catch {
      setState("error");
      track("demo_form_error");
    }
  }

  const mailtoLink = submittedData
    ? `mailto:${TARGET_SALES_EMAIL}?subject=${encodeURIComponent(
        `Demo Request from ${submittedData.company} - ${submittedData.name}`,
      )}&body=${encodeURIComponent(
        `Hello PrivacySEK Sales Team,\n\nI recently requested a demo with the following details:\n\nName: ${submittedData.name}\nWork Email: ${submittedData.email}\nCompany: ${submittedData.company}\nJob Title: ${submittedData.title}\nCompany Size: ${submittedData.size}\nPrimary Interest: ${submittedData.interest}\n\nMessage:\n${submittedData.message || "Looking forward to learning more about PrivacySEK."}\n\nBest regards,\n${submittedData.name}`,
      )}`
    : `mailto:${TARGET_SALES_EMAIL}`;

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
        eyebrow="Request Demo & Contact"
        title="Talk to PrivacySEK about your privacy operation"
        body="Tell us about your environment and priorities. We'll arrange an executive walkthrough focused on the capabilities that matter to your organization first."
      />
      <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_360px]">
        {state === "success" && submittedData ? (
          <div role="status" className="rounded-2xl border border-ok/40 bg-soft-ok/60 p-8 shadow-sm">
            <div className="flex items-center gap-3 text-ok">
              <CheckCircle2 className="size-8" />
              <h2 className="text-xl font-semibold sm:text-2xl text-foreground">
                Thank you — your request has been routed to sales!
              </h2>
            </div>
            <p className="mt-3 text-base text-foreground">
              Your details have been submitted and sent to our enterprise team at{" "}
              <a
                href={`mailto:${TARGET_SALES_EMAIL}`}
                className="font-mono font-semibold text-purple underline underline-offset-4"
              >
                {TARGET_SALES_EMAIL}
              </a>
              . We will follow up at your work email (
              <span className="font-semibold text-foreground">{submittedData.email}</span>) within 1
              business day.
            </p>

            {/* Submission summary badge */}
            <div className="mt-6 rounded-xl border bg-background/80 p-5 text-sm">
              <div className="flex items-center justify-between border-b pb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                <span>Dispatched Request Details</span>
                <span className="flex items-center gap-1 text-purple">
                  <ShieldCheck size={14} /> Delivered to {TARGET_SALES_EMAIL}
                </span>
              </div>
              <dl className="mt-3 grid gap-2 sm:grid-cols-2 text-foreground">
                <div>
                  <dt className="text-xs text-muted-foreground">Name</dt>
                  <dd className="font-medium">{submittedData.name}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Work Email</dt>
                  <dd className="font-medium">{submittedData.email}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Company</dt>
                  <dd className="font-medium">{submittedData.company}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Job Title</dt>
                  <dd className="font-medium">{submittedData.title}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Company Size</dt>
                  <dd className="font-medium">{submittedData.size} employees</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Primary Focus</dt>
                  <dd className="font-medium text-purple">{submittedData.interest}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={mailtoLink}
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-purple-deep"
              >
                <Mail size={16} /> Open in Email Client
                <ArrowUpRight size={14} />
              </a>
              <button
                onClick={() => {
                  setState("idle");
                  setSubmittedData(null);
                }}
                className="min-h-11 rounded-md border bg-background px-4 text-sm font-medium hover:bg-surface"
              >
                Submit another request
              </button>
            </div>
          </div>
        ) : (
          <form
            noValidate
            onSubmit={onSubmit}
            onFocus={() => {
              if (!started.current) {
                started.current = true;
                track("demo_form_start");
              }
            }}
            className="space-y-5"
            aria-busy={state === "loading"}
          >
            {Object.keys(errors).length > 0 && (
              <div
                ref={summaryRef}
                tabIndex={-1}
                role="alert"
                className="rounded-lg border border-destructive/40 bg-soft-risk p-4 text-sm"
              >
                <p className="font-semibold text-destructive">
                  Please fix {Object.keys(errors).length} field(s):
                </p>
                <ul className="mt-2 list-disc pl-5">
                  {Object.entries(errors).map(([k, v]) => (
                    <li key={k}>
                      <a href={`#${uid}-${k}`} className="underline hover:text-destructive">
                        {v}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {state === "error" && (
              <div
                role="alert"
                className="rounded-lg border border-destructive/40 bg-soft-risk p-4 text-sm text-destructive"
              >
                We couldn't deliver your request directly. Please try again or email us directly at{" "}
                <a href={`mailto:${TARGET_SALES_EMAIL}`} className="underline font-semibold">
                  {TARGET_SALES_EMAIL}
                </a>
                .
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id={`${uid}-name`} label="Full name" error={errors.name}>
                <input
                  {...ids("name")}
                  autoComplete="name"
                  placeholder="e.g. Jane Doe"
                  className={input}
                />
              </Field>

              <Field
                id={`${uid}-email`}
                label="Work email"
                error={errors.email}
                hint="Must be a corporate work email (@gmail.com is not accepted)"
              >
                <input
                  {...ids("email")}
                  type="email"
                  autoComplete="email"
                  placeholder="name@company.com"
                  className={input}
                />
              </Field>

              <Field id={`${uid}-company`} label="Company name" error={errors.company}>
                <input
                  {...ids("company")}
                  autoComplete="organization"
                  placeholder="Acme Corp"
                  className={input}
                />
              </Field>

              <Field id={`${uid}-title`} label="Job title" error={errors.title}>
                <input
                  {...ids("title")}
                  autoComplete="organization-title"
                  placeholder="DPO, CISO, Legal Counsel..."
                  className={input}
                />
              </Field>

              <Field id={`${uid}-size`} label="Company size" error={errors.size}>
                <select {...ids("size")} defaultValue="" className={input}>
                  <option value="" disabled>
                    Select employee range…
                  </option>
                  {["1–200", "201–1,000", "1,001–5,000", "5,001–20,000", "20,000+"].map((o) => (
                    <option key={o} value={o}>
                      {o} employees
                    </option>
                  ))}
                </select>
              </Field>

              <Field id={`${uid}-interest`} label="Primary interest" error={errors.interest}>
                <select {...ids("interest")} defaultValue="" className={input}>
                  <option value="" disabled>
                    Select capability…
                  </option>
                  {[
                    "Data Discovery",
                    "Cookie Consent",
                    "Consent Management / Preference",
                    "ROPA & DPIA",
                    "DSAR",
                    "Vendor Management",
                    "Data Retention",
                    "Data protection and Enforcement & Incident Management",
                    "Full Platform Overview",
                  ].map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field
              id={`${uid}-message`}
              label="Environment & Priorities (optional)"
              error={errors.message}
            >
              <textarea
                {...ids("message")}
                rows={5}
                placeholder="Share any specific jurisdictions (e.g., DPDPA, GDPR, CCPA), key systems, or upcoming compliance deadlines..."
                className={`${input} py-2`}
              />
            </Field>

            <div className="flex items-center justify-between rounded-lg border bg-surface p-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Mail size={14} className="text-purple" />
                Responses are routed directly to:{" "}
                <span className="font-mono font-semibold text-foreground">
                  {TARGET_SALES_EMAIL}
                </span>
              </span>
              <span>Corporate accounts only</span>
            </div>

            <button
              type="submit"
              disabled={state === "loading"}
              className="min-h-12 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-purple-deep disabled:opacity-60 transition-colors"
            >
              {state === "loading" ? "Routing request…" : "Request Demo"}
            </button>
          </form>
        )}

        <aside className="space-y-6 rounded-2xl border bg-surface p-6 text-sm">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Building size={18} className="text-purple" /> Direct Sales Contact
            </h2>
            <p className="mt-2 text-muted-foreground">
              Have an urgent inquiry, RFP, or enterprise question? Reach out to our team directly:
            </p>
            <a
              href={`mailto:${TARGET_SALES_EMAIL}`}
              className="mt-3 inline-flex items-center gap-2 font-mono text-sm font-medium text-purple hover:underline"
            >
              <Mail size={15} /> {TARGET_SALES_EMAIL}
            </a>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-foreground">What happens next</h3>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted-foreground">
              <li>Our sales team reviews your environment and regulations.</li>
              <li>A customized walkthrough focused on your prioritized modules.</li>
              <li>Discussion of connector architecture, security, and deployment timeline.</li>
            </ol>
          </div>
        </aside>
      </Container>
    </>
  );
}
