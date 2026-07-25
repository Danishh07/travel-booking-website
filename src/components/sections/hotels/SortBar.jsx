const SORT_LABELS = {
  recommended: "Recommended",
  priceAsc: "Price: low to high",
  ratingDesc: "Top rated",
  mostReviewed: "Most reviewed",
};

export default function SortBar({ resultCount, sortBy, onSortChange }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm text-muted">
        <span className="font-semibold text-ink">{resultCount}</span>{" "}
        {resultCount === 1 ? "hotel" : "hotels"} found
      </p>

      <label className="flex items-center gap-2 text-sm">
        <span className="text-muted">Sort by</span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-full border border-hairline bg-white px-3 py-1.5 text-sm outline-none focus:border-ink"
        >
          {Object.entries(SORT_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
