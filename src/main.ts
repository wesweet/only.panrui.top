/*
 * @Author: panr99 1547177202@qq.com
 * @Date: 2024-07-01 09:44:52
 * @LastEditors: panr99 1547177202@qq.com
 * @LastEditTime: 2024-07-01 15:47:51
 * @FilePath: \only.panrui.top\src\main.ts
 */
import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import uviewPlus from "@/uni_modules/uview-plus";
import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  app.use(pinia);
  app.use(uviewPlus);
  return {
    app,
  };
}
