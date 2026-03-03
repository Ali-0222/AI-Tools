import { Metadata } from "next";
import { StaticPage } from "@/components/static-page";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    `Read the privacy policy for ${siteConfig.name}, including client-side processing, cookies, and ad disclosure details.`,
  alternates: {
    canonical: "/privacy-policy"
  }
};

export default function PrivacyPolicyPage() {
  return (
    <StaticPage
      title="Privacy Policy"
      description={`${siteConfig.name} aims to minimize data collection and process supported tool actions directly in the browser.`}
    >
      <p>
        Most tools on this website work fully on the client side. Files and text entered into supported tools are processed inside your browser and are not stored on our servers.
      </p>
      <p>
        Standard web server logs may still collect technical information such as IP address, browser type, and visit timing for security and analytics purposes.
      </p>
      <p>
        This site may use cookies or similar technologies for analytics and advertising. If Google AdSense or similar ad networks are added later, those services may use cookies to personalize or measure ads.
      </p>
      <p>
        By using this site, users agree that tool outputs are generated automatically and should be reviewed before any important use.
      </p>
    </StaticPage>
  );
}
