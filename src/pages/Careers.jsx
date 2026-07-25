import { HiOutlineGlobeAlt, HiOutlineHeart, HiOutlineAcademicCap, HiOutlineChartBar } from "react-icons/hi2";
import SectionHeading from "../components/common/SectionHeading";
import Badge from "../components/common/Badge";
import { openRoles } from "../data/jobs";

const BENEFITS = [
  {
    icon: HiOutlineGlobeAlt,
    title: "Remote-first",
    description: "Work from anywhere across our three supported time zones.",
  },
  {
    icon: HiOutlineHeart,
    title: "Flexible time off",
    description: "No fixed PTO cap — take what you need, plan around your team.",
  },
  {
    icon: HiOutlineAcademicCap,
    title: "Learning budget",
    description: "An annual budget for courses, conferences, or books.",
  },
  {
    icon: HiOutlineChartBar,
    title: "Equity for everyone",
    description: "Every full-time hire gets equity, not just early roles.",
  },
];

export default function Careers() {
  return (
    <div>
      <div className="bg-route text-white">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-white/60">
            Careers
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            Build the trip-planning tool you wish existed.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            We're a small remote-first team working directly with the
            travelers who use TravelNest every week.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <SectionHeading eyebrow="Why work here" title="What you get" />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-card border border-hairline bg-white p-5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-harbor-light text-harbor">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold">
                {title}
              </h3>
              <p className="mt-1 text-sm text-muted">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <SectionHeading eyebrow="Join us" title="Open roles" />
          <div className="mt-6 flex flex-col gap-4">
            {openRoles.map((role) => (
              <div
                key={role.id}
                className="flex flex-col gap-4 rounded-card border border-hairline bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-display text-base font-semibold">
                    {role.title}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge tone="harbor">{role.department}</Badge>
                    <Badge tone="neutral">{role.location}</Badge>
                    <Badge tone="neutral">{role.type}</Badge>
                  </div>
                </div>
                <a
                  href={`mailto:careers@travelnest.example?subject=${encodeURIComponent(
                    `Application: ${role.title}`
                  )}`}
                  className="inline-flex shrink-0 items-center justify-center rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink/40"
                >
                  Apply
                </a>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            Don't see a fit?{" "}
            <a
              href="mailto:careers@travelnest.example"
              className="font-medium text-harbor hover:underline"
            >
              Reach out anyway
            </a>{" "}
            — we're always open to meeting people who care about travel.
          </p>
        </div>
      </div>
    </div>
  );
}
