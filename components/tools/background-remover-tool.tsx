"use client";

import { useEffect, useState } from "react";
import { FilePicker, ToolButton } from "@/components/tool-shared";
import { StatCard } from "@/components/tools/stat-card";
import { UploadPreviewCard } from "@/components/tools/upload-preview-card";
import { downloadBlob, formatBytes, loadImage, prepareImageFile, readFileAsDataUrl } from "@/lib/tool-utils";

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function buildOutputName(fileName: string) {
  return fileName.replace(/\.[^.]+$/, "") + "-no-bg.png";
}

function getCornerBackgroundColor(data: Uint8ClampedArray, width: number, height: number) {
  const sampleSize = clamp(Math.floor(Math.min(width, height) * 0.08), 4, 40);
  const corners = [
    { startX: 0, startY: 0 },
    { startX: width - sampleSize, startY: 0 },
    { startX: 0, startY: height - sampleSize },
    { startX: width - sampleSize, startY: height - sampleSize }
  ];

  let red = 0;
  let green = 0;
  let blue = 0;
  let count = 0;

  for (const corner of corners) {
    for (let y = corner.startY; y < corner.startY + sampleSize; y += 1) {
      for (let x = corner.startX; x < corner.startX + sampleSize; x += 1) {
        const index = (y * width + x) * 4;
        red += data[index];
        green += data[index + 1];
        blue += data[index + 2];
        count += 1;
      }
    }
  }

  if (count === 0) {
    return { red: 255, green: 255, blue: 255 };
  }

  return {
    red: Math.round(red / count),
    green: Math.round(green / count),
    blue: Math.round(blue / count)
  };
}

function colorDistance(
  red: number,
  green: number,
  blue: number,
  background: { red: number; green: number; blue: number }
) {
  const redDiff = red - background.red;
  const greenDiff = green - background.green;
  const blueDiff = blue - background.blue;

  return Math.sqrt(redDiff ** 2 + greenDiff ** 2 + blueDiff ** 2);
}

export function BackgroundRemoverTool() {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [sourcePreviewUrl, setSourcePreviewUrl] = useState("");
  const [sourceWidth, setSourceWidth] = useState(0);
  const [sourceHeight, setSourceHeight] = useState(0);
  const [threshold, setThreshold] = useState(52);
  const [softness, setSoftness] = useState(28);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputPreviewUrl, setOutputPreviewUrl] = useState("");
  const [error, setError] = useState("");
  const [isPreparing, setIsPreparing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(
    () => () => {
      if (outputPreviewUrl) {
        URL.revokeObjectURL(outputPreviewUrl);
      }
    },
    [outputPreviewUrl]
  );

  async function handleFileChange(file: File | null) {
    setSourceFile(file);
    setOutputBlob(null);
    setError("");
    setSourcePreviewUrl("");
    setSourceWidth(0);
    setSourceHeight(0);
    setIsPreparing(false);

    if (outputPreviewUrl) {
      URL.revokeObjectURL(outputPreviewUrl);
      setOutputPreviewUrl("");
    }

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

  async function removeBackground() {
    if (!sourceFile) {
      return;
    }

    try {
      setIsProcessing(true);
      setError("");
      const dataUrl = await readFileAsDataUrl(sourceFile);
      const image = await loadImage(dataUrl);
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Canvas is not available.");
      }

      context.drawImage(image, 0, 0);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const background = getCornerBackgroundColor(imageData.data, canvas.width, canvas.height);
      const lowerLimit = threshold;
      const upperLimit = threshold + softness;

      for (let index = 0; index < imageData.data.length; index += 4) {
        const red = imageData.data[index];
        const green = imageData.data[index + 1];
        const blue = imageData.data[index + 2];
        const alpha = imageData.data[index + 3];
        const distance = colorDistance(red, green, blue, background);

        if (distance <= lowerLimit) {
          imageData.data[index + 3] = 0;
          continue;
        }

        if (distance < upperLimit) {
          const keepRatio = (distance - lowerLimit) / Math.max(1, softness);
          imageData.data[index + 3] = Math.round(alpha * keepRatio);
        }
      }

      context.putImageData(imageData, 0, 0);
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));

      if (!blob) {
        throw new Error("Background removal failed.");
      }

      if (outputPreviewUrl) {
        URL.revokeObjectURL(outputPreviewUrl);
      }

      setOutputBlob(blob);
      setOutputPreviewUrl(URL.createObjectURL(blob));
    } catch (processingError) {
      setError(processingError instanceof Error ? processingError.message : "Unable to remove background.");
      setOutputBlob(null);
      if (outputPreviewUrl) {
        URL.revokeObjectURL(outputPreviewUrl);
        setOutputPreviewUrl("");
      }
    } finally {
      setIsProcessing(false);
    }
  }

  function reset() {
    if (outputPreviewUrl) {
      URL.revokeObjectURL(outputPreviewUrl);
    }

    setSourceFile(null);
    setSourcePreviewUrl("");
    setSourceWidth(0);
    setSourceHeight(0);
    setThreshold(52);
    setSoftness(28);
    setOutputBlob(null);
    setOutputPreviewUrl("");
    setError("");
    setIsPreparing(false);
    setIsProcessing(false);
  }

  return (
    <div className="space-y-5">
      <FilePicker
        label="Upload image"
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

      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Background similarity: {threshold}</span>
        <input
          type="range"
          min={20}
          max={130}
          step={1}
          value={threshold}
          onChange={(event) => setThreshold(Number(event.target.value))}
          className="w-full"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Edge softness: {softness}</span>
        <input
          type="range"
          min={0}
          max={90}
          step={1}
          value={softness}
          onChange={(event) => setSoftness(Number(event.target.value))}
          className="w-full"
        />
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <StatCard label="Original size" value={sourceFile ? formatBytes(sourceFile.size) : "0 KB"} />
        <StatCard label="Output size" value={outputBlob ? formatBytes(outputBlob.size) : "0 KB"} />
      </div>

      {outputPreviewUrl ? (
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] p-4">
          <p className="mb-3 text-sm font-semibold">Transparent PNG preview</p>
          <div
            className="rounded-2xl border border-[var(--border)] p-3"
            style={{
              backgroundImage:
                "linear-gradient(45deg, #e2e8f0 25%, transparent 25%), linear-gradient(-45deg, #e2e8f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e2e8f0 75%), linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)",
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px"
            }}
          >
            <img
              src={outputPreviewUrl}
              alt="Background removed preview"
              className="max-h-96 w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      ) : null}

      {error ? <p className="text-sm text-[var(--warn)]">{error}</p> : null}

      <div className="flex flex-wrap gap-3">
        <ToolButton onClick={() => void removeBackground()} disabled={!sourceFile || isPreparing || isProcessing}>
          {isProcessing ? "Removing..." : "Remove background"}
        </ToolButton>
        <ToolButton
          variant="secondary"
          onClick={() =>
            outputBlob && sourceFile
              ? downloadBlob(outputBlob, buildOutputName(sourceFile.name))
              : undefined
          }
          disabled={!outputBlob || !sourceFile}
        >
          Download PNG
        </ToolButton>
        <ToolButton variant="secondary" onClick={reset}>
          Reset
        </ToolButton>
      </div>
    </div>
  );
}
