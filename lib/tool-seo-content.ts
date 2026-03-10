import { siteConfig } from "@/lib/site-config";
import { siteTools, type ToolDefinition, type ToolKey } from "@/lib/site-data";

export type ToolFaq = {
  question: string;
  answer: string;
};

export type ToolSeoSection = {
  title: string;
  paragraphs: string[];
};

export type ToolComparisonPoint = {
  title: string;
  description: string;
};

export type ToolSeoData = {
  primaryKeyword: string;
  secondaryKeywords: string[];
  intro: string[];
  detailedGuide: ToolSeoSection[];
  useCases: string[];
  comparison: ToolComparisonPoint[];
  tips: string[];
  faqs: ToolFaq[];
};

type ToolSeoOverride = Partial<ToolSeoData>;

const categoryKeywords: Record<string, string[]> = {
  Image: [
    "compress image without losing quality online free",
    "reduce image size online free",
    "optimize images for seo online"
  ],
  Text: [
    "free online text tools",
    "word counter for students free",
    "character counter online free"
  ],
  Developer: [
    "developer tools online free",
    "json formatter and validator online",
    "online toolkit for developers free"
  ],
  PDF: [
    "merge pdf files free online without watermark",
    "compress pdf file under 1mb",
    "combine pdf files online free"
  ],
  Document: [
    "word to pdf converter online free",
    "free online document tools",
    "convert docx to pdf online"
  ],
  SEO: [
    "seo tools online free",
    "slug generator online",
    "free productivity tools website"
  ]
};

