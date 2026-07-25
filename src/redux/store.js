import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import bookingReducer, { BOOKING_STORAGE_KEY } from "./slices/bookingSlice";
import wishlistReducer, { WISHLIST_STORAGE_KEY } from "./slices/wishlistSlice";
import { writeJSON } from "../utils/storage";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    booking: bookingReducer,
    wishlist: wishlistReducer,
  },
});

// Manual, dependency-free persistence — simpler than pulling in redux-persist
// for a project with only two small slices that need it (booking, wishlist).
store.subscribe(() => {
  const state = store.getState();
  writeJSON(BOOKING_STORAGE_KEY, state.booking.bookings);
  writeJSON(WISHLIST_STORAGE_KEY, state.wishlist.items);
});

