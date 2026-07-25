import { Link } from "react-router-dom";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import Badge from "../common/Badge";
import Rating from "../common/Rating";
import { formatCurrency } from "../../utils/formatters";
import { ROUTES } from "../../constants/routes";
import { useWishlist } from "../../hooks/useWishlist";

/**
 * Card is an <article>, not an <a> — the whole surface is still clickable
 * via a "stretched link" (the <Link> around the title gets an absolutely
 * positioned ::after covering the card). This avoids nesting a <button>
 * inside an <a>, which is invalid HTML and creates a confusing single tab
 * stop with hidden interactive content for keyboard/screen-reader users.
 */
export default function DestinationCard({ destination }) {
  const { id, city, country, image, priceFrom, rating, tag, slug } = destination;
  const { isWishlisted, toggle } = useWishlist();
  const saved = isWishlisted("destination", id);

  return (
    <article className="group relative overflow-hidden rounded-card border border-hairline bg-white shadow-soft transition-shadow hover:shadow-lift">
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
          className={`absolute z-10 right-3 top-3 rounded-full bg-white/90 p-2.5 transition-colors ${
            saved ? "text-ochre" : "text-ink hover:text-ochre"
          }`}
          onClick={() => toggle("destination", id)}
        >
          {saved ? <HiHeart size={18} /> : <HiOutlineHeart size={18} />}
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-lg font-semibold">
              <Link
                to={ROUTES.destination(slug)}
                className="static after:absolute after:inset-0"
              >
                {city}
              </Link>
            </h3>
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
    </article>
  );
}