const toolOverrides: Partial<Record<ToolKey, ToolSeoOverride>> = {
  "background-remover": {
    primaryKeyword: "remove background from image online free",
    secondaryKeywords: [
      "free background remover",
      "remove image background and download png",
      "transparent png maker online"
    ],
    faqs: [
      {
        question: "Can I remove background from image for free?",
        answer:
          "Yes. You can upload an image, remove the background, and download a transparent PNG without paid software."
      },
      {
        question: "Why does the edge look rough after background removal?",
        answer:
          "Try adjusting threshold and edge softness. Cleaner source images with clear subject edges usually produce better output."
      }
    ]
  },
  "image-to-text-ocr": {
    primaryKeyword: "image to text converter online free",
    secondaryKeywords: [
      "ocr online free",
      "extract text from image",
      "scan image and copy text"
    ],
    faqs: [
      {
        question: "Is this image to text OCR tool free?",
        answer:
          "Yes. You can upload an image and extract text in your browser, then copy the output for editing."
      },
      {
        question: "How can I improve OCR results?",
        answer:
          "Use high-contrast, sharp images with readable fonts. Blurry photos and shadows can reduce text detection accuracy."
      }
    ]
  },
  "ai-paraphrasing-tool": {
    primaryKeyword: "paraphrasing tool free online",
    secondaryKeywords: [
      "rewrite text online",
      "ai paraphrasing tool for students",
      "sentence rewriter free"
    ],
    faqs: [
      {
        question: "Can I paraphrase text online for free?",
        answer:
          "Yes. Paste your draft, choose tone and rewrite strength, then generate a new version that you can refine."
      },
      {
        question: "Does paraphrased text still need proofreading?",
        answer:
          "Yes. Always review tone, facts, and clarity before publishing or submitting rewritten content."
      }
    ]
  },
  "qr-code-generator": {
    primaryKeyword: "qr code generator online free",
    secondaryKeywords: [
      "create qr code free",
      "qr code generator online",
      "download qr code png"
    ],
    faqs: [
      {
        question: "Can I create a QR code for a URL?",
        answer:
          "Yes. Paste your link, generate the QR code, and download the PNG for sharing or printing."
      },
      {
        question: "Which QR image size should I use?",
        answer:
          "Use larger sizes for print materials and signage, and smaller sizes for quick digital sharing."
      }
    ]
  },
  "image-compressor": {
    primaryKeyword: "compress image without losing quality online free",
    secondaryKeywords: [
      "reduce image size to 50kb online",
      "compress jpeg to 100kb online",
      "image compressor for website speed",
      "reduce photo size for email",
      "online image compressor without upload"
    ],
    detailedGuide: [
      {
        title: "How to compress images without losing quality",
        paragraphs: [
          "Good image compression removes unnecessary file weight while keeping photos and graphics visually clean. In practical SEO workflows this matters because heavy images slow page load, affect Core Web Vitals, and increase bounce rate on mobile devices.",
          `${siteConfig.name} keeps the process simple: upload the image, lower quality gradually, preview the result, and download the optimized version. That helps users hit file-size targets for forms, websites, landing pages, and email attachments without switching between complicated editors.`
        ]
      },
      {
        title: "Best image formats for websites",
        paragraphs: [
          "JPG usually works best for photographs because it can shrink large files efficiently. PNG is useful when you need transparency, sharp logos, or interface elements. If the source format is larger than necessary, convert or resize first and then compress for better final output.",
          "For SEO-focused publishing, file size matters as much as dimensions. A hero image that is visually large but technically lightweight can improve loading performance more than a full-resolution upload straight from a phone or camera."
        ]
      },
      {
        title: "Image compression tips for SEO",
        paragraphs: [
          "Resize images to their real display size before compression whenever possible. A 4000-pixel image compressed down to a smaller file can still be wasteful if the page only shows it at 1200 pixels.",
          "Use compression as part of a publishing checklist: rename files clearly, keep alt text descriptive, and avoid uploading oversized assets. This turns a simple image compressor into a reliable website speed workflow."
        ]
      }
    ],
    useCases: [
      "Reduce product images before uploading them to an ecommerce store.",
      "Compress photos under email or job portal size limits.",
      "Optimize blog images to improve page speed and SEO performance.",
      "Shrink screenshots before sharing them in chat, tickets, or documentation."
    ],
    comparison: [
      {
        title: "Vs desktop editors",
        description: "A browser tool is faster for single-task compression when you do not need layers, batch editing, or full design controls."
      },
      {
        title: "Vs upload-heavy services",
        description: "Client-side compression is useful when users want a simpler privacy model and quicker feedback without waiting for server processing."
      },
      {
        title: "Vs resizing only",
        description: "Resizing changes dimensions, while compression reduces file weight. For best results many users combine both steps."
      }
    ],
    tips: [
      "Start with medium compression and compare the preview before making the file too small.",
      "If you need a strict target like 50KB or 100KB, reduce dimensions slightly before pushing quality too low.",
      "Keep originals if the image may later be reused for print or large displays."
    ],
    faqs: [
      {
        question: "How do I compress an image without losing too much quality?",
        answer:
          "Use gradual compression, check the preview, and stop when the file is clearly smaller but still looks clean at its real display size."
      },
      {
        question: "Can I reduce image size to 50KB or 100KB online?",
        answer:
          "Yes. The easiest method is to combine compression with reasonable dimensions, because very small file targets are hard to reach on large high-resolution images."
      },
      {
        question: "Why is image compression important for SEO?",
        answer:
          "Lighter images help pages load faster, which supports user experience, mobile performance, and stronger technical SEO signals."
      }
    ]
  },
  "word-counter": {
    primaryKeyword: "word counter for students free",
    secondaryKeywords: [
      "word counter for essays online",
      "paragraph word counter online",
      "character counter for instagram captions",
      "online sentence counter tool"
    ],
    detailedGuide: [
      {
        title: "Why writers and students use a word counter",
        paragraphs: [
          "Word limits affect essays, assignments, scholarship forms, blog posts, social captions, and product descriptions. A live counter helps users edit with precision instead of guessing whether a draft is too short or too long.",
          "Because counts update instantly while typing or pasting, the tool becomes useful for both planning and final editing. You can trim extra words, balance paragraphs, or check caption length before publishing."
        ]
      },
      {
        title: "How to stay inside a word limit",
        paragraphs: [
          "Start by pasting the full draft and checking words, characters, and sentences together. If the text exceeds the limit, cut repetition first, then tighten long phrases, and finally shorten examples that do not add much value.",
          "For academic writing, paragraph-level review is helpful because one oversized section can make the entire piece feel unbalanced even when the total word count is acceptable."
        ]
      },
      {
        title: "Best use cases for live text counting",
        paragraphs: [
          "Students can validate essay limits before submission, content teams can control headline or metadata length, and social media managers can keep captions readable for each platform.",
          "This makes the tool useful far beyond simple counting. It becomes part of a repeatable editing workflow for clarity, compliance, and readability."
        ]
      }
    ],
    useCases: [
      "Check essay length before submitting coursework.",
      "Measure Instagram caption or ad copy character limits.",
      "Track blog intro and paragraph balance while editing.",
      "Review sentence count for readability and pacing."
    ],
    comparison: [
      {
        title: "Vs manual counting",
        description: "Manual counting is slow and error-prone, especially when paragraphs are being edited in real time."
      },
      {
        title: "Vs word processor stats",
        description: "A dedicated browser counter is faster when you only need quick counts without opening a full document editor."
      },
      {
        title: "Vs basic counters",
        description: "A better counter shows words, characters, and sentences together so one paste gives a fuller editing view."
      }
    ]
  },
  "json-formatter": {
    primaryKeyword: "json formatter and validator online",
    secondaryKeywords: [
      "json beautifier free online",
      "json validator online free",
      "developer tools online free"
    ],
    detailedGuide: [
      {
        title: "Why JSON formatting matters",
        paragraphs: [
          "Raw JSON becomes difficult to debug when everything is on one line or when syntax errors are hidden inside nested objects. Formatting improves readability, while validation helps developers catch broken commas, quotes, brackets, and data structure issues early.",
          "That matters in APIs, frontend configuration, test fixtures, and integrations where one invalid character can break requests or produce misleading output."
        ]
      },
      {
        title: "How to beautify and validate JSON safely",
        paragraphs: [
          "Paste the JSON payload into the editor and run formatting to normalize indentation. If the tool shows an error, fix the invalid section first before copying the output back into your app, API client, or config file.",
          "For repetitive debugging, pair JSON validation with URL encoding or Base64 tools when payloads move across request layers."
        ]
      },
      {
        title: "Best developer use cases",
        paragraphs: [
          "Developers use JSON formatters during API testing, log inspection, webhook debugging, frontend mock data cleanup, and documentation writing. A lightweight browser formatter is often faster than opening an IDE when you only need one quick check.",
          "This also makes the tool useful for support teams or analysts who need readable JSON but do not work inside development environments full time."
        ]
      }
    ],
    useCases: [
      "Beautify API responses before debugging nested objects.",
      "Validate request payloads before sending them to a backend.",
      "Clean example JSON for docs, tickets, or tutorials.",
      "Inspect webhook data quickly without opening an IDE."
    ],
    comparison: [
      {
        title: "Vs IDE formatting",
        description: "A browser formatter is quicker when you only need a one-off validation task instead of a full project workspace."
      },
      {
        title: "Vs API clients",
        description: "API tools format responses, but a standalone formatter is useful when the JSON comes from logs, docs, or copied text."
      },
      {
        title: "Vs plain beautifiers",
        description: "Validation matters because pretty output is only useful when the JSON is also syntactically correct."
      }
    ]
  },
  "pdf-merge": {
    primaryKeyword: "merge pdf files free online without watermark",
    secondaryKeywords: [
      "combine pdf files online free",
      "merge pdf online free",
      "pdf tools online free"
    ],
    detailedGuide: [
      {
        title: "Why PDF merge tools get so much search traffic",
        paragraphs: [
          "PDF merging is one of the most common document tasks on the web because users frequently need to combine invoices, applications, reports, scanned pages, and contracts into one file.",
          "A good merge workflow should be fast, predictable, and easy on mobile. Users usually care less about advanced editing and more about getting one clean downloadable document in the right order."
        ]
      },
      {
        title: "How to merge PDF files cleanly",
        paragraphs: [
          "Before merging, arrange files in the order readers should follow. Check file names first so the final document reflects the intended sequence and avoids confusion after download.",
          "If the source files come from scans or exported documents, keep page dimensions and readability in mind. Merging combines files, but it does not fix source quality problems automatically."
        ]
      },
      {
        title: "When to use merge before other PDF steps",
        paragraphs: [
          "Many users merge first and compress later so the final file is both complete and smaller. That is especially helpful for submissions to portals with size limits.",
          "A merged PDF is also easier to archive, share with clients, or attach to email compared with sending multiple separate files."
        ]
      }
    ],
    useCases: [
      "Combine resume, cover letter, and certificates into one file.",
      "Merge invoices or receipts before sharing with accounting teams.",
      "Join scanned document pages into a single submission PDF.",
      "Create one downloadable packet for applications and forms."
    ],
    comparison: [
      {
        title: "Vs desktop PDF suites",
        description: "Desktop software offers more editing controls, but browser merging is faster for straightforward combine-and-download tasks."
      },
      {
        title: "Vs watermark tools",
        description: "Users prefer clean output for professional submissions, so free merging without branding friction is a stronger value."
      },
      {
        title: "Vs zip attachments",
        description: "One merged PDF is easier for recipients to open, preview, and review than multiple separate files in an archive."
      }
    ]
  }
};

