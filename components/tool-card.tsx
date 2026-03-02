import Link from "next/link";
import type { ToolDefinition } from "@/lib/site-data";

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--accent)] hover:shadow-[0_12px_24px_rgba(15,23,42,0.08)]"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">{tool.category}</p>
        {tool.authRequired ? (
          <span className="rounded-full bg-[var(--accent-soft)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
            Login
          </span>
        ) : null}
      </div>
      <h2 className="mt-3 text-xl font-bold">{tool.name}</h2>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{tool.description}</p>
      <p className="mt-4 text-sm font-semibold text-[var(--accent)]">Open tool</p>
    </Link>
  );
}
