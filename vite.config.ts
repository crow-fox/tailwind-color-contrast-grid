import { copyFileSync } from "node:fs";
import { join } from "node:path";
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";

export default defineConfig({
  base:
    process.env.NODE_ENV === "production"
      ? "/tailwind-color-contrast-grid/"
      : "/",
  plugins: [
    remix({
      ssr: false,
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
      basename:
        process.env.NODE_ENV === "production"
          ? "/tailwind-color-contrast-grid/"
          : "/",
      buildEnd(args) {
        if (!args.viteConfig.isProduction) return;
        const buildPath = args.viteConfig.build.outDir;
        copyFileSync(
          join(buildPath, "index.html"),
          join(buildPath, "404.html"),
        );
      },
    }),
  ],
});

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}
