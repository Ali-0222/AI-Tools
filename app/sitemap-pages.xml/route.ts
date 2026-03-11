import { siteConfig } from "@/lib/site-config";
import { buildSitemapXml, getSiteDataLastModified } from "@/lib/sitemap";
import { staticPageRoutes } from "@/lib/static-pages";

export async function GET() {
  const lastmod = await getSiteDataLastModified();
  const xml = buildSitemapXml(
    staticPageRoutes.map((route) => ({
      loc: `${siteConfig.url}${route}`,
      lastmod,
      changefreq: "weekly" as const,
      priority: route === "/" ? 1 : 0.8
    }))
  );

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
