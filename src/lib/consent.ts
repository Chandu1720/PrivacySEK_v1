// Consent-aware, first-party conversion tracking.
// Events are only recorded when the visitor has opted in to "analytics".
// No third-party scripts are loaded. Events are pushed to window.dataLayer so a
// consent-respecting analytics tool can be connected later, and aggregated into
// anonymous counters (event name + CTA label only) for the internal funnel view.

export type ConsentState = { analytics: boolean; decidedAt: string };
const KEY = "ps-consent-v1";
const FUNNEL_KEY = "ps-funnel-v1";
const listeners = new Set<(c: ConsentState | null) => void>();

export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    return null;
  }
}

export function setConsent(analytics: boolean) {
  const c: ConsentState = { analytics, decidedAt: new Date().toISOString() };
  window.localStorage.setItem(KEY, JSON.stringify(c));
  if (!analytics) clearFunnel();
  listeners.forEach((l) => l(c));
}

export function onConsentChange(fn: (c: ConsentState | null) => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export type TrackEvent =
  | "cta_click"
  | "demo_form_start"
  | "demo_form_submit"
  | "demo_form_success"
  | "demo_form_error";

export type FunnelSummary = {
  events: Partial<Record<TrackEvent, number>>;
  ctas: Record<string, number>;
  since: string | null;
};

declare global {
  interface Window { dataLayer?: Record<string, unknown>[] }
}

const empty = (): FunnelSummary => ({ events: {}, ctas: {}, since: null });

export function getFunnel(): FunnelSummary {
  if (typeof window === "undefined") return empty();
  try {
    const raw = window.localStorage.getItem(FUNNEL_KEY);
    return raw ? (JSON.parse(raw) as FunnelSummary) : empty();
  } catch {
    return empty();
  }
}

export function clearFunnel() {
  if (typeof window !== "undefined") window.localStorage.removeItem(FUNNEL_KEY);
}

/** Records an event only with analytics consent. Only the event name and a CTA label are kept — never personal data. */
export function track(event: TrackEvent, props: { cta?: string } = {}) {
  if (typeof window === "undefined") return;
  if (!getConsent()?.analytics) return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...props, path: window.location.pathname });
  const f = getFunnel();
  f.since ??= new Date().toISOString().slice(0, 10);
  f.events[event] = (f.events[event] ?? 0) + 1;
  if (props.cta) f.ctas[props.cta] = (f.ctas[props.cta] ?? 0) + 1;
  window.localStorage.setItem(FUNNEL_KEY, JSON.stringify(f));
}
