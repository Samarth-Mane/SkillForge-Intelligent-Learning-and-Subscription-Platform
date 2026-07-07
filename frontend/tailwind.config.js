/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#050810",
          900: "#0A0F1E",
          800: "#0F172A",
          700: "#1E293B",
          600: "#334155",
        },
        indigo: {
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
        },
        violet: {
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
        },
        cyan: {
          400: "#22D3EE",
          500: "#06B6D4",
          600: "#0891B2",
        },
      },
      fontFamily: {
        display: ["Sora", "Inter", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow":
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.3) 0%, transparent 60%)",
        "card-glow":
          "radial-gradient(ellipse 100% 100% at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(99,102,241,0.4)",
        "glow-sm": "0 0 10px rgba(99,102,241,0.3)",
        "glow-violet": "0 0 20px rgba(139,92,246,0.4)",
        glass: "0 8px 32px rgba(0,0,0,0.4)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        float: "float 3s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(99,102,241,0.3)" },
          "50%": { boxShadow: "0 0 25px rgba(99,102,241,0.6)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
