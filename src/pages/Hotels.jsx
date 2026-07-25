import { useSearchParams } from "react-router-dom";
import { HiOutlineHomeModern } from "react-icons/hi2";
import HotelsSearchBar from "../components/sections/hotels/HotelsSearchBar";
import FiltersSidebar from "../components/sections/hotels/FiltersSidebar";
import SortBar from "../components/sections/hotels/SortBar";
import HotelCard from "../components/common/HotelCard";
import Pagination from "../components/common/Pagination";
import EmptyState from "../components/common/EmptyState";
import Button from "../components/common/Button";
import { hotels } from "../data/hotels";
import { useHotelsFilter } from "../hooks/useHotelsFilter";

export default function Hotels() {
  const [searchParams] = useSearchParams();
  const searchQuery = { location: searchParams.get("location") || "" };

  const {
    results,
    resultCount,
    filters,
    updateFilters,
    resetFilters,
    amenityOptions,
    priceBounds,
    sortBy,
    setSortBy,
    page,
    totalPages,
    setPage,
  } = useHotelsFilter(hotels, searchQuery);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="font-display text-3xl font-semibold">
        {searchQuery.location ? `Stays in ${searchQuery.location}` : "Search hotels"}
      </h1>

      <div className="mt-6">
        <HotelsSearchBar />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
        <FiltersSidebar
          filters={filters}
          onChange={updateFilters}
          onReset={resetFilters}
          amenityOptions={amenityOptions}
          priceBounds={priceBounds}
        />

        <div>
          <h2 className="sr-only">Hotel results</h2>
          <SortBar
            resultCount={resultCount}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {results.length > 0 ? (
            <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          ) : (
            <div className="mt-5">
              <EmptyState
                icon={HiOutlineHomeModern}
                title="No hotels found"
                description="Try widening your filters or searching a different destination."
                action={
                  <Button variant="outline" onClick={resetFilters}>
                    Reset filters
                  </Button>
                }
              />
            </div>
          )}

          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
}
