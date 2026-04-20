import { Metadata } from "next";
import { SchemaScript } from "@/components/schema-script";
import { StaticPage } from "@/components/static-page";
import { buildMetadata, buildWebPageSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const title = "About Us";
const description = `Learn the purpose of ${siteConfig.name} and why the site focuses on simple, free, browser-based utilities.`;

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/about"
});

export default function AboutPage() {
  return (
    <>
      <SchemaScript schema={buildWebPageSchema({ title, description, path: "/about" })} />
      <StaticPage
        title={`About ${siteConfig.name}`}
        description="This site was built to offer practical online utilities, helpful supporting content, and a cleaner user experience than thin one-click tool directories."
      >
        <p>
          {siteConfig.name} focuses on practical utilities for images, text, JSON, calculations,
          and PDFs. The goal is to help people complete common tasks quickly while still
          understanding what the tool does, when to use it, and what to review before relying on
          the result.
        </p>
        <p>
          The site is intentionally structured around dedicated tool pages, supporting guides,
          visible contact information, and accessible policy pages. That approach helps visitors
          understand who runs the site and why each page exists, instead of landing on thin content
          created only to host ads.
        </p>
        <p>
          Every tool is designed to be lightweight, mobile-friendly, and understandable for everyday
          users. Where possible, processing happens inside the browser to reduce unnecessary file
          transfers and keep the workflow fast.
        </p>
        <p>
          The site also publishes supporting articles, workflow notes, and internal links so users
          can move from a problem to a solution instead of bouncing between disconnected pages.
        </p>
        <p>
          Feedback, corrections, and tool suggestions are welcome through the contact page or by
          emailing {siteConfig.email}.
        </p>
      </StaticPage>
    </>
  );
}
