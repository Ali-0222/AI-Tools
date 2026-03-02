import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/auth/auth-provider";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.freefasttools.com"),
  title: {
    default: "Easy Web Tools",
    template: "%s | Easy Web Tools"
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
    title: "Easy Web Tools",
    description:
      "Fast, mobile-friendly online tools with privacy-focused client-side processing.",
    type: "website",
    url: "https://www.freefasttools.com"
  },
  twitter: {
    card: "summary_large_image",
    title: "Easy Web Tools",
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
