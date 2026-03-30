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
        "bg-base": "#F8FAFC", // Soft Neutral Gray
        "bg-surface": "#FFFFFF",
        "bg-soft": "#F1F5F9", 
        "bg-navy": "#0B0F1A", // Deep Navy
        "bg-navy-light": "#131926",
        "bg-card": "rgba(255, 255, 255, 0.8)", // White glass
        
        // Text
        "text-primary": "#0B0F1A", // Deep Navy Heading
        "text-secondary": "#475569", 
        "text-muted": "#64748B", 
        "text-accent": "var(--accent-primary)",
        
        // Borders
        "border-default": "rgba(0, 0, 0, 0.06)",
        "border-subtle": "rgba(0, 0, 0, 0.03)",
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
        "gradient-mesh": "radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.1) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.1) 0, transparent 50%)",
      },
      boxShadow: {
        "card-shadow": "0 10px 30px -10px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.02)",
        "premium": "0 20px 50px -12px rgba(0,0,0,0.08), 0 0 1px 1px rgba(0,0,0,0.02)",
        "glow-primary": "0 0 0 1px rgba(var(--accent-primary-rgb), 0.1), 0 4px 14px rgba(var(--accent-primary-rgb), 0.08)",
        "glow-primary-soft": "0 4px 14px rgba(var(--accent-primary-rgb), 0.05)",
        "glow-primary-spark": "0 0 20px rgba(var(--accent-primary-rgb), 0.05), 0 0 40px rgba(var(--accent-primary-rgb), 0.02)",
        "input-shadow": "0 1px 2px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)",
        "input-focus": "0 0 0 2px rgba(var(--accent-primary-rgb), 0.2)",
      },
      borderRadius: {
        "card": "1.5rem",
        "button": "0.75rem",
      },
      backgroundColor: {
        "card-light": "rgba(255, 255, 255, 0.9)",
        "card-glass": "rgba(255, 255, 255, 0.6)",
        "navbar-scrolled": "rgba(249, 250, 251, 0.85)", 
        "navbar-top": "rgba(249, 250, 251, 0.4)",
        "footer": "rgba(249, 250, 251, 0.98)",
        "button-primary": "var(--accent-primary)",
      },
      keyframes: {
        "marquee-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "marquee-left": "marquee-left 30s linear infinite",
        "marquee-right": "marquee-right 30s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;


