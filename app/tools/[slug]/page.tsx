import { notFound } from "next/navigation";
import { SchemaScript } from "@/components/schema-script";
import { ToolLayout } from "@/components/tool-layout";
import { buildBreadcrumbSchema, buildToolMetadata, buildToolSchema } from "@/lib/seo";
import { siteTools, type ToolKey } from "@/lib/site-data";
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

  return (
    <>
      <SchemaScript schema={buildToolSchema(slug)} />
      <SchemaScript
        schema={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
          { name: tool.name, path: `/tools/${tool.slug}` }
        ])}
      />
      <ToolLayout title={tool.pageTitle} description={tool.pageDescription} tips={tool.tips}>
        {renderToolBySlug(slug)}
      </ToolLayout>
    </>
  );
}
