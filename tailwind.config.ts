import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0B1F33", soft: "#3A4E63", muted: "#6B7C8F" },
        sea: { 50: "#EEF6FB", 100: "#D7EAF5", 500: "#1C7DB8", 600: "#13689C", 700: "#0E527C" },
        sun: { 50: "#FFF4EC", 400: "#FF8A3D", 500: "#F26B1D", 600: "#D9550B" },
        sand: "#F7F4EF",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,31,51,.06), 0 8px 24px -12px rgba(11,31,51,.18)",
      },
    },
  },
  plugins: [],
};

export default config;
