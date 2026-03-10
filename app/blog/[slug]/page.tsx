import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { AdSidebar } from "@/components/ad-sidebar";
import { blogPosts, siteTools } from "@/lib/site-data";
import { SchemaScript } from "@/components/schema-script";
import { buildBlogFaqs, buildBlogSections, estimateReadingTime } from "@/lib/blog-content";
import { getSiteDataLastModified } from "@/lib/sitemap";
import {
  buildBlogPostMetadata,
  buildBlogPostingSchema,
  buildBreadcrumbSchema,
  buildFaqSchema
} from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  return buildBlogPostMetadata(slug);
}

export default async function BlogDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const sections = buildBlogSections(post);
  const faqs = buildBlogFaqs(post);
  const fallbackDate = await getSiteDataLastModified();
  const datePublished = post.publishedAt ?? post.updatedAt ?? fallbackDate;
  const dateModified = post.updatedAt ?? post.publishedAt ?? fallbackDate;
  const relatedTools = post.relatedToolSlugs
    .map((toolSlug) => siteTools.find((tool) => tool.slug === toolSlug))
    .filter((tool): tool is (typeof siteTools)[number] => Boolean(tool));
  const relatedPosts = blogPosts
    .filter((item) => item.slug !== post.slug && item.category === post.category)
    .slice(0, 3);

  return (
    <main className="container-shell py-8 md:py-12">
      <SchemaScript
        schema={[
          buildBlogPostingSchema({
            slug: post.slug,
            title: post.title,
            description: post.description,
            keywords: [post.primaryKeyword, ...post.keywords],
            datePublished,
            dateModified
          }),
          buildFaqSchema(faqs),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` }
          ])
        ]}
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="card prose-copy p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent)]">{post.category}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{post.title}</h1>
          <p className="mt-3 text-base text-[var(--muted)]">{post.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[var(--muted)]">
            <span className="rounded-full bg-[var(--surface-strong)] px-3 py-1">
              {post.category}
            </span>
            <span className="rounded-full bg-[var(--surface-strong)] px-3 py-1">
              {estimateReadingTime(sections.length)}
            </span>
          </div>
          <div className="mt-8 space-y-8">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">FAQs</h2>
            <div className="mt-4 space-y-4">
              {faqs.map((faq) => (
                <article
                  key={faq.question}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4"
                >
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">{faq.question}</h3>
                  <p className="mt-2 text-[var(--muted)]">{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
              Try related tools
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] hover:border-[var(--accent)]"
                >
                  {tool.name}
                </Link>
              ))}
            </div>
          </section>

          {relatedPosts.length > 0 ? (
            <section className="mt-10">
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                Related articles
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {relatedPosts.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] hover:border-[var(--accent)]"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </article>
        {/* <AdSidebar /> */}
      </div>
    </main>
  );
}
