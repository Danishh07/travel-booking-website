import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

const today = new Date().toISOString().split("T")[0];

/**
 * Encapsulates the flight search form's validation + submit behavior.
 * `initialFromParams` lets the Flights page prefill the bar from the URL
 * query string set by the Home page's hero search.
 */
export function useFlightSearchForm({ initialFromParams = false } = {}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const defaultValues = initialFromParams
    ? {
        from: searchParams.get("from") || "",
        to: searchParams.get("to") || "",
        departDate: searchParams.get("depart") || "",
        returnDate: searchParams.get("return") || "",
        travelers: Number(searchParams.get("travelers")) || 1,
      }
    : { from: "", to: "", departDate: "", returnDate: "", travelers: 1 };

  const form = useForm({ defaultValues });

  const onSubmit = form.handleSubmit((data) => {
    const params = new URLSearchParams({
      from: data.from,
      to: data.to,
      depart: data.departDate,
      ...(data.returnDate ? { return: data.returnDate } : {}),
      travelers: String(data.travelers),
    });
    navigate(`/flights?${params.toString()}`);
  });

  return { ...form, onSubmit, today };
}
