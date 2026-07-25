import { HiOutlinePaperAirplane } from "react-icons/hi";
import Button from "../components/common/Button";
import { ROUTES } from "../constants/routes";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-24 text-center">
      <div className="rounded-card border border-hairline bg-white p-8 shadow-soft">
        <HiOutlinePaperAirplane
          size={32}
          className="mx-auto rotate-45 text-ochre"
          aria-hidden="true"
        />
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted">
          Boarding pass — route not found
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold">
          This page never took off
        </h1>
        <p className="mt-2 text-sm text-muted">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <div className="mt-6">
          <Button to={ROUTES.HOME}>Back to home</Button>
        </div>
      </div>
    </div>
  );
}
