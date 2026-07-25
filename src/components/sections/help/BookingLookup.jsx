import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineMagnifyingGlass, HiOutlineCheckCircle } from "react-icons/hi2";
import Button from "../../common/Button";
import EmptyState from "../../common/EmptyState";
import { cancelBooking } from "../../../redux/slices/bookingSlice";
import { formatCurrency } from "../../../utils/formatters";

export default function BookingLookup() {
  const bookings = useSelector((state) => state.booking.bookings);
  const dispatch = useDispatch();

  const [result, setResult] = useState(null); // undefined = searched, not found
  const [cancelled, setCancelled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { reference: "", email: "" } });

  const onSubmit = (data) => {
    const match = bookings.find(
      (b) =>
        b.reference.toLowerCase() === data.reference.trim().toLowerCase() &&
        b.leadEmail.toLowerCase() === data.email.trim().toLowerCase()
    );
    setResult(match || undefined);
    setCancelled(false);
  };

  const handleCancel = () => {
    dispatch(cancelBooking(result.id));
    setCancelled(true);
  };

  return (
    <div className="rounded-card border border-hairline bg-white p-6">
      <h2 className="font-display text-lg font-semibold">
        Look up your booking
      </h2>
      <p className="mt-1 text-sm text-muted">
        Enter your booking reference and the email you booked with.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1fr_auto]"
      >
        <div>
          <label htmlFor="reference" className="text-xs font-medium text-muted">
            Booking reference
          </label>
          <input
            id="reference"
            type="text"
            placeholder="TN-XXXXXX"
            className="mt-1 w-full rounded-lg border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
            {...register("reference", { required: "Required" })}
            aria-invalid={!!errors.reference}
          />
        </div>
        <div>
          <label htmlFor="lookup-email" className="text-xs font-medium text-muted">
            Email
          </label>
          <input
            id="lookup-email"
            type="email"
            placeholder="you@example.com"
            className="mt-1 w-full rounded-lg border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
            {...register("email", { required: "Required" })}
            aria-invalid={!!errors.email}
          />
        </div>
        <Button type="submit" icon={HiOutlineMagnifyingGlass} className="self-end">
          Find booking
        </Button>
      </form>

      {result === undefined && (
        <div className="mt-6">
          <EmptyState
            title="No matching booking found"
            description="Double-check the reference and email, or reach out to support if you're still stuck."
          />
        </div>
      )}

      {result && !cancelled && (
        <div className="mt-6 rounded-card border border-hairline p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-display text-base font-semibold">{result.title}</p>
            <p className="font-mono text-xs text-muted">Ref: {result.reference}</p>
          </div>
          <p className="mt-1 text-sm text-muted">
            {result.tripDate} · {formatCurrency(result.total)}
          </p>
          <button
            type="button"
            onClick={handleCancel}
            className="mt-4 rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            Cancel this booking
          </button>
        </div>
      )}

      {cancelled && (
        <div
          role="status"
          className="mt-6 flex items-center gap-2 rounded-card bg-harbor-light p-4 text-sm font-medium text-harbor"
        >
          <HiOutlineCheckCircle size={18} aria-hidden="true" />
          Booking {result.reference} has been cancelled.
        </div>
      )}
    </div>
  );
}
