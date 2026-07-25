import { NavLink } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { toggleMobileNav, closeMobileNav } from "../../redux/slices/uiSlice";
import { NAV_LINKS } from "../../constants/navigation";
import { ROUTES } from "../../constants/routes";
import Button from "../common/Button";

export default function Navbar() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.isMobileNavOpen);

  const linkClasses = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-ink" : "text-muted hover:text-ink"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-canvas/90 backdrop-blur border-b border-hairline">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
        aria-label="Primary"
      >
        <NavLink
          to={ROUTES.HOME}
          className="font-display text-xl font-semibold tracking-tight"
          onClick={() => dispatch(closeMobileNav())}
        >
          TravelNest
        </NavLink>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className={linkClasses}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button variant="outline" size="sm">
            Sign in
          </Button>
        </div>

        <button
          type="button"
          className="p-2 text-ink md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => dispatch(toggleMobileNav())}
        >
          {isOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
      </nav>

      {isOpen && (
        <ul className="flex flex-col gap-1 border-t border-hairline px-6 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={linkClasses}
                onClick={() => dispatch(closeMobileNav())}
              >
                <span className="block py-2">{link.label}</span>
              </NavLink>
            </li>
          ))}
          <li className="pt-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => dispatch(closeMobileNav())}
            >
              Sign in
            </Button>
          </li>
        </ul>
      )}
    </header>
  );
}
