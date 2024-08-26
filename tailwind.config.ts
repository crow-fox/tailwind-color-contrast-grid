import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {},
  plugins: [
    plugin(({ addVariant }) => {
      addVariant(
        "hover",
        "@media (hover: hover) { &:where(:any-link, :enabled, summary):hover }",
      );
    }),
  ],
};
export default config;
