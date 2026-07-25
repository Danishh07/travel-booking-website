import { useFormContext } from "react-hook-form";
import { CABIN_CLASSES } from "../../../constants/booking";
import { formatCurrency } from "../../../utils/formatters";

export default function SeatClassSelector({ basePrice }) {
  const { register, watch } = useFormContext();
  const selected = watch("cabinClass");

  return (
    <section className="rounded-card border border-hairline bg-white p-6">
      <h2 className="font-display text-lg font-semibold" id="cabin-class-heading">
        Cabin class
      </h2>

      <fieldset className="mt-5" aria-labelledby="cabin-class-heading">
        <legend className="sr-only">Cabin class</legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {CABIN_CLASSES.map((option) => (
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
                {...register("cabinClass", { required: true })}
              />
              <p className="text-sm font-semibold">{option.label}</p>
              <p className="mt-1 font-mono text-sm text-muted">
                {formatCurrency(basePrice * option.multiplier)}
              </p>
            </label>
          ))}
        </div>
      </fieldset>
    </section>
  );
}
