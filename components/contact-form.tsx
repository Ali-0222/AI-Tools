"use client";

import { FormEvent, useState } from "react";
import { ToolButton } from "@/components/tool-shared";
import { siteConfig } from "@/lib/site-config";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent(`Website feedback from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Name</span>
        <input
          required
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Email</span>
        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Message</span>
        <textarea
          required
          rows={7}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3"
        />
      </label>
      <div className="flex flex-wrap gap-3">
        <ToolButton type="submit">Open email draft</ToolButton>
        <a
          href={`mailto:${siteConfig.email}`}
          className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold"
        >
          {siteConfig.email}
        </a>
      </div>
      {submitted ? (
        <p className="text-sm text-[var(--accent-strong)]">
          Your email app should open with a prefilled draft. If it does not, send your message
          directly to {siteConfig.email}.
        </p>
      ) : null}
    </form>
  );
}
