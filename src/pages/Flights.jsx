import { useSearchParams } from "react-router-dom";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import FlightsSearchBar from "../components/sections/flights/FlightsSearchBar";
import FiltersSidebar from "../components/sections/flights/FiltersSidebar";
import SortBar from "../components/sections/flights/SortBar";
import FlightCard from "../components/common/FlightCard";
import Pagination from "../components/common/Pagination";
import EmptyState from "../components/common/EmptyState";
import Button from "../components/common/Button";
import { flights } from "../data/flights";
import { useFlightsFilter } from "../hooks/useFlightsFilter";

export default function Flights() {
  const [searchParams] = useSearchParams();
  const searchQuery = {
    from: searchParams.get("from") || "",
    to: searchParams.get("to") || "",
  };

  const {
    results,
    resultCount,
    notice,
    filters,
    updateFilters,
    resetFilters,
    airlineOptions,
    priceBounds,
    sortBy,
    setSortBy,
    page,
    totalPages,
    setPage,
  } = useFlightsFilter(flights, searchQuery);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="font-display text-3xl font-semibold">
        {searchQuery.from && searchQuery.to
          ? `Flights from ${searchQuery.from} to ${searchQuery.to}`
          : "Search flights"}
      </h1>

      <div className="mt-6">
        <FlightsSearchBar />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
        <FiltersSidebar
          filters={filters}
          onChange={updateFilters}
          onReset={resetFilters}
          airlineOptions={airlineOptions}
          priceBounds={priceBounds}
        />

        <div>
          <h2 className="sr-only">Flight results</h2>
          <SortBar
            resultCount={resultCount}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {notice && (
            <p className="mt-3 rounded-lg bg-ochre/10 px-4 py-2.5 text-sm text-ochre-darker">
              {notice}
            </p>
          )}

          <div className="mt-5 flex flex-col gap-4">
            {results.length > 0 ? (
              results.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
              ))
            ) : (
              <EmptyState
                icon={HiOutlinePaperAirplane}
                title="No flights found"
                description="Try widening your filters or searching a different route or date."
                action={
                  <Button variant="outline" onClick={resetFilters}>
                    Reset filters
                  </Button>
                }
              />
            )}
          </div>

          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
}
