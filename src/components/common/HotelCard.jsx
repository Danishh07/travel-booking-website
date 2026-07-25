import { HiOutlineHeart } from "react-icons/hi";
import Badge from "../common/Badge";
import Rating from "../common/Rating";
import Button from "../common/Button";
import { formatCurrency } from "../../utils/formatters";
import { ROUTES } from "../../constants/routes";

export default function HotelCard({ hotel }) {
  const { id, name, location, image, rating, reviews, pricePerNight, tags } =
    hotel;

  return (
    <article className="group overflow-hidden rounded-card border border-hairline bg-white shadow-soft transition-shadow hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          type="button"
          aria-label={`Save ${name} to wishlist`}
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-ink transition-colors hover:text-ochre"
        >
          <HiOutlineHeart size={18} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-lg font-semibold leading-snug">
              {name}
            </h3>
            <p className="text-sm text-muted">{location}</p>
          </div>
          <Rating value={rating} reviews={reviews} />
        </div>

        {tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} tone="harbor">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <p className="mt-3 text-sm text-muted">
          <span className="font-mono font-medium text-ink">
            {formatCurrency(pricePerNight)}
          </span>{" "}
          / night
        </p>

        <Button to={ROUTES.booking("hotel", id)} size="sm" className="mt-4 w-full">
          View hotel
        </Button>
      </div>
    </article>
  );
}
