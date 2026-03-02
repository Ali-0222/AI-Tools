export type ToolKey =
  | "image-compressor"
  | "image-resizer"
  | "jpg-to-png"
  | "word-counter"
  | "case-converter"
  | "remove-duplicates"
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

export const blogPosts = [
  {
    slug: "how-to-compress-images-for-faster-web-pages",
    title: "How to Compress Images for Faster Web Pages",
    description: "Learn when to reduce image dimensions, lower quality, and pick the right format for SEO performance.",
    category: "Images"
  },
  {
    slug: "why-browser-based-tools-build-user-trust",
    title: "Why Browser-Based Tools Build More User Trust",
    description: "Client-side tools can help privacy messaging, speed perception, and approval readiness.",
    category: "Privacy"
  },
  {
    slug: "json-formatting-mistakes-that-break-apis",
    title: "JSON Formatting Mistakes That Break APIs",
    description: "Common syntax issues, escaping problems, and validation steps for cleaner API payloads.",
    category: "Developer"
  }
];
