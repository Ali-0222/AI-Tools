import { siteConfig } from "@/lib/site-config";
import type { BlogPostDefinition } from "@/lib/site-data";

export type BlogSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogFaq = {
  question: string;
  answer: string;
};

function keywordLine(post: BlogPostDefinition) {
  return `${post.primaryKeyword}, ${post.keywords.join(", ")}`;
}

export function buildBlogSections(post: BlogPostDefinition): BlogSection[] {
  return [
    {
      heading: `Why ${post.primaryKeyword} matters right now`,
      paragraphs: [
        `${post.title} is not only a publishing topic, it is a ranking opportunity for utility websites like ${siteConfig.name}. When users search with practical intent, they want clear steps, safe execution, and immediate output. A content page that explains the exact workflow behind ${post.primaryKeyword} can capture informational traffic first and then pass authority to related tools through internal links. This is one of the most reliable ways to grow a tools domain without depending only on home page authority.`,
        `Search engines increasingly reward helpful, task-oriented content. That means your article should avoid fluff and focus on direct value: what to do, why it works, and where users usually fail. For this topic, you should map the searcher journey from problem to outcome, then support each step with small proof points. When that structure is combined with clean metadata and relevant headings, the page becomes easier to index and more likely to earn clicks.`
      ]
    },
    {
      heading: "User intent breakdown before writing",
      paragraphs: [
        `Before publishing, identify the major intent variants behind ${post.primaryKeyword}. Usually there are at least three: beginner intent (basic explanation), execution intent (step-by-step action), and optimization intent (how to get better results). If your article covers only one intent, users bounce and rankings flatten. If you cover all three in a readable flow, dwell time improves and the page starts supporting long-tail keyword expansion.`,
        `For this post, secondary phrases such as ${post.keywords.join(", ")} should appear naturally inside subheadings, intro copy, and FAQs. Do not force-match exact keywords repeatedly; semantic coverage works better than stuffing. The right approach is to answer real questions that include those concepts. This keeps content natural for readers while still signaling topical depth to search crawlers.`
      ]
    },
    {
      heading: "Step-by-step workflow you can apply",
      paragraphs: [
        `Step 1 is setup clarity: define the input, output, and quality target before touching any tool. Step 2 is execution consistency: run one method and avoid random trial-and-error changes across files or text blocks. Step 3 is validation: review result quality, readability, and technical correctness before final use. This simple sequence prevents most avoidable mistakes and makes your output repeatable for teams.`,
        `Step 4 is optimization: measure what changed after your action, such as page speed, readability, conversion clarity, or format correctness. Step 5 is internal linking: route the user to the next task with a contextual link to a related tool. Step 6 is documentation: store mini guidelines for future content or operations. By repeating this cycle, your site improves output quality and builds stronger topical authority over time.`
      ]
    },
    {
      heading: "Common mistakes and how to avoid them",
      paragraphs: [
        `A frequent mistake is publishing generic advice with no practical sequence. Another is using broad titles but shallow bodies that fail to solve the user problem. For ${post.primaryKeyword}, weak content usually skips examples, ignores edge cases, and avoids validation guidance. As a result, readers leave without confidence and search engines treat the page as low-value compared to competitors.`,
        `You can avoid this by adding concrete scenarios, verification checkpoints, and realistic constraints. Mention what happens on mobile, what changes for beginners, and what tradeoffs matter for speed versus quality. Add a short troubleshooting section to capture support-style queries. This turns your article into a durable resource rather than a thin SEO landing page.`
      ]
    },
    {
      heading: "On-page SEO elements that move the needle",
      paragraphs: [
        `Use one clear H1 aligned with ${post.primaryKeyword}. Keep title tags specific, benefit-led, and readable. The meta description should describe outcome and trust factors in one tight summary. Add heading hierarchy (H2/H3) that matches user questions. Keep paragraph length manageable for mobile readers, and place internal links where users naturally need the next step.`,
        `Structured data should support meaning, not manipulate rankings. For blog posts, BlogPosting schema plus FAQ schema works well when the content actually includes those answers. Also, make sure canonical paths, sitemap entries, and robots directives are consistent. Technical cleanliness does not guarantee ranking, but technical mistakes can block otherwise good content from performing.`
      ]
    },
    {
      heading: "Internal linking strategy for topic growth",
      paragraphs: [
        `Each blog page should connect to related tools and relevant sibling articles. This distributes authority and helps crawlers understand topical clusters. For this post, link to the exact tool a reader would use immediately after learning the method. Then link to one complementary article for deeper understanding. Limit links to relevant pathways so the page stays focused.`,
        `Use descriptive anchor text instead of vague labels. A good anchor says what action or concept the user gets next. Over time, these internal connections create stronger entity relationships across your domain. That structure supports both ranking consistency and user completion rates, especially on sites with many utility pages.`
      ]
    },
    {
      heading: "How to evaluate progress realistically",
      paragraphs: [
        `Track performance with practical metrics: impressions, click-through rate, average position, engaged time, and assisted conversions into tool pages. Look at query growth around ${post.primaryKeyword} and related terms to confirm semantic coverage. If impressions rise but clicks stay low, iterate title and description. If clicks rise but engagement drops, improve formatting and clarity.`,
        `Domain authority style scores and traffic authority indexes are third-party estimates, not ranking guarantees. Use them as directional signals only. Real growth comes from publishing consistency, technical health, and genuine usefulness at page level. In short: prioritize user value, then measure, then iterate.`
      ]
    },
    {
      heading: "Action plan for the next 30 days",
      paragraphs: [
        `Week 1: update metadata, headings, and internal links for this post and related tool pages. Week 2: publish one supporting article targeting a close long-tail variation. Week 3: refresh FAQs based on search console query data. Week 4: improve weak paragraphs and add one new example block that resolves common confusion.`,
        `Repeat this cycle monthly for compound impact. SEO wins on utility websites rarely come from one viral page; they come from steady quality and clear topical architecture. If you keep execution disciplined, pages built around ${keywordLine(post)} can build meaningful organic visibility and support your entire tools ecosystem.`
      ]
    }
  ];
}

export function buildBlogFaqs(post: BlogPostDefinition): BlogFaq[] {
  return [
    {
      question: `Can one article about ${post.primaryKeyword} rank quickly?`,
      answer:
        "A single article can rank for some long-tail queries, but stable growth usually comes from cluster depth, internal links, and ongoing updates."
    },
    {
      question: "How many keywords should I target in one post?",
      answer:
        "Use one primary keyword and a small group of semantically related secondary keywords. Focus on solving user intent instead of repeating exact phrases."
    },
    {
      question: "Do DA or authority scores directly improve Google rankings?",
      answer:
        "No. They are third-party metrics. Use them for comparison, but prioritize page quality, relevance, and technical SEO hygiene."
    },
    {
      question: "How often should this article be updated?",
      answer:
        "Review monthly for query shifts, outdated examples, and internal linking opportunities. Refreshing high-potential pages helps sustain rankings."
    }
  ];
}

export function estimateReadingTime(sectionCount: number) {
  const minutes = Math.max(4, Math.round((sectionCount * 180) / 200));
  return `${minutes} min read`;
}
