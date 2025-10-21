import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@clare-ui/table": path.resolve(__dirname, "../../packages/table/src"),
      "@clare-ui/upload": path.resolve(__dirname, "../../packages/upload/src"),
      "@clare-ui/core": path.resolve(__dirname, "../../packages/core/src"),
      "@clare-ui/nova-ui": path.resolve(__dirname, "../../packages/nova-ui/src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
