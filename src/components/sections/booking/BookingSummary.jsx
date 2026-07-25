import { formatCurrency } from "../../../utils/formatters";

export default function BookingSummary({ title, details, priceLines, total, isSubmitting }) {
  return (
    <aside className="h-fit rounded-card border border-hairline bg-white p-6 shadow-soft lg:sticky lg:top-24">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        Booking summary
      </p>
      <h2 className="mt-2 font-display text-lg font-semibold">{title}</h2>

      <div className="mt-4 flex flex-col gap-1 text-sm text-muted">
        {details.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <div className="ticket-divider ticket-divider--on-white my-5" />

      <div className="flex flex-col gap-2 text-sm">
        {priceLines.map(({ label, amount }) => (
          <div key={label} className="flex items-center justify-between">
            <span className="text-muted">{label}</span>
            <span className="font-mono">{formatCurrency(amount)}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-hairline pt-4">
        <span className="font-semibold">Total</span>
        <span className="font-mono text-xl font-semibold">
          {formatCurrency(total)}
        </span>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 w-full rounded-full bg-ochre px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-ochre-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Confirming…" : "Confirm booking"}
      </button>

      <p className="mt-3 text-center text-xs text-muted">
        No payment is collected — this confirms a demo booking only.
      </p>
    </aside>
  );
}
