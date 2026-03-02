"use client";

import { useMemo, useState } from "react";
import { ToolButton } from "@/components/tool-shared";
import { StatCard } from "@/components/tools/stat-card";

export function WordCounterTool() {
  const [value, setValue] = useState("");

  const stats = useMemo(() => {
    const trimmed = value.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const characters = value.length;
    const sentences = trimmed ? trimmed.split(/[.!?]+/).filter(Boolean).length : 0;

    return { words, characters, sentences };
  }, [value]);

  async function copy() {
    await navigator.clipboard.writeText(value);
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Paste text</span>
        <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          rows={12}
          placeholder="Type or paste your content here..."
          className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
        />
      </label>
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Words" value={stats.words} />
        <StatCard label="Characters" value={stats.characters} />
        <StatCard label="Sentences" value={stats.sentences} />
      </div>
      <div className="flex flex-wrap gap-3">
        <ToolButton onClick={copy}>Copy text</ToolButton>
        <ToolButton variant="secondary" onClick={() => setValue("")}>
          Reset
        </ToolButton>
      </div>
    </div>
  );
}
