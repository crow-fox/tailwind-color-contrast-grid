import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {},
  plugins: [],
  darkMode: ["selector", '[data-theme="dark"]'],
};
export default config;
