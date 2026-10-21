import type { Config } from "tailwindcss";

// GSCI design tokens — validated against the dark surface (#09090b) for
// contrast and color-vision-deficiency separation. See src/lib/colors.ts for
// the chart-facing roles; these Tailwind tokens mirror the same values for UI chrome.
const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#09090b",
        panel: "#0e0e11",
        "panel-raised": "#131316",
        border: {
          DEFAULT: "#27272a",
          subtle: "rgba(255,255,255,0.08)",
        },
        ink: {
          primary: "#fafafa",
          secondary: "#a1a1aa",
          muted: "#71717a",
        },
        signal: {
          cyan: "#3987e5",
          amber: "#d95926",
          emerald: "#199e70",
        },
        status: {
          good: "#0ca30c",
          warning: "#fab219",
          critical: "#d03b3b",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(57,135,229,0.15), 0 0 32px -8px rgba(57,135,229,0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
