import { useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { HiOutlineUserPlus } from "react-icons/hi2";

/**
 * `personLabel` lets the same component read "Passenger" (flights) or
 * "Guest" (hotels) without duplicating the form.
 */
export default function PassengerDetailsForm({ personLabel = "Passenger", maxTravelers = 9 }) {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const travelers = watch("travelers");
  const { fields, append, remove } = useFieldArray({ control, name: "passengers" });

  // Keep the passengers[] array length in sync with the travelers count —
  // e.g. bumping travelers from 1 to 3 should add two more name fields.
  useEffect(() => {
    const additional = Math.max(0, Number(travelers) - 1);
    if (fields.length < additional) {
      for (let i = fields.length; i < additional; i += 1) {
        append({ firstName: "", lastName: "" }, { shouldFocus: false });
      }
    } else if (fields.length > additional) {
      for (let i = fields.length - 1; i >= additional; i -= 1) {
        remove(i);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [travelers]);

  return (
    <section className="rounded-card border border-hairline bg-white p-6">
      <h2 className="font-display text-lg font-semibold">
        {personLabel} details
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="leadFirstName" className="text-xs font-medium text-muted">
            First name
          </label>
          <input
            id="leadFirstName"
            type="text"
            className="mt-1 w-full rounded-lg border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
            {...register("leadFirstName", { required: "Required" })}
            aria-invalid={!!errors.leadFirstName}
          />
          {errors.leadFirstName && (
            <p className="mt-1 text-xs text-red-600">{errors.leadFirstName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="leadLastName" className="text-xs font-medium text-muted">
            Last name
          </label>
          <input
            id="leadLastName"
            type="text"
            className="mt-1 w-full rounded-lg border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
            {...register("leadLastName", { required: "Required" })}
            aria-invalid={!!errors.leadLastName}
          />
          {errors.leadLastName && (
            <p className="mt-1 text-xs text-red-600">{errors.leadLastName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="leadEmail" className="text-xs font-medium text-muted">
            Email
          </label>
          <input
            id="leadEmail"
            type="email"
            className="mt-1 w-full rounded-lg border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
            {...register("leadEmail", {
              required: "Required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
            aria-invalid={!!errors.leadEmail}
          />
          {errors.leadEmail && (
            <p className="mt-1 text-xs text-red-600">{errors.leadEmail.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="leadPhone" className="text-xs font-medium text-muted">
            Phone
          </label>
          <input
            id="leadPhone"
            type="tel"
            className="mt-1 w-full rounded-lg border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
            {...register("leadPhone", { required: "Required" })}
            aria-invalid={!!errors.leadPhone}
          />
          {errors.leadPhone && (
            <p className="mt-1 text-xs text-red-600">{errors.leadPhone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="travelers" className="text-xs font-medium text-muted">
            Number of {personLabel.toLowerCase()}s
          </label>
          <input
            id="travelers"
            type="number"
            min={1}
            max={maxTravelers}
            className="mt-1 w-full rounded-lg border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
            {...register("travelers", {
              required: true,
              valueAsNumber: true,
              min: 1,
              max: maxTravelers,
            })}
          />
        </div>
      </div>

      {fields.length > 0 && (
        <div className="mt-6 border-t border-hairline pt-5">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
            <HiOutlineUserPlus aria-hidden="true" />
            Additional {personLabel.toLowerCase()}s
          </p>

          <div className="mt-4 flex flex-col gap-4">
            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor={`passengers.${index}.firstName`}
                    className="text-xs font-medium text-muted"
                  >
                    {personLabel} {index + 2} first name
                  </label>
                  <input
                    id={`passengers.${index}.firstName`}
                    type="text"
                    className="mt-1 w-full rounded-lg border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
                    {...register(`passengers.${index}.firstName`, {
                      required: "Required",
                    })}
                    aria-invalid={!!errors.passengers?.[index]?.firstName}
                  />
                </div>
                <div>
                  <label
                    htmlFor={`passengers.${index}.lastName`}
                    className="text-xs font-medium text-muted"
                  >
                    {personLabel} {index + 2} last name
                  </label>
                  <input
                    id={`passengers.${index}.lastName`}
                    type="text"
                    className="mt-1 w-full rounded-lg border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
                    {...register(`passengers.${index}.lastName`, {
                      required: "Required",
                    })}
                    aria-invalid={!!errors.passengers?.[index]?.lastName}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
