import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lab: {
          dark: "#0B1021",
          card: "#151C33",
          border: "#2A365C",
        },
        neon: {
          green: "#39FF14",
          blue: "#00FFFF",
        },
        romantic: {
          amber: "#FFBF00",
          rose: "#FF007F",
        }
      },
      boxShadow: {
        'glow-green': '0 0 15px rgba(57, 255, 20, 0.5)',
        'glow-blue': '0 0 15px rgba(0, 255, 255, 0.5)',
        'glow-amber': '0 0 25px rgba(255, 191, 0, 0.8)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};
export default config;