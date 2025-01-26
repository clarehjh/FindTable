import App from "./App.vue";
import { createApp } from "vue";

import "element-plus/dist/index.css";
import "element-plus/theme-chalk/src/dark/css-vars.scss";
import ElementPlus from "element-plus";

import FindTable from "../packages";

const app = createApp(App);

app.use(ElementPlus).use(FindTable, {}).mount("#app");
