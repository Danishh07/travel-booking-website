import SectionHeading from "../../common/SectionHeading";
import Rating from "../../common/Rating";
import EmptyState from "../../common/EmptyState";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

export default function DestinationReviews({ reviews }) {
  return (
    <section>
      <SectionHeading eyebrow="Traveler reviews" title="What visitors say" />

      {reviews.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {reviews.map((review) => (
            <figure
              key={review.id}
              className="rounded-card border border-hairline bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <Rating value={review.rating} />
                <time className="text-xs text-muted" dateTime={review.date}>
                  {new Date(review.date).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </time>
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-ink">
                "{review.quote}"
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt=""
                  loading="lazy"
                  className="h-9 w-9 rounded-full object-cover"
                />
                <p className="text-sm font-semibold">{review.name}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <EmptyState
            icon={HiOutlineChatBubbleLeftRight}
            title="No reviews yet"
            description="Be the first to share how your trip went."
          />
        </div>
      )}
    </section>
  );
}
