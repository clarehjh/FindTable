import type { App } from "vue";
import Table from "./components/table/index.vue";
import type { ProTableInstance } from "./components/table/interface/index";

import "element-plus/theme-chalk/dark/css-vars.css";
import "element-plus/es/components/table/style/css";
import "element-plus/es/components/loading/style/css";
import "element-plus/es/components/pagination/style/css";

export const FindTable = Object.assign(Table, {
  install: (app: App, options?: ProTableInstance) => {
    app.component(Table.name, Table);
    app.provide("locale", options ?? { locale: null, i18n: null, ssr: false });
  }
});

export default FindTable;

export type {
  ColumnProps,
  HeaderRenderScope,
  RenderScope,
  FieldNamesProps,
  SearchProps,
  SearchType,
  TypeProps
} from "./components/table/interface/index";
