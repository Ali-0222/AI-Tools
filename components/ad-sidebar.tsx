import Link from "next/link";

const expectations = [
  "Plain instructions beside tools people actually use for uploads, writing, documents, and debugging.",
  "Quick browser workflows for image, text, PDF, calculator, and developer cleanup jobs.",
  "Honest notes about privacy, limits, and the results that deserve a second look."
];

const workflows = [
  {
    href: "/tools/image-compressor",
    title: "Compress images",
    description: "Shrink or resize photos before forms, job portals, blogs, and email attachments."
  },
  {
    href: "/tools/json-formatter",
    title: "Format JSON",
    description: "Paste messy JSON, format it, and catch syntax errors before using it elsewhere."
  },
  {
    href: "/tools/pdf-merge",
    title: "Merge PDFs",
    description: "Put documents in order and download one combined PDF for sharing or submission."
  }
];

const helpfulLinks = [
  { href: "/about", label: "About the site" },
  { href: "/editorial-guidelines", label: "Editorial guidelines" },
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/terms-and-conditions", label: "Terms of use" },
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
