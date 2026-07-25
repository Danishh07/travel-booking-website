import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { ROUTES } from "../constants/routes";
import Loader from "../components/common/Loader";

// Lazy-loaded route-level pages — each page is its own code-split chunk.
const Home = lazy(() => import("../pages/Home"));
const Flights = lazy(() => import("../pages/Flights"));
const Hotels = lazy(() => import("../pages/Hotels"));
const DestinationDetails = lazy(() => import("../pages/DestinationDetails"));
const Booking = lazy(() => import("../pages/Booking"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const About = lazy(() => import("../pages/About"));
const Careers = lazy(() => import("../pages/Careers"));
const Press = lazy(() => import("../pages/Press"));
const Help = lazy(() => import("../pages/Help"));
const Cancellation = lazy(() => import("../pages/Cancellation"));
const Contact = lazy(() => import("../pages/Contact"));
const NotFound = lazy(() => import("../pages/NotFound"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader fullPage />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.FLIGHTS} element={<Flights />} />
          <Route path={ROUTES.HOTELS} element={<Hotels />} />
          <Route path={ROUTES.DESTINATION} element={<DestinationDetails />} />
          <Route path={ROUTES.BOOKING} element={<Booking />} />
          <Route path={ROUTES.WISHLIST} element={<Wishlist />} />
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.CAREERS} element={<Careers />} />
          <Route path={ROUTES.PRESS} element={<Press />} />
          <Route path={ROUTES.HELP} element={<Help />} />
          <Route path={ROUTES.CANCELLATION} element={<Cancellation />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
