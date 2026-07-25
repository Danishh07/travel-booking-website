import { useMemo, useState } from "react";

const PAGE_SIZE = 6;

const SORT_OPTIONS = {
  recommended: (a, b) => b.rating - a.rating,
  priceAsc: (a, b) => a.pricePerNight - b.pricePerNight,
  ratingDesc: (a, b) => b.rating - a.rating,
  mostReviewed: (a, b) => b.reviews - a.reviews,
};

const initialFilters = {
  minRating: null, // e.g. 4.5
  amenities: [], // empty means "any"
  maxPrice: null,
};

export function useHotelsFilter(allHotels, searchQuery = {}) {
  const [filters, setFilters] = useState(initialFilters);
  const [sortBy, setSortBy] = useState("recommended");
  const [page, setPage] = useState(1);

  const priceBounds = useMemo(() => {
    const prices = allHotels.map((h) => h.pricePerNight);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [allHotels]);

  const amenityOptions = useMemo(
    () => [...new Set(allHotels.flatMap((h) => h.tags))].sort(),
    [allHotels]
  );

  const results = useMemo(() => {
    let list = [...allHotels];

    if (searchQuery.location) {
      const q = searchQuery.location.toLowerCase();
      list = list.filter(
        (h) =>
          h.city.toLowerCase().includes(q) ||
          h.location.toLowerCase().includes(q)
      );
    }

    if (filters.minRating != null) {
      list = list.filter((h) => h.rating >= filters.minRating);
    }
    if (filters.amenities.length > 0) {
      list = list.filter((h) =>
        filters.amenities.every((amenity) => h.tags.includes(amenity))
      );
    }
    if (filters.maxPrice != null) {
      list = list.filter((h) => h.pricePerNight <= filters.maxPrice);
    }

    list.sort(SORT_OPTIONS[sortBy]);
    return list;
  }, [allHotels, searchQuery.location, filters, sortBy]);

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
    amenityOptions,
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
