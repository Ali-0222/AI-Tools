import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

type SiteLogoProps = {
  href?: string;
  className?: string;
  compact?: boolean;
};

export function SiteLogo({
  href = "/",
  className = "",
  compact = false
}: SiteLogoProps) {
  const content = (
    <>
      <span className="relative flex h-12 w-12 items-center justify-center rounded-[1.15rem] border border-[var(--border)] bg-[var(--accent-soft)] shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
        <svg
          aria-hidden="true"
          viewBox="0 0 48 48"
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 15c1.8-3.8 4.7-5.7 8-5.7s6.2 1.9 8 5.7" stroke="var(--accent)" />
          <rect x="14" y="16" width="20" height="16" rx="8" fill="var(--accent)" />
          <path d="M20 22h8" stroke="white" />
          <path d="M24 22v6" stroke="white" />
          <path d="M18 36h12" stroke="var(--foreground)" />
          <circle cx="18" cy="18" r="2.5" fill="var(--accent-soft)" stroke="var(--accent)" />
          <circle cx="30" cy="18" r="2.5" fill="var(--accent-soft)" stroke="var(--accent)" />
        </svg>
      </span>
      {compact ? null : (
        <span className="flex flex-col leading-none" style={{marginTop: "5px"}}>
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
            Toolbee
          </span>
          <span className="text-[1.15rem] font-bold tracking-[-0.03em] text-[var(--foreground)]">
            Pro
          </span>
        </span>
      )}
      <span className="sr-only">{siteConfig.name}</span>
    </>
  );

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-3 ${className}`.trim()}
      aria-label={siteConfig.name}
    >
      {content}
    </Link>
  );
}
