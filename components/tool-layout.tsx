type ToolLayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  tips: string[];
};

export function ToolLayout({ title, description, children, tips }: ToolLayoutProps) {
  return (
    <main className="py-8 md:py-12">
      <section className="px-4">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] md:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-[var(--muted)] md:text-2xl md:leading-10">
            {description}
          </p>
        </div>
      </section>

      <section className="px-4 pt-8 md:pt-10">
        <div className="mx-auto max-w-5xl rounded-[28px] border border-[var(--border)] bg-[var(--surface-strong)] p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)] md:p-8">
          <div className="mx-auto max-w-3xl">{children}</div>
        </div>
      </section>

      <section className="px-4 pt-8">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
          {[
            [
              "Focused workflow",
              "This page is designed around one clear task so users can complete it without hunting through unrelated screens."
            ],
            [
              "Review the output",
              "Generated files, text, calculations, or conversions should be checked before important use."
            ],
            [
              "More context below",
              "Keep scrolling for use cases, limitations, related tools, and supporting guidance for this workflow."
            ]
          ].map(([heading, text]) => (
            <article
              key={heading}
              className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <h2 className="text-lg font-bold text-[var(--foreground)]">{heading}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 pt-8 md:pt-10">
        <div className="mx-auto max-w-4xl rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
          <h2 className="text-2xl font-bold text-center">How to use this tool</h2>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--muted)] md:text-base">
            {tips.map((tip) => (
              <li key={tip} className="rounded-2xl bg-[var(--surface-strong)] px-4 py-3">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
