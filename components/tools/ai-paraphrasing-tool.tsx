"use client";

import { useState } from "react";
import { ToolButton } from "@/components/tool-shared";
import { StatCard } from "@/components/tools/stat-card";

type Tone = "standard" | "formal" | "concise";

const synonymMap: Record<string, string[]> = {
  important: ["crucial", "key", "significant"],
  good: ["strong", "solid", "reliable"],
  bad: ["poor", "weak", "problematic"],
  help: ["assist", "support", "guide"],
  use: ["apply", "utilize", "use"],
  make: ["create", "build", "produce"],
  start: ["begin", "initiate", "start"],
  show: ["display", "present", "show"],
  improve: ["enhance", "improve", "upgrade"],
  change: ["modify", "adjust", "change"],
  easy: ["simple", "straightforward", "easy"],
  difficult: ["challenging", "complex", "difficult"],
  fast: ["quick", "rapid", "fast"],
  idea: ["concept", "approach", "idea"],
  result: ["outcome", "result", "output"],
  many: ["numerous", "several", "many"],
  people: ["users", "individuals", "people"],
  buy: ["purchase", "acquire", "buy"],
  get: ["obtain", "receive", "get"],
  find: ["discover", "identify", "find"]
};

const formalPhraseMap: Array<[RegExp, string]> = [
  [/\bcan\b/gi, "may"],
  [/\bso\b/gi, "therefore"],
  [/\balso\b/gi, "additionally"],
  [/\ba lot of\b/gi, "many"],
  [/\bkind of\b/gi, "somewhat"]
];

const conciseDropWords = new Set(["very", "really", "quite", "just", "actually", "basically", "simply"]);

function preserveCase(source: string, replacement: string) {
  if (source.toUpperCase() === source) {
    return replacement.toUpperCase();
  }

  if (source[0] && source[0] === source[0].toUpperCase()) {
    return replacement[0].toUpperCase() + replacement.slice(1);
  }

  return replacement;
}

function paraphraseLine(line: string, tone: Tone, strength: number, lineSeed: number) {
  if (line.trim().length === 0) {
    return line;
  }

  const tokens = line.match(/[A-Za-z']+|[^A-Za-z']+/g) ?? [line];
  const transformed = tokens
    .map((token, index) => {
      if (!/^[A-Za-z']+$/.test(token)) {
        return token;
      }

      const lower = token.toLowerCase();
      if (tone === "concise" && conciseDropWords.has(lower)) {
        return "";
      }

      const options = synonymMap[lower];
      if (!options) {
        return token;
      }

      const score = (lineSeed * 37 + index * 17 + lower.length * 11) % 100;
      if (score > strength) {
        return token;
      }

      const choiceIndex = (lineSeed + index + tone.length) % options.length;
      const replacement = options[choiceIndex];
      return preserveCase(token, replacement);
    })
    .join("");

  if (tone !== "formal") {
    return transformed.replace(/\s{2,}/g, " ").trim();
  }

  let output = transformed;
  for (const [pattern, replacement] of formalPhraseMap) {
    output = output.replace(pattern, replacement);
  }

  return output.replace(/\s{2,}/g, " ").trim();
}

function paraphraseText(input: string, tone: Tone, strength: number) {
  const lines = input.split(/\r?\n/);
  return lines
    .map((line, index) => paraphraseLine(line, tone, strength, index + 1))
    .join("\n")
    .trim();
}

function wordCount(text: string) {
  return text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length;
}

export function AiParaphrasingTool() {
  const [input, setInput] = useState("");
  const [tone, setTone] = useState<Tone>("standard");
  const [strength, setStrength] = useState(55);
  const [output, setOutput] = useState("");

  async function copyOutput() {
    if (!output) {
      return;
    }

    await navigator.clipboard.writeText(output);
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Input text</span>
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={9}
          className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 outline-none ring-0 transition focus:border-[var(--accent)]"
          placeholder="Paste text you want to rewrite..."
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">Tone</span>
          <select
            value={tone}
            onChange={(event) => setTone(event.target.value as Tone)}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3"
          >
            <option value="standard">Standard</option>
            <option value="formal">Formal</option>
            <option value="concise">Concise</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">Rewrite strength: {strength}%</span>
          <input
            type="range"
            min={20}
            max={90}
            step={5}
            value={strength}
            onChange={(event) => setStrength(Number(event.target.value))}
            className="w-full"
          />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <StatCard label="Input words" value={wordCount(input)} />
        <StatCard label="Output words" value={wordCount(output)} />
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Paraphrased output</span>
        <textarea
          value={output}
          readOnly
          rows={9}
          className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 outline-none"
          placeholder="Your rewritten text will appear here..."
        />
      </label>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--muted)]">
        This paraphrasing helper runs in-browser and provides draft rewrites. Always review and edit the final
        text for accuracy and original meaning.
      </div>

      <div className="flex flex-wrap gap-3">
        <ToolButton onClick={() => setOutput(paraphraseText(input, tone, strength))} disabled={!input.trim()}>
          Paraphrase text
        </ToolButton>
        <ToolButton variant="secondary" onClick={() => void copyOutput()} disabled={!output}>
          Copy output
        </ToolButton>
        <ToolButton
          variant="secondary"
          onClick={() => {
            setInput("");
            setOutput("");
            setTone("standard");
            setStrength(55);
          }}
        >
          Reset
        </ToolButton>
      </div>
    </div>
  );
}
