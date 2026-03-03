import Link from "next/link";
import { Metadata } from "next";
import { AdSidebar } from "@/components/ad-sidebar";
import { SchemaScript } from "@/components/schema-script";
import { Hero } from "@/components/hero";
import { SectionHeading } from "@/components/section-heading";
import { ToolCard } from "@/components/tool-card";
import { blogPosts, getToolCountLabel, siteTools } from "@/lib/site-data";
import { buildCollectionPageSchema, buildMetadata, buildWebPageSchema } from "@/lib/seo";

const title = "Free Online Tools for Images, Text, JSON and PDFs";
const description =
  "Use fast, mobile-friendly free online tools for image compression, text cleanup, JSON formatting, BMI, age calculation, and PDF merging.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/"
});

export default function HomePage() {
  return (
    <main className="container-shell py-8 md:py-12">
      <SchemaScript
        schema={[
          buildWebPageSchema({
            title,
            description,
            path: "/"
          }),
          buildCollectionPageSchema({
            title: "Online Tools Directory",
            description: "Browse browser-based utilities for images, text, PDFs, JSON, and calculations.",
            path: "/",
            itemUrls: siteTools.map((tool) => `/tools/${tool.slug}`)
          })
        ]}
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-6">
          <Hero />
          <section className="card p-6 md:p-8">
            <SectionHeading
              eyebrow="Popular Tools"
              title="Instant tools built for speed and privacy"
              text="Every tool runs in your browser. No account, no uploads to our servers, and no waiting for background processing."
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {siteTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
          <section className="card p-6 md:p-8">
            <SectionHeading
              eyebrow="Why This Site"
              title="Built for SEO, approval, and actual usefulness"
              text="The layout keeps content visible before ads, each page has a clear single purpose, and tool instructions are understandable on mobile."
            />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                "Client-side tools protect user files and text.",
                "Static content pages support trust and AdSense review.",
                `Internal linking improves crawlability across ${getToolCountLabel().toLowerCase()}.`
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-5 text-sm leading-6 text-[var(--muted)]">
                  {item}
                </div>
              ))}
            </div>
          </section>
          <section className="card p-6 md:p-8">
            <SectionHeading
              eyebrow="Blog"
              title="SEO content that supports the tools"
              text="Use focused articles to answer common questions and strengthen internal relevance."
            />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--accent)] hover:shadow-[0_12px_24px_rgba(15,23,42,0.08)]"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                    {post.category}
                  </p>
                  <h2 className="mt-2 text-xl font-bold">{post.title}</h2>
                  <p className="mt-2 text-sm text-[var(--muted)]">{post.description}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
        <AdSidebar />
      </div>
    </main>
  );
}
