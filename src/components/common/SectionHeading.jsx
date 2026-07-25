export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
  align = "left",
}) {
  const alignment = align === "center" ? "text-center items-center" : "items-start";

  return (
    <div className={`flex flex-col justify-between gap-4 sm:flex-row sm:items-end ${align === "center" ? "sm:flex-col sm:text-center" : ""}`}>
      <div className={`flex flex-col ${alignment}`}>
        {eyebrow && (
          <span className="font-mono text-xs uppercase tracking-widest text-harbor">
            {eyebrow}
          </span>
        )}
        <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 max-w-xl text-sm text-muted sm:text-base">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
