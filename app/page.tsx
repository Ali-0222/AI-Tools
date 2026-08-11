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
              text="Start with the task you have: a large image, messy text, a PDF set, a JSON payload, or a quick calculation."
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
              text="Find tools by the job you are trying to finish, then open a dedicated page with instructions and related checks."
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
              title="Made for real tasks, not empty tool pages"
              text="Each page pairs the working tool with plain guidance so a visitor can understand what changed and whether the result is ready."
            />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                "Tool pages describe the input, the output, common mistakes, and a sensible next step.",
                "About, privacy, disclaimer, editorial, and contact pages are visible from the main navigation and footer.",
                `Internal links connect ${getToolCountLabel().toLowerCase()} so visitors can continue a related task without guessing.`
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-5 text-sm leading-6 text-[var(--muted)]">
                  {item}
                </div>
              ))}
            </div>
          </section>
          <section className="card p-6 md:p-8">
            <SectionHeading
              eyebrow="Trust and Privacy"
              title="Trust signals that match the tools"
              text="The copy avoids absolute promises and explains where a result still needs review, especially for files, OCR, health estimates, and rewritten text."
            />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                [
                  "Transparent publisher pages",
                  "About, privacy, disclaimer, contact, and editorial pages explain who runs the site and how pages are maintained."
                ],
                [
                  "Practical content around every tool",
                  "Visitors can see what the tool does, when to use it, what to watch out for, and which related page can help next."
                ],
                [
                  "Navigation for task completion",
                  "Core pages link naturally to related tools, focused landing pages, and supporting guides."
                ],
                [
                  "Honest limitations",
                  "The site explains that browser tools are best for quick workflows and that important output should be checked before use."
                ]
              ].map(([title, text]) => (
                <article
                  key={title}
                  className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6"
                >
                  <h2 className="text-xl font-bold">{title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{text}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="card p-6 md:p-8">
            <SectionHeading
              eyebrow="Why People Use It"
              title="Simple enough for quick jobs, detailed enough to be useful"
              text="The site keeps common tasks close together while giving each tool its own page, examples, limitations, and related articles."
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
              title="Helpful articles that support the tools"
              text="Read practical guides, workflow notes, and examples that add context beyond the tool interface itself."
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
            <div className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                Publisher notes
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                Toolbee Pro is maintained as a practical utility site: working tools first, then guides that explain common mistakes, limits, privacy expectations, and related tasks. Policy, privacy, and contact pages stay easy to reach from the footer.
              </p>
            </div>
          </section>
        </div>
        <AdSidebar />
      </div>
    </main>
  );
}



