import { siteConfig } from "@/lib/site-config";
import { siteTools, type ToolDefinition, type ToolKey } from "@/lib/site-data";

export type ToolFaq = {
  question: string;
  answer: string;
};

export function getRelatedTools(currentSlug: ToolKey, limit = 3): ToolDefinition[] {
  const currentTool = siteTools.find((tool) => tool.slug === currentSlug);

  if (!currentTool) {
    return siteTools.filter((tool) => tool.slug !== currentSlug).slice(0, limit);
  }

  const categoryMatches = siteTools.filter(
    (tool) => tool.slug !== currentSlug && tool.category === currentTool.category
  );
  const fallback = siteTools.filter(
    (tool) => tool.slug !== currentSlug && tool.category !== currentTool.category
  );

  return [...categoryMatches, ...fallback].slice(0, limit);
}

export function buildToolFaqs(tool: ToolDefinition): ToolFaq[] {
  return [
    {
      question: `Is ${tool.name} free to use?`,
      answer: `Yes. ${tool.name} is free to use on ${siteConfig.name} with no paid wall for basic usage.`
    },
    {
      question: "Do I need to create an account?",
      answer:
        tool.authRequired
          ? "This tool needs an account for saved data features, so you should sign in before using all capabilities."
          : `No. You can use this tool directly in your browser without creating an account.`
    },
    {
      question: "Are my files or text uploaded to a server?",
      answer:
        "Most processing is done directly in your browser. That keeps your workflow faster and helps reduce unnecessary file transfer risk."
    },
    {
      question: `How accurate is the ${tool.shortTitle.toLowerCase()} result?`,
      answer:
        `The ${tool.name} logic is designed for practical day-to-day usage with predictable output. For business-critical workflows, always review the final result before sharing.`
    },
    {
      question: `Why should I use ${siteConfig.name} instead of random tools?`,
      answer:
        `${siteConfig.name} focuses on speed, clear UI, and privacy-aware browser workflows. You also get a growing set of related tools in one place.`
    }
  ];
}

export function getWhatIsParagraphs(tool: ToolDefinition): string[] {
  return [
    `${tool.name} is a browser-based utility that helps you ${tool.description.toLowerCase()} Instead of installing heavy software, you can open the page, complete the task in a few clicks, and download or copy the result immediately.`,
    `For users who need quick execution, this matters a lot. You avoid setup friction, reduce context switching, and keep your process simple. ${siteConfig.name} is built for these repeat tasks where speed, clarity, and predictable output matter more than complex desktop workflows.`
  ];
}

export function getWhyChooseParagraphs(tool: ToolDefinition): string[] {
  return [
    `${siteConfig.name} keeps each tool focused on one job with a clean flow, clear actions, and minimal confusion. ${tool.name} follows the same pattern so even first-time users can finish quickly without reading long instructions.`,
    "The interface is optimized for desktop and mobile, which helps users complete tasks on whichever device is available. This is useful for students, creators, freelancers, and small teams that often need quick conversions, formatting, or cleanup work while moving between devices.",
    "Performance and trust are also important. Lightweight pages, direct actions, and transparent messaging improve user confidence, reduce bounce rate, and create stronger SEO signals over time."
  ];
}

export function getBestPracticesParagraphs(tool: ToolDefinition): string[] {
  return [
    `For best results with ${tool.name}, start with clean input. For example, use well-structured source text, readable files, or correctly named assets before running the tool. Better input quality almost always produces better output quality.`,
    "After generating output, always run a quick verification pass. Check formatting, readability, dimensions, file size, or document structure depending on your workflow. This extra minute can prevent avoidable errors later.",
    "If you perform similar tasks regularly, combine this page with related tools from the same website. Internal tool chaining saves time and keeps your process consistent."
  ];
}
