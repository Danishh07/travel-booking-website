import SectionHeading from "../../common/SectionHeading";

export default function ThingsToDo({ items }) {
  return (
    <section>
      <SectionHeading eyebrow="Make the most of it" title="Things to do" />

      <div className="mt-6 flex flex-col gap-4">
        {items.map((item, index) => (
          <div
            key={item.title}
            className="flex gap-4 rounded-card border border-hairline bg-white p-5"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-harbor-light font-mono text-sm font-semibold text-harbor">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-muted">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
