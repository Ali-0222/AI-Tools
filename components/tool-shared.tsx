"use client";

import { ChangeEvent, useMemo, useState } from "react";

type TextAreaToolProps = {
  label: string;
  placeholder: string;
  onTransform?: (value: string) => string;
  renderStats?: (value: string) => React.ReactNode;
  outputValue?: string;
  readOnlyOutput?: boolean;
};

export function ToolButton({
  onClick,
  children,
  variant = "primary",
  type = "button",
  disabled = false
}: {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const className =
    variant === "primary"
      ? "bg-[var(--accent)] text-white shadow-[0_10px_24px_rgba(229,50,45,0.28)] hover:bg-[var(--accent-strong)]"
      : "border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-strong)]";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  );
}

export function TextAreaTool({
  label,
  placeholder,
  onTransform,
  renderStats,
  outputValue,
  readOnlyOutput = false
}: TextAreaToolProps) {
  const [value, setValue] = useState("");
  const transformed = useMemo(
    () => (onTransform ? onTransform(value) : value),
    [onTransform, value]
  );
  const activeOutput = outputValue ?? transformed;

  async function copyValue(text: string) {
    if (!text) {
      return;
    }

    await navigator.clipboard.writeText(text);
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-center">{label}</span>
        <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          rows={10}
          className="w-full rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 outline-none ring-0 transition focus:border-[var(--accent)]"
        />
      </label>
      {renderStats ? (
        <div className="grid gap-3 sm:grid-cols-3">{renderStats(value)}</div>
      ) : null}
      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Output</span>
        <textarea
          value={activeOutput}
          readOnly={readOnlyOutput}
          rows={10}
          className="w-full rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 outline-none"
        />
      </label>
      <div className="flex flex-wrap justify-center gap-3">
        <ToolButton onClick={() => copyValue(activeOutput)}>Copy output</ToolButton>
        <ToolButton variant="secondary" onClick={() => setValue("")}>
          Reset
        </ToolButton>
      </div>
    </div>
  );
}

export function FilePicker({
  label,
  accept,
  multiple = false,
  onChange
}: {
  label: string;
  accept: string;
  multiple?: boolean;
  onChange: (files: FileList | null) => void;
}) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.files);
  }

  return (
    <label className="block">
      <span className="mb-3 block text-center text-sm font-semibold">{label}</span>
      <div className="relative overflow-hidden rounded-3xl border-2 border-dashed border-[var(--border)] bg-white p-6 text-center">
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
        />
        <div className="pointer-events-none">
          <div className="mx-auto inline-flex min-h-16 min-w-60 items-center justify-center rounded-2xl bg-[var(--accent)] px-8 py-4 text-2xl font-bold text-white shadow-[0_12px_24px_rgba(229,50,45,0.28)]">
            Select file
          </div>
          <p className="mt-4 text-sm text-[var(--muted)]">or drop files here</p>
        </div>
      </div>
    </label>
  );
}
