import type { Config } from "@react-router/dev/config";
import { copyFileSync } from "node:fs";
import { join } from "node:path";
import { BASE_PATH } from "./vite.config";

export default {
  ssr: false,
  basename: BASE_PATH,
  buildEnd(args) {
    // 404ページを作った上で、index.htmlと同じ内容をコピーする
    // 直接/ルート以外にアクセスされた場合に、index.htmlが表示されるようにする
    if (!args.viteConfig.isProduction) return;
    const buildPath = args.viteConfig.build.outDir;
    copyFileSync(join(buildPath, "index.html"), join(buildPath, "404.html"));
  },
} satisfies Config;
