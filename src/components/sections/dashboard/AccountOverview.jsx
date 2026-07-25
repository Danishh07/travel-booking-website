import { currentUser } from "../../../data/user";
import { formatCurrency } from "../../../utils/formatters";

export default function AccountOverview({ totalBookings, totalSpent, savedCount }) {
  const memberSince = new Date(currentUser.memberSince).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const stats = [
    { label: "Total bookings", value: totalBookings },
    { label: "Total spent", value: formatCurrency(totalSpent) },
    { label: "Saved places", value: savedCount },
  ];

  return (
    <section className="rounded-card border border-hairline bg-white p-6">
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:text-left">
        <img
          src={currentUser.avatar}
          alt=""
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <h1 className="font-display text-2xl font-semibold">
            {currentUser.firstName} {currentUser.lastName}
          </h1>
          <p className="text-sm text-muted">{currentUser.email}</p>
          <p className="mt-1 text-xs text-muted">Member since {memberSince}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 border-t border-hairline pt-6">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-mono text-xl font-semibold">{stat.value}</p>
            <p className="mt-1 text-xs text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
