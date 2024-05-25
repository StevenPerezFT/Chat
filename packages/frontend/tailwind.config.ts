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
        'chatBlack': {
          100: '#E2E2E3',
          200: '#B6B6B7',
          300: '#8A8A8B',
          400: '#5D5D5E',
          500: '#1B1B1D',
          600: '#171719',
          700: '#131315',
          800: '#0E0E10',
          900: '#0A0A0B'
        },
        'chatGreen': {
          100: '#D3F4E7',
          200: '#A7E9CF',
          300: '#7ADDAD',
          400: '#4ED18B',
          500: '#25BF7A',
          600: '#20A66D',
          700: '#1B8C5F',
          800: '#156251',
          900: '#104843'
        },
        'chatWhite': {
          100: '#FFFFFF', 
          200: '#F9F9F9',
          300: '#F2F2F2',
          400: '#EBEBEB',
          500: '#E3E3E3', 
          600: '#CCCCCC',
          700: '#B2B2B2',
          800: '#999999',
          900: '#7F7F7F'
        }
      }
    },
  },
  plugins: [],
};
export default config;
