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
  bestFor: string[];
  beforeYouStart: string[];
  useCases: string[];
  comparison: ToolComparisonPoint[];
  tips: string[];
  limitations: string[];
  privacyNote: string;
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

const toolProfiles: Record<
  ToolKey,
  {
    audience: string;
    input: string;
    output: string;
    workflow: string;
    caution: string;
    pairedStep: string;
  }
> = {
  "background-remover": {
    audience: "store owners, creators, and designers preparing product or profile images",
    input: "a photo with a clear subject edge",
    output: "a transparent PNG that can be reused in listings, thumbnails, or designs",
    workflow: "remove the background, inspect the edge, then download only after the subject still looks natural",
    caution: "busy backgrounds, shadows, and hair detail can need manual review after automatic removal",
    pairedStep: "compress the finished PNG if the final file needs to be smaller"
  },
  "image-compressor": {
    audience: "bloggers, students, and site owners trying to meet upload limits or improve loading speed",
    input: "a photo, screenshot, or graphic that is larger than needed",
    output: "a lighter image file with acceptable visual quality",
    workflow: "resize large source images first, then compress gradually while comparing the preview",
    caution: "very small targets can make text, faces, and detailed graphics look damaged",
    pairedStep: "use the image resizer first when the original dimensions are much larger than the display area"
  },
  "image-resizer": {
    audience: "people preparing photos for forms, websites, social profiles, and document uploads",
    input: "an image with dimensions that do not match the destination",
    output: "a resized image with controlled width, height, and aspect ratio",
    workflow: "choose the target size, keep aspect ratio when accuracy matters, then download the new image",
    caution: "stretching an image into the wrong ratio can make people, logos, or products look distorted",
    pairedStep: "compress the resized image afterward if a portal also has a file-size limit"
  },
  "jpg-to-png": {
    audience: "users who need a PNG copy for design tools, sharing, or compatibility",
    input: "a JPG or JPEG image",
    output: "a PNG file generated from the browser",
    workflow: "convert only when PNG is the better destination format, then preview the output before download",
    caution: "converting a JPG to PNG does not restore detail that was already lost in the original file",
    pairedStep: "compress the PNG if the converted file becomes larger than expected"
  },
  "webp-to-png": {
    audience: "people downloading WebP images that need to work in apps or systems expecting PNG",
    input: "a WebP image from a website, export, or design source",
    output: "a PNG version that is easier to reuse in common workflows",
    workflow: "upload the WebP, convert it, and confirm transparency or sharp edges still look correct",
    caution: "PNG output can be larger than WebP, especially for detailed photos",
    pairedStep: "use compression after conversion when the PNG needs to be shared or uploaded"
  },
  "image-to-text-ocr": {
    audience: "students, office users, and researchers turning screenshots or scans into editable text",
    input: "a readable image containing typed or printed text",
    output: "editable text that can be copied and corrected",
    workflow: "upload a clear image, run OCR, then proofread names, numbers, and punctuation carefully",
    caution: "blur, glare, handwriting, and tilted pages can reduce OCR accuracy",
    pairedStep: "clean the extracted text with whitespace or case tools after proofreading"
  },
  "ai-paraphrasing-tool": {
    audience: "writers, students, and marketers improving rough drafts without starting over",
    input: "a paragraph or short draft that needs a clearer tone",
    output: "a rewritten draft that still needs human review",
    workflow: "choose a tone, generate a rewrite, compare it with the original, and keep only accurate changes",
    caution: "paraphrasing can change meaning, remove nuance, or make unsupported claims if left unchecked",
    pairedStep: "use the word counter afterward when the final draft must fit a length limit"
  },
  "word-counter": {
    audience: "students, writers, editors, and social media managers working with length limits",
    input: "plain text from an essay, caption, article, form, or draft",
    output: "live word, character, and sentence counts",
    workflow: "paste the full text first, check the totals, then edit while watching the counts update",
    caution: "word processors and platforms may count some punctuation or symbols differently",
    pairedStep: "use case conversion or whitespace cleanup before the final copy pass"
  },
  "case-converter": {
    audience: "content teams, students, and admins standardizing headlines, labels, and copied text",
    input: "text with inconsistent uppercase, lowercase, or capitalization",
    output: "cleaner text in the selected case style",
    workflow: "clean spacing first if needed, convert the case, then review names and acronyms manually",
    caution: "automatic case changes can alter brand names, abbreviations, and proper nouns",
    pairedStep: "run the whitespace cleaner before conversion when the source came from multiple places"
  },
  "remove-duplicates": {
    audience: "people cleaning lists, keywords, email drafts, IDs, or copied rows",
    input: "line-based text that may contain repeated entries",
    output: "a cleaner list that keeps the first occurrence of each unique line",
    workflow: "paste the list, remove duplicates, then compare the output when order or context matters",
    caution: "near-duplicates with extra spaces or small spelling differences may still need manual review",
    pairedStep: "use whitespace cleanup before duplicate removal for messy copied data"
  },
  "text-reverser": {
    audience: "users testing strings, creating quick text effects, or checking mirrored sequences",
    input: "a word, sentence, paragraph, or short string",
    output: "the same text reversed according to the selected workflow",
    workflow: "paste the text, reverse it, and copy the result only after confirming spacing still makes sense",
    caution: "reversed text is mostly for utility checks and simple effects, not normal readable publishing",
    pairedStep: "use the cleaner afterward if the reversed output contains unwanted line breaks"
  },
  "text-sorter": {
    audience: "analysts, SEOs, support teams, and students organizing copied line lists",
    input: "lines of text such as tags, names, keywords, IDs, or notes",
    output: "a sorted list, optionally with duplicates removed",
    workflow: "decide whether alphabetical order helps, then sort and review the cleaned list",
    caution: "do not sort lists where original order carries priority, chronology, or ranking meaning",
    pairedStep: "remove duplicates or normalize whitespace before sorting when the source is inconsistent"
  },
  "whitespace-cleaner": {
    audience: "writers and office users cleaning text copied from PDFs, chats, spreadsheets, or web pages",
    input: "text with extra spaces, uneven line breaks, or pasted formatting noise",
    output: "tidier text that is easier to read and reuse",
    workflow: "clean spacing before deeper editing so the copy is easier to review",
    caution: "some documents need intentional line breaks, so review paragraphs before replacing the original",
    pairedStep: "use duplicate removal or case conversion after spacing has been normalized"
  },
  "slug-generator": {
    audience: "bloggers, developers, and site owners creating readable URL paths",
    input: "a title, phrase, product name, or draft heading",
    output: "a lowercase slug with cleaner separators",
    workflow: "generate the slug, remove unnecessary words if needed, and keep the final URL stable",
    caution: "changing slugs after publishing can break links unless redirects are handled correctly",
    pairedStep: "use the word counter when drafting concise page titles before slug creation"
  },
  "url-encoder-decoder": {
    audience: "developers, QA testers, and support teams debugging links and API parameters",
    input: "URL text, query values, redirects, or encoded strings",
    output: "encoded or decoded text for safer request handling",
    workflow: "encode only the unsafe value, not the full URL structure, unless that is the specific goal",
    caution: "double encoding can break links just as easily as missing encoding",
    pairedStep: "validate related JSON payloads separately before placing them into a URL"
  },
  "base64-encoder-decoder": {
    audience: "developers and technical users inspecting small encoded values",
    input: "plain text or Base64 text",
    output: "encoded Base64 or decoded readable text",
    workflow: "encode or decode the value, then verify the result before using it in a request or config",
    caution: "Base64 is not encryption and should not be described as security by itself",
    pairedStep: "format JSON after decoding when the result contains structured data"
  },
  "password-generator": {
    audience: "everyday users creating unique passwords for accounts",
    input: "length and character preferences",
    output: "a random password ready to copy into a secure place",
    workflow: "choose a strong length, generate a password, and store it in a trusted password manager",
    caution: "do not reuse generated passwords across multiple accounts",
    pairedStep: "generate a UUID instead when the workflow needs an identifier rather than a login secret"
  },
  "uuid-generator": {
    audience: "developers, testers, and documenters needing unique reference values",
    input: "a requested number of UUID values",
    output: "UUID v4 strings that can be copied individually or together",
    workflow: "generate the required values and keep their format unchanged across systems",
    caution: "UUIDs are identifiers, not proof of identity or security tokens by themselves",
    pairedStep: "format JSON afterward when placing UUIDs into fixtures or API examples"
  },
  "age-calculator": {
    audience: "users checking date-based age for forms, planning, or quick reference",
    input: "a birth date and the current date",
    output: "age in years, months, and days",
    workflow: "enter the date carefully and check the result before copying it into a form",
    caution: "timezone, calendar rules, and incorrect date entry can affect edge cases",
    pairedStep: "use the calculator as a convenience check, not as official identity verification"
  },
  "bmi-calculator": {
    audience: "people making a quick height-and-weight estimate",
    input: "height and weight values in the expected units",
    output: "a BMI score with a general category",
    workflow: "enter units carefully, calculate the score, and treat the result as a broad reference",
    caution: "BMI does not measure body composition, health history, age, or medical risk by itself",
    pairedStep: "use professional guidance for health decisions that matter"
  },
  "json-formatter": {
    audience: "developers, support teams, and analysts reading API payloads or config data",
    input: "raw, minified, or messy JSON",
    output: "formatted JSON or a clear validation error",
    workflow: "paste the full payload, format it, fix syntax errors one at a time, and copy only valid output",
    caution: "JavaScript object syntax is not always valid JSON, especially comments and trailing commas",
    pairedStep: "use URL or Base64 tools when the JSON is part of an encoded request"
  },
  "qr-code-generator": {
    audience: "creators, teachers, small businesses, and event organizers sharing quick links",
    input: "a URL, short text, or contact detail",
    output: "a downloadable QR code image",
    workflow: "enter the destination, generate the code, test it on a phone, and then download",
    caution: "long or broken URLs can create harder-to-scan QR codes",
    pairedStep: "shorten or clean the destination text before generating a final code"
  },
  "pdf-merge": {
    audience: "students, applicants, office teams, and freelancers combining document sets",
    input: "two or more PDF files in the intended reading order",
    output: "one merged PDF",
    workflow: "arrange files first, merge them, then open the result to confirm page order and readability",
    caution: "merging does not fix blurry scans, missing pages, or incorrect source documents",
    pairedStep: "convert Word files to PDF before merging when the final packet needs consistent format"
  },
  "word-to-pdf": {
    audience: "people preparing documents for sharing, printing, applications, or archiving",
    input: "a DOCX file",
    output: "a downloadable PDF document",
    workflow: "review the source document, convert it, then inspect the PDF for spacing and page breaks",
    caution: "complex layouts, unusual fonts, and tables may need manual review after conversion",
    pairedStep: "merge the converted PDF with supporting files when a single packet is required"
  },
  "cv-builder": {
    audience: "job seekers preparing a readable resume without starting from a blank document",
    input: "profile, experience, education, skills, and project details",
    output: "a structured CV that can be previewed and downloaded as PDF",
    workflow: "choose a template, write role-specific content, preview every section, and export when it reads cleanly",
    caution: "templates help structure, but weak or inaccurate content still needs careful editing",
    pairedStep: "use the word counter and case converter to polish dense sections before export"
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
  const profile = toolProfiles[tool.slug];

  return {
    primaryKeyword,
    secondaryKeywords,
    intro: [
      `${tool.name} is built for ${profile.audience}. Bring ${profile.input}, run the page for the specific job at hand, and leave with ${profile.output}.`,
      `This ${tool.category.toLowerCase()} tool keeps the steps visible: ${profile.workflow}. The surrounding notes explain what to check before you reuse the result.`
    ],
    detailedGuide: [
      {
        title: `What is ${tool.name.toLowerCase()} and how does it work`,
        paragraphs: [
          `${tool.name} turns ${profile.input} into ${profile.output} without making the task feel bigger than it is. It is useful when you need a clean result quickly and still want enough context to judge whether the output is ready.`,
          `The usual flow is: ${profile.workflow}. The controls stay close to the input so you can test, reset, copy, or download without leaving the page.`
        ]
      },
      {
        title: `Why people use ${tool.shortTitle.toLowerCase()} online`,
        paragraphs: [
          `${profile.audience} often need a small job finished during a larger piece of work: preparing an upload, cleaning copied text, checking a value, or sharing a file. A dedicated page removes the extra setup that comes with heavier software.`,
          `This page works best when the source is already close to the result you need. ${profile.pairedStep}.`
        ]
      },
      {
        title: `${tool.name} tips for better results`,
        paragraphs: [
          `Start with clean input: ${profile.input}. Review the output before sharing, uploading, or publishing it so the final result still matches the destination.`,
          `${profile.caution}. If the job has a second step, use a related tool only after the first result looks correct.`
        ]
      }
    ],
    bestFor: [
      profile.audience,
      `Users who want ${profile.output} without installing extra software.`,
      "Visitors who want simple actions, plain instructions, and enough context to avoid obvious mistakes."
    ],
    beforeYouStart: [
      `Prepare ${profile.input} before running the tool.`,
      `Know whether the desired result is ${profile.output}.`,
      "Review the final output once before copying, downloading, or sharing it."
    ],
    useCases: [
      `Use ${tool.name} when ${profile.audience} need a result they can check and reuse.`,
      `Prepare ${profile.output} for a form, message, document, article, or internal task.`,
      `Pair it with another tool when the next step is: ${profile.pairedStep.toLowerCase()}.`
    ],
    comparison: [
      {
        title: "Vs full software suites",
        description: "Desktop apps are better for complex editing. This page is meant for the smaller task you want to finish right now."
      },
      {
        title: "Vs crowded tool directories",
        description: "The tool, notes, and related links stay on the same page so you are not pushed through unrelated screens."
      },
      {
        title: "Vs manual workflows",
        description: "A simple control can remove repetitive work, but the final check still belongs to the person using the result."
      }
    ],
    tips: [
      `Use ${tool.name} with ${profile.input} for more predictable output.`,
      "Review the result once before downloading, copying, or sharing it.",
      profile.pairedStep
    ],
    limitations: [
      profile.caution,
      `The final quality depends heavily on the source: ${profile.input}.`,
      "For high-stakes work, use this page as a convenience step and verify the result independently."
    ],
    privacyNote:
      "This page keeps processing in the browser where the tool supports it. Some site features, such as accounts or saved drafts, may use extra storage when you choose to use them.",
    faqs: [
      {
        question: `Is ${tool.name} free to use?`,
        answer: `Yes. ${tool.name} is free to use on ${siteConfig.name} for everyday tasks.`
      },
      {
        question: "Do I need to upload data to a server?",
        answer:
          "Most tools here are designed to run in the browser when possible. If a page needs a different workflow, the privacy note should make that clear before you rely on it."
      },
      {
        question: `Who should use ${tool.name}?`,
        answer:
          `This tool is useful for people handling quick ${tool.category.toLowerCase()} tasks online, especially students, creators, office users, and developers who want a practical result without extra setup.`
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
    bestFor: override.bestFor ?? fallback.bestFor,
    beforeYouStart: override.beforeYouStart ?? fallback.beforeYouStart,
    useCases: override.useCases ?? fallback.useCases,
    comparison: override.comparison ?? fallback.comparison,
    tips: override.tips ?? fallback.tips,
    limitations: override.limitations ?? fallback.limitations,
    privacyNote: override.privacyNote ?? fallback.privacyNote,
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


