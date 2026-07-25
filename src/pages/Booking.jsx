import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch } from "react-redux";
import Breadcrumb from "../components/common/Breadcrumb";
import PassengerDetailsForm from "../components/sections/booking/PassengerDetailsForm";
import SeatClassSelector from "../components/sections/booking/SeatClassSelector";
import RoomTypeSelector from "../components/sections/booking/RoomTypeSelector";
import BookingSummary from "../components/sections/booking/BookingSummary";
import BookingConfirmation from "../components/sections/booking/BookingConfirmation";
import NotFound from "./NotFound";
import { flights } from "../data/flights";
import { hotels } from "../data/hotels";
import { ROUTES } from "../constants/routes";
import { addBooking } from "../redux/slices/bookingSlice";
import { computeFlightTotal, computeHotelTotal, nightsBetween } from "../utils/pricing";

export default function Booking() {
  const { type, id } = useParams();
  const dispatch = useDispatch();
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const flight = type === "flight" ? flights.find((f) => f.id === id) : null;
  const hotel = type === "hotel" ? hotels.find((h) => h.id === id) : null;
  const item = flight || hotel;

  const defaultValues =
    type === "flight"
      ? {
          leadFirstName: "",
          leadLastName: "",
          leadEmail: "",
          leadPhone: "",
          travelers: 1,
          passengers: [],
          cabinClass: flight?.cabinClass || "Economy",
        }
      : {
          leadFirstName: "",
          leadLastName: "",
          leadEmail: "",
          leadPhone: "",
          travelers: 1,
          passengers: [],
          roomType: "Standard",
          checkIn: "",
          checkOut: "",
        };

  const form = useForm({ defaultValues });
  const { handleSubmit, watch } = form;

  if (!item || (type !== "flight" && type !== "hotel")) {
    return <NotFound />;
  }

  const travelers = Number(watch("travelers")) || 1;
  const cabinClass = watch("cabinClass");
  const roomType = watch("roomType");
  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const nights = type === "hotel" ? nightsBetween(checkIn, checkOut) : 0;

  const pricing =
    type === "flight"
      ? computeFlightTotal({ basePrice: flight.price, cabinClass, travelers })
      : computeHotelTotal({ pricePerNight: hotel.pricePerNight, roomType, nights });

  const title =
    type === "flight"
      ? `${flight.from.city} (${flight.from.code}) → ${flight.to.city} (${flight.to.code})`
      : `${hotel.name}, ${hotel.location}`;

  const summaryDetails =
    type === "flight"
      ? [
          `${flight.airline} · ${flight.date}`,
          `${flight.departTime} – ${flight.arriveTime}`,
          `${travelers} ${travelers === 1 ? "passenger" : "passengers"} · ${cabinClass}`,
        ]
      : [
          checkIn && checkOut ? `${checkIn} → ${checkOut}` : "Select your dates",
          `${nights} ${nights === 1 ? "night" : "nights"}`,
          `${roomType} room`,
        ];

  const priceLines =
    type === "flight"
      ? [
          { label: `Base fare × ${travelers}`, amount: pricing.subtotal },
          { label: "Taxes & fees", amount: pricing.taxes },
        ]
      : [
          { label: `Room × ${nights} nights`, amount: pricing.subtotal },
          { label: "Taxes & fees", amount: pricing.taxes },
        ];

  const onSubmit = (data) => {
    const action = dispatch(
      addBooking({
        type,
        itemId: item.id,
        title,
        leadFirstName: data.leadFirstName,
        leadEmail: data.leadEmail,
        travelers,
        details: summaryDetails,
        total: pricing.total,
        tripDate: type === "flight" ? flight.date : checkIn,
      })
    );
    setConfirmedBooking(action.payload);
  };

  if (confirmedBooking) {
    return <BookingConfirmation booking={confirmedBooking} />;
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Breadcrumb
        items={[
          { label: "Home", to: ROUTES.HOME },
          { label: type === "flight" ? "Flights" : "Hotels", to: type === "flight" ? ROUTES.FLIGHTS : ROUTES.HOTELS },
          { label: "Booking" },
        ]}
      />

      <h1 className="mt-4 font-display text-3xl font-semibold">{title}</h1>

      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]"
        >
          <div className="flex flex-col gap-6">
            {type === "flight" ? (
              <SeatClassSelector basePrice={flight.price} />
            ) : (
              <RoomTypeSelector pricePerNight={hotel.pricePerNight} />
            )}
            <PassengerDetailsForm
              personLabel={type === "flight" ? "Passenger" : "Guest"}
            />
          </div>

          <BookingSummary
            title={title}
            details={summaryDetails}
            priceLines={priceLines}
            total={pricing.total}
            isSubmitting={form.formState.isSubmitting}
          />
        </form>
      </FormProvider>
    </div>
  );
}
