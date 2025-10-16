/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background, 210 40% 97%))",        // soft off-white
        foreground: "hsl(var(--foreground, 220 15% 12%))",        // dark slate text
        card: "hsl(var(--card, 210 40% 100%))",
        "card-foreground": "hsl(var(--card-foreground, 220 15% 12%))",
        popover: "hsl(var(--popover, 210 40% 100%))",
        "popover-foreground": "hsl(var(--popover-foreground, 220 15% 12%))",
        primary: "hsl(var(--primary, 211 90% 55%))",              // calm blue
        "primary-foreground": "hsl(var(--primary-foreground, 0 0% 100%))",
        secondary: "hsl(var(--secondary, 174 72% 38%))",          // soft teal
        "secondary-foreground": "hsl(var(--secondary-foreground, 0 0% 100%))",
        muted: "hsl(var(--muted, 210 20% 95%))",                  // light gray
        "muted-foreground": "hsl(var(--muted-foreground, 220 15% 25%))",
        accent: "hsl(var(--accent, 21 90% 55%))",                 // coral
        "accent-foreground": "hsl(var(--accent-foreground, 0 0% 100%))",
        destructive: "hsl(var(--destructive, 0 79% 52%))",        // red for errors
        "destructive-foreground": "hsl(var(--destructive-foreground, 0 0% 100%))",
        border: "hsl(var(--border, 210 16% 85%))",
        input: "hsl(var(--input, 210 16% 85%))",
        ring: "hsl(var(--ring, 211 90% 55%))",
        "chart-1": "hsl(var(--chart-1, 211 90% 55%))",            // primary blue
        "chart-2": "hsl(var(--chart-2, 174 72% 38%))",            // teal
        "chart-3": "hsl(var(--chart-3, 340 80% 65%))",            // soft pink
        "chart-4": "hsl(var(--chart-4, 48 90% 60%))",             // warm yellow
        "chart-5": "hsl(var(--chart-5, 280 60% 65%))",            // calm purple
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
