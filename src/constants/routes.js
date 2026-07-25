export const ROUTES = {
  HOME: "/",
  FLIGHTS: "/flights",
  HOTELS: "/hotels",
  DESTINATION: "/destinations/:slug",
  destination: (slug) => `/destinations/${slug}`,
  BOOKING: "/booking/:type/:id",
  booking: (type, id) => `/booking/${type}/${id}`,
  WISHLIST: "/wishlist",
  DASHBOARD: "/dashboard",
  ABOUT: "/about",
  CAREERS: "/careers",
  PRESS: "/press",
};
