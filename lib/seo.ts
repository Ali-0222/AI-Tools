import type { Metadata } from "next";
import { siteTools } from "@/lib/site-data";

const siteUrl = "https://www.freefasttools.com";

export function getToolBySlug(slug: string) {
  return siteTools.find((tool) => tool.slug === slug);
}

export function buildToolMetadata(slug: string): Metadata {
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: "Tool Not Found",
      description: "The requested tool page could not be found."
    };
  }

  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    alternates: {
      canonical: `/tools/${tool.slug}`
    },
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      url: `${siteUrl}/tools/${tool.slug}`,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: tool.metaTitle,
      description: tool.metaDescription
    }
  };
}

export function buildToolSchema(slug: string) {
  const tool = getToolBySlug(slug);

  if (!tool) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    description: tool.metaDescription,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript and a modern browser",
    url: `${siteUrl}/tools/${tool.slug}`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };
}
