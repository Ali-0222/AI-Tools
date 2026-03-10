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
      heading: `What ${post.primaryKeyword} means in practice`,
      paragraphs: [
        `${post.title} focuses on a practical task that people run into during publishing, design, development, or everyday online work. Instead of treating ${post.primaryKeyword} as a vague concept, this guide explains when it matters, what usually goes wrong, and how to get a cleaner result with less trial and error.`,
        `${siteConfig.name} uses these articles to support the tools with context that helps users make better decisions. The goal is simple: understand the task, apply the right steps, and avoid the common mistakes that waste time or reduce output quality.`
      ]
    },
    {
      heading: "Why this topic matters",
      paragraphs: [
        `Small workflow mistakes can create bigger problems later, whether that means oversized files, broken formatting, unreadable output, or avoidable rework. That is why it helps to understand not only what to do, but also why the order of steps and the quality checks matter.`,
        `For topics around ${keywordLine(post)}, users usually want a method that is easy to repeat. A practical guide should help beginners get started quickly while still giving experienced users a few checks that keep output consistent.`
      ]
    },
    {
      heading: "Step-by-step workflow",
      paragraphs: [
        "Start by defining the input and the final goal. Know what file, text, or data you are working with, what the final output should look like, and what constraints matter most, such as file size, readability, formatting, or compatibility.",
        "Next, apply one clean method from start to finish instead of trying random changes. Review the result, compare it with the original, and make one adjustment at a time. This keeps the workflow easier to control and makes it simpler to repeat later."
      ]
    },
    {
      heading: "Common mistakes to avoid",
      paragraphs: [
        `A frequent mistake is rushing straight to the tool without checking the source input. If the original file or text is messy, badly structured, or much larger than needed, the final result often stays weaker than expected.`,
        `Another common issue is over-correcting. People often push quality too low, make too many edits at once, or skip the final verification pass. A quick review at the end usually prevents most avoidable problems.`
      ]
    },
    {
      heading: "Practical tips for better results",
      paragraphs: [
        "Keep the workflow simple, especially on the first pass. Make one change, review the output, and only then decide whether another adjustment is needed. This is faster than undoing multiple changes later.",
        "When possible, pair the article with the most relevant tool page and one related topic. That gives users a clear next step instead of leaving them to figure out the workflow alone."
      ]
    },
    {
      heading: "When to use related tools",
      paragraphs: [
        "Some tasks work better when combined with a second step. For example, you might resize before compressing, format before validating, or clean text before converting it. Knowing the right sequence usually improves both speed and final quality.",
        `If you revisit this process often, save a small checklist based on ${post.primaryKeyword}. Over time that turns a one-off fix into a more reliable routine for work, study, or publishing tasks.`
      ]
    }
  ];
}

export function buildBlogFaqs(post: BlogPostDefinition): BlogFaq[] {
  return [
    {
      question: `Who should read this guide about ${post.primaryKeyword}?`,
      answer:
        "This guide is useful for anyone who wants a faster, clearer workflow around the topic, especially students, creators, office users, and developers."
    },
    {
      question: "Do I need a separate tool after reading this article?",
      answer:
        "Often yes. The article explains the method, while the related tool helps you apply the step quickly in the browser."
    },
    {
      question: "How can I get better results from this workflow?",
      answer:
        "Start with clean input, make one adjustment at a time, and always review the final result before sharing or publishing it."
    },
    {
      question: "Should I revisit this guide later?",
      answer:
        "Yes, especially if your workflow changes or if you start handling bigger files, more complex inputs, or stricter quality requirements."
    }
  ];
}

export function estimateReadingTime(sectionCount: number) {
  const minutes = Math.max(4, Math.round((sectionCount * 180) / 200));
  return `${minutes} min read`;
}
