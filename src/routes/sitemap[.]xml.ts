import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/seo";
import { products } from "@/data/products";
import { solutions } from "@/data/solutions";
import { regulations } from "@/data/regulations";

const staticPaths = [
  "/", "/platform", "/solutions", "/regulations", "/resources", "/resources/blog", "/resources/guides",
  "/resources/glossary", "/resources/faqs", "/about", "/contact",
  "/privacy-policy", "/cookie-policy", "/terms", "/accessibility",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const paths = [
          ...staticPaths,
          ...products.map((p) => `/platform/${p.slug}`),
          ...solutions.map((s) => `/solutions/${s.slug}`),
          ...regulations.map((r) => `/regulations/${r.slug}`),
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
          .map((p) => `  <url><loc>${SITE_URL}${p === "/" ? "/" : p}</loc><priority>${p === "/" ? "1.0" : "0.7"}</priority></url>`)
          .join("\n")}\n</urlset>\n`;
        return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
