import { Link } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi2";

/**
 * items: [{ label, to }]. The last item renders as plain text (current page).
 */
export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1">
              {isLast || !item.to ? (
                <span aria-current={isLast ? "page" : undefined} className="text-ink">
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} className="hover:text-ink hover:underline">
                  {item.label}
                </Link>
              )}
              {!isLast && <HiChevronRight size={14} aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
