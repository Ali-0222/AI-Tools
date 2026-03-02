"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { FilePicker, ToolButton } from "@/components/tool-shared";
import { downloadBlob } from "@/lib/tool-utils";

export function PdfMergeTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [status, setStatus] = useState("");

  async function mergePdfs() {
    if (files.length < 2) {
      setStatus("Please select at least two PDF files.");
      return;
    }

    try {
      const merged = await PDFDocument.create();

      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const source = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(source, source.getPageIndices());
        pages.forEach((page) => merged.addPage(page));
      }

      const mergedBytes = await merged.save();
      const pdfBytes =
        mergedBytes instanceof Uint8Array ? new Uint8Array(mergedBytes) : new Uint8Array(mergedBytes);
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      setOutputBlob(blob);
      setStatus("PDFs merged successfully.");
    } catch {
      setStatus("Unable to merge these PDF files.");
      setOutputBlob(null);
    }
  }

  function reset() {
    setFiles([]);
    setOutputBlob(null);
    setStatus("");
  }

  return (
    <div className="space-y-5">
      <FilePicker
        label="Upload PDF files"
        accept=".pdf,application/pdf"
        multiple
        onChange={(nextFiles) => {
          setFiles(nextFiles ? Array.from(nextFiles) : []);
          setOutputBlob(null);
          setStatus("");
        }}
      />
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 text-sm text-[var(--muted)]">
        {files.length ? `${files.length} PDF file(s) selected.` : "Select two or more PDF files to merge."}
      </div>
      {status ? <p className="text-sm text-[var(--muted)]">{status}</p> : null}
      <div className="flex flex-wrap gap-3">
        <ToolButton onClick={mergePdfs}>Merge PDFs</ToolButton>
        <ToolButton
          variant="secondary"
          onClick={() => outputBlob && downloadBlob(outputBlob, "merged.pdf")}
          disabled={!outputBlob}
        >
          Download merged PDF
        </ToolButton>
        <ToolButton variant="secondary" onClick={reset}>
          Reset
        </ToolButton>
      </div>
    </div>
  );
}
