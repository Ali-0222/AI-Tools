import Link from "next/link";
import { Metadata } from "next";
import { AdSidebar } from "@/components/ad-sidebar";
import { SchemaScript } from "@/components/schema-script";
import { Hero } from "@/components/hero";
import { SectionHeading } from "@/components/section-heading";
import { ToolCard } from "@/components/tool-card";
import { blogPosts, getToolCountLabel, siteTools } from "@/lib/site-data";
import { buildCollectionPageSchema, buildMetadata, buildWebPageSchema } from "@/lib/seo";

const title = "Free Online Tools for Images, Text, PDF & Developers";
const description =
  "Use free online tools for images, text, PDF, JSON, and developers. Compress images without losing quality, count words, merge PDF files, and format JSON in your browser.";

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
              title="Instant tools built for quick everyday tasks"
              text="Use simple browser-based tools for images, text, PDF files, and developer workflows without extra setup."
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {siteTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
          <section className="card p-6 md:p-8">
            <SectionHeading
              eyebrow="Tool Categories"
              title="Useful tools for common work, study, and web tasks"
              text="Browse focused tools for image optimization, text editing, PDF handling, and developer cleanup tasks."
            />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                "Image tools for compression, resizing, and format conversion.",
                "Text tools for counting, cleaning, sorting, and formatting.",
                "Developer tools for JSON, Base64, URLs, UUIDs, and slugs.",
                "PDF and document tools for merging and conversion.",
                "Simple calculators for age, BMI, and daily utility tasks.",
                "Fast browser workflows that work on desktop and mobile."
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 text-sm leading-6 text-[var(--foreground)]">
                  {item}
                </div>
              ))}
            </div>
          </section>
          <section className="card p-6 md:p-8">
            <SectionHeading
              eyebrow="Why This Site"
              title="Built for clarity, speed, and practical use"
              text="Each page is designed to help users complete one task quickly with clear steps, simple actions, and helpful supporting information."
            />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                "Client-side tools protect user files and text.",
                "Static content pages support trust, crawl depth, and AdSense review.",
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
              eyebrow="Why People Use It"
              title="Designed to be simple, fast, and easy to trust"
              text="The website keeps common online tasks in one place so users can finish image, text, PDF, and developer work without jumping across multiple services."
            />
            <div className="mt-6 space-y-6">
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {[
                  ["Fast", "Quick tool pages with direct actions, clear labels, and minimal clutter."],
                  ["Free", "Core utilities stay accessible without a paid wall blocking basic tasks."],
                  ["Browser-Based", "Most tasks run in-browser for a smoother workflow and fewer steps."],
                  ["Mobile-Friendly", "Layouts stay readable and usable on phones, tablets, and desktop screens."],
                  ["Growing Library", "New tools and helpful content can be added as user needs expand."]
                ].map(([label, text], index) => (
                  <article
                    key={label}
                    className="rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] p-6"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-soft)] text-xs font-bold text-[var(--accent)]">
                        0{index + 1}
                      </span>
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        {label}
                      </p>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-[var(--foreground)]">{text}</p>
                  </article>
                ))}
              </div>

              <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                  Common workflows
                </p>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  {[
                    "Use image tools to compress, resize, and convert files in a few clicks.",
                    "Use text and developer tools to clean inputs, format content, and speed up small workflows.",
                    "Use PDF and document tools to combine files and handle common office tasks online."
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-5 text-sm leading-7 text-[var(--muted)]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="card p-6 md:p-8">
            <SectionHeading
              eyebrow="Blog"
              title="Helpful articles that make tool usage easier"
              text="Read practical guides, examples, and step-by-step tips so users can get better results from image, text, PDF, and developer tools."
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
