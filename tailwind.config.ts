import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        white: "#FFFFFF",
      },
      keyframes: {
        "bg-slide": {
          "0%": { "background-position": "100% 0" },
          "100%": { "background-position": "0 0" },
        },
      },
      animation: {
        "bg-slide": "bg-slide 1.5s linear",
        // "bg-slide": "bg-slide 1s linear infinite",
      },
    },
  },
  plugins: [
    nextui({
      themes: {},
    }),
  ],
};

export default config;
