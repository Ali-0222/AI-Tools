"use client";

import { useState } from "react";
import { FilePicker, ToolButton } from "@/components/tool-shared";
import { StatCard } from "@/components/tools/stat-card";
import { UploadPreviewCard } from "@/components/tools/upload-preview-card";
import {
  downloadBlob,
  formatBytes,
  loadImage,
  prepareImageFile,
  readFileAsDataUrl
} from "@/lib/tool-utils";

export function ImageCompressorTool() {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.7);
  const [previewUrl, setPreviewUrl] = useState("");
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [error, setError] = useState("");
  const [sourcePreviewUrl, setSourcePreviewUrl] = useState("");
  const [sourceWidth, setSourceWidth] = useState(0);
  const [sourceHeight, setSourceHeight] = useState(0);
  const [isPreparing, setIsPreparing] = useState(false);

  async function handleFileChange(file: File | null) {
    setSourceFile(file);
    setOutputBlob(null);
    setError("");
    setSourcePreviewUrl("");
    setSourceWidth(0);
    setSourceHeight(0);

    if (!file) {
      setIsPreparing(false);
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

  async function handleCompress() {
    if (!sourceFile) {
      return;
    }

    try {
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
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/jpeg", quality)
      );

      if (!blob) {
        throw new Error("Compression failed.");
      }

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      setOutputBlob(blob);
    } catch (compressionError) {
      setError(
        compressionError instanceof Error ? compressionError.message : "Compression failed."
      );
    }
  }

  function reset() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSourceFile(null);
    setQuality(0.7);
    setPreviewUrl("");
    setOutputBlob(null);
    setError("");
    setSourcePreviewUrl("");
    setSourceWidth(0);
    setSourceHeight(0);
    setIsPreparing(false);
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
        <span className="mb-2 block text-sm font-semibold">
          Compression quality: {Math.round(quality * 100)}%
        </span>
        <input
          type="range"
          min="0.2"
          max="0.95"
          step="0.05"
          value={quality}
          onChange={(event) => setQuality(Number(event.target.value))}
          className="w-full"
        />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <StatCard label="Original size" value={sourceFile ? formatBytes(sourceFile.size) : "0 KB"} />
        <StatCard label="Compressed size" value={outputBlob ? formatBytes(outputBlob.size) : "0 KB"} />
      </div>
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Compressed preview"
          className="max-h-96 w-full rounded-2xl border border-[var(--border)] bg-white p-2 object-contain"
        />
      ) : null}
      {error ? <p className="text-sm text-[var(--warn)]">{error}</p> : null}
      <div className="flex flex-wrap gap-3">
        <ToolButton onClick={handleCompress} disabled={!sourceFile || isPreparing}>
          {isPreparing ? "Loading..." : "Compress image"}
        </ToolButton>
        <ToolButton
          variant="secondary"
          onClick={() => outputBlob && downloadBlob(outputBlob, "compressed-image.jpg")}
          disabled={!outputBlob}
        >
          Download
        </ToolButton>
        <ToolButton variant="secondary" onClick={reset}>
          Reset
        </ToolButton>
      </div>
    </div>
  );
}
