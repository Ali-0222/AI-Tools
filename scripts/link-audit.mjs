import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["app", "components"];
const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx"]);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(fullPath);
      }
      return SOURCE_EXTENSIONS.has(path.extname(entry.name)) ? [fullPath] : [];
    })
  );
  return files.flat();
}

function normalizeRoute(route) {
  const withoutHash = route.split("#")[0];
  const withoutQuery = withoutHash.split("?")[0];
  if (withoutQuery.length > 1 && withoutQuery.endsWith("/")) {
    return withoutQuery.slice(0, -1);
  }
  return withoutQuery;
}

function getLineNumber(source, index) {
  return source.slice(0, index).split(/\r?\n/).length;
}

function routeToRegex(route) {
  const escaped = route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`^${escaped.replace(/\\\[.+?\\\]/g, "[^/]+")}$`);
}

async function getStaticRoutes() {
  const appDir = path.join(ROOT, "app");
  const files = await walk(appDir);
  const pageFiles = files.filter((file) => file.replaceAll("\\", "/").endsWith("/page.tsx"));

  const routes = new Set();
  for (const file of pageFiles) {
    const relative = path.relative(appDir, file).replaceAll("\\", "/");
    const route = relative.replace(/(^|\/)page\.tsx$/, "");
    routes.add(route === "" ? "/" : `/${route}`);
  }

  return routes;
}

async function getDynamicSlugs() {
  const siteDataPath = path.join(ROOT, "lib", "site-data.ts");
  const content = await fs.readFile(siteDataPath, "utf8");

  const toolSection = content.split("export const siteTools: ToolDefinition[] = [")[1]?.split("];")[0] ?? "";
  const blogSection = content.split("export const blogPosts = [")[1]?.split("];")[0] ?? "";

  const toolSlugs = [...toolSection.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
  const blogSlugs = [...blogSection.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);

  return {
    toolRoutes: new Set(toolSlugs.map((slug) => `/tools/${slug}`)),
    blogRoutes: new Set(blogSlugs.map((slug) => `/blog/${slug}`))
  };
}

function isIgnorableHref(href) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#") ||
    href.startsWith("javascript:")
  );
}

function extractHrefs(content) {
  const results = [];
  const staticHrefPattern = /href\s*=\s*["']([^"']+)["']/g;
  const templateHrefPattern = /href\s*=\s*\{\s*`([^`]+)`\s*\}/g;

  for (const match of content.matchAll(staticHrefPattern)) {
    results.push({ href: match[1], index: match.index ?? 0, type: "static" });
  }

  for (const match of content.matchAll(templateHrefPattern)) {
    results.push({ href: match[1], index: match.index ?? 0, type: "template" });
  }

  return results;
}

function validateTemplateHref(href, hasTools, hasBlogs) {
  if (href.includes("${tool.slug}") && href.startsWith("/tools/")) {
    return hasTools;
  }
  if (href.includes("${post.slug}") && href.startsWith("/blog/")) {
    return hasBlogs;
  }
  return true;
}

async function run() {
  const staticRoutes = await getStaticRoutes();
  const dynamicRoutePatterns = [...staticRoutes]
    .filter((route) => route.includes("["))
    .map((route) => routeToRegex(route));

  const { toolRoutes, blogRoutes } = await getDynamicSlugs();
  const scanFiles = (
    await Promise.all(SCAN_DIRS.map((dir) => walk(path.join(ROOT, dir))))
  ).flat();

  const broken = [];
  for (const file of scanFiles) {
    const source = await fs.readFile(file, "utf8");
    const hrefs = extractHrefs(source);

    for (const entry of hrefs) {
      const href = entry.href.trim();
      if (!href || isIgnorableHref(href)) {
        continue;
      }
      if (href.includes("${")) {
        continue;
      }

      if (entry.type === "template" && href.includes("${")) {
        const ok = validateTemplateHref(href, toolRoutes.size > 0, blogRoutes.size > 0);
        if (!ok) {
          broken.push({
            file: path.relative(ROOT, file),
            line: getLineNumber(source, entry.index),
            href
          });
        }
        continue;
      }

      const normalized = normalizeRoute(href);
      if (normalized.includes("${tool.slug}") && normalized.startsWith("/tools/")) {
        continue;
      }
      if (normalized.includes("${post.slug}") && normalized.startsWith("/blog/")) {
        continue;
      }
      const directMatch =
        staticRoutes.has(normalized) || toolRoutes.has(normalized) || blogRoutes.has(normalized);
      const dynamicMatch = dynamicRoutePatterns.some((pattern) => pattern.test(normalized));

      if (!directMatch && !dynamicMatch) {
        broken.push({
          file: path.relative(ROOT, file),
          line: getLineNumber(source, entry.index),
          href: normalized
        });
      }
    }
  }

  if (broken.length > 0) {
    console.error(`Broken internal links found: ${broken.length}`);
    for (const item of broken) {
      console.error(`- ${item.file}:${item.line} -> ${item.href}`);
    }
    process.exit(1);
  }

  console.log("Link audit passed: no broken internal href values found.");
}

run().catch((error) => {
  console.error("Link audit failed:", error);
  process.exit(1);
});
