import { siteConfig } from "@/lib/site-config";
import { buildSitemapIndexXml, getSiteDataLastModified } from "@/lib/sitemap";

export async function GET() {
  const lastmod = await getSiteDataLastModified();
  const xml = buildSitemapIndexXml([
    { loc: `${siteConfig.url}/sitemap-pages.xml`, lastmod },
    { loc: `${siteConfig.url}/sitemap-tools.xml`, lastmod },
    { loc: `${siteConfig.url}/sitemap-blog.xml`, lastmod }
  ]);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}
