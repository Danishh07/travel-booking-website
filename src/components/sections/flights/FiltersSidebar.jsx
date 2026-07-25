const STOP_OPTIONS = [
  { value: 0, label: "Nonstop" },
  { value: 1, label: "1 stop" },
  { value: 2, label: "2+ stops" },
];

export default function FiltersSidebar({
  filters,
  onChange,
  onReset,
  airlineOptions,
  priceBounds,
}) {
  const toggleStop = (value) => {
    const next = filters.stops.includes(value)
      ? filters.stops.filter((s) => s !== value)
      : [...filters.stops, value];
    onChange({ stops: next });
  };

  const toggleAirline = (airline) => {
    const next = filters.airlines.includes(airline)
      ? filters.airlines.filter((a) => a !== airline)
      : [...filters.airlines, airline];
    onChange({ airlines: next });
  };

  const currentMax = filters.maxPrice ?? priceBounds.max;

  return (
    <aside className="h-fit rounded-card border border-hairline bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">Filters</h2>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-medium text-harbor hover:underline"
        >
          Reset
        </button>
      </div>

      <fieldset className="mt-5">
        <legend className="text-xs font-semibold uppercase tracking-wide text-muted">
          Stops
        </legend>
        <div className="mt-3 flex flex-col gap-2">
          {STOP_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 text-sm text-ink"
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-hairline text-ochre focus:ring-ochre"
                checked={filters.stops.includes(option.value)}
                onChange={() => toggleStop(option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="ticket-divider ticket-divider--on-white my-5" />

      <fieldset>
        <legend className="text-xs font-semibold uppercase tracking-wide text-muted">
          Max price: ${currentMax}
        </legend>
        <input
          type="range"
          min={priceBounds.min}
          max={priceBounds.max}
          step={10}
          value={currentMax}
          onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
          className="mt-3 w-full accent-ochre"
          aria-label="Maximum price"
        />
        <div className="mt-1 flex justify-between text-xs text-muted">
          <span>${priceBounds.min}</span>
          <span>${priceBounds.max}</span>
        </div>
      </fieldset>

      <div className="ticket-divider ticket-divider--on-white my-5" />

      <fieldset>
        <legend className="text-xs font-semibold uppercase tracking-wide text-muted">
          Airlines
        </legend>
        <div className="mt-3 flex flex-col gap-2">
          {airlineOptions.map((airline) => (
            <label
              key={airline}
              className="flex items-center gap-2 text-sm text-ink"
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-hairline text-ochre focus:ring-ochre"
                checked={filters.airlines.includes(airline)}
                onChange={() => toggleAirline(airline)}
              />
              {airline}
            </label>
          ))}
        </div>
      </fieldset>
    </aside>
  );
}
