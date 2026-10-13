import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { getConsent, setConsent } from "@/lib/consent";

export function ConsentBanner() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(getConsent() === null);
    const reopen = () => setOpen(true);
    window.addEventListener("ps:open-consent", reopen);
    return () => window.removeEventListener("ps:open-consent", reopen);
  }, []);
  if (!open) return null;
  const choose = (v: boolean) => {
    setConsent(v);
    setOpen(false);
  };
  return (
    <div role="region" aria-label="Cookie preferences" className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-xl border bg-background p-5 shadow-lg md:inset-x-auto md:right-6">
      <p className="text-sm text-foreground">
        We use only essential storage by default. With your permission, we record anonymous, first-party conversion events (like form submissions) to improve this site. No third-party trackers.{" "}
        <Link to="/cookie-policy" className="font-medium text-purple underline underline-offset-2">Cookie Policy</Link>
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => choose(true)} className="min-h-11 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-purple-deep">Allow analytics</button>
        <button onClick={() => choose(false)} className="min-h-11 rounded-md border px-4 text-sm font-medium hover:bg-surface">Essential only</button>
      </div>
    </div>
  );
}

export function openConsentPreferences() {
  window.dispatchEvent(new Event("ps:open-consent"));
}
