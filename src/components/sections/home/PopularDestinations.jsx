import SectionHeading from "../../common/SectionHeading";
import DestinationCard from "../../common/DestinationCard";
import Button from "../../common/Button";
import { destinations } from "../../../data/destinations";
import { ROUTES } from "../../../constants/routes";

export default function PopularDestinations() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading
        eyebrow="Where to next"
        title="Popular destinations"
        subtitle="Handpicked cities with strong flight availability and good value stays right now."
        action={
          <Button variant="ghost" to={ROUTES.FLIGHTS}>
            View all destinations
          </Button>
        }
      />

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </section>
  );
}
