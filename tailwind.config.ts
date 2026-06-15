import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05070a",
        graphite: "#242833",
        mist: "#f4f7fb",
        azure: "#0a84ff",
        clinic: "#eaf4ff"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      },
      boxShadow: {
        premium: "0 28px 90px rgba(10, 42, 87, 0.16)",
        glass: "inset 0 1px 0 rgba(255,255,255,0.75), 0 20px 70px rgba(20,40,80,0.12)"
      }
    }
  },
  plugins: []
};

export default config;
