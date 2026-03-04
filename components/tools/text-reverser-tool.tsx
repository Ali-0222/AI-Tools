"use client";

import { TextAreaTool } from "@/components/tool-shared";

export function TextReverserTool() {
  return (
    <TextAreaTool
      label="Enter text"
      placeholder="Type or paste text to reverse..."
      onTransform={(value) => value.split("").reverse().join("")}
      readOnlyOutput
    />
  );
}
