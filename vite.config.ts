import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";

export const BASE_PATH = "/tailwind-color-contrast-grid/";

export default defineConfig({
  base: BASE_PATH,
  plugins: [
    reactRouter(),
    babel({
      filter: /\.[jt]sx?$/,
      babelConfig: {
        presets: ["@babel/preset-typescript"], // if you use TypeScript
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  server: {
    open: BASE_PATH,
  },
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
});
