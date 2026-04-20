import { Metadata } from "next";
import { SchemaScript } from "@/components/schema-script";
import { StaticPage } from "@/components/static-page";
import { buildMetadata, buildWebPageSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const title = "Privacy Policy";
const description = `Read the privacy policy for ${siteConfig.name}, including client-side processing, cookies, and ad disclosure details.`;

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
        description={`${siteConfig.name} aims to minimize data collection, explain how browser processing works, and be clear about analytics and advertising technologies.`}
      >
        <p>
          Most tools on this website are designed around browser-side processing. When a tool
          supports local processing, the file or text stays in the browser session and is not
          intentionally stored on our servers as part of the normal workflow.
        </p>
        <p>
          Standard web server logs may still collect technical information such as IP address,
          browser type, device information, referral source, and visit timing for security,
          performance monitoring, and analytics.
        </p>
        <p>
          This site may use cookies or similar technologies for analytics, site performance
          measurement, and service improvement. If advertising is enabled after approval, Google or
          other advertising partners may use cookies to serve, personalize, or measure ads
          according to their own policies.
        </p>
        <p>
          Users should treat generated output as a convenience result, not as legal, medical,
          financial, or compliance advice. Files, calculations, or rewritten text should be reviewed
          before important use.
        </p>
        <p>
          If you contact the site directly, any information you send by email or form is used only
          to respond to the message, handle support, or review the feedback.
        </p>
        <p>
          Questions about privacy can be sent to {siteConfig.email}.
        </p>
      </StaticPage>
    </>
  );
}
