import Link from "next/link";
import { SiteLogo } from "@/components/site-logo";
import { siteTools } from "@/lib/site-data";

export function Hero() {
  const loginRequiredCount = siteTools.filter((tool) => tool.authRequired).length;

  return (
    <section className="card overflow-hidden p-6 md:p-10">
      <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
        <div>
          <div className="mb-5">
            <SiteLogo href="/" className="pointer-events-none" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
            Fast Online Utility Suite
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
            Free online tools that work directly in your browser
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Compress images, resize files, clean text, format JSON, calculate BMI or age, and merge PDFs without sending your data to a paid API.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/tools"
              className="rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--surface)] transition hover:bg-[var(--accent-strong)] hover:text-[var(--surface)]"
              style={{ color: "var(--surface)" }}
            >
              Explore tools
            </Link>
            <Link
              href="/about"
              className="rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-semibold"
            >
              Learn more
            </Link>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            [String(siteTools.length), "Dedicated tool pages"],
            ["100%", "Client-side processing"],
            [String(loginRequiredCount), "Tool needs login"],
            ["Fast", "Mobile-first layout"]
          ].map(([value, label]) => (
            <div key={label} className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-5">
              <p className="text-3xl font-bold">{value}</p>
              <p className="mt-2 text-sm text-[var(--muted)]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
