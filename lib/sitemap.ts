import { promises as fs } from "node:fs";
import path from "node:path";

export type SitemapChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

type SitemapEntry = {
  loc: string;
  lastmod?: string;
  changefreq?: SitemapChangeFrequency;
  priority?: number;
};

type SitemapIndexEntry = {
  loc: string;
  lastmod?: string;
};

const SITE_DATA_FILE = path.join(process.cwd(), "lib", "site-data.ts");

export function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildSitemapXml(entries: SitemapEntry[]) {
  const body = entries
    .map((entry) => {
      const parts = [
        `<loc>${escapeXml(entry.loc)}</loc>`,
        entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : "",
        entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : "",
        typeof entry.priority === "number" ? `<priority>${entry.priority.toFixed(1)}</priority>` : ""
      ]
        .filter(Boolean)
        .join("");

      return `<url>${parts}</url>`;
    })
    .join("");

  return (
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`
  );
}

export function buildSitemapIndexXml(entries: SitemapIndexEntry[]) {
  const body = entries
    .map((entry) => {
      const lastmod = entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : "";
      return `<sitemap><loc>${escapeXml(entry.loc)}</loc>${lastmod}</sitemap>`;
    })
    .join("");

  return (
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</sitemapindex>`
  );
}

export async function getFileLastModified(filePath: string) {
  try {
    const stats = await fs.stat(filePath);
    return stats.mtime.toISOString();
  } catch {
    return undefined;
  }
}

export async function getSiteDataLastModified() {
  return getFileLastModified(SITE_DATA_FILE);
}
