"use client";

import { useEffect, useState } from "react";
import { FilePicker, ToolButton } from "@/components/tool-shared";
import { StatCard } from "@/components/tools/stat-card";
import { UploadPreviewCard } from "@/components/tools/upload-preview-card";
import { downloadBlob, loadImage, prepareImageFile, readFileAsDataUrl } from "@/lib/tool-utils";

export function ImageResizerTool() {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [keepRatio, setKeepRatio] = useState(true);
  const [naturalRatio, setNaturalRatio] = useState(1);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [sourcePreviewUrl, setSourcePreviewUrl] = useState("");
  const [isPreparing, setIsPreparing] = useState(false);

  useEffect(() => {
    async function syncImage() {
      if (!sourceFile || sourcePreviewUrl) {
        return;
      }

      const src = await readFileAsDataUrl(sourceFile);
      const image = await loadImage(src);
      setWidth(String(image.width));
      setHeight(String(image.height));
      setNaturalRatio(image.width / image.height);
    }

    void syncImage();
  }, [sourceFile, sourcePreviewUrl]);

  async function handleFileChange(file: File | null) {
    setSourceFile(file);
    setOutputBlob(null);
    setSourcePreviewUrl("");

    if (!file) {
      setWidth("");
      setHeight("");
      setIsPreparing(false);
      return;
    }

    try {
      setIsPreparing(true);
      const prepared = await prepareImageFile(file);
      setSourcePreviewUrl(prepared.dataUrl);
      setNaturalRatio(prepared.width / prepared.height);
      setWidth(String(prepared.width));
      setHeight(String(prepared.height));
    } finally {
      setIsPreparing(false);
    }
  }

  function syncDimensions(nextWidth: string, nextHeight: string, source: "width" | "height") {
    if (!keepRatio) {
      if (source === "width") {
        setWidth(nextWidth);
      } else {
        setHeight(nextHeight);
      }
      return;
    }

    if (source === "width") {
      const parsed = Number(nextWidth);
      setWidth(nextWidth);
      setHeight(parsed > 0 ? String(Math.round(parsed / naturalRatio)) : "");
      return;
    }

    const parsed = Number(nextHeight);
    setHeight(nextHeight);
    setWidth(parsed > 0 ? String(Math.round(parsed * naturalRatio)) : "");
  }

  async function resize() {
    if (!sourceFile || !width || !height) {
      return;
    }

    const src = await readFileAsDataUrl(sourceFile);
    const image = await loadImage(src);
    const canvas = document.createElement("canvas");
    canvas.width = Number(width);
    canvas.height = Number(height);
    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, sourceFile.type || "image/png", 0.92)
    );

    setOutputBlob(blob);
  }

  function reset() {
    setSourceFile(null);
    setWidth("");
    setHeight("");
    setKeepRatio(true);
    setOutputBlob(null);
    setSourcePreviewUrl("");
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
          width={Number(width) || undefined}
          height={Number(height) || undefined}
          loading={isPreparing}
        />
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">Width</span>
          <input
            type="number"
            min="1"
            value={width}
            onChange={(event) => syncDimensions(event.target.value, height, "width")}
            className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">Height</span>
          <input
            type="number"
            min="1"
            value={height}
            onChange={(event) => syncDimensions(width, event.target.value, "height")}
            className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3"
          />
        </label>
      </div>
      <label className="flex items-center gap-3 text-sm text-[var(--muted)]">
        <input
          type="checkbox"
          checked={keepRatio}
          onChange={(event) => setKeepRatio(event.target.checked)}
        />
        Maintain aspect ratio
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <StatCard label="Target width" value={width || 0} />
        <StatCard label="Target height" value={height || 0} />
      </div>
      <div className="flex flex-wrap gap-3">
        <ToolButton onClick={resize} disabled={!sourceFile || isPreparing}>
          {isPreparing ? "Loading..." : "Resize image"}
        </ToolButton>
        <ToolButton
          variant="secondary"
          onClick={() =>
            outputBlob && downloadBlob(outputBlob, `resized-${sourceFile?.name ?? "image"}`)
          }
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
