"use client";

import { useState } from "react";
import { ToolButton } from "@/components/tool-shared";

export function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  async function copy() {
    await navigator.clipboard.writeText(output);
  }

  function formatJson() {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (formatError) {
      setError(formatError instanceof Error ? formatError.message : "Invalid JSON");
      setOutput("");
    }
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold">JSON input</span>
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={10}
          className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-sm"
        />
      </label>
      <div className="flex flex-wrap gap-3">
        <ToolButton onClick={formatJson}>Beautify JSON</ToolButton>
        <ToolButton variant="secondary" onClick={copy} disabled={!output}>
          Copy output
        </ToolButton>
        <ToolButton variant="secondary" onClick={() => { setInput(""); setOutput(""); setError(""); }}>
          Reset
        </ToolButton>
      </div>
      {error ? <p className="text-sm text-[var(--warn)]">{error}</p> : null}
      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Formatted output</span>
        <textarea
          value={output}
          readOnly
          rows={10}
          className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 font-mono text-sm"
        />
      </label>
    </div>
  );
}
