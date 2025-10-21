import type { App } from "vue";
import { ProTable } from "@clare-ui/table";
import { ProUpload } from "@clare-ui/upload";
import "element-plus/theme-chalk/dark/css-vars.css";
import "element-plus/es/components/table/style/css";
import "element-plus/es/components/loading/style/css";
import "element-plus/es/components/pagination/style/css";
import "element-plus/es/components/upload/style/css";
import "element-plus/es/components/button/style/css";
export const NovaUI = {
  install(app: App) {
    app.component(ProTable.name, ProTable as any);
    app.component(ProUpload.name, ProUpload as any);
  },
};
export default NovaUI;
export { ProTable } from "@clare-ui/table";
export { ProUpload } from "@clare-ui/upload";
export * from "@clare-ui/core";
