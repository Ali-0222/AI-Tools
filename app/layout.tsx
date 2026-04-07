import type { Metadata } from "next";
import Script from "next/script";
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" }
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }]
  },
  description: "Free online tools for images, text, PDF, JSON, and developers. Fast, simple, and client-side.",
  applicationName: siteConfig.name,
  openGraph: {
    title: siteConfig.name,
    description: "Free online tools for images, text, PDF, JSON, and developers with privacy-focused client-side processing.",
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
    description: "Free online tools for images, text, PDF, JSON, and developers with privacy-focused client-side processing.",
    images: ["/twitter-image"]
  },
  alternates: {
    canonical: "/"
  },
  other: {
    "google-adsense-account": siteConfig.adsenseAccount
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsenseAccount}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RJTFPY0G35"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-RJTFPY0G35');`}
        </Script>
      </head>
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
