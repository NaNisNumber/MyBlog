/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        neg4: "-4px",
      },
      colors: {
        black: "#000",
        white: "#fff",
        gold: "#F4B000",
        purple: "#5a2685",
        darkPurple: "#3a243b",
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
