# TravelNest

A frontend-only travel booking platform (flights, hotels, destinations,
booking flow, wishlist, dashboard) built as a React portfolio project.

## Stack

React + Vite, Tailwind CSS, React Router DOM, Redux Toolkit, React Hook Form,
Axios (mock/local data only — no backend), React Icons.

## Getting started

```bash
npm install
npm run dev
```

## Project structure

```
src/
  assets/        static images/icons
  components/
    common/      generic reusable UI (Button, Card, Loader, ...)
    layout/      Navbar, Footer, Layout
  pages/         route-level pages
  routes/        route definitions (lazy-loaded)
  redux/         store + slices (wishlist, booking, ui, ...)
  hooks/         custom hooks
  services/      mock "API" data-fetching functions
  utils/         helpers (formatters, validators)
  constants/      routes, nav links, static config
  data/          local JSON dummy data (flights, hotels, destinations)
```

## Status

This project is being built one feature at a time. Current state:
project setup, design system (Tailwind tokens), routing skeleton, and
shared layout (Navbar/Footer/404) are complete. Page content is scaffolded
as placeholders and will be filled in feature by feature.
