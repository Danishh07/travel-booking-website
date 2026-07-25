import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useController } from "react-hook-form";
import { airports } from "../../data/airports";

const MAX_RESULTS = 6;

function matches(airport, query) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    airport.city.toLowerCase().includes(q) ||
    airport.country.toLowerCase().includes(q) ||
    airport.code.toLowerCase().includes(q)
  );
}

/**
 * Drop-in replacement for a plain text input in a React Hook Form form.
 * Stores just the city name as the field value (e.g. "Kyoto") so it stays
 * compatible with the existing loose city/code text matching already used
 * by useFlightsFilter/useHotelsFilter — only the *suggestion list* shows
 * the country and airport code for disambiguation.
 */
export default function AirportAutocomplete({
  name,
  control,
  rules,
  label,
  placeholder = "City or airport",
  icon: Icon,
}) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({ name, control, rules, defaultValue: "" });

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const closeTimeout = useRef(null);

  useEffect(() => {
    return () => clearTimeout(closeTimeout.current);
  }, []);

  const inputId = useId();
  const listboxId = useId();
  const errorId = useId();
  const optionId = (index) => `${listboxId}-option-${index}`;

  const suggestions = useMemo(() => {
    const filtered = airports.filter((airport) => matches(airport, value));
    return filtered.slice(0, MAX_RESULTS);
  }, [value]);

  const selectSuggestion = (airport) => {
    onChange(airport.city);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setIsOpen(true);
      return;
    }
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
        e.preventDefault();
        selectSuggestion(suggestions[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  return (
    <div className="relative">
      {label && (
        <label htmlFor={inputId} className="text-xs font-medium text-muted">
          {label}
        </label>
      )}
      <div className="mt-1 flex items-center gap-2 border-b border-hairline pb-2 focus-within:border-ink">
        {Icon && <Icon className="shrink-0 text-muted" aria-hidden="true" />}
        <input
          id={inputId}
          ref={ref}
          type="text"
          role="combobox"
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-activedescendant={
            isOpen && highlightedIndex >= 0 ? optionId(highlightedIndex) : undefined
          }
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted/60"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
            setHighlightedIndex(-1);
          }}
          onFocus={() => {
            clearTimeout(closeTimeout.current);
            setIsOpen(true);
          }}
          onBlur={() => {
            // Delay so a suggestion's onMouseDown (which preventDefault's
            // the blur already) still has time to run its onClick.
            closeTimeout.current = setTimeout(() => setIsOpen(false), 100);
            onBlur();
          }}
          onKeyDown={handleKeyDown}
        />
      </div>

      {error && (
        <p id={errorId} className="mt-1 text-xs text-red-600">
          {error.message}
        </p>
      )}

      {isOpen && suggestions.length > 0 && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-20 mt-1 w-full min-w-[220px] overflow-hidden rounded-lg border border-hairline bg-white shadow-lift"
        >
          {suggestions.map((airport, index) => (
            <li key={airport.id} role="presentation">
              <button
                type="button"
                id={optionId(index)}
                role="option"
                aria-selected={index === highlightedIndex}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => selectSuggestion(airport)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition-colors ${
                  index === highlightedIndex ? "bg-ochre/10" : "hover:bg-ink/5"
                }`}
              >
                <span>
                  <span className="font-medium text-ink">{airport.city}</span>
                  <span className="text-muted">, {airport.country}</span>
                </span>
                <span className="shrink-0 font-mono text-xs text-muted">
                  {airport.code}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
