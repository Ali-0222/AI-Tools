type UploadPreviewCardProps = {
  fileName: string;
  previewUrl: string;
  width?: number;
  height?: number;
  loading?: boolean;
};

export function UploadPreviewCard({
  fileName,
  previewUrl,
  width,
  height,
  loading = false
}: UploadPreviewCardProps) {
  return (
    <div className="rounded-3xl border border-[var(--border)] bg-white p-4">
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)]">
          {loading ? (
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]" />
          ) : previewUrl ? (
            <img
              src={previewUrl}
              alt={fileName}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]" />
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[var(--foreground)]">{fileName}</p>
          {loading ? (
            <p className="mt-1 text-sm text-[var(--muted)]">Loading image preview...</p>
          ) : (
            <p className="mt-1 text-sm text-[var(--muted)]">
              {width && height ? `${width} x ${height}px` : "Image ready"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
