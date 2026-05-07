import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00BFFF",
        dark: "#0A0A0A",
        gray: "#1F1F1F",
        brand: {
          50: "#e6f6ff",
          100: "#cceeff",
          200: "#99ddff",
          300: "#66ccff",
          400: "#33bbff",
          500: "#00aaff",
          600: "#0088cc",
          700: "#006699",
          800: "#004466",
          900: "#002233"
        }
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Arial",
          "sans-serif"
        ]
      }
    }
  },
  plugins: []
} satisfies Config;

