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

const APP_DIR = path.join(process.cwd(), "app");
const SITE_DATA_FILE = path.join(process.cwd(), "lib", "site-data.ts");
const NON_INDEXABLE_ROUTES = new Set([
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/profile"
]);

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

async function readPageFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return readPageFiles(absolutePath);
      }
      return entry.name === "page.tsx" ? [absolutePath] : [];
    })
  );

  return files.flat();
}

function resolveRouteFromPageFile(pageFilePath: string) {
  const relative = path.relative(APP_DIR, pageFilePath).replaceAll("\\", "/");
  const withoutFile = relative.replace(/\/page\.tsx$/, "").replace(/^page\.tsx$/, "");
  const segments = withoutFile
    .split("/")
    .filter(Boolean)
    .filter((segment) => !segment.startsWith("(") && !segment.endsWith(")"));

  if (segments.some((segment) => segment.includes("[") || segment.includes("]"))) {
    return null;
  }

  const route = `/${segments.join("/")}`;
  return route === "/" || route === "//" ? "/" : route;
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

export async function getStaticPageRoutes() {
  const pageFiles = await readPageFiles(APP_DIR);
  const routeMap = new Map<string, { route: string; lastmod?: string }>();

  for (const pageFile of pageFiles) {
    const route = resolveRouteFromPageFile(pageFile);
    if (!route || NON_INDEXABLE_ROUTES.has(route)) {
      continue;
    }

    const lastmod = await getFileLastModified(pageFile);
    routeMap.set(route, { route, lastmod });
  }

  return [...routeMap.values()].sort((a, b) => a.route.localeCompare(b.route));
}
