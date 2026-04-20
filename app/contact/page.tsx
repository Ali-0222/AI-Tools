import { Metadata } from "next";
import { AdSidebar } from "@/components/ad-sidebar";
import { ContactForm } from "@/components/contact-form";
import { SchemaScript } from "@/components/schema-script";
import { buildMetadata, buildWebPageSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const title = "Contact Us";
const description = `Contact ${siteConfig.name} with feedback, suggestions, or general questions through a simple contact form.`;

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/contact"
});

export default function ContactPage() {
  return (
    <main className="container-shell py-8 md:py-12">
      <SchemaScript schema={buildWebPageSchema({ title, description, path: "/contact" })} />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section className="card p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent)]">Contact</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Contact us</h1>
          <p className="mt-3 max-w-2xl text-base text-[var(--muted)]">
            Use the form below to open a prefilled email draft for feedback, corrections, bug
            reports, partnership questions, or policy-related messages.
          </p>
          <div className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm leading-7 text-[var(--muted)]">
            <p>
              Direct contact email:{" "}
              <a href={`mailto:${siteConfig.email}`} className="font-semibold text-[var(--foreground)]">
                {siteConfig.email}
              </a>
            </p>
            <p className="mt-3">
              Messages about factual corrections, broken tools, or unclear policy pages help improve
              the site and are especially useful before requesting a review.
            </p>
          </div>
          <ContactForm />
        </section>
        <AdSidebar />
      </div>
    </main>
  );
}
