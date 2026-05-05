import Link from "next/link";

const expectations = [
  "Clear tool pages with practical instructions and visible next steps.",
  "Browser-first workflows for common image, text, PDF, and developer tasks.",
  "Plain notes about privacy, limitations, and when to double-check results."
];

const workflows = [
  {
    href: "/tools/image-compressor",
    title: "Compress images",
    description: "Prepare photos for forms, blogs, job portals, or email."
  },
  {
    href: "/tools/json-formatter",
    title: "Format JSON",
    description: "Clean, validate, and read structured data more quickly."
  },
  {
    href: "/tools/pdf-merge",
    title: "Merge PDFs",
    description: "Combine documents in the browser without extra desktop software."
  }
];

const helpfulLinks = [
  { href: "/about", label: "About the site" },
  { href: "/editorial-guidelines", label: "Editorial guidelines" },
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/contact", label: "Contact and feedback" }
];

export function AdSidebar() {
  return (
    <aside className="space-y-6 lg:sticky lg:top-6 lg:h-fit" aria-label="Sidebar">
      <section className="card p-5" aria-labelledby="sidebar-expectations">
        <h2 id="sidebar-expectations" className="text-lg font-bold">
          What to expect
        </h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-[var(--muted)]">
          {expectations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="card p-5" aria-labelledby="sidebar-workflows">
        <h2 id="sidebar-workflows" className="text-lg font-bold">
          Popular workflows
        </h2>
        <div className="mt-4 space-y-3">
          {workflows.map((workflow) => (
            <Link
              key={workflow.href}
              href={workflow.href}
              className="block rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 transition hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              <span className="text-sm font-bold text-[var(--foreground)]">{workflow.title}</span>
              <span className="mt-1 block text-sm leading-6 text-[var(--muted)]">
                {workflow.description}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="card p-5" aria-labelledby="sidebar-links">
        <h2 id="sidebar-links" className="text-lg font-bold">
          Helpful links
        </h2>
        <div className="mt-4 flex flex-col gap-3 text-sm font-semibold text-[var(--accent)]">
          {helpfulLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md transition hover:text-[var(--accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </aside>
  );
}
