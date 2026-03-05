import { siteConfig } from "@/lib/site-config";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildSitemapIndexXml(urls: Array<{ loc: string; lastmod?: string }>) {
  const body = urls
    .map((item) => {
      const lastmod = item.lastmod ? `<lastmod>${item.lastmod}</lastmod>` : "";
      return `<sitemap><loc>${escapeXml(item.loc)}</loc>${lastmod}</sitemap>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</sitemapindex>`;
}

export function GET() {
  const now = new Date().toISOString();
  const xml = buildSitemapIndexXml([
    { loc: `${siteConfig.url}/sitemap-pages.xml`, lastmod: now },
    { loc: `${siteConfig.url}/sitemap-tools.xml`, lastmod: now },
    { loc: `${siteConfig.url}/sitemap-blog.xml`, lastmod: now }
  ]);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}
