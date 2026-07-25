import { CABIN_CLASSES, ROOM_TYPES, TAX_RATE } from "../constants/booking";

export function computeFlightTotal({ basePrice, cabinClass, travelers }) {
  const multiplier =
    CABIN_CLASSES.find((c) => c.value === cabinClass)?.multiplier ?? 1;
  const subtotal = basePrice * multiplier * travelers;
  const taxes = subtotal * TAX_RATE;
  return { subtotal, taxes, total: subtotal + taxes };
}

export function computeHotelTotal({ pricePerNight, roomType, nights, rooms = 1 }) {
  const multiplier =
    ROOM_TYPES.find((r) => r.value === roomType)?.multiplier ?? 1;
  const subtotal = pricePerNight * multiplier * Math.max(nights, 0) * rooms;
  const taxes = subtotal * TAX_RATE;
  return { subtotal, taxes, total: subtotal + taxes };
}

export function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const diff = new Date(checkOut) - new Date(checkIn);
  return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
}
