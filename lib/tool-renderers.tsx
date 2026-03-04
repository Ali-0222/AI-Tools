import { notFound } from "next/navigation";
import { AgeCalculatorTool } from "@/components/tools/age-calculator-tool";
import { BmiCalculatorTool } from "@/components/tools/bmi-calculator-tool";
import { Base64EncoderDecoderTool } from "@/components/tools/base64-encoder-decoder-tool";
import { CaseConverterTool } from "@/components/tools/case-converter-tool";
import { CvBuilderTool } from "@/components/tools/cv-builder-tool";
import { ImageCompressorTool } from "@/components/tools/image-compressor-tool";
import { ImageResizerTool } from "@/components/tools/image-resizer-tool";
import { JpgToPngTool } from "@/components/tools/jpg-to-png-tool";
import { JsonFormatterTool } from "@/components/tools/json-formatter-tool";
import { PasswordGeneratorTool } from "@/components/tools/password-generator-tool";
import { PdfMergeTool } from "@/components/tools/pdf-merge-tool";
import { RemoveDuplicateLinesTool } from "@/components/tools/remove-duplicate-lines-tool";
import { SlugGeneratorTool } from "@/components/tools/slug-generator-tool";
import { TextReverserTool } from "@/components/tools/text-reverser-tool";
import { TextSorterTool } from "@/components/tools/text-sorter-tool";
import { UrlEncoderDecoderTool } from "@/components/tools/url-encoder-decoder-tool";
import { UuidGeneratorTool } from "@/components/tools/uuid-generator-tool";
import { WhitespaceCleanerTool } from "@/components/tools/whitespace-cleaner-tool";
import { WordCounterTool } from "@/components/tools/word-counter-tool";
import { WordToPdfTool } from "@/components/tools/word-to-pdf-tool";
import type { ToolKey } from "@/lib/site-data";

const toolComponentMap: Record<ToolKey, React.ReactNode> = {
  "age-calculator": <AgeCalculatorTool />,
  "bmi-calculator": <BmiCalculatorTool />,
  "base64-encoder-decoder": <Base64EncoderDecoderTool />,
  "case-converter": <CaseConverterTool />,
  "cv-builder": <CvBuilderTool />,
  "image-compressor": <ImageCompressorTool />,
  "image-resizer": <ImageResizerTool />,
  "jpg-to-png": <JpgToPngTool />,
  "json-formatter": <JsonFormatterTool />,
  "password-generator": <PasswordGeneratorTool />,
  "pdf-merge": <PdfMergeTool />,
  "remove-duplicates": <RemoveDuplicateLinesTool />,
  "slug-generator": <SlugGeneratorTool />,
  "text-reverser": <TextReverserTool />,
  "text-sorter": <TextSorterTool />,
  "url-encoder-decoder": <UrlEncoderDecoderTool />,
  "uuid-generator": <UuidGeneratorTool />,
  "whitespace-cleaner": <WhitespaceCleanerTool />,
  "word-counter": <WordCounterTool />,
  "word-to-pdf": <WordToPdfTool />
};

export function renderToolBySlug(slug: ToolKey) {
  const node = toolComponentMap[slug];
  if (!node) {
    notFound();
  }
  return node;
}
