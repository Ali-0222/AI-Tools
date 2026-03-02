"use client";

import { useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { FilePicker, ToolButton } from "@/components/tool-shared";
import { extractTextFromDocx } from "@/lib/docx-utils";
import { downloadBlob, formatBytes } from "@/lib/tool-utils";

export function WordToPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [textPreview, setTextPreview] = useState("");

  async function convert() {
    if (!file) {
      return;
    }

    try {
      setLoading(true);
      setError("");
      const text = (await extractTextFromDocx(file)) || " ";
      const pdf = await PDFDocument.create();
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      const pageWidth = 595.28;
      const pageHeight = 841.89;
      const margin = 48;
      const fontSize = 11;
      const lineHeight = 18;
      const maxWidth = pageWidth - margin * 2;

      function wrapText(content: string) {
        const paragraphs = content.split(/\r?\n/);
        const wrapped: string[] = [];

        paragraphs.forEach((paragraph) => {
          if (!paragraph.trim()) {
            wrapped.push("");
            return;
          }

          const words = paragraph.split(/\s+/);
          let currentLine = "";

          words.forEach((word) => {
            const candidate = currentLine ? `${currentLine} ${word}` : word;
            const candidateWidth = font.widthOfTextAtSize(candidate, fontSize);

            if (candidateWidth <= maxWidth) {
              currentLine = candidate;
              return;
            }

            if (currentLine) {
              wrapped.push(currentLine);
            }
            currentLine = word;
          });

          if (currentLine) {
            wrapped.push(currentLine);
          }
        });

        return wrapped;
      }

      const lines = wrapText(text);
      let page = pdf.addPage([pageWidth, pageHeight]);
      let y = pageHeight - margin;

      lines.forEach((line) => {
        if (y < margin + lineHeight) {
          page = pdf.addPage([pageWidth, pageHeight]);
          y = pageHeight - margin;
        }

        if (line) {
          page.drawText(line, {
            x: margin,
            y,
            size: fontSize,
            font,
            color: rgb(0.15, 0.18, 0.22)
          });
        }

        y -= lineHeight;
      });

      const bytes = await pdf.save();
      const blob = new Blob([bytes], { type: "application/pdf" });
      setPdfBlob(blob);
      setTextPreview(text.slice(0, 400));
    } catch {
      setError("Unable to convert this document. Please use a DOCX file.");
      setPdfBlob(null);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setFile(null);
    setLoading(false);
    setError("");
    setPdfBlob(null);
    setTextPreview("");
  }

  return (
    <div className="space-y-6">
      <FilePicker
        label="Upload Word file"
        accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={(files) => {
          setFile(files?.[0] ?? null);
          setPdfBlob(null);
          setError("");
          setTextPreview("");
        }}
      />
      {file ? (
        <div className="rounded-3xl border border-[var(--border)] bg-white p-4">
          <p className="text-sm font-semibold">{file.name}</p>
          <p className="mt-1 text-sm text-[var(--muted)]">{formatBytes(file.size)}</p>
          {textPreview ? (
            <p className="mt-3 max-h-24 overflow-hidden text-sm leading-6 text-[var(--muted)]">{textPreview}</p>
          ) : null}
        </div>
      ) : null}
      {error ? <p className="text-sm text-[var(--warn)]">{error}</p> : null}
      <div className="flex flex-wrap justify-center gap-3">
        <ToolButton onClick={convert} disabled={!file || loading}>
          {loading ? "Converting..." : "Convert to PDF"}
        </ToolButton>
        <ToolButton
          variant="secondary"
          onClick={() => pdfBlob && downloadBlob(pdfBlob, "converted-word.pdf")}
          disabled={!pdfBlob}
        >
          Download PDF
        </ToolButton>
        <ToolButton variant="secondary" onClick={reset}>
          Reset
        </ToolButton>
      </div>
    </div>
  );
}
