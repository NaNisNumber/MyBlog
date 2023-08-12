/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        neg4: "-4px",
        "0-auto": "0 auto",
        "8%": "8%",
      },
      colors: {
        black: "#000",
        shadowBlack: "rgb(000,000,000,0.3)",
        white: "#fff",
        gold: "#F4B000",
        purple: "#5a2685",
        darkPurple: "#3a243b",
        darkBrown: "#642F12",
      },
      zIndex: {
        999: "999",
      },
    },

    fontFamily: {
      sans: ["Inter"],
      serif: ["Arvo"],
    },
    screens: {
      xsm: "500px",
      ...defaultTheme.screens,
      // => @media (min-width: 500px) { ... }
    },
  },
  plugins: [],
};
