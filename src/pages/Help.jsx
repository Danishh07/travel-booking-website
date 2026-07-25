import SectionHeading from "../components/common/SectionHeading";
import Accordion from "../components/common/Accordion";
import Button from "../components/common/Button";
import { faqCategories } from "../data/faqs";
import { ROUTES } from "../constants/routes";

export default function Help() {
  return (
    <div>
      <div className="bg-route text-white">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-white/60">
            Help center
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            How can we help?
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Answers to the most common questions about booking, cancelling,
            and managing your trips.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16">
        {faqCategories.map((category) => (
          <div key={category.category} className="mb-12 last:mb-0">
            <SectionHeading title={category.category} />
            <div className="mt-5">
              <Accordion items={category.items} />
            </div>
          </div>
        ))}

        <div className="mt-4 rounded-card border border-hairline bg-white p-6 text-center">
          <h2 className="font-display text-lg font-semibold">
            Still need help?
          </h2>
          <p className="mt-2 text-sm text-muted">
            Manage a specific booking or reach our support team directly.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button to={ROUTES.CANCELLATION} variant="outline">
              Cancellation options
            </Button>
            <Button to={ROUTES.CONTACT}>Contact us</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
