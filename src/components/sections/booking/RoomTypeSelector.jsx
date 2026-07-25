import { useFormContext } from "react-hook-form";
import { ROOM_TYPES } from "../../../constants/booking";
import { formatCurrency } from "../../../utils/formatters";

const today = new Date().toISOString().split("T")[0];

export default function RoomTypeSelector({ pricePerNight }) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const selected = watch("roomType");
  const checkIn = watch("checkIn");

  return (
    <section className="rounded-card border border-hairline bg-white p-6">
      <h2 className="font-display text-lg font-semibold">Stay details</h2>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="checkIn" className="text-xs font-medium text-muted">
            Check-in
          </label>
          <input
            id="checkIn"
            type="date"
            min={today}
            className="mt-1 w-full rounded-lg border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
            {...register("checkIn", { required: "Required" })}
            aria-invalid={!!errors.checkIn}
          />
        </div>
        <div>
          <label htmlFor="checkOut" className="text-xs font-medium text-muted">
            Check-out
          </label>
          <input
            id="checkOut"
            type="date"
            min={checkIn || today}
            className="mt-1 w-full rounded-lg border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
            {...register("checkOut", {
              required: "Required",
              validate: (value, formValues) =>
                !formValues.checkIn ||
                value > formValues.checkIn ||
                "Must be after check-in",
            })}
            aria-invalid={!!errors.checkOut}
          />
          {errors.checkOut && (
            <p className="mt-1 text-xs text-red-600">{errors.checkOut.message}</p>
          )}
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className="text-xs font-semibold uppercase tracking-wide text-muted">
          Room type
        </legend>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {ROOM_TYPES.map((option) => (
            <label
              key={option.value}
              className={`cursor-pointer rounded-card border p-4 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-harbor has-[:focus-visible]:ring-offset-2 ${
                selected === option.value
                  ? "border-ochre bg-ochre/5"
                  : "border-hairline hover:border-ink/30"
              }`}
            >
              <input
                type="radio"
                value={option.value}
                className="sr-only"
                {...register("roomType", { required: true })}
              />
              <p className="text-sm font-semibold">{option.label}</p>
              <p className="mt-1 font-mono text-sm text-muted">
                {formatCurrency(pricePerNight * option.multiplier)} / night
              </p>
            </label>
          ))}
        </div>
      </fieldset>
    </section>
  );
}
