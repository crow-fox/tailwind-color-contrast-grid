import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";

export const BASE_PATH = "/tailwind-color-contrast-grid/";

export default defineConfig({
  base: BASE_PATH,
  plugins: [reactRouter()],
  server: {
    open: BASE_PATH,
  },
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
});
