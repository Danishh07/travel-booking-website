import { Link } from "react-router-dom";
import { NAV_LINKS } from "../../constants/navigation";
import { ROUTES } from "../../constants/routes";

const FOOTER_COLUMNS = [
  {
    heading: "Explore",
    links: NAV_LINKS,
  },
  {
    heading: "Company",
    links: [
      { label: "About", to: ROUTES.ABOUT },
      { label: "Careers", to: ROUTES.CAREERS },
      { label: "Press", to: ROUTES.PRESS },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help center", to: "/help" },
      { label: "Cancellation options", to: "/help/cancellation" },
      { label: "Contact us", to: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-route text-white/80">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <p className="font-display text-xl font-semibold text-white">
              TravelNest
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">
              Flights, stays, and itineraries in one boarding pass — book with
              a clear view of the whole trip.
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading}>
              <p className="text-sm font-semibold text-white">
                {column.heading}
              </p>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="ticket-divider mt-12 mx-6" />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-white/60 md:flex-row">
          <p>© {new Date().getFullYear()} TravelNest. All rights reserved.</p>
          <p>Built as a frontend engineering portfolio project.</p>
        </div>
      </div>
    </footer>
  );
}
