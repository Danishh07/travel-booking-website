import FlightSearchCard from "./FlightSearchCard";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-route text-white">
      {/* subtle flight-path dots — decorative, aria-hidden */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <line
          x1="5%"
          y1="30%"
          x2="95%"
          y2="70%"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="2 10"
        />
        <circle cx="5%" cy="30%" r="4" fill="white" />
        <circle cx="95%" cy="70%" r="4" fill="white" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-20 sm:pt-28">
        <p className="font-mono text-xs uppercase tracking-widest text-white/60">
          Flights · Hotels · Itineraries
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
          Your next journey, all in one boarding pass.
        </h1>
        <p className="mt-4 max-w-lg text-base text-white/70">
          Search flights and stays side by side, and keep every detail of
          the trip — dates, seats, and price — on one clear itinerary.
        </p>
      </div>

      {/* Overlaps the hero bottom edge, styled like a ticket stub */}
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="translate-y-1/2">
          <FlightSearchCard />
        </div>
      </div>

      <div className="h-24 sm:h-20" aria-hidden="true" />
    </section>
  );
}
