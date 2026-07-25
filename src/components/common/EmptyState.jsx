export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  headingLevel: Heading = "h3",
}) {
  return (
    <div className="flex flex-col items-center rounded-card border border-dashed border-hairline bg-white px-6 py-16 text-center">
      {Icon && (
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink/5 text-muted">
          <Icon size={24} aria-hidden="true" />
        </span>
      )}
      <Heading className="mt-4 font-display text-lg font-semibold">{title}</Heading>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-muted">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
