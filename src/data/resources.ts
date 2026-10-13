export type Post = { slug: string; title: string; description: string; category: string; readingTime: string; body: { h: string; p: string[] }[] };

export const posts: Post[] = [
  {
    slug: "metadata-first-data-discovery",
    title: "Why metadata-first data discovery matters for privacy",
    description: "Discovery should tell you where personal data lives without becoming another copy of it. Here is how a metadata-first approach works.",
    category: "Data Discovery",
    readingTime: "6 min read",
    body: [
      { h: "The discovery paradox", p: ["Privacy teams need to know where personal data lives. But a discovery tool that copies raw data into a central index creates the exact risk privacy programs try to reduce.", "A metadata-first approach starts from schemas, column names, object metadata and statistical profiles, and evaluates sample values in place only where policy allows."] },
      { h: "Confidence, not certainty", p: ["Classification is probabilistic. Every result should carry a confidence score and the signals behind it, so a reviewer can accept or correct it.", "Human review of low-confidence suggestions keeps the inventory trustworthy."] },
      { h: "From assets to processing", p: ["An inventory is only useful when it is connected to purpose. Linking data assets to processing activities turns a technical catalogue into privacy intelligence."] },
    ],
  },
  {
    slug: "from-ropa-spreadsheet-to-live-record",
    title: "From ROPA spreadsheet to a live processing record",
    description: "Records of processing drift the moment they are written. Connecting them to systems, data and vendors keeps them honest.",
    category: "ROPA",
    readingTime: "5 min read",
    body: [
      { h: "Why spreadsheets drift", p: ["A spreadsheet ROPA is a snapshot. Systems change, vendors add subprocessors and new data fields appear, but the row stays the same until the next annual review."] },
      { h: "Records as relationships", p: ["Treat each processing activity as a node linked to data assets, systems, vendors, locations and owners. When one of those changes, the record can flag itself for review."] },
      { h: "Attestation that means something", p: ["Owners attest to records that already reflect discovered reality, so attestation becomes confirmation rather than guesswork."] },
    ],
  },
  {
    slug: "graduated-enforcement-decisions",
    title: "Beyond allow and block: graduated data protection decisions",
    description: "Binary enforcement creates friction or gaps. Graduated decisions let policy respond proportionately to context and risk.",
    category: "Data protection and Enforcement",
    readingTime: "7 min read",
    body: [
      { h: "The binary problem", p: ["When the only options are allow or block, teams either accept too much risk or block legitimate work."] },
      { h: "A spectrum of decisions", p: ["Warn, require justification, mask, restrict, quarantine and escalate let a policy respond in proportion to sensitivity, purpose, destination and jurisdiction."] },
      { h: "Humans in the loop", p: ["Escalation routes ambiguous cases to reviewers with the full context. Every decision — automated or human — is recorded as evidence."] },
    ],
  },
];

export const guides = [
  { id: "building-a-ropa", title: "Building your first connected ROPA", summary: "A step-by-step approach to modeling processing activities.", steps: ["List business processes that use personal data", "Identify purpose and lawful basis for each", "Link systems and discovered data assets", "Add recipients and vendors, including transfers", "Assign owners and schedule attestations", "Flag activities that require a DPIA"] },
  { id: "running-a-dpia", title: "Running a DPIA end to end", summary: "From screening to a documented decision.", steps: ["Screen the processing against high-risk indicators", "Describe the processing using linked records", "Assess necessity and proportionality", "Evaluate risk factors with rationale", "Define mitigations and owners", "Record the review decision and residual risk"] },
  { id: "dsar-playbook", title: "A practical DSAR playbook", summary: "Handling requests consistently across systems.", steps: ["Standardize intake channels", "Define proportionate identity verification", "Use discovery to locate relevant systems", "Assign system tasks with deadlines", "Review and redact third-party data", "Respond securely and retain evidence"] },
  { id: "vendor-due-diligence", title: "Vendor privacy due diligence", summary: "Assessing vendors before and after onboarding.", steps: ["Classify the vendor by data processed", "Send a proportionate questionnaire", "Review the DPA and transfer mechanism", "Record subprocessors", "Rate vendor risk", "Schedule reassessment"] },
];

export const glossary = [
  { term: "Applicability", def: "Whether a law applies to a given processing, determined by facts such as data subject location, organization establishment, processing activity, data type and destination." },
  { term: "Classification", def: "Assigning a data type or sensitivity label to a data element, usually with a confidence score." },
  { term: "Consent evidence", def: "A record showing what a person consented to, when, and under which banner configuration." },
  { term: "Data asset", def: "A table, bucket, file set, object or dataset that may contain personal data." },
  { term: "Data Currents", def: "PrivacySEK's way of representing how data enters, moves, branches and changes state across systems." },
  { term: "Data subject / data principal", def: "The individual to whom personal data relates. The DPDP Act uses 'data principal'." },
  { term: "DPA", def: "Data Processing Agreement — the contract governing a processor's handling of personal data." },
  { term: "DPIA", def: "Data Protection Impact Assessment — an assessment of processing likely to result in high risk." },
  { term: "Data protection and Enforcement", def: "PrivacySEK Data Protection & Risk Enforcement — the engine that decides how data activity is handled based on context, policy, risk and jurisdiction." },
  { term: "DSAR", def: "Data Subject Access Request — commonly used for all data subject rights requests." },
  { term: "Metadata-first", def: "An approach to discovery that relies on schemas, metadata and profiles before, or instead of, retaining raw values." },
  { term: "Privacy Lens", def: "A PrivacySEK view that shows the same environment from different perspectives: data, privacy, risk, jurisdiction or enforcement." },
  { term: "Processing activity", def: "An operation or set of operations performed on personal data for a purpose." },
  { term: "ROPA", def: "Record of Processing Activities." },
  { term: "Subprocessor", def: "A processor engaged by another processor to process personal data." },
];

export const faqs = [
  { q: "What is PrivacySEK?", a: "PrivacySEK is a privacy management and data protection platform that helps organizations discover personal data, understand how it moves, assess privacy risk, manage privacy operations and enforce data protection policies." },
  { q: "Does PrivacySEK copy all of our data?", a: "No. Data Discovery is metadata-first. It profiles schemas and metadata and evaluates samples in place where configured. Retention of sample values is controlled by your policy." },
  { q: "What is Data protection and Enforcement?", a: "Data protection and Enforcement — Data Protection & Risk Enforcement — is PrivacySEK's decision engine. It evaluates data activity against context, sensitivity, policy, risk and jurisdiction and returns decisions such as allow, warn, mask, restrict, block, quarantine or escalate." },
  { q: "How is AI used?", a: "AI appears inside workflows as suggestions: classifications, tracker categories, risk signals and recommendations. A person reviews suggestions before they become decisions, and those decisions are recorded as evidence." },
  { q: "How does PrivacySEK determine which laws apply?", a: "Applicability is evaluated from context — data subject, organization, processing, data type, destination, location and business context. An IP address alone is not treated as legal jurisdiction. Final legal determinations remain with your counsel." },
  { q: "Is PrivacySEK only a cookie consent tool?", a: "No. Cookie Consent is one capability alongside Data Discovery, ROPA, DPIA, DSAR, Vendor Management, Data Retention, Data protection and Enforcement, Incident Management and Reports." },
  { q: "Does PrivacySEK provide legal advice?", a: "No. PrivacySEK provides operational tooling. Legal interpretation should come from qualified counsel." },
  { q: "How do we get access?", a: "Use the Request Demo form. We will follow up to understand your environment and priorities." },
];
