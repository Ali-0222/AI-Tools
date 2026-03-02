import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-[var(--border)] bg-white">
      <div className="container-shell grid gap-6 py-8 md:grid-cols-3">
        <div>
          <h2 className="text-lg font-bold">Easy Web Tools</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Free browser-based tools for images, text, JSON, health calculators, and PDFs.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            Pages
          </h2>
          <div className="mt-3 flex flex-col gap-2 text-sm text-[var(--muted)]">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/disclaimer">Disclaimer</Link>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            Ad Notice
          </h2>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Placeholder ad zones are kept away from primary actions. Core content remains visible without ads.
          </p>
        </div>
      </div>
    </footer>
  );
}
