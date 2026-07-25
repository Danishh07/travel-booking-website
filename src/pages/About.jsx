import WhyChooseUs from "../components/sections/home/WhyChooseUs";
import Button from "../components/common/Button";
import { ROUTES } from "../constants/routes";

const STATS = [
  { value: "2019", label: "Founded" },
  { value: "6", label: "Destinations covered" },
  { value: "50K+", label: "Trips booked" },
  { value: "12", label: "Team members" },
];

export default function About() {
  return (
    <div>
      <div className="bg-route text-white">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-white/60">
            About us
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            We think trip planning should feel like one clear itinerary,
            not five open tabs.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            TravelNest started as a frustration with booking sites that show
            one price at search and another at checkout. We built the
            opposite: flights and stays searched side by side, with a price
            that doesn't change on you.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-mono text-2xl font-semibold text-ink">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-xl font-semibold">
              How we got here
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              We spent years booking trips across a patchwork of sites — one
              for flights, another for hotels, a spreadsheet to keep it all
              straight. TravelNest is the tool we wanted: one search for
              flights and stays, a booking summary that actually matches
              what you see at checkout, and a dashboard that remembers your
              trips so you don't have to.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold">
              Who's building it
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              We're a small, remote-first team spread across three time
              zones, working directly with the travelers who use the
              product every week. If that sounds like a place you'd want to
              work, we're usually hiring.
            </p>
            <div className="mt-4">
              <Button to={ROUTES.CAREERS} variant="outline">
                View open roles
              </Button>
            </div>
          </div>
        </div>
      </div>

      <WhyChooseUs />
    </div>
  );
}
