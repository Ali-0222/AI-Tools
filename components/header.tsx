"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { SiteLogo } from "@/components/site-logo";
import { siteTools } from "@/lib/site-data";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function Header() {
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, ready, logout } = useAuth();

  function closeMenus() {
    setDesktopOpen(false);
    setMobileOpen(false);
  }

  return (
    <header className="border-b border-[var(--border)] bg-white">
      <div className="container-shell flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <div onClick={closeMenus}>
          <SiteLogo className="self-start" />
        </div>
        <nav aria-label="Primary" className="flex-1">
          <div className="hidden items-center justify-between md:flex">
            <ul className="flex flex-wrap items-center gap-6 text-sm text-[var(--muted)]">
              <li>
                <Link
                  href="/"
                  onClick={closeMenus}
                  className="font-bold transition hover:text-[var(--foreground)]"
                >
                  Home
                </Link>
              </li>
              <li
                className="relative"
                onMouseEnter={() => setDesktopOpen(true)}
                onMouseLeave={() => setDesktopOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setDesktopOpen((current) => !current)}
                  className="inline-flex appearance-none items-center gap-2 bg-transparent p-0 text-[var(--foreground)] transition hover:text-[var(--foreground)]"
                  style={{ fontWeight: 700 }}
                  aria-expanded={desktopOpen}
                  aria-haspopup="menu"
                >
                  Tools
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    className={`h-4 w-4 transition ${desktopOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {desktopOpen ? (
                  <div className="absolute left-0 top-full z-20 pt-4">
                    <div className="w-80 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
                      <div className="mb-2 px-2">
                        <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                          All Tools
                        </p>
                      </div>
                      <ul className="space-y-1">
                        <li>
                          <Link
                            href="/tools"
                            onClick={closeMenus}
                            className="block rounded-xl px-3 py-2 transition hover:bg-[var(--surface-strong)] hover:text-[var(--foreground)]"
                          >
                            <span className="block font-medium text-[var(--foreground)]">View all tools</span>
                            <span className="block text-xs text-[var(--muted)]">Tools directory</span>
                          </Link>
                        </li>
                        {siteTools.map((tool) => (
                          <li key={tool.slug}>
                            <Link
                              href={`/tools/${tool.slug}`}
                              onClick={closeMenus}
                              className="block rounded-xl px-3 py-2 transition hover:bg-[var(--surface-strong)] hover:text-[var(--foreground)]"
                            >
                              <span className="block font-medium text-[var(--foreground)]">{tool.name}</span>
                              <span className="block text-xs text-[var(--muted)]">
                                {tool.category}
                                {tool.authRequired ? " • login required" : ""}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}
              </li>
              {links.filter((link) => link.href !== "/").map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenus}
                    className="font-bold transition hover:text-[var(--foreground)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              {ready && user ? (
                <>
                  <Link href="/profile" className="text-sm font-semibold text-[var(--foreground)]">
                    {user.name}
                  </Link>
                  <button
                    type="button"
                    onClick={logout}
                    className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-semibold"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="text-sm font-semibold text-[var(--foreground)]">
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--surface)] hover:text-[var(--surface)]"
                    style={{ color: "var(--surface)" }}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <div className="flex flex-wrap gap-3 text-sm text-[var(--muted)]">
              <Link href="/" onClick={closeMenus} className="font-bold transition hover:text-[var(--foreground)]">
                Home
              </Link>
              <Link href="/blog" onClick={closeMenus} className="font-bold transition hover:text-[var(--foreground)]">
                Blog
              </Link>
              <Link href="/about" onClick={closeMenus} className="font-bold transition hover:text-[var(--foreground)]">
                About
              </Link>
              <Link href="/contact" onClick={closeMenus} className="font-bold transition hover:text-[var(--foreground)]">
                Contact
              </Link>
              {ready && user ? (
                <Link href="/profile" onClick={closeMenus} className="font-bold text-[var(--foreground)]">
                  Profile
                </Link>
              ) : (
                <Link href="/auth/login" onClick={closeMenus} className="font-bold text-[var(--foreground)]">
                  Login
                </Link>
              )}
            </div>
            <div className="mt-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3">
              <button
                type="button"
                onClick={() => setMobileOpen((current) => !current)}
                className="flex w-full items-center justify-between text-left text-sm font-semibold text-[var(--foreground)]"
                aria-expanded={mobileOpen}
                aria-haspopup="menu"
              >
                <span>Tools</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className={`h-4 w-4 transition ${mobileOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {mobileOpen ? (
                <ul className="mt-3 space-y-1">
                  <li>
                    <Link
                      href="/tools"
                      onClick={closeMenus}
                      className="block rounded-xl px-3 py-2 text-sm transition hover:bg-[var(--surface-strong)]"
                    >
                      View all tools
                    </Link>
                  </li>
                  {siteTools.map((tool) => (
                    <li key={tool.slug}>
                      <Link
                        href={`/tools/${tool.slug}`}
                        onClick={closeMenus}
                        className="block rounded-xl px-3 py-2 text-sm transition hover:bg-[var(--surface-strong)]"
                      >
                        {tool.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
