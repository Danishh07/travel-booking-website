import SectionHeading from "../../common/SectionHeading";
import HotelCard from "../../common/HotelCard";
import EmptyState from "../../common/EmptyState";
import { HiOutlineHomeModern } from "react-icons/hi2";

export default function NearbyHotels({ city, hotels }) {
  return (
    <section>
      <SectionHeading eyebrow="Where to stay" title={`Hotels in ${city}`} />

      {hotels.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <EmptyState
            icon={HiOutlineHomeModern}
            title="No hotels listed yet"
            description={`We don't have hotel listings for ${city} yet — check back soon.`}
          />
        </div>
      )}
    </section>
  );
}
