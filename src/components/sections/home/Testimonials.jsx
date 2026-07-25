import SectionHeading from "../../common/SectionHeading";
import Rating from "../../common/Rating";
import { testimonials } from "../../../data/testimonials";

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading
        eyebrow="Traveler stories"
        title="What travelers say"
        align="center"
      />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.id}
            className="flex flex-col rounded-card border border-hairline bg-white p-6 shadow-soft"
          >
            <Rating value={testimonial.rating} />
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink">
              "{testimonial.quote}"
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <img
                src={testimonial.avatar}
                alt=""
                loading="lazy"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold">{testimonial.name}</p>
                <p className="text-xs text-muted">{testimonial.location}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
