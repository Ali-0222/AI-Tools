import { Metadata } from "next";
import { AdSidebar } from "@/components/ad-sidebar";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { ToolCard } from "@/components/tool-card";
import { siteTools } from "@/lib/site-data";
import { buildCollectionPageSchema, buildMetadata } from "@/lib/seo";

const title = "All Free Online Tools";
const description =
  "Browse all free online tools for image editing, text cleanup, JSON formatting, calculators, and PDF merging.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/tools"
});

export default function ToolsPage() {
  return (
    <main className="container-shell py-8 md:py-12">
      <SchemaScript
        schema={buildCollectionPageSchema({
          title,
          description,
          path: "/tools",
          itemUrls: siteTools.map((tool) => `/tools/${tool.slug}`)
        })}
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section className="card p-6 md:p-8">
          <SectionHeading
            eyebrow="All Tools"
            title={`${siteTools.length} free tools on dedicated pages`}
            text="Each tool includes a clear intro, practical guidance, and simple actions for copy, reset, or download when relevant."
            as="h1"
          />
          <div className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm leading-7 text-[var(--muted)]">
            This directory is organized to help visitors find the right workflow quickly. Tool pages
            are expected to explain the task, show the main action clearly, and link to the next
            relevant page instead of acting like empty placeholders.
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {siteTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              "Image and document tools help with compression, conversion, resizing, and file preparation.",
              "Text and developer tools focus on cleanup, formatting, encoding, and quick workflow support.",
              "Guides, FAQs, and related links are added so users can move beyond the first click and finish the full task."
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-5 text-sm leading-7 text-[var(--muted)]"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
        <AdSidebar />
      </div>
    </main>
  );
}
