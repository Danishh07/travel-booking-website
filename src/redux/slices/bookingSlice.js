import { createSlice } from "@reduxjs/toolkit";
import { readJSON } from "../../utils/storage";

const STORAGE_KEY = "travelnest_bookings";

const initialState = {
  bookings: readJSON(STORAGE_KEY, []),
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    addBooking: {
      reducer: (state, action) => {
        state.bookings.unshift(action.payload);
      },
      prepare: (booking) => ({
        payload: {
          ...booking,
          id: crypto.randomUUID(),
          reference: `TN-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
          bookedAt: new Date().toISOString(),
        },
      }),
    },
    cancelBooking: (state, action) => {
      state.bookings = state.bookings.filter((b) => b.id !== action.payload);
    },
  },
});

export const { addBooking, cancelBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
export { STORAGE_KEY as BOOKING_STORAGE_KEY };
