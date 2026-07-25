import { HiOutlineHeart } from "react-icons/hi2";
import DestinationCard from "../components/common/DestinationCard";
import HotelCard from "../components/common/HotelCard";
import EmptyState from "../components/common/EmptyState";
import Button from "../components/common/Button";
import SectionHeading from "../components/common/SectionHeading";
import { destinations } from "../data/destinations";
import { hotels } from "../data/hotels";
import { useWishlist } from "../hooks/useWishlist";
import { ROUTES } from "../constants/routes";

export default function Wishlist() {
  const { idsByType } = useWishlist();

  const savedDestinationIds = idsByType("destination");
  const savedHotelIds = idsByType("hotel");

  const savedDestinations = destinations.filter((d) =>
    savedDestinationIds.includes(d.id)
  );
  const savedHotels = hotels.filter((h) => savedHotelIds.includes(h.id));

  const isEmpty = savedDestinations.length === 0 && savedHotels.length === 0;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="font-display text-3xl font-semibold">Your wishlist</h1>
      <p className="mt-2 text-muted">
        Saved locally on this device — tap the heart on any destination or
        hotel to add it here.
      </p>

      {isEmpty ? (
        <div className="mt-10">
          <EmptyState
            icon={HiOutlineHeart}
            title="Nothing saved yet"
            description="Browse destinations and hotels, and tap the heart icon to save your favorites for later."
            action={
              <div className="flex gap-3">
                <Button to={ROUTES.FLIGHTS} variant="outline">
                  Explore destinations
                </Button>
                <Button to={ROUTES.HOTELS}>Browse hotels</Button>
              </div>
            }
          />
        </div>
      ) : (
        <div className="mt-10 flex flex-col gap-14">
          <section>
            <SectionHeading
              eyebrow={`${savedDestinations.length} saved`}
              title="Saved destinations"
            />
            {savedDestinations.length > 0 ? (
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {savedDestinations.map((destination) => (
                  <DestinationCard key={destination.id} destination={destination} />
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-muted">
                No destinations saved yet.
              </p>
            )}
          </section>

          <section>
            <SectionHeading
              eyebrow={`${savedHotels.length} saved`}
              title="Saved hotels"
            />
            {savedHotels.length > 0 ? (
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {savedHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-muted">No hotels saved yet.</p>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
