import Link from "next/link";
import { Metadata } from "next";
import { AdSidebar } from "@/components/ad-sidebar";
import { SchemaScript } from "@/components/schema-script";
import { blogPosts } from "@/lib/site-data";
import { buildCollectionPageSchema, buildMetadata } from "@/lib/seo";

const title = "Blog";
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
            These posts explain common workflows around images, text, JSON, PDFs, privacy, and day-to-day browser-based tools.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">{post.category}</p>
                <h2 className="mt-3 text-xl font-semibold">{post.title}</h2>
                <p className="mt-2 text-sm text-[var(--muted)]">{post.description}</p>
              </Link>
            ))}
          </div>
        </section>
        {/* <AdSidebar /> */}
      </div>
    </main>
  );
}
