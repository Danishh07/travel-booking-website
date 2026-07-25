import { HiOutlinePaperAirplane, HiOutlineCalendar } from "react-icons/hi2";
import Button from "../../common/Button";
import { useFlightSearchForm } from "../../../hooks/useFlightSearchForm";

export default function FlightsSearchBar() {
  const {
    register,
    handleSubmit,
    onSubmit,
    today,
    formState: { errors },
  } = useFlightSearchForm({ initialFromParams: true });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid grid-cols-1 gap-4 rounded-card border border-hairline bg-white p-5 shadow-soft sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]"
    >
      <div>
        <label htmlFor="bar-from" className="text-xs font-medium text-muted">
          From
        </label>
        <input
          id="bar-from"
          type="text"
          placeholder="City or airport"
          className="mt-1 w-full border-b border-hairline bg-transparent pb-2 text-sm outline-none focus:border-ink"
          {...register("from", { required: "Required" })}
          aria-invalid={!!errors.from}
        />
      </div>

      <div>
        <label htmlFor="bar-to" className="text-xs font-medium text-muted">
          To
        </label>
        <input
          id="bar-to"
          type="text"
          placeholder="City or airport"
          className="mt-1 w-full border-b border-hairline bg-transparent pb-2 text-sm outline-none focus:border-ink"
          {...register("to", { required: "Required" })}
          aria-invalid={!!errors.to}
        />
      </div>

      <div>
        <label htmlFor="bar-depart" className="text-xs font-medium text-muted">
          Depart
        </label>
        <div className="mt-1 flex items-center gap-2 border-b border-hairline pb-2 focus-within:border-ink">
          <HiOutlineCalendar className="shrink-0 text-muted" aria-hidden="true" />
          <input
            id="bar-depart"
            type="date"
            min={today}
            className="w-full bg-transparent text-sm outline-none"
            {...register("departDate", { required: "Required" })}
            aria-invalid={!!errors.departDate}
          />
        </div>
      </div>

      <Button type="submit" icon={HiOutlinePaperAirplane} className="self-end">
        Search
      </Button>
    </form>
  );
}
