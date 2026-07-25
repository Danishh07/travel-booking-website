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

/**
 * Matches the From/To search against the mock dataset, falling back in
 * stages rather than dead-ending on "no results". The dataset is small and
 * mostly one-directional (routes out of New York), so a strict from+to
 * match can legitimately miss valid destinations — in that case we relax
 * to a To-only match, then a From-only match, then the full catalog,
 * always preferring the narrowest tier that still returns something.
 */
function matchByCity(allFlights, searchQuery) {
  const from = searchQuery.from?.trim().toLowerCase();
  const to = searchQuery.to?.trim().toLowerCase();

  if (!from && !to) {
    return { list: allFlights, notice: null };
  }

  const matchesFrom = (f) =>
    f.from.city.toLowerCase().includes(from) || f.from.code.toLowerCase().includes(from);
  const matchesTo = (f) =>
    f.to.city.toLowerCase().includes(to) || f.to.code.toLowerCase().includes(to);

  if (from && to) {
    const exact = allFlights.filter((f) => matchesFrom(f) && matchesTo(f));
    if (exact.length > 0) return { list: exact, notice: null };
  }

  if (to) {
    const toOnly = allFlights.filter(matchesTo);
    if (toOnly.length > 0) {
      return {
        list: toOnly,
        notice: from
          ? "No direct listings from your origin for this route — showing other flights to your destination."
          : null,
      };
    }
  }

  if (from) {
    const fromOnly = allFlights.filter(matchesFrom);
    if (fromOnly.length > 0) {
      return {
        list: fromOnly,
        notice: "No listings for that exact destination — showing other flights from your origin.",
      };
    }
  }

  return {
    list: allFlights,
    notice: "No exact matches for your search — showing all available flights.",
  };
}

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

  const searchFrom = searchQuery.from;
  const searchTo = searchQuery.to;

  const { list: cityMatchedFlights, notice } = useMemo(
    () => matchByCity(allFlights, { from: searchFrom, to: searchTo }),
    [allFlights, searchFrom, searchTo]
  );

  const results = useMemo(() => {
    let list = [...cityMatchedFlights];

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
  }, [cityMatchedFlights, filters, sortBy]);

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
    notice,
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
