import { notFound } from "next/navigation";
import { AgeCalculatorTool } from "@/components/tools/age-calculator-tool";
import { BmiCalculatorTool } from "@/components/tools/bmi-calculator-tool";
import { CaseConverterTool } from "@/components/tools/case-converter-tool";
import { CvBuilderTool } from "@/components/tools/cv-builder-tool";
import { ImageCompressorTool } from "@/components/tools/image-compressor-tool";
import { ImageResizerTool } from "@/components/tools/image-resizer-tool";
import { JpgToPngTool } from "@/components/tools/jpg-to-png-tool";
import { JsonFormatterTool } from "@/components/tools/json-formatter-tool";
import { PdfMergeTool } from "@/components/tools/pdf-merge-tool";
import { RemoveDuplicateLinesTool } from "@/components/tools/remove-duplicate-lines-tool";
import { WordCounterTool } from "@/components/tools/word-counter-tool";
import { WordToPdfTool } from "@/components/tools/word-to-pdf-tool";
import type { ToolKey } from "@/lib/site-data";

const toolComponentMap: Record<ToolKey, React.ReactNode> = {
  "age-calculator": <AgeCalculatorTool />,
  "bmi-calculator": <BmiCalculatorTool />,
  "case-converter": <CaseConverterTool />,
  "cv-builder": <CvBuilderTool />,
  "image-compressor": <ImageCompressorTool />,
  "image-resizer": <ImageResizerTool />,
  "jpg-to-png": <JpgToPngTool />,
  "json-formatter": <JsonFormatterTool />,
  "pdf-merge": <PdfMergeTool />,
  "remove-duplicates": <RemoveDuplicateLinesTool />,
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
