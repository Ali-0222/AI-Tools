"use client";

import { TextAreaTool } from "@/components/tool-shared";

function cleanWhitespace(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line, index, list) => !(line === "" && list[index - 1] === ""))
    .join("\n")
    .trim();
}

export function WhitespaceCleanerTool() {
  return (
    <TextAreaTool
      label="Paste messy text"
      placeholder="Paste text with extra spaces..."
      onTransform={cleanWhitespace}
      readOnlyOutput
    />
  );
}
