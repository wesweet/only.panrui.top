/*
 * @Author: panr99 1547177202@qq.com
 * @Date: 2024-07-01 09:44:52
 * @LastEditors: panr99 1547177202@qq.com
 * @LastEditTime: 2024-12-17 15:20:03
 * @FilePath: \only.panrui.top\src\main.ts
 * @Description: 应用入口文件
 */
import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import uviewPlus from "uview-plus";
import { initRequest } from "@/utils/request/index";
import App from "./App.vue";

export function createApp() {
  // 创建vue实例
  const app = createSSRApp(App);
  // 引入请求封装
  initRequest(app);
  // 创建pinia状态管理器
  const pinia = createPinia();
  // 引入pinia状态管理器
  app.use(pinia);
  // // 设置uview-plus配置
  // setConfig({
  //   // 修改$u.config对象的属性
  //   config: {
  //     // 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
  //     unit: "rpx",
  //   },
  //   // 修改$u.props对象的属性
  //   props: {
  //     // 修改radio组件的size参数的默认值，相当于执行 uni.$u.props.radio.size = 30
  //     alert: {
  //       type: "error",
  //     },
  //     // 其他组件属性配置
  //     // ......
  //   },
  // });
  // 引入uview3.0组件库
  app.use(uviewPlus);
  
  return {
    app,
  };
}
