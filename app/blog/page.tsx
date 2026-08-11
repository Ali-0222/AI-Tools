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
  "Read practical guides about image optimization, text cleanup, JSON formatting, PDFs, privacy, and online productivity workflows.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/blog"
});

const categories = Array.from(new Set(blogPosts.map((post) => post.category))).map((category) => ({
  name: category,
  count: blogPosts.filter((post) => post.category === category).length
}));

function categoryId(category: string) {
  return `category-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

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
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Helpful guides for common online tasks
          </h1>
          <p className="mt-3 max-w-2xl text-base text-[var(--muted)]">
            These posts explain practical workflows around images, text, JSON, PDFs, privacy, and
            day-to-day browser tools. Each article links back to a relevant tool so readers can
            apply the advice instead of stopping at theory.
          </p>

          <nav
            aria-label="Blog categories"
            className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Browse by category</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <a
                  key={category.name}
                  href={`#${categoryId(category.name)}`}
                  className="rounded-full border border-[var(--border)] px-3 py-2 text-sm font-semibold text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--foreground)]"
                >
                  {category.name} ({category.count})
                </a>
              ))}
            </div>
          </nav>

          <div className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm leading-7 text-[var(--muted)]">
            Articles are written to support real tool usage with checklists, mistakes to avoid, and
            practical notes. Blog images use credited free-image sources such as Unsplash and include
            descriptive alt text instead of generic filenames or copied search-engine images.
          </div>

          <div className="mt-6 space-y-8">
            {categories.map((category) => (
              <section key={category.name} id={categoryId(category.name)}>
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                  {category.name}
                </h2>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {blogPosts
                    .filter((post) => post.category === category.name)
                    .map((post) => {
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
                            <h3 className="mt-3 text-xl font-semibold">{post.title}</h3>
                            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                              {post.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </section>
            ))}
          </div>
        </section>
        <AdSidebar />
      </div>
    </main>
  );
}
