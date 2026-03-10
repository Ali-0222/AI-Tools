export function AdSidebar() {
  return (
    <aside className="space-y-6 lg:sticky lg:top-6 lg:h-fit" aria-label="Sidebar">
      {/* <div className="ad-slot">
        <div>
          <p className="text-xs uppercase tracking-[0.2em]">Ad Placeholder</p>
          <p className="mt-2 text-sm">Reserved sidebar placement for a future AdSense unit.</p>
        </div>
      </div> */}
      <div className="card p-5">
        <h2 className="text-lg font-bold">Why users trust this site</h2>
        <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
          <li>No account required.</li>
          <li>Files stay in the browser for supported tools.</li>
          <li>Clear reset, copy, and download actions.</li>
        </ul>
      </div>
    </aside>
  );
}
