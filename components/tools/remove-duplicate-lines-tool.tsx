"use client";

import { useMemo, useState } from "react";
import { ToolButton } from "@/components/tool-shared";
import { StatCard } from "@/components/tools/stat-card";

export function RemoveDuplicateLinesTool() {
  const [input, setInput] = useState("");

  const output = useMemo(() => {
    const lines = input.split(/\r?\n/);
    const uniqueLines = [...new Set(lines)];
    return uniqueLines.join("\n");
  }, [input]);

  const removedCount = useMemo(() => {
    const lines = input.split(/\r?\n/).filter(Boolean);
    return Math.max(0, lines.length - new Set(lines).size);
  }, [input]);

  async function copy() {
    await navigator.clipboard.writeText(output);
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Input lines</span>
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={10}
          className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
        />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <StatCard label="Lines removed" value={removedCount} />
        <StatCard label="Unique lines" value={output ? output.split(/\r?\n/).filter(Boolean).length : 0} />
      </div>
      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Output</span>
        <textarea
          value={output}
          readOnly
          rows={10}
          className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4"
        />
      </label>
      <div className="flex flex-wrap gap-3">
        <ToolButton onClick={copy}>Copy output</ToolButton>
        <ToolButton variant="secondary" onClick={() => setInput("")}>
          Reset
        </ToolButton>
      </div>
    </div>
  );
}
