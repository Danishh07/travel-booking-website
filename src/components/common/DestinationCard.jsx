import { Link } from "react-router-dom";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import Badge from "../common/Badge";
import Rating from "../common/Rating";
import { formatCurrency } from "../../utils/formatters";
import { ROUTES } from "../../constants/routes";
import { useWishlist } from "../../hooks/useWishlist";

export default function DestinationCard({ destination }) {
  const { id, city, country, image, priceFrom, rating, tag, slug } = destination;
  const { isWishlisted, toggle } = useWishlist();
  const saved = isWishlisted("destination", id);

  return (
    <Link
      to={ROUTES.destination(slug)}
      className="group block overflow-hidden rounded-card border border-hairline bg-white shadow-soft transition-shadow hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={`${city}, ${country}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {tag && (
          <Badge tone="ochre" className="absolute left-3 top-3 bg-white/90">
            {tag}
          </Badge>
        )}
        <button
          type="button"
          aria-label={saved ? `Remove ${city} from wishlist` : `Save ${city} to wishlist`}
          aria-pressed={saved}
          className={`absolute right-3 top-3 rounded-full bg-white/90 p-2 transition-colors ${
            saved ? "text-ochre" : "text-ink hover:text-ochre"
          }`}
          onClick={(e) => {
            e.preventDefault();
            toggle("destination", id);
          }}
        >
          {saved ? <HiHeart size={18} /> : <HiOutlineHeart size={18} />}
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-lg font-semibold">{city}</h3>
            <p className="text-sm text-muted">{country}</p>
          </div>
          <Rating value={rating} />
        </div>
        <p className="mt-3 text-sm text-muted">
          From{" "}
          <span className="font-mono font-medium text-ink">
            {formatCurrency(priceFrom)}
          </span>
        </p>
      </div>
    </Link>
  );
}
