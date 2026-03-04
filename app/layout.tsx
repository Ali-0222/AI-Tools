import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/auth/auth-provider";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SchemaScript } from "@/components/schema-script";
import { buildOrganizationSchema, buildWebsiteSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
    apple: [{ url: "/icon.svg" }]
  },
  description: "Free online tools for images, text, calculations, JSON, and PDFs. Fast, simple, and client-side.",
  applicationName: siteConfig.name,
  openGraph: {
    title: siteConfig.name,
    description: "Fast, mobile-friendly online tools with privacy-focused client-side processing.",
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: siteConfig.name
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: "Fast, mobile-friendly online tools with privacy-focused client-side processing.",
    images: ["/twitter-image"]
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SchemaScript schema={[buildOrganizationSchema(), buildWebsiteSchema()]} />
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
