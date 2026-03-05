import { siteConfig } from "@/lib/site-config";
import { blogPosts } from "@/lib/site-data";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildSitemapXml(
  entries: Array<{
    loc: string;
    lastmod?: string;
    changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
    priority?: number;
  }>
) {
  const body = entries
    .map((entry) => {
      const parts = [
        `<loc>${escapeXml(entry.loc)}</loc>`,
        entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : "",
        entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : "",
        typeof entry.priority === "number"
          ? `<priority>${entry.priority.toFixed(1)}</priority>`
          : ""
      ]
        .filter(Boolean)
        .join("");

      return `<url>${parts}</url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;
}

export function GET() {
  const now = new Date().toISOString();
  const xml = buildSitemapXml(
    blogPosts.map((post) => ({
      loc: `${siteConfig.url}/blog/${post.slug}`,
      lastmod: now,
      changefreq: "monthly" as const,
      priority: 0.7
    }))
  );

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
