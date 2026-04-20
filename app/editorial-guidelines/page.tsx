import { Metadata } from "next";
import { SchemaScript } from "@/components/schema-script";
import { StaticPage } from "@/components/static-page";
import { buildMetadata, buildWebPageSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const title = "Editorial Guidelines";
const description =
  "Read how Toolbee Pro plans, reviews, updates, and corrects tool pages, landing pages, and blog content.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/editorial-guidelines"
});

export default function EditorialGuidelinesPage() {
  return (
    <>
      <SchemaScript
        schema={buildWebPageSchema({
          title,
          description,
          path: "/editorial-guidelines"
        })}
      />
      <StaticPage
        title="Editorial Guidelines"
        description="These guidelines explain how the site aims to publish useful pages, avoid thin content, and keep the user experience clear."
      >
        <p>
          {siteConfig.name} is designed as a practical utility site, which means pages should help
          users complete a task, understand the context, and move to the next relevant step without
          misleading design or filler text.
        </p>
        <p>
          Tool pages are expected to include a working utility, clear instructions, supporting
          explanations, limitations, and relevant internal links. Blog posts and landing pages
          should add context, examples, or workflow guidance rather than simply repeat the same
          keywords across many URLs.
        </p>
        <p>
          Pages are reviewed for clarity, duplicate patterns, outdated claims, broken links, and
          navigation quality. When a page no longer provides enough value, it should be improved,
          consolidated, or removed from the main crawl path instead of being kept only to increase
          page count.
        </p>
        <p>
          Corrections and improvement requests can be sent to {siteConfig.email}. Genuine factual
          corrections, UX issues, and privacy concerns are prioritized because they directly affect
          visitor trust.
        </p>
        <p>
          If advertising is added after approval, ad placements should remain clearly labeled,
          separate from navigation or download controls, and secondary to the page's main
          publisher content.
        </p>
      </StaticPage>
    </>
  );
}
