export default function Loader({ fullPage = false }) {
  const wrapperClasses = fullPage
    ? "flex min-h-[60vh] items-center justify-center"
    : "flex items-center justify-center py-8";

  return (
    <div className={wrapperClasses} role="status" aria-live="polite">
      <span className="sr-only">Loading…</span>
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-hairline border-t-ochre"
        aria-hidden="true"
      />
    </div>
  );
}
