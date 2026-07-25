import { HiStar } from "react-icons/hi";

/**
 * Displays a filled star + numeric rating. Kept as a single small component
 * since rating is shown identically in ~4 places (destinations, hotels,
 * flights, testimonials) — changing the visual style should only mean
 * editing this one file.
 */
export default function Rating({ value, reviews, size = "sm" }) {
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium text-ink ${textSize}`}
    >
      <HiStar className="text-ochre" aria-hidden="true" />
      <span>{value.toFixed(1)}</span>
      {typeof reviews === "number" && (
        <span className="font-normal text-muted">({reviews})</span>
      )}
    </span>
  );
}
