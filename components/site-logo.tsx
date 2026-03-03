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
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--accent),var(--accent-strong))] shadow-[0_12px_30px_rgba(14,116,144,0.24)]">
        <svg
          aria-hidden="true"
          viewBox="0 0 48 48"
          className="h-7 w-7 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 17h22" />
          <path d="M24 17v14" />
          <path d="M18 31h12" />
          <path d="M12 24c3-7 8-10 12-10s9 3 12 10c-3 7-8 10-12 10s-9-3-12-10Z" />
          <circle cx="24" cy="24" r="3.5" fill="currentColor" stroke="none" />
        </svg>
      </span>
      {compact ? null : (
        <span className="flex flex-col leading-none">
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
            Toolbee
          </span>
          <span className="text-xl font-bold tracking-tight text-[var(--foreground)]">
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
