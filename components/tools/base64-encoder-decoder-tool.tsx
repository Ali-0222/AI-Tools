"use client";

import { useMemo, useState } from "react";
import { ToolButton } from "@/components/tool-shared";

function toBase64Unicode(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function fromBase64Unicode(value: string) {
  const binary = atob(value);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function Base64EncoderDecoderTool() {
  const [value, setValue] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const output = useMemo(() => {
    if (!value) {
      return "";
    }

    try {
      return mode === "encode" ? toBase64Unicode(value) : fromBase64Unicode(value);
    } catch {
      return "Invalid Base64 input.";
    }
  }, [mode, value]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap justify-center gap-3">
        <ToolButton
          variant={mode === "encode" ? "primary" : "secondary"}
          onClick={() => setMode("encode")}
        >
          Encode
        </ToolButton>
        <ToolButton
          variant={mode === "decode" ? "primary" : "secondary"}
          onClick={() => setMode("decode")}
        >
          Decode
        </ToolButton>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-center">Input</span>
        <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={mode === "encode" ? "Enter plain text..." : "Enter Base64 string..."}
          rows={8}
          className="w-full rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 outline-none transition focus:border-[var(--accent)]"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Output</span>
        <textarea
          value={output}
          readOnly
          rows={8}
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
