export const SITE_NAME = "PrivacySEK";
export const SITE_URL = "https://privacysek.com";

export const abs = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path === "/" ? "" : path}` || SITE_URL);

type SeoInput = {
  title: string;
  description: string;
  path: string;
  type?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>[];
};

export function seo({ title, description, path, type = "website", noindex = false, jsonLd = [] }: SeoInput) {
  const url = abs(path);
  const meta: Record<string, string>[] = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
  if (noindex) meta.push({ name: "robots", content: "noindex, nofollow" });
  return {
    meta,
    links: noindex ? [] : [{ rel: "canonical", href: url }],
    scripts: jsonLd.map((j) => ({ type: "application/ld+json", children: JSON.stringify(j) })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

export function pageLd(name: string, description: string, path: string, type = "WebPage") {
  return { "@context": "https://schema.org", "@type": type, name, description, url: abs(path), isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL } };
}
