import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

/**
 * items: [{ question, answer }]. Single-open accordion — one item expanded
 * at a time, which is the common pattern for FAQ lists.
 */
export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="flex flex-col divide-y divide-hairline rounded-card border border-hairline bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `accordion-panel-${item.question.replace(/\s+/g, "-")}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-ink"
              >
                {item.question}
                <HiChevronDown
                  size={18}
                  className={`shrink-0 text-muted transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            {isOpen && (
              <div id={panelId} className="px-5 pb-4 text-sm leading-relaxed text-muted">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
