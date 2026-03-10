import { siteConfig } from "@/lib/site-config";
import { buildSitemapXml, getStaticPageRoutes } from "@/lib/sitemap";

export async function GET() {
  const staticPages = await getStaticPageRoutes();
  const xml = buildSitemapXml(
    staticPages.map((page) => ({
      loc: `${siteConfig.url}${page.route}`,
      lastmod: page.lastmod,
      changefreq: "weekly" as const,
      priority: page.route === "/" ? 1 : 0.8
    }))
  );

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
