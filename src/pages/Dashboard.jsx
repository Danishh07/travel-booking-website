import { HiOutlineTicket, HiOutlineHeart } from "react-icons/hi2";
import AccountOverview from "../components/sections/dashboard/AccountOverview";
import TripCard from "../components/sections/dashboard/TripCard";
import SectionHeading from "../components/common/SectionHeading";
import DestinationCard from "../components/common/DestinationCard";
import EmptyState from "../components/common/EmptyState";
import Button from "../components/common/Button";
import { useBookings } from "../hooks/useBookings";
import { useWishlist } from "../hooks/useWishlist";
import { destinations } from "../data/destinations";
import { ROUTES } from "../constants/routes";

export default function Dashboard() {
  const { upcoming, previous, totalSpent, totalBookings, cancel } = useBookings();
  const { idsByType } = useWishlist();

  const savedDestinationIds = idsByType("destination");
  const savedDestinations = destinations
    .filter((d) => savedDestinationIds.includes(d.id))
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <AccountOverview
        totalBookings={totalBookings}
        totalSpent={totalSpent}
        savedCount={savedDestinationIds.length}
      />

      <section className="mt-12">
        <SectionHeading eyebrow="What's ahead" title="Upcoming trips" />
        {upcoming.length > 0 ? (
          <div className="mt-5 flex flex-col gap-4">
            {upcoming.map((booking) => (
              <TripCard
                key={booking.id}
                booking={booking}
                status="upcoming"
                onCancel={cancel}
              />
            ))}
          </div>
        ) : (
          <div className="mt-5">
            <EmptyState
              icon={HiOutlineTicket}
              title="No upcoming trips"
              description="Once you book a flight or hotel, it'll show up here."
              action={<Button to={ROUTES.FLIGHTS}>Search flights</Button>}
            />
          </div>
        )}
      </section>

      <section className="mt-12">
        <SectionHeading eyebrow="Where you've been" title="Previous trips" />
        {previous.length > 0 ? (
          <div className="mt-5 flex flex-col gap-4">
            {previous.map((booking) => (
              <TripCard key={booking.id} booking={booking} status="completed" />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted">No previous trips yet.</p>
        )}
      </section>

      <section className="mt-12 pb-4">
        <SectionHeading
          eyebrow="Saved for later"
          title="Saved destinations"
          action={
            <Button variant="ghost" to={ROUTES.WISHLIST}>
              View full wishlist
            </Button>
          }
        />
        {savedDestinations.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {savedDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        ) : (
          <div className="mt-5">
            <EmptyState
              icon={HiOutlineHeart}
              title="No saved destinations"
              description="Tap the heart on any destination to save it here."
              action={<Button to={ROUTES.FLIGHTS}>Explore destinations</Button>}
            />
          </div>
        )}
      </section>
    </div>
  );
}
