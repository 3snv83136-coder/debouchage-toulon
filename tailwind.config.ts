import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Identité « Chemisage Canalisation Sans Casse » : violet électrique, rose flash, citron, cyan
        ink: { DEFAULT: "#13072E", soft: "#3F3560", muted: "#6E6590" },
        sea: { 50: "#F3EEFF", 100: "#E2D6FF", 500: "#7B3DFF", 600: "#6420F5", 700: "#4E12CC" },
        sun: { 50: "#FFEFF6", 400: "#FF5CA8", 500: "#FF2D87", 600: "#E0106B" },
        lime: { DEFAULT: "#C8FF2E", soft: "#EEFFC2" },
        cyan: { DEFAULT: "#00D9FF", soft: "#D6F8FF" },
        jaune: { DEFAULT: "#FFE14D", soft: "#FFF7CC" },
        sand: "#F7F3FF",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(19,7,46,.06), 0 10px 30px -12px rgba(19,7,46,.25)",
        flash: "6px 6px 0 0 #13072E",
      },
    },
  },
  plugins: [],
};

export default config;
