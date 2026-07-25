import {
  HiOutlinePaperAirplane,
  HiOutlineCalendar,
  HiOutlineUserGroup,
} from "react-icons/hi";
import Button from "../../common/Button";
import { useFlightSearchForm } from "../../../hooks/useFlightSearchForm";

export default function FlightSearchCard() {
  const {
    register,
    handleSubmit,
    watch,
    onSubmit,
    today,
    formState: { errors },
  } = useFlightSearchForm();

  const departDate = watch("departDate");

  return (
    <div className="rounded-card border border-hairline bg-white p-6 shadow-lift sm:p-8">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        Flight search
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]"
      >
        <div>
          <label htmlFor="from" className="text-xs font-medium text-muted">
            From
          </label>
          <div className="mt-1 flex items-center gap-2 border-b border-hairline pb-2 focus-within:border-ink">
            <HiOutlinePaperAirplane
              className="shrink-0 -rotate-45 text-muted"
              aria-hidden="true"
            />
            <input
              id="from"
              type="text"
              placeholder="City or airport"
              className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted/60"
              {...register("from", { required: "Enter a departure city" })}
              aria-invalid={!!errors.from}
              aria-describedby={errors.from ? "from-error" : undefined}
            />
          </div>
          {errors.from && (
            <p id="from-error" className="mt-1 text-xs text-red-600">
              {errors.from.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="to" className="text-xs font-medium text-muted">
            To
          </label>
          <div className="mt-1 flex items-center gap-2 border-b border-hairline pb-2 focus-within:border-ink">
            <HiOutlinePaperAirplane
              className="shrink-0 rotate-45 text-muted"
              aria-hidden="true"
            />
            <input
              id="to"
              type="text"
              placeholder="City or airport"
              className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted/60"
              {...register("to", {
                required: "Enter a destination city",
                validate: (value, formValues) =>
                  value.trim().toLowerCase() !==
                    formValues.from.trim().toLowerCase() ||
                  "Destination must differ from departure",
              })}
              aria-invalid={!!errors.to}
              aria-describedby={errors.to ? "to-error" : undefined}
            />
          </div>
          {errors.to && (
            <p id="to-error" className="mt-1 text-xs text-red-600">
              {errors.to.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="departDate" className="text-xs font-medium text-muted">
            Depart
          </label>
          <div className="mt-1 flex items-center gap-2 border-b border-hairline pb-2 focus-within:border-ink">
            <HiOutlineCalendar className="shrink-0 text-muted" aria-hidden="true" />
            <input
              id="departDate"
              type="date"
              min={today}
              className="w-full bg-transparent text-sm text-ink outline-none"
              {...register("departDate", { required: "Choose a departure date" })}
              aria-invalid={!!errors.departDate}
              aria-describedby={errors.departDate ? "depart-error" : undefined}
            />
          </div>
          {errors.departDate && (
            <p id="depart-error" className="mt-1 text-xs text-red-600">
              {errors.departDate.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="returnDate" className="text-xs font-medium text-muted">
            Return <span className="font-normal text-muted/70">(optional)</span>
          </label>
          <div className="mt-1 flex items-center gap-2 border-b border-hairline pb-2 focus-within:border-ink">
            <HiOutlineCalendar className="shrink-0 text-muted" aria-hidden="true" />
            <input
              id="returnDate"
              type="date"
              min={departDate || today}
              className="w-full bg-transparent text-sm text-ink outline-none"
              {...register("returnDate")}
            />
          </div>
        </div>

        <div className="flex items-end gap-3 sm:col-span-2 lg:col-span-1 lg:flex-col lg:items-stretch">
          <div className="flex-1">
            <label htmlFor="travelers" className="text-xs font-medium text-muted">
              Travelers
            </label>
            <div className="mt-1 flex items-center gap-2 border-b border-hairline pb-2 focus-within:border-ink">
              <HiOutlineUserGroup className="shrink-0 text-muted" aria-hidden="true" />
              <input
                id="travelers"
                type="number"
                min={1}
                max={9}
                className="w-full bg-transparent text-sm text-ink outline-none"
                {...register("travelers", {
                  required: true,
                  min: { value: 1, message: "At least 1 traveler" },
                  max: { value: 9, message: "Max 9 travelers" },
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>
        </div>

        <div className="ticket-divider ticket-divider--on-white sm:col-span-2 lg:col-span-5" />

        <Button
          type="submit"
          size="lg"
          className="sm:col-span-2 lg:col-span-5"
          icon={HiOutlinePaperAirplane}
        >
          Search flights
        </Button>
      </form>
    </div>
  );
}
