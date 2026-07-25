import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HiOutlineMapPin, HiOutlineCalendar, HiOutlineUserGroup } from "react-icons/hi2";
import Button from "../../common/Button";
import AirportAutocomplete from "../../common/AirportAutocomplete";

const today = new Date().toISOString().split("T")[0];

export default function HotelsSearchBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: searchParams.get("location") || "",
      checkIn: searchParams.get("checkin") || "",
      checkOut: searchParams.get("checkout") || "",
      guests: Number(searchParams.get("guests")) || 2,
    },
  });

  const checkIn = watch("checkIn");

  const onSubmit = (data) => {
    const params = new URLSearchParams({
      location: data.location,
      checkin: data.checkIn,
      checkout: data.checkOut,
      guests: String(data.guests),
    });
    navigate(`/hotels?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid grid-cols-1 gap-4 rounded-card border border-hairline bg-white p-5 shadow-soft sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_0.8fr_auto]"
    >
      <AirportAutocomplete
        name="location"
        control={control}
        label="Destination"
        icon={HiOutlineMapPin}
        placeholder="City"
        rules={{ required: "Enter a destination" }}
      />

      <div>
        <label htmlFor="check-in" className="text-xs font-medium text-muted">
          Check-in
        </label>
        <div className="mt-1 flex items-center gap-2 border-b border-hairline pb-2 focus-within:border-ink">
          <HiOutlineCalendar className="shrink-0 text-muted" aria-hidden="true" />
          <input
            id="check-in"
            type="date"
            min={today}
            className="w-full bg-transparent text-sm outline-none"
            {...register("checkIn", { required: "Required" })}
            aria-invalid={!!errors.checkIn}
          />
        </div>
      </div>

      <div>
        <label htmlFor="check-out" className="text-xs font-medium text-muted">
          Check-out
        </label>
        <div className="mt-1 flex items-center gap-2 border-b border-hairline pb-2 focus-within:border-ink">
          <HiOutlineCalendar className="shrink-0 text-muted" aria-hidden="true" />
          <input
            id="check-out"
            type="date"
            min={checkIn || today}
            className="w-full bg-transparent text-sm outline-none"
            {...register("checkOut", {
              required: "Required",
              validate: (value, formValues) =>
                !formValues.checkIn ||
                value > formValues.checkIn ||
                "Must be after check-in",
            })}
            aria-invalid={!!errors.checkOut}
          />
        </div>
        {errors.checkOut && (
          <p className="mt-1 text-xs text-red-600">{errors.checkOut.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="guests" className="text-xs font-medium text-muted">
          Guests
        </label>
        <div className="mt-1 flex items-center gap-2 border-b border-hairline pb-2 focus-within:border-ink">
          <HiOutlineUserGroup className="shrink-0 text-muted" aria-hidden="true" />
          <input
            id="guests"
            type="number"
            min={1}
            max={10}
            className="w-full bg-transparent text-sm outline-none"
            {...register("guests", { valueAsNumber: true, min: 1, max: 10 })}
          />
        </div>
      </div>

      <Button type="submit" className="self-end">
        Search
      </Button>
    </form>
  );
}
