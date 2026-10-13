export type Solution = {
  slug: string;
  name: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  challenges: string[];
  outcomes: { title: string; body: string }[];
  products: string[];
};

export const solutions: Solution[] = [
  {
    slug: "assessment-consulting",
    name: "Assessment & Consulting",
    title: "Privacy Assessment & Consulting | PrivacySEK",
    description: "Comprehensive privacy posture evaluation, readiness assessments, and expert compliance consulting for DPDPA, GDPR, and CCPA.",
    h1: "Expert privacy assessment and strategic consulting",
    intro: "Identify compliance gaps, evaluate operational risk, and establish a clear roadmap with expert-led assessments and tailored advisory across global privacy frameworks.",
    challenges: [
      "Unclear regulatory scope across cross-border operations",
      "Fragmented gap evaluations across disconnected teams",
      "Difficulty translating legal rules to technical controls",
      "Audit anxiety and unverified evidence trails",
    ],
    outcomes: [
      { title: "Maturity benchmarking", body: "Detailed scorecard across technical, legal, and operational safeguards." },
      { title: "Prioritized roadmap", body: "Clear remediation steps mapped directly to DPDPA, GDPR, and CCPA obligations." },
      { title: "Defensible evidence", body: "Audit-ready documentation and policy records for regulators and partners." },
      { title: "Exposure reduction", body: "Immediate visibility into high-risk data flows and transfer dependencies." },
    ],
    products: ["dpia", "ropa", "reports"],
  },
  {
    slug: "product-support",
    name: "Product and Support",
    title: "Platform Deployment & Product Support | PrivacySEK",
    description: "Dedicated onboarding, connector implementation, and continuous product support for your privacy operations.",
    h1: "Reliable platform deployment, enablement, and technical support",
    intro: "From initial data source integration to ongoing operations, ensure your privacy engineering infrastructure runs with guaranteed reliability and expert support.",
    challenges: [
      "Complex multi-cloud environments requiring customized connectors",
      "Keeping data discovery agents synchronized with active assets",
      "Internal change management and workflow onboarding friction",
      "Need for immediate assistance during critical compliance deadlines",
    ],
    outcomes: [
      { title: "White-glove onboarding", body: "Turnkey setup of data discovery agents, ROPA workflows, and consent modules." },
      { title: "Dedicated SLA support", body: "Direct access to privacy engineers with guaranteed response times." },
      { title: "Continuous updates", body: "Automatic connector updates, schema migrations, and security patches." },
      { title: "Operational enablement", body: "Hands-on training, best practice playbooks, and team certification." },
    ],
    products: ["data-discovery", "consent-management", "Data protection and Enforcement-incident-management"],
  },
  {
    slug: "virtual-ciso-virtual-dpo",
    name: "Virtual CISO / Virtual DPO",
    title: "Virtual CISO & Virtual DPO Advisory | PrivacySEK",
    description: "On-demand executive privacy and cybersecurity leadership: statutory DPO appointment, governance architecture, and regulatory liaison.",
    h1: "Executive privacy and security leadership on demand",
    intro: "Bridge executive leadership gaps with fractional CISOs and DPOs who oversee governance, guide incident responses, and serve as designated regulatory contacts.",
    challenges: [
      "Prohibitive expense and talent shortages for full-time executive hires",
      "Statutory obligations mandating a qualified DPO appointment",
      "Managing third-party vendor risks and high-stakes regulator correspondence",
      "Aligning cybersecurity defenses with evolving privacy legislations",
    ],
    outcomes: [
      { title: "Statutory DPO representation", body: "Officially registered Data Protection Officer backed by certified legal and privacy counsel." },
      { title: "Regulatory & board liaison", body: "Executive reporting, supervisory authority inquiries, and incident notification handling." },
      { title: "Governance architecture", body: "Structured oversight of ROPA, DPIAs, vendor DPAs, and technical security controls." },
      { title: "Fractional flexibility", body: "Executive-tier guidance scaled precisely to your operational requirements." },
    ],
    products: ["vendor-management", "Data protection and Enforcement-incident-management", "reports", "ropa"],
  },
];

export const solutionBySlug = (slug: string) => solutions.find((s) => s.slug === slug);
