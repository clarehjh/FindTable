import { resolve, dirname } from "node:path";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import terser from "@rollup/plugin-terser";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { defineConfig, type UserConfig } from "vite";
// removed i18n plugin for minimal library footprint
import path from "path";

const lifecycle = process.env.npm_lifecycle_event;

function getConfigs(): UserConfig {
  const isLibMode = lifecycle === "lib" || !!process.env.LIB_ENTRY;
  return isLibMode
    ? {
        publicDir: false,
        build: {
          lib: {
            entry: resolve(
              __dirname,
              process.env.LIB_ENTRY || "packages/nova-ui/src/index.ts"
            ),
            name: process.env.LIB_NAME || "NovaUI",
            fileName: (format) => `index.${format}.js`,
          },
          // 将产物输出到对应包内的 dist，而不是根目录
          // 优先使用 LIB_OUTDIR，其次根据 LIB_ENTRY 自动推导：packages/<pkg>/src -> packages/<pkg>/dist
          outDir: (() => {
            if (process.env.LIB_OUTDIR) return process.env.LIB_OUTDIR;
            const libEntry =
              process.env.LIB_ENTRY || "packages/nova-ui/src/index.ts";
            const srcDir = resolve(__dirname, dirname(libEntry));
            // srcDir = packages/<pkg>/src -> pkgDir = packages/<pkg>
            const pkgDir = resolve(srcDir, "..");
            return resolve(pkgDir, "dist");
          })(),
          // https://rollupjs.org/guide/en/#big-list-of-options
          rollupOptions: {
            treeshake: true,
            external: [
              "vue",
              "element-plus",
              "@clare-ui/table",
              "@clare-ui/upload",
              "@clare-ui/core",
            ].concat(
              (process.env.LIB_EXTERNALS || "")
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            ),
            output: {
              globals: {
                vue: "Vue",
                "element-plus": "ElementPlus",
              },
              exports: "named",
            },
            plugins: [terser({ compress: { drop_console: true } })],
          },
        },
      }
    : ({
        base: "/FindTable/",
        build: {
          sourcemap: false,
          chunkSizeWarningLimit: 4000,
        },
      } as any);
}

// https://cn.vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  plugins: [vue(), vueJsx(), svgLoader()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 将 @ 指向 src 目录
      "@clare-ui/table": path.resolve(__dirname, "packages/table/src"),
      "@clare-ui/upload": path.resolve(__dirname, "packages/upload/src"),
      "@clare-ui/core": path.resolve(__dirname, "packages/core/src"),
    },
  },
  // https://cn.vitejs.dev/guide/build.html#library-mode 环境变量
  define: {
    "process.env.NODE_ENV": '"production"',
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
  server: {
    host: "0.0.0.0",
  },
  ...getConfigs(),
});
