import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0A0A0A",
          white: "#FFFFFF",
          grey: "#6B6B6B",
          border: "#E5E5E5",
          light: "#F9F9F9",
          muted: "#8E8E93"
        },
        tag: {
          new: "#1F5C3D",       // Deep Green for New Investment Opportunity
          reinvest: "#B08D3F",  // Muted Amber for Re-Investment
          missed: "#6B6B6B",    // Muted Grey for Missed Opportunity
        }
      },
      fontFamily: {
        sans: ["var(--font-primary)", "Inter", "Helvetica Neue", "Arial", "sans-serif"],
        editorial: ["var(--font-primary)", "Inter", "Helvetica Neue", "Georgia", "serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
        wideBrand: "0.08em",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
