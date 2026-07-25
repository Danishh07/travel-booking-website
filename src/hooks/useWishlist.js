import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlistItem } from "../redux/slices/wishlistSlice";

export function useWishlist() {
  const items = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  const isWishlisted = useCallback(
    (type, id) => items.some((item) => item.type === type && item.id === id),
    [items]
  );

  const toggle = useCallback(
    (type, id) => dispatch(toggleWishlistItem({ type, id })),
    [dispatch]
  );

  const idsByType = useCallback(
    (type) => items.filter((item) => item.type === type).map((item) => item.id),
    [items]
  );

  return { items, isWishlisted, toggle, idsByType };
}
