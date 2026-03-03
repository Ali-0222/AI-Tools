import { Metadata } from "next";
import { SchemaScript } from "@/components/schema-script";
import { StaticPage } from "@/components/static-page";
import { buildMetadata, buildWebPageSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const title = "Disclaimer";
const description = `Read the disclaimer for ${siteConfig.name} regarding informational use, tool accuracy, and limitation of liability.`;

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/disclaimer"
});

export default function DisclaimerPage() {
  return (
    <>
      <SchemaScript schema={buildWebPageSchema({ title, description, path: "/disclaimer" })} />
      <StaticPage
        title="Disclaimer"
        description="The tools and information on this site are provided for general informational and convenience purposes."
      >
        <p>
          {siteConfig.name} provides browser-based utilities as-is. While the tools are designed to be useful and practical, no guarantee is made regarding completeness, accuracy, or suitability for a particular purpose.
        </p>
        <p>
          Users are responsible for checking generated output before relying on it. This is especially important for document handling, calculations, or data formatting.
        </p>
        <p>
          The website owner is not liable for loss, damages, or consequences resulting from the use or inability to use the tools or information provided on the site.
        </p>
      </StaticPage>
    </>
  );
}
