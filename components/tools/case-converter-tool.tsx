"use client";

import { useState } from "react";
import { ToolButton } from "@/components/tool-shared";

function capitalizeWords(input: string) {
  return input.replace(/\b\w/g, (char) => char.toUpperCase()).replace(/\B\w+/g, (segment) => segment.toLowerCase());
}

export function CaseConverterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  async function copy() {
    await navigator.clipboard.writeText(output);
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Input text</span>
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={8}
          className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
        />
      </label>
      <div className="flex flex-wrap gap-3">
        <ToolButton onClick={() => setOutput(input.toUpperCase())}>Uppercase</ToolButton>
        <ToolButton onClick={() => setOutput(input.toLowerCase())}>Lowercase</ToolButton>
        <ToolButton onClick={() => setOutput(capitalizeWords(input))}>Capitalize</ToolButton>
        <ToolButton variant="secondary" onClick={() => { setInput(""); setOutput(""); }}>
          Reset
        </ToolButton>
      </div>
      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Output</span>
        <textarea
          value={output}
          readOnly
          rows={8}
          className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4"
        />
      </label>
      <ToolButton variant="secondary" onClick={copy} disabled={!output}>
        Copy output
      </ToolButton>
    </div>
  );
}
