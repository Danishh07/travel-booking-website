const TONES = {
  neutral: "bg-ink/5 text-ink",
  ochre: "bg-ochre/10 text-ochre-dark",
  harbor: "bg-harbor-light text-harbor",
};

export default function Badge({ children, tone = "neutral", className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
