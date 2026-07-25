import { createSlice } from "@reduxjs/toolkit";
import { readJSON } from "../../utils/storage";

const STORAGE_KEY = "travelnest_wishlist";

const initialState = {
  // items: [{ type: 'destination' | 'hotel', id: string }]
  items: readJSON(STORAGE_KEY, []),
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlistItem: (state, action) => {
      const { type, id } = action.payload;
      const index = state.items.findIndex(
        (item) => item.type === type && item.id === id
      );
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push({ type, id });
      }
    },
  },
});

export const { toggleWishlistItem } = wishlistSlice.actions;
export default wishlistSlice.reducer;
export { STORAGE_KEY as WISHLIST_STORAGE_KEY };
