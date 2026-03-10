"use client";

import { useState } from "react";
import { FilePicker, ToolButton } from "@/components/tool-shared";
import { StatCard } from "@/components/tools/stat-card";
import { UploadPreviewCard } from "@/components/tools/upload-preview-card";
import { loadImage, prepareImageFile, readFileAsDataUrl } from "@/lib/tool-utils";

type TextBlock = {
  rawValue?: string;
};

type TextDetectorLike = {
  detect: (source: ImageBitmapSource) => Promise<TextBlock[]>;
};

type WindowWithTextDetector = Window & {
  TextDetector?: new () => TextDetectorLike;
};

function countWords(text: string) {
  return text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length;
}

function normalizeOcrOutput(text: string) {
  const normalizedQuotes = text.replace(/[“”]/g, "\"").replace(/[‘’]/g, "'");
  const cleaned = normalizedQuotes
    .replace(/[~*_`^|<>]/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n");

  return cleaned
    .split(/\r?\n/)
    .map((line) =>
      line
        .replace(/\s{2,}/g, " ")
        .replace(/^[^A-Za-z0-9"']+/, "")
        .replace(/[^A-Za-z0-9"'.!?)+-]+$/, "")
        .trim()
    )
    .filter(Boolean)
    .join("\n");
}

function scoreOcrText(text: string) {
  const value = text.trim();
  if (!value) {
    return 0;
  }

  const letters = (value.match(/[A-Za-z]/g) ?? []).length;
  const words = value.split(/\s+/).filter(Boolean).length;
  const weird = (value.match(/[^A-Za-z0-9\s"'.!?(),:+-]/g) ?? []).length;

  return letters * 2 + words * 3 - weird * 9;
}

async function buildOcrCanvas(file: File) {
  const dataUrl = await readFileAsDataUrl(file);
  const image = await loadImage(dataUrl);
  const upscale = 2;
  const edgeCrop = 0.04;
  const cropX = Math.round(image.width * edgeCrop);
  const cropY = Math.round(image.height * edgeCrop);
  const cropWidth = image.width - cropX * 2;
  const cropHeight = image.height - cropY * 2;

  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, cropWidth * upscale);
  canvas.height = Math.max(1, cropHeight * upscale);

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas is not available for OCR preprocessing.");
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(image, cropX, cropY, cropWidth, cropHeight, 0, 0, canvas.width, canvas.height);

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  let brightnessTotal = 0;

  for (let index = 0; index < imageData.data.length; index += 4) {
    const red = imageData.data[index];
    const green = imageData.data[index + 1];
    const blue = imageData.data[index + 2];
    const gray = Math.round(red * 0.299 + green * 0.587 + blue * 0.114);
    brightnessTotal += gray;
  }

  const pixelCount = imageData.data.length / 4;
  const averageBrightness = pixelCount > 0 ? brightnessTotal / pixelCount : 180;
  const threshold = Math.max(120, Math.min(210, Math.round(averageBrightness + 8)));

  for (let index = 0; index < imageData.data.length; index += 4) {
    const red = imageData.data[index];
    const green = imageData.data[index + 1];
    const blue = imageData.data[index + 2];
    const gray = Math.round(red * 0.299 + green * 0.587 + blue * 0.114);
    const value = gray > threshold ? 255 : 0;
    imageData.data[index] = value;
    imageData.data[index + 1] = value;
    imageData.data[index + 2] = value;
  }

  context.putImageData(imageData, 0, 0);
  return canvas;
}

async function extractWithTextDetector(file: File) {
  const detectorConstructor = (window as WindowWithTextDetector).TextDetector;

  if (!detectorConstructor) {
    return "";
  }

  const detector = new detectorConstructor();
  const bitmap = await createImageBitmap(file);

  try {
    const detections = await detector.detect(bitmap);
    return detections
      .map((item) => item.rawValue?.trim() ?? "")
      .filter(Boolean)
      .join("\n")
      .trim();
  } finally {
    bitmap.close();
  }
}

async function extractWithTesseract(
  file: File,
  onStatus?: (message: string) => void
) {
  const { createWorker, PSM } = await import("tesseract.js");
  const preprocessedCanvas = await buildOcrCanvas(file);
  const worker = await createWorker("eng", 1, {
    logger: (message) => {
      if (!onStatus) {
        return;
      }
      const hasProgress = typeof message.progress === "number";
      const progressText = hasProgress ? ` ${Math.round(message.progress * 100)}%` : "";
      onStatus(`${message.status}${progressText}`);
    }
  });

  try {
    await worker.setParameters({
      tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
      preserve_interword_spaces: "1",
      tessedit_char_whitelist:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789\"'.,:;!?()-+ \n"
    });

    const result = await worker.recognize(preprocessedCanvas);
    return result.data.text.trim();
  } finally {
    await worker.terminate();
  }
}

export function ImageToTextOcrTool() {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [sourcePreviewUrl, setSourcePreviewUrl] = useState("");
  const [sourceWidth, setSourceWidth] = useState(0);
  const [sourceHeight, setSourceHeight] = useState(0);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [isPreparing, setIsPreparing] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);

  async function handleFileChange(file: File | null) {
    setSourceFile(file);
    setSourcePreviewUrl("");
    setSourceWidth(0);
    setSourceHeight(0);
    setOutput("");
    setError("");
    setStatus("");
    setIsPreparing(false);

    if (!file) {
      return;
    }

    try {
      setIsPreparing(true);
      const prepared = await prepareImageFile(file);
      setSourcePreviewUrl(prepared.dataUrl);
      setSourceWidth(prepared.width);
      setSourceHeight(prepared.height);
    } catch {
      setError("Unable to load selected image.");
    } finally {
      setIsPreparing(false);
    }
  }

  async function extractText() {
    if (!sourceFile) {
      return;
    }

    try {
      setIsExtracting(true);
      setError("");
      setStatus("Starting OCR...");

      const browserRawOutput = await extractWithTextDetector(sourceFile);
      const browserOutput = normalizeOcrOutput(browserRawOutput);
      const browserScore = scoreOcrText(browserOutput);

      setStatus("Using fallback OCR engine...");
      const fallbackRawOutput = await extractWithTesseract(sourceFile, (message) => setStatus(message));
      const fallbackOutput = normalizeOcrOutput(fallbackRawOutput);
      const fallbackScore = scoreOcrText(fallbackOutput);

      const bestOutput = fallbackScore >= browserScore ? fallbackOutput : browserOutput;
      if (!bestOutput) {
        setOutput("");
        setStatus("");
        setError("No readable text found in this image. Try a clearer image with higher contrast.");
        return;
      }

      setOutput(bestOutput);
      setStatus(fallbackScore >= browserScore ? "Text extracted with OCR fallback engine." : "Text extracted with browser OCR.");
    } catch (extractError) {
      setOutput("");
      setStatus("");
      setError(extractError instanceof Error ? extractError.message : "Unable to extract text.");
    } finally {
      setIsExtracting(false);
    }
  }

  async function copyOutput() {
    if (!output) {
      return;
    }

    await navigator.clipboard.writeText(output);
  }

  function reset() {
    setSourceFile(null);
    setSourcePreviewUrl("");
    setSourceWidth(0);
    setSourceHeight(0);
    setOutput("");
    setError("");
    setStatus("");
    setIsPreparing(false);
    setIsExtracting(false);
  }

  return (
    <div className="space-y-5">
      <FilePicker
        label="Upload image with text"
        accept="image/*"
        onChange={(files) => void handleFileChange(files?.[0] ?? null)}
      />

      {sourceFile ? (
        <UploadPreviewCard
          fileName={sourceFile.name}
          previewUrl={sourcePreviewUrl}
          width={sourceWidth}
          height={sourceHeight}
          loading={isPreparing}
        />
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        <StatCard label="Characters" value={output.length} />
        <StatCard label="Words" value={countWords(output)} />
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Extracted text</span>
        <textarea
          value={output}
          readOnly
          rows={10}
          className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 outline-none"
          placeholder="OCR output will appear here..."
        />
      </label>

      {status ? <p className="text-sm text-[var(--muted)]">{status}</p> : null}
      {error ? <p className="text-sm text-[var(--warn)]">{error}</p> : null}

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--muted)]">
        This OCR tool first tries built-in browser text detection, then falls back to a local OCR engine for
        wider browser support. Accuracy improves with clear, high-contrast images.
      </div>

      <div className="flex flex-wrap gap-3">
        <ToolButton onClick={() => void extractText()} disabled={!sourceFile || isPreparing || isExtracting}>
          {isExtracting ? "Extracting..." : "Extract text"}
        </ToolButton>
        <ToolButton variant="secondary" onClick={() => void copyOutput()} disabled={!output}>
          Copy text
        </ToolButton>
        <ToolButton variant="secondary" onClick={reset}>
          Reset
        </ToolButton>
      </div>
    </div>
  );
}
