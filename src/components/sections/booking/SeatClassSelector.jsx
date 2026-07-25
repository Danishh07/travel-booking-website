import { useFormContext } from "react-hook-form";
import { CABIN_CLASSES } from "../../../constants/booking";
import { formatCurrency } from "../../../utils/formatters";

export default function SeatClassSelector({ basePrice }) {
  const { register, watch } = useFormContext();
  const selected = watch("cabinClass");

  return (
    <section className="rounded-card border border-hairline bg-white p-6">
      <h2 className="font-display text-lg font-semibold">Cabin class</h2>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {CABIN_CLASSES.map((option) => (
          <label
            key={option.value}
            className={`cursor-pointer rounded-card border p-4 transition-colors ${
              selected === option.value
                ? "border-ochre bg-ochre/5"
                : "border-hairline hover:border-ink/30"
            }`}
          >
            <input
              type="radio"
              value={option.value}
              className="sr-only"
              {...register("cabinClass", { required: true })}
            />
            <p className="text-sm font-semibold">{option.label}</p>
            <p className="mt-1 font-mono text-sm text-muted">
              {formatCurrency(basePrice * option.multiplier)}
            </p>
          </label>
        ))}
      </div>
    </section>
  );
}
