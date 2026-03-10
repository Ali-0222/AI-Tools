import type { ToolKey } from "@/lib/site-data";

type LandingPageSlug =
  | "compress-image-to-50kb"
  | "compress-image-to-100kb"
  | "compress-image-to-200kb"
  | "merge-pdf-files-free-online-without-watermark"
  | "json-formatter-and-validator-online"
  | "word-counter-for-students-free";

export type LandingPageDefinition = {
  slug: LandingPageSlug;
  toolSlug: ToolKey;
  title: string;
  description: string;
  h1: string;
  intro: string;
  keywords: string[];
  relatedHeading: string;
  relatedLinks: Array<{
    href: string;
    label: string;
  }>;
  tips: string[];
  sections: Array<{
    title: string;
    paragraphs: string[];
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export const landingPages: LandingPageDefinition[] = [
  {
    slug: "compress-image-to-50kb",
    toolSlug: "image-compressor",
    title: "Compress Image To 50KB Online Free",
    description:
      "Compress image to 50KB online free with a fast browser-based image compressor. Reduce file size for forms, portals, and email attachments.",
    h1: "Compress Image To 50KB Online Free",
    intro:
      "Use this page when you need a strict small file size for forms, government portals, exam applications, job sites, or email attachments. Upload the image, reduce quality gradually, and download the lighter file directly in your browser.",
    keywords: [
      "compress image to 50kb online free",
      "reduce image size to 50kb online",
      "compress jpeg to 50kb online",
      "online image compressor without upload",
      "compress image without losing quality online free"
    ],
    relatedHeading: "Related image pages",
    relatedLinks: [
      { href: "/tools/image-compressor", label: "Image Compressor" },
      { href: "/tools/image-resizer", label: "Image Resizer" },
      { href: "/tools/jpg-to-png", label: "JPG to PNG Converter" }
    ],
    tips: [
      "Start with a medium quality setting, then lower it step by step until the file reaches around 50KB.",
      "If the image is still too large, resize dimensions first and then compress again.",
      "Use JPG output for photos because it usually reaches smaller file sizes more easily than PNG."
    ],
    sections: [
      {
        title: "How to compress an image to 50KB",
        paragraphs: [
          "A 50KB limit is common on forms that only accept very small photos or scanned images. The fastest workflow is to upload the file, reduce compression quality carefully, and check the output size after each attempt.",
          "If the file starts very large, compression alone may not be enough. In that case, reduce width and height first, then compress again until the file gets close to the target without becoming unreadable."
        ]
      },
      {
        title: "Best use cases for 50KB images",
        paragraphs: [
          "This target is useful for ID photos, signatures, profile uploads, exam applications, and small website assets where strict file-size rules matter more than perfect visual quality.",
          "For marketing images or detailed screenshots, 50KB can be too aggressive unless the image is physically small. Use this target mainly when a portal or form requires it."
        ]
      },
      {
        title: "Tips to reach 50KB faster",
        paragraphs: [
          "Crop empty space before compression because unnecessary background increases file size without adding value. Photos with simple backgrounds usually compress better than highly detailed images.",
          "If the image contains text, avoid compressing too hard. Lowering dimensions slightly often preserves readability better than pushing quality extremely low."
        ]
      }
    ],
    faqs: [
      {
        question: "Can I compress a photo exactly to 50KB?",
        answer:
          "Often yes, but exact size depends on the original image dimensions, format, and detail level. Large detailed photos may need resizing first."
      },
      {
        question: "Why is my image still above 50KB after compression?",
        answer:
          "The source image may be too large or too detailed. Reduce dimensions and try again with a slightly lower quality setting."
      }
    ]
  },
  {
    slug: "compress-image-to-100kb",
    toolSlug: "image-compressor",
    title: "Compress Image To 100KB Online Free",
    description:
      "Compress image to 100KB online free for web uploads, applications, and email. Reduce image size without losing too much quality.",
    h1: "Compress Image To 100KB Online Free",
    intro:
      "This page is built for one of the most common file-size targets on the web. Use it to compress images for forms, profile uploads, attachments, and content workflows while keeping visual quality practical.",
    keywords: [
      "compress image to 100kb online free",
      "reduce image size to 100kb online",
      "compress jpeg to 100kb online",
      "image compressor for website speed",
      "compress image without losing quality online free"
    ],
    relatedHeading: "Related image pages",
    relatedLinks: [
      { href: "/tools/image-compressor", label: "Image Compressor" },
      { href: "/tools/image-resizer", label: "Image Resizer" },
      { href: "/tools/jpg-to-png", label: "JPG to PNG Converter" }
    ],
    tips: [
      "100KB is usually reachable for standard photos without making them look heavily damaged.",
      "If the file is far above 100KB, resize the image to a realistic display size before compressing.",
      "Preview the result before download so the final image stays sharp enough for its actual use case."
    ],
    sections: [
      {
        title: "Why 100KB is a popular image target",
        paragraphs: [
          "Many websites, job portals, and profile systems accept images around 100KB because the size is small enough for quick uploads but still large enough for acceptable visual clarity.",
          "This target can also help reduce page weight on image-heavy layouts without pushing quality too low."
        ]
      },
      {
        title: "How to reduce image size to 100KB online",
        paragraphs: [
          "Upload the image, start with moderate compression, and check the output size. If the file is close to 100KB, small quality adjustments are usually enough to hit the target cleanly.",
          "For very large phone photos, resize dimensions first. This usually gives better visual results than extreme compression on the full-resolution file."
        ]
      },
      {
        title: "When 100KB works best",
        paragraphs: [
          "A 100KB target works well for website thumbnails, blog images, form uploads, and everyday email attachments. It is a practical middle ground between tiny file size and usable image quality.",
          "If you need a hero image or full-width banner, aim higher than 100KB and optimize dimensions according to the actual layout."
        ]
      }
    ],
    faqs: [
      {
        question: "Is 100KB a good size for website images?",
        answer:
          "For thumbnails, profile images, and many content blocks, yes. For large banners or highly detailed graphics, you may need a larger file."
      },
      {
        question: "Can I reduce JPEG to 100KB without losing quality?",
        answer:
          "You can usually reduce JPEG to around 100KB with only minor visible loss if the dimensions are reasonable for the intended use."
      }
    ]
  },
  {
    slug: "compress-image-to-200kb",
    toolSlug: "image-compressor",
    title: "Compress Image To 200KB Online Free",
    description:
      "Compress image to 200KB online free for websites, blogs, forms, and email. Keep better quality while reducing file size in your browser.",
    h1: "Compress Image To 200KB Online Free",
    intro:
      "Use this page when you want a lighter image but still need stronger quality than very small targets like 50KB. A 200KB goal is useful for content publishing, document uploads, and cleaner previews.",
    keywords: [
      "compress image to 200kb online free",
      "reduce image size to 200kb online",
      "compress jpeg to 200kb online",
      "optimize images for web online",
      "compress image without losing quality online free"
    ],
    relatedHeading: "Related image pages",
    relatedLinks: [
      { href: "/tools/image-compressor", label: "Image Compressor" },
      { href: "/tools/image-resizer", label: "Image Resizer" },
      { href: "/tools/jpg-to-png", label: "JPG to PNG Converter" }
    ],
    tips: [
      "A 200KB target usually keeps better detail, making it a safer option for blog images and shared documents.",
      "Resize oversized phone images before compression so you save file weight without wasting pixels.",
      "Use the preview to balance clarity and speed instead of choosing the lowest possible quality."
    ],
    sections: [
      {
        title: "Why compress images to 200KB",
        paragraphs: [
          "A 200KB file size is often a practical target for users who want faster uploads and better page speed without pushing image quality too low. It gives more room for detail than ultra-small file limits.",
          "This is especially useful for website content, blog graphics, portfolio images, and document attachments where appearance still matters."
        ]
      },
      {
        title: "How to get better quality at 200KB",
        paragraphs: [
          "Instead of heavy compression, first match the image dimensions to the real display size. Once the image is not oversized, moderate compression is often enough to reach around 200KB while preserving a cleaner look.",
          "This approach is usually better than trying to force a very large photo down to a low file size with quality alone."
        ]
      },
      {
        title: "Best scenarios for 200KB output",
        paragraphs: [
          "This target works well for featured images, article visuals, downloadable previews, and uploads where portals allow a bit more space than strict ID-photo forms.",
          "It is also a useful compromise for users optimizing multiple images for speed but still caring about presentation quality."
        ]
      }
    ],
    faqs: [
      {
        question: "Is 200KB better than 100KB for large images?",
        answer:
          "It depends on image size and placement. A 200KB file can be better when it preserves clarity on larger content areas, but smaller is usually better if quality remains acceptable."
      },
      {
        question: "Should I choose 200KB instead of 50KB?",
        answer:
          "Choose 200KB when visual quality matters and there is no strict form limit. Choose 50KB only when a portal or workflow demands a very small file."
      }
    ]
  },
  {
    slug: "merge-pdf-files-free-online-without-watermark",
    toolSlug: "pdf-merge",
    title: "Merge PDF Files Free Online Without Watermark",
    description:
      "Merge PDF files free online without watermark using a browser-based PDF merge tool. Combine multiple PDFs into one clean document in seconds.",
    h1: "Merge PDF Files Free Online Without Watermark",
    intro:
      "Use this page to combine multiple PDF files into one document without adding branding or moving through a complicated workflow. It works well for resumes, invoices, scanned pages, forms, and document packets.",
    keywords: [
      "merge pdf files free online without watermark",
      "combine pdf files online free",
      "merge pdf online free",
      "join pdf files online",
      "free pdf merge tool"
    ],
    relatedHeading: "Related document pages",
    relatedLinks: [
      { href: "/tools/pdf-merge", label: "PDF Merge Tool" },
      { href: "/tools/word-to-pdf", label: "Word to PDF Converter" },
      { href: "/tools/image-compressor", label: "Image Compressor" }
    ],
    tips: [
      "Arrange PDFs in the correct order before merging so the final file reads cleanly.",
      "Use clear file names if you are combining many pages from different sources.",
      "If the final file becomes too large, compress source files or split the workflow into smaller batches."
    ],
    sections: [
      {
        title: "How to merge PDF files online",
        paragraphs: [
          "Start by uploading the PDF files you want to combine, then confirm the reading order before merging. This keeps the output document easy to review and avoids redoing the task later.",
          "A simple merge workflow is especially useful when you need one clean document for email, printing, client review, or uploads to a form that only accepts a single file."
        ]
      },
      {
        title: "Best use cases for PDF merging",
        paragraphs: [
          "People often merge PDFs when preparing application packets, combining invoices, creating one document from scanned pages, or sending a complete document set to a client or team member.",
          "This also helps when the recipient should review everything in sequence instead of opening multiple attachments separately."
        ]
      },
      {
        title: "How to keep the final PDF clean",
        paragraphs: [
          "Check page order first and remove duplicates before merging if needed. A merge tool combines files, but it does not automatically correct mistakes in the original documents.",
          "If one source PDF is blurry or badly scanned, fix that file first. The merged result can only be as clear as the original pages."
        ]
      }
    ],
    faqs: [
      {
        question: "Can I merge PDF files without a watermark?",
        answer:
          "Yes. This page is designed for clean output without adding branding to the final file."
      },
      {
        question: "What should I do if my merged PDF is too large?",
        answer:
          "Try reducing the size of source files first or merge only the pages you actually need in the final document."
      }
    ]
  },
  {
    slug: "json-formatter-and-validator-online",
    toolSlug: "json-formatter",
    title: "JSON Formatter And Validator Online",
    description:
      "Format, beautify, and validate JSON online with a fast browser-based JSON formatter. Clean raw JSON and catch syntax errors quickly.",
    h1: "JSON Formatter And Validator Online",
    intro:
      "Use this page to beautify raw JSON, validate syntax, and make copied payloads easier to debug. It is useful for APIs, configs, logs, test data, and documentation work.",
    keywords: [
      "json formatter and validator online",
      "json beautifier free online",
      "json validator online free",
      "format json online",
      "developer tools online free"
    ],
    relatedHeading: "Related developer pages",
    relatedLinks: [
      { href: "/tools/json-formatter", label: "JSON Formatter Tool" },
      { href: "/tools/url-encoder-decoder", label: "URL Encoder Decoder" },
      { href: "/tools/base64-encoder-decoder", label: "Base64 Encoder Decoder" }
    ],
    tips: [
      "Paste the full JSON payload before formatting so nested errors are easier to spot.",
      "If formatting fails, check for missing commas, quotes, or brackets in the error area.",
      "Copy the validated result only after the structure looks clean and readable."
    ],
    sections: [
      {
        title: "Why use a JSON formatter and validator",
        paragraphs: [
          "Raw JSON often becomes hard to read when it is minified or copied from logs, APIs, or config files. A formatter adds structure while validation helps you find syntax problems before the data is used somewhere important.",
          "This is useful when debugging requests, cleaning payloads, reviewing webhook output, or sharing readable JSON with teammates."
        ]
      },
      {
        title: "How to format JSON safely",
        paragraphs: [
          "Paste the JSON into the tool and run the formatter. If the syntax is valid, the output becomes easier to read with proper indentation and spacing.",
          "If the tool shows an error, fix one problem at a time instead of editing the whole payload at once. This makes debugging much faster."
        ]
      },
      {
        title: "Best scenarios for JSON validation",
        paragraphs: [
          "JSON validation is useful before sending API requests, storing config files, copying examples into docs, or sharing sample payloads with support and development teams.",
          "It is especially valuable when the payload contains nested arrays or objects that are easy to break with one missing character."
        ]
      }
    ],
    faqs: [
      {
        question: "What is the difference between formatting and validating JSON?",
        answer:
          "Formatting makes JSON readable, while validation checks whether the syntax is actually correct."
      },
      {
        question: "Can I use this page for API payload debugging?",
        answer:
          "Yes. It works well for checking copied request or response data before you paste it back into your app, API client, or documentation."
      }
    ]
  },
  {
    slug: "word-counter-for-students-free",
    toolSlug: "word-counter",
    title: "Word Counter For Students Free",
    description:
      "Use a free word counter for students to check words, characters, and sentences online. Great for essays, assignments, and captions.",
    h1: "Word Counter For Students Free",
    intro:
      "This page is built for students, writers, and anyone working with text limits. Paste your draft to check words, characters, and sentences while editing essays, assignments, applications, and captions.",
    keywords: [
      "word counter for students free",
      "word counter for essays online",
      "paragraph word counter online",
      "character counter for instagram captions",
      "online sentence counter tool"
    ],
    relatedHeading: "Related text pages",
    relatedLinks: [
      { href: "/tools/word-counter", label: "Word Counter Tool" },
      { href: "/tools/case-converter", label: "Case Converter" },
      { href: "/tools/whitespace-cleaner", label: "Whitespace Cleaner" }
    ],
    tips: [
      "Paste the full draft first so you can see total words before editing line by line.",
      "Use sentence and character counts together when a platform has more than one limit.",
      "Trim repetition before cutting useful examples or supporting details."
    ],
    sections: [
      {
        title: "Why students use a word counter",
        paragraphs: [
          "Assignments, essays, scholarship forms, and personal statements often have strict length rules. A live word counter helps students stay inside those limits without guessing or manually checking a draft.",
          "It is also useful during editing because you can see how every change affects total words, character count, and sentence count in real time."
        ]
      },
      {
        title: "How to stay inside a word limit",
        paragraphs: [
          "Paste the complete text into the tool and check the total words first. If the draft is too long, remove repeated ideas, tighten long phrases, and shorten examples that do not add much value.",
          "If the text is too short, add specific details or supporting points instead of padding the draft with vague filler."
        ]
      },
      {
        title: "Best use cases beyond essays",
        paragraphs: [
          "A word counter also helps with captions, article intros, email copy, exam responses, and application answers where clarity and length both matter.",
          "Because counts update instantly, it becomes useful for both academic writing and quick everyday text checks."
        ]
      }
    ],
    faqs: [
      {
        question: "Is this word counter good for essays and assignments?",
        answer:
          "Yes. It is useful for checking total words before submission and for editing drafts to fit assignment limits more cleanly."
      },
      {
        question: "Can I use it for character limits too?",
        answer:
          "Yes. It works for both word and character checks, which is helpful for forms, captions, and short-answer responses."
      }
    ]
  }
];

export function getLandingPage(slug: string) {
  return landingPages.find((page) => page.slug === slug);
}

export function getRequiredLandingPage(slug: string): LandingPageDefinition {
  const page = getLandingPage(slug);

  if (!page) {
    throw new Error(`Missing landing page data for ${slug}.`);
  }

  return page;
}

export function getLandingPagesByTool(toolSlug: ToolKey, limit?: number): LandingPageDefinition[] {
  const matchingPages = landingPages.filter((page) => page.toolSlug === toolSlug);

  if (typeof limit === "number") {
    return matchingPages.slice(0, limit);
  }

  return matchingPages;
}
