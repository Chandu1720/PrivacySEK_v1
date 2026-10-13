export type Regulation = {
  slug: string;
  name: string;
  full: string;
  region?: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  cardDescription?: string;
  keyAreas?: string[];
  capabilities?: string[];
  detailSections?: { title: string; body: string }[];
  themes: { title: string; body: string; products: string[] }[];
};

export const regulations: Regulation[] = [
  {
    slug: "gdpr",
    name: "GDPR",
    full: "General Data Protection Regulation",
    region: "European Union",
    title: "GDPR Compliance & Privacy Requirements | PrivacySEK",
    description:
      "Explore GDPR privacy requirements and how PrivacySEK maps them to privacy operations, processes and evidence.",
    h1: "General Data Protection Regulation (GDPR)",
    intro:
      "Understand the GDPR requirements that may affect your organization, map them to privacy operations, and maintain evidence across the privacy lifecycle.",
    cardDescription:
      "The General Data Protection Regulation establishes requirements for protecting personal data and gives individuals significant rights over how their data is collected and processed.",
    keyAreas: [
      "Data protection principles",
      "Lawful processing",
      "Consent",
      "Data subject rights",
      "Records of Processing Activities",
      "Data Protection Impact Assessments",
      "Processor management",
      "Data breach obligations",
      "International data transfers",
      "Accountability and evidence",
    ],
    capabilities: [
      "Data Discovery",
      "Consent Management",
      "ROPA",
      "DPIA / PIA",
      "DSAR / DSR",
      "Regulatory Intelligence",
      "Reports & Analytics",
      "Data protection and Enforcement",
    ],
    detailSections: [
      {
        title: "Applicability",
        body: "Applicability depends on the organization, the people whose data is processed, and the processing activity. Assess the specific facts and circumstances with qualified counsel.",
      },
      {
        title: "Key definitions",
        body: "The GDPR uses defined terms including personal data, processing, controller, processor and data subject. Classification and roles depend on the facts of each processing activity.",
      },
      {
        title: "Core principles and requirements",
        body: "The framework addresses data protection principles, lawful processing, transparency, accountability and safeguards. Map each relevant requirement to an owner and operational evidence.",
      },
      {
        title: "Individual rights and DSAR / DSR",
        body: "Individuals have rights in relation to their personal data. The request type, verification, exceptions and response obligations should be assessed in context.",
      },
      {
        title: "Consent",
        body: "Consent is one potential basis for processing where applicable. Organizations should record the choice, its context and subsequent changes where consent is relied upon.",
      },
      {
        title: "Data processing and data discovery",
        body: "Connect processing records to the data, purposes, systems, recipients and retention practices involved. Data discovery can help keep those records grounded in the environment.",
      },
      {
        title: "ROPA / processing records",
        body: "Maintain processing activity records and connect them to purposes, data categories, recipients, retention, ownership and supporting evidence.",
      },
      {
        title: "DPIA / risk assessment",
        body: "Some processing may call for a structured privacy impact assessment. Screening and assessment decisions should be documented against the activity and its context.",
      },
      {
        title: "Vendors and processors",
        body: "Track processor roles, relevant agreements, subprocessors and processing context as part of vendor oversight.",
      },
      {
        title: "Data breaches",
        body: "Maintain a process to assess incidents involving personal data, capture decisions and coordinate any applicable response obligations.",
      },
      {
        title: "Cross-border processing",
        body: "Assess transfer destinations, processing context and relevant safeguards with qualified counsel.",
      },
      {
        title: "Children's data",
        body: "Processing involving children can raise additional requirements. Assess audience, context and applicable safeguards with qualified counsel.",
      },
      {
        title: "Penalties, enforcement and evidence",
        body: "Maintain reviewable records of decisions, assessments, requests and controls. Applicable enforcement outcomes depend on the facts and competent authorities.",
      },
    ],
    themes: [
      {
        title: "Records of processing",
        body: "Maintain processing records with purposes, categories, recipients, transfers and retention.",
        products: ["ropa", "data-discovery"],
      },
      {
        title: "Impact assessments",
        body: "Screen and conduct DPIAs where processing is likely to result in high risk.",
        products: ["dpia"],
      },
      {
        title: "Data subject rights",
        body: "Manage access, rectification, erasure, restriction, portability and objection requests.",
        products: ["dsar"],
      },
      {
        title: "Processors and transfers",
        body: "Track processor agreements, subprocessors and transfer mechanisms.",
        products: ["vendor-management"],
      },
      {
        title: "Storage limitation",
        body: "Apply retention schedules and deletion rules.",
        products: ["data-retention"],
      },
      {
        title: "Breach handling",
        body: "Assess and document personal data breaches and notification decisions.",
        products: ["Data protection and Enforcement-incident-management"],
      },
    ],
  },
  {
    slug: "dpdp",
    name: "DPDP Act",
    full: "India Digital Personal Data Protection Act, 2023",
    region: "India",
    title: "DPDP Act Compliance & Privacy Requirements | PrivacySEK",
    description:
      "Explore India's DPDP Act privacy requirements and how PrivacySEK maps them to privacy operations, processes and evidence.",
    h1: "Digital Personal Data Protection Act (DPDP)",
    intro:
      "Understand the DPDP requirements that may affect your organization, map them to privacy operations, and maintain evidence across the privacy lifecycle.",
    cardDescription:
      "India's Digital Personal Data Protection framework establishes requirements for processing digital personal data and defines responsibilities for organizations and rights for Data Principals.",
    keyAreas: [
      "Notice",
      "Consent",
      "Certain legitimate uses",
      "Data Principal rights",
      "Data Processor responsibilities",
      "Children's data",
      "Data security",
      "Personal data breach obligations",
      "Erasure",
      "Grievance handling",
      "Significant Data Fiduciary requirements",
      "Cross-border considerations",
      "Accountability and evidence",
    ],
    capabilities: [
      "Data Discovery",
      "Consent Management",
      "DSAR / DSR",
      "ROPA",
      "DPIA / PIA",
      "Regulatory Intelligence",
      "Reports & Analytics",
      "Data protection and Enforcement",
    ],
    detailSections: [
      {
        title: "Applicability",
        body: "Applicability depends on the organization, digital personal data, people served and processing context. Confirm current requirements and implementation details with qualified counsel.",
      },
      {
        title: "Key definitions",
        body: "The framework includes defined roles and concepts such as Data Fiduciary, Data Processor and Data Principal. Determine roles from the actual processing relationship.",
      },
      {
        title: "Core requirements",
        body: "Requirements address notice, consent, certain legitimate uses, security, accountability and individual rights. Map applicable obligations to the processes that support them.",
      },
      {
        title: "Data Principal rights and DSAR / DSR",
        body: "Provide workflows to receive, verify, route and document requests and grievance handling, with outcomes assessed under the applicable requirements.",
      },
      {
        title: "Consent and notice",
        body: "Where consent is used, connect the notice and purpose to the captured choice and its status. Keep records that support review of the consent lifecycle.",
      },
      {
        title: "Data processing and discovery",
        body: "Inventory digital personal data and connect it to processing activities, purposes, systems, owners and vendors.",
      },
      {
        title: "ROPA / processing records",
        body: "Maintain structured records that connect processing purposes, data categories, systems, owners, vendors and evidence.",
      },
      {
        title: "DPIA / privacy risk assessment",
        body: "Use structured review to understand processing risks and document the reasoning, mitigations and accountable owners where relevant.",
      },
      {
        title: "Processors and security",
        body: "Maintain processor context, oversight records and security-related operational evidence in line with the organization's responsibilities.",
      },
      {
        title: "Personal data breaches",
        body: "Record incident facts, assessment, decisions and response actions. Confirm any applicable notification requirements with counsel.",
      },
      {
        title: "Children's data",
        body: "Processing involving children may require additional review. Assess the circumstances and current rules with qualified counsel.",
      },
      {
        title: "Cross-border considerations",
        body: "Review cross-border processing against current requirements and the specific facts with qualified counsel.",
      },
      {
        title: "Erasure, grievance handling, penalties and enforcement",
        body: "Connect retention and erasure practices with rights and grievance workflows. Current enforcement details and implementation timelines must be verified against official sources.",
      },
    ],
    themes: [
      {
        title: "Notice and consent",
        body: "Configure consent capture and retain consent evidence.",
        products: ["cookie-consent"],
      },
      {
        title: "Data principal rights",
        body: "Handle access, correction, erasure and grievance requests.",
        products: ["dsar"],
      },
      {
        title: "Know your data",
        body: "Inventory digital personal data and its processing.",
        products: ["data-discovery", "ropa"],
      },
      {
        title: "Data processors",
        body: "Maintain processor records and contracts.",
        products: ["vendor-management"],
      },
      {
        title: "Retention and erasure",
        body: "Erase data when the purpose is no longer served, subject to legal retention.",
        products: ["data-retention"],
      },
      {
        title: "Breach intimation",
        body: "Document breaches and intimation decisions.",
        products: ["Data protection and Enforcement-incident-management"],
      },
    ],
  },
  {
    slug: "ccpa",
    name: "CCPA / CPRA",
    full: "California Consumer Privacy Act as amended by the CPRA",
    region: "California, USA",
    title: "CCPA / CPRA Compliance & Privacy Requirements | PrivacySEK",
    description:
      "Explore CCPA / CPRA privacy requirements and how PrivacySEK maps them to privacy operations, processes and evidence.",
    h1: "California Consumer Privacy Act (CCPA / CPRA)",
    intro:
      "Understand the CCPA / CPRA requirements that may affect your organization, map them to privacy operations, and maintain evidence across the privacy lifecycle.",
    cardDescription:
      "California privacy requirements give consumers rights over their personal information and establish obligations for businesses handling covered personal information.",
    keyAreas: [
      "Consumer rights",
      "Notice and transparency",
      "Right to know",
      "Right to delete",
      "Right to correct",
      "Opt-out requirements",
      "Sensitive personal information",
      "Service provider / contractor relationships",
      "Data processing controls",
      "Evidence and accountability",
    ],
    capabilities: [
      "Data Discovery",
      "Consent / Preference Management",
      "DSAR / DSR",
      "ROPA",
      "Vendor / Processor context",
      "Regulatory Intelligence",
      "Reports & Analytics",
      "Data protection and Enforcement",
    ],
    detailSections: [
      {
        title: "Applicability",
        body: "Applicability depends on whether an organization and its handling of personal information fall within the law's scope. Assess business characteristics, data and activities with qualified counsel.",
      },
      {
        title: "Key definitions",
        body: "The framework defines concepts including personal information, consumer, business, service provider and contractor. Roles depend on the relationship and actual processing.",
      },
      {
        title: "Core requirements and transparency",
        body: "Covered businesses have obligations relating to notices, handling of personal information and consumer choices. Keep disclosures connected to actual data practices.",
      },
      {
        title: "Consumer rights and DSAR / DSR",
        body: "Rights workflows may include requests to know, delete or correct, along with applicable opt-out choices. Verification, exceptions and response handling depend on the request and circumstances.",
      },
      {
        title: "Consent and preferences",
        body: "Some choices are preference or opt-out mechanisms rather than consent. Capture the signal, scope, status and operational actions taken.",
      },
      {
        title: "Data discovery and processing",
        body: "Connect personal information categories, purposes, sources, disclosures, retention and systems to an inventory and processing context.",
      },
      {
        title: "ROPA / processing records",
        body: "Maintain records that connect processing purposes, personal information categories, disclosures, retention and accountable owners.",
      },
      {
        title: "DPIA / risk assessment",
        body: "Assessments may be relevant for certain processing contexts. Record the applicable rationale, risks and mitigations after reviewing current requirements.",
      },
      {
        title: "Service providers, contractors and vendors",
        body: "Track role-specific relationships, contracts, data shared and processing purposes to support oversight.",
      },
      {
        title: "Security incidents",
        body: "Maintain incident records, affected data context, decisions and response actions. Confirm applicable notification duties with counsel.",
      },
      {
        title: "Sensitive personal information",
        body: "Identify sensitive personal information categories and assess the related use, purpose and applicable choices in context.",
      },
      {
        title: "Children's data and cross-border processing",
        body: "Processing involving children and cross-border activities can require additional consideration. Review applicable requirements based on the use and circumstances.",
      },
      {
        title: "Penalties, enforcement and evidence",
        body: "Keep records that explain notices, requests, preferences, risk decisions and controls. Verify current enforcement guidance and requirements from official sources.",
      },
    ],
    themes: [
      {
        title: "Consumer requests",
        body: "Know, delete, correct and limit requests with verification.",
        products: ["dsar"],
      },
      {
        title: "Opt-out of sale/sharing",
        body: "Configure opt-out choices and honor preference signals where configured.",
        products: ["cookie-consent"],
      },
      {
        title: "Sensitive personal information",
        body: "Identify sensitive categories in your data estate.",
        products: ["data-discovery"],
      },
      {
        title: "Service providers",
        body: "Track contracts with service providers and contractors.",
        products: ["vendor-management"],
      },
      {
        title: "Risk assessments",
        body: "Document assessments for higher-risk processing.",
        products: ["dpia"],
      },
      {
        title: "Retention disclosure",
        body: "Maintain retention periods by category.",
        products: ["data-retention"],
      },
    ],
  },
  {
    slug: "global",
    name: "Global Privacy Laws",
    full: "Multi-jurisdiction privacy programs",
    title: "Global Privacy Law Compliance Platform | PrivacySEK",
    description:
      "Manage privacy obligations across jurisdictions with contextual applicability based on data subject, organization, processing, data type and destination.",
    h1: "One privacy operation across many jurisdictions",
    intro:
      "Most enterprises answer to several privacy laws at once. PrivacySEK evaluates applicability from context — not from an IP address — and routes the resulting obligations to the right module.",
    themes: [
      {
        title: "Contextual applicability",
        body: "Evaluate subject location, entity, processing, data type and destination.",
        products: ["Data protection and Enforcement-incident-management", "ropa"],
      },
      {
        title: "Harmonized records",
        body: "One record structure serving multiple laws.",
        products: ["ropa"],
      },
      {
        title: "Rights across regions",
        body: "Request types and deadlines per jurisdiction.",
        products: ["dsar"],
      },
      {
        title: "Cross-border transfers",
        body: "Destinations and mechanisms per vendor and activity.",
        products: ["vendor-management"],
      },
      {
        title: "Regional consent",
        body: "Consent models per region.",
        products: ["cookie-consent", "consent-management"],
      },
      {
        title: "Notification analysis",
        body: "Obligations assessed per affected jurisdiction.",
        products: ["Data protection and Enforcement-incident-management"],
      },
    ],
  },
];

export const regulationBySlug = (slug: string) => regulations.find((r) => r.slug === slug);
