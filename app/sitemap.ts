import type { MetadataRoute } from "next";
import { blogPosts, siteTools } from "@/lib/site-data";
import { siteConfig } from "@/lib/site-config";

const baseUrl = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/tools", "/about", "/contact", "/privacy-policy", "/disclaimer", "/blog"];

  return [
    ...staticPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8
    })),
    ...siteTools.map((tool) => ({
      url: `${baseUrl}/tools/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9
    })),
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7
    }))
  ];
}
