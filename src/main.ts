/*
 * @Author: panr99 1547177202@qq.com
 * @Date: 2024-07-01 09:44:52
 * @LastEditors: panr99 1547177202@qq.com
 * @LastEditTime: 2024-07-01 15:47:51
 * @FilePath: \only.panrui.top\src\main.ts
 * @Description: 应用入口文件
 */
import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import uviewPlus from "uview-plus";
import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App); // 创建vue实例
  const pinia = createPinia(); // 创建pinia状态管理器
  app.use(pinia); // 引入pinia状态管理器
  app.use(uviewPlus); // 引入uview3.0组件库
  return {
    app,
  };
}
