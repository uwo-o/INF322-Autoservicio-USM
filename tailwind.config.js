/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        usm: {
          red: "#D52B1E",
          yellow: "#FFD700",
          blue: "#005e90",
          dark: "#0D0D0D",
          light: "#FFFFFF",
          green: "#10B981"
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
