"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { loadCvForUser, type CvRecord } from "@/lib/cv-storage";

export function ProfilePage() {
  const { configured, user, ready } = useAuth();
  const [savedCv, setSavedCv] = useState<CvRecord | null>(null);
  const [loadingCv, setLoadingCv] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || !configured) {
      return;
    }

    let cancelled = false;

    void (async () => {
      try {
        setLoadingCv(true);
        setError("");
        const stored = await loadCvForUser(user.id);
        if (!cancelled) {
          setSavedCv(stored);
        }
      } catch (profileError) {
        if (!cancelled) {
          setError(profileError instanceof Error ? profileError.message : "Unable to load profile.");
        }
      } finally {
        if (!cancelled) {
          setLoadingCv(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [configured, user]);

  if (!ready) {
    return <div className="py-16 text-center text-[var(--muted)]">Loading profile...</div>;
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl rounded-3xl border border-[var(--border)] bg-white p-8 text-center">
        <h1 className="text-4xl font-bold">Profile</h1>
        <p className="mt-4 text-lg text-[var(--muted)]">Login to access your saved CV templates.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/auth/login" className="rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white">
            Login
          </Link>
          <Link href="/auth/register" className="rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-semibold">
            Sign up
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="rounded-3xl border border-[var(--border)] bg-white p-6 md:p-8">
        <h1 className="text-4xl font-bold tracking-tight">My Profile</h1>
        <p className="mt-3 text-lg text-[var(--muted)]">
          {user.name} - {user.email}
        </p>
      </section>
      <section className="rounded-3xl border border-[var(--border)] bg-white p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold">Saved CV Templates</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Manage saved resume content from the CV builder.
            </p>
          </div>
          <Link href="/tools/cv-builder" className="rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white">
            Open CV Builder
          </Link>
        </div>
        {loadingCv ? <p className="mt-6 text-sm text-[var(--muted)]">Loading saved CV...</p> : null}
        {error ? <p className="mt-6 text-sm text-[var(--warn)]">{error}</p> : null}
        {!loadingCv && !error && savedCv ? (
          <div className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] p-5">
            <p className="text-sm font-semibold text-[var(--foreground)]">{savedCv.form.fullName}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{savedCv.form.jobTitle}</p>
            <p className="mt-3 text-sm text-[var(--muted)]">Template: {savedCv.templateId}</p>
          </div>
        ) : null}
        {!loadingCv && !error && !savedCv ? (
          <div className="mt-6 rounded-3xl border border-dashed border-[var(--border)] p-6 text-center text-[var(--muted)]">
            No saved CV yet. Open the CV Builder to choose a template and save it to your profile.
          </div>
        ) : null}
      </section>
    </div>
  );
}
