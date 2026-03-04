"use client";

import { TextAreaTool } from "@/components/tool-shared";

function toSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function SlugGeneratorTool() {
  return (
    <TextAreaTool
      label="Enter title or phrase"
      placeholder="Free Word to PDF Converter Online"
      onTransform={toSlug}
      readOnlyOutput
    />
  );
}
