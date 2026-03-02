type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  text: string;
  as?: "h1" | "h2";
};

export function SectionHeading({ eyebrow, title, text, as: Tag = "h2" }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">{eyebrow}</p>
      <Tag className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{title}</Tag>
      <p className="mt-3 text-base leading-7 text-[var(--muted)]">{text}</p>
    </div>
  );
}
