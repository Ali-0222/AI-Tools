"use client";

import { FormEvent, useState } from "react";
import { ToolButton } from "@/components/tool-shared";
import { siteConfig } from "@/lib/site-config";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Name</span>
        <input
          required
          type="text"
          className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Email</span>
        <input
          required
          type="email"
          className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Message</span>
        <textarea
          required
          rows={7}
          className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3"
        />
      </label>
      <div className="flex flex-wrap gap-3">
        <ToolButton type="submit">Send message</ToolButton>
        <a
          href={`mailto:${siteConfig.email}`}
          className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold"
        >
          {siteConfig.email}
        </a>
      </div>
      {submitted ? (
        <p className="text-sm text-[var(--accent-strong)]">
          Demo form submitted. Connect this to your preferred delivery method before launch.
        </p>
      ) : null}
    </form>
  );
}
