import { siteConfig } from "@/lib/site-config";
import { blogPosts } from "@/lib/site-data";
import { buildSitemapXml, getSiteDataLastModified } from "@/lib/sitemap";

export async function GET() {
  const fallbackLastmod = await getSiteDataLastModified();
  const xml = buildSitemapXml(
    blogPosts.map((post) => ({
      loc: `${siteConfig.url}/blog/${post.slug}`,
      lastmod: post.updatedAt ?? post.publishedAt ?? fallbackLastmod,
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
