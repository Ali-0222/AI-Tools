import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import { AdSidebar } from "@/components/ad-sidebar";
import { SchemaScript } from "@/components/schema-script";
import { blogPosts } from "@/lib/site-data";
import { getBlogVisual } from "@/lib/blog-content";
import { buildCollectionPageSchema, buildMetadata } from "@/lib/seo";

const title = "Online Tools Blog and Workflow Guides";
const description =
  "Read blog articles about image optimization, browser-based tools, JSON formatting, and online productivity topics.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/blog"
});

export default function BlogPage() {
  return (
    <main className="container-shell py-8 md:py-12">
      <SchemaScript
        schema={buildCollectionPageSchema({
          title,
          description,
          path: "/blog",
          itemUrls: blogPosts.map((post) => `/blog/${post.slug}`)
        })}
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section className="card p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent)]">Blog</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Helpful guides for common online tasks</h1>
          <p className="mt-3 max-w-2xl text-base text-[var(--muted)]">
            These posts explain common workflows around images, text, JSON, PDFs, privacy, and
            day-to-day browser-based tools.
          </p>
          <div className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm leading-7 text-[var(--muted)]">
            Articles are meant to support real tool usage with checklists, mistakes to avoid, and
            practical workflow notes. Each guide is connected to a real tool page so visitors can
            move from reading to doing without a dead end.
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {blogPosts.map((post) => {
              const visual = getBlogVisual(post);

              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition hover:border-[var(--accent)] hover:shadow-[0_12px_24px_rgba(15,23,42,0.08)]"
                >
                  <Image
                    src={visual.src}
                    alt={visual.alt}
                    width={700}
                    height={360}
                    sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                    className="h-44 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                      {post.category}
                    </p>
                    <h2 className="mt-3 text-xl font-semibold">{post.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                      {post.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
        <AdSidebar />
      </div>
    </main>
  );
}
