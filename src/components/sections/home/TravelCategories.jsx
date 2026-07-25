import {
  HiOutlineSun,
  HiOutlineGlobeAlt,
  HiOutlineBuildingOffice2,
  HiOutlineMap,
  HiOutlineBookOpen,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import SectionHeading from "../../common/SectionHeading";
import { categories } from "../../../data/categories";

const ICONS = {
  HiOutlineSun,
  HiOutlineGlobeAlt,
  HiOutlineBuildingOffice2,
  HiOutlineMap,
  HiOutlineBookOpen,
  HiOutlineUserGroup,
};

export default function TravelCategories() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading eyebrow="Browse by mood" title="Travel categories" />

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => {
          const Icon = ICONS[category.icon];
          return (
            <button
              key={category.id}
              type="button"
              className="flex flex-col items-center gap-3 rounded-card border border-hairline bg-white px-4 py-6 text-center transition-colors hover:border-ochre/50 hover:bg-ochre/5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-harbor-light text-harbor">
                {Icon && <Icon size={22} aria-hidden="true" />}
              </span>
              <span className="text-sm font-medium">{category.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
