import type { Config } from "tailwindcss";

/**
 * Дизайн-система: primary #00b4ff, тёмная тема.
 * `gray-ds` — шкала из макета; стандартные `gray-*` Tailwind не трогаем.
 * Контент: `src/` (App Router).
 */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00b4ff",
          50: "#e6f8ff",
          100: "#b3eeff",
          500: "#00b4ff",
          600: "#0099d9",
          700: "#0077aa"
        },
        dark: {
          DEFAULT: "#0a0a0a",
          900: "#0a0a0a",
          800: "#111111",
          700: "#1a1a1a"
        },
        foreground: "#ffffff",
        background: "#0a0a0a",
        "gray-ds": {
          100: "#f3f3f3",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373"
        },
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
        ],
        display: [
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
