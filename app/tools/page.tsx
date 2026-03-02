import { Metadata } from "next";
import { AdSidebar } from "@/components/ad-sidebar";
import { SectionHeading } from "@/components/section-heading";
import { ToolCard } from "@/components/tool-card";
import { siteTools } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "All Free Online Tools",
  description:
    "Browse all free online tools for image editing, text cleanup, JSON formatting, calculators, and PDF merging.",
  alternates: {
    canonical: "/tools"
  }
};

export default function ToolsPage() {
  return (
    <main className="container-shell py-8 md:py-12">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section className="card p-6 md:p-8">
          <SectionHeading
            eyebrow="All Tools"
            title={`${siteTools.length} free tools on dedicated SEO-friendly pages`}
            text="Each tool includes a short intro, browser-based logic, and clear actions for copy, reset, or download when relevant."
            as="h1"
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {siteTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
        <AdSidebar />
      </div>
    </main>
  );
}
