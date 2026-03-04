import Link from "next/link";
import type { ToolDefinition } from "@/lib/site-data";
import { buildToolFaqs } from "@/lib/tool-seo-content";

type ToolSeoContentProps = {
  tool: ToolDefinition;
  relatedTools: ToolDefinition[];
};

export function ToolSeoContent({ tool, relatedTools }: ToolSeoContentProps) {
  const faqs = buildToolFaqs(tool);

  return (
    <section className="px-4 pt-8 pb-12 md:pt-10 md:pb-16">
      <div className="mx-auto max-w-4xl space-y-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--foreground)] md:text-3xl">Quick guide</h2>
          <p className="text-[var(--muted)] leading-8">
            Use this page for fast execution and follow the steps below. Detailed unique tutorials
            and SEO-focused long-form content are published on the blog pages.
          </p>
          <ol className="space-y-3 text-[var(--muted)] leading-8 list-decimal pl-5">
            {tool.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ol>
          <Link href="/blog" className="text-sm font-semibold text-[var(--accent)]">
            Read detailed guides on the blog
          </Link>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--foreground)] md:text-3xl">Try our other tools</h2>
          <p className="text-[var(--muted)] leading-8">
            Use related pages to finish the next step faster and strengthen your workflow:
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

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--foreground)] md:text-3xl">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4"
              >
                <h3 className="text-lg font-semibold text-[var(--foreground)]">{faq.question}</h3>
                <p className="mt-2 text-[var(--muted)] leading-7">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
