import { products } from "./products";
import { solutions } from "./solutions";
import { regulations } from "./regulations";

export const navGroups = [
  {
    label: "Platform",
    to: "/platform",
    intro: "One connected privacy operating platform.",
    items: products.map((p) => ({ label: p.name, to: `/platform/${p.slug}`, desc: p.short })),
  },
  {
    label: "Solutions",
    to: "/solutions",
    intro: "How teams use PrivacySEK.",
    items: solutions.map((s) => ({
      label: s.name,
      to: `/solutions/${s.slug}`,
      desc: s.intro.split(".")[0] + ".",
    })),
  },
  {
    label: "Regulations",
    to: "/regulations",
    intro: "Obligations mapped to operations.",
    items: [
      ...regulations
        .filter((r) => ["gdpr", "ccpa", "dpdp"].includes(r.slug))
        .sort(
          (left, right) =>
            ["gdpr", "ccpa", "dpdp"].indexOf(left.slug) -
            ["gdpr", "ccpa", "dpdp"].indexOf(right.slug),
        )
        .map((r) => ({ label: r.name, to: `/regulations/${r.slug}`, desc: r.full })),
      {
        label: "Compare Regulations",
        to: "/regulations#comparison",
        desc: "Compare major requirements across jurisdictions.",
      },
      {
        label: "Regulatory Intelligence",
        to: "/regulations#updates",
        desc: "Review verified regulatory developments and operational impact.",
      },
    ],
  },
  {
    label: "Resources",
    to: "/resources",
    intro: "Learn how PrivacySEK thinks.",
    items: [
      { label: "Blog", to: "/resources/blog", desc: "Perspectives on privacy operations." },
      { label: "Guides", to: "/resources/guides", desc: "Step-by-step practical playbooks." },
      { label: "Glossary", to: "/resources/glossary", desc: "Privacy and platform terms." },
      { label: "FAQs", to: "/resources/faqs", desc: "Common questions answered." },
    ],
  },
] as const;
