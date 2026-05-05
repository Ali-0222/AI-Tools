import Link from "next/link";

export function AdSidebar() {
  return (
    <aside className="space-y-6 lg:sticky lg:top-6 lg:h-fit" aria-label="Sidebar">
      <div className="card p-5">
        <h2 className="text-lg font-bold">What to expect</h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--muted)]">
          <li>Clear tool pages with practical instructions and visible next steps.</li>
          <li>Browser-first workflows for common image, text, PDF, and developer tasks.</li>
          <li>Plain notes about privacy, limitations, and when to double-check results.</li>
        </ul>
      </div>

      <div className="card p-5">
        <h2 className="text-lg font-bold">Popular workflows</h2>
        <div className="mt-4 space-y-3 text-sm leading-6 text-[var(--muted)]">
          <p>
            Compress or resize images before uploading them to forms, blogs, job portals, or email.
          </p>
          <p>
            Clean text, format JSON, merge PDFs, and create QR codes without installing extra
            desktop software.
          </p>
        </div>
      </div>

      <div className="card p-5">
        <h2 className="text-lg font-bold">Helpful links</h2>
        <div className="mt-4 flex flex-col gap-3 text-sm font-semibold text-[var(--accent)]">
          <Link href="/about">About the site</Link>
          <Link href="/editorial-guidelines">Editorial guidelines</Link>
          <Link href="/privacy-policy">Privacy policy</Link>
          <Link href="/contact">Contact and feedback</Link>
        </div>
      </div>
    </aside>
  );
}
