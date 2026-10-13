import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { navGroups } from "@/data/nav";
import { Logo } from "./Logo";
import { track } from "@/lib/consent";

export function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur" ref={navRef}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navGroups.map((g) => {
              const isOpen = openMenu === g.label;
              const id = `mega-${g.label.toLowerCase()}`;
              return (
                <li key={g.label} className="relative">
                  <button
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => setOpenMenu(isOpen ? null : g.label)}
                    className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-surface ${pathname.startsWith(g.to) ? "text-purple" : "text-foreground"}`}
                  >
                    {g.label}
                    <ChevronDown aria-hidden="true" className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div id={id} className="reveal absolute left-1/2 top-full mt-2 w-[min(760px,90vw)] -translate-x-1/2 rounded-xl border bg-background p-6 shadow-xl">
                      <div className="mb-4 flex items-baseline justify-between border-b pb-3">
                        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{g.intro}</p>
                        <Link to={g.to} className="text-sm font-medium text-purple hover:underline">View all {g.label.toLowerCase()} →</Link>
                      </div>
                      <ul className="grid grid-cols-2 gap-1">
                        {g.items.map((it) => (
                          <li key={it.to}>
                            <Link to={it.to} className="block rounded-lg p-3 hover:bg-surface focus-visible:bg-surface">
                              <span className="block text-sm font-semibold text-foreground">{it.label}</span>
                              <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{it.desc}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
            <li>
              <Link to="/about" className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-surface" activeProps={{ className: "text-purple" }}>
                About Us
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            onClick={() => track("cta_click", { cta: "nav_request_access" })}
            className="hidden min-h-10 items-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-purple-deep sm:inline-flex"
          >
            Request Demo
          </Link>
          <button
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav id="mobile-menu" aria-label="Mobile" className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t bg-background px-5 pb-10 lg:hidden">
          {navGroups.map((g) => (
            <details key={g.label} className="border-b py-2">
              <summary className="flex min-h-11 cursor-pointer items-center justify-between text-base font-semibold">
                {g.label}
                <ChevronDown aria-hidden="true" className="size-4" />
              </summary>
              <ul className="pb-2">
                <li><Link to={g.to} className="block py-2 text-sm font-medium text-purple">Overview</Link></li>
                {g.items.map((it) => (
                  <li key={it.to}><Link to={it.to} className="block py-2 text-sm text-foreground">{it.label}</Link></li>
                ))}
              </ul>
            </details>
          ))}
          <Link to="/about" className="flex min-h-12 items-center border-b text-base font-semibold">About Us</Link>
          <Link to="/contact" className="mt-6 flex min-h-12 items-center justify-center rounded-md bg-primary font-semibold text-primary-foreground">Request Demo</Link>
        </nav>
      )}
    </header>
  );
}
