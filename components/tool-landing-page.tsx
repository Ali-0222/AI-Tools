import Link from "next/link";
import { Metadata } from "next";
import { SchemaScript } from "@/components/schema-script";
import { ToolLayout } from "@/components/tool-layout";
import type { LandingPageDefinition } from "@/lib/landing-pages";
import { siteConfig } from "@/lib/site-config";
import { buildBreadcrumbSchema, buildFaqSchema, buildMetadata, buildWebPageSchema } from "@/lib/seo";
import { renderToolBySlug } from "@/lib/tool-renderers";

export function buildToolLandingMetadata(page: LandingPageDefinition): Metadata {
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/${page.slug}`,
    keywords: page.keywords
  });
}

export function ToolLandingPage({ page }: { page: LandingPageDefinition }) {
  return (
    <>
      <SchemaScript
        schema={[
          buildWebPageSchema({
            title: page.title,
            description: page.description,
            path: `/${page.slug}`
          }),
          buildFaqSchema(page.faqs),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: page.h1, path: `/${page.slug}` }
          ]),
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: page.h1,
            description: page.description,
            url: `${siteConfig.url}/${page.slug}`,
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD"
            }
          }
        ]}
      />
      <ToolLayout title={page.h1} description={page.intro} tips={page.tips}>
        {renderToolBySlug(page.toolSlug)}
      </ToolLayout>
      <section className="px-4 pb-12 md:pb-16">
        <div className="mx-auto max-w-4xl space-y-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
              Helpful Guide
            </p>
            {page.sections.map((section) => (
              <article key={section.title} className="space-y-3 rounded-2xl bg-[var(--surface-strong)] p-5">
                <h2 className="text-2xl font-bold text-[var(--foreground)]">{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="leading-8 text-[var(--muted)]">
                    {paragraph}
                  </p>
                ))}
              </article>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[var(--foreground)]">FAQs</h2>
            <div className="space-y-4">
              {page.faqs.map((faq) => (
                <article
                  key={faq.question}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4"
                >
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">{faq.question}</h3>
                  <p className="mt-2 leading-7 text-[var(--muted)]">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-5">
            <h2 className="text-2xl font-bold text-[var(--foreground)]">{page.relatedHeading}</h2>
            <div className="flex flex-wrap gap-3">
              {page.relatedLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm font-semibold text-[var(--accent)]">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
