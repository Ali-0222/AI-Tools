import { siteConfig } from "@/lib/site-config";
import { siteTools } from "@/lib/site-data";
import { buildSitemapXml, getSiteDataLastModified } from "@/lib/sitemap";

export async function GET() {
  const lastmod = await getSiteDataLastModified();
  const xml = buildSitemapXml(
    siteTools.map((tool) => ({
      loc: `${siteConfig.url}/tools/${tool.slug}`,
      lastmod,
      changefreq: "weekly" as const,
      priority: 0.9
    }))
  );

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
