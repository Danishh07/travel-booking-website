import SectionHeading from "../components/common/SectionHeading";
import { pressMentions } from "../data/pressMentions";

export default function Press() {
  return (
    <div>
      <div className="bg-route text-white">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-white/60">
            Press
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            TravelNest in the news
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            A few mentions from travel and tech publications. For
            interviews, quotes, or brand assets, reach out below.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <SectionHeading eyebrow="Coverage" title="Recent mentions" />

        <div className="mt-8 flex flex-col gap-6">
          {pressMentions.map((mention) => (
            <article
              key={mention.id}
              className="rounded-card border border-hairline bg-white p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-xs uppercase tracking-widest text-harbor">
                  {mention.publication}
                </p>
                <time className="text-xs text-muted" dateTime={mention.date}>
                  {new Date(mention.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
              <h2 className="mt-2 font-display text-lg font-semibold">
                {mention.headline}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {mention.excerpt}
              </p>
            </article>
          ))}
        </div>

        <div className="ticket-divider ticket-divider--on-white my-12" />

        <div className="rounded-card border border-hairline bg-white p-6 text-center">
          <h2 className="font-display text-lg font-semibold">
            Media inquiries
          </h2>
          <p className="mt-2 text-sm text-muted">
            For interviews, data requests, or logo and brand assets, contact
            our press team.
          </p>
          <a
            href="mailto:press@travelnest.example"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-ochre-dark px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ochre-darker"
          >
            press@travelnest.example
          </a>
        </div>
      </div>
    </div>
  );
}
