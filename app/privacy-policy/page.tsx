import { Metadata } from "next";
import { SchemaScript } from "@/components/schema-script";
import { StaticPage } from "@/components/static-page";
import { buildMetadata, buildWebPageSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const title = "Privacy Policy";
const description = `Read the privacy policy for ${siteConfig.name}, including browser processing, Google Analytics, Google AdSense, cookies, and contact data.`;

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/privacy-policy"
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <SchemaScript schema={buildWebPageSchema({ title, description, path: "/privacy-policy" })} />
      <StaticPage
        title="Privacy Policy"
        description={`${siteConfig.name} explains how browser processing, analytics, advertising, and contact messages are handled.`}
      >
        <h2>Browser-based tool processing</h2>
        <p>
          Many tools on this website are designed to process files or text in the browser. When a
          tool supports local processing, the input stays in the browser session and is not
          intentionally stored on our servers as part of that normal workflow.
        </p>
        <p>
          Some features may work differently if they involve accounts, saved drafts, external
          libraries, or browser storage. Tool pages include notes where a result needs extra review
          before it is reused.
        </p>

        <h2>Analytics and basic technical data</h2>
        <p>
          Standard web server logs may collect technical information such as IP address, browser
          type, device information, referral source, page URL, and visit timing for security,
          performance monitoring, troubleshooting, and analytics.
        </p>
        <p>
          This site may use Google Analytics to understand which pages are useful, how visitors move
          through the site, and where performance or content improvements are needed. Analytics data
          is reviewed in aggregate and is not used to personally identify visitors by the site owner.
        </p>

        <h2>Advertising and cookies</h2>
        <p>
          This site may use Google AdSense or other advertising partners to show, personalize, and
          measure ads. Google and its partners may use cookies, device identifiers, or similar
          technologies to serve ads based on a visitor's prior visits to this and other websites.
        </p>
        <p>
          Visitors can manage ad personalization through their Google account settings and browser
          cookie controls. Blocking cookies may affect analytics, advertising, or some website
          preferences, but the main informational pages remain accessible.
        </p>

        <h2>Contact messages</h2>
        <p>
          If you contact the site directly, the name, email address, and message you provide are used
          only to respond to the request, review feedback, investigate a bug, or handle a correction.
        </p>

        <h2>Important output review</h2>
        <p>
          Users should treat generated output as a convenience result, not as legal, medical,
          financial, or compliance advice. Files, calculations, OCR text, rewritten drafts, and
          formatted data should be reviewed before important use.
        </p>
        <p>Questions about privacy can be sent to {siteConfig.email}.</p>
      </StaticPage>
    </>
  );
}
