module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(0, 100%, 50%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        secondary: {
          DEFAULT: "hsl(222, 46%, 42%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        success: {
          DEFAULT: "hsl(120, 100%, 50%)",
          foreground: "hsl(0, 0%, 0%)",
        },
        warning: {
          DEFAULT: "hsl(40, 100%, 50%)",
          foreground: "hsl(0, 0%, 0%)",
        },
        error: {
          DEFAULT: "hsl(0, 100%, 50%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        info: {
          DEFAULT: "hsl(222, 46%, 42%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        background: "hsl(200, 2%, 24%)",
        surface: "rgba(23, 25, 27, 0.9)",
        foreground: "hsl(0, 0%, 100%)",
        muted: {
          DEFAULT: "hsl(0, 0%, 80%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        border: "hsl(200, 2%, 24%)",
        input: "hsl(200, 2%, 24%)",
        ring: "hsl(222, 46%, 52%)",
      },
      fontFamily: {
        sans: ["Lato", "sans-serif"],
      },
      fontSize: {
        h1: ["32px", { lineHeight: "36px", letterSpacing: "0", fontWeight: "700" }],
        h2: ["21px", { lineHeight: "32px", letterSpacing: "0", fontWeight: "400" }],
        h3: ["17px", { lineHeight: "28px", fontWeight: "700" }],
        body: ["14px", { lineHeight: "1.5", letterSpacing: "0.5px", fontWeight: "400" }],
        label: ["12px", { fontWeight: "600" }],
        caption: ["11px", { fontStyle: "italic" }],
      },
      spacing: {
        '4': '1rem',
        '8': '2rem',
        '12': '3rem',
        '16': '4rem',
        '24': '6rem',
        '32': '8rem',
        '48': '12rem',
        '64': '16rem',
      },
      borderRadius: {
        sm: "2px",
        DEFAULT: "4px",
        full: "99px",
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        bounce: "bounce 3s ease-in-out infinite",
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default {
  theme: {
    extend: {
      fontFamily: {
        heading: ['Bebas Neue', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
