import Link from "next/link";

export function AdSidebar() {
  return (
    <aside className="space-y-6 lg:sticky lg:top-6 lg:h-fit" aria-label="Sidebar">
      <div className="card p-5">
        <h2 className="text-lg font-bold">What to expect on this site</h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--muted)]">
          <li>Clear tool pages with practical instructions, not just a button and empty space.</li>
          <li>Browser-first workflows for common image, text, PDF, and developer tasks.</li>
          <li>Honest notes about privacy, limitations, and when to double-check results.</li>
        </ul>
      </div>

      <div className="card p-5">
        <h2 className="text-lg font-bold">Site standards</h2>
        <div className="mt-4 space-y-3 text-sm leading-6 text-[var(--muted)]">
          <p>
            Pages are written to help users complete a task, understand the workflow, and find the
            next relevant page without misleading navigation.
          </p>
          <p>
            If ads are enabled after approval, they should remain separate from tool controls and
            never block the core content on the page.
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
