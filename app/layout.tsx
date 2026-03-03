import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/auth/auth-provider";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description:
    "Free online tools for images, text, calculations, JSON, and PDFs. Fast, simple, and client-side.",
  keywords: [
    "free online tools",
    "image compressor",
    "word counter",
    "json formatter",
    "pdf merge",
    "seo tools website"
  ],
  openGraph: {
    title: siteConfig.name,
    description:
      "Fast, mobile-friendly online tools with privacy-focused client-side processing.",
    type: "website",
    url: siteConfig.url
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description:
      "Fast, mobile-friendly online tools with privacy-focused client-side processing."
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
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
