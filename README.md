<div align="center">

# ✈️ TravelNest

### Flights, hotels, and itineraries — searched, compared, and booked in one clear boarding pass.

A frontend-only travel booking platform built to demonstrate production-grade React architecture:
component design, state management, routing, forms, and accessibility — the way a real
travel product would be structured, minus the backend.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![React Router](https://img.shields.io/badge/React_Router-6-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)
[![Responsive](https://img.shields.io/badge/Responsive-Yes-2F6F62?style=for-the-badge)](#-features)
[![Open Source](https://img.shields.io/badge/Open%20Source-%E2%9D%A4-C08B3E?style=for-the-badge)](#-contributing)

[Live Demo](#-live-demo) · [Features](#-features) · [Screenshots](#-screenshots) · [Getting Started](#-getting-started) · [Architecture](#-project-architecture)

</div>

<br />

## 📖 Overview

**TravelNest** is a frontend-only travel booking platform — flights, hotels, destination guides,
a full booking flow, a wishlist, and a personal dashboard — built entirely in React, with no
backend, authentication server, or payment gateway. All data comes from local mock modules
designed to look and behave like real API responses.

It's inspired by the UX patterns of products like Airbnb, Booking.com, and Google Flights, but
built from scratch with its own design system (a "boarding pass" visual motif — dashed
flight-path dividers, ticket-stub cards — running through the search bar, flight results,
and booking summary) rather than a copied template.

The project exists to answer one question honestly: **can this codebase hold up to the
scrutiny of a senior frontend engineer reviewing it in an interview?** Every page is composed
from small, reusable pieces; state is split deliberately between local, form, and global
(Redux) layers; and the design system, routing, and accessibility choices are all documented
inline in the code, not just in this README.

---

## 🔗 Live Demo

| | |
|---|---|
| 🌐 **Live Website** | [your-deployment-url.vercel.app](https://your-deployment-url.vercel.app) *(placeholder)* |
| 💻 **GitHub Repository** | [github.com/your-username/travelnest](https://github.com/your-username/travelnest) *(placeholder)* |

---

## 📸 Screenshots

<div align="center">

### Desktop View
`![Desktop View](./docs/screenshots/desktop-home.png)`

### Tablet View
`![Tablet View](./docs/screenshots/tablet-home.png)`

### Mobile View
`![Mobile View](./docs/screenshots/mobile-home.png)`

</div>

<details>
<summary><strong>More screenshots (Booking, Flights, Hotels, Dashboard)</strong></summary>
<br />

| Page | Preview |
|---|---|
| Flights (search, filters, sorting) | `![Flights Page](./docs/screenshots/flights.png)` |
| Hotels (search, filters, sorting) | `![Hotels Page](./docs/screenshots/hotels.png)` |
| Booking Flow (passenger details + summary) | `![Booking Page](./docs/screenshots/booking.png)` |
| Dashboard (trips, wishlist, account) | `![Dashboard](./docs/screenshots/dashboard.png)` |

*Replace the paths above with real screenshots in `docs/screenshots/` once available.*

</details>

---

## ✨ Features

- 🔍 **Flight search & booking** — search bar with validation, filter by stops/airline/price, sort by price/duration/departure, boarding-pass-styled result cards
- 🏨 **Hotel search & booking** — location/date/guest search, filter by rating/amenities/price, sortable results
- 🗺️ **Destination details** — hero image, photo gallery, curated things-to-do, nearby hotels, traveler reviews
- 🎟️ **Full booking flow** — dynamic passenger/guest fields that grow and shrink with traveler count (`useFieldArray`), live price recalculation by cabin class/room type, a real confirmation screen with a generated booking reference
- ❤️ **Wishlist** — save destinations and hotels from anywhere in the app, persisted to `localStorage`, backed by Redux
- 📊 **Personal dashboard** — upcoming/previous trips (computed live from booking data), account overview stats, saved-destinations preview
- 🛟 **Support center** — searchable FAQ accordion, a *functional* booking lookup + cancellation tool, and a validated contact form
- 📱 **Fully responsive** — desktop, tablet, and mobile layouts throughout, verified down to 320px
- ⚡ **Code-split routing** — every page is lazy-loaded (`React.lazy` + `Suspense`), so the initial bundle only ships what the landing page needs
- 🎨 **A real design system** — custom color tokens, a display/body/mono type scale, and a recurring "boarding pass" visual motif, not default Tailwind styling
- ♿ **Accessibility-reviewed** — verified color contrast ratios (WCAG AA), visible focus states on every interactive element (including custom radio cards), semantic landmarks, skip-to-content link, and correct heading hierarchy across all 14 pages
- 🧩 **Reusable component library** — `Button`, `Card` variants, `Badge`, `Rating`, `EmptyState`, `Pagination`, `Breadcrumb`, `Accordion` — each used in 3+ places, none duplicated
- ✅ **Form validation** — every form (search, booking, contact, newsletter) built with React Hook Form, including cross-field validation (e.g. check-out must be after check-in)
- 🗃️ **State management done deliberately** — Redux Toolkit only for state that's genuinely global (bookings, wishlist, UI toggles); everything else stays local or lives in the form

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | Component-driven UI, hooks-based architecture |
| **Vite** | Dev server and production build tooling |
| **Tailwind CSS** | Utility-first styling, powers the custom design system via `tailwind.config.js` tokens |
| **React Router DOM** | Client-side routing, nested layouts, lazy-loaded route-level code splitting |
| **Redux Toolkit** | Global state for bookings and wishlist (with `localStorage` persistence) and minor UI state |
| **React Hook Form** | All form state, validation, and dynamic field arrays |
| **React Icons** | Icon system (Heroicons via `react-icons/hi2`) |
| **Axios** | Installed and ready for a future API layer (see [Future Improvements](#-future-improvements)) — the current build uses local mock data, so no live HTTP calls are made yet |
| **ESLint** (flat config, React + Hooks rules) | Static analysis — `npm run lint` runs clean across the whole codebase |

---

## 📁 Folder Structure

```
travelnest/
├── public/
├── src/
│   ├── assets/                 # static images/icons
│   ├── components/
│   │   ├── common/             # generic, reusable UI
│   │   │   ├── Button.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Rating.jsx
│   │   │   ├── Breadcrumb.jsx
│   │   │   ├── Accordion.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── DestinationCard.jsx
│   │   │   ├── HotelCard.jsx
│   │   │   ├── FlightCard.jsx
│   │   │   └── ...
│   │   ├── layout/              # Navbar, Footer, Layout (Outlet wrapper)
│   │   └── sections/            # page-specific composed sections
│   │       ├── home/             # Hero, FlightSearchCard, Testimonials...
│   │       ├── flights/          # FiltersSidebar, SortBar, FlightsSearchBar
│   │       ├── hotels/           # FiltersSidebar, SortBar, HotelsSearchBar
│   │       ├── destination/      # Gallery, ThingsToDo, NearbyHotels, Reviews
│   │       ├── booking/          # PassengerDetailsForm, SeatClassSelector...
│   │       ├── dashboard/        # AccountOverview, TripCard
│   │       └── help/             # BookingLookup
│   ├── pages/                   # one file per route (14 pages)
│   ├── routes/                  # AppRoutes.jsx — lazy-loaded route definitions
│   ├── redux/
│   │   ├── store.js              # store setup + localStorage persistence
│   │   └── slices/               # bookingSlice, wishlistSlice, uiSlice
│   ├── hooks/                   # useFlightsFilter, useHotelsFilter, useWishlist,
│   │                             # useBookings, useFlightSearchForm
│   ├── services/                # scaffolded for a future real API layer
│   ├── utils/                   # formatters, pricing, storage helpers
│   ├── constants/                # routes, nav links, booking config
│   ├── data/                    # local mock data (flights, hotels, destinations,
│   │                             # reviews, FAQs, jobs, press mentions...)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                # Tailwind layers + design tokens
├── tailwind.config.js            # color/type/shadow design tokens
├── eslint.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/travelnest.git

# Move into the project
cd travelnest

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be running at `http://localhost:5173`.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite dev server with hot module replacement |
| `npm run build` | Type-checks and bundles the app for production into `dist/` |
| `npm run preview` | Serves the production build locally, for a final check before deploying |
| `npm run lint` | Runs ESLint across the codebase |

---

## 🏗️ Project Architecture

<details>
<summary><strong>Pages (<code>src/pages</code>)</strong></summary>
<br />

Fourteen route-level pages, each lazy-loaded independently: `Home`, `Flights`, `Hotels`,
`DestinationDetails`, `Booking`, `Wishlist`, `Dashboard`, `About`, `Careers`, `Press`, `Help`,
`Cancellation`, `Contact`, and `NotFound`. Every page is a thin composition layer — it pulls
data from `data/` or Redux, hands it to a custom hook if there's real logic involved, and
renders section components. No page file contains business logic itself.

</details>

<details>
<summary><strong>Components (<code>src/components</code>)</strong></summary>
<br />

Split into three tiers:
- **`common/`** — truly generic, reused across unrelated pages (`Button`, `Badge`, `Rating`,
  `Pagination`, `Breadcrumb`, `Accordion`, `EmptyState`, plus domain cards like
  `DestinationCard`/`HotelCard`/`FlightCard` that appear on 2–4 different pages each).
- **`layout/`** — the shell every page renders inside (`Navbar`, `Footer`, `Layout`).
- **`sections/`** — composed, page-specific sections, grouped by feature folder
  (`home/`, `flights/`, `hotels/`, `destination/`, `booking/`, `dashboard/`, `help/`).

</details>

<details>
<summary><strong>Redux (<code>src/redux</code>)</strong></summary>
<br />

Only two slices hold data that's genuinely global: **`bookingSlice`** (confirmed bookings,
read by both the Booking confirmation flow and the Dashboard) and **`wishlistSlice`** (saved
destinations/hotels, read by the wishlist heart icons on every card *and* the Wishlist page).
Both persist to `localStorage` via a single `store.subscribe()` call — a deliberate choice
over pulling in `redux-persist` for two small slices. A third, `uiSlice`, holds trivial UI
state (mobile nav open/closed). Everything else — form drafts, filter/sort state, accordion
open state — stays local, because no other component needs it.

</details>

<details>
<summary><strong>Hooks (<code>src/hooks</code>)</strong></summary>
<br />

Custom hooks carry the logic that would otherwise bloat page components:
`useFlightsFilter` / `useHotelsFilter` (filter + sort + pagination, derived with `useMemo`),
`useFlightSearchForm` (shared React Hook Form setup between the Home hero and the Flights
search bar), `useWishlist` and `useBookings` (thin wrappers around their Redux slices so no
component talks to `useSelector`/`dispatch` directly).

</details>

<details>
<summary><strong>Services (<code>src/services</code>)</strong></summary>
<br />

Currently scaffolded but empty — all data comes from the local mock modules in `src/data/`
instead. This folder is where an Axios-based API client would live if TravelNest were wired
up to a real backend (see [Future Improvements](#-future-improvements)).

</details>

<details>
<summary><strong>Utils (<code>src/utils</code>)</strong></summary>
<br />

Pure, dependency-free helper functions: `formatters.js` (currency/duration formatting),
`pricing.js` (flight/hotel total calculations — kept separate from components so the math
is independently testable), `storage.js` (safe `localStorage` read/write wrappers).

</details>

---

## 🗺️ Future Improvements

- [ ] **Backend integration** — replace `src/data/*` with real API calls through `src/services/`
- [ ] **Authentication** — real sign-up/login instead of the mock profile on the Dashboard
- [ ] **Payment gateway** — Stripe integration for the booking flow (currently no payment is collected, by design)
- [ ] **Real booking/inventory API** — live seat maps, room availability, and pricing
- [ ] **Real-time flight data** — integrate a live flight-status/pricing API
- [ ] **Maps integration** — Google Maps or Mapbox on Destination Details for things-to-do locations
- [ ] **Notifications** — email/push confirmation and reminder system
- [ ] **Admin panel** — manage listings, view bookings, moderate reviews
- [ ] **Automated testing** — unit tests for `utils/pricing.js` and the filter hooks, component tests for the booking flow

---

## 🎓 Learning Outcomes

Building TravelNest was an exercise in the parts of React that are easy to *use* but hard
to use **well**:

- **React Router** — nested layouts via `<Outlet>`, lazy-loaded routes, dynamic segments (`/destinations/:slug`, `/booking/:type/:id`), and reading/writing the URL query string as shareable state
- **Redux Toolkit** — deciding what *doesn't* belong in global state as much as what does, `prepare` callbacks for derived fields (booking references, timestamps), and manual `localStorage` persistence without extra dependencies
- **React Hook Form** — `useFieldArray` for a traveler list that grows/shrinks live, `FormProvider`/`useFormContext` to share one form across sibling components, and cross-field validation
- **Component reusability** — building `DestinationCard`/`HotelCard`/`FlightCard` once and reusing them across Home, listing pages, Destination Details, and the Wishlist, instead of re-implementing similar markup per page
- **Responsive design** — a mobile-first grid system verified down to 320px, including fixing a real overlap/clipping bug in the hero's floating search card
- **Performance optimization** — route-based code splitting with `React.lazy`, `useMemo` for derived filter/sort results so unrelated state changes don't re-sort data
- **Accessibility as a first-class concern** — computing actual WCAG contrast ratios, fixing an invisible focus state on custom radio cards via `has-[:focus-visible]`, and correcting heading-hierarchy skips — not just running a linter and calling it done

---

## 💡 Why This Project?

Most portfolio travel-booking clones stop at "looks nice in a screenshot." TravelNest is
built to survive a code review, not just a demo:

- **Every design decision has a stated reason** — component boundaries, what's in Redux vs.
  local state, why a hook was extracted — documented in commit messages and inline comments,
  the same way it'd be explained in an interview.
- **It's been audited, not just built.** A dedicated accessibility and responsive-design pass
  found and fixed real issues (a failing contrast ratio on the primary CTA color, invalid
  nested-interactive-element HTML, an invisible focus ring) — the kind of thing that separates
  "I copied a template" from "I understand what I shipped."
- **The data layer is honest.** No fake `fetch()` calls pretending to hit a real API — mock
  data is clearly local, and the `services/` folder is left empty and explained, rather than
  papered over.

If you're reviewing this for a frontend role: every file is small enough to read end-to-end,
every hook has one clear job, and I can walk through *why* any piece of it is built the way
it is.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for details.

---

## 📬 Contact

**Your Name**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/your-profile)
[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://your-portfolio.com)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:you@example.com)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/your-username)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please keep commits scoped and messages descriptive (this project follows
[Conventional Commits](https://www.conventionalcommits.org/), e.g. `feat:`, `fix:`, `refactor:`).

---

## 🙏 Acknowledgements

TravelNest's UX is inspired by the search-and-booking patterns popularized by
**[Airbnb](https://www.airbnb.com/)**, **[Booking.com](https://www.booking.com/)**, and
**[Google Flights](https://www.google.com/travel/flights)**. TravelNest is an independent
portfolio project and is **not affiliated with, endorsed by, or connected to** any of the
companies above.

<div align="center">

**⭐ If this project helped you or you found it interesting, consider giving it a star.**

</div>
