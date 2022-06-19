module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "350px",
      sm: "440px",
      md: "625px",
      lg: "850px",
      xl: "1080px",
    },
    extend: {
      fontFamily: {
        urbanist: ["Urbanist", "sans-serif"],
      },
      colors: {
        snLightGray: "#1F1F25",
        snGray: "#1B1A1C",
        snBlack: "#121111",
        snBlue: "#4D87B9",
        snRed: "#C03240",
        snViolet: "#9233FF",
        snCyan: "#52c4eb",
        snOrange: "#f59e5c",
        snPurple: "#DF73F0",
        snGreen: "#33AF09",
        priorityBlue: "#487BE3",
        priorityYellow: "#FAAB33",
        priorityRed: "#FF4041",
      },
      screens: {
        md2: "650px",
        md3: "700px",
        md4: "750px",
      },
      backgroundImage: {
        space: "url('./assets/images/space.png')",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
