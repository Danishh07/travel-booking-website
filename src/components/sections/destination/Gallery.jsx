import { useState } from "react";

export default function Gallery({ images, alt }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <div className="overflow-hidden rounded-card border border-hairline">
        <img
          src={images[activeIndex]}
          alt={`${alt} — photo ${activeIndex + 1}`}
          className="h-80 w-full object-cover sm:h-[26rem]"
        />
      </div>

      <div className="mt-3 grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`overflow-hidden rounded-lg border-2 transition-colors ${
              index === activeIndex
                ? "border-ochre"
                : "border-transparent hover:border-hairline"
            }`}
            aria-label={`Show photo ${index + 1} of ${alt}`}
            aria-pressed={index === activeIndex}
          >
            <img
              src={image}
              alt=""
              loading="lazy"
              className="h-20 w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
