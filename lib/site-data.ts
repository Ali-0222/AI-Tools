export type ToolKey =
  | "image-compressor"
  | "image-resizer"
  | "jpg-to-png"
  | "word-counter"
  | "case-converter"
  | "remove-duplicates"
  | "text-reverser"
  | "text-sorter"
  | "whitespace-cleaner"
  | "slug-generator"
  | "url-encoder-decoder"
  | "base64-encoder-decoder"
  | "password-generator"
  | "uuid-generator"
  | "age-calculator"
  | "bmi-calculator"
  | "json-formatter"
  | "pdf-merge"
  | "word-to-pdf"
  | "cv-builder";

export type ToolDefinition = {
  name: string;
  slug: ToolKey;
  shortTitle: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  pageTitle: string;
  pageDescription: string;
  tips: string[];
  authRequired?: boolean;
};

export const siteTools: ToolDefinition[] = [
  {
    name: "Image Compressor",
    slug: "image-compressor",
    shortTitle: "Compress images",
    description: "Reduce image file size in the browser while keeping the output ready for quick downloads.",
    metaTitle: "Free Image Compressor Online",
    metaDescription: "Compress images online without losing quality using a fast browser-based image compressor.",
    category: "Image",
    pageTitle: "Image Compressor",
    pageDescription: "Reduce image file size in seconds without leaving your browser.",
    tips: [
      "Choose an image file from your device.",
      "Adjust the quality slider to control the output size.",
      "Compress, preview the result, and download the smaller file."
    ]
  },
  {
    name: "Image Resizer",
    slug: "image-resizer",
    shortTitle: "Resize images",
    description: "Set custom width and height, keep aspect ratio if needed, and download the resized image instantly.",
    metaTitle: "Free Image Resizer Online",
    metaDescription: "Resize images online with custom width, height, and aspect ratio options using your browser.",
    category: "Image",
    pageTitle: "Image Resizer",
    pageDescription: "Resize images with custom width and height while keeping aspect ratio when needed.",
    tips: [
      "Upload an image from your device.",
      "Enter the desired width and height or keep the ratio enabled.",
      "Resize and download the new image file."
    ]
  },
  {
    name: "JPG to PNG Converter",
    slug: "jpg-to-png",
    shortTitle: "Convert JPG to PNG",
    description: "Convert JPEG and JPG files to PNG format with browser-based processing and instant download.",
    metaTitle: "Free JPG to PNG Converter Online",
    metaDescription: "Convert JPG to PNG online for free with a quick client-side image converter.",
    category: "Image",
    pageTitle: "JPG to PNG",
    pageDescription: "Convert JPG and JPEG images into PNG format directly in your browser.",
    tips: [
      "Select a JPG or JPEG file.",
      "Start the conversion to generate a PNG version in the browser.",
      "Preview the result and download the PNG file."
    ]
  },
  {
    name: "Word Counter",
    slug: "word-counter",
    shortTitle: "Count words",
    description: "Count words, characters, and sentences in plain text with live updates and copy support.",
    metaTitle: "Free Word Counter Online",
    metaDescription: "Count words, characters, and sentences online using a free instant word counter.",
    category: "Text",
    pageTitle: "Word Counter",
    pageDescription: "Count words, characters, and sentences instantly with a fast browser-based editor.",
    tips: [
      "Paste your text into the input area.",
      "Review the live word, character, and sentence totals.",
      "Copy or reset the text when needed."
    ]
  },
  {
    name: "Case Converter",
    slug: "case-converter",
    shortTitle: "Convert text case",
    description: "Switch text to uppercase, lowercase, or capitalized case with one click and copy the output.",
    metaTitle: "Free Case Converter Online",
    metaDescription: "Convert text to uppercase, lowercase, or capitalized case online for free.",
    category: "Text",
    pageTitle: "Case Converter",
    pageDescription: "Convert text to uppercase, lowercase, or capitalized case in one click.",
    tips: [
      "Paste or type your text into the input box.",
      "Choose the case transformation you want.",
      "Copy the output or reset the tool for a new input."
    ]
  },
  {
    name: "Remove Duplicate Lines",
    slug: "remove-duplicates",
    shortTitle: "Clean duplicate lines",
    description: "Remove repeated lines from text input instantly while preserving the first occurrence of each line.",
    metaTitle: "Remove Duplicate Lines Online",
    metaDescription: "Remove duplicate lines from text online instantly with a simple free cleanup tool.",
    category: "Text",
    pageTitle: "Remove Duplicate Lines",
    pageDescription: "Paste text with repeated lines and keep only the first occurrence of each line.",
    tips: [
      "Paste line-based text into the tool.",
      "Review the automatically cleaned output.",
      "Copy the result or reset the form."
    ]
  },
  {
    name: "Text Reverser",
    slug: "text-reverser",
    shortTitle: "Reverse text",
    description: "Reverse text instantly in your browser for words, sentences, or full paragraphs.",
    metaTitle: "Free Text Reverser Online",
    metaDescription: "Reverse text online for free with a fast browser-based text reverser tool.",
    category: "Text",
    pageTitle: "Text Reverser",
    pageDescription: "Reverse any text instantly while keeping your workflow simple and fast.",
    tips: [
      "Paste or type your text into the input area.",
      "Review the reversed output generated instantly.",
      "Copy the output or reset the tool for a new input."
    ]
  },
  {
    name: "Text Sorter",
    slug: "text-sorter",
    shortTitle: "Sort lines",
    description: "Sort text lines alphabetically, remove duplicates, and reorder data quickly in your browser.",
    metaTitle: "Free Text Sorter Online",
    metaDescription: "Sort lines alphabetically and clean text lists online with a free text sorter.",
    category: "Text",
    pageTitle: "Text Sorter",
    pageDescription: "Sort text lines A-Z or Z-A and optionally remove duplicate rows.",
    tips: [
      "Paste line-based text into the input area.",
      "Choose sort direction and duplicate handling options.",
      "Copy the sorted output for your next step."
    ]
  },
  {
    name: "Whitespace Cleaner",
    slug: "whitespace-cleaner",
    shortTitle: "Clean spaces",
    description: "Remove extra spaces and tidy messy text formatting with one click.",
    metaTitle: "Free Whitespace Cleaner Online",
    metaDescription: "Remove extra spaces and clean text formatting online for free.",
    category: "Text",
    pageTitle: "Whitespace Cleaner",
    pageDescription: "Clean extra spaces, trim lines, and make text easier to read.",
    tips: [
      "Paste text with irregular spacing into the input.",
      "Run the cleaner to normalize spacing and trim lines.",
      "Copy the cleaned text output."
    ]
  },
  {
    name: "Slug Generator",
    slug: "slug-generator",
    shortTitle: "Generate slugs",
    description: "Create SEO-friendly URL slugs from titles or phrases instantly.",
    metaTitle: "Free Slug Generator Online",
    metaDescription: "Generate clean SEO-friendly slugs from text with a free online slug generator.",
    category: "SEO",
    pageTitle: "Slug Generator",
    pageDescription: "Convert titles into clean, readable URL slugs for web pages.",
    tips: [
      "Type or paste a title into the input box.",
      "Review the generated slug in lowercase format.",
      "Copy the slug and use it in your URL path."
    ]
  },
  {
    name: "URL Encoder Decoder",
    slug: "url-encoder-decoder",
    shortTitle: "Encode URLs",
    description: "Encode or decode URL strings safely for query parameters and web requests.",
    metaTitle: "Free URL Encoder Decoder Online",
    metaDescription: "Encode and decode URL strings online with a fast free browser tool.",
    category: "Developer",
    pageTitle: "URL Encoder Decoder",
    pageDescription: "Encode and decode URL values instantly for safer web request handling.",
    tips: [
      "Paste URL text or query values into the input area.",
      "Choose encode or decode mode based on your need.",
      "Copy the converted output and use it in your app or link."
    ]
  },
  {
    name: "Base64 Encoder Decoder",
    slug: "base64-encoder-decoder",
    shortTitle: "Encode Base64",
    description: "Encode plain text to Base64 and decode Base64 back to readable text.",
    metaTitle: "Free Base64 Encoder Decoder Online",
    metaDescription: "Encode or decode Base64 text online for free in your browser.",
    category: "Developer",
    pageTitle: "Base64 Encoder Decoder",
    pageDescription: "Convert text to Base64 and decode Base64 strings quickly and safely.",
    tips: [
      "Paste plain text or Base64 text in the input field.",
      "Pick encode or decode mode.",
      "Copy the converted result for your workflow."
    ]
  },
  {
    name: "Password Generator",
    slug: "password-generator",
    shortTitle: "Generate passwords",
    description: "Create strong random passwords with custom length and character options.",
    metaTitle: "Free Password Generator Online",
    metaDescription: "Generate secure random passwords online with customizable options for length and symbols.",
    category: "Security",
    pageTitle: "Password Generator",
    pageDescription: "Generate strong random passwords in one click with customizable settings.",
    tips: [
      "Set your desired password length.",
      "Choose character options like uppercase, numbers, and symbols.",
      "Generate and copy a secure password."
    ]
  },
  {
    name: "UUID Generator",
    slug: "uuid-generator",
    shortTitle: "Generate UUIDs",
    description: "Generate UUID v4 values instantly for apps, databases, and APIs.",
    metaTitle: "Free UUID Generator Online",
    metaDescription: "Generate UUID v4 values online instantly with a free UUID generator.",
    category: "Developer",
    pageTitle: "UUID Generator",
    pageDescription: "Generate unique UUID v4 values quickly for development tasks.",
    tips: [
      "Choose how many UUID values you need.",
      "Generate the UUID list instantly.",
      "Copy one UUID or all values at once."
    ]
  },
  {
    name: "Age Calculator",
    slug: "age-calculator",
    shortTitle: "Calculate age",
    description: "Calculate age in years, months, and days using a date of birth and today’s date in the browser.",
    metaTitle: "Free Age Calculator Online",
    metaDescription: "Calculate age online in years, months, and days using a simple date of birth calculator.",
    category: "Calculator",
    pageTitle: "Age Calculator",
    pageDescription: "Calculate age from date of birth and view the result in years, months, and days.",
    tips: [
      "Select the date of birth.",
      "Review the calculated years, months, and days instantly.",
      "Reset the form to calculate a different age."
    ]
  },
  {
    name: "BMI Calculator",
    slug: "bmi-calculator",
    shortTitle: "Calculate BMI",
    description: "Check body mass index from height and weight inputs and see the matching BMI category instantly.",
    metaTitle: "Free BMI Calculator Online",
    metaDescription: "Calculate BMI online for free and view the BMI category instantly.",
    category: "Calculator",
    pageTitle: "BMI Calculator",
    pageDescription: "Enter height and weight to calculate body mass index and see the BMI category instantly.",
    tips: [
      "Enter height in centimeters and weight in kilograms.",
      "Review the BMI score and category.",
      "Reset the fields to run another calculation."
    ]
  },
  {
    name: "JSON Formatter",
    slug: "json-formatter",
    shortTitle: "Format JSON",
    description: "Beautify JSON, validate syntax, and copy formatted output with clear error feedback in the browser.",
    metaTitle: "Free JSON Formatter Online",
    metaDescription: "Format and beautify JSON online with validation and error handling using a free JSON formatter.",
    category: "Developer",
    pageTitle: "JSON Formatter",
    pageDescription: "Beautify JSON, validate syntax, and copy formatted output with clear browser-side error handling.",
    tips: [
      "Paste raw JSON into the input area.",
      "Use the beautify button to validate and format the content.",
      "Copy the result or review the parse error message."
    ]
  },
  {
    name: "PDF Merge",
    slug: "pdf-merge",
    shortTitle: "Merge PDFs",
    description: "Combine multiple PDF files in the browser and download one merged PDF without uploading files.",
    metaTitle: "Free PDF Merge Online",
    metaDescription: "Merge PDF files online for free using a secure client-side PDF merger.",
    category: "PDF",
    pageTitle: "PDF Merge",
    pageDescription: "Combine multiple PDF files into one document directly in the browser.",
    tips: [
      "Choose two or more PDF files from your device.",
      "Run the merge process in the browser.",
      "Download the merged PDF when processing completes."
    ]
  },
  {
    name: "Word to PDF Converter",
    slug: "word-to-pdf",
    shortTitle: "Word to PDF",
    description: "Convert DOCX files into downloadable PDF documents directly in the browser.",
    metaTitle: "Free Word to PDF Converter Online",
    metaDescription: "Convert Word DOCX files to PDF online for free with a fast browser-based converter.",
    category: "Document",
    pageTitle: "Word to PDF",
    pageDescription: "Upload a DOCX file, convert it in the browser, and download a PDF.",
    tips: [
      "Upload a DOCX Word document from your device.",
      "Convert the file to a PDF inside your browser.",
      "Download the generated PDF when the conversion finishes."
    ]
  },
  {
    name: "CV Builder",
    slug: "cv-builder",
    shortTitle: "Build CV",
    description: "Choose a professional CV template, fill your details, preview live, and save your resume profile.",
    metaTitle: "Online CV Builder with Templates",
    metaDescription: "Build a CV online using professional templates, live preview, and profile-based saved resumes.",
    category: "Career",
    pageTitle: "CV Builder",
    pageDescription: "Pick a template, edit details live, and save your resume to your profile.",
    tips: [
      "Choose one of the available CV templates.",
      "Fill in your profile, experience, education, and skills.",
      "Preview the CV live and save it to your profile when complete."
    ],
    authRequired: true
  }
];

