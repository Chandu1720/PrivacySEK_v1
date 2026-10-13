import { Link } from "@tanstack/react-router";
import { products } from "@/data/products";
import { solutions } from "@/data/solutions";
import { regulations } from "@/data/regulations";
import { Logo } from "./Logo";
import { openConsentPreferences } from "./ConsentBanner";

const cols = [
  { h: "Platform", links: [{ l: "Overview", to: "/platform" }, ...products.slice(0, 6).map((p) => ({ l: p.name, to: `/platform/${p.slug}` }))] },
  { h: "Solutions", links: solutions.map((s) => ({ l: s.name, to: `/solutions/${s.slug}` })) },
  { h: "Regulations", links: regulations.map((r) => ({ l: r.name, to: `/regulations/${r.slug}` })) },
  { h: "Resources", links: [{ l: "Blog", to: "/resources/blog" }, { l: "Guides", to: "/resources/guides" }, { l: "Glossary", to: "/resources/glossary" }, { l: "FAQs", to: "/resources/faqs" }] },
  { h: "Company", links: [{ l: "About Us", to: "/about" }, { l: "Contact", to: "/contact" }] },
  { h: "Legal", links: [{ l: "Privacy Policy", to: "/privacy-policy" }, { l: "Cookie Policy", to: "/cookie-policy" }, { l: "Terms", to: "/terms" }, { l: "Accessibility", to: "/accessibility" }] },
];

export function Footer() {
  return (
    <footer className="border-t bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(6,1fr)]">
          <div className="max-w-xs">
            <Logo showTagline />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              PrivacySEK is a privacy management and data protection platform that helps enterprises discover personal data, understand how it moves, assess risk and enforce data protection policy.
            </p>
          </div>
          {cols.map((c) => (
            <nav key={c.h} aria-label={c.h}>
              <h2 className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">{c.h}</h2>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-foreground hover:text-purple">{l.l}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} PrivacySEK. PrivacySEK provides operational tooling, not legal advice.</p>
          <button onClick={openConsentPreferences} className="self-start text-left underline underline-offset-2 hover:text-foreground">Cookie preferences</button>
        </div>
      </div>
    </footer>
  );
}
