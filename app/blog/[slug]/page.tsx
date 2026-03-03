import { notFound } from "next/navigation";
import { Metadata } from "next";
import { AdSidebar } from "@/components/ad-sidebar";
import { blogPosts } from "@/lib/site-data";
import { SchemaScript } from "@/components/schema-script";
import {
  buildBlogPostMetadata,
  buildBlogPostingSchema,
  buildBreadcrumbSchema
} from "@/lib/seo";

const postBodies: Record<string, string[]> = {
  "how-to-compress-images-for-faster-web-pages": [
    "Large images slow down visual loading, hurt mobile performance, and create a weaker first impression for search visitors. Compression starts with picking the correct dimensions, because shrinking a 4000-pixel image down to a 1200-pixel layout usually has a larger effect than tweaking quality alone.",
    "For most website content, combine right-sized dimensions with moderate quality reduction and modern formats where possible. If a photo still looks good after compression, the lighter file is usually the better SEO choice.",
    "Free browser-based compression tools are useful for quick optimization because users can preview changes and download a smaller file instantly."
  ],
  "why-browser-based-tools-build-user-trust": [
    "Visitors are more likely to trust utility websites that explain what happens to their files and text. Client-side processing provides a concrete privacy message: many tasks can be completed without uploading data to a server.",
    "This also helps speed perception. When the browser handles the work directly, users see immediate feedback instead of waiting for a remote queue.",
    "A trust-focused tools website should also keep static pages available, avoid fake download buttons, and show real content before ads."
  ],
  "json-formatting-mistakes-that-break-apis": [
    "JSON errors often come from trailing commas, missing double quotes, or accidentally mixing JavaScript object syntax with strict JSON syntax.",
    "Formatting tools help by catching parse errors early and re-indenting valid data so developers can inspect structure more easily.",
    "When sending JSON to an API, validate the payload before shipping it into a request flow. It is faster to catch malformed data locally than to debug an unclear backend error."
  ]
};

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  return buildBlogPostMetadata(slug);
}

export default async function BlogDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  const body = postBodies[slug];

  if (!post || !body) {
    notFound();
  }

  return (
    <main className="container-shell py-8 md:py-12">
      <SchemaScript
        schema={[
          buildBlogPostingSchema({
            slug: post.slug,
            title: post.title,
            description: post.description
          }),
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
          <div className="mt-6 space-y-4">
            {body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
        <AdSidebar />
      </div>
    </main>
  );
}
