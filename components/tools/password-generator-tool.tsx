"use client";

import { useState } from "react";
import { ToolButton } from "@/components/tool-shared";

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{};:,.?/|";

function randomChar(charset: string) {
  return charset[Math.floor(Math.random() * charset.length)];
}

function generatePassword(
  length: number,
  useLower: boolean,
  useUpper: boolean,
  useNumbers: boolean,
  useSymbols: boolean
) {
  const pools = [
    useLower ? LOWER : "",
    useUpper ? UPPER : "",
    useNumbers ? NUMBERS : "",
    useSymbols ? SYMBOLS : ""
  ].filter(Boolean);

  if (pools.length === 0) {
    return "";
  }

  const merged = pools.join("");
  let output = "";
  for (let index = 0; index < length; index += 1) {
    output += randomChar(merged);
  }
  return output;
}

export function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [useLower, setUseLower] = useState(true);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Password length: {length}</span>
        <input
          type="range"
          min={8}
          max={64}
          step={1}
          value={length}
          onChange={(event) => setLength(Number(event.target.value))}
          className="w-full"
        />
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="inline-flex items-center gap-2 text-sm text-[var(--muted)]">
          <input type="checkbox" checked={useLower} onChange={(event) => setUseLower(event.target.checked)} />
          Lowercase
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-[var(--muted)]">
          <input type="checkbox" checked={useUpper} onChange={(event) => setUseUpper(event.target.checked)} />
          Uppercase
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-[var(--muted)]">
          <input
            type="checkbox"
            checked={useNumbers}
            onChange={(event) => setUseNumbers(event.target.checked)}
          />
          Numbers
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-[var(--muted)]">
          <input
            type="checkbox"
            checked={useSymbols}
            onChange={(event) => setUseSymbols(event.target.checked)}
          />
          Symbols
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Generated password</span>
        <textarea
          value={password}
          readOnly
          rows={3}
          className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-3 outline-none"
        />
      </label>

      <div className="flex flex-wrap justify-center gap-3">
        <ToolButton
          onClick={() =>
            setPassword(generatePassword(length, useLower, useUpper, useNumbers, useSymbols))
          }
        >
          Generate password
        </ToolButton>
        <ToolButton onClick={() => navigator.clipboard.writeText(password)} disabled={!password}>
          Copy password
        </ToolButton>
        <ToolButton variant="secondary" onClick={() => setPassword("")}>
          Reset
        </ToolButton>
      </div>
    </div>
  );
}
