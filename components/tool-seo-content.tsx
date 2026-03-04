import Link from "next/link";
import type { ToolDefinition } from "@/lib/site-data";
import {
  buildToolFaqs,
  getBestPracticesParagraphs,
  getWhatIsParagraphs,
  getWhyChooseParagraphs
} from "@/lib/tool-seo-content";

type ToolSeoContentProps = {
  tool: ToolDefinition;
  relatedTools: ToolDefinition[];
};

export function ToolSeoContent({ tool, relatedTools }: ToolSeoContentProps) {
  const whatIs = getWhatIsParagraphs(tool);
  const whyChoose = getWhyChooseParagraphs(tool);
  const bestPractices = getBestPracticesParagraphs(tool);
  const faqs = buildToolFaqs(tool);

  return (
    <section className="px-4 pt-8 pb-12 md:pt-10 md:pb-16">
      <div className="mx-auto max-w-4xl space-y-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--foreground)] md:text-3xl">
            What is {tool.name}?
          </h2>
          {whatIs.map((paragraph) => (
            <p key={paragraph} className="text-[var(--muted)] leading-8">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--foreground)] md:text-3xl">
            How to use {tool.name}
          </h2>
          <p className="text-[var(--muted)] leading-8">
            Follow these simple steps to complete your task quickly and avoid output errors:
          </p>
          <ol className="space-y-3 text-[var(--muted)] leading-8 list-decimal pl-5">
            {tool.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
            <li>Review the final output and run one quick quality check before download or copy.</li>
            <li>
              If needed, continue with a related tool to complete the next task without leaving the
              workflow.
            </li>
          </ol>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--foreground)] md:text-3xl">
            Why choose Toolbee Pro for this task?
          </h2>
          {whyChoose.map((paragraph) => (
            <p key={paragraph} className="text-[var(--muted)] leading-8">
              {paragraph}
            </p>
          ))}
          <ul className="space-y-3 text-[var(--muted)] leading-8 list-disc pl-5">
            <li>Fast browser workflow with no complex setup.</li>
            <li>Clear actions and outputs for non-technical users.</li>
            <li>Useful tool ecosystem for complete day-to-day tasks.</li>
            <li>SEO-friendly dedicated pages with practical guidance.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--foreground)] md:text-3xl">
            Best practices before and after using this tool
          </h2>
          {bestPractices.map((paragraph) => (
            <p key={paragraph} className="text-[var(--muted)] leading-8">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--foreground)] md:text-3xl">
            Common use cases
          </h2>
          <p className="text-[var(--muted)] leading-8">
            This tool is useful for daily personal tasks, professional deliverables, and quick
            edits before sharing files or text with clients, teams, or students.
          </p>
          <ul className="space-y-3 text-[var(--muted)] leading-8 list-disc pl-5">
            <li>Preparing cleaner output before sending files to clients.</li>
            <li>Reducing manual effort in repeated daily tasks.</li>
            <li>Improving quality and consistency for publishing workflows.</li>
            <li>Completing urgent edits from mobile or low-power devices.</li>
            <li>Handling browser-first workflows without local software setup.</li>
          </ul>
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
