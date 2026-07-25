import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelBooking } from "../redux/slices/bookingSlice";

export function useBookings() {
  const bookings = useSelector((state) => state.booking.bookings);
  const dispatch = useDispatch();

  const { upcoming, previous } = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    const upcomingList = [];
    const previousList = [];

    for (const booking of bookings) {
      if (booking.tripDate >= today) {
        upcomingList.push(booking);
      } else {
        previousList.push(booking);
      }
    }

    upcomingList.sort((a, b) => a.tripDate.localeCompare(b.tripDate));
    previousList.sort((a, b) => b.tripDate.localeCompare(a.tripDate));

    return { upcoming: upcomingList, previous: previousList };
  }, [bookings]);

  const totalSpent = useMemo(
    () => bookings.reduce((sum, b) => sum + b.total, 0),
    [bookings]
  );

  return {
    upcoming,
    previous,
    totalSpent,
    totalBookings: bookings.length,
    cancel: (id) => dispatch(cancelBooking(id)),
  };
}
