import { notFound } from "next/navigation";
import { SchemaScript } from "@/components/schema-script";
import { ToolLayout } from "@/components/tool-layout";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { getLandingPagesByTool } from "@/lib/landing-pages";
import { buildBreadcrumbSchema, buildFaqSchema, buildToolMetadata, buildToolSchema } from "@/lib/seo";
import { siteTools, type ToolKey } from "@/lib/site-data";
import { buildToolFaqs, getRelatedTools, getToolDescription, getToolHeading } from "@/lib/tool-seo-content";
import { renderToolBySlug } from "@/lib/tool-renderers";

type Params = Promise<{ slug: ToolKey }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  return buildToolMetadata(slug);
}

export function generateStaticParams() {
  return siteTools.map((tool) => ({ slug: tool.slug }));
}

export default async function ToolDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const tool = siteTools.find((item) => item.slug === slug);

  if (!tool) {
    notFound();
  }

  const relatedTools = getRelatedTools(tool.slug);
  const relatedLandingPages = getLandingPagesByTool(tool.slug);
  const faqs = buildToolFaqs(tool);

  return (
    <>
      <SchemaScript schema={buildToolSchema(slug)} />
      <SchemaScript schema={buildFaqSchema(faqs)} />
      <SchemaScript
        schema={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
          { name: tool.name, path: `/tools/${tool.slug}` }
        ])}
      />
      <ToolLayout title={getToolHeading(tool)} description={getToolDescription(tool)} tips={tool.tips}>
        {renderToolBySlug(slug)}
      </ToolLayout>
      <ToolSeoContent
        tool={tool}
        relatedTools={relatedTools}
        relatedLandingPages={relatedLandingPages}
      />
    </>
  );
}
