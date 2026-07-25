import {
  HiOutlineShieldCheck,
  HiOutlineCurrencyDollar,
  HiOutlineClock,
  HiOutlineArrowPath,
} from "react-icons/hi2";

const FEATURES = [
  {
    icon: HiOutlineCurrencyDollar,
    title: "Transparent pricing",
    description:
      "The price on the search page is the price at checkout — no hidden fees added later.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Secure booking",
    description:
      "Every booking is confirmed instantly with a clear summary you can review anytime.",
  },
  {
    icon: HiOutlineArrowPath,
    title: "Flexible cancellation",
    description:
      "Most flights and stays support free changes or cancellation within 24 hours.",
  },
  {
    icon: HiOutlineClock,
    title: "24/7 support",
    description:
      "Reach a real person any time before, during, or after your trip.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-route py-16 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <span className="font-mono text-xs uppercase tracking-widest text-white/60">
          Why TravelNest
        </span>
        <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
          Booking your trip shouldn't feel like a gamble
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div key={title}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-ochre">
                <Icon size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">
                {title}
              </h3>
              <p className="mt-2 text-sm text-white/70">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
