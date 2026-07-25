const RATING_OPTIONS = [4.5, 4, 3.5];

export default function FiltersSidebar({
  filters,
  onChange,
  onReset,
  amenityOptions,
  priceBounds,
}) {
  const toggleAmenity = (amenity) => {
    const next = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    onChange({ amenities: next });
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
          Guest rating
        </legend>
        <div className="mt-3 flex flex-col gap-2">
          {RATING_OPTIONS.map((value) => (
            <label key={value} className="flex items-center gap-2 text-sm text-ink">
              <input
                type="radio"
                name="minRating"
                className="h-4 w-4 border-hairline text-ochre focus:ring-ochre"
                checked={filters.minRating === value}
                onChange={() => onChange({ minRating: value })}
              />
              {value}+ stars
            </label>
          ))}
          <label className="flex items-center gap-2 text-sm text-ink">
            <input
              type="radio"
              name="minRating"
              className="h-4 w-4 border-hairline text-ochre focus:ring-ochre"
              checked={filters.minRating == null}
              onChange={() => onChange({ minRating: null })}
            />
            Any rating
          </label>
        </div>
      </fieldset>

      <div className="ticket-divider ticket-divider--on-white my-5" />

      <fieldset>
        <legend className="text-xs font-semibold uppercase tracking-wide text-muted">
          Max price: ${currentMax} / night
        </legend>
        <input
          type="range"
          min={priceBounds.min}
          max={priceBounds.max}
          step={5}
          value={currentMax}
          onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
          className="mt-3 w-full accent-ochre"
          aria-label="Maximum price per night"
        />
        <div className="mt-1 flex justify-between text-xs text-muted">
          <span>${priceBounds.min}</span>
          <span>${priceBounds.max}</span>
        </div>
      </fieldset>

      <div className="ticket-divider ticket-divider--on-white my-5" />

      <fieldset>
        <legend className="text-xs font-semibold uppercase tracking-wide text-muted">
          Amenities
        </legend>
        <div className="mt-3 flex flex-col gap-2">
          {amenityOptions.map((amenity) => (
            <label key={amenity} className="flex items-center gap-2 text-sm text-ink">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-hairline text-ochre focus:ring-ochre"
                checked={filters.amenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
              />
              {amenity}
            </label>
          ))}
        </div>
      </fieldset>
    </aside>
  );
}
