import { HiOutlinePaperAirplane } from "react-icons/hi2";
import Badge from "./Badge";
import Button from "./Button";
import { formatCurrency, formatDuration, stopsLabel } from "../../utils/formatters";
import { ROUTES } from "../../constants/routes";

export default function FlightCard({ flight }) {
  const {
    airline,
    airlineCode,
    from,
    to,
    departTime,
    arriveTime,
    durationMinutes,
    stops,
    cabinClass,
    price,
  } = flight;

  return (
    <article className="flex flex-col gap-6 rounded-card border border-hairline bg-white p-6 shadow-soft transition-shadow hover:shadow-lift sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4 sm:w-16 sm:flex-col sm:items-start sm:gap-1">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-harbor-light text-harbor">
          <span className="font-mono text-xs font-semibold">{airlineCode}</span>
        </span>
        <span className="text-xs text-muted sm:text-center">{airline}</span>
      </div>

      <div className="flex flex-1 items-center gap-4">
        <div className="text-right sm:text-left">
          <p className="font-mono text-lg font-semibold">{departTime}</p>
          <p className="text-xs text-muted">{from.code}</p>
        </div>

        <div className="flex flex-1 flex-col items-center px-2">
          <span className="font-mono text-xs text-muted">
            {formatDuration(durationMinutes)}
          </span>
          <div className="ticket-divider ticket-divider--on-white my-2 w-full max-w-[10rem]" />
          <span className="flex items-center gap-1 text-xs text-muted">
            <HiOutlinePaperAirplane className="rotate-90" aria-hidden="true" />
            {stopsLabel(stops)}
          </span>
        </div>

        <div>
          <p className="font-mono text-lg font-semibold">{arriveTime}</p>
          <p className="text-xs text-muted">{to.code}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-hairline pt-4 sm:w-40 sm:flex-col sm:items-end sm:border-t-0 sm:border-l sm:pl-6 sm:pt-0">
        <div className="text-left sm:text-right">
          <Badge tone="neutral">{cabinClass}</Badge>
          <p className="mt-2 font-mono text-xl font-semibold text-ink">
            {formatCurrency(price)}
          </p>
        </div>
        <Button to={ROUTES.booking("flight", flight.id)} size="sm">
          Select
        </Button>
      </div>
    </article>
  );
}
