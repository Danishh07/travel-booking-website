import { HiOutlinePaperAirplane, HiOutlineHomeModern } from "react-icons/hi2";
import Badge from "../../common/Badge";
import { formatCurrency } from "../../../utils/formatters";

export default function TripCard({ booking, status, onCancel }) {
  const Icon = booking.type === "flight" ? HiOutlinePaperAirplane : HiOutlineHomeModern;

  return (
    <article className="flex flex-col gap-4 rounded-card border border-hairline bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-harbor-light text-harbor">
          <Icon size={18} aria-hidden="true" />
        </span>
        <div>
          <p className="font-display text-base font-semibold">{booking.title}</p>
          <p className="mt-1 text-sm text-muted">
            {booking.tripDate} · {booking.travelers}{" "}
            {booking.travelers === 1 ? "traveler" : "travelers"}
          </p>
          <p className="mt-1 font-mono text-xs text-muted">
            Ref: {booking.reference}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
        <Badge tone={status === "upcoming" ? "harbor" : "neutral"}>
          {status === "upcoming" ? "Upcoming" : "Completed"}
        </Badge>
        <p className="font-mono font-semibold">{formatCurrency(booking.total)}</p>
        {status === "upcoming" && onCancel && (
          <button
            type="button"
            onClick={() => onCancel(booking.id)}
            className="text-xs font-medium text-red-600 hover:underline"
          >
            Cancel
          </button>
        )}
      </div>
    </article>
  );
}
