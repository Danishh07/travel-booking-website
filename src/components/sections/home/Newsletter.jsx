import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import Button from "../../common/Button";

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { email: "" } });

  const onSubmit = () => {
    // No backend — simulate a successful signup.
    setSubmitted(true);
    reset();
  };

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="rounded-card border border-hairline bg-white px-6 py-10 text-center shadow-soft sm:px-12">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">
          Fare drops, straight to your inbox
        </h2>
        <p className="mt-2 text-sm text-muted">
          One email a week. Unsubscribe whenever you like.
        </p>

        {submitted ? (
          <p
            role="status"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-harbor-light px-4 py-2 text-sm font-medium text-harbor"
          >
            You're subscribed — welcome aboard.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mt-6 flex flex-col gap-3 sm:mx-auto sm:max-w-md sm:flex-row"
          >
            <div className="flex-1 text-left">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-full border border-hairline px-4 py-2.5 text-sm outline-none focus:border-ink"
                {...register("email", {
                  required: "Enter your email address",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "newsletter-error" : undefined}
              />
              {errors.email && (
                <p id="newsletter-error" className="mt-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <Button type="submit" icon={HiOutlinePaperAirplane}>
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
