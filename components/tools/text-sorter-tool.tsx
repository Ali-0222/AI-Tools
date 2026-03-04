"use client";

import { useMemo, useState } from "react";
import { ToolButton } from "@/components/tool-shared";

export function TextSorterTool() {
  const [value, setValue] = useState("");
  const [descending, setDescending] = useState(false);
  const [uniqueOnly, setUniqueOnly] = useState(false);

  const output = useMemo(() => {
    const rawLines = value
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const lines = uniqueOnly ? Array.from(new Set(rawLines)) : rawLines;
    const sorted = [...lines].sort((a, b) =>
      descending ? b.localeCompare(a) : a.localeCompare(b)
    );

    return sorted.join("\n");
  }, [value, descending, uniqueOnly]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-center">Paste line-by-line text</span>
        <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="banana&#10;apple&#10;orange&#10;apple"
          rows={10}
          className="w-full rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 outline-none transition focus:border-[var(--accent)]"
        />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <label className="inline-flex items-center gap-2 text-sm text-[var(--muted)]">
          <input
            type="checkbox"
            checked={descending}
            onChange={(event) => setDescending(event.target.checked)}
          />
          Sort Z-A
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-[var(--muted)]">
          <input
            type="checkbox"
            checked={uniqueOnly}
            onChange={(event) => setUniqueOnly(event.target.checked)}
          />
          Remove duplicates
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Output</span>
        <textarea
          value={output}
          readOnly
          rows={10}
          className="w-full rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 outline-none"
        />
      </label>

      <div className="flex flex-wrap justify-center gap-3">
        <ToolButton onClick={() => navigator.clipboard.writeText(output)} disabled={!output}>
          Copy output
        </ToolButton>
        <ToolButton variant="secondary" onClick={() => setValue("")}>
          Reset
        </ToolButton>
      </div>
    </div>
  );
}
