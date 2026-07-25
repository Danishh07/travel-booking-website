/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Core palette — see DESIGN.md for rationale
        ink: "#14171F", // primary text
        canvas: "#F7F6F2", // page background
        route: {
          DEFAULT: "#1B2A4A", // deep navy — nav, footer, dark sections
          light: "#2C4270",
        },
        ochre: {
          DEFAULT: "#C08B3E", // decorative use only: icons, badge text, borders, slider — NOT button text on this bg (3.0:1, fails AA text contrast)
          dark: "#8B5E27", // accessible CTA background — 5.6:1 with white text
          darker: "#6E4A1F", // hover/active state — 7.9:1 with white text
          light: "#E4C593",
        },
        harbor: {
          DEFAULT: "#2F6F62", // secondary accent — ratings, links, success
          light: "#E4EEEC",
        },
        hairline: "#E4E1D8", // borders / dividers
        muted: "#6B6F76", // secondary text
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      borderRadius: {
        card: "1.25rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(20, 23, 31, 0.04), 0 8px 24px rgba(20, 23, 31, 0.06)",
        lift: "0 4px 8px rgba(20, 23, 31, 0.06), 0 16px 40px rgba(20, 23, 31, 0.10)",
      },
      backgroundImage: {
        "flight-path":
          "repeating-linear-gradient(to right, #C7C2B4 0, #C7C2B4 6px, transparent 6px, transparent 14px)",
      },
    },
  },
  plugins: [],
};
