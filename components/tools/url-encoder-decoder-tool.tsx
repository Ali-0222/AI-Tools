"use client";

import { useMemo, useState } from "react";
import { ToolButton } from "@/components/tool-shared";

export function UrlEncoderDecoderTool() {
  const [value, setValue] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const output = useMemo(() => {
    if (!value) {
      return "";
    }

    try {
      return mode === "encode" ? encodeURIComponent(value) : decodeURIComponent(value);
    } catch {
      return "Invalid encoded URL value.";
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
          placeholder={
            mode === "encode" ? "name=Toolbee Pro & value=hello world" : "name%3DToolbee%20Pro"
          }
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
