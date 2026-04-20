import Link from "next/link";
import { SiteLogo } from "@/components/site-logo";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-[var(--border)] bg-white">
      <div className="container-shell grid gap-6 py-8 md:grid-cols-4">
        <div>
          <SiteLogo />
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Free browser-based tools with supporting guides, clear privacy notes, and focused pages
            for common image, text, PDF, and developer tasks.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            Pages
          </h2>
          <div className="mt-3 flex flex-col gap-2 text-sm text-[var(--muted)]">
            <Link href="/about">About</Link>
            <Link href="/tools">Tools</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            Standards
          </h2>
          <div className="mt-3 flex flex-col gap-2 text-sm text-[var(--muted)]">
            <Link href="/editorial-guidelines">Editorial Guidelines</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/disclaimer">Disclaimer</Link>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            Contact
          </h2>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            Publisher contact:{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-semibold text-[var(--foreground)]">
              {siteConfig.email}
            </a>
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            If advertising is added after approval, ad placements should stay clearly separate from
            navigation, download buttons, and tool actions.
          </p>
        </div>
      </div>
    </footer>
  );
}
