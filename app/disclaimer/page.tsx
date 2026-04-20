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
        description="The tools and information on this site are provided for general informational and convenience purposes and should be reviewed before important use."
      >
        <p>
          {siteConfig.name} provides browser-based utilities, landing pages, and educational
          articles as-is. While the site is maintained to be useful and practical, no guarantee is
          made regarding completeness, accuracy, uninterrupted availability, or suitability for a
          particular purpose.
        </p>
        <p>
          Users are responsible for checking generated output before relying on it. This is
          especially important for document handling, calculations, OCR output, AI-assisted text
          rewriting, health-related estimations, or structured data formatting.
        </p>
        <p>
          The website content is not legal advice, medical advice, tax advice, professional
          security guidance, or any other regulated advisory service. When the stakes are high,
          users should verify the result independently or consult a qualified professional.
        </p>
        <p>
          The website owner is not liable for loss, damages, or consequences resulting from the use
          or inability to use the tools or information provided on the site.
        </p>
      </StaticPage>
    </>
  );
}
