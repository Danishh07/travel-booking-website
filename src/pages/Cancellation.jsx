import Breadcrumb from "../components/common/Breadcrumb";
import BookingLookup from "../components/sections/help/BookingLookup";
import { cancellationTiers } from "../data/cancellationPolicy";
import { ROUTES } from "../constants/routes";

export default function Cancellation() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Breadcrumb
        items={[
          { label: "Home", to: ROUTES.HOME },
          { label: "Help center", to: ROUTES.HELP },
          { label: "Cancellation options" },
        ]}
      />

      <h1 className="mt-4 font-display text-3xl font-semibold">
        Cancellation options
      </h1>
      <p className="mt-2 text-muted">
        How much of your booking is refunded depends on how close to the
        trip date you cancel.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        {cancellationTiers.map((tier) => (
          <div
            key={tier.window}
            className="flex flex-col gap-1 rounded-card border border-hairline bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium">{tier.window}</p>
              <p className="mt-1 text-sm text-muted">{tier.description}</p>
            </div>
            <span className="shrink-0 font-mono text-sm font-semibold text-ink">
              {tier.fee}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <BookingLookup />
      </div>
    </div>
  );
}
