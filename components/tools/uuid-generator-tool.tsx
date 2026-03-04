"use client";

import { useMemo, useState } from "react";
import { ToolButton } from "@/components/tool-shared";

function fallbackUuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const rand = Math.random() * 16 | 0;
    const value = char === "x" ? rand : (rand & 0x3) | 0x8;
    return value.toString(16);
  });
}

function buildUuidList(count: number) {
  return Array.from({ length: count }, () =>
    typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : fallbackUuid()
  );
}

export function UuidGeneratorTool() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);
  const output = useMemo(() => uuids.join("\n"), [uuids]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold">How many UUIDs: {count}</span>
        <input
          type="range"
          min={1}
          max={50}
          step={1}
          value={count}
          onChange={(event) => setCount(Number(event.target.value))}
          className="w-full"
        />
      </label>

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
        <ToolButton onClick={() => setUuids(buildUuidList(count))}>Generate UUIDs</ToolButton>
        <ToolButton onClick={() => navigator.clipboard.writeText(output)} disabled={!output}>
          Copy all
        </ToolButton>
        <ToolButton variant="secondary" onClick={() => setUuids([])}>
          Reset
        </ToolButton>
      </div>
    </div>
  );
}
