import { Metadata } from "next";
import { StaticPage } from "@/components/static-page";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description:
    `Learn the purpose of ${siteConfig.name} and why the site focuses on simple, free, browser-based utilities.`,
  alternates: {
    canonical: "/about"
  }
};

export default function AboutPage() {
  return (
    <StaticPage
      title={`About ${siteConfig.name}`}
      description="This site was built to offer simple online utilities that are useful, privacy-aware, and easy to access on any device."
    >
      <p>
        {siteConfig.name} focuses on practical utilities for images, text, JSON, calculations, and PDFs. The goal is simple: help users finish common tasks quickly without signups or server-side storage.
      </p>
      <p>
        Every tool is designed to be lightweight, mobile-friendly, and understandable for everyday users. Where possible, processing happens fully inside the browser to reduce privacy concerns and keep the experience fast.
      </p>
      <p>
        The site also includes supporting content pages and blog posts so visitors can understand how the tools work and when to use them.
      </p>
    </StaticPage>
  );
}