function buildCategoryFallback(tool: ToolDefinition): ToolSeoData {
  const categoryKeywordList = categoryKeywords[tool.category] ?? [
    "free online tools",
    "all in one online tools website",
    "free productivity tools website"
  ];
  const primaryKeyword = categoryKeywordList[0];
  const secondaryKeywords = categoryKeywordList.slice(1);

  return {
    primaryKeyword,
    secondaryKeywords,
    intro: [
      `${tool.name} helps users ${tool.description.toLowerCase()} This page is designed for people who want a fast browser workflow instead of opening heavy software or signing up for a paid service.`,
      `${siteConfig.name} keeps this ${tool.category.toLowerCase()} page focused on one clear task, with practical explanations and related tools that help users move through the workflow without confusion.`
    ],
    detailedGuide: [
      {
        title: `What is ${tool.name.toLowerCase()} and how does it work`,
        paragraphs: [
          `${tool.name} is a focused online utility built for quick execution. You open the page, add your input, run the action, and immediately use the output without moving through unnecessary screens or setup steps.`,
          "This matters because clear instructions and a simple workflow help users finish the job faster with fewer mistakes."
        ]
      },
      {
        title: `Why people use ${tool.shortTitle.toLowerCase()} online`,
        paragraphs: [
          `A browser-based ${tool.shortTitle.toLowerCase()} workflow is useful when speed matters. Students, developers, marketers, office users, and freelancers often need a result in seconds rather than a full software workflow.`,
          "This is especially helpful when someone needs a quick result on a shared computer, a phone, or a machine without extra software installed."
        ]
      },
      {
        title: `${tool.name} tips for better results`,
        paragraphs: [
          "Start with clean input and review the final output before sharing or publishing it. Most quick online workflows become more reliable when the source file or text is already well structured.",
          `If you repeat similar tasks often, combine ${tool.name} with related tools from the same site to create a faster workflow and stronger internal navigation paths.`
        ]
      }
    ],
    useCases: [
      `Use ${tool.name} during everyday ${tool.category.toLowerCase()} tasks without installing extra software.`,
      "Complete quick one-off jobs on desktop or mobile when speed matters.",
      "Handle practical school, work, or publishing tasks directly in the browser."
    ],
    comparison: [
      {
        title: "Vs full software suites",
        description: "Dedicated software gives more controls, while focused online tools win on speed and simplicity for short tasks."
      },
      {
        title: "Vs generic utility websites",
        description: "A cleaner single-purpose page reduces clutter and helps users complete the task faster."
      },
      {
        title: "Vs manual workflows",
        description: "Automation reduces repetitive effort and usually produces more consistent output."
      }
    ],
    tips: [
      `Use ${tool.name} with clear source input for more predictable output.`,
      "Review the result once before downloading, copying, or sharing it.",
      "Open related tools when your workflow has more than one step."
    ],
    faqs: [
      {
        question: `Is ${tool.name} free to use?`,
        answer: `Yes. ${tool.name} is available on ${siteConfig.name} as a free browser-based tool for everyday use.`
      },
      {
        question: "Do I need to upload data to a server?",
        answer:
          "Most workflows on this website are designed around in-browser processing so users can finish tasks quickly with a simpler privacy model."
      },
      {
        question: `Who should use ${tool.name}?`,
        answer:
          `This tool is useful for anyone who needs quick ${tool.category.toLowerCase()} tasks completed online, especially students, creators, office users, and developers.`
      }
    ]
  };
}

