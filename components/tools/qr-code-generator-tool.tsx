"use client";

import { useState } from "react";
import { ToolButton } from "@/components/tool-shared";
import { StatCard } from "@/components/tools/stat-card";
import { downloadBlob } from "@/lib/tool-utils";

function buildQrUrl(text: string, size: number, margin: number) {
  const encodedData = encodeURIComponent(text);
  return `https://api.qrserver.com/v1/create-qr-code/?format=png&size=${size}x${size}&margin=${margin}&data=${encodedData}`;
}

export function QrCodeGeneratorTool() {
  const [input, setInput] = useState("");
  const [size, setSize] = useState(320);
  const [margin, setMargin] = useState(8);
  const [qrUrl, setQrUrl] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState("");

  const hasInput = input.trim().length > 0;

  function generate() {
    if (!hasInput) {
      return;
    }

    setError("");
    setQrUrl(buildQrUrl(input.trim(), size, margin));
  }

  async function downloadQr() {
    if (!qrUrl) {
      return;
    }

    try {
      setIsDownloading(true);
      setError("");
      const response = await fetch(qrUrl);

      if (!response.ok) {
        throw new Error("Unable to download QR image right now.");
      }

      const blob = await response.blob();
      downloadBlob(blob, "qr-code.png");
    } catch (downloadError) {
      setError(downloadError instanceof Error ? downloadError.message : "Unable to download QR image.");
    } finally {
      setIsDownloading(false);
    }
  }

  function reset() {
    setInput("");
    setSize(320);
    setMargin(8);
    setQrUrl("");
    setError("");
    setIsDownloading(false);
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Text or URL</span>
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={4}
          className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 outline-none ring-0 transition focus:border-[var(--accent)]"
          placeholder="https://example.com or any text"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">Image size: {size}px</span>
          <input
            type="range"
            min={200}
            max={800}
            step={40}
            value={size}
            onChange={(event) => setSize(Number(event.target.value))}
            className="w-full"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">Quiet margin: {margin}px</span>
          <input
            type="range"
            min={0}
            max={40}
            step={2}
            value={margin}
            onChange={(event) => setMargin(Number(event.target.value))}
            className="w-full"
          />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <StatCard label="Characters" value={input.trim().length} />
        <StatCard label="Output size" value={`${size} x ${size}`} />
      </div>

      {qrUrl ? (
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] p-4">
          <p className="mb-3 text-sm font-semibold">QR preview</p>
          <div className="flex justify-center rounded-2xl border border-[var(--border)] bg-white p-4">
            <img
              src={qrUrl}
              alt="Generated QR code"
              className="h-auto max-w-full"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      ) : null}

      {error ? <p className="text-sm text-[var(--warn)]">{error}</p> : null}

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--muted)]">
        QR generation uses an external image API endpoint for rendering. Do not paste sensitive secrets.
      </div>

      <div className="flex flex-wrap gap-3">
        <ToolButton onClick={generate} disabled={!hasInput}>
          Generate QR code
        </ToolButton>
        <ToolButton variant="secondary" onClick={() => void downloadQr()} disabled={!qrUrl || isDownloading}>
          {isDownloading ? "Downloading..." : "Download PNG"}
        </ToolButton>
        <ToolButton variant="secondary" onClick={reset}>
          Reset
        </ToolButton>
      </div>
    </div>
  );
}
