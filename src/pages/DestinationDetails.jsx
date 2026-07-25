import { useParams } from "react-router-dom";
import { HiOutlineHeart, HiStar } from "react-icons/hi2";
import Breadcrumb from "../components/common/Breadcrumb";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import Gallery from "../components/sections/destination/Gallery";
import ThingsToDo from "../components/sections/destination/ThingsToDo";
import NearbyHotels from "../components/sections/destination/NearbyHotels";
import DestinationReviews from "../components/sections/destination/DestinationReviews";
import NotFound from "./NotFound";
import { destinations } from "../data/destinations";
import { hotels } from "../data/hotels";
import { reviewsByDestination } from "../data/reviews";
import { formatCurrency } from "../utils/formatters";
import { ROUTES } from "../constants/routes";

export default function DestinationDetails() {
  const { slug } = useParams();
  const destination = destinations.find((d) => d.slug === slug);

  if (!destination) {
    return <NotFound />;
  }

  const { id, city, country, heroImage, description, gallery, priceFrom, rating, tag, thingsToDo } =
    destination;

  const nearbyHotels = hotels.filter((hotel) => hotel.city === city);
  const reviews = reviewsByDestination[id] || [];

  return (
    <div>
      <div className="relative h-[45vh] min-h-[320px] w-full overflow-hidden">
        <img
          src={heroImage}
          alt={`${city}, ${country}`}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />

        <button
          type="button"
          aria-label={`Save ${city} to wishlist`}
          className="absolute right-6 top-6 rounded-full bg-white/90 p-2.5 text-ink transition-colors hover:text-ochre"
        >
          <HiOutlineHeart size={20} />
        </button>

        <div className="absolute inset-x-0 bottom-0 px-6 pb-8">
          <div className="mx-auto max-w-7xl">
            {tag && (
              <Badge tone="ochre" className="bg-white/90">
                {tag}
              </Badge>
            )}
            <h1 className="mt-3 font-display text-4xl font-semibold text-white sm:text-5xl">
              {city}
            </h1>
            <p className="mt-1 text-white/80">{country}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <Breadcrumb
          items={[
            { label: "Home", to: ROUTES.HOME },
            { label: "Destinations", to: ROUTES.FLIGHTS },
            { label: city },
          ]}
        />

        <div className="mt-6 flex flex-col gap-4 border-b border-hairline pb-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-2xl text-base leading-relaxed text-muted">
            {description}
          </p>
          <div className="flex shrink-0 items-center gap-6">
            <span className="flex items-center gap-1 font-medium text-ink">
              <HiStar className="text-ochre" aria-hidden="true" />
              {rating.toFixed(1)}
            </span>
            <div className="text-right">
              <p className="text-xs text-muted">Flights from</p>
              <p className="font-mono text-xl font-semibold">
                {formatCurrency(priceFrom)}
              </p>
            </div>
            <Button to={`${ROUTES.FLIGHTS}?to=${encodeURIComponent(city)}`}>
              Find flights
            </Button>
          </div>
        </div>

        <div className="mt-10">
          <Gallery images={gallery} alt={city} />
        </div>

        <div className="mt-14">
          <ThingsToDo items={thingsToDo} />
        </div>

        <div className="mt-14">
          <NearbyHotels city={city} hotels={nearbyHotels} />
        </div>

        <div className="mt-14 pb-4">
          <DestinationReviews reviews={reviews} />
        </div>
      </div>
    </div>
  );
}