export function getToolCountLabel() {
  return `${siteTools.length} dedicated tool pages`;
}

export type BlogPostDefinition = {
  slug: string;
  title: string;
  description: string;
  category: string;
  primaryKeyword: string;
  keywords: string[];
  publishedAt?: string;
  updatedAt?: string;
  relatedToolSlugs: ToolKey[];
};

export const blogPosts: BlogPostDefinition[] = [
  {
    slug: "how-to-compress-images-for-faster-web-pages",
    title: "How to Compress Images for Faster Web Pages",
    description: "Learn how to reduce image size without losing quality and improve Core Web Vitals.",
    category: "Images",
    primaryKeyword: "image compression for seo",
    keywords: ["compress images online", "reduce image size", "website speed optimization"],
    publishedAt: "2025-02-10",
    updatedAt: "2025-08-14",
    relatedToolSlugs: ["image-compressor", "image-resizer", "jpg-to-png"]
  },
  {
    slug: "image-resize-vs-compress-which-comes-first",
    title: "Image Resize vs Compress: Which Step Comes First?",
    description: "Understand the right order of image optimization to get smaller files and cleaner output.",
    category: "Images",
    primaryKeyword: "resize vs compress image",
    keywords: ["image optimization workflow", "image dimensions for web", "compress after resize"],
    publishedAt: "2025-02-24",
    updatedAt: "2025-08-20",
    relatedToolSlugs: ["image-resizer", "image-compressor", "jpg-to-png"]
  },
  {
    slug: "jpg-vs-png-for-seo-and-web-performance",
    title: "JPG vs PNG for SEO and Web Performance",
    description: "Choose the right image format for quality, transparency, and faster load times.",
    category: "Images",
    primaryKeyword: "jpg vs png seo",
    keywords: ["best image format for website", "png transparency use case", "optimize jpg for web"],
    publishedAt: "2025-03-08",
    updatedAt: "2025-09-02",
    relatedToolSlugs: ["jpg-to-png", "image-compressor", "image-resizer"]
  },
  {
    slug: "why-browser-based-tools-build-user-trust",
    title: "Why Browser-Based Tools Build More User Trust",
    description: "Client-side tools can improve privacy perception, speed, and conversion confidence.",
    category: "Privacy",
    primaryKeyword: "browser based tools privacy",
    keywords: ["client-side processing", "online tool trust signals", "privacy friendly tools"],
    publishedAt: "2025-03-22",
    updatedAt: "2025-09-14",
    relatedToolSlugs: ["json-formatter", "word-counter", "pdf-merge"]
  },
  {
    slug: "privacy-first-copywriting-for-online-tools",
    title: "Privacy-First Copywriting for Online Tools",
    description: "Write trust-focused copy that improves engagement without overpromising.",
    category: "Privacy",
    primaryKeyword: "privacy copywriting",
    keywords: ["trust copy for tools", "privacy messaging examples", "conversion copywriting"],
    publishedAt: "2025-04-05",
    updatedAt: "2025-10-01",
    relatedToolSlugs: ["word-counter", "case-converter", "remove-duplicates"]
  },
  {
    slug: "json-formatting-mistakes-that-break-apis",
    title: "JSON Formatting Mistakes That Break APIs",
    description: "Common JSON syntax issues and practical validation habits for cleaner payloads.",
    category: "Developer",
    primaryKeyword: "json formatting mistakes",
    keywords: ["json parse error", "json validator workflow", "api payload debugging"],
    publishedAt: "2025-04-19",
    updatedAt: "2025-10-15",
    relatedToolSlugs: ["json-formatter", "base64-encoder-decoder", "url-encoder-decoder"]
  },
  {
    slug: "url-encoding-guide-for-api-requests",
    title: "URL Encoding Guide for API Requests",
    description: "Learn where URL encoding is required and avoid broken parameters in requests.",
    category: "Developer",
    primaryKeyword: "url encoding guide",
    keywords: ["encodeURIComponent tutorial", "query param encoding", "api url best practices"],
    publishedAt: "2025-05-03",
    updatedAt: "2025-10-29",
    relatedToolSlugs: ["url-encoder-decoder", "json-formatter", "base64-encoder-decoder"]
  },
  {
    slug: "base64-encoding-when-to-use-and-avoid",
    title: "Base64 Encoding: When to Use It and When to Avoid It",
    description: "Understand practical Base64 use cases, limits, and common mistakes in apps.",
    category: "Developer",
    primaryKeyword: "base64 encoding use cases",
    keywords: ["base64 decode online", "base64 in APIs", "text encoding mistakes"],
    publishedAt: "2025-05-17",
    updatedAt: "2025-11-12",
    relatedToolSlugs: ["base64-encoder-decoder", "url-encoder-decoder", "json-formatter"]
  },
  {
    slug: "how-to-write-seo-friendly-urls-with-slugs",
    title: "How to Write SEO-Friendly URLs with Slugs",
    description: "Build cleaner slugs that help indexing, readability, and CTR.",
    category: "SEO",
    primaryKeyword: "seo friendly url slug",
    keywords: ["slug best practices", "url structure seo", "clean url generator"],
    publishedAt: "2025-05-31",
    updatedAt: "2025-11-26",
    relatedToolSlugs: ["slug-generator", "case-converter", "whitespace-cleaner"]
  },
  {
    slug: "keyword-clustering-for-small-tools-websites",
    title: "Keyword Clustering for Small Tools Websites",
    description: "Plan topical clusters so every page supports stronger rankings over time.",
    category: "SEO",
    primaryKeyword: "keyword clustering",
    keywords: ["topic clusters seo", "content silos", "seo planning for tools site"],
    publishedAt: "2025-06-14",
    updatedAt: "2025-12-10",
    relatedToolSlugs: ["slug-generator", "word-counter", "case-converter"]
  },
  {
    slug: "how-to-build-internal-links-that-rank-faster",
    title: "How to Build Internal Links That Rank Faster",
    description: "Use smart anchor placement and contextual linking across tool and blog pages.",
    category: "SEO",
    primaryKeyword: "internal linking strategy",
    keywords: ["contextual links seo", "internal links for tools pages", "seo site architecture"],
    publishedAt: "2025-06-28",
    updatedAt: "2025-12-24",
    relatedToolSlugs: ["slug-generator", "word-counter", "remove-duplicates"]
  },
  {
    slug: "on-page-seo-checklist-for-tool-pages",
    title: "On-Page SEO Checklist for Tool Pages",
    description: "A practical framework for titles, meta descriptions, H1s, FAQs, and schema.",
    category: "SEO",
    primaryKeyword: "on page seo checklist",
    keywords: ["tool page seo", "meta title writing", "faq schema seo"],
    publishedAt: "2025-07-12",
    updatedAt: "2026-01-08",
    relatedToolSlugs: ["slug-generator", "word-counter", "json-formatter"]
  },
  {
    slug: "how-to-improve-core-web-vitals-for-utility-sites",
    title: "How to Improve Core Web Vitals for Utility Sites",
    description: "Improve LCP, CLS, and INP for faster perceived performance and better SEO health.",
    category: "Performance",
    primaryKeyword: "core web vitals optimization",
    keywords: ["improve lcp", "reduce cls", "nextjs performance tips"],
    publishedAt: "2025-07-26",
    updatedAt: "2026-01-22",
    relatedToolSlugs: ["image-compressor", "image-resizer", "jpg-to-png"]
  },
  {
    slug: "mobile-seo-best-practices-for-tools-websites",
    title: "Mobile SEO Best Practices for Tools Websites",
    description: "Design and content patterns that improve rankings and conversions on phones.",
    category: "SEO",
    primaryKeyword: "mobile seo best practices",
    keywords: ["mobile first seo", "responsive tool pages", "mobile ux seo"],
    publishedAt: "2025-08-09",
    updatedAt: "2026-02-05",
    relatedToolSlugs: ["word-counter", "age-calculator", "bmi-calculator"]
  },
  {
    slug: "word-counter-use-cases-for-writers-and-students",
    title: "Word Counter Use Cases for Writers and Students",
    description: "Real use cases where accurate word and character counts save editing time.",
    category: "Text",
    primaryKeyword: "word counter online",
    keywords: ["character counter", "essay word limit", "content writing workflow"],
    publishedAt: "2025-08-23",
    updatedAt: "2026-02-12",
    relatedToolSlugs: ["word-counter", "case-converter", "remove-duplicates"]
  },
  {
    slug: "case-conversion-workflows-for-content-teams",
    title: "Case Conversion Workflows for Content Teams",
    description: "Standardize text casing for headlines, metadata, and editorial pipelines.",
    category: "Text",
    primaryKeyword: "case converter workflow",
    keywords: ["uppercase lowercase converter", "title case style", "content editing process"],
    publishedAt: "2025-09-06",
    updatedAt: "2026-02-13",
    relatedToolSlugs: ["case-converter", "whitespace-cleaner", "text-reverser"]
  },
  {
    slug: "cleaning-messy-copy-with-whitespace-tools",
    title: "Cleaning Messy Copy with Whitespace Tools",
    description: "Fix spacing issues and improve readability before publishing or sharing content.",
    category: "Text",
    primaryKeyword: "clean whitespace in text",
    keywords: ["remove extra spaces", "text cleanup tool", "formatting cleanup"],
    publishedAt: "2025-09-20",
    updatedAt: "2026-02-14",
    relatedToolSlugs: ["whitespace-cleaner", "remove-duplicates", "text-sorter"]
  },
  {
    slug: "line-sorting-and-deduping-for-data-cleanups",
    title: "Line Sorting and Deduping for Data Cleanups",
    description: "Sort and dedupe text lists faster for operations, outreach, and analysis.",
    category: "Text",
    primaryKeyword: "sort and dedupe lines",
    keywords: ["remove duplicate lines online", "sort text list", "data cleanup workflow"],
    publishedAt: "2025-10-04",
    updatedAt: "2026-02-15",
    relatedToolSlugs: ["text-sorter", "remove-duplicates", "whitespace-cleaner"]
  },
  {
    slug: "secure-password-practices-for-everyday-users",
    title: "Secure Password Practices for Everyday Users",
    description: "Simple password hygiene habits and generator settings for safer accounts.",
    category: "Security",
    primaryKeyword: "secure password generator",
    keywords: ["strong password tips", "password length recommendation", "online security basics"],
    publishedAt: "2025-10-18",
    updatedAt: "2026-02-16",
    relatedToolSlugs: ["password-generator", "uuid-generator", "base64-encoder-decoder"]
  },
  {
    slug: "uuid-v4-explained-for-beginners",
    title: "UUID v4 Explained for Beginners",
    description: "Understand UUID structure, use cases, and generation best practices.",
    category: "Developer",
    primaryKeyword: "uuid v4 generator",
    keywords: ["what is uuid", "unique id generation", "uuid use cases"],
    publishedAt: "2025-11-01",
    updatedAt: "2026-02-17",
    relatedToolSlugs: ["uuid-generator", "json-formatter", "url-encoder-decoder"]
  },
  {
    slug: "pdf-merge-best-practices-for-clean-document-sets",
    title: "PDF Merge Best Practices for Clean Document Sets",
    description: "Merge PDFs in the right order and avoid output quality issues.",
    category: "PDF",
    primaryKeyword: "merge pdf online",
    keywords: ["combine pdf files", "pdf order workflow", "document merge tips"],
    publishedAt: "2025-11-15",
    updatedAt: "2026-02-18",
    relatedToolSlugs: ["pdf-merge", "word-to-pdf", "image-compressor"]
  },
  {
    slug: "word-to-pdf-conversion-tips-for-better-layouts",
    title: "Word to PDF Conversion Tips for Better Layouts",
    description: "Keep fonts, spacing, and section structure cleaner when exporting to PDF.",
    category: "Document",
    primaryKeyword: "word to pdf converter online",
    keywords: ["docx to pdf tips", "document formatting", "pdf export quality"],
    publishedAt: "2025-11-29",
    updatedAt: "2026-02-19",
    relatedToolSlugs: ["word-to-pdf", "pdf-merge", "word-counter"]
  },
  {
    slug: "cv-writing-mistakes-that-hurt-job-applications",
    title: "CV Writing Mistakes That Hurt Job Applications",
    description: "Avoid common resume issues and present clearer value to recruiters.",
    category: "Career",
    primaryKeyword: "cv writing tips",
    keywords: ["resume mistakes", "cv template guidance", "job application tips"],
    publishedAt: "2025-12-13",
    updatedAt: "2026-02-20",
    relatedToolSlugs: ["cv-builder", "word-counter", "case-converter"]
  },
  {
    slug: "age-and-bmi-calculators-for-health-tracking",
    title: "Age and BMI Calculators for Health Tracking",
    description: "Use simple calculators for quick estimates and more informed daily decisions.",
    category: "Calculator",
    primaryKeyword: "bmi calculator online",
    keywords: ["age calculator online", "health tracking tools", "bmi category meaning"],
    publishedAt: "2025-12-27",
    updatedAt: "2026-02-21",
    relatedToolSlugs: ["age-calculator", "bmi-calculator", "word-counter"]
  },
  {
    slug: "how-to-plan-a-scalable-tools-blog-content-calendar",
    title: "How to Plan a Scalable Tools Blog Content Calendar",
    description: "Create a repeatable publishing system that supports tool-page growth and SEO.",
    category: "SEO",
    primaryKeyword: "tools blog content calendar",
    keywords: ["seo editorial calendar", "content planning", "publish consistency strategy"],
    publishedAt: "2026-01-10",
    updatedAt: "2026-02-22",
    relatedToolSlugs: ["slug-generator", "word-counter", "case-converter"]
  }
];
