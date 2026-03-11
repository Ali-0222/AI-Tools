import type { Metadata } from "next";
import { blogPosts, siteTools } from "@/lib/site-data";
import { siteConfig } from "@/lib/site-config";
import { getToolDescription, getToolHeading, getToolKeywords } from "@/lib/tool-seo-content";

const siteUrl = siteConfig.url;
const defaultDescription =
  "Free online tools for images, text, PDF, JSON, and developers. Fast, simple, mobile-friendly, and client-side.";
const defaultKeywords = [
  "free online tools",
  "free online tools for students and developers",
  "all in one online tools website",
  "best free online image compressor tool",
  "json formatter and validator online",
  "merge pdf files free online without watermark"
];
const defaultOgImage = `${siteUrl}/opengraph-image`;
const organizationLogo = `${siteUrl}/icon-192.png`;

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
};

function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

function getSocialTitle(title?: string) {
  if (!title || title === siteConfig.name) {
    return siteConfig.name;
  }

  return `${title} | ${siteConfig.name}`;
}

export function buildMetadata({
  title,
  description = defaultDescription,
  path = "/",
  keywords = defaultKeywords,
  type = "website",
  noIndex = false
}: MetadataInput): Metadata {
  const socialTitle = getSocialTitle(title);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path
    },
    openGraph: {
      title: socialTitle,
      description,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      locale: "en_US",
      type,
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
          alt: socialTitle
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [defaultOgImage]
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true
          }
        }
      : {
          index: true,
          follow: true
        }
  };
}

export function getToolBySlug(slug: string) {
  return siteTools.find((tool) => tool.slug === slug);
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function buildToolMetadata(slug: string): Metadata {
  const tool = getToolBySlug(slug);

  if (!tool) {
    return buildMetadata({
      title: "Tool Not Found",
      description: "The requested tool page could not be found.",
      path: "/tools"
    });
  }

  const seoTitle = getToolHeading(tool);
  const seoDescription = `${getToolDescription(tool)} No signup required. Fast results on ${siteConfig.name}.`;

  return buildMetadata({
    title: seoTitle,
    description: seoDescription,
    path: `/tools/${tool.slug}`,
    keywords: getToolKeywords(tool)
  });
}

export function buildBlogPostMetadata(slug: string): Metadata {
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: "Blog Post Not Found",
      description: "The requested blog article could not be found.",
      path: "/blog"
    });
  }

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    keywords: [post.primaryKeyword, ...post.keywords, post.category.toLowerCase(), ...defaultKeywords]
  });
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    logo: organizationLogo,
    image: organizationLogo
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: defaultDescription
  };
}

export function buildWebPageSchema({
  title,
  description,
  path
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url
    }
  };
}

export function buildCollectionPageSchema({
  title,
  description,
  path,
  itemUrls
}: {
  title: string;
  description: string;
  path: string;
  itemUrls: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: absoluteUrl(path),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: itemUrls.map((url, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(url)
      }))
    }
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
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
    name: getToolHeading(tool),
    description: getToolDescription(tool),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript and a modern browser",
    url: absoluteUrl(`/tools/${tool.slug}`),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };
}

export function buildFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  if (faqs.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export function buildBlogPostingSchema({
  slug,
  title,
  description,
  keywords,
  datePublished,
  dateModified
}: {
  slug: string;
  title: string;
  description: string;
  keywords?: string[];
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    keywords,
    image: [defaultOgImage],
    mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
    url: absoluteUrl(`/blog/${slug}`),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: organizationLogo
      }
    }
  };
}
