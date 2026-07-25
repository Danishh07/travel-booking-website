import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineEnvelope, HiOutlineCheckCircle } from "react-icons/hi2";

const TOPICS = [
  "Booking a trip",
  "Cancellation or refund",
  "Account or wishlist",
  "Press inquiry",
  "Careers",
  "Something else",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", email: "", topic: TOPICS[0], message: "" },
  });

  const onSubmit = () => {
    // No backend — simulate a successful submission.
    setSubmitted(true);
    reset();
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-harbor">
        Contact us
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold">
        Get in touch
      </h1>
      <p className="mt-2 text-muted">
        Questions about a trip, a partnership, or anything else — we read
        every message.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-[1fr_260px]">
        <div className="rounded-card border border-hairline bg-white p-6">
          {submitted ? (
            <div
              role="status"
              className="flex flex-col items-center py-8 text-center"
            >
              <HiOutlineCheckCircle size={32} className="text-harbor" aria-hidden="true" />
              <p className="mt-3 font-display text-lg font-semibold">
                Message sent
              </p>
              <p className="mt-1 text-sm text-muted">
                Thanks for reaching out — we'll get back to you within one
                business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="text-xs font-medium text-muted">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    className="mt-1 w-full rounded-lg border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
                    {...register("name", { required: "Required" })}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-xs font-medium text-muted">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className="mt-1 w-full rounded-lg border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
                    {...register("email", {
                      required: "Required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="contact-topic" className="text-xs font-medium text-muted">
                  Topic
                </label>
                <select
                  id="contact-topic"
                  className="mt-1 w-full rounded-lg border border-hairline bg-white px-3 py-2 text-sm outline-none focus:border-ink"
                  {...register("topic")}
                >
                  {TOPICS.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="text-xs font-medium text-muted">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  className="mt-1 w-full rounded-lg border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
                  {...register("message", {
                    required: "Tell us a bit about what's going on",
                    minLength: { value: 10, message: "A little more detail helps" },
                  })}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ochre-dark px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ochre-darker"
              >
                Send message
              </button>
            </form>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-card border border-hairline bg-white p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-harbor-light text-harbor">
              <HiOutlineEnvelope size={18} aria-hidden="true" />
            </span>
            <p className="mt-3 text-sm font-semibold">Email support</p>
            <a
              href="mailto:support@travelnest.example"
              className="text-sm text-harbor hover:underline"
            >
              support@travelnest.example
            </a>
            <p className="mt-2 text-xs text-muted">
              Replies within one business day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
