import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "card-1": "rgba(255, 255, 255, 0.05)",
        "card-2": "rgba(255, 255, 255, 0.10)",
        "stroke-1": "rgba(255, 255, 255, 0.10)",
        "secondary": "rgba(255, 255, 255, 0.60)",
        "tertiary": "rgba(255, 255, 255, 0.40)"
      },
      screens: {
        'sm': { 'max': '640px' }
      },
      animation: {
        'rotateL': 'rl 1.5s linear infinite',
        'rotateR': 'rr 1.5s linear infinite',
      },
      keyframes: {
        'rl': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'rr': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
