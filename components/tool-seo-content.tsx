import Link from "next/link";
import type { LandingPageDefinition } from "@/lib/landing-pages";
import type { ToolDefinition } from "@/lib/site-data";
import { buildToolFaqs, getToolSeoData } from "@/lib/tool-seo-content";

type ToolSeoContentProps = {
  tool: ToolDefinition;
  relatedTools: ToolDefinition[];
  relatedLandingPages: LandingPageDefinition[];
};

export function ToolSeoContent({ tool, relatedTools, relatedLandingPages }: ToolSeoContentProps) {
  const faqs = buildToolFaqs(tool);
  const seoData = getToolSeoData(tool);

  return (
    <section className="px-4 pt-8 pb-12 md:pt-10 md:pb-16">
      <div className="mx-auto max-w-4xl space-y-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
            Helpful Guide
          </p>
          <h2 className="text-2xl font-bold text-[var(--foreground)] md:text-3xl">
            Detailed guide for {tool.name.toLowerCase()}
          </h2>
          {seoData.intro.map((paragraph) => (
            <p key={paragraph} className="leading-8 text-[var(--muted)]">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="space-y-5">
          {seoData.detailedGuide.map((section) => (
            <article key={section.title} className="space-y-3 rounded-2xl bg-[var(--surface-strong)] p-5">
              <h3 className="text-xl font-semibold text-[var(--foreground)]">{section.title}</h3>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="leading-8 text-[var(--muted)]">
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-5">
            <h2 className="text-2xl font-bold text-[var(--foreground)]">Best for</h2>
            <ul className="space-y-3 text-[var(--muted)]">
              {seoData.bestFor.map((item) => (
                <li key={item} className="leading-7">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-5">
            <h2 className="text-2xl font-bold text-[var(--foreground)]">Before you start</h2>
            <ul className="space-y-3 text-[var(--muted)]">
              {seoData.beforeYouStart.map((item) => (
                <li key={item} className="leading-7">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-5">
            <h2 className="text-2xl font-bold text-[var(--foreground)]">Use cases</h2>
            <ul className="space-y-3 text-[var(--muted)]">
              {seoData.useCases.map((item) => (
                <li key={item} className="leading-7">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-5">
            <h2 className="text-2xl font-bold text-[var(--foreground)]">Comparison</h2>
            <div className="space-y-3">
              {seoData.comparison.map((item) => (
                <article key={item.title}>
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">{item.title}</h3>
                  <p className="mt-1 leading-7 text-[var(--muted)]">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-5">
            <h2 className="text-2xl font-bold text-[var(--foreground)]">Limitations</h2>
            <ul className="space-y-3 text-[var(--muted)]">
              {seoData.limitations.map((item) => (
                <li key={item} className="leading-7">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-5">
            <h2 className="text-2xl font-bold text-[var(--foreground)]">Privacy and processing</h2>
            <p className="leading-8 text-[var(--muted)]">{seoData.privacyNote}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--foreground)] md:text-3xl">Practical tips</h2>
          <ol className="list-decimal space-y-3 pl-5 leading-8 text-[var(--muted)]">
            {seoData.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ol>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--foreground)] md:text-3xl">Try related tools</h2>
          <p className="leading-8 text-[var(--muted)]">
            Open related tools when your workflow has more than one step or when you need to clean,
            convert, or prepare the result further.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {relatedTools.map((item) => (
              <Link
                key={item.slug}
                href={`/tools/${item.slug}`}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)]"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {relatedLandingPages.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[var(--foreground)] md:text-3xl">
              Explore focused landing pages
            </h2>
            <p className="leading-8 text-[var(--muted)]">
              If you need a specific use case or keyword-targeted workflow, open these dedicated pages.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedLandingPages.map((page) => (
                <Link
                  key={page.slug}
                  href={`/${page.slug}`}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)]"
                >
                  {page.h1}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--foreground)] md:text-3xl">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
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
      </div>
    </section>
  );
}