export function getToolSeoData(tool: ToolDefinition): ToolSeoData {
  const fallback = buildCategoryFallback(tool);
  const override = toolOverrides[tool.slug];

  if (!override) {
    return fallback;
  }

  return {
    primaryKeyword: override.primaryKeyword ?? fallback.primaryKeyword,
    secondaryKeywords: override.secondaryKeywords ?? fallback.secondaryKeywords,
    intro: override.intro ?? fallback.intro,
    detailedGuide: override.detailedGuide ?? fallback.detailedGuide,
    useCases: override.useCases ?? fallback.useCases,
    comparison: override.comparison ?? fallback.comparison,
    tips: override.tips ?? fallback.tips,
    faqs: [...fallback.faqs, ...(override.faqs ?? [])]
  };
}

export function getToolHeading(tool: ToolDefinition): string {
  const seoData = getToolSeoData(tool);
  return seoData.primaryKeyword.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function getToolDescription(tool: ToolDefinition): string {
  const seoData = getToolSeoData(tool);
  return `${tool.pageDescription} Use ${tool.name.toLowerCase()} for ${seoData.secondaryKeywords
    .slice(0, 2)
    .join(" and ")}.`;
}

export function getToolKeywords(tool: ToolDefinition): string[] {
  const seoData = getToolSeoData(tool);

  return [
    seoData.primaryKeyword,
    ...seoData.secondaryKeywords,
    tool.name.toLowerCase(),
    tool.slug.replace(/-/g, " "),
    `${tool.category.toLowerCase()} tool`,
    "free online tools"
  ];
}

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
  return getToolSeoData(tool).faqs;
}
