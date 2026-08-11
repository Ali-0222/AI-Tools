import { Metadata } from "next";
import { SchemaScript } from "@/components/schema-script";
import { StaticPage } from "@/components/static-page";
import { buildMetadata, buildWebPageSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const title = "Terms and Conditions";
const description = `Read the terms for using ${siteConfig.name}, including acceptable use, tool limitations, and user responsibilities.`;

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/terms-and-conditions"
});

export default function TermsAndConditionsPage() {
  return (
    <>
      <SchemaScript
        schema={buildWebPageSchema({ title, description, path: "/terms-and-conditions" })}
      />
      <StaticPage
        title="Terms and Conditions"
        description={`${siteConfig.name} provides free browser-based tools and guides for everyday file, text, document, calculator, and developer tasks.`}
      >
        <p>
          By using this website, you agree to use the tools and information for lawful, personal,
          educational, or business productivity purposes. You should not use the site to upload,
          generate, distribute, or process content that is illegal, harmful, misleading, abusive, or
          owned by someone else without permission.
        </p>
        <p>
          The tools are provided as practical utilities, not as professional legal, medical,
          financial, security, or compliance advice. Results can depend on the quality of the input,
          browser support, file format, and user settings. Always review important output before
          submitting, publishing, sharing, or relying on it.
        </p>
        <p>
          You are responsible for the files, text, links, and other material you choose to process
          through the site. When a workflow creates a downloadable result, you should confirm that
          the final file is complete, readable, and suitable for the destination where you plan to
          use it.
        </p>
        <p>
          The website may include analytics and advertising technologies to understand performance,
          improve pages, and support free access to the tools. More detail is available in the
          Privacy Policy.
        </p>
        <p>
          We may update pages, tools, policies, or these terms when the site changes. Questions,
          corrections, and support requests can be sent to {siteConfig.email}.
        </p>
      </StaticPage>
    </>
  );
}
