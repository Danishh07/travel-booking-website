import { Link } from "react-router-dom";

const VARIANTS = {
  primary: "bg-ochre-dark text-white hover:bg-ochre-darker",
  secondary: "bg-route text-white hover:bg-route-light",
  outline: "border border-ink/20 text-ink hover:border-ink/40 bg-transparent",
  ghost: "text-ink hover:bg-ink/5",
};

const SIZES = {
  sm: "text-sm px-3 py-1.5",
  md: "text-sm px-5 py-2.5",
  lg: "text-base px-6 py-3",
};

/**
 * Shared button. Renders a <Link> when `to` is provided, otherwise a <button>.
 * Kept as one component so every CTA in the app shares the same focus ring,
 * disabled state, and sizing scale.
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  type = "button",
  disabled = false,
  className = "",
  icon: Icon,
  ...rest
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {Icon && <Icon aria-hidden="true" />}
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} {...rest}>
      {Icon && <Icon aria-hidden="true" />}
      {children}
    </button>
  );
}
