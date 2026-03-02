"use client";

import { useState } from "react";
import { FilePicker, ToolButton } from "@/components/tool-shared";
import { UploadPreviewCard } from "@/components/tools/upload-preview-card";
import { downloadBlob, loadImage, prepareImageFile, readFileAsDataUrl } from "@/lib/tool-utils";

export function JpgToPngTool() {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [sourcePreviewUrl, setSourcePreviewUrl] = useState("");
  const [sourceWidth, setSourceWidth] = useState(0);
  const [sourceHeight, setSourceHeight] = useState(0);
  const [isPreparing, setIsPreparing] = useState(false);

  async function handleFileChange(file: File | null) {
    setSourceFile(file);
    setOutputBlob(null);
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
    } finally {
      setIsPreparing(false);
    }
  }

  async function convert() {
    if (!sourceFile) {
      return;
    }

    const src = await readFileAsDataUrl(sourceFile);
    const image = await loadImage(src);
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    context.drawImage(image, 0, 0);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) {
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(URL.createObjectURL(blob));
    setOutputBlob(blob);
  }

  function reset() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSourceFile(null);
    setOutputBlob(null);
    setPreviewUrl("");
    setSourcePreviewUrl("");
    setSourceWidth(0);
    setSourceHeight(0);
    setIsPreparing(false);
  }

  return (
    <div className="space-y-5">
      <FilePicker
        label="Upload JPG or JPEG"
        accept=".jpg,.jpeg,image/jpeg"
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
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="PNG preview"
          className="max-h-96 w-full rounded-2xl border border-[var(--border)] bg-white p-2 object-contain"
        />
      ) : null}
      <div className="flex flex-wrap gap-3">
        <ToolButton onClick={convert} disabled={!sourceFile || isPreparing}>
          {isPreparing ? "Loading..." : "Convert to PNG"}
        </ToolButton>
        <ToolButton
          variant="secondary"
          onClick={() => outputBlob && downloadBlob(outputBlob, "converted-image.png")}
          disabled={!outputBlob}
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
