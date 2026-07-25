import SectionHeading from "../../common/SectionHeading";
import HotelCard from "../../common/HotelCard";
import Button from "../../common/Button";
import { hotels } from "../../../data/hotels";
import { ROUTES } from "../../../constants/routes";

export default function TrendingHotels() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Stay well"
          title="Trending hotels"
          subtitle="Highly rated stays travelers are booking most this month."
          action={
            <Button variant="ghost" to={ROUTES.HOTELS}>
              Browse all hotels
            </Button>
          }
        />

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>
    </section>
  );
}
