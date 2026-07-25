import { useMemo, useState } from "react";

const PAGE_SIZE = 6;

const SORT_OPTIONS = {
  cheapest: (a, b) => a.price - b.price,
  fastest: (a, b) => a.durationMinutes - b.durationMinutes,
  earliest: (a, b) => a.departTime.localeCompare(b.departTime),
};

const initialFilters = {
  stops: [], // e.g. [0, 1] — empty means "any"
  airlines: [], // empty means "any"
  maxPrice: null,
};

export function useFlightsFilter(allFlights, searchQuery = {}) {
  const [filters, setFilters] = useState(initialFilters);
  const [sortBy, setSortBy] = useState("cheapest");
  const [page, setPage] = useState(1);

  const priceBounds = useMemo(() => {
    const prices = allFlights.map((f) => f.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [allFlights]);

  const airlineOptions = useMemo(
    () => [...new Set(allFlights.map((f) => f.airline))],
    [allFlights]
  );

  const results = useMemo(() => {
    let list = [...allFlights];

    // Match against the search bar's From/To, if provided — loose,
    // case-insensitive substring match since this is mock data.
    if (searchQuery.from) {
      const q = searchQuery.from.toLowerCase();
      list = list.filter(
        (f) =>
          f.from.city.toLowerCase().includes(q) ||
          f.from.code.toLowerCase().includes(q)
      );
    }
    if (searchQuery.to) {
      const q = searchQuery.to.toLowerCase();
      list = list.filter(
        (f) =>
          f.to.city.toLowerCase().includes(q) ||
          f.to.code.toLowerCase().includes(q)
      );
    }

    if (filters.stops.length > 0) {
      list = list.filter((f) => filters.stops.includes(f.stops));
    }
    if (filters.airlines.length > 0) {
      list = list.filter((f) => filters.airlines.includes(f.airline));
    }
    if (filters.maxPrice != null) {
      list = list.filter((f) => f.price <= filters.maxPrice);
    }

    list.sort(SORT_OPTIONS[sortBy]);
    return list;
  }, [allFlights, searchQuery.from, searchQuery.to, filters, sortBy]);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const paginated = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const updateFilters = (partial) => {
    setFilters((prev) => ({ ...prev, ...partial }));
    setPage(1);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setPage(1);
  };

  return {
    results: paginated,
    resultCount: results.length,
    filters,
    updateFilters,
    resetFilters,
    airlineOptions,
    priceBounds,
    sortBy,
    setSortBy: (value) => {
      setSortBy(value);
      setPage(1);
    },
    page,
    totalPages,
    setPage,
  };
}
