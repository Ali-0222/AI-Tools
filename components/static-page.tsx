import { AdSidebar } from "@/components/ad-sidebar";

type StaticPageProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function StaticPage({ title, description, children }: StaticPageProps) {
  return (
    <main className="container-shell py-8 md:py-12">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="card prose-copy p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Site Information</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
          <p className="mt-3 text-base text-[var(--muted)]">{description}</p>
          <div className="mt-6 space-y-4">{children}</div>
        </article>
        {/* <AdSidebar /> */}
      </div>
    </main>
  );
}
