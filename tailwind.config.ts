import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // SaaS Modern Blue/Purple Light Theme
        "accent-primary": "var(--accent-primary)",
        "accent-primary-hover": "var(--accent-primary-hover)",
        "accent-primary-muted": "rgba(var(--accent-primary-rgb), 0.08)",
        "accent-primary-glow": "rgba(var(--accent-primary-rgb), 0.15)",
        "accent-secondary": "var(--accent-secondary)",
        
        // Backgrounds (Clean, Professional Light)
        "bg-base": "var(--bg-base)",
        "bg-card": "rgba(255, 255, 255, 0.8)", // White glass
        "bg-elevated": "rgba(255, 255, 255, 0.95)",
        
        // Text
        "text-primary": "#0F172A", // Slate 900 (Near Black)
        "text-secondary": "#475569", // Slate 600 (Professional Gray)
        "text-muted": "#64748B", // Slate 500
        "text-accent": "var(--accent-primary)",
        
        // Borders
        "border-default": "rgba(0, 0, 0, 0.08)",
        "border-primary-hover": "rgba(var(--accent-primary-rgb), 0.4)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1.1" }],
        "6xl": ["3.75rem", { lineHeight: "1.1" }],
        "7xl": ["4.5rem", { lineHeight: "1.05" }],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)",
      },
      boxShadow: {
        "card-shadow": "0 10px 30px -10px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.02)",
        "glow-primary": "0 0 0 1px rgba(var(--accent-primary-rgb), 0.1), 0 4px 14px rgba(var(--accent-primary-rgb), 0.08)",
        "glow-primary-soft": "0 4px 14px rgba(var(--accent-primary-rgb), 0.05)",
        "glow-primary-spark": "0 0 20px rgba(var(--accent-primary-rgb), 0.05), 0 0 40px rgba(var(--accent-primary-rgb), 0.02)",
        "input-shadow": "0 1px 2px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)",
        "input-focus": "0 0 0 2px rgba(var(--accent-primary-rgb), 0.2)",
      },
      borderRadius: {
        "card": "1rem",
        "button": "0.5rem",
      },
      backgroundColor: {
        "card-light": "rgba(255, 255, 255, 0.9)",
        "card-glass": "rgba(255, 255, 255, 0.6)",
        "navbar-scrolled": "rgba(249, 250, 251, 0.85)", 
        "navbar-top": "rgba(249, 250, 251, 0.4)",
        "footer": "rgba(249, 250, 251, 0.98)",
        "button-primary": "var(--accent-primary)",
      },
    },
  },
  plugins: [],
};
export default config;
