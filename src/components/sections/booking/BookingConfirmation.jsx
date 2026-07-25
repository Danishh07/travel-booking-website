import { HiOutlineCheckCircle } from "react-icons/hi2";
import Button from "../../common/Button";
import { ROUTES } from "../../../constants/routes";
import { formatCurrency } from "../../../utils/formatters";

export default function BookingConfirmation({ booking }) {
  return (
    <div className="mx-auto max-w-lg px-6 py-16 text-center">
      <div className="rounded-card border border-hairline bg-white p-8 shadow-lift">
        <HiOutlineCheckCircle size={40} className="mx-auto text-harbor" aria-hidden="true" />
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted">
          Booking confirmed
        </p>
        <h1 className="mt-2 font-display text-2xl font-semibold">
          You're all set, {booking.leadFirstName}
        </h1>
        <p className="mt-2 text-sm text-muted">
          A confirmation has been sent to {booking.leadEmail}.
        </p>

        <div className="ticket-divider ticket-divider--on-white my-6" />

        <div className="flex flex-col gap-2 text-left text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Reference</span>
            <span className="font-mono font-semibold">{booking.reference}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Trip</span>
            <span className="font-medium">{booking.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Total paid</span>
            <span className="font-mono font-semibold">
              {formatCurrency(booking.total)}
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button to={ROUTES.DASHBOARD}>View in dashboard</Button>
          <Button to={ROUTES.HOME} variant="outline">
            Back to home
          </Button>
        </div>
      </div>
    </div>
  );
}
