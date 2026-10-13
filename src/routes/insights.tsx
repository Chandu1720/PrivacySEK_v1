import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { seo } from "@/lib/seo";
import { Container } from "@/components/kit";
import { clearFunnel, getConsent, getFunnel, type FunnelSummary, type TrackEvent } from "@/lib/consent";

export const Route = createFileRoute("/insights")({
  head: () => seo({ title: "Conversion Funnel (Internal) | PrivacySEK", description: "Internal, anonymous summary of consented demo-request funnel events.", path: "/insights", noindex: true }),
  component: Insights,
});

const steps: { key: TrackEvent; label: string }[] = [
  { key: "cta_click", label: "CTA clicks" },
  { key: "demo_form_start", label: "Form started" },
  { key: "demo_form_submit", label: "Submit attempts" },
  { key: "demo_form_success", label: "Successful requests" },
  { key: "demo_form_error", label: "Send errors" },
];

function Insights() {
  const [data, setData] = useState<FunnelSummary | null>(null);
  const [consented, setConsented] = useState(false);
  useEffect(() => { setData(getFunnel()); setConsented(!!getConsent()?.analytics); }, []);
  if (!data) return <Container className="py-16"><p>Loading…</p></Container>;
  const starts = data.events.demo_form_start ?? 0;
  const success = data.events.demo_form_success ?? 0;
  const rate = starts ? Math.round((success / starts) * 100) : 0;
  const ctas = Object.entries(data.ctas).sort((a, b) => b[1] - a[1]);

  return (
    <Container className="py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-purple">Internal · not indexed</p>
      <h1 className="mt-2 text-3xl font-bold">Demo-request funnel</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Anonymous counts from visitors who allowed analytics. Only event names and button labels are stored — no names, emails, companies or message text. Counts here reflect this browser until an analytics service is connected.
      </p>
      {!consented && <p role="status" className="mt-4 rounded-lg border bg-soft-risk p-3 text-sm">Analytics consent is off in this browser, so no new events are being counted.</p>}
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((s) => (
          <li key={s.key} className="rounded-xl border p-4">
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="mt-1 text-3xl font-bold">{data.events[s.key] ?? 0}</p>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm">Form completion rate: <strong>{rate}%</strong>{data.since && <span className="text-muted-foreground"> · counting since {data.since}</span>}</p>
      <h2 className="mt-10 text-xl font-semibold">Clicks by call to action</h2>
      {ctas.length ? (
        <table className="mt-3 w-full max-w-lg text-sm">
          <thead><tr className="border-b text-left"><th scope="col" className="py-2">CTA</th><th scope="col" className="py-2 text-right">Clicks</th></tr></thead>
          <tbody>{ctas.map(([k, v]) => <tr key={k} className="border-b"><td className="py-2 font-mono">{k}</td><td className="py-2 text-right">{v}</td></tr>)}</tbody>
        </table>
      ) : <p className="mt-3 text-sm text-muted-foreground">No CTA clicks recorded yet.</p>}
      <button onClick={() => { clearFunnel(); setData(getFunnel()); }} className="mt-8 min-h-11 rounded-md border px-4 text-sm font-medium hover:bg-surface">Reset counts</button>
    </Container>
  );
}
