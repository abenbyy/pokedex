module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  important: true,
  theme: {
    extend: {},
    container: {
      center: true,
    },
    maxWidth: {
      img: "282px",
      "img-lg": "424px",
      chip: "64px",
    },
  },
  plugins: [],
};
