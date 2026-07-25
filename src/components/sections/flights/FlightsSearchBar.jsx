import { HiOutlinePaperAirplane, HiOutlineCalendar } from "react-icons/hi2";
import Button from "../../common/Button";
import AirportAutocomplete from "../../common/AirportAutocomplete";
import { FlightFromIcon, FlightToIcon } from "../../common/FlightRouteIcons";
import { useFlightSearchForm } from "../../../hooks/useFlightSearchForm";

export default function FlightsSearchBar() {
  const {
    handleSubmit,
    register,
    control,
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
      <AirportAutocomplete
        name="from"
        control={control}
        label="From"
        icon={FlightFromIcon}
        rules={{ required: "Required" }}
      />

      <AirportAutocomplete
        name="to"
        control={control}
        label="To"
        icon={FlightToIcon}
        rules={{ required: "Required" }}
      />

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
